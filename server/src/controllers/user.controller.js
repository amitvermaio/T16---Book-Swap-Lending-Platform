import {
  getUserById,
  updateUserProfile,
  updatePreferences,
  getBorrowHistory,
  addBookToFavorites
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
    const data = await getUserById(req.params.id);
    res.json(data);
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

    if (!user || !book) {
      return res.status(400).json({ message: "User ID and Book ID are required" });
    }

    const updatedUser = await addBookToFavorites(user, book);

    res.status(200).json({
      success: true,
      message: "Book added to favorites successfully",
      favorites: updatedUser.favorites 
    });
    
  } catch (error) {
    next(error);
  }
};