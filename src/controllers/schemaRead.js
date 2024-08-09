'use strict';
const schema = require('../routes/schema.json');

module.exports = function binderCreate (request, response, next) {
  console.log(request.timestamp);
  response.json(schema);
};