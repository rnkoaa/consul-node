import { ServiceInstance } from "./types/consul";
export class DataStore {
  _applicationId: string;
  _instances: Array<ServiceInstance>;

  constructor() {
    this._instances = [];
    this._applicationId = "";
  }

  public get instances(): Array<ServiceInstance> {
    return this._instances;
  }
  public set instances(_instances: Array<ServiceInstance>) {
    this._instances = _instances;
  }
  public set applicationId(_applicationId: string) {
    this._applicationId = _applicationId;
  }
  public get applicationId(): string {
    return this._applicationId;
  }

  public clear(): void {
    this._instances = [];
  }

  public addInstance(instance: ServiceInstance): void {
    if (!instance.instanceId) {
      throw new Error("instance service Id is required.");
    }
    // remove an instance with the same instanceId if it exists
    // if it does not exist, nothing will happen.
    // this.remove(instance.instanceId);

    // console.log(`Adding Instance: ${instance.serviceName} => ${instance.serviceAddress}`)
    let filteredInstances = this._instances.filter(
      item =>
        !(
          item.serviceAddress === instance.serviceAddress &&
          item.serviceName === instance.serviceName
        )
    );
    filteredInstances.push(instance);
    // // remove an instance with the same serviceAddress if it exists
    // // if it does not exist, nothing will happen.
    // this.removeByAddress(instance.serviceAddress);

    // then add the new instance to the list
    this._instances = filteredInstances;
  }

  public addInstances(instances: Array<ServiceInstance>): void {
    instances.forEach(instance => this.addInstance(instance));
  }
  public replaceInstances(
    serviceName: string,
    instances: Array<ServiceInstance>
  ): void {
    this.removeInstance(serviceName);
    instances.forEach(instance => this.addInstance(instance));
  }

  public removeById(id: string): void {
    this._instances = this._instances.filter(instance => instance.id !== id);
  }

  public removeInstance(serviceName: string) {
    this._instances = this._instances.filter(
      instance => instance.serviceName !== serviceName
    );
  }

  public remove(instanceId: string): void {
    this._instances = this._instances.filter(
      instance => instance.instanceId !== instanceId
    );
  }

  public removeByAddress(serviceAddress: string): void {
    this._instances = this._instances.filter(
      instance => instance.serviceAddress !== serviceAddress
    );
  }

  findById(id: string): ServiceInstance {
    const idx = this._instances.findIndex(item => item.id === id);
    if (idx > -1) {
      return this._instances[idx];
    }
    return <ServiceInstance>{};
  }

  findInstancesByName(name: string): Array<ServiceInstance> {
    return this._instances.filter(item => item.serviceName === name);
  }

  findInstancesById(instanceId: string): Array<ServiceInstance> {
    return this._instances.filter(
      instance => instance.instanceId === instanceId
    );
  }
}
