export function Id(data, joi) {

  const schema = joi.object({
    id: joi
      .string()
      .hex()
      .length(24)
      .required()
  });

  const object = {};

  const {value, error} = schema.validate(data);

  if (error) {
    object.valid = false;
    object.errors = error.details;
  } else {
    for (const key in value)
      object[key] = value[key];
  };

  return object;
};


const files = require('fs').readdirSync('./src/controllers/');

for (const file of files) {
  if (file !== 'index.js' && file.endsWith('.js')) {
    const name = file.replace('.js', '');
    exports[name] = require('./' + file);
  }
};