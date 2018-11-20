import axiosClient from './util/axios-client';
import * as uuidv4 from 'uuid/v4';
import { ConsulRegistrationService } from './consul-service-registration';
import { httpHealthCheckEnabled, generateHTTPHealthCheck, consulInstanceConfig } from './config';
import { ServiceRegistrationRequest } from './types/consul';
import { CatalogServiceWatcher } from './catalog-service-watcher';
import { DataStore } from './data-store';
export class InstanceOperations {
  _service: ConsulRegistrationService;
  _catalogServiceWatcher: CatalogServiceWatcher;
  _datastore: DataStore;
  constructor() {
    this._service = new ConsulRegistrationService(consulInstanceConfig);
    this._service.instanceId = uuidv4();
    this._datastore = new DataStore();
    this._catalogServiceWatcher = new CatalogServiceWatcher(this._datastore);
  }

  init(): void {
    this.registerService()
      .then(res => {
        console.log('Successfully registered against consul.');
        this._catalogServiceWatcher.start();
      })
      .catch(err => {
        console.log('caught an error while registering service.');
      });
  }

  close(fn: () => void): void {
    this.deregisterService()
      .then(res => {
        console.log('Removed item from console: ', res);
        fn();
      })
      .catch(err => {
        console.log('Error while removing service from ', err);
        fn();
      });
  }
  async registerService(): Promise<string> {
    const reqObject = <ServiceRegistrationRequest>{
      ID: this._service.instanceId,
      Name: this._service.serviceName,
      Address: this._service.serviceAddress,
      Port: this._service.servicePort,
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
