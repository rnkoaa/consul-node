import { TestInstanceProvider } from './test-instance-provider';
import { DataStore } from '../lib/data-store';

import { SelectionStrategyFactory } from '../lib/selection-strategy';
const selectionStrategyFactory = new SelectionStrategyFactory();
const randomSelectionStrategy = selectionStrategyFactory.createStrategy('random');

test('random selection strategy for a single instance', () => {
  const dataStore: DataStore = new DataStore();
  const instance = TestInstanceProvider.generateOneInstance();
  expect(instance).not.toBeUndefined;
  expect(instance.instanceId).toEqual('service-2');
  expect(instance.serviceName).toEqual('service-name-2');

  dataStore.addInstance(instance);
  const serviceInstance = randomSelectionStrategy.select('service-name-2', dataStore);
  expect(serviceInstance).not.toBeUndefined;
  expect(serviceInstance.instanceId).toEqual('service-2');
  expect(serviceInstance.serviceName).toEqual('service-name-2');
});

test('random selection strategy for a non existent instance', () => {
  const dataStore: DataStore = new DataStore();
  const instance = TestInstanceProvider.generateOneInstance();
  expect(instance).not.toBeUndefined;
  expect(instance.instanceId).toEqual('service-2');
  expect(instance.serviceName).toEqual('service-name-2');

  dataStore.addInstance(instance);
  const serviceInstance = randomSelectionStrategy.select('service-non-existent', dataStore);
  expect(serviceInstance).not.toBeUndefined;
  expect(serviceInstance.instanceId).toBeUndefined;
  expect(serviceInstance.serviceName).toBeUndefined;
});

test('random selection strategy for multiple instances', () => {
  const dataStore: DataStore = new DataStore();
  const count = 4;
  const instances = TestInstanceProvider.multipleInstancesOfSameService('service-name', count);
  dataStore.addInstances(instances);

  const serviceInstance = randomSelectionStrategy.select(`service-name-${count}`, dataStore);
  expect(serviceInstance).not.toBeUndefined;
  expect(serviceInstance.serviceName).toEqual(`service-name-${count}`);
  expect(serviceInstance.host).toEqual(`localhost-${serviceInstance.id}`);
});

test('random selection strategy for multiple instances and multiple services', () => {
  const dataStore: DataStore = new DataStore();
  const count = 4;
  const instances = TestInstanceProvider.multipleInstancesOfSameService('service-name', count);
  dataStore.addInstances(instances);
  const cubeInstances = TestInstanceProvider.multipleInstancesOfSameService('service-cube', count);
  dataStore.addInstances(cubeInstances);

  const serviceInstance = randomSelectionStrategy.select(`service-name-${count}`, dataStore);
  expect(serviceInstance).not.toBeUndefined;
  expect(serviceInstance.serviceName).toEqual(`service-name-${count}`);
  expect(serviceInstance.host).toEqual(`localhost-${serviceInstance.id}`);
});
