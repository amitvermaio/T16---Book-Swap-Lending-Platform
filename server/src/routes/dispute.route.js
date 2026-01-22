import { Router } from "express";
import { protect } from '../middlewares/auth.middleware.js';
import {
  createDisputeController,
  getDisputeByRequestController,
  updateDisputeStatusController,
} from '../controllers/dispute.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
const router = Router();

router.use(protect);
router.post("/", upload.array('images', 4), createDisputeController);
router.get("/request/:requestId", getDisputeByRequestController);
router.patch("/:id", requireRole, updateDisputeStatusController); 

export default router;