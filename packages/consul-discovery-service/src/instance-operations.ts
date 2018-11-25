import axiosClient from './util/axios-client';
import uuidv4 from 'uuid';
import { ConsulRegistrationService } from './consul-service-registration';
import { httpHealthCheckEnabled, generateHTTPHealthCheck, consulInstanceConfig } from './config';
import { ServiceRegistrationRequest, ServiceInstance } from './types/consul';
import { CatalogServiceWatcher } from './catalog-service-watcher';
import { ServiceDiscovery } from './service-discovery';

export class InstanceOperations {
  _service: ConsulRegistrationService;
  _catalogServiceWatcher: CatalogServiceWatcher;
  _serviceDiscovery: ServiceDiscovery;

  constructor() {
    this._service = new ConsulRegistrationService(consulInstanceConfig);
    this._service.instanceId = uuidv4();
    // this._datastore = datastoreInstance;
    this._catalogServiceWatcher = new CatalogServiceWatcher();
    this._serviceDiscovery = new ServiceDiscovery(consulInstanceConfig.discoveryStrategy);
  }

  discover(serviceName: string): ServiceInstance | any {
    return this._serviceDiscovery.discover(serviceName);
  }

  init(): void {
    if (consulInstanceConfig.registerSelf) {
      this.registerService()
        .then(res => {
          console.log('Successfully registered against consul.');
          this._catalogServiceWatcher.start();
        })
        .catch(err => {
          console.log('caught an error while registering service.');
        });
    } else {
      this._catalogServiceWatcher.start();
    }
  }

  close(fn: () => void): void {
    if (consulInstanceConfig.registerSelf) {
      this.deregisterService()
        .then(res => {
          console.log('Removed item from console: ', res);
          this._catalogServiceWatcher.stop();
          fn();
        })
        .catch(err => {
          console.log('Error while removing service from ', err);
          fn();
        });
    } else {
      // just stop watching for changes
      this._catalogServiceWatcher.stop();
    }
  }
  async registerService(): Promise<string> {
    const reqObject = <ServiceRegistrationRequest>{
      ID: this._service.instanceId,
      Name: this._service.serviceName,
      Address: this._service.serviceAddress,
      Port: this._service.servicePort
    };

    if (httpHealthCheckEnabled()) {
      reqObject.Check = generateHTTPHealthCheck(process.env);
    }

    try {
      const registerResponse = await axiosClient.put(this._service.registrationUrl, reqObject);
      console.log(`Registration response: ${registerResponse.data}`);
      return this._service.instanceId;
    } catch (err) {
      //   console.log(err.response.data);
      //   console.log(err.response.status);
      return '';
    }
  }
  async deregisterService(): Promise<boolean> {
    try {
      const registerResponse = await axiosClient.put(this._service.deRegistrationUrl);
      this._catalogServiceWatcher.stop();
      return true;
    } catch (err) {
      return false;
    }
  }
}
