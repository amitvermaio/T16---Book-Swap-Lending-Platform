import Notification from '../models/notification.model.js';

export const listNotifications = async (userId) => {
  return Notification.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(100);
};

export const markNotificationRead = async (userId, notifId) => {
  return Notification.findOneAndUpdate(
    { _id: notifId, user: userId },
    { isRead: true },
    { new: true }
  );
};

export const markAllRead = async (userId) => {
  await Notification.updateMany(
    { user: userId, isRead: false },
    { isRead: true }
  );
};
