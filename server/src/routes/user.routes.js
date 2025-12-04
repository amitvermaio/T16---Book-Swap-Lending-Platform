import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
  getMeDetails,
  getUserPublicProfile,
  updateMyPreferences,
  getMyBorrowHistory,
} from '../controllers/user.controller.js';

const router = Router();

router.get('/me', protect, getMeDetails);
router.patch('/me/preferences', protect, updateMyPreferences);
router.get('/me/history', protect, getMyBorrowHistory);

router.get('/:id', protect, getUserPublicProfile);

export default router;
