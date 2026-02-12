import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/routes.js';
import { limiter } from './middlewares/rateLimiter.middleware.js';
import { notFound, errorHandler } from './middlewares/error.middleware.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(limiter);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));

app.use('/api', routes);

app.use(express.static(distPath));

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();  // No Content
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(distPath, 'index.html'));
});

app.use(notFound);
app.use(errorHandler);

export default app;
