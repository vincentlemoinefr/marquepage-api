'use strict';
const schema = require('../src/routes/schema.json');
const paths = Object.keys(schema.paths);
const fs = require('fs');
const content = '\'use strict\';';

const operationIds = [];
for (const path of paths) {
  const endpoint = schema.paths[path];
  const methods = Object.keys(endpoint);

  for (const method of methods) {
    operationIds.push(endpoint[method].operationId);
  }
};

for (const operationId of operationIds) {

  const file = './src/controllers/' + operationId + '.js';

  if (!fs.existsSync(file)) {
    
    fs.appendFile(file, content, (error) => {
      if (error)
        console.log(error);
      else
        console.log('Created or modified file : ' + file);
    });
  } else {
    console.log('Already exist : ' + file);
  }
};

