const controllers = require('./controllers/');
const definition = require('./api/definition.json');

const controllers = require('../controllers');
const definition = require('./definition.json');
const express = require('express');
const router = express.Router();


// This build an array for all the routes and methods from the OpenAPI definition
const routes = [];
const paths = Object.keys(definition.paths);
for (const path of paths) {

  const expressPath = path.replaceAll('{',':').replaceAll('}','');
  const endpoint = definition.paths[path];
  const methods = Object.keys(endpoint);

  for (const method of methods) {
    routes.push({
      method : method,
      path : expressPath,
      controller : endpoint[method].operationId
    });
  }
};

console.log(controllers);
console.log(routes);

for (const route of routes) {
  router[route.method](
    route.path,
    controllers[route.controller]
  );
};

module.exports = router;