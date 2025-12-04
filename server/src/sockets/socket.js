import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*', 
    },
  });

  io.on('connection', (socket) => {
    const token =
      socket.handshake.auth?.token || socket.handshake.query?.token;

    if (!token) {
      socket.disconnect(true);
      return;
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const userId = payload.id;
      socket.join(`user:${userId}`);
      console.log(`Socket connected: user ${userId}`);

      socket.on('disconnect', () => {
        console.log(`Socket disconnected: user ${userId}`);
      });
    } catch (err) {
      console.error('Socket auth error', err.message);
      socket.disconnect(true);
    }
  });
};

export const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};
