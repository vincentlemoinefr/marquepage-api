// import jsonwebtoken from 'jsonwebtoken';
// import { MongoClient } from 'mongodb';
// import express from 'express';
// import https from 'https';
// import fs from 'fs';


import joi from 'joi';
import { BookmarkBuilder } from '#schemas/schemaBookmark';

const data = { id : "66af8020fc13ae1c52e25f73" };
const builder = new BookmarkBuilder(joi);

const bookmark = builder.build(data);

bookmark.echo();





/*
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