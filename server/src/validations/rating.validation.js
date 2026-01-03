import { body } from 'express-validator';

export const createRatingValidation = [
  body('score')
  .notEmpty().withMessage('Score is required')
  .isInt({ min: 1, max: 5 }).withMessage('Score must be an integer between 1 and 5'),

  body('comment')
  .optional()
  .isString().withMessage('Comment must be a string')
  .isLength({ max: 300 }).withMessage('Comment cannot exceed 300 characters'),
]