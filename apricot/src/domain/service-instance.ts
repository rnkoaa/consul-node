import { HealthService } from "./health-service";

export class ServiceInstance {
  id: string;
  updated: string;
  name: string;
  address: string;
  port: number;
  status: string;
  executed: boolean;

  static convert(healthService: HealthService): ServiceInstance {
    const serviceInstance = new ServiceInstance();
    serviceInstance.address = healthService.Address;
    serviceInstance.id = healthService.ID;
    serviceInstance.name = healthService.Service;
    serviceInstance.port = healthService.Port;
    serviceInstance.status = "passing";
    serviceInstance.executed = false;
    return serviceInstance;
  }

  public get httpUri(): string {
    return `${this.address}:${this.port}`;
  }
}
