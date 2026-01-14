import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import {
  listUsersController,
  changeUserRoleController,
  banUserController,
  listAllRequestsController,
} from '../controllers/admin.controller.js';

const router = Router();

router.use(protect, requireRole);

router.get('/users', listUsersController);
router.patch('/users/:id/role', changeUserRoleController);
router.patch('/users/:id/ban', banUserController);
router.get('/books', () => {});
router.patch('/books/:id/disable', () => {});
router.get('/requests', listAllRequestsController);

export default router;
