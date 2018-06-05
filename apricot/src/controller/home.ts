"use strict";

import async from "async";
import { Response, Request, NextFunction } from "express";
import { RoundRobinLoadBalancingStrategy } from "../service/round-robin-load-balancing-strategy";
import { RandomLoadBalancingStrategy } from "../service/random-load-balancing-strategy";
import { ConsulOperations } from "../components/consul-service-discovery/lib";

const consulOperations = new ConsulOperations();
const roundRobinLoadBalancingStrategy = new RoundRobinLoadBalancingStrategy(consulOperations);
const randomLoadBalancingStrategy = new RandomLoadBalancingStrategy(consulOperations);

export let index = (req: Request, res: Response) => {
  // res.json({
  //   Name: "Consul - Name Sample."
  // });
  consulOperations
    .getService("banana")
    .then(results => {
      res.json(results);
    })
    .catch(err => res.json(err));
};

export let roundRobinInstance = (req: Request, res: Response) => {
  roundRobinLoadBalancingStrategy
    .getServiceInstance("banana")
    .then(results => {
      res.json(results);
    })
    .catch(err => res.json(err));
};

/**
 * Random discovery client
 * @param req
 * @param res
 */
export let randomInstance = (req: Request, res: Response) => {
  randomLoadBalancingStrategy
    .getServiceInstance("banana")
    .then(results => {
      res.json(results);
    })
    .catch(err => res.json(err));
};
