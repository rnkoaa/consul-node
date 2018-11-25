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

// import package from '../package';
// import packageJson from '../package.json';
// console.log(packageJson.version);

// // console.log(`Imported Package Json`);

// const getVersion = () => {
//   console.log(`return versions ${packageJson.version}`);
//   return packageJson.version;
// };

export const applicationConfig: Config = <Config>{
  application: <Application>{
    startTime: new Date(),
    env: process.env.NODE_ENV || 'development',
    name: process.env.APPLICATION_NAME || 'Apricot',
    port: parseInt(process.env.PORT) || 3000,
    host: process.env.ADVERTISE_HOSTNAME || 'localhost',
    version: process.env.APPLICATION_VERSION || '1.0.0'
  },
  host: process.env.ADVERTISE_HOSTNAME || 'localhost',
  port: parseInt(process.env.ADVERTISE_PORT) || 3000
};

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
  startTime?: Date;
  version?: string;
}
