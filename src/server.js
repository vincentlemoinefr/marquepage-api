'use strict';

// at some point
var jwt = require('jsonwebtoken');

const database = require('./database/');
const routes = require('./routes/');
const config = require('./config/');
const logger = require('./logger/');
const express = require('express');

const middlewares = require('./middlewares');

const api = express()

// Express middleware here :
// Validation
// Authentification

// api.use(middlewares.timestamp);
api.use(express.json());
api.use('/', routes);

const https = require('https');
const server = https.createServer(config.API_HTTPS_OPTIONS, api);

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


// Now the request arrives at the Node JS API
// We need to pre-validate the data (basic structure checks)
// We will use joi for this task
// 1. Sanitize the headers, body, and parameters 
// 2. If we need body is there a body ? [post, put, patch, delete]
// 3. what else ? 
// Responses : 
// 413 : Payload Too Large
// 414 : URI Too Long
// 400 : Bad Request

// We want to check if any authentification is provided
// 1. No authentification was provided
// 2. Authentification was provided but is wrong type
// 3. Authentification was provided and is correct but invalid
// Responses :
// 401 : Unauthorized

// Now we have the http request with valid authentification
// 1. We pass the request to the correct controller
// 2. The individual controller need to validate the body and parameters if needed
// 3. The controller use a model to query the database
// 4. The controller send the appropriate response
// Responses :
// 200 : OK (With data)
// 201 : Created
// 204 : No Content (deleted correctly)
// 403 : Forbidden (you don't have authorization on this object)
// 404 : Not Found (but request was ok)
// 410 : Gone (object existed but was deleted)
// 422 : Unprocessable Content (JSON body has invalid data)

// default catch all route
// 404 Not found

// This is bad time.
// Can this really be reached if we have a catch all url ? 
// 50x Any server meltdown (log as critical and send 404 instead ?)

