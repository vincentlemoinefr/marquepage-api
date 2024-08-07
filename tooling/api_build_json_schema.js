'use strict';

const fs = require('fs');
const yaml = require('yaml');

const schema_yaml = fs.readFileSync('./src/routes/schema.yaml').toString();
const schema_json = yaml.parse(schema_yaml);

console.log(schema_json);