'use strict';

const config = require('./config');
const { createLogger, format, transports } = require('winston');

const winstonLogger = createLogger({
    level: config.LOG_LEVEL,
    transports: [
        new transports.File({ filename: config.LOG_PATH+config.LOG_FILENAME, level: 'error' }),
        new transports.File({ filename: config.LOG_PATH+config.LOG_FILENAME, level: 'warn' }),
        new transports.File({ filename: config.LOG_PATH+config.LOG_FILENAME, level: 'info' }),
        new transports.Console({ format: format.simple()})
    ],
});

module.exports = (level, data) => {
  winstonLogger[level](JSON.stringify(data));
};