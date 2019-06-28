import { verify } from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ error: 'Authorization token missing in request.' });
  }

  // Extract token string from Bearer token
  const [, token] = authHeader.split(' ');

  try {
    // util.promisify takes a function following the common error-first callback
    // style, (i.e. taking a (err, value) => ... callback as the last argument),
    // and returns a version that returns promises.
    const decoded = await promisify(verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid authorization token.' });
  }
};
