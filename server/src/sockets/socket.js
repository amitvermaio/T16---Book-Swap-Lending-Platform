import 'dotenv/config';
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import debug from "debug";
import User from "../models/user.model.js";

const dbgr = debug("dev:socket");

let io;
export const initSocket = (server) => {
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://reader-haven.onrender.com',
    'http://localhost:5173',
  ].filter(Boolean);

  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) return next(new Error("Authentication error"));

      // eslint-disable-next-line no-undef
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("_id name email");

      if (!user) return next(new Error("User not found"));

      socket.user = user;
      socket.join(`user:${user._id}`);

      dbgr(`User connected: ${user._id}`);
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
