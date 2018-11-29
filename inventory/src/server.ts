import "reflect-metadata";
import { Server } from "@hipster-store/common";
import { config } from "@hipster-store/config";
import path from 'path';

// import pkg from '../package.json';

// import express from 'express';
import app from "./app";
const server = new Server(app);

console.log(`Starting to Bootstrap => ${config.get("port")}`);
server.bootstrap();
