import User from '../models/User';

class UserController {
  async store(req, res) {
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
}

export default new UserController();
