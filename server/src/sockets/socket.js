import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import debug from "debug";
import cookie from "cookie";
import User from "../models/user.model.js";

const dbgr = debug("dev:socket");

let io;
export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        cookie.parse(socket.handshake.headers.cookie || "").token;

      if (!token) return next(new Error("Authentication error"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded._id).select("_id name email");

      if (!user) return next(new Error("User not found"));

      socket.user = user;
      socket.join(`user:${user._id}`);

      dbgr(`🔌 User connected: ${user._id}`);
      next();
    } catch (err) {
      dbgr("Socket auth error:", err.message);
      next(err);
    }
  });

  io.on("connection", (socket) => {
    dbgr(`Socket connected: ${socket.id}`);

    socket.on("disconnect", () => {
      dbgr(`Socket disconnected: ${socket.id}`);
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};

export const emitNotification = (userId, notification) => {
  if (!io) return;

  io.to(`user:${userId}`).emit("notification:new", {
    _id: notification._id,
    type: notification.type,
    title: notification.title,
    message: notification.message,
    data: notification.data,
    isRead: notification.isRead,
    createdAt: notification.createdAt,
  });

  dbgr(`Notification sent to user:${userId}`);
};
