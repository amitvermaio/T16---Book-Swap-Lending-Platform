import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/routes.js';
import { notFound, errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());
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
