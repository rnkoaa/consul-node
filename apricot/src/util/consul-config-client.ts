import logger from "./logger";
import { ENVIRONMENT } from "./environments";
import { Application } from "../context/application";
import fs from "fs";
import path from "path";

export class ConsulConfigClient {
  private _consulClient; // = Application.consulClient();

  getConfig(environment: string): Promise<string> {
    if (!environment) {
      environment = "default";
    }
    const bootstrapConfigObj = this._readBootstrapFile();
    let applicationName = undefined;
    return new Promise<any>((resolve, reject) => {
      if (bootstrapConfigObj) {
        if (bootstrapConfigObj.consul) {
          this._consulClient = Application.consulClient(bootstrapConfigObj.consul);
        } else {
          reject("Could Not Find Consul Host to make request");
        }

        if (bootstrapConfigObj.application) {
          applicationName = this._getApplicationName(bootstrapConfigObj.application);
        } else {
          reject("Application Name is required to make request");
        }
        if (applicationName) {
          this._consulClient.kv.get(`config/${applicationName}/${environment}`, (err, result: any) => {
            if (err) {
              reject(err);
            }
            const configString = result.Value;
            const configObj = JSON.parse(configString);
            resolve(configString);
          });
        }
      }
    });
  }

  private _getApplicationName(application: any): string {
    if (application) {
      return application.name;
    }
    return undefined;
  }

  private _buildConsulHost(consul: any): string {
    if (consul) {
      const consulHost = consul.host;
      const consulPort = consul.port || 0;
      const secure = consul.secure || false;

      let host = "";
      if (!secure) {
        host += "http://";
      } else {
        host += "https://";
      }

      if (consulHost) {
        host += consulHost;
      }

      if (consulPort > 0) {
        host += `:${consulPort}`;
      }
      return host;
    }
    return undefined;
  }

  private _readBootstrapFile(): any {
    const bootstrapFile = path.join(__dirname, "../../config/bootstrap.json");
    if (fs.existsSync(bootstrapFile)) {
      const bootstrapConfigObj = fs.readFileSync(bootstrapFile, "utf-8");
      return JSON.parse(bootstrapConfigObj);
    }
    return undefined;
  }
}
