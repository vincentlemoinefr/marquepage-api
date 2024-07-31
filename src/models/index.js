const files = require('fs').readdirSync(__dirname + '/');

for (const file of files) {
    if (file !== 'index.js') {
        const name = file.replace('.js', '');
        exports[name] = require('./' + file);
    }
};