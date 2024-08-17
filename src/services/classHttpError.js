export default function prepareHttpError(STATUS_CODES) {
  return class HttpError extends Error {
    constructor(statusCode, message, context) {
      super(message || STATUS_CODES[statusCode]);
      this.statusCode = statusCode;
      if (arguments.length === 3 && context) this.context = context
    };
  };
};