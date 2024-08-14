export default function prepareIdValidator(config, schemaId) {
  return function idValidator(request, response, next) {
    response.status(500).end();
  };
};