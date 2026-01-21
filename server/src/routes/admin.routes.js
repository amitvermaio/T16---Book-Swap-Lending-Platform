import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import {
  listUsersController,
  changeUserRoleController,
  banUserController,
  listBooksController,
  deleteBookController,
  countAllRequestsController,
  listAllDisputesController,
} from '../controllers/admin.controller.js';

const router = Router();

router.use(protect, requireRole);

router.get('/users', listUsersController);
router.patch('/users/:id/role', changeUserRoleController);
router.patch('/users/:id/ban', banUserController);
router.get('/books', listBooksController);
router.delete('/books/:id', deleteBookController);
router.get('/requests', countAllRequestsController);
router.get('/disputes', listAllDisputesController);

export default router;
