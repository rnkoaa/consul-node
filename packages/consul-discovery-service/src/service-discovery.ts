import { SelectionStrategy, SelectionStrategyFactory } from './selection-strategy';
import { ServiceInstance } from './types/consul';

export class ServiceDiscovery {
  _selectionStrategy: SelectionStrategy;

  constructor(discoveryStrategy: string) {
    this._selectionStrategy = new SelectionStrategyFactory().createStrategy(discoveryStrategy);
  }

  discover(_serviceName: string): ServiceInstance | any {
    return this._selectionStrategy.select(_serviceName);
  }
}
