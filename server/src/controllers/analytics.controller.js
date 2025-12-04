import {
  getTopBooks,
  getTopContributors,
  getBorrowTrends,
} from '../services/analytics.service.js';

export const topBooksController = async (req, res, next) => {
  try {
    const data = await getTopBooks();
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

export const topContributorsController = async (req, res, next) => {
  try {
    const data = await getTopContributors();
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

export const trendsController = async (req, res, next) => {
  try {
    const data = await getBorrowTrends();
    res.json({ data });
  } catch (err) {
    next(err);
  }
};
