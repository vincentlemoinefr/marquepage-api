'use strict';

const logger = require('./logger');
const config = require("./config/");

const controllers = require('./controllers/')
const description = require('./api/description');

const http = require('http');
const https = require('https');
const express = require('express');
const api = express();

var httpsServer = https.createServer(config.API_HTTPS_OPTIONS, api);

api.use(express.json());

let routes = [];
const paths = Object.keys(description.paths);

for (const path of paths) {

    const endpoint = description.paths[path];
    const methods = Object.keys(endpoint);

    for (const method of methods) {
        routes.push({
            'path' : path,
            'method' : method,
            'controller' : endpoint[method].operationId
        });
    }
};

for (const route of routes) {
    try {
        // note we can pass an array of "middlewares" they are executed in order
        api[route.method](route.path,controllers[route.controller]);
    } catch (e) {

    }
};

httpsServer.listen(config.API_PORT, () => {
    logger.info('Server Listening on : https://'+config.API_HOST+':'+config.API_PORT+'/');
});