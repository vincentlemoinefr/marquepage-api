'use strict';
const description = require('../api/description');

module.exports = (request, response) => {
    response.json(description);
};