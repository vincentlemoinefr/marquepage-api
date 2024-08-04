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

async function fuckpromisesandasync() {
  const mongo_client = new MongoClient(config.MONGO_URI);
  const idkwhatthisis = await mongo_client.connect();
  console.log('idkwhatthisis : ', idkwhatthisis);
  const marquepage_db = mongo_client.db(config.MONGO_DB_NAME);
  console.log('marquepage_db : ', marquepage_db);
  const binder_collection = marquepage_db.collection('binder');
  console.log('binder_collection : ', binder_collection);
  binder_collection.insertOne(seedData);
}


fuckpromisesandasync();


logger.info(JSON.stringify(config));

server.listen(config.API_PORT, () => {
    logger.info('Server Listening on : https://'+config.API_HOST+'/');
});