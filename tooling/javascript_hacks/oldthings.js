const files = require('fs').readdirSync('./src/controllers/');

const files = this.fs.readdirSync(__dirname);
  for (const file of files) {
  if (file !== 'index.js' && file.endsWith('.js')) {
    const name = file.replace('.js', '');
    this[name] = require('./' + file);
  };
};

for (const file of files) {
  if (file !== 'index.js' && file.endsWith('.js')) {
    const name = file.replace('.js', '');
    exports[name] = require('./' + file);
  }
};

// Use Object.assign(target, source); instead
integrateConfig (object) {
  for (let key in object) {
    this[key] = object[key];
  }
}

validateConfig (requirements) {
  for (let key of requirements) {
    if (!this[key]) {
      throw new Error('Requirement not met for class');
    }
  }
}

walkSync(dir, filter = /\.js$/, filelist = {}) {

  let files = this.fs.readdirSync(dir);

  for (const file of files) {
    let path = dir + '/' + file;
    if (this.fs.statSync(path).isDirectory()) {
      filelist = this.walkSync(path, filter, filelist);
    } else if (filter.test(path)) {
      filelist[file.replace(filter, '')] = path;
    }
  }
  return filelist;
}