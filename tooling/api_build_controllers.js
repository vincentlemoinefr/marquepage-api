'use strict';
const schema = require('../src/routes/schema.json');
const logger = require('../src/logger')
const fs = require('fs');
const paths = Object.keys(schema.paths);

const operationIds = [];
for (const path of paths) {
  const endpoint = schema.paths[path];
  const methods = Object.keys(endpoint);

  for (const method of methods) {
    operationIds.push(endpoint[method].operationId);
  }
};

for (const operationId of operationIds) {

  const file = '../src/controllers/' + operationId + '.js';

  if (!fs.existsSync(file)) {
    logger('info','Created or modified file : ' + file);
    fs.appendFile(file, '\'use strict\';', doNothing);
  } else {
    logger('info','Already exist : ' + file);
  }
};

function doNothing () {};