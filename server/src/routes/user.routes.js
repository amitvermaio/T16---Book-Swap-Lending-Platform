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

router.use(protect);

router.get('/me', getMeDetails);
router.patch('/update-details', updateMyDetails)
router.patch('/me/preferences', updateMyPreferences);
router.get('/me/history', getMyBorrowHistory);
router.get('/:id', getUserPublicProfile);
router.post('/favourites', addToFavorite);

export default router;
