// const applicationName = process.env.APPLICATION_NAME;
// console.log(`Generated application name: ${applicationName}`)

import convict from "convict";
// import path from "path";

export const config = convict({
  application: {
    name: {
      doc: "The name of the application",
      format: String,
      default: "application",
      env: "APPLICATION_NAME"
    },
    instanceId: {
      doc: "The instance id of the application",
      format: String,
      default: "applicationId",
      env: "APPLICATION_INSTANCE_ID"
    }
  },
  advertise: {
    host: {
      doc: "The host for the application",
      format: String,
      default: "localhost",
      env: "ADVERTISE_HOST"
    },
    port: {
      doc: "The http port to bind.",
      format: "port",
      default: 3000,
      env: "ADVERTISE_PORT"
    }
  },
  service: {
    discovery: {
      strategy: {
        doc: "The default strategy for service discovery",
        format: ["random", "round-robin"],
        default: "random",
        env: "SERVICE_DISCOVERY_STRATEGY"
      }
    }
  },
  consul: {
    register: {
      self: {
        doc: "should register with consul",
        format: Boolean,
        default: false,
        env: "CONSUL_REGISTER_SELF"
      }
    },
    secure: {
      doc: "Connecting using https during registration",
      format: Boolean,
      default: false,
      env: "CONSUL_SECURE"
    },
    port: {
      doc: "The port for consul",
      format: "port",
      default: 8500,
      env: "CONSUL_PORT"
    },
    host: {
      doc: "The host for consul",
      format: String,
      default: "localhost",
      env: "CONSUL_HOST"
    },
    http: {
      health: {
        check: {
          name: {
            doc: "The name of the configured health check",
            format: String,
            env: "CONSUL_HTTP_HEALTH_CHECK_NAME"
          },
          method: {
            doc: "The name of the configured health check",
            format: ["GET", "POST", "PATCH", "PUT"],
            default: "GET",
            env: "CONSUL_HTTP_HEALTH_CHECK_METHOD"
          },
          tlsSkipVerify: {
            doc: "Should we skip tls verification during health check",
            format: Boolean,
            default: false,
            env: "CONSUL_HTTP_HEALTH_CHECK_TLS_SKIP_VERIFY"
          },
          address: {
            doc: "The host for consul",
            format: String,
            env: "CONSUL_HTTP_HEALTH_CHECK_ADDRESS"
          },
          path: {
            doc: "The path for health registered health check",
            format: String,
            default: "/health",
            env: "CONSUL_HTTP_HEALTH_CHECK_PATH"
          },
          interval: {
            doc: "Intervals between each health check",
            format: String,
            default: "10s",
            env: "CONSUL_HTTP_HEALTH_CHECK_INTERVAL"
          },
          timeout: {
            doc: "Timeouts for each health check",
            format: String,
            default: "1s",
            env: "CONSUL_HTTP_HEALTH_CHECK_TIMEOUT"
          },
          deregisterCriticalServiceAfter: {
            doc: "Deregister critical service after a service is critical",
            format: String,
            default: "30s",
            env: "CONSUL_HTTP_DEREGISTER_CRITICAL_SERVICE_AFTER"
          }
        }
      }
    }
  },
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 3000,
    env: "PORT"
  }
});

const env = config.get("env");
// config.loadFile((path.join('../config/'),  env + '.json'));
// config.loadFile("./config/" + env + ".json");

// Perform validation
// config.validate({allowed: 'strict'});
// export config;
