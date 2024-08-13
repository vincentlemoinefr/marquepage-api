export default function schemaId(joi) {
  return joi.object({
    id: joi
      .string()
      .hex()
      .length(24)
      .required()
  });
};