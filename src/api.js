'use strict';

const configSchema = require('./validators/config');

// we get all our configs from process.env, unnecessary envs are cut off, default if validation fail
const {value: config, error} = configSchema.validate(process.env);

if (error) {
    // api will not start if the configuration is not valid
    // we don't have winston yet so a wrong config will crash the apî
    console.log('error object : ', error);
    throw new Error('Configuration is not valid');
} else {
    // do extra config here
    config.MONGO_URL = config.MONGO_BASE+config.MONGO_HOST+':'+config.MONGO_PORT;
    config.MONGO_OPTIONS = {
        connectTimeoutMS: config.MONGO_TIMEOUT,
        // Note : move these to the config.js
        ssl: false,
        keepAlive: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    // do we use HTTPS or not
    if (config.API_HTTPS_ENABLED) {
        config.REQUIRE_HTTP = 'https';
        config.API_HTTPS_OPTIONS = {
            cert: config.API_HTTPS_CER,
            key: config.API_HTTPS_KEY
        };
    } else {
        config.REQUIRE_HTTP = 'http';
    }
}

console.log('config object : ', config);

// Todo : load winston

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
const apiDescription = require('./description.json')
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