import express from 'express';

import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';
// import logger from "./util/logger";
// import exphbs from "express-handlebars";
import path from 'path';
import expressValidator from 'express-validator';
// import bluebird from "bluebird";

// Load environment variables from .env file, where API keys and passwords are configured
import * as homeController from './controller/home';
import * as healthController from './controller/health';
import * as infoController from './controller/info';
import { ENDPOINTS } from './context/endpoints';
import { instanceOperations, datastoreInstance } from '@hipster-store/consul-discovery-service';
import {applicationConfig} from './config';

// Create Express server
const app = express();

// const instanceOperations = new InstanceOperations();
app.set('instanceOperations', instanceOperations);

const prod = applicationConfig.application.env === 'production';
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
