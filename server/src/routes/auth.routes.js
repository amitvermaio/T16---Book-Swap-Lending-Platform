import { Router } from 'express';
import { register, login, getProfile } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from "../middlewares/validate.middleware.js";
import { registerValidation, loginValidation } from "../validations/auth.validation.js";

const router = Router();

router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);
router.get('/me', protect, getProfile);

export default router;
