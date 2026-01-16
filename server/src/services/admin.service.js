import User from '../models/user.model.js';
import Book from '../models/book.model.js';
import Request from '../models/request.model.js';
import Notification from '../models/notification.model.js';
import { getIO } from '../sockets/socket.js';

const notselectedFields = `
  -passwordHash -lendingPreferences -favorites
  -emailVerificationOTP -emailVerificationOTPExpiry
  -resetPasswordOTP -resetPasswordOTPExpiry
  `;

export const listUsers = async () => {
  return await User.find({ role: { $ne: 'superadmin' } })
    .select(notselectedFields)
    .limit(40)
    .sort({ createdAt: -1 })
    .lean();
};

export const changeUserRole = async (userId, newRole) => {
  return User.findByIdAndUpdate(
    userId,
    { $set: { role: newRole } },
    { new: true }
  ).select(notselectedFields);
};

export const banUser = async (userId, isBanned) => {
  return User.findByIdAndUpdate(
    userId,
    { isBanned },
    { new: true }
  ).select('-passwordHash');
};

export const listAllBooks = async () => {
  const books = await Book.find({ status: { $ne: 'unavailable' } })
    .populate('owner', '_id name city')
    .lean();
  return books;
}

export const deleteBook = async (book, reason) => {
  const io = getIO();
  const notif = await Notification.create({
      user: book.owner._id,
      type: 'ADMIN',
      title: 'Book deleted by admin',
      message: `The book "${book.title}" has been deleted by an admin.`,
      data: { bookId: book._id, reason },
    });
  const deletedBook = await Book.findByIdAndDelete(book._id);
  io.to(`user:${book.owner._id.toString()}`).emit('notification:new', notif);
  return deletedBook;
}

export const listAllRequests = async () => {
  return Request.find()
    .populate('book')
    .populate('owner', 'name')
    .populate('requester', 'name')
    .sort({ createdAt: -1 })
    .limit(200);
};
