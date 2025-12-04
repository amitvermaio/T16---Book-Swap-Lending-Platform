import Book from '../models/book.model.js';
import AppError from '../utils/AppError.js';

export const createBook = async (ownerId, data) => {
  const book = await Book.create({
    ...data,
    owner: ownerId,
  });
  return book;
};

export const getBookById = async (id) => {
  const book = await Book.findById(id).populate('owner', 'name ratingStats');
  if (!book) throw new AppError('Book not found', 404);
  return book;
};

export const updateBook = async (bookId, ownerId, data) => {
  const book = await Book.findOne({ _id: bookId, owner: ownerId });
  if (!book) throw new AppError('Book not found or not owned', 404);

  Object.assign(book, data);
  await book.save();
  return book;
};

export const deleteBook = async (bookId, ownerId) => {
  const book = await Book.findOne({ _id: bookId, owner: ownerId });
  if (!book) throw new AppError('Book not found or not owned', 404);

  await book.deleteOne();
};

export const searchBooks = async (query) => {
  const {
    title,
    author,
    genre,
    city,
    availabilityType,
    status = 'available',
  } = query;

  const filter = {};

  if (title) filter.title = new RegExp(title, 'i');
  if (author) filter.author = new RegExp(author, 'i');
  if (genre) filter.genre = { $in: [genre] };
  if (city) filter['location.city'] = new RegExp(city, 'i');
  if (availabilityType) filter.availabilityType = availabilityType;
  if (status) filter.status = status;

  const books = await Book.find(filter)
    .populate('owner', 'name ratingStats')
    .sort({ createdAt: -1 });

  return books;
};

export const getMyBooks = async (ownerId) => {
  return Book.find({ owner: ownerId }).sort({ createdAt: -1 });
};
