import { Router } from 'express';

import User from './app/models/User';

const routes = new Router();

routes.post('/', async (req, res) => {
  const { name, email, password_hash } = req.body;
  const user = await User.create({
    name,
    email,
    password_hash,
  });
  res.json(user);
});

export default routes;
