"use strict";

import { Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";
import { PROCESS_ENVIRONMENT } from "../util/environments";
import { ENVIRONMENT } from "../util/secrets";

// import { CacheService } from "../service/cache-service";

export let info = (req: Request, res: Response) => {
  let fileLocation;
  if (ENVIRONMENT) {
    fileLocation = "../package.json";
  } else {
    fileLocation = "../../package.json";
  }
  fs.readFile(path.join(__dirname, fileLocation), "utf-8", (err, data) => {
    if (err) {
      console.log("error reading package file.");
      console.log(err);
    }
    const packageInfo = JSON.parse(data);
    res.json({
      Name: packageInfo.name,
      Version: packageInfo.version
    });
  });
};

export let env = (req: Request, res: Response) => {
  res.json(PROCESS_ENVIRONMENT);
};
