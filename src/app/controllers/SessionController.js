import { sign } from 'jsonwebtoken';
import * as yup from 'yup';

import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    // Create a object schema validator and object parser using Yup
    const schema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .min(6)
        .required(),
    });

    // Check validity
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid parameters.' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        { model: File, as: 'avatar', attributes: ['id', 'url', 'path'] },
      ],
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: `Sorry, we don't recognize this email.` });
    }

    if (!(await user.checkPassword(password))) {
      return res
        .status(401)
        .json({ error: 'Invalid password. Please try again.' });
    }

    const { id, name, avatar, provider } = user;

    return res.json({
      user: { id, name, email, avatar, provider },
      token: sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
