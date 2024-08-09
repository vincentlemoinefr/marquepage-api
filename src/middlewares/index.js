'use strict';
const files = require('fs').readdirSync('./src/middlewares/');

for (const file of files) {
  if (file !== 'index.js' && file.endsWith('.js')) {
    const name = file.replace('.js', '');
    exports[name] = require('./' + file);
  }
};