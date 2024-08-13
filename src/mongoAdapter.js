export default function adapterMongoDB(mongoClient, log) {
  const adapter = {
    connection: null,
    database: null,
    collection: null,
    available: false
  };

  adapter.connect = async function connect(config) {
    adapter.connection = await mongoClient
      .connect(config.MONGO_URI, config.MONGO_OPTIONS);
    log('info', 'Database connection ok');
    console.log(adapter.connection);

    adapter.database = adapter.connection
      .db(config.MONGO_DB_NAME);
    log('info', 'Database selected');
    console.log(adapter.database);

    adapter.collection = adapter.database
      .collection(config.MONGO_COLLECTION_NAME);
    log('info', 'Collection selected');
    console.log(adapter.collection);
    
    adapter.available = true;
  };

  adapter.disconnect = function disconnect() {
    if (adapter.connection !== null) {
      adapter.connection.close();
      adapter.available = false;
    };
  };

  adapter.dbCreate = async function dbCreate(data) {
    if (adapter.available === true)
      return await adapter.collection.insertOne(data);
  };

  adapter.dbRead = async function dbRead(id) {
    if (adapter.available === true)
      return await adapter.collection.findOne(id);
  };

  adapter.dbUpdate = async function dbUpdate(id, data) {
    if (adapter.available === true)
      return await adapter.collection.updateOne(id, {$set: data});
  };

  adapter.dbDelete = async function dbDelete(id) {
    if (adapter.available === true)
      return await adapter.collection.deleteOne(id);
  };

  return adapter;
};

