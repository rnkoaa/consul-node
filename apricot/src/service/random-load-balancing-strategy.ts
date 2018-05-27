"use strict";

import { ServiceInstance } from "../domain/service-instance";
import { ConsulOperations } from "./consul-operations";
import { HealthService } from "../domain/health-service";

export class RandomLoadBalancingStrategy {
  private _serviceInstances: ServiceInstance[];
  private _consulOperations: ConsulOperations;

  constructor(consulOperations: ConsulOperations) {
    this._serviceInstances = [];
    this._consulOperations = consulOperations;
  }

  public async getServiceInstance(instance: string): Promise<ServiceInstance> {
    const instances = await this._consulOperations.getService(instance);
    return new Promise<ServiceInstance>((resolve, reject) => {
      if (instances.length === 1) {
        resolve(ServiceInstance.convert(instances[0]));
      } else {
        const index = this.getRandomIndex(instances.length);
        resolve(ServiceInstance.convert(instances[index]));
      }
    });
  }

  private getRandomIndex(maxInt: number): number {
    return Math.floor(Math.random() * maxInt);
  }
}
