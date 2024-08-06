'use strict';

const mongo = require('./database/');
const config = require('./config/');
const logger = require('./logger');
const api = require('./api/');

const https = require('https');
const server = https.createServer(config.API_HTTPS_OPTIONS, api);

const { MongoClient } = require('mongodb');

let seedData =  {
  decade: '1970s',
  artist: 'Debby Boone',
  song: 'You Light Up My Life',
  weeksAtOne: 10
}

// async function fuckpromisesandasync() {
//   const mongo_client = new MongoClient(config.MONGO_URI);
//   const idkwhatthisis = await mongo_client.connect();
//   console.log('idkwhatthisis : ', idkwhatthisis);
//   const marquepage_db = mongo_client.db(config.MONGO_DB_NAME);
//   console.log('marquepage_db : ', marquepage_db);
//   const binder_collection = marquepage_db.collection('binder');
//   console.log('binder_collection : ', binder_collection);
//   binder_collection.insertOne(seedData);
// }


// fuckpromisesandasync();



server.listen(config.API_PORT, () => {
    logger('info', 'Server Listening on : https://'+config.API_HOST+'/');
});

// What my api should respond to a request, in order of priority
// references : 
// https://www.rfc-editor.org/rfc/rfc9457.html
// https://datatracker.ietf.org/doc/html/rfc7231

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
// Disable unwanted HTTP request : HEAD, CONNECT, OPTIONS, TRACE...


// now validating the parameters, weirds characters in any header or body
// body missing on post, put, patch, delete...
// note : we don't validate the data structure in body, we just need something to be there
// We can do that with joi
// 413/414 Payload Too Large / URI Too Long (could be 400 instead ?)
// OR 400 Bad Request

// We want to check if any authentification is provided
// If authentification is provided but wrong it's also a 401
// 401 Unauthorized
 
//// At this point the request was ok-ish : 20x OR 403 OR 404 OR 422
// 422 Unprocessable Content
// the json you sent was bad we can put that in DB silly

// We found what you were searching but you don't have access to it
// 403 Forbidden

// We didn't find what you were searching for
// Add a body so the requester know the request was valid
// 404 Not found

// We found what you were searching for and we did what you asked
// here is your data as json
// 20x Any Successful responses as needed
////

// default catch all route
// 404 Not found

// This is bad time.
// Can this really be reached if we have a catch all url ? 
// 50x Any server meltdown (log as critical and send 404 instead ?)

