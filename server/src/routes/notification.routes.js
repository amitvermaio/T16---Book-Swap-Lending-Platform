import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
  listNotificationsController,
  markNotificationReadController,
  markAllReadController,
} from '../controllers/notification.controller.js';

const router = Router();

router.use(protect);

router.get('/', listNotificationsController);
router.patch('/:id/read', markNotificationReadController);
router.patch('/read-all', markAllReadController);

export default router;
