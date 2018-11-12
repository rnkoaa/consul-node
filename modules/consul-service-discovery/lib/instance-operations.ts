import axiosClient from './util/axios-client';
import * as uuidv4 from 'uuid/v4';

/**
 * router.get('/', function (req, res, next) {
    res.json({status: 'UP'});
  });
app.use("/health", router);
 */
export class InstanceOperations {
  async registerService(service: any): Promise<string> {
    const instanceRegistrationId = uuidv4();
    const reqObject = {
      ID: instanceRegistrationId,
      Name: service.name,
      Address: service.hostAddress,
      Port: service.port,
    };
    try {
      const registerResponse = await axiosClient.put(`http://localhost:8500/v1/agent/service/register`, reqObject);
      console.log(`Registration response: ${registerResponse.data}`);
      return instanceRegistrationId;
    } catch (err) {
      //   console.log(err.response.data);
      //   console.log(err.response.status);
      return '';
    }
  }
  async deregisterService(service: any): Promise<boolean> {
    try {
      const registerResponse = await axiosClient.put(
        `http://localhost:8500/v1/agent/service/deregister/${service.serviceId}`,
      );
      return true;
    } catch (err) {
      return false;
    }
  }
}
