import axiosClient from './util/axios-client';
import * as uuidv4 from 'uuid/v4';
import { ConsulInstanceConfig } from './consul-instance-config';
import { ConsulRegistrationService } from './consul-service-registration';

export class InstanceOperations {
  _service: ConsulRegistrationService;
  constructor(_consulConfig: ConsulInstanceConfig) {
    this._service = new ConsulRegistrationService(_consulConfig);
    this._service.serviceId = uuidv4();
  }
  init(): void {
    this.registerService()
      .then(res => {
        // fs.writeFileSync('app.consul-registration', res);
        console.log("Successfully registered against consul.")
      })
      .catch(err => {
        console.log('caught an error while registering service.')
      });
  }

  close(fn: () => void): void {
    this.deregisterService().then(res => {
      console.log("Removed item from console: ", res);
      fn();
    })
      .catch(err => {
        console.log("Error while removing service from ", err);
        fn();
      });
  }
  async registerService(): Promise<string> {
    const instanceRegistrationId = uuidv4();
    const reqObject = {
      ID: instanceRegistrationId,
      Name: this._service.name,
      Address: this._service.address,
      Port: this._service.port,
    };
    try {
      const registerResponse = await axiosClient.put(this._service.registrationUrl, reqObject);
      console.log(`Registration response: ${registerResponse.data}`);
      return instanceRegistrationId;
    } catch (err) {
      //   console.log(err.response.data);
      //   console.log(err.response.status);
      return '';
    }
  }
  async deregisterService(): Promise<boolean> {
    try {
      const registerResponse = await axiosClient.put(
        `http://localhost:8500/v1/agent/service/deregister/${this._service.serviceId}`,
      );
      return true;
    } catch (err) {
      return false;
    }
  }
}
