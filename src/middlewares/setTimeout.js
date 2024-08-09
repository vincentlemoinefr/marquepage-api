'use strict';
// https://datatracker.ietf.org/doc/html/rfc4122
const uuid = require('uuid');


// https://github.com/expressjs/express/issues/3330
const requestTimeout = 5000;
function clientTimeout(next) {
  let error = new Error('Request Timeout');
  error.status = 408;
  next(error);
}

const responseTimeout = 10000;
function serverTimeout(next) {
  let error = new Error('Service Unavailable');
  error.status = 503;
  next(error);
}

module.exports = function timestamp (request, response, next) {
  request.timestamp = uuid.v1();
  request.setTimeout(requestTimeout, clientTimeout);
  response.setTimeout(responseTimeout, serverTimeout);
  next();
};