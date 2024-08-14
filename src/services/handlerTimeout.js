export default function prepareTimeoutHandler(config, uuid, logger) {
  return function timeoutHandler(request, response, next) {
    response.locals.requestId = uuid();
    request.setTimeout(config.API_CLIENT_TIMEOUT, console.log);
    response.setTimeout(config.API_SERVER_TIMEOUT, console.log);
    next();
  };
};