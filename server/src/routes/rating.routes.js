import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { addRatingController, getUserRatingsController } from '../controllers/rating.controller.js';

const router = Router();

router.post('/', protect, addRatingController);
router.get('/:userId', getUserRatingsController); 

export default router;