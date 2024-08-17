export default function adapterMongoDB(mongoClient, log) {
  const adapter = {};

  adapter.dbCreate = async function dbCreate(data) {
    return await mongoClient.insertOne(data);
  };

  adapter.dbRead = async function dbRead(id) {
    return await mongoClient.findOne(id);
  };

  adapter.dbUpdate = async function dbUpdate(id, data) {
    return await mongoClient.updateOne(id, {$set: data});
  };

  adapter.dbDelete = async function dbDelete(id) {
    return await mongoClient.deleteOne(id);
  };

  return adapter;
};

