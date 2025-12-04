import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
  createRequestController,
  listRequestsController,
  getRequestController,
  updateRequestStatusController,
  markReturnedController,
} from '../controllers/request.controller.js';

const router = Router();

router.use(protect);

router.post('/', createRequestController);
router.get('/', listRequestsController);
router.get('/:id', getRequestController);
router.patch('/:id/status', updateRequestStatusController);
router.patch('/:id/returned', markReturnedController);

export default router;
