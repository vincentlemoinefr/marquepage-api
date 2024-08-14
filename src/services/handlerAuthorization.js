export default function prepareAuthorizationHandler(config, jwt, logger, database) {
  return function authorizationHandler(request, response, next) {
    response.status(500).end();
  };
};