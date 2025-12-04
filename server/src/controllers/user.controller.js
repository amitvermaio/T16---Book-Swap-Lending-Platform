import {
  getUserById,
  updatePreferences,
  getBorrowHistory,
} from '../services/user.service.js';

export const getMeDetails = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

export const getUserPublicProfile = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const user = await getUserById(req.params.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

export const updateMyPreferences = async (req, res, next) => {
  try {
    const user = await updatePreferences(req.user.id, req.body);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

export const getMyBorrowHistory = async (req, res, next) => {
  try {
    const history = await getBorrowHistory(req.user.id);
    res.json({ history });
  } catch (err) {
    next(err);
  }
};
