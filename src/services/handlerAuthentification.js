export default function prepareAuthentificationHandler(
  { config, jsonwebtoken, logHandler, HttpError }
) {
  return function authentificationHandler(request, response, next) {
    controle.log('Passed in the AuthN middleware');
    next();
  };
};