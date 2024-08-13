// This will be the lats middleware, which will handle error
export default function securityErrorHandler(request, response, next) {
  const body = {
    requestId : response.locals.requestId,
    responseStatus : 500,
    responseMessage : 'Error'
  };
  response.status(500).json(body);
};