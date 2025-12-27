import {
  getUserById,
  updateUserProfile,
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

export const updateMyDetails = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    const user = await updateUserProfile(userId, updates);

    res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
}

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


export const addToFavorite = async (req, res, next) => {
  try {
    const { user, book } = req.body;
    res.json({ user, book });
  } catch (error) {
    next(error);
  }
}