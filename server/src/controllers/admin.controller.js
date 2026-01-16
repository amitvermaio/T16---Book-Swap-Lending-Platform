import {
  listUsers,
  changeUserRole,
  banUser,
  listAllBooks,
  deleteBook,
  listAllRequests,
} from '../services/admin.service.js';
import Book from '../models/book.model.js';

export const listUsersController = async (req, res, next) => {
  try {
    const users = await listUsers();
    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
};

export const changeUserRoleController = async (req, res, next) => {
  try {
    console.log(req.user);
    const user = await changeUserRole(req.params.id, req.body.role);
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
}

export const banUserController = async (req, res, next) => {
  try {
    const { banned } = req.body; // boolean
    const user = await banUser(req.params.id, banned);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

export const listBooksController = async (req, res, next) => {
  try {
    const books = await listAllBooks();
    res.json({ success: true, books });
  } catch (error) {
    next(error);
  }
}

export const deleteBookController = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate('owner', '_id name');
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    if (book.status !== 'available') {
      return res.status(404).json({ message: 'Book cannot be deleted because it is requested or something else.' });
    }

    await deleteBook(book, req.body.reason);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const listAllRequestsController = async (req, res, next) => {
  try {
    const requests = await listAllRequests();
    res.json({ requests });
  } catch (err) {
    next(err);
  }
};
