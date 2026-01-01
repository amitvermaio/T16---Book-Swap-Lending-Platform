import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
  createRequestController,
  listRequestsController,
  getRequestController,
  updateRequestStatusController,
  markReturnedController,
  getActiveTrackingsController,
  verifyExchangeCodeController,
  getHistoryController,
} from '../controllers/request.controller.js';

import {
  createRequestValidation,
  updateRequestStatusValidation
} from "../validations/request.validation.js";
import { validate } from "../middlewares/validate.middleware.js";


const router = Router();

router.use(protect);

router.post('/', createRequestValidation, validate, createRequestController);
router.get('/', listRequestsController);
router.get('/active', getActiveTrackingsController);
router.get('/history', getHistoryController);
router.get('/:id', getRequestController);
router.patch('/:id/status', updateRequestStatusValidation, validate, updateRequestStatusController);
router.post('/:id/verify', verifyExchangeCodeController);
router.patch('/:id/returned', markReturnedController);


export default router;