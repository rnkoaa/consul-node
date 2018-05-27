"use strict";

import async from "async";
// import request from "request";
import { Response, Request, NextFunction } from "express";
// import { CacheService } from "../service/cache-service";

export let index = (req: Request, res: Response) => {
  res.json({
    Name: "Consul - Name Sample."
  });
};
