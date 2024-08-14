export default function prepareAuthentificationHandler(config, jwt, logger) {
  return function authentificationHandler(request, response, next) {
    response.status(500).end();
  };
};