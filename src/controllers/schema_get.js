'use strict';
const schema = require('../routes/schema.json');

module.exports = (request, response) => {
  console.log(request.timestamp);
  response.json(schema);
};