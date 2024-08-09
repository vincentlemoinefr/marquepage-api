'use strict';

/*
module.exports = (fs, joi) => {
  const files = fs.readdirSync(__dirname);
  for (const file of files) {
    if (file !== 'index.js' && file.endsWith('.js')) {
        const name = file.replace('.js', '');
        exports[name] = require('./' + file)(joi);
    };
  };
};
*/
const BaseClass = require('./BaseClass');

class Schemas extends BaseClass {
  constructor(options = {}, libraries = {}, requirements = []) {
    super(options, libraries, requirements);
  }

  listFile() {
    const files = this.fs.readdirSync(__dirname);
      for (const file of files) {
      if (file !== 'index.js' && file.endsWith('.js')) {
        const name = file.replace('.js', '');
        this[name] = require('./' + file);
      };
    };
  };

  echoLol() {
    console.log('lol');
  };
};