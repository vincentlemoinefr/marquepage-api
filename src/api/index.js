'use strict';

const controllers = require('../controllers/');
const description = require('./description');
const express = require('express');
const api = express();
api.use(express.json());

let routes = [];
const paths = Object.keys(description.paths);

for (const path of paths) {

    const endpoint = description.paths[path];
    const methods = Object.keys(endpoint);

    for (const method of methods) {
        routes.push({
            'path' : path,
            'method' : method,
            'controller' : endpoint[method].operationId
        });
    }
};

for (const route of routes) {
    try {
        // note we can pass an array of "middlewares" they are executed in order
        // api[route.method](route.path,[f1,f2,f3]);
        api[route.method](route.path,controllers[route.controller]);
    } catch (e) {

    }
};

module.exports = api;