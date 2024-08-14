export default function prepareLogHandler(config, winston) {

  const { createLogger, format, transports } = winston;
  const path = config.LOG_PATH;
  const filename = config.LOG_FILENAME;

  const winstonLogger = createLogger({
    level: config.LOG_LEVEL,
    transports: [
      new transports.File({ filename: path + filename, level: 'error' }),
      new transports.File({ filename: path + filename, level: 'warn' }),
      new transports.File({ filename: path + filename, level: 'info' }),
      new transports.Console({ format: format.simple()})
    ],
  });

  return function logHandler(level, data) {
    winstonLogger[level](JSON.stringify(data));
  };
};