const joi = require('joi');

module.exports = joi.object({
    NODE_ENV: joi
        .string()
        .valid('dev','test','prod')
        .required()
        .failover('dev')
        .description('Your working environnement'),
    API_HOST: joi
        .string()
        .required()
        .failover('localhost')
        .description('Hostname for the marquepage api'),
    API_PORT: joi
        .number()
        .integer()
        .min(1)
        .max(65535)
        .required()
        .failover(8080)
        .description('Port for the marquepage api'),
    API_PATH: joi
        .string()
        .required()
        .failover('/')
        .description('Relative path to the marquepage api, after the domain name'),
    API_PROXY: joi
        .boolean()
        .required()
        .failover(false)
        .description('Is the api behind a proxy'),
    API_HTTPS_ENABLED: joi
        .boolean()
        .required()
        .failover(false)
        .description('Does the api force HTTPS or not'),
    API_HTTPS_CER: joi
        .string()
        .allow('')
        .description('Certificate cer [the certificate in PEM form, not the path]'),
    API_HTTPS_KEY: joi
        .string()
        .allow('')
        .description('Certificate key [the certificate in PEM form, not the path]'),
    LOG_ENABLED: joi
        .boolean()
        .required()
        .failover(true)
        .description('Enable logging to file'),
    LOG_LEVEL: joi
        .string()
        .valid('error','warn','info','http','verbose','debug','silly')
        .required()
        .failover('info')
        .description('Level of logging to do [npm winston]'),
    LOG_PATH: joi
        .string()
        .required()
        .failover('/data/logs/')
        .description('Folder where the logs files are stored'),
    LOG_FILENAME: joi
        .string()
        .required()
        .failover('marquepage.log')
        .description('Base name for the logs files'),
    LOG_ROTATE_ENABLED: joi
        .boolean()
        .required()
        .failover(true)
        .description('Enable logs rotating'),
    LOG_ROTATE_FSIZE: joi
        .number()
        .integer()
        .min(10)
        .max(100)
        .required()
        .failover(50)
        .description('Max file size for each log in MB'),
    LOG_ROTATE_FILES: joi
        .number()
        .integer()
        .min(1)
        .max(20)
        .required()
        .failover(5)
        .description('Number of log files of "LOG_ROTATE_FSIZE" to keep'),
    LOG_ROTATE_ZIP: joi
        .boolean()
        .required()
        .failover(true)
        .description('Compress logs files except current one'),
    MONGO_BASE: joi
        .string()
        .valid('mongodb://','mongodb+srv://')
        .required()
        .failover('mongodb://')
        .description('Base mongodb uri, using srv or not'),
    MONGO_HOST: joi
        .string()
        .required()
        .failover('localhost')
        .description('Hostname for the mongodb database'),
    MONGO_PORT: joi
        .number()
        .integer()
        .min(1)
        .max(65535)
        .required()
        .failover(27017)
        .description('Port for the mongodb database'),
    MONGO_BDNAME: joi
        .string()
        .required()
        .failover('marquepage')
        .description('Database name inside mongodb'),
    MONGO_USERNAME: joi
        .string()
        .required()
        .description('Username to connect to mongodb'),
    MONGO_PASSWORD: joi
        .string()
        .required()
        .description('Password to connect to mongodb'),
    MONGO_AUTHSOURCE: joi
        .string()
        .required()
        .failover('admin')
        .description('Database where the credentials are stored'),
    MONGO_TIMEOUT: joi
        .number()
        .integer()
        .min(1000)
        .max(30000)
        .required()
        .failover(5000)
        .description('Connection timeout in milliseconds')
})
.options({ stripUnknown: true });