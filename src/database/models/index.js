'use strict';
const files = require('fs').readdirSync('./src/models/');

for (const file of files) {
    if (file !== 'index.js') {
        const name = file.replace('.js', '');
        exports[name] = require('./' + file);
    }
};