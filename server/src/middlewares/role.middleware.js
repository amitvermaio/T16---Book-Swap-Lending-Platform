import AppError from '../utils/AppError.js';

export const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    console.log(roles)
    return next(new AppError('Forbidden', 403));
  }
  next();
};
