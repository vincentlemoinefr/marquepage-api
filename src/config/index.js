'use strict';

// Load the skeleton (a joi object) the single source of truth for configs
const skeleton = require('./skeleton');

// we get all our configs from process.env, unnecessary envs are cut off
const { value: config, error } = skeleton.validate(process.env);

if (error) {

  console.log("The api will not start if the configuration is not valid.");
  console.log("You need to add or set the following environnement variables :");

  error.details.forEach((error) => console.log(error.message));
  process.exit(1);

} else {

  // do extra config here
  config.MONGO_URL = config.MONGO_BASE + config.MONGO_HOST + ':' + config.MONGO_PORT;
  config.MONGO_OPTIONS = {
    connectTimeoutMS: config.MONGO_TIMEOUT,
    // Note : move these to config.js validator
    ssl: false,
    keepAlive: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  if (config.API_HTTPS_ENABLED) {

    config.REQUIRE_HTTP = 'https';
    config.API_HTTPS_OPTIONS = {
      cert: config.API_HTTPS_CER,
      key: config.API_HTTPS_KEY,
    };
    delete config.API_HTTPS_CER;
    delete config.API_HTTPS_KEY;

  } else {

    config.REQUIRE_HTTP = 'http';
    
  }
}

module.exports = config;