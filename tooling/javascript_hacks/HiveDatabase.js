module.exports = class HiveDatabase {
    constructor (options = {}, libraries = {}) {

        // Default options
        this.mongoOptions = {
            useNewUrlParser: true,
            useUnifiedTopology : true
        }
        this.databaseName = '';
        this.databaseUri = '';
        this.connection = {};
        this.database = {};
        this.connectionStatus = 'DISCONNECTED'

        // Integrate options and Dependency Injection
        this.integrateConfig(options);
        this.integrateConfig(libraries);

        this.requirements = [
            'databaseName',
            'databaseUri',
            'MongoClient',
            'HiveEvents'
        ];

        this.validateConfig(this.requirements);
        this.dbStart();
    }
 

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
}