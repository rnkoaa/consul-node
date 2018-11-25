import { TestInstanceProvider } from './helpers/instance-provider';
import {datastoreInstance} from '../src/index';
import { SelectionStrategyFactory } from '../src/selection-strategy';
const selectionStrategyFactory = new SelectionStrategyFactory();
const randomSelectionStrategy = selectionStrategyFactory.createStrategy('random');
beforeEach(() => {
  // initializeCityDatabase();
  datastoreInstance.clear();
});

afterEach(() => {
  // clearCityDatabase();
  datastoreInstance.clear();
});

test('random selection strategy for a single instance', () => {
  const instance = TestInstanceProvider.generateOneInstance();
  expect(instance).not.toBeUndefined;
  expect(instance.instanceId).toEqual('service-2');
  expect(instance.serviceName).toEqual('service-name-2');

  datastoreInstance.addInstance(instance);
  const serviceInstance = randomSelectionStrategy.select('service-name-2');
  expect(serviceInstance).not.toBeUndefined;
  expect(serviceInstance.instanceId).toEqual('service-2');
  expect(serviceInstance.serviceName).toEqual('service-name-2');
});

test('random selection strategy for a non existent instance', () => {
  const instance = TestInstanceProvider.generateOneInstance();
  expect(instance).not.toBeUndefined;
  expect(instance.instanceId).toEqual('service-2');
  expect(instance.serviceName).toEqual('service-name-2');

  datastoreInstance.addInstance(instance);
  const serviceInstance = randomSelectionStrategy.select('service-non-existent');
  expect(serviceInstance).not.toBeUndefined;
  expect(serviceInstance.instanceId).toBeUndefined;
  expect(serviceInstance.serviceName).toBeUndefined;
});

test('random selection strategy for multiple instances', () => {
  const count = 4;
  const instances = TestInstanceProvider.multipleInstancesOfSameService('service-name', count);
  datastoreInstance.addInstances(instances);

  const serviceInstance = randomSelectionStrategy.select(`service-name-${count}`);
  expect(serviceInstance).not.toBeUndefined;
  expect(serviceInstance.serviceName).toEqual(`service-name-${count}`);
  expect(serviceInstance.host).toEqual(`localhost-${serviceInstance.id}`);
});

test('random selection strategy for multiple instances and multiple services', () => {
  const count = 4;
  const instances = TestInstanceProvider.multipleInstancesOfSameService('service-name', count);
  datastoreInstance.addInstances(instances);
  const cubeInstances = TestInstanceProvider.multipleInstancesOfSameService('service-cube', count);
  datastoreInstance.addInstances(cubeInstances);

  const serviceInstance = randomSelectionStrategy.select(`service-name-${count}`);
  expect(serviceInstance).not.toBeUndefined;
  expect(serviceInstance.serviceName).toEqual(`service-name-${count}`);
  expect(serviceInstance.host).toEqual(`localhost-${serviceInstance.id}`);
});
