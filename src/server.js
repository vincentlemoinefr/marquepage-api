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

const librairies = {
  MongoClient, express, winston, jsonwebtoken,
  randomUUID, STATUS_CODES, https, yaml, joi, fs
};

librairies.schemaUuid = prepareSchemaUuid(librairies);
librairies.schemaConfig = prepareSchemaConfig(librairies);
librairies.schemaRequest = prepareSchemaRequest(librairies);
librairies.schemaBookmark = prepareSchemaBookmark(librairies);
librairies.schemaBinder = prepareSchemaBinder(librairies);

librairies.config = loadConfig(librairies, './src/configs/configServer.yaml');
librairies.config = loadConfig(librairies, './src/configs/configLogger.yaml');
librairies.config = loadConfig(librairies, './src/configs/configDatabase.yaml');
librairies.config = loadConfig(librairies, process.env, true);
librairies.openapi = loadConfig(librairies, './src/configs/configOpenapi.yaml');

// Require config, winston
librairies.logHandler = prepareLogHandler(librairies);

// Require STATUS_CODES
librairies.HttpError = prepareHttpError(librairies);

// Require config, jsonwebtoken, logHandler, HttpError
librairies.authentificationHandler = prepareAuthentificationHandler(librairies);

// Require config, jsonwebtoken, logHandler, HttpError, database
librairies.authorizationHandler = prepareAuthorizationHandler(librairies);

// Require config, randomUUID, logHandler, HttpError 
librairies.timeoutHandler = prepareTimeoutHandler(librairies);

// Require logHandler
librairies.errorHandler = prepareErrorHandler(librairies);

// Require schemaRequest, HttpError, logHandler
librairies.requestValidator = prepareRequestValidator(librairies);

// Require schemaId, HttpError, logHandler
librairies.idValidator = prepareIdValidator(librairies);

import prepareBinderCollection from '#services/adapterMongo';

librairies.binders = prepareBinderCollection(librairies);




librairies.controllers = await loadControllers(librairies);
librairies.routes = loadRoutes(librairies);

const api = express();

// https://expressjs.com/en/api.html#app.set
// We need to move that to config
api.set('case sensitive routing', true);
api.set('strict routing', true);
api.set('x-powered-by', false);
api.set('trust proxy', true);
api.set('etag', 'strong');


api.use(librairies.requestValidator);
api.use(librairies.timeoutHandler);

api.use(librairies.routes);
// api.use(notFoundHandler)
api.use(librairies.errorHandler);


const server = https.createServer(librairies.config.API_HTTPS_OPTIONS, api);
server.listen(librairies.config.API_PORT);
*/