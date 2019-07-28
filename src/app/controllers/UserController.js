import * as yup from 'yup';

import User from '../models/User';
import File from '../models/File';

class UserController {
  async store(req, res) {
    // Create a object schema validator and object parser using Yup
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .required()
        .min(6),
    });

    // Check validity
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid parameters.' });
    }

    // Check if email already exists in user database
    const userExists = await User.findOne({ where: { email: req.body.email } });

    // If email already exists in database return error message
    if (userExists) {
      return res
        .status(400)
        .json({ error: 'An account already exists with this email address.' });
    }

    // Else create user in database
    const { id, name, email, provider } = await User.create(req.body);

    // Then return user information
    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
    // Create a object schema validator and object parser using Yup
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      oldPassword: yup.string().min(6),
      password: yup
        .string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
    });

    // Check validity
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid parameters.' });
    }
    const user = await User.findByPk(req.userId);

    const { email, oldPassword } = req.body;

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({
          error: 'An account already exists with this email address.',
        });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({
        error: 'Invalid password. Please try again.',
      });
    }

    await user.update(req.body);

    const { id, name, avatar } = await User.findByPk(req.userId, {
      include: [
        { model: File, as: 'avatar', attributes: ['id', 'url', 'path'] },
      ],
    });

    return res.json({ id, name, email, avatar });
  }
}

export default new UserController();
