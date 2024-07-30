'use strict';

const config = require('./config');
const logger = require('./logger');

logger.error(JSON.stringify(config));
logger.warn(JSON.stringify(config));
logger.info(JSON.stringify(config));
logger.error('borken');
logger.warn('warning!');


// Todo  : description.json
// What endpoits do we want ? 
// OpenAPI standard
// status : basic healthcheck info status
// info : api map 
// marquepages : uuid
//   -> page : uuid
//     -> uuid
//     -> Tittle
//     -> Url
//     -> Description
//     -> Subfolder
const apiDescription = require('./api/description.json')
const express = require('express');
const http = require(config.REQUIRE_HTTP);
const { MongoClient } = require('mongodb');
const marquepageApi = express();
const client = new MongoClient(config.MONGO_URL);
marquepageApi.use(express.json());

marquepageApi.get('/', (req, res) => {
    res.send(apiDescription);
});

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