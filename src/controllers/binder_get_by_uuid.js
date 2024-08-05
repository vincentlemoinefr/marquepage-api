'use strict';

module.exports = (request, response, next) => {

  console.log(request.params.binderUuid);

  response.send(request.params.binderUuid);


};