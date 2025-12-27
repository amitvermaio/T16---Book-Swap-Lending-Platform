import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { createBookValidation, updateBookValidation } from "../validations/book.validation.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createBookController,
  getBookController,
  updateBookController,
  deleteBookController,
  searchBooksController,
  getMyBooksController,
} from '../controllers/book.controller.js';

const router = Router();

const Upload = upload.fields([
  { name: 'coverImage' },
  { name: 'galleryImages' }
]);


router.get('/', searchBooksController);
router.post('/add', protect, Upload, createBookValidation, validate, createBookController);
router.get('/me', protect, getMyBooksController);
router.get('/:id', getBookController);
router.put('/:id', protect, updateBookValidation, validate, updateBookController);
router.delete('/:id', protect, deleteBookController);

export default router;
