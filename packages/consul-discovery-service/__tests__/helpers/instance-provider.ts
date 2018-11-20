import { ServiceInstance } from "../src/types/consul";

export class TestInstanceProvider {
  public static generateOneInstance(): ServiceInstance {
    return <ServiceInstance>{
      id: "2",
      instanceId: "service-2",
      secure: false,
      serviceName: "service-name-2",
      host: "localhost",
      port: 8080,
      checkIndex: 0
    };
  }

  public static multipleInstancesOfSameService(
    serviceName: string,
    count: number
  ): Array<ServiceInstance> {
    const instances: Array<ServiceInstance> = [];
    var idx;
    const generatedServiceName = `${serviceName}-${count}`;
    for (idx = 0; idx < count; idx++) {
      instances.push({
        id: `${idx}`,
        instanceId: `${serviceName}-${idx}`,
        serviceName: generatedServiceName,
        secure: false,
        host: `localhost-${idx}`,
        port: 8080,
        checkIndex: 0
      });
    }
    return instances;
  }
}
