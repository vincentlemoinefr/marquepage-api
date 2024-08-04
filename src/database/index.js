'use strict';

const { MongoClient } = require('mongodb');
const config = require('../config/');

let seedData = [
  {
    decade: '1970s',
    artist: 'Debby Boone',
    song: 'You Light Up My Life',
    weeksAtOne: 10
  },
  {
    decade: '1980s',
    artist: 'Olivia Newton-John',
    song: 'Physical',
    weeksAtOne: 10
  },
  {
    decade: '1990s',
    artist: 'Mariah Carey',
    song: 'One Sweet Day',
    weeksAtOne: 16
  }
];

function check_if_collection_exist() {

};

const mongo_db = {};

MongoClient.connect(config.MONGO_URL, function(err, client) {
  if (err) throw err;

  const mongo_db = client.db(config.MONGO_DB_NAME);
  const binder_collection = mongo_db.collection('binder');

  binder_collection.insert(seedData, function(err, result) {
    if(err) throw err;
    console.log('Added binder (lol) to collection');
    console.log(result);
  });
});

module.exports = mongo_db;