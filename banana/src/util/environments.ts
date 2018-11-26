// import logger from "./logger";
import {applicationConfig} from '../config';

const processEnv = {};
const processKeys = [
  "NOMAD_TASK_NAME",
  "NOMAD_CPU_LIMIT",
  "NOMAD_ALLOC_NAME",
  "NOMAD_ADDR_http",
  "NOMAD_PORT_http",
  "NOMAD_ALLOC_ID",
  "NOMAD_ALLOC_INDEX",
  "NOMAD_MEMORY_LIMIT",
  "NOMAD_ALLOC_DIR",
  "NOMAD_JOB_NAME",
  "NOMAD_REGION",
  "NOMAD_IP_http",
  "NOMAD_HOST_PORT_http",
  "NOMAD_TASK_DIR",
  "NOMAD_GROUP_NAME",
  "NOMAD_DC",
  "VAULT_TOKEN"
];
// populate the nomadEnv object
if (process.env.NOMAD_TASK_NAME) {
  processKeys.forEach(key => {
    processEnv[key] = process.env[key];
  });
}

// set keys that are general to almost all envs
const generalEnvKeys = ["HOSTNAME", "PATH", "NODE_VERSION", "YARN_VERSION"];
generalEnvKeys.forEach(key => {
  processEnv[key] = process.env[key];
});

processEnv["prod"] = applicationConfig.application.env === 'production';
processEnv["env"] = applicationConfig.application.env;

export const PROCESS_ENVIRONMENT = processEnv;
export const SESSION_SECRET = process.env["SESSION_SECRET"];

console.log(`Environment variable Now: ${applicationConfig.application.env}`);

if (!SESSION_SECRET) {
  // logger.error("No client secret. Set SESSION_SECRET environment variable.");
  // process.exit(1);
}
