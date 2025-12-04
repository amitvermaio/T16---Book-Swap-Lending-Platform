import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
  createBookController,
  getBookController,
  updateBookController,
  deleteBookController,
  searchBooksController,
  getMyBooksController,
} from '../controllers/book.controller.js';

const router = Router();

router.get('/', searchBooksController);
router.post('/', protect, createBookController);
router.get('/me', protect, getMyBooksController);
router.get('/:id', getBookController);
router.put('/:id', protect, updateBookController);
router.delete('/:id', protect, deleteBookController);

export default router;
