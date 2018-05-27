import { ENVIRONMENT } from "./environments";
import fs from "fs";
import path from "path";

export class AppConfig {
  private _isBootstrapped(): boolean {
    const bootstrapConfigFile = path.join(__dirname, "../../config/bootstrap.json");
    return fs.existsSync(bootstrapConfigFile);
  }

  get(key: string): string {
    if (this._isBootstrapped()) {
      // read config from generated bootstrap file.
      const configObj = this._getConfig(this._isBootstrapped());
      if (configObj) {
        return configObj[key];
      } else {
        return undefined;
      }
    } else {
      // read config from config file
      const env = ENVIRONMENT ? ENVIRONMENT : "default";
      const configFile = `application-${env}.json`;
    }
    return undefined;
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
