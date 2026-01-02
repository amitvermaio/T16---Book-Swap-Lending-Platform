import Request from '../models/request.model.js';
import Book from '../models/book.model.js';

export const getTopBooks = async () => {
  const agg = await Request.aggregate([
    { $match: { status: 'completed' } },
    {
      $group: {
        _id: '$book',
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);

  const books = await Book.find({
    _id: { $in: agg.map((a) => a._id) },
  });

  return agg.map((a) => ({
    count: a.count,
    book: books.find((b) => b._id.toString() === a._id.toString()),
  }));
};

export const getTopContributors = async () => {
  const agg = await Request.aggregate([
    { $match: { status: 'completed' } },
    {
      $group: {
        _id: '$owner',
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);

  return agg; // frontend can resolve names or you can populate separately
};

export const getBorrowTrends = async () => {
  const agg = await Request.aggregate([
    { $match: { status: 'completed' } },
    {
      $group: {
        _id: { $substr: ['$createdAt', 0, 10] },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return agg;
};
