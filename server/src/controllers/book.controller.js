import {
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks,
  getMyBooks,
} from '../services/book.service.js';

import User from '../models/user.model.js';
import debug from 'debug';

const dbgr = debug('dev:controller:books');

export const createBookController = async (req, res, next) => {
  try {
    if (!req.files || !req.files.coverImage) {
      return res.status(400).json({ message: "Cover image is required" });
    }

    if (req.files.galleryImages && req.files.galleryImages.length > 5) {
      return res.status(400).json({ message: "Not More than 5 Images are allowed to upload" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    if (!user.address || !user.city || !user.state) {
      return res.status(400).json({ message: "Please complete your profile location (City & State) before listing a book." })
    }

    let parsedGenre = [];
    if (req.body.genre) {
      try {
        parsedGenre = JSON.parse(req.body.genre);
      } catch (e) {
        parsedGenre = [req.body.genre];
      }
    }

    let parsedAvailability = [];
    if (req.body.availabilityType) {
      try {
        parsedAvailability = JSON.parse(req.body.availabilityType);
      } catch (e) {
        parsedAvailability = [req.body.availabilityType];
      }
    }

    const bookData = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      genre: parsedGenre,
      availabilityType: parsedAvailability,
    };

    const newBook = await createBook(user, bookData, req.files);

    res.status(201).json({
      message: "Book added successfully!",
      book: newBook,
    });
  } catch (err) {
    dbgr('Upload Error from createBookController');
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
