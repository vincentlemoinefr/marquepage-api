// Todo list :
// Allow to load cert/ley from file
// Config to enable / disable logs in (file, stdout, external service)
// Move id validator to request validator ? 
// Add '411': 'Length Required'
// And also '415': 'Unsupported Media Type'

import jsonwebtoken from 'jsonwebtoken';
import { MongoClient } from 'mongodb';
import { STATUS_CODES } from 'http';
import { randomUUID } from 'crypto';
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
import prepareSchemaUuid from '#schemas/schemaUuid';

import loadControllers from '#services/loaderControllers';
import loadConfig from '#services/loaderConfig';
import loadRoutes from '#services/loaderRoutes';

import prepareHttpError from '#services/classHttpError';

import prepareAuthentificationHandler from '#services/handlerAuthentification';
import prepareAuthorizationHandler from '#services/handlerAuthorization';
import prepareTimeoutHandler from '#services/handlerTimeout';
import prepareErrorHandler from '#services/handlerError';
import prepareLogHandler from '#services/handlerLog';

import prepareRequestValidator from '#services/validatorRequest';
import prepareIdValidator from '#services/validatorId';

const librairies = { jsonwebtoken, randomUUID, https, yaml, joi, fs };
const bigLibrairies = { MongoClient, express, winston };

librairies.schemaUuid = prepareSchemaUuid(librairies);
librairies.schemaConfig = prepareSchemaConfig(librairies);
librairies.schemaRequest = prepareSchemaRequest(librairies);
librairies.schemaBookmark = prepareSchemaBookmark(librairies);
librairies.schemaBinder = prepareSchemaBinder(librairies);

librairies.config = loadConfig(librairies, './src/configs/configServer.yaml');
librairies.config = loadConfig(librairies, './src/configs/configLogger.yaml');
librairies.config = loadConfig(librairies, './src/configs/configDatabase.yaml');
librairies.config = loadConfig(librairies, process.env, true);

console.log('in server :', librairies.config)

/*

librairies.openapi = loadConfig(librairies, './configs/configOpenapi.yaml');

librairies.controllers = await loadControllers(librairies);

librairies.HttpError = prepareHttpError(STATUS_CODES);


librairies.logHandler = prepareLogHandler(librairies);

librairies.authentificationHandler = prepareAuthentificationHandler(librairies);
librairies.authorizationHandler = prepareAuthorizationHandler(librairies);
librairies.timeoutHandler = prepareTimeoutHandler(librairies);
librairies.errorHandler = prepareErrorHandler(librairies);


librairies.requestValidator = prepareRequestValidator(librairies);
librairies.idValidator = prepareIdValidator(librairies);

librairies.routes = loadRoutes(librairies);

const api = express();

// https://expressjs.com/en/api.html#app.set
// We need to move that to config
api.set('case sensitive routing', true);
api.set('strict routing', true);
api.set('x-powered-by', false);
api.set('trust proxy', true);
api.set('etag', 'strong');

api.use(requestValidator);
api.use(timeoutHandler);
api.use(express.json());
api.use(routes);
api.use(errorHandler);

const server = https.createServer(config.API_HTTPS_OPTIONS, api);
server.listen(config.API_PORT);

/*
// MongoClient create an object with a circular reference (why??)
// const mongoClient = new MongoClient(config.MONGO_URI, config.MONGO_OPTIONS);
// await mongoClient.connect();
// const mongoDatabase = mongoClient.db(config.MONGO_DB_NAME);
// const mongoCollection = mongoDatabase.collection(config.MONGO_COLLECTION_NAME);
*/