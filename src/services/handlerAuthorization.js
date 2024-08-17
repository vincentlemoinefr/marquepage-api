export default function prepareAuthorizationHandler(config, jwt, logger, database) {
  return function authorizationHandler(request, response, next) {
    controle.log('Passed in the AuthZ middleware');
    next();
  };
};