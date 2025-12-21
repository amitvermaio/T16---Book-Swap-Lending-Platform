import { Router } from 'express';
const router = Router();

import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import bookRoutes from './book.routes.js';
import requestRoutes from './request.routes.js';
import notificationRoutes from './notification.routes.js';
import adminRoutes from './admin.routes.js';
import analyticsRoutes from './analytics.routes.js';

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/requests', requestRoutes);
router.use('/notifications', notificationRoutes);
router.use('/admin', adminRoutes);
router.use('/analytics', analyticsRoutes);

export default router;
