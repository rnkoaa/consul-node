import fs from "fs";
import path from "path";
process.env.SUPPRESS_NO_CONFIG_WARNING = "y";
process.env["NODE_CONFIG_DIR"] = path.join(__dirname, "../config/");
import config from "config";

import { AppConfig } from "../util/app-config";

new AppConfig().bootstrap("default");

// const applicationName = appConfig.get("application");
// process.env.SUPPRESS_NO_CONFIG_WARNING = "y";
// import config from "config";

// const configDir = "config/";
// console.log(`Current directory: ${process.cwd()}`);

// const configPath = path.join(process.cwd(), configDir);
// console.log(configPath);

// console.log(config.util.toObject());

// config.util.extendDeep(config, {
//     "users": {
//         "name": "Richard Agyei"
//     }
// });
// console.log(config.util.toObject());

// console.log(config.get("users"));

console.log(config.get("port"));
