import { ConsulHealthCheck } from "./types/consul";
import { ConsulInstanceConfig } from ".";
// https://www.consul.io/docs/agent/checks.html

// Script Check
// {
//     "check": {
//       "id": "mem-util",
//       "name": "Memory utilization",
//       "args": ["/usr/local/bin/check_mem.py", "-limit", "256MB"],
//       "interval": "10s",
//       "timeout": "1s"
//     }
//   }


// Http Check
// {
//     "check": {
//       "id": "api",
//       "name": "HTTP API on port 5000",
//       "http": "https://localhost:5000/health",
//       "tls_skip_verify": false,
//       "method": "POST",
//       "header": {"x-foo":["bar", "baz"]},
//       "interval": "10s",
//       "timeout": "1s"
//     }
//   }

// TCP Check
// {
//     "check": {
//       "id": "ssh",
//       "name": "SSH TCP on port 22",
//       "tcp": "localhost:22",
//       "interval": "10s",
//       "timeout": "1s"
//     }
//   }

// TTL Check
// {
//     "check": {
//       "id": "web-app",
//       "name": "Web App Status",
//       "notes": "Web app does a curl internally every 10 seconds",
//       "ttl": "30s"
//     }
//   }

// Docker Check
// {
//     "check": {
//       "id": "mem-util",
//       "name": "Memory utilization",
//       "docker_container_id": "f972c95ebf0e",
//       "shell": "/bin/bash",
//       "args": ["/usr/local/bin/check_mem.py"],
//       "interval": "10s"
//     }
//   }

// GRPC Check
// {
//     "check": {
//       "id": "mem-util",
//       "name": "Service health status",
//       "grpc": "127.0.0.1:12345",
//       "grpc_use_tls": true,
//       "interval": "10s"
//     }
//   }

// alias Check
// {
//     "check": {
//       "id": "web-alias",
//       "alias_service": "web"
//     }
//   }

export const httpHealthCheckEnabled = (): boolean => {
    let results = false;
    for (let envName in process.env) {
        if (envName.startsWith('CONSUL_HTTP')) {
            results = true;
            break;
        }
    }
    return results;
}
const stringToBoolean = (str: string | undefined): boolean => {
    return str !== undefined && (str === "true");
}
const stringToInteger = (str: string | any): number => {
    return (str === undefined) ? 0 : parseInt(str);
}

export const consulInstanceConfig = <ConsulInstanceConfig>{
    host: process.env.CONSUL_HOST || "localhost",
    port: (stringToInteger(process.env.CONSUL_PORT) === 0) ? 8500 : stringToInteger(process.env.CONSUL_PORT),
    secure: stringToBoolean(process.env.CONSUL_SECURE),
    serviceName: process.env.APPLICATION_NAME,
    serviceAddress: process.env.APPLICATION_HOST || 'localhost',
    servicePort: (stringToInteger(process.env.PORT) === 0) ? 3000 : stringToInteger(process.env.PORT)
};

export const generateHTTPHealthCheck = (env: any): ConsulHealthCheck | any => {
    let applicationHealthCheckEndpoint = "";
    if (env.CONSUL_HTTP_HEALTH_CHECK_ADDRESS) {
        applicationHealthCheckEndpoint = env.CONSUL_HTTP_HEALTH_CHECK_ADDRESS;
    } else {
        const applicationSecure = stringToBoolean(env.APPLICATION_SECURE);
        const uriPrefix = (applicationSecure) ? "https" : "http"
        const applicationBaseEndpoint = `${uriPrefix}://${env.APPLICATION_HOST}:${env.PORT}`;
        applicationHealthCheckEndpoint = `${applicationBaseEndpoint}${env.CONSUL_HTTP_HEALTH_CHECK_PATH}`
    }
    const consulHealthCheck = <ConsulHealthCheck>{
        Name: env.CONSUL_HTTP_HEALTH_CHECK_NAME || `${env.APPLICATION_NAME || ""}`,
        ID: `${env.CONSUL_HTTP_HEALTH_CHECK_NAME}:http`,
        HTTP: applicationHealthCheckEndpoint,
        Interval: env.CONSUL_HTTP_HEALTH_CHECK_INTERVAL || "10s",
        Timeout: env.CONSUL_HTTP_HEALTH_CHECK_TIMEOUT || "1s"
    }

    if (stringToBoolean(env.CONSUL_HTTP_HEALTH_CHECK_TLS_SKIP_VERIFY)) {
        consulHealthCheck.TLSSkipVerify = stringToBoolean(env.CONSUL_HTTP_HEALTH_CHECK_TLS_SKIP_VERIFY);
    }
    if (env.CONSUL_HTTP_HEALTH_CHECK_METHOD) {
        consulHealthCheck.Method = env.CONSUL_HTTP_HEALTH_CHECK_METHOD;
    }
    if (env.CONSUL_HTTP_DEREGISTER_CRITICAL_SERVICE_AFTER) {
        consulHealthCheck.DeregisterCriticalServiceAfter = env.CONSUL_HTTP_DEREGISTER_CRITICAL_SERVICE_AFTER;
    }
    return consulHealthCheck
}

export const generateHealthChecks = [
    generateHTTPHealthCheck(process.env)
]