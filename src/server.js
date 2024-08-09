'use strict';

// Dependencies
const jsonwebtoken = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const express = require('express');
const https = require('https');
const joi = require('joi');
const fs = require('fs');


// const schemas = require('./schemas/')(fs, joi); // Will need joi
const schemaOptions = {};
const schemaLibraries = { fs : fs, joi : joi };
const schemaRequirements = [ 'fs', 'joi' ];

const Schemas = require('./schemas');
const schema1 = new Schemas(schemaOptions, schemaLibraries, schemaRequirements);

schema1.listFile();

console.log(schema1);

const request = { id : "66af8020fc13ae1c52e25f71" }
const {value, error} = schema1.schemaId.validate(request);
if (error) console.log(error);
console.log(value);
/*



console.log(schemas);







const config = require('./config')(schemas); // Need schema for config validation
const logger = require('./logger')(config);

// My classes
const database = require('./database');
const router = require('./router');

const controllers = require('./middlewares/')(database); // Will need database and shcemas
const middlewares = require('./middlewares/');


const middlewares = require('./middlewares');

const api = express()

api.use(middlewares.setTimeout);
api.use(express.json());
api.use('/', routes);
api.use(timeoutTest);
api.use(middlewares.errorHandler);

const server = https.createServer(config.API_HTTPS_OPTIONS, api);

function timeoutTest(request, response, next) {
  let count = 0;
  while (1) {
    count++;
  }
  next();
}


async function test() {
  const seedData =  {
    decade: '1970s',
    artist: 'Debby Boone',
    song: 'You Light Up My Life',
    weeksAtOne: 10
  };

  await database.connect();
  const create_result = await database.create(seedData);
  logger('info', 'added one row to the database');
  logger('info', create_result);
};

server.listen(config.API_PORT, () => {
    logger('info', 'Server Listening on : https://'+config.API_HOST+'/');
});

// What can be handled by nginx
// IP whitelist / blacklist
// Rate limiting
// Force https
// Wrong https protocol / cipher
// Require 2 Way SSL
// Request gateway timeout
// nginx can read OpenAPI ???
// https://www.f5.com/company/blog/nginx/from-openapi-to-nginx-as-an-api-gateway-using-a-declarative-api
// Load balancing
// ModSecurity
// https://www.acunetix.com/blog/web-security-zone/hardening-nginx/
// Disable unwanted HTTP request : HEAD, CONNECT, OPTIONS, TRACE...
// Http Logging
// Wrong or missing headers

*/