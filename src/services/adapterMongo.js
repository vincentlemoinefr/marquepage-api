export default async function prepareBinderCollection(
  { config, MongoClient, logHandler }
) {
  const client = new MongoClient(config.MONGO_URI, config.MONGO_OPTIONS);

  await client.connect();

  const database = client.db(config.MONGO_DB_NAME);
  const collection = database.collection(config.MONGO_COLLECTION_NAME);

  return collection;
};