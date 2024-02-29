import winston from 'winston';
import morgan from 'morgan';

const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: 'http',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    json(),
  ),
  transports: [new winston.transports.Console()],
});

const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms', {
  stream: {
    // Configure Morgan to use our custom logger with the http severity
    write: (message) => logger.http(message.trim()),
  },
});

export default morganMiddleware;
