// import "reflect-metadata"; // this shim is required
import express from "express";
import { useExpressServer } from "routing-controllers";
import { APPLICATION_CONTROLLERS } from "./controllers";

const app = express();
useExpressServer(app, {
  routePrefix: "",
  controllers: APPLICATION_CONTROLLERS // we specify controllers we want to use
});

export default app;
