export default function prepareAuthentificationHandler(config, jwt, logger) {
  return function authentificationHandler(request, response, next) {
    controle.log('Passed in the AuthN middleware');
    next();
  };
};