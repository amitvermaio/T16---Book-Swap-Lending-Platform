import {
  getUserById,
  updateUserProfile,
  updatePreferences,
  getBorrowHistory,
  addBookToFavorites,
  updateAvatar
} from '../services/user.service.js';
import { answerQuery } from '../services/ai.service.js';

export const aiQuery = async (req, res, next) => {
  try {
    const { query } = req.body;

    // SSE headers 
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    res.flushHeaders();

    await answerQuery(query, (token) => {
      res.write(`data: ${token}\n\n`);
    });

    res.write(`event: end\n`);
    res.write(`data: [DONE]\n\n`);
    res.end();

  } catch (error) {
    next(error);
  }
};


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

    delete updates.role;
    delete updates.email;

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

export const updateMyAvatar = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (!req.file || !req.file.buffer) return next(new Error("Please upload a file"));
    const user = await updateAvatar(userId, req.file);

    res.status(200).json({
      success: true,
      user
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
    const user = req.user.id;
    const book = req.params.bookId;
    const action = req.query.action;

    if (!user || !book || !action) {
      console.log(user, book, action)
      return res.status(400).json({ message: "User ID, Book ID, and action are required" });
    }

    const updatedUser = await addBookToFavorites(user, book, action);

    res.status(200).json({
      success: true,
      message: "Book added to favorites successfully",
      favorites: updatedUser.favorites
    });

  } catch (error) {
    next(error);
  }
};