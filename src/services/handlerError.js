export default function prepareErrorHandler(config, logger) {
  return function errorHandler(request, response, next) {
    const body = {
      requestId : response.locals.requestId,
      responseStatus : 500,
      responseMessage : 'Error'
    };
    response.status(500).json(body);
  };
};