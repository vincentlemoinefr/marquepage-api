const fs = require('fs');
const yaml = require('yaml');

const definition_yaml = fs.readFileSync('./src/routes/definition.yaml').toString();
const definition_json = yaml.parse(definition_yaml);

console.log(definition_json);