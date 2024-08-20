export default function prepareTimeoutHandler(
  { config, randomUUID, logHandler, HttpError }
) {
  return function timeoutHandler(request, response, next) {

    response.locals.requestId = randomUUID();

    const clientTimeoutError = new HttpError(408);
    const serverTimeoutError = new HttpError(504);

    request.setTimeout(config.API_CLIENT_TIMEOUT, sendTimeout);
    response.setTimeout(config.API_SERVER_TIMEOUT, sendTimeout2);

    function sendTimeout() {
      return response.status(408).end();
    }
    function sendTimeout2() {
      return response.status(504).end();
    }

    next();
  };
};