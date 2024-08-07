'use strict';

module.exports = (request, response, next) => {
  response.send(request.params.binderUuid);
};