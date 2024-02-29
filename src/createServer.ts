import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import actuator from 'express-actuator';
import globalError from './middlewares/globalError';
import routes from './routes';
import CustomError from './utils/customError';
import morganMiddleware from './utils/logger-morgan';

const createServer = () => {
  const app = express();

  app.enable('trust proxy');
  app.use(cors());
  app.options('*', cors());

  app.use(morganMiddleware);

  if (process.env.NODE_ENV === 'development') {
    app.use(actuator());
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: '200mb' }));
  app.use('/', routes);

  app.all('/*', (req, res, next) => {
    next(new CustomError(`Not Found (${req.method} ${req.originalUrl})`, 404));
  });

  app.use(globalError);

  return app;
};

export default createServer;
