// Basic librairies
import jsonwebtoken from 'jsonwebtoken';
import { MongoClient } from 'mongodb';
import { v1 as uuid } from 'uuid';
import express from 'express';
import winston from 'winston';
import https from 'https';
import yaml from 'yaml';
import joi from 'joi';
import fs from 'fs';

// Schemas
import schemaConfig from '#schemas/schemaConfig';
import schemaId from '#schemas/schemaId';

// Managers
import openapiManager from '#openapiManager';
import routesManager from '#routesManager';
import configManager from '#configManager';
import mongoAdapter from '#mongoAdapter';
import logManager from '#logManager';

// Controllers
import controllers from '#controllers/index';
const {
  securityTimeout,
  binderReadById,
  definitionRead,
  securityErrorHandler,
} = controllers;

// Todo : add an option to load some configs from a file
const config = configManager(process.env, schemaConfig(joi));

// Todo : make winston more like console.log()
const log = logManager(config, winston);

// Todo : give the logger to the other libs
const openapi = openapiManager('./src/apiDefinition.yaml', fs, yaml, log);
const database = mongoAdapter(MongoClient, log);


// Connect to database
await database.connect(config);

const data = {
  name: 'google',
  url: 'google.com',
  test: 'search engine',
}

const result = await database.dbCreate(data);
log('info', result);



// Express stuff
const api = express();
const router = routesManager(controllers, openapi, express.Router());
api.use(express.json());
api.use(securityTimeout);
api.use(router);
api.use('*', securityErrorHandler);

const server = https.createServer(config.API_HTTPS_OPTIONS, api);
server.listen(config.API_PORT, () => {
    log('info', 'Server Listening on : https://'+config.API_HOST+'/');
});