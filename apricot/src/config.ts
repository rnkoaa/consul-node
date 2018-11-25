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
        env: process.env.NODE_ENV || 'development',
        name: process.env.APPLICATION_NAME || 'Apricot',
        port: parseInt(process.env.PORT) || 3000,
        host: process.env.ADVERTISE_HOSTNAME || 'localhost',
    },
    host: process.env.ADVERTISE_HOSTNAME || 'localhost',
    port: parseInt(process.env.ADVERTISE_PORT) || 3000,
}

export interface Config {
    application?: Application;
    port?: number;
    // consul?: Consul
}

export interface Application {
    env?: string;
    name?: string;
    host?: string;
    port?: number;
}

