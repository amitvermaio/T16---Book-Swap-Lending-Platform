import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
  getMeDetails,
  getUserPublicProfile,
  updateMyPreferences,
  getMyBorrowHistory,
} from '../controllers/user.controller.js';

const router = Router();

router.use(protect);

router.get('/me', getMeDetails);
router.patch('/me/preferences', updateMyPreferences);
router.get('/me/history', getMyBorrowHistory);
router.get('/:id', getUserPublicProfile);

export default router;
