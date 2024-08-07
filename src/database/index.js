'use strict';

const config = require('../config/');
const { MongoClient } = require('mongodb');

class Database {
  constructor(mongo_uri, mongo_db_name, mongo_collection_name) {
    this.mongo_uri = mongo_uri;
    this.mongo_database_name = mongo_db_name;
    this.mongo_collection_name = mongo_collection_name;
    this.mongo_connection = null;
    this.mongo_database = null;
    this.mongo_collection = null;
    this.mongo_available = false;
  }

  async connect() {
    this.mongo_connection = await MongoClient.connect(this.mongo_uri);
    this.mongo_database = this.mongo_connection.db(this.mongo_database_name);
    this.mongo_collection = this.mongo_database.collection(this.mongo_collection_name);
    this.mongo_available = true;
  }

  disconnect() {
    if (this.mongo_connection !== null) {
      this.mongo_connection.close();
    }
    this.mongo_available = false;
  }

  async read(query) {
    let read_result = null;
    if (this.mongo_collection !== null) {
      read_result = await
        this.mongo_collection.findOne(query);
    }
    return read_result;
  }

  async readMany(query) {
    let read_results = null;
    if (this.mongo_collection !== null) {
      read_results = await
        this.mongo_collection.fin(query).toArray();
    }
    return read_results;
  }

  async create(document) {
    let create_result = null;
    if (this.mongo_collection !== null) {
      create_result = await
        this.mongo_collection.insertOne(document);
    }

    return create_result;
  }

  async update(query, document) {
    let update_result = null;
    if (this.mongo_collection !== null) {
      update_result = await
        this.mongo_collection.updateOne(query, {$set: document});
    }
  }

  async delete(query) {
    let detele_result = null;
    if (this.mongo_collection !== null) {
      detele_result = await
        this.mongo_collection.deleteOne(query);
    }
    return detele_result
  }
}

module.exports =
  new Database(
    config.MONGO_URI,
    config.MONGO_DB_NAME,
    config.MONGO_COLLECTION_NAME
  );