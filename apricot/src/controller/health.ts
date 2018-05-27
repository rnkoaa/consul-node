"use strict";

import async from "async";
// import request from "request";
import { Response, Request, NextFunction } from "express";
// import { CacheService } from "../service/cache-service";

export let getHealth = (req: Request, res: Response) => {
  res.json({
    status: "UP"
  });
};
