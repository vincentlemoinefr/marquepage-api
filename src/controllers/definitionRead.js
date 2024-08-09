'use strict';
const definition = require('../routes/definition.json');

module.exports = function binderCreate (request, response, next) {
  console.log(request.timestamp);
  response.json(definition);
};