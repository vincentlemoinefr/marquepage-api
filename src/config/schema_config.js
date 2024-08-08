'use strict';
const joi = require('joi');

module.exports = joi.object({
  API_HOST: joi
    .string().max(253)
    .failover('localhost')
    .description('Hostname for the marquepage api'),
  API_PORT: joi
    .number().integer()
    .min(1).max(65535)
    .failover(443)
    .description('Port for the marquepage api'),
  API_PATH: joi
    .string().max(10)
    .failover('/')
    .description('Relative path to the marquepage api, after the domain name'),
  API_PROXY: joi
    .boolean()
    .failover(false)
    .description('Is the api behind a proxy'),
  API_HTTPS_CRT: joi
    .string()
    .description('Certificate cer in pem string format'),
  API_HTTPS_KEY: joi
    .string()
    .description('Certificate key in pem string format'),
  LOG_ENABLED: joi
    .boolean()
    .failover(true)
    .description('Enable logging to file'),
  LOG_LEVEL: joi
    .string()
    .valid('error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly')
    .failover('info')
    .description('Level of logging to do [npm winston]'),
  LOG_PATH: joi
    .string()
    .failover('./logs/')
    .description('Folder where the logs files are stored'),
  LOG_FILENAME: joi
    .string()
    .failover('marquepage.log')
    .description('Base name for the logs files'),
  LOG_ROTATE_ENABLED: joi
    .boolean()
    .failover(true)
    .description('Enable logs rotating'),
  LOG_ROTATE_FSIZE: joi
    .number().integer()
    .min(10).max(100)
    .failover(50)
    .description('Max file size for each log in MB'),
  LOG_ROTATE_FILES: joi
    .number().integer()
    .min(1).max(20)
    .failover(5)
    .description('Number of log files of LOG_ROTATE_FSIZE to keep'),
  LOG_ROTATE_ZIP: joi
    .boolean()
    .failover(true)
    .description('Compress logs files except current one'),
  MONGO_ENABLED: joi
    .boolean()
    .failover(true)
    .description('Disable mongodb for testing'),
  MONGO_URI_BASE: joi
    .string()
    .valid('mongodb://', 'mongodb+srv://')
    .failover('mongodb://')
    .description('Base mongodb uri, using srv or not'),
  MONGO_HOST: joi
    .string()
    .failover('localhost')
    .description('Hostname for the mongodb database'),
  MONGO_PORT: joi
    .number().integer()
    .min(1).max(65535)
    .failover(27017)
    .description('Port for the mongodb database'),
  MONGO_USERNAME: joi
    .string().max(64)
    .description('Username to connect to mongodb'),
  MONGO_PASSWORD: joi
    .string().max(64)
    .description('Password to connect to mongodb'),
  MONGO_DB_NAME: joi
    .string().max(64)
    .description('Database name for the api'),
  MONGO_COLLECTION_NAME: joi
    .string().max(64)
    .description('Collection name for the api'),
  MONGO_AUTHSOURCE: joi
    .string().max(64)
    .failover('authSource=admin')
    .description('Database where the credentials are stored'),
  MONGO_TIMEOUT: joi
    .number().integer()
    .min(1000).max(30000)
    .failover(5000)
    .description('Connection timeout to mongodb in milliseconds')
})
.options({
  presence: 'required',
  stripUnknown: true,
  abortEarly: false 
});