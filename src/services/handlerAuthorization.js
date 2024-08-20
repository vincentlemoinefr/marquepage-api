export default function prepareAuthorizationHandler(
  { config, jsonwebtoken, logHandler, HttpError, database }
) {
  return function authorizationHandler(request, response, next) {
    controle.log('Passed in the AuthZ middleware');
    next();
  };
};