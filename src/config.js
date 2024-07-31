'use strict';

// This file with load the config, while ./validators/config.js does the joi validation
const configSchema = require('./validators/config');

// we get all our configs from process.env, unnecessary envs are cut off, default if validation fail
const { value: config, error } = configSchema.validate(process.env);

if (error) {
    // api will not start if the configuration is not valid
    // we don't have winston yet so a wrong config will process.exit()

    console.log('The application exited because your configuration incorrect.')
    console.log('Change or add the following environnement variables : ')
    error.details.forEach(error => console.log(error.message));
    process.exit(1)
} else {
    // do extra config here
    config.MONGO_URL = config.MONGO_BASE+config.MONGO_HOST+':'+config.MONGO_PORT;
    config.MONGO_OPTIONS = {
        connectTimeoutMS: config.MONGO_TIMEOUT,
        // Note : move these to config.js validator
        ssl: false,
        keepAlive: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    // do we use HTTPS or not
    // We need to require cer and key if https is enabled, in joi
    if (config.API_HTTPS_ENABLED) {
        config.REQUIRE_HTTP = 'https';
        config.API_HTTPS_OPTIONS = {
            cert: config.API_HTTPS_CER,
            key: config.API_HTTPS_KEY
        };
        delete config.API_HTTPS_CER;
        delete config.API_HTTPS_KEY;
    } else {
        config.REQUIRE_HTTP = 'http';
    }
}

module.exports = config;