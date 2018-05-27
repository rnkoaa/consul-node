import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
} else {
  logger.debug("Using .env.example file to supply config environment variables");
  // dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;

const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'
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

processEnv["prod"] = prod;
processEnv["ENVIRONMENT"] = ENVIRONMENT;

export const PROCESS_ENVIRONMENT = processEnv;

export const SESSION_SECRET = process.env["SESSION_SECRET"];

console.log(`Environment variable Now: ${ENVIRONMENT}`);

if (!SESSION_SECRET) {
  // logger.error("No client secret. Set SESSION_SECRET environment variable.");
  // process.exit(1);
}
