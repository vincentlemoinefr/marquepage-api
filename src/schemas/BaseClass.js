'use strict';

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