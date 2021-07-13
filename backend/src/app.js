/* eslint-disable no-console */
import '@babel/polyfill';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import fileupload from 'express-fileupload';
import indexRouter from './routes';
import server from './server';

dotenv.config();
const app = express();
const { PORT } = process.env;
server();

/**
 * Middleware
 */
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  fileupload({
    createParentPath: true,
    useTempFiles: true,
  }),
);

app.use('/api/v1', indexRouter);

app.listen(
  PORT,
  console.log(`Server started at http://localhost:${PORT}`),
);

export default app;
