import errorHandler from 'errorhandler';
import app from './app';
import { applicationConfig } from './config';

// const instanceOperations = new InstanceOperations();
const instanceOperations = app.get('instanceOperations');
instanceOperations.init();

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

// app.get(ENDPOINTS.datastore, (req, res) => {
//   res.json(instanceOperations._datastore.instances);
// })

/**
 * Start Express server.
 */
const server = app.listen(applicationConfig.application.port, () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode\n',
    applicationConfig.application.port,
    applicationConfig.application.env
  );
  console.log('Press CTRL-C to stop\n');
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('closing all connections.');
    instanceOperations.close(() => {
      console.log('Closed connections to consul. ON SIGTERM');
    });
  });
});
process.on('SIGINT', () => {
  server.close(() => {
    console.log('closing all connections.');
    instanceOperations.close(() => {
      console.log('Closed connections to consul. ON SIGINT');
      process.exit(0);
    });
  });
});

export default server;
