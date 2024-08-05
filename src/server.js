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

// IP whitelist / blacklist
// IP whitelist are cool, blacklist not very much but the feature can be useful
// We should also manage ip ranges like apache
// Should return a 403

// X request per IP per Y amount of time
// Fast check, only require lookup in memory for IP, dont save in DB
// Don't forget about reverse proxies
// 429 Rate limited

// No https -> 403
// We need a list of protocoles and ciphers for this... how does it work in node ?
// 403 Not accepting normal http

// At this point 426 
// you are not using the secure protocol we want 
// 426 Upgrade Required

// Now we could require 2 Way SSL
// Return 403 if not set or client certificate is invalid

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

// At anypoint of the stack (how to do that ???), if the request already took more than 1 second to respond
// eg : the database or filesystem is taking over 1 second to respond, send a 408
// 408 Request Timeout