export default function prepareRequestValidator(config, schemaHttp) {
  return function requestValidator(request, response, next) {
    next();
  };
};