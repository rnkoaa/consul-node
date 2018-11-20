import { promisify } from 'util';
import * as Consul from 'consul';
import { ServiceInstance } from './types/consul';
import { DataStore } from './data-store';

export const fromCallback = (fn: Function) => {
  return new Promise((resolve, reject) => {
    try {
      return fn(function(err: any, data: any, res: any) {
        if (err) {
          err.res = res;
          return reject(err);
        }
        return resolve([data, res]);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export class CatalogServiceWatcher {
  _consulClient: Consul.Consul;
  _datastore: DataStore;
  _consulHealthServiceAsync: any;
  _watcher: any;
  constructor(datastore: DataStore) {
    this._consulClient = Consul({
      host: 'localhost',
      port: '8500',
      secure: false,
      promisify: fromCallback,
    });

    this._datastore = datastore;
    this._consulHealthServiceAsync = promisify(this._consulClient.health.service);

    this._watcher = this._consulClient.watch({
      method: this._consulClient.catalog.service.list,
      options: {
        //   passing: true
      },
    });
  }

  stop(): void {
    this._watcher.end();
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
      const promises = serviceNames.map(service => this._consulHealthServiceAsync(service));

      Promise.all(promises)
        .then(receipts => {
          const serviceInstances: Array<ServiceInstance> = [];
          receipts.forEach((serviceArray: Array<any>) => {
            serviceArray.forEach(instance => {
              const serviceInstance = instance.Service;
              const instanceObject = <ServiceInstance>{
                instanceId: serviceInstance.ID,
                serviceName: serviceInstance.Service,
                serviceAddress: `${serviceInstance.Address}:${serviceInstance.Port}`,
                host: serviceInstance.Address,
                port: serviceInstance.Port,
                modifyIndex: serviceInstance.ModifyIndex,
                createIndex: serviceInstance.CreateIndex,
              };
              serviceInstances.push(instanceObject);
              this._datastore.clear();
              this._datastore.addInstances(serviceInstances);
            });
          });

          console.log("=====================================================")
          console.log(this._datastore.findInstancesByName('apricot'));
        })
        .catch(err => `There are errors seen`);
    });
  }
}
