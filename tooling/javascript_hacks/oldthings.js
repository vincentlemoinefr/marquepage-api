const files = this.fs.readdirSync(__dirname);
  for (const file of files) {
  if (file !== 'index.js' && file.endsWith('.js')) {
    const name = file.replace('.js', '');
    this[name] = require('./' + file);
  };
};



module.exports = class BaseClass {
  constructor(options, libraries, requirements) {
    this.integrateConfig(options);
    this.integrateConfig(libraries);
    this.validateConfig(requirements);
  };

  integrateConfig (options) {
    for (const option in options) {
      this[option] = options[option];
    };
  };

  validateConfig (requirements) {
    for (const requirement of requirements) {
      if (!this[requirement]) {
        console.log('Requirement not met for class ' + this.constructor.name);
      };
    };
  };
};