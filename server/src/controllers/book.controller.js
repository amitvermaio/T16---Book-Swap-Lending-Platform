import {
  createBook,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
  getMyBooks,
} from '../services/book.service.js';

export const createBookController = async (req, res, next) => {
  try {
    const book = await createBook(req.user.id, req.body);
    res.status(201).json({ book });
  } catch (err) {
    next(err);
  }
};

export const getBookController = async (req, res, next) => {
  try {
    const book = await getBookById(req.params.id);
    res.json(book);
  } catch (err) {
    next(err);
  }
};

export const updateBookController = async (req, res, next) => {
  try {
    const book = await updateBook(req.params.id, req.user.id, req.body);
    res.json({ book });
  } catch (err) {
    next(err);
  }
};

export const deleteBookController = async (req, res, next) => {
  try {
    await deleteBook(req.params.id, req.user.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export const searchBooksController = async (req, res, next) => {
  try {
    const books = await searchBooks(req.query);
    res.json(books);
  } catch (err) {
    next(err);
  }
};

export const getMyBooksController = async (req, res, next) => {
  try {
    const books = await getMyBooks(req.user.id);
    res.json({ books });
  } catch (err) {
    next(err);
  }
};
