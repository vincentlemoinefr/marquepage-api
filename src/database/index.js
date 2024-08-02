'use strict';

const { MongoClient } = require('mongodb');
const config = require('../config/');

const db = {};

MongoClient.connect(config.MONGO_URL, function(err, db) {
  if (err) throw err;
  console.log('Database created!');
  db.close();
});

module.exports = db;


