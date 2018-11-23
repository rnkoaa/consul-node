import { TestInstanceProvider } from "./helpers/instance-provider";
import { DataStore } from "../src/data-store";

import { SelectionStrategyFactory } from "../src/selection-strategy";
const selectionStrategyFactory = new SelectionStrategyFactory();

test("Round robin selection strategy for a single instance", () => {
  const dataStore: DataStore = new DataStore();
  const instance = TestInstanceProvider.generateOneInstance();
  expect(instance).not.toBeUndefined;
  expect(instance.instanceId).toEqual("service-2");
  expect(instance.serviceName).toEqual("service-name-2");

  dataStore.addInstance(instance);
  const roundRobinSelectionStrategy = selectionStrategyFactory.createStrategy(
    "round-robin"
  );
  const serviceInstance = roundRobinSelectionStrategy.select(
    "service-name-2",
    dataStore
  );
  expect(serviceInstance).not.toBeUndefined;
  expect(serviceInstance.instanceId).toEqual("service-2");
  expect(serviceInstance.serviceName).toEqual("service-name-2");
});

test("Round robin  selection strategy for a non existent instance", () => {
  const dataStore: DataStore = new DataStore();
  const instance = TestInstanceProvider.generateOneInstance();
  expect(instance).not.toBeUndefined;
  expect(instance.instanceId).toEqual("service-2");
  expect(instance.serviceName).toEqual("service-name-2");

  dataStore.addInstance(instance);
  const roundRobinSelectionStrategy = selectionStrategyFactory.createStrategy(
    "round-robin"
  );
  const serviceInstance = roundRobinSelectionStrategy.select(
    "service-non-existent",
    dataStore
  );
  expect(serviceInstance).not.toBeUndefined;
  expect(serviceInstance.instanceId).toBeUndefined;
  expect(serviceInstance.serviceName).toBeUndefined;
});

test("Round robin  selection strategy for multiple instances", () => {
  const dataStore: DataStore = new DataStore();
  const count = 4;
  const instances = TestInstanceProvider.multipleInstancesOfSameService(
    "service-name",
    count
  );
  dataStore.addInstances(instances);

  const roundRobinSelectionStrategy = selectionStrategyFactory.createStrategy(
    "round-robin"
  );
  const serviceInstance = roundRobinSelectionStrategy.select(
    `service-name-${count}`,
    dataStore
  );
  expect(serviceInstance).not.toBeUndefined;
  expect(serviceInstance.serviceName).toEqual(`service-name-${count}`);
  expect(serviceInstance.host).toEqual(`localhost-${serviceInstance.id}`);
});

test("Round robin  selection strategy for multiple instances and multiple services", () => {
  const dataStore: DataStore = new DataStore();
  const count = 4;
  const instances = TestInstanceProvider.multipleInstancesOfSameService(
    "service-name",
    count
  );
  dataStore.addInstances(instances);
  const cubeInstances = TestInstanceProvider.multipleInstancesOfSameService(
    "service-cube",
    count
  );
  dataStore.addInstances(cubeInstances);

  const roundRobinSelectionStrategy = selectionStrategyFactory.createStrategy(
    "round-robin"
  );
  const serviceInstance = roundRobinSelectionStrategy.select(
    `service-name-${count}`,
    dataStore
  );
  expect(serviceInstance).not.toBeUndefined;
  expect(serviceInstance.serviceName).toEqual(`service-name-${count}`);
  expect(serviceInstance.instanceId).toEqual(`service-name-3`);
  expect(serviceInstance.host).toEqual(`localhost-3`);

  const serviceInstance2 = roundRobinSelectionStrategy.select(
    `service-name-${count}`,
    dataStore
  );
  expect(serviceInstance2).not.toBeUndefined;
  expect(serviceInstance2.serviceName).toEqual(`service-name-${count}`);
  expect(serviceInstance2.instanceId).toEqual(`service-name-3`);
  expect(serviceInstance2.host).toEqual(`localhost-3`);

  const serviceInstance3 = roundRobinSelectionStrategy.select(
    `service-name-${count}`,
    dataStore
  );
  expect(serviceInstance3).not.toBeUndefined;
  expect(serviceInstance3.serviceName).toEqual(`service-name-${count}`);
  expect(serviceInstance3.instanceId).toEqual(`service-name-3`);
  expect(serviceInstance3.host).toEqual(`localhost-3`);

  const serviceInstance4 = roundRobinSelectionStrategy.select(
    `service-name-${count}`,
    dataStore
  );
  expect(serviceInstance4).not.toBeUndefined;
  expect(serviceInstance4.serviceName).toEqual(`service-name-${count}`);
  expect(serviceInstance4.instanceId).toEqual(`service-name-3`);
  expect(serviceInstance4.host).toEqual(`localhost-3`);
});
