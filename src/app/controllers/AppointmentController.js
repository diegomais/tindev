import * as Yup from 'yup';
import { format, isBefore, parseISO, startOfHour, subHours } from 'date-fns';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

import User from '../models/User';
import Appointment from '../models/Appointment';
import File from '../models/File';
import Notification from '../schemas/Notification';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const appointmentsPerPage = 10;
    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date', 'past', 'cancellable'],
      limit: appointmentsPerPage,
      offset: (page - 1) * appointmentsPerPage,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        },
      ],
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid parameters.' });
    }

    const { date, provider_id } = req.body;

    // Check provider must be different from authenticated user
    if (provider_id === req.userId) {
      return res.status(400).json({
        error:
          'Provider must be different from user. Please, check and try again.',
      });
    }

    // Check if provider_id belongs to a provider
    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkIsProvider) {
      return res.status(400).json({
        error: 'Provider must be a provider. Please, check and try again.',
      });
    }

    // Check for past date
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({
        error: 'Date must not be in the past. Please, check and try again.',
      });
    }

    // Check provider and date is available
    const checkNotAvailable = await Appointment.findOne({
      where: { provider_id, canceled_at: null, date: hourStart },
    });

    if (checkNotAvailable) {
      return res
        .status(400)
        .json({ error: 'Sorry, this provider is not available at this time.' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    // Create notification to provider
    const user = await User.findByPk(req.userId);
    const formattedDate = format(hourStart, "dd.MM.yy' at 'HH:mm");
    await Notification.create({
      content: `New appointment of ${user.name} on ${formattedDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    // Get appointment from db
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        { model: User, as: 'provider', attributes: ['name', 'email'] },
        { model: User, as: 'user', attributes: ['name'] },
      ],
    });

    // Check authenticated user differ from user of appointment
    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: 'You do not have permission to cancel this appointment.',
      });
    }

    // Subtract 2 hours from appointment time
    const dateWithTwoHoursSubtracted = subHours(appointment.date, 2);

    // Check current time is 2 hours before time of appointment
    if (isBefore(dateWithTwoHoursSubtracted, new Date())) {
      return res.status(401).json({
        error: 'You can only cancel appointments 2 hours in advance.',
      });
    }

    // Set cancellation time to appointment
    appointment.canceled_at = new Date();

    // Save changes in db
    await appointment.save();

    // Add job
    await Queue.add(CancellationMail.key, { appointment });

    return res.json(appointment);
  }
}

export default new AppointmentController();
