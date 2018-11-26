// Begin reading from stdin so the process does not exit.
// https://console.bluemix.net/docs/node/appmetrics.html#metrics
// https://nemethgergely.com/nodejs-healthcheck-graceful-shutdown/
process.stdin.resume();

process.on('SIGINT', () => {
  console.log('Received SIGINT. Press Control-D to exit.');
});

// Using a single function to handle multiple signals
function handle(signal) {
  console.log(`Received ${signal}`);
}

process.on('SIGINT', handle);
process.on('SIGTERM', handle);
