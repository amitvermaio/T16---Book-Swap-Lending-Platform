import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import routes from './routes/routes.js';
import { limiter } from './middlewares/rateLimiter.middleware.js';
import { notFound, errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(limiter);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api', routes);

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();  // No Content
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.use(notFound);
app.use(errorHandler);

export default app;
