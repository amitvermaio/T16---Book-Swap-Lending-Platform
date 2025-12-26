import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    console.log("Error from here")
    return next(new AppError('Not authenticated', 401));
  }

  const token = authHeader.split(' ')[ 1 ];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (err) {
    console.log("Tagda error from here")
    next(new AppError('Invalid token', 401));
  }
};
