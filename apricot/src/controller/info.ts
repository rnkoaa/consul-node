'use strict';

import { Request, Response } from 'express';
import { PROCESS_ENVIRONMENT } from '../util/environments';
import { ENDPOINTS } from '../context/endpoints';
import { applicationConfig } from '../config';


export let info = (req: Request, res: Response) => {
  res.json(applicationConfig.application);
};

export let env = (req: Request, res: Response) => {
  res.json(PROCESS_ENVIRONMENT);
};
export let endpoints = (req: Request, res: Response) => {
  // res.json(Object.values(ENDPOINTS));
  const values = [];
  const keys = Object.keys(ENDPOINTS);
  keys.forEach(key => values.push(ENDPOINTS[key]));

  res.json(values);
};
