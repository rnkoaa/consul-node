// export const Greeter = (name: string) => `Hello ${name}`;

export { InstanceOperations } from './instance-operations';
export { DataStore } from './data-store';
export { ConsulInstanceConfig } from "./consul-instance-config";

// process.env.CONSUL_HOST, default to localhost
// process.env.APPLICATION_NAME, required
// process.env.CONSUL_PORT, default to 8500
// process.env.CONSUL_DISCOVERY_HEALTH_CHECK, if (true), enable health-check
// process.env.CONSUL_DISCOVERY_HEALTH_CHECK_PATH, path to use for consul check (http)
// process.env.CONSUL_DISCOVERY_HEALTH_CHECK_INTERVAL, (interval for health check, default, 30s)
// process.env.CONSUL_DISCOVERY_TAGS, optional metadata tags, (eg, foo=bar {foo: bar}, bar => {bar: bar})

console.log(`Started the application: ${process.env.CONSUL_HOST}:${process.env.CONSUL_PORT}`)
// export DataStore from './data-store';
// export InstanceOperations from
// const instanceOperations = new InstanceOperations();
// const response = instanceOperations.registerService({
//   name: 'apricot',
//   hostAddress: 'localhost',
//   port: 8081,
// });

// console.log(`Registered response: ${response}`);

// const deregisterResponse = instanceOperations.deregisterService({
//     instanceId: "1"
// })

// deregisterResponse.then(res => {
//     console.log(`Got response for deregister: ${res}`)
// })
// .catch(err => {
//     console.log(`Got response for deregister error : ${err}`)
// })

// process.on('exit', (code: any, next: () => void) => {
//     console.log("Application is exiting. cleanup before ")
//     next();
// })

