'use strict';

const config = require('./config');
const logger = require('./logger');

// logger.info(JSON.stringify(config));
// logger.error('borken');
// logger.warn('warning!');

const apiDescription = require('./api/description.json');
const paths = Object.keys(apiDescription.paths);
const express = require('express');
const marquepageApi = express();
const router = express.Router();

const controllers = require('./controllers/')

const routes = [
    { 'method' : 'get', 'path' : '/api', 'controller' : 'readOpenapi' },
    { 'method' : 'get', 'path' : '/binder', 'controller' : 'readBinder' },
    { 'method' : 'get', 'path' : '/binder', 'controller' : 'doSomething' }
];



for (const route of routes) {
    router[route.method](route['path'],controllers[route.controller]);
};

marquepageApi.use('/', router);












const http = require(config.REQUIRE_HTTP);
const { MongoClient } = require('mongodb');
const client = new MongoClient(config.MONGO_URL);
marquepageApi.use(express.json());


marquepageApi.get('/status', (req, res) => {
    res.send({'Status': 'Running'});
});

marquepageApi.get('/test/:key([0-9]{4})', (req, res) => {
    console.log(req.params);
    res.send("Data captured is :" + req.params.key);
});

marquepageApi.listen(config.API_PORT, () => {
    console.log("Server Listening on : http://"+config.API_HOST+":"+config.API_PORT);
});