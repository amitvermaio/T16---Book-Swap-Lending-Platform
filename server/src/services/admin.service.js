import User from '../models/user.model.js';
import Request from '../models/request.model.js';

export const listUsers = async () => {
  return await User.find()
    .select(
      "-passwordHash -lendingPreferences -favorites " +
      "-emailVerificationOTP -emailVerificationOTPExpiry " +
      "-resetPasswordOTP -resetPasswordOTPExpiry"
    )
    .limit(40)
    .sort({ createdAt: -1 })
    .lean();
};

export const banUser = async (userId, isBanned) => {
  return User.findByIdAndUpdate(
    userId,
    { isBanned },
    { new: true }
  ).select('-passwordHash');
};

export const listAllRequests = async () => {
  return Request.find()
    .populate('book')
    .populate('owner', 'name')
    .populate('requester', 'name')
    .sort({ createdAt: -1 })
    .limit(200);
};
