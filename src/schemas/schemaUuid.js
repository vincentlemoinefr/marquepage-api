export default function prepareSchemaUuid({ joi }) {
  return joi
    .string()
    .uuid({version : 'uuidv4'})
    .required();
};