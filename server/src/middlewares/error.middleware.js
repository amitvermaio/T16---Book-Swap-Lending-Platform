import AppError from '../utils/AppError.js';
import debug from 'debug';

const dbgr = debug('dev:error');

export const notFound = (req, res, next) => {
  next(new AppError(`Not Found - ${req.originalUrl}`, 404));
};

export const errorHandler = (err, req, res, next) => {
  dbgr(err);
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || 'Internal Server Error',
  });
};
