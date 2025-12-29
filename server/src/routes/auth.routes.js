import { Router } from 'express';
import { register, login, getProfile, forgotpassword } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from "../middlewares/validate.middleware.js";
import { registerValidation, loginValidation } from "../validations/auth.validation.js";

const router = Router();

router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);
router.get('/me', protect, getProfile);
router.post('/forgot-password', forgotpassword);

export default router;
