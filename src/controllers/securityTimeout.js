import { v1 as uuid } from 'uuid';

export default function securityTimeout(request, response, next) {

  // Set a v1 uuid as requestId for tracking and logging
  response.locals.requestId = uuid();

  // Todo : move this to the configs
  const requestTimeoutTime = 5000;
  const responseTimeoutTime = 10000;

  function clientTimeoutResponse() {
    response.status(408).end();
  }
  function serverTimeoutResponse() {
    response.status(504).end();
  }

  request.setTimeout(requestTimeoutTime, clientTimeoutResponse);
  response.setTimeout(responseTimeoutTime, serverTimeoutResponse);
  next();
};