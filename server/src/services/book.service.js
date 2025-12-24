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
    page = 1,
    limit = 12,
  } = query;

  const filter = {};

  if (title) filter.title = new RegExp(title, 'i'); // title → Regular Expression bana raha user ka input, 'i' → case-insensitive
  if (author) filter.author = new RegExp(author, 'i');
  if (genre) filter.genre = genre;
  if (city) filter['location.city'] = new RegExp(city, 'i');
  if (availabilityType) filter.availabilityType = availabilityType;
  if (status) filter.status = status;

  const skip = (page - 1) * limit;
  /**
   *  page → kaunsa page chahiye (1, 2, 3…)
      skip = itne records chhod do
      limit = uske baad itne records bhejo
   */

  const books = await Book.find(filter)
    .populate('owner', 'name ratingStats')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));


  const total = await Book.countDocuments(filter);

  return {
    books,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      hasMore: skip + books.length < total,
    },
  };
};

export const getMyBooks = async (ownerId) => {
  const myBooks = await Book.find({ owner: ownerId }).sort({ createdAt: -1 });
  return myBooks;
};
