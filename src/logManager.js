export default function logManager(config, winston) {

  const { createLogger, format, transports } = winston;

  const winstonLogger = createLogger({
      level: config.LOG_LEVEL,
      transports: [
          new transports.File({ filename: config.LOG_PATH+config.LOG_FILENAME, level: 'error' }),
          new transports.File({ filename: config.LOG_PATH+config.LOG_FILENAME, level: 'warn' }),
          new transports.File({ filename: config.LOG_PATH+config.LOG_FILENAME, level: 'info' }),
          new transports.Console({ format: format.simple()})
      ],
  });

  return function log(level, data) {
    winstonLogger[level](JSON.stringify(data));
  };
};
