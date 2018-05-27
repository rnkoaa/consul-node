import { ServiceInstance } from "./service-instance";

export class RoundRobin {
  serviceInstances: ServiceInstance[];

  public selectNext(serviceName: string): ServiceInstance {
    if (this.serviceInstances.length <= 0) {
      return undefined;
    }
    const services = this.serviceInstances.filter(serviceInstance => serviceInstance.name === serviceName);
    for (let i = 0; i < services.length; i++) {
      const serviceInstance = services[i];
      if (!serviceInstance.executed) {
        serviceInstance.executed = true;
        return serviceInstance;
      }
    }
    for (let i = 0; i < services.length; ++i) {
      delete services[i].executed;
    }

    services[0].executed = true;
    return services[0];
  }
}
