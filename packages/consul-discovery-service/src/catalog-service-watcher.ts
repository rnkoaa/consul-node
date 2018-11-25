import Consul from 'consul';
import { ServiceInstance, ConsulServiceHealthResponse, ConsulServiceResponse } from './types/consul';

import { datastoreInstance } from './index';

export class CatalogServiceWatcher {
  _consulClient: Consul.Consul;
  _watcher: Consul.Watch;
  constructor() {
    this._consulClient = Consul({
      host: 'localhost',
      port: '8500',
      secure: false
    });

    // watch all the changes in services
    this._watcher = this._consulClient.watch({
      method: this._consulClient.catalog.service.list,
      options: {
        //   passing: true
      }
    });
  }

  stop(): void {
    this._watcher.end();
  }

  private _consulhealthServiceAsync(serviceName: string): Promise<Array<ConsulServiceResponse>> {
    return new Promise((resolve, reject) => {
      this._consulClient.health.service(serviceName, (err, results: Array<ConsulServiceHealthResponse>) => {
        if (err) {
          reject(err);
        }
        resolve(results.map(result => result.Service));
      });
    });
  }

  start(): void {
    this._watcher.on('error', (err: any) => {
      console.log(`Encountered watch error: ${err}`);
    });

    this._watcher.on('cancel', () => {
      console.log('Watching Cancelled.');
    });

    this._watcher.on('change', (data: any) => {
      const serviceNames = Object.keys(data);
      const serviceInstances: Array<ServiceInstance> = [];
      const promises = serviceNames.map(service => this._consulhealthServiceAsync(service));

      Promise.all(promises)
        .then((receipts: Array<Array<ConsulServiceResponse>>) => {
          receipts.forEach((serviceArray: Array<ConsulServiceResponse>) => {
            serviceArray.forEach(serviceInstance => {
              const instanceObject = <ServiceInstance>{
                instanceId: serviceInstance.ID.toLocaleLowerCase(),
                serviceName: serviceInstance.Service.toLocaleLowerCase(),
                serviceAddress: `${serviceInstance.Address.toLocaleLowerCase()}:${serviceInstance.Port}`,
                host: serviceInstance.Address.toLocaleLowerCase(),
                port: serviceInstance.Port,
                modifyIndex: serviceInstance.ModifyIndex,
                createIndex: serviceInstance.CreateIndex
              };
              serviceInstances.push(instanceObject);
              datastoreInstance.clear();
            });
          });
          datastoreInstance.addInstances(serviceInstances);
        })
        .catch(err => `There are errors seen`);
    });
  }
}
