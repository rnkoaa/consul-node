// const parseKV = (input: string): Array<ConsulKV> => {
//     if (!input) {
//         return [];
//     }
//     const inputParts = input.split(',');
//     return inputParts.map(item => {
//         if (item.includes("=")) {
//             const itemParts = item.split("=")
//             return { name: itemParts[0], value: itemParts[1] }
//         }
//         return { name: item, value: item }
//     })
// }

export const applicationConfig: Config = <Config>{
    application: <Application>{
        name: process.env.APPLICATION_NAME || 'Apricot',
        port: parseInt(process.env.PORT) || 3000,
        host: process.env.APPLICATION_HOSTNAME || 'localhost',
    },
    host: process.env.APPLICATION_HOSTNAME || 'localhost',
    port: parseInt(process.env.PORT) || 3000,
}

export interface Config {
    application?: Application;
    port?: number;
    // consul?: Consul
}

// export interface Consul {
//     port: number;
//     host: string;
//     secure?: boolean;
//     discovery?: ConsulDiscovery;
// }

// export interface ConsulDiscovery {
//     tags?: Array<string>;
//     meta?: Array<ConsulKV>;
//     healthCheck?: boolean;
//     healthCheckPath?: string;
//     healthCheckInterval?: string;
// // }
// export interface ConsulHealthCheck {
//     id?: string;
//     name?: string;
//     args?: string;
//     timeout?: string;
//     http?: string;
//     tcp?: string;
//     tls_skip_verify?: string;
//     method?: string;
//     interval?: string;
//     grpc?: string;
//     grpc_use_tls?: string;
//     docker_container_id?: string;
//     alias_service?: string;
//     shell?: string;
//     notes?: string;
//     ttl?: string;
// }

// export interface ConsulKV {
//     name: string;
//     value: string | number | boolean | any
// }

export interface Application {
    name?: string;
    host?: string;
    port?: number;
}

