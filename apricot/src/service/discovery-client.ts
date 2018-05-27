import { ConsulOperations } from "./consul-operations";
import { RandomLoadBalancingStrategy } from "./random-load-balancing-strategy";
import { RoundRobinLoadBalancingStrategy } from "./round-robin-load-balancing-strategy";
import { ServiceInstance } from "../domain/service-instance";

export class DiscoveryClient {
  private _strategy: string;
  private _roundRobinStrategy: RoundRobinLoadBalancingStrategy;
  private _randomStrategy: RandomLoadBalancingStrategy;

  constructor(strategy: string, consulOperations: ConsulOperations) {
    this._strategy = strategy;
    this._randomStrategy = new RandomLoadBalancingStrategy(consulOperations);
    this._roundRobinStrategy = new RoundRobinLoadBalancingStrategy(consulOperations);
  }

  public async getServiceInstance(instance: string): Promise<ServiceInstance> {
    if (this._strategy === "round-robin") {
      return this._roundRobinStrategy.getServiceInstance(instance);
    } else if (this._strategy === "random") {
      return this._randomStrategy.getServiceInstance(instance);
    } else {
      return new Promise<ServiceInstance>((resolve, reject) => {
        reject("Unknown Strategy Selected.");
      });
    }
  }
}
