import { discoveryRestClient } from '../index';
import { CatalogServiceWatcher } from '../catalog-service-watcher';
import { datastoreInstance } from '../index';

const watcher = new CatalogServiceWatcher();
watcher.start();

setTimeout(() => {
  // console.log(`Instances: ${JSON.stringify(datastoreInstance.instances)}`)
  console.log(`${new Date()} => starting to discover url`);
  //   const generatedUrl = discoveryRestClient._discoverUrl('http://apricot/info/endpoints');
  //   console.log(`${new Date()} => Generated Url: ${generatedUrl}`);

  const endpoints = discoveryRestClient.get('http://apricot/info/endpoints');
  // endpoints.then(results => {
  //   console.log(`${new Date()} => Endpoints Check Results ${JSON.stringify(results.data)}`);
  // });

  const healthCheck = discoveryRestClient.get('http://apricot/health');
  // healthCheck.then(results => {
  //   console.log(`${new Date()} => Health Check Results ${JSON.stringify(results.data)}`);
  // });
  const infoCheck = discoveryRestClient.get('http://apricot/info');
  // infoCheck.then(results => {
  //   console.log(`${new Date()} => Info Check Results ${JSON.stringify(results.data)}`);
  // });

  Promise.all([endpoints, healthCheck, infoCheck]).then(results => {
    results.forEach(result => {
      console.log(`${new Date()} => Check Results ${JSON.stringify(result.data)}`);
    });

    process.exit(0);
  });

  // process.exit(1);
}, 2000);

// Using a single function to handle multiple signals
function handle(signal) {
  console.log(`\nReceived ${signal} Press Control-C to exit.`);
  console.log('Ending....');
  watcher.stop();
  process.exit(0);
}

process.on('SIGINT', handle);
process.on('SIGTERM', handle);
