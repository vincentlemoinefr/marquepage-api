export default function configManager(data, schema) {
  const { value, error } = schema.validate(data);

  if (error) {
    console.log('You need to add or set the following environment variables :');
    for (const detail of error.details) {
      console.log(detail.message);
    };
    process.exit(1);
  }

  value.MONGO_URI = value.MONGO_URI_BASE
    + encodeURIComponent(value.MONGO_USERNAME)
    + ':' + encodeURIComponent(value.MONGO_PASSWORD)
    + '@' + value.MONGO_HOST
    + ':' + value.MONGO_PORT
    + '/' + value.MONGO_DB_NAME
    + '?' + value.MONGO_AUTHSOURCE;

  value.MONGO_OPTIONS = {
    connectTimeoutMS: value.MONGO_TIMEOUT,
    ssl: false,
  };

  delete value.MONGO_TIMEOUT;

  value.API_HTTPS_OPTIONS = {
    cert: value.API_HTTPS_CRT,
    key: value.API_HTTPS_KEY
  };

  delete value.API_HTTPS_CRT;
  delete value.API_HTTPS_KEY;

  return value;
};