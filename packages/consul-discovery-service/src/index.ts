import { DataStore } from './data-store';
import { DiscoveryRestClient } from './discovery-rest-client';
import { InstanceOperations } from './instance-operations';

// export { InstanceOperations } from './instance-operations';
export { DataStore } from './data-store';
export { ConsulInstanceConfig } from './consul-instance-config';
export { DiscoveryRestClient } from './discovery-rest-client';

export const datastoreInstance = new DataStore();
export const discoveryRestClient = new DiscoveryRestClient(datastoreInstance);
export const instanceOperations = new InstanceOperations();
