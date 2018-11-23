'use strict';

// const consulDiscoveryService = require('..');
import { DataStore } from '../src/data-store';
import { ServiceInstance } from '../src/types/consul';

test('That a datastore object can be created', () => {
  const datastore = new DataStore();
  expect(datastore).not.toBe(null);
  expect(datastore.instances).not.toBe(null);
  expect(datastore.instances.length).toEqual(0);
});

test('an item can be added to the datastore.', () => {
  const datastore = new DataStore();
  expect(datastore.instances.length).toEqual(0);
  const instance1 = <ServiceInstance>{
    id: '1',
    instanceId: 'service-1',
    serviceName: 'service-name-1',
    host: 'localhost',
    port: 8080,
    checkIndex: 0,
  };

  datastore.addInstance(instance1);
  expect(datastore.instances.length).toEqual(1);
});

test('multiple items can be added to the datastore.', () => {
  const datastore = new DataStore();
  expect(datastore.instances.length).toEqual(0);
  const instance1 = <ServiceInstance>{
    id: '1',
    instanceId: 'service-1',
    serviceName: 'service-name-2',
    host: 'localhost',
    port: 8080,
    checkIndex: 0,
  };

  datastore.addInstance(instance1);
  const instance2 = <ServiceInstance>{
    id: '2',
    instanceId: 'service-2',
    serviceName: 'service-name-2',
    host: 'localhost',
    port: 8080,
    checkIndex: 0,
  };
  datastore.addInstance(instance2);
  expect(datastore.instances.length).toEqual(1);
});

test('multiple items can be added to the datastore in bulk', () => {
  const datastore = new DataStore();
  expect(datastore.instances.length).toEqual(0);
  const instance1 = <ServiceInstance>{
    id: '1',
    instanceId: 'service-1',
    serviceName: 'service-name-1',
    host: 'localhost',
    port: 3000,
    checkIndex: 0,
  };

  const instance2 = <ServiceInstance>{
    id: '2',
    instanceId: 'service-2',
    serviceName: 'service-name-2',
    host: 'localhost',
    port: 8080,
    checkIndex: 0,
  };
  datastore.addInstances([instance1, instance2]);
  expect(datastore.instances.length).toEqual(2);
});

test('adding an instance with the same service id will override the previous one.', () => {
  const datastore = new DataStore();
  expect(datastore.instances.length).toEqual(0);
  const instance1 = <ServiceInstance>{
    id: '1',
    instanceId: 'service-1',
    serviceName: 'service-name-1',
    host: 'localhost',
    port: 8080,
    checkIndex: 0,
  };

  datastore.addInstance(instance1);
  const instance2 = <ServiceInstance>{
    id: '2',
    instanceId: 'service-1',
    serviceName: 'service-name-2',
    host: 'localhost',
    port: 3000,
    checkIndex: 0,
  };
  datastore.addInstance(instance2);
  expect(datastore.instances.length).toEqual(2);
});

test('given an id, a service instance can be found.', () => {
  const datastore = new DataStore();
  expect(datastore.instances.length).toEqual(0);
  const instance1 = <ServiceInstance>{
    id: '1',
    instanceId: 'service-1',
    serviceName: 'service-name-1',
    host: 'localhost',
    port: 8080,
    checkIndex: 0,
  };

  datastore.addInstance(instance1);
  const instance2 = <ServiceInstance>{
    id: '2',
    instanceId: 'service-2',
    serviceName: 'service-name-2',
    host: 'localhost',
    port: 3000,
    checkIndex: 0,
  };
  datastore.addInstance(instance2);
  expect(datastore.instances.length).toEqual(2);
  const found = datastore.findById('2');
  expect(found).not.toBe(null);
  expect(found.instanceId).toEqual('service-2');
  expect(found.serviceName).toEqual('service-name-2');
  expect(found.port).toEqual(3000);
  expect(found.host).toEqual('localhost');
});

test('given an id, a service instance that does not exist cannot be found.', () => {
  const datastore = new DataStore();
  expect(datastore.instances.length).toEqual(0);
  const instance1 = <ServiceInstance>{
    id: '1',
    instanceId: 'service-1',
    serviceName: 'service-name-1',
    host: 'localhost',
    port: 8080,
    checkIndex: 0,
  };

  datastore.addInstance(instance1);
  const instance2 = <ServiceInstance>{
    id: '2',
    instanceId: 'service-2',
    serviceName: 'service-name-2',
    host: 'localhost',
    port: 3000,
    checkIndex: 0,
  };
  datastore.addInstance(instance2);
  expect(datastore.instances.length).toEqual(2);
  const found = datastore.findById('10');
  expect(found).not.toBe(null);
  expect(found.instanceId).toBeUndefined;
  expect(found.serviceName).toBeUndefined;
  expect(found.port).toBeUndefined;
  expect(found.host).toBeUndefined;
});

test('given a service-instance name, all services can be retrieved.', () => {
  const datastore = new DataStore();
  expect(datastore.instances.length).toEqual(0);
  const instance1 = <ServiceInstance>{
    id: '1',
    instanceId: 'service-1',
    serviceName: 'service-name',
    host: 'localhost',
    port: 8080,
    checkIndex: 0,
  };

  datastore.addInstance(instance1);
  const instance2 = <ServiceInstance>{
    id: '2',
    instanceId: 'service-2',
    serviceName: 'service-name',
    host: 'localhost',
    port: 8080,
    checkIndex: 0,
  };
  datastore.addInstance(instance2);
  expect(datastore.instances.length).toEqual(1);
  const found = datastore.findInstancesByName('service-name');
  expect(found.length).toEqual(1);
});

test('given a local id, service can be removed.', () => {
  const datastore = new DataStore();
  expect(datastore.instances.length).toEqual(0);
  const instance1 = <ServiceInstance>{
    id: '1',
    instanceId: 'service-1',
    serviceName: 'service-name',
    host: 'localhost',
    port: 8080,
    checkIndex: 0,
  };

  datastore.addInstance(instance1);
  const instance2 = <ServiceInstance>{
    id: '2',
    instanceId: 'service-2',
    serviceName: 'service-name',
    host: 'localhost',
    port: 8080,
    checkIndex: 0,
  };
  datastore.addInstance(instance2);
  expect(datastore.instances.length).toEqual(1);
  const found = datastore.findInstancesByName('service-name');
  expect(found.length).toEqual(1);

  // remove the instance with id 2
  datastore.removeById('2');
  expect(datastore.instances.length).toEqual(0);
  const secondFound = datastore.findInstancesByName('service-name');
  expect(secondFound.length).toEqual(0);
});

test('given a service instance id, service can be removed.', () => {
  const datastore = new DataStore();
  expect(datastore.instances.length).toEqual(0);
  const instance1 = <ServiceInstance>{
    id: '1',
    instanceId: 'service-1',
    serviceName: 'service-name',
    host: 'localhost',
    port: 8080,
    checkIndex: 0,
  };

  datastore.addInstance(instance1);
  const instance2 = <ServiceInstance>{
    id: '2',
    instanceId: 'service-2',
    serviceName: 'service-name',
    host: 'localhost',
    port: 8080,
    checkIndex: 0,
  };
  datastore.addInstance(instance2);
  expect(datastore.instances.length).toEqual(1);
  const found = datastore.findInstancesByName('service-name');
  expect(found.length).toEqual(1);

  // remove the instance with id 2
  datastore.remove('service-2');
  expect(datastore.instances.length).toEqual(0);
  const secondFound = datastore.findInstancesByName('service-name');
  expect(secondFound.length).toEqual(0);
});
