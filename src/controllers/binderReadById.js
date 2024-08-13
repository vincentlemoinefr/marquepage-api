export default function binderReadById(request, response, next) {
  const body = {
    requestId : response.locals.requestId,
    responseStatus : 200,
    responseMessage : 'successful',
    id : request.params.binderId
  };

  response.status(200).json(body);
};