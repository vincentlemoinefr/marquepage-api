'use strict';
const schema = require('../routes/schema.json');

module.exports = (request, response) => {
    response.json(schema);
};