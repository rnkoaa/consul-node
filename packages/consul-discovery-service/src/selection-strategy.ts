import { DataStore} from "./data-store";
import { ServiceInstance } from "./types/consul";

export interface SelectionStrategy {
  select(serviceName: string, dataStore: DataStore): ServiceInstance;
}
export interface IndexMap {
  lastInstanceIndex: number;
  instanceName: string;
}
export class RoundRobinStrategy implements SelectionStrategy {
  indexMaps: Array<IndexMap> = [];

  public select(serviceName: string, dataStore: DataStore): ServiceInstance {
    const instances: Array<ServiceInstance> = dataStore.findInstancesByName(serviceName);
    if (this.indexMaps.length <= 0) {
      this.populateInstance(serviceName);
    }
    let instanceIdx = this.indexMaps.findIndex(item => item.instanceName === serviceName);
    if (instanceIdx <= -1) {
      this.populateInstance(serviceName);
      instanceIdx = this.indexMaps.findIndex(item => item.instanceName === serviceName);
    }

    let instance: ServiceInstance;
    let lastInstanceIndex = this.indexMaps[instanceIdx].lastInstanceIndex;
    if (instances && instances.length > 0) {
      if (instances[++lastInstanceIndex]) {
        instance = instances[lastInstanceIndex];
      } else {
        lastInstanceIndex = 0;
        instance = instances[0];
      }
      this.indexMaps[instanceIdx].lastInstanceIndex = lastInstanceIndex;
    } else {
      instance = <ServiceInstance>{}
    }
    return instance;
  }

  populateInstance(serviceName: string): void {
    const indexMap = <IndexMap>{
      lastInstanceIndex: 0,
      instanceName: serviceName
    }
    this.indexMaps.push(indexMap);
  }
}

export class RandomStrategy implements SelectionStrategy {
  public select(serviceName: string, dataStore: DataStore): ServiceInstance {
    const storedServices = dataStore.findInstancesByName(serviceName);
    if (storedServices.length > 0) {
      return storedServices[Math.floor((Math.random() * storedServices.length))];
    }
    return <ServiceInstance>{};
  }
}

export class SelectionStrategyFactory {
  createStrategy(type: 'random'): RandomStrategy;
  createStrategy(type: 'round-robin'): RoundRobinStrategy;

  public createStrategy(strategy: string): RandomStrategy | RoundRobinStrategy {
    if (strategy === 'random') {
      return new RandomStrategy();
    } else if (strategy === 'round-robin') {
      return new RoundRobinStrategy();
    } else {
      throw new Error('Select either a Hero or a Villain');
    }
  }
}
