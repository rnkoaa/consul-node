import errorHandler from 'errorhandler';
import app from './app';
import { InstanceOperations } from '@hipster-store/consul-discovery-service';
import { applicationConfig } from "./config";

const instanceOperations = new InstanceOperations();
instanceOperations.init();

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(applicationConfig.application.port, () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode\n',
    applicationConfig.application.port, applicationConfig.application.env
  );
  console.log('  Press CTRL-C to stop\n');
});


process.on('SIGTERM', () => {
  server.close(() => {
    console.log('closing all connections.');
    instanceOperations.close(() => {
      console.log('Closed connections to consul.')
    })
  })
})
process.on('SIGINT', () => {
  server.close(() => {
    console.log('closing all connections.');
    instanceOperations.close(() => {
      console.log('Closed connections to consul.')
    })
  })
})

export default server;
