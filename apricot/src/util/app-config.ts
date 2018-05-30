process.env.SUPPRESS_NO_CONFIG_WARNING = "y";
import { ENVIRONMENT } from "./environments";
import fs from "fs";
import path from "path";
import config from "config";
import { ConsulConfigClient } from "./consul-config-client";

export class AppConfig {
  private _consulConfigClient = new ConsulConfigClient();

 async bootstrap(ENVIRONMENT) {
    if (this._isBootstrapped()) {
      const consulAppConfig = await this._consulConfigClient.getConfig(ENVIRONMENT);
      const appConfigObj = JSON.parse(consulAppConfig);
      // const mConfig = config.util.extendDeep(config, appConfigObj);
      fs.writeFileSync(path.join(__dirname, "../config/default.json"), JSON.stringify(appConfigObj));
      // consulAppConfig.then(result => {
      //   const appConfigObj = JSON.parse(result);

      //   // merge it to the config object
      //   const mConfig = config.util.extendDeep(config, appConfigObj);
      //   // console.log(config.util.toObject());
      //   // console.log(mConfig.get("env"));
      //   // console.log(mConfig.get("port"));
      //   // console.log(mConfig.get("maintainer"));

      //   fs.writeFileSync(path.join(__dirname, "../config/default.json"), JSON.stringify(mConfig));
      // });
    }
  }
  private _isBootstrapped(): boolean {
    const bootstrapConfigFile = path.join(__dirname, "../config/bootstrap.json");
    return fs.existsSync(bootstrapConfigFile);
  }

  get(key: string): string {
    // if (this._isBootstrapped()) {
    //   // read config from generated bootstrap file.
    //   const configObj = this._getConfig(this._isBootstrapped());
    //   if (configObj) {
    //     return configObj[key];
    //   } else {
    //     return undefined;
    //   }
    // } else {
    //   // read config from config file
    //   const env = ENVIRONMENT ? ENVIRONMENT : "default";
    //   const configFile = `application-${env}.json`;
    // }
    return config.get(key);
  }

  private _getConfig(bootstrapped: boolean, configFile?: string): any {
    const generatedConfigFile = path.join(__dirname, "../../config/application-bootstrap.json");
    if (fs.existsSync(generatedConfigFile)) {
      const bootstrapConfigObj = fs.readFileSync(generatedConfigFile, "utf-8");
      return JSON.parse(bootstrapConfigObj);
    } else {
      if (configFile && fs.existsSync(configFile)) {
        const bootstrapConfigObj = fs.readFileSync(configFile, "utf-8");
        return JSON.parse(bootstrapConfigObj);
      }
    }
    return undefined;
  }
}
