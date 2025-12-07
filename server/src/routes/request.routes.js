import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
  createRequestController,
  listRequestsController,
  getRequestController,
  updateRequestStatusController,
  markReturnedController,
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
router.get('/:id', getRequestController);
router.patch('/:id/status', updateRequestStatusValidation, validate, updateRequestStatusController);
router.patch('/:id/returned', markReturnedController);

export default router;
