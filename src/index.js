'use strict';

// We need to validate env config at the beginning
// Transfort relevant process.env in conf.something
// load conf only once

// build a conf object based on env
const conf = {};


conf.API_PORT = process.env.API_PORT || 3000;

process.env.API_PORT = 3000;
process.env.DB_HOST = '127.0.0.1';
process.env.DB_PORT = 27017;
process.env.DB_NAME = 'marquepagedb';
process.env.DB_BASE = 'mongodb://';

const express = require('express');
const { MongoClient } = require('mongodb');
const marquepageApi = express();

const url = process.env.DB_BASE+process.env.DB_HOST+':'+process.env.DB_PORT;
const client = new MongoClient(url);

marquepageApi.use(express.json());
marquepageApi.listen(process.env.API_PORT, () => {
    console.log("Server Listening on PORT:", process.env.API_PORT);
});

marquepageApi.get('/status', (request, response) => {
    const status = {
        'Status': 'Running'
    };

    console.log(request);

    response.send(status);
});