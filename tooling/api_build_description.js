// This will help me with deployment
// Convert YAML -> JSON
// Create controllers if they don't exist
// We could do a docker helper too
// Build the ssl script as well ?
// We need to create the configuration .md from the joi object

'use strict';
const description = require('../src/api/description');
const logger = require('../src/logger/')
const fs = require('fs');
const paths = Object.keys(description.paths);

const operationIds = [];
for (const path of paths) {
  const endpoint = description.paths[path];
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