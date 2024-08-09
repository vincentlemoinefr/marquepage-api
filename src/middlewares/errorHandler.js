module.exports = function error (error, request, response, next) {
  response
    .status(error.status)
    .send({ error: error })
    .end();
};