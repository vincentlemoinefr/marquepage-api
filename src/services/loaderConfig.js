export default function loadConfig(data, schema) {

  const { value: config , error } = schema.validate(data);

  if (error !== void 0) {
    console.log('Terminating process because configurations are required :');
    for (const detail of error.details) console.log(detail.message);
    process.exit(1);
  };

  return config;
};