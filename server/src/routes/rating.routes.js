import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { addRatingController, getUserRatingsController } from '../controllers/rating.controller.js';
import { createRatingValidation } from '../validations/rating.validation.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

router.post('/', protect, createRatingValidation, validate, addRatingController);
router.get('/:userId', getUserRatingsController); 

export default router;