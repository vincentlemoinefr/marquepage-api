// Todo list :
// Have loadOpenapi use a config for the definition path
// Same for loadControllers
// Allow to load some configuration from file
// Config to enable / disable logs in (file, stdout, external service)
// Move id validator to request validator ? 

import jsonwebtoken from 'jsonwebtoken';
import { MongoClient } from 'mongodb';
import { v1 as uuid } from 'uuid';
import express from 'express';
import winston from 'winston';
import https from 'https';
import yaml from 'yaml';
import joi from 'joi';
import fs from 'fs';

import prepareSchemaBookmark from '#schemas/schemaBookmark';
import prepareSchemaRequest from '#schemas/schemaRequest';
import prepareSchemaConfig from '#schemas/schemaConfig';
import prepareSchemaBinder from '#schemas/schemaBinder';
import prepareSchemaId from '#schemas/schemaId';

const schemaBookmark = prepareSchemaBookmark(joi);
const schemaRequest = prepareSchemaRequest(joi);
const schemaConfig = prepareSchemaConfig(joi);
const schemaBinder = prepareSchemaBinder(joi);
const schemaId = prepareSchemaId(joi);

import loadOpenapi from '#services/loaderOpenapi';
import loadConfig from '#services/loaderConfig';

const openapi = loadOpenapi('./src/apiDefinition.yaml', fs, yaml);
const config = loadConfig(process.env, schemaConfig);

import prepareAuthentificationHandler from '#services/handlerAuthentification';
import prepareAuthorizationHandler from '#services/handlerAuthorization';
import prepareTimeoutHandler from '#services/handlerTimeout';
import prepareErrorHandler from '#services/handlerError';
import prepareLogHandler from '#services/handlerLog';

const logHandler = prepareLogHandler(config, winston);

const authentificationHandler = prepareAuthentificationHandler(config, jsonwebtoken, logHandler);
const authorizationHandler = prepareAuthorizationHandler(config, jsonwebtoken, logHandler);
const timeoutHandler = prepareTimeoutHandler(config, uuid, logHandler);
const errorHandler = prepareErrorHandler(config, logHandler);

import prepareRequestValidator from '#services/validatorRequest';
import prepareIdValidator from '#services/validatorId';

const requestValidator = prepareRequestValidator(config, schemaRequest, logHandler);
const idValidator = prepareIdValidator(config, schemaId, logHandler);

import loadControllers from '#services/loaderControllers';
import loadRoutes from '#services/loaderRoutes';

const controllers = await loadControllers('./src/controllers/', fs);
const routes = loadRoutes(controllers, openapi, express.Router());

console.log(controllers);
console.log(routes);

const api = express();

// Load order : 
// express.json()
// timeoutHandler

api.use(express.json());
api.use(timeoutHandler);
api.use(routes);

const server = https.createServer(config.API_HTTPS_OPTIONS, api);
server.listen(config.API_PORT);

/*
// MongoClient create an object with a circular reference (why??)
// const mongoClient = new MongoClient(config.MONGO_URI, config.MONGO_OPTIONS);
// await mongoClient.connect();
// const mongoDatabase = mongoClient.db(config.MONGO_DB_NAME);
// const mongoCollection = mongoDatabase.collection(config.MONGO_COLLECTION_NAME);
*/