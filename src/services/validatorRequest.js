export default function prepareRequestValidator(
  {schemaRequest, HttpError, logHandler}
) {
  return function requestValidator(request, response, next) {
    next();
  };
};