import { createRating, fetchUserRatings } from '../services/rating.service.js';

export const addRatingController = async (req, res, next) => {
  try {
    const raterId = req.user.id; 
    const ratingData = req.body;

    const rating = await createRating(raterId, ratingData);

    res.status(201).json({
      success: true,
      message: 'Rating submitted successfully',
      rating
    });
  } catch (error) {
    // Handle the Duplicate Key Error (MongoDB Code 11000)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already rated this transaction.' });
    }
    next(error);
  }
};

export const getUserRatingsController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const ratings = await fetchUserRatings(userId);

    res.status(200).json({
      success: true,
      ratings
    });
  } catch (error) {
    next(error);
  }
};