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