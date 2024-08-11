module.exports = function binderReadById (request, response, next) {
  response.send({
    requestId : request.timestamp,
    responseStatus : 200,
    responseMessage : 'successful',
    id : request.params.binderId
  });
};