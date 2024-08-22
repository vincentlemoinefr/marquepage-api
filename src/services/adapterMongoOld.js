export default function prepareBinderClient(
  { config, MongoClient, logHandler }
) {
  return class BinderClient extends MongoClient {
    constructor() {
      super(config.MONGO_URI, config.MONGO_OPTIONS);

      this.connectionStatus = 'DISCONNECTED';

      this.connect()
      .then( () => {
        this.database = this.db(config.MONGO_DB_NAME);
        this.coll = this.database.collection(config.MONGO_COLLECTION_NAME);
        
        console.log('connected');
        this.connectionStatus = 'CONNECTED';
      })
      .catch( (error) => {
        console.log('not connected');
        this.connectionStatus = 'DISCONNECTED';
        throw new Error(error);
      });
    };

    create(data) {
      return this.coll.insertOne({...data});
    };
    read(data) {
      return this.coll.findOne(data);
    };
    update() {};
    delete() {};
  };
};
/*
binderClient.create('binder', )

export default function prepareAdapterMongo({ mongoClient }) {
  const adapter = {};

  adapter.dbCreate = function dbCreate(collection, data, callback) {
    return mongoClient.insertOne(data);
  };

  adapter.dbRead = function dbRead(collection, id) {
    return mongoClient.findOne(id);
  };

  adapter.dbRead = function dbRead(collection, token) {
  };

  adapter.dbUpdate = function dbUpdate(collection, id, data) {
    return mongoClient.updateOne(id, {$set: data});
  };

  adapter.dbDelete = function dbDelete(collection, id) {
    return mongoClient.deleteOne(id);
  };

  return adapter;
};




const mongoClient = new MongoClient(URI, OPTIONS);

function contactMongo(mongoClient) {
  await mongoClient.connect();
  await mongoClient.db('admin').command({ ping: 1 });
}

const bindersDb = 
const logsDb =


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



  const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


  async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}

*/