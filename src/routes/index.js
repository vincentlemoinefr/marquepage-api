'use strict';

const controllers = require('../controllers');
const schema = require('./schema.json');
const express = require('express');
const router = express.Router();


// This build an array for all the routes and methods from the OpenAPI schema
const routes = [];
const paths = Object.keys(schema.paths);
for (const path of paths) {

  const expressPath = path.replaceAll('{',':').replaceAll('}','');
  const endpoint = schema.paths[path];
  const methods = Object.keys(endpoint);

  for (const method of methods) {
    routes.push({
      method : method,
      path : expressPath,
      controller : endpoint[method].operationId
    });
  }
};

for (const route of routes) {
  router[route.method](
    route.path,
    controllers[route.controller]
  );
};

module.exports = router;