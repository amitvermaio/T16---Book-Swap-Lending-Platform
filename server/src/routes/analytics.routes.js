import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';

import {
  topBooksController,
  topContributorsController,
  trendsController,
} from '../controllers/analytics.controller.js';

const router = Router();

router.use(protect);

router.get('/top-books', topBooksController);
router.get('/top-contributors', topContributorsController);
router.get('/trends', trendsController);

export default router;
