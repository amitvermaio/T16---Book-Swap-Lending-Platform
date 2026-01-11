import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
  getMeDetails,
  updateMyDetails,
  getUserPublicProfile,
  updateMyPreferences,
  getMyBorrowHistory,
  addToFavorite,
  updateMyAvatar,
} from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

/* PUBLIC ROUTES /api/users */
router.get('/:id', getUserPublicProfile);

/* PROTECTED ROUTES /api/users */
router.use(protect);

router.get('/me', getMeDetails);
router.patch('/update-details', updateMyDetails)
router.put('/update-avatar', upload.single('avatar'), updateMyAvatar);
router.patch('/me/preferences', updateMyPreferences);
router.get('/me/history', getMyBorrowHistory);
router.post('/favourites/:bookId', addToFavorite);

export default router;
