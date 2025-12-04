import {
  listNotifications,
  markNotificationRead,
  markAllRead,
} from '../services/notification.service.js';

export const listNotificationsController = async (req, res, next) => {
  try {
    const notifications = await listNotifications(req.user.id);
    res.json({ notifications });
  } catch (err) {
    next(err);
  }
};

export const markNotificationReadController = async (req, res, next) => {
  try {
    const notif = await markNotificationRead(req.user.id, req.params.id);
    res.json({ notification: notif });
  } catch (err) {
    next(err);
  }
};

export const markAllReadController = async (req, res, next) => {
  try {
    await markAllRead(req.user.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
