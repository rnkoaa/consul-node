import logger from "./logger";
import { ENVIRONMENT } from "./environments";
import { Application } from "../context/application";
import fs from "fs";
import path from "path";

export class ConfigBootstrap {
  private _consulClient = Application.consulClient();
  bootstrap(environment: string): any {
    if (!environment) {
      environment = "default";
    }
    // console.log("Bootstrap Called.");
    // // logger.debug(`Bootstrapping the config for environment: ${environment}`);
    // const configFileName = path.join(__dirname, "../../config", `${environment}.json`);
    // logger.debug(`Bootstrapping the config from file: ${configFileName}`);

    // if (fs.existsSync(configFileName)) {
    //   const configObj = fs.readFileSync(configFileName, "utf-8");
    //   return JSON.parse(configObj);
    // }

    // if bootstrap.json exists, read the bootstrap file, maybe, config will be read from consul
    const bootstrapConfigObj = this._readBootstrapFile();
    let fullConsulHost = undefined;
    let applicationName = undefined;
    if (bootstrapConfigObj) {
      if (bootstrapConfigObj.consul) {
        fullConsulHost = this._buildConsulHost(bootstrapConfigObj.consul);
        if (fullConsulHost) {
          logger.debug(`make consul config call to: ${fullConsulHost}`);
        }
      }

      if (bootstrapConfigObj.application) {
        applicationName = this._getApplicationName(bootstrapConfigObj.application);
        logger.info(`Application Name for key: ${applicationName}`);
      }
      if (fullConsulHost && applicationName) {
        this._consulClient.kv.get(`config/${applicationName}/${environment}`, (err, result: any) => {
          if (err) {
            console.log(err);
          }
          const configString = result.Value;
          const configObj = JSON.parse(configString);
          console.log(configObj.application);
        });
      }
    }
    return undefined;
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
