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

import User from '../models/user.model.js'; // Make sure to import User model

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

  const userIds = agg.map((item) => item._id);

  const users = await User.find({ _id: { $in: userIds } }).select('name avatar email ratingStats');

  return agg.map((item) => ({
    count: item.count,
    user: users.find((u) => u._id.toString() === item._id.toString()) || null,
  }));
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
