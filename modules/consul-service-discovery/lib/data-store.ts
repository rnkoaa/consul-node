import { ServiceInstance } from './types/consul';
export class DataStore {
  _applicationId: string;
  _instances: Array<ServiceInstance>;

  constructor() {
    this._instances = [];
    this._applicationId = '';
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
      throw new Error('instance service Id is required.');
    }
    // remove an instance with the same instanceId if it exists
    // if it does not exist, nothing will happen.
    this.removeIfExists(instance.instanceId);

    // then add the new instance to the list
    this._instances.push(instance);
  }

  public addInstances(instances: Array<ServiceInstance>): void {
    instances.forEach(instance => this.addInstance(instance));
  }

  public removeById(id: string): void {
    const idx = this._instances.findIndex(item => item.id === id);
    if (idx > -1) {
      this.instances.splice(idx, 1);
    }
  }

  public remove(instanceId: string): void {
    const idx = this._instances.findIndex(item => item.instanceId === instanceId);
    if (idx > -1) {
      this.instances.splice(idx, 1);
    }
  }

  // overloaded method to indicate that nothing happens if it does not exist.
  public removeIfExists(instanceId: string): void {
    this.remove(instanceId);
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
    return this._instances.filter(instance => instance.instanceId === instanceId);
  }
}
