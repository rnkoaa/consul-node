export interface ConsulInstanceConfig {
    host?: string;
    port?: number;
    registerSelf?: boolean;
    secure?: boolean;
    discoveryStrategy?: string;
    enableHealthCheck?: boolean;
    discoveryHealthCheckPath?: string;
    discoveryHealthCheckInterval?: string;
    instanceId?: string;
    serviceName: string;
    serviceAddress: string;
    servicePort: number;
    tags?: Array<string>;
    meta?: Array<string>;
}