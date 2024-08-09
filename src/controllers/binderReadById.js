'use strict';

module.exports = function binderReadById (request, response, next) {
  response.send(request.params.binderId);
}