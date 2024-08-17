export default function prepareTimeoutHandler(config, uuid, HttpError, logger) {
  return function timeoutHandler(request, response, next) {

    response.locals.requestId = uuid();

    const clientTimeoutError = new HttpError(408);
    const serverTimeoutError = new HttpError(504);

    console.log(config.API_CLIENT_TIMEOUT);
    console.log(config.API_SERVER_TIMEOUT);

    request.setTimeout(1000, sendTimeout);
    response.setTimeout(1000, sendTimeout2);

    function sendTimeout() {
      return response.status(408).end();
    }
    function sendTimeout2() {
      return response.status(504).end();
    }


    next();
  };
};