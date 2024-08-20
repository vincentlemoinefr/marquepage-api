export default function prepareAdapterMongo({ mongoClient }) {
  const adapter = {};

  adapter.dbCreate = async function dbCreate(collection, data) {
    return await mongoClient.insertOne(data);
  };

  adapter.dbRead = async function dbRead(collection, id) {
    return await mongoClient.findOne(id);
  };

  adapter.dbRead = async function dbRead(collection, token) {
  };

  adapter.dbUpdate = async function dbUpdate(collection, id, data) {
    return await mongoClient.updateOne(id, {$set: data});
  };

  adapter.dbDelete = async function dbDelete(collection, id) {
    return await mongoClient.deleteOne(id);
  };

  return adapter;
};



  dbStart() {
    this.MongoClient.connect(this.databaseUri, this.mongoOptions)
    .then( client => {
      this.connection = client;
      this.database = this.connection.db(this.databaseName);
      this.connectionStatus = 'CONNECTED';
      this.HiveEvents.emit('databaseReady');
    })
    .catch( error => {
      throw new Error(error);
    });
  }

    
  disconnect() {
    this.connection.close();
  }

  toObjId(stringId) {
    return new ObjectID(stringId);
  }

  openStream(collection, pipeline) {
      return this.database.collection(collection).watch(pipeline);
  }

  findAndAggregate(collection, query) {
      return this.database.collection(collection).aggregate(query);
  } 

  create(collection, data) {
    return this.database.collection(collection).insertOne({...data});
  }

  findOne(collection, data, projection) {
    return this.database.collection(collection).findOne(data, projection);
  } 

  findAll(collection) {
    return this.database.collection(collection).find();
  }

  update(collection, id, data) {
    return this.database.collection(collection).updateOne(id, {$set: data}, {upsert : true});
  } 

  delete(collection, id) {
    return this.database.collection(collection).deleteOne(id);
  } 