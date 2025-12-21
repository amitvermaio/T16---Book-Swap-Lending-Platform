import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import debug from 'debug';
import cookie from 'cookie';
import User from '../models/user.model.js';

const dbgr = debug('dev:socket');

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*', 
    },
  });

  io.use(async (socket, next) => {
    const token =
      socket.handshake.auth?.token || cookie.parse(socket.handshake.headers.cookie || '').token;

    if (!token) {
      socket.disconnect(true);
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded._id);
      socket.user = user;
      socket.join(`user:${userId}`);
      dbgr(`Socket connected: user ${userId}`);
      next();
    } catch (err) {
      dbgr('Socket auth error', err.message);
      next(err);
      socket.disconnect(true);
    }
  })

  io.on('connection', (socket) => {
    dbgr(`New socket connection: ${socket.id}`);
    socket.on('disconnect', () => {
      dbgr(`Socket disconnected: ${socket.id}`);
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};
