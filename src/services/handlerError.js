export default function prepareErrorHandler(config, logger) {
  return function errorHandler(error, request, response, next) {

    const body = {
      requestId: response.locals.requestId,
      responseStatus: error.statusCode,
      responseMessage: error.message,

      // Weird syntaxt : if (context) : add the property 'respondeContext'
      // https://stackoverflow.com/questions/11704267/in-javascript-how-to-conditionally-add-a-member-to-an-object
      ...(error.context) && {responseContext: error.context}
    };

    console.log(error.stack); // don't send this


    return response
      .status(error.statusCode)
      .json(body)
      .end();
  };
};