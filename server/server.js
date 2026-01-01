import 'dotenv/config';

import http from 'http';
import app from './src/app.js';
import connectDB from './src/config/db.js';
import { initSocket } from './src/sockets/socket.js';
import debug from 'debug';

const dbgr = debug("dev:server");
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();

    const server = http.createServer(app);
    initSocket(server);

    server.listen(PORT, () => {
      dbgr(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    dbgr('Failed to start server', err);
    process.exit(1);
  }
};

start();
