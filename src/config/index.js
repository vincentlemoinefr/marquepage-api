'use strict';

// Load the skeleton (a joi object) the single source of truth for configs
const skeleton = require('./skeleton');

// We get all our configs from process.env, unnecessary envs are cut off
// We should have a way to read the current used config
const { value: config, error } = skeleton.validate(process.env);

console.log(process.env);
console.log(config);

if (error) {

  console.log('The api will not start if the configuration is not valid.');
  console.log('You need to add or set the following environnement variables :');


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
    useUnifiedTopology: true
  };

  config.API_HTTPS_OPTIONS = {
    cert: config.API_HTTPS_CRT,
    key: config.API_HTTPS_KEY
  };
  delete config.API_HTTPS_CRT;
  delete config.API_HTTPS_KEY;
}

module.exports = config;