import AppError from '../utils/AppError.js';

export const requireRole = (req, res, next) => {
  if (!['admin', 'superadmin'].includes(req.user.role)) {
    return next(new AppError('Forbidden', 403));
  }
  next();
};
