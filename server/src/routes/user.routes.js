import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
  getMeDetails,
  updateMyDetails,
  getUserPublicProfile,
  updateMyPreferences,
  getMyBorrowHistory,
  addToFavorite
} from '../controllers/user.controller.js';

const router = Router();

/* PUBLIC ROUTES */
router.get('/:id', getUserPublicProfile);

/* PROTECTED ROUTES */
router.use(protect);

router.get('/me', getMeDetails);
router.patch('/update-details', updateMyDetails)
router.patch('/me/preferences', updateMyPreferences);
router.get('/me/history', getMyBorrowHistory);
router.post('/favourites', addToFavorite);

export default router;
