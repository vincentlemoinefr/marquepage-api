module.exports = (request, response, next) => {
  request.timestamp = Date.now();
  next();
}