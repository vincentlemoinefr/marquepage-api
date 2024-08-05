'use strict';

const controllers = require('../controllers/');
const description = require('./description');
const express = require('express');
const api = express();
api.use(express.json());

let routes = [];
const paths = Object.keys(description.paths);




for (const path of paths) {

  const expressPath = path.replaceAll('{',':').replaceAll('}','');
  console.log(expressPath);
  const endpoint = description.paths[path];
  const methods = Object.keys(endpoint);

  for (const method of methods) {
    routes.push({
      'path' : expressPath,
      'method' : method,
      'controller' : endpoint[method].operationId
    });
  }
};



function fail(req, res) {
  console.log('ah, idiot');
  res.status(404).end();
  return;
}

function validate(req, res, next) {
  console.log('its valid stoopid');
  next();
};


api.use(mymiddleware);
console.log(routes)

for (const route of routes) {
    try {
        // note we can pass an array of "middlewares" they are executed in order
        // api[route.method](route.path,[f1,f2,f3]);
        api[route.method](
          route.path,
          validate,
          controllers[route.controller]
        );
    } catch (e) {

    }
};

function mymiddleware(req, res, next) {
  console.log('im last...');
  next();
}


api.use('*', fail);

module.exports = api;