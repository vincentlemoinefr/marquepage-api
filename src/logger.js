'use strict';
// winston will live here

const config = require('./config');
const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
    level: config.LOG_LEVEL,
    transports: [
        new transports.File({ filename: config.LOG_PATH+config.LOG_FILENAME, level: 'error' }),
        new transports.File({ filename: config.LOG_PATH+config.LOG_FILENAME, level: 'warn' }),
        new transports.File({ filename: config.LOG_PATH+config.LOG_FILENAME, level: 'info' }),
        new transports.Console({ format: format.simple()})
    ],
});