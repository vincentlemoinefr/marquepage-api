'use strict';

const config = require('./config/');
const logger = require('./logger');
const api = require('./api/');

const https = require('https');
const server = https.createServer(config.API_HTTPS_OPTIONS, api);

server.listen(config.API_PORT, () => {
    logger.info('Server Listening on : https://'+config.API_HOST+'/');
});