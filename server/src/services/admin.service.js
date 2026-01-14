import User from '../models/user.model.js';
import Request from '../models/request.model.js';

const notselectedFields = `
  -passwordHash -lendingPreferences -favorites
  -emailVerificationOTP -emailVerificationOTPExpiry
  -resetPasswordOTP -resetPasswordOTPExpiry
  `;

export const listUsers = async () => {
  return await User.find({ role: { $ne: 'superadmin' } })
    .select(notselectedFields)
    .limit(40)
    .sort({ createdAt: -1 })
    .lean();
};

export const changeUserRole = async (userId, newRole) => {
  return User.findByIdAndUpdate(
    userId,
    { $set: { role: newRole } },
    { new: true }
  ).select(notselectedFields);
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
