export interface ConsulInstanceConfig {
    // process.env.CONSUL_HOST, default to localhost
    // process.env.APPLICATION_NAME, required
    // process.env.CONSUL_PORT, default to 8500
    // process.env.CONSUL_DISCOVERY_HEALTH_CHECK, if (true), enable health-check
    // process.env.CONSUL_DISCOVERY_HEALTH_CHECK_PATH, path to use for consul check (http)
    // process.env.CONSUL_DISCOVERY_HEALTH_CHECK_INTERVAL, (interval for health check, default, 30s)
    // process.env.CONSUL_DISCOVERY_TAGS, optional metadata tags, (eg, foo=bar {foo: bar}, bar => {bar: bar})

    host?: string;
    serviceId?: string;
    port?: number;
    secure?: boolean;
    enableHealthCheck?: boolean;
    discoveryHealthCheckPath?: string;
    discoveryHealthCheckInterval?: string;
    applicationName: string;
    tags?: Array<string>;
}