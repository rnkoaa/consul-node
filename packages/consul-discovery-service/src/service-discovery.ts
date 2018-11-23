import {
  SelectionStrategy,
  SelectionStrategyFactory
} from "./selection-strategy";
import { ServiceInstance } from "./types/consul";
import { DataStore } from "./data-store";

export class ServiceDiscovery {
  _selectionStrategy: SelectionStrategy;
  _datastore: DataStore;

  constructor(discoveryStrategy: string, _datastore: DataStore) {
    this._datastore = _datastore;
    this._selectionStrategy = new SelectionStrategyFactory().createStrategy(
      discoveryStrategy
    );
  }

  discover(_serviceName: string): ServiceInstance | any {
    return this._selectionStrategy.select(_serviceName, this._datastore);
  }
}
