'use strict';

const joi = require('joi');

module.exports = joi
  .object({
    id: joi
      .string()
      .hex()
      .length(24)
      .description('A MongoDB _id in string format')
  })
  .options({
    presence: 'required',
    stripUnknown: true,
    abortEarly: true 
  });


