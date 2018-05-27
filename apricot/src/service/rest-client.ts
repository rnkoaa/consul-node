import { DiscoveryClient } from "./discovery-client";
import axios from "axios";
import { Url } from "../util/url";
import { hostname } from "os";
export class RestClient {
  private _discoveryClient: DiscoveryClient;
  constructor(discoveryClient: DiscoveryClient) {
    this._discoveryClient = discoveryClient;
  }

  private async _generateRequestUrl(url: string): Promise<string> {
    const urlPaths = Url.urlParts(url);
    let instanceHttpUrl;
    if (urlPaths.hostname) {
      const serviceInstance = await this._discoveryClient.getServiceInstance(urlPaths.hostname);
      instanceHttpUrl = `${urlPaths.protocol}://${serviceInstance.httpUri}${urlPaths.path}`;
      if (urlPaths.query_params) {
        let instanceHttpUrl;
        instanceHttpUrl = `${instanceHttpUrl}${urlPaths.query_params}`;
      }
    }
    return instanceHttpUrl;
  }

  async get(url: string): Promise<any> {
    const instanceHttpUrl = await this._generateRequestUrl(url);
    return axios.get(instanceHttpUrl);

    /* async function getUser() {
        try {
          const response = await axios.get('/user?ID=12345');
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      } */
  }
  async post(url: string, body: string): Promise<any> {}
}
