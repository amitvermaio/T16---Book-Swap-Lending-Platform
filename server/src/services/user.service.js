import User from '../models/user.model.js';
import Request from '../models/Request.js';
import AppError from '../utils/AppError.js';

export const getUserById = async (id) => {
  const user = await User.findById(id).select('-passwordHash');
  if (!user) throw new AppError('User not found', 404);
  return user;
};

export const updatePreferences = async (userId, prefs) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError('User not found', 404);

  user.lendingPreferences = {
    ...user.lendingPreferences,
    ...prefs,
  };

  await user.save();
  return user;
};

export const getBorrowHistory = async (userId) => {
  const history = await Request.find({
    requester: userId,
    status: 'completed',
  })
    .populate('book')
    .sort({ createdAt: -1 });

  return history;
};
