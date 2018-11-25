import express from 'express';

import compression from 'compression'; // compresses requests
// import session from "express-session";
import bodyParser from 'body-parser';
// import logger from "./util/logger";
// import exphbs from "express-handlebars";
// import lusca from "lusca";
// import dotenv from "dotenv";
// import flash from "express-flash";
import path from 'path';
import expressValidator from 'express-validator';
// import bluebird from "bluebird";
import { ENVIRONMENT } from './util/environments';
// import { AppConfig } from "./util/app-config";

// Load environment variables from .env file, where API keys and passwords are configured
// dotenv.config({ path: ".env" });
import * as homeController from './controller/home';
import * as healthController from './controller/health';
import * as infoController from './controller/info';
import { ENDPOINTS } from './context/endpoints';
import { InstanceOperations, datastoreInstance } from '@hipster-store/consul-discovery-service';
// Create Express server
const app = express();
const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'

const instanceOperations = new InstanceOperations();
app.set('instanceOperations', instanceOperations);
// Express configuration
app.set('port', process.env.PORT || 3000);
app.set(
  'views',
  prod ? path.join(__dirname, './views') : path.join(__dirname, '../views')
);
app.set('view engine', 'hbs');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use((req, res, next) => {
  //   res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  next();
});

app.use(
  express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
app.get(ENDPOINTS.home, homeController.index);
app.get(ENDPOINTS.round_robin, homeController.roundRobinInstance);
app.get(ENDPOINTS.random, homeController.randomInstance);
app.get(ENDPOINTS.info, infoController.info);
app.get(ENDPOINTS.endpoints, infoController.endpoints);
app.get(ENDPOINTS.env, infoController.env);
app.get(ENDPOINTS.health, healthController.getHealth);

app.get(ENDPOINTS.datastore, (req, res) => {
  res.json(datastoreInstance.instances);
});

app.get("/discover/apricot", (req, res) => {
  res.json(instanceOperations.discover('apricot'));
});
export default app;
