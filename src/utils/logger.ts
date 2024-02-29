import winston from 'winston';
const { combine, timestamp, json, errors, colorize } = winston.format;
import 'winston-daily-rotate-file';

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: './logs/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

const logger = winston.createLogger({
  levels: logLevels,
  level: process.env.LOG_LEVEL || 'info',
  defaultMeta: {
    service: 'express-service',
  },
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    json(),
    errors({ stack: true }),
  ),
  transports: [
    new winston.transports.Console({
      format: combine(colorize()),
      handleExceptions: true,
    }),
    fileRotateTransport,
  ],
});

export default logger;
