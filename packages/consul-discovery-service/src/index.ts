export { InstanceOperations } from './instance-operations';
export { DataStore } from './data-store';
export { ConsulInstanceConfig } from './consul-instance-config';
export { DiscoveryRestClient } from './discovery-rest-client';
console.log(`Started the application: ${process.env.CONSUL_HOST}:${process.env.CONSUL_PORT}`);
