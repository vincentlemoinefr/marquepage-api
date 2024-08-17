export default function prepareIdValidator(config, schemaId) {
  return function idValidator(request, response, next) {

    const id = request.params.binderId || request.params.bookmarkId;
    const { error } = schemaId.validate(id);

    // let i = 0;
    // while (1) {
    //   console.log(i++);
    // }

    if ( error === void 0) {
      next();
    } else {
      const error = new Error('Not a valid id');
      next(error);
    };
  };
};