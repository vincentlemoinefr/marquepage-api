import joi from 'joi';

const transformConfig = (value, helpers) => {

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
}

const schema = joi.object({
  CERT: joi
    .string()
    .failover('public cert'),
  EZAEZAEZA: joi
    .string(),
  KEY: joi
    .string()
    .failover('secret key')
})
.options({
  presence: 'required', // Everything is required
  stripUnknown: true,   // Remove all process.env variable we don't need
  abortEarly: false     // Show all errors
}).custom(transformConfig);

const { value, error } = schema.validate(process.env);
if (error !== void 0) console.log(error.details)
console.log(value)

