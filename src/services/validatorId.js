export default function prepareIdValidator(
  { schemaUuid, HttpError, logHandler }
) {
  return function idValidator(request, response, next) {

    const id = request.params.binderId || request.params.bookmarkId;
    const { error } = schemaUuid.validate(id);

    if ( error === void 0) {
      next();
    } else {
      const error = new HttpError(404, 'Not a valid id');
      next(error);
    };
  };
};