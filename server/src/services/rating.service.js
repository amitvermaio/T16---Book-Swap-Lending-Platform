import Rating from '../models/rating.model.js';
import Request from '../models/request.model.js';
import User from '../models/user.model.js';
import AppError from '../utils/AppError.js'; 

export const createRating = async (raterId, ratingData) => {
  const { targetUserId, requestId, score, comment } = ratingData;

  const request = await Request.findById(requestId);
  if (!request) throw new AppError('Request not found', 404);

  const COMPLETED_STATUSES = ['completed', 'returned', 'swapped'];
  if (!COMPLETED_STATUSES.includes(request.status)) {
    throw new AppError('You can only rate completed or returned transactions.', 400);
  }

  // Ensure the person rating was actually involved in this request
  const isParticipant =
    request.sender?.toString() === raterId ||
    request.receiver?.toString() === raterId ||
    request.requester?.toString() === raterId;

  if (!isParticipant) {
    throw new AppError('You are not authorized to rate this transaction.', 403);
  }

  const newRating = await Rating.create({
    fromUser: raterId,
    toUser: targetUserId,
    request: requestId,
    score,
    comment
  });

  const targetUser = await User.findById(targetUserId);

  const currentTotal = targetUser.ratingStats.totalRatings || 0;
  const currentAvg = targetUser.ratingStats.avgRating || 0;

  const newTotalRatings = currentTotal + 1;
  const newAvgRating = ((currentAvg * currentTotal) + score) / newTotalRatings;

  targetUser.ratingStats = {
    totalRatings: newTotalRatings,
    avgRating: parseFloat(newAvgRating.toFixed(2)) // only 2 decimal places
  };

  await targetUser.save();

  return newRating;
};

export const fetchUserRatings = async (userId) => {
  return await Rating.find({ toUser: userId })
    .populate('fromUser', 'name avatar') 
    .sort({ createdAt: -1 }); 
};