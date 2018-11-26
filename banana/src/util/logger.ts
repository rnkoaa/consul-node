// // import winston from "winston";
// import { Logger, transports } from "winston";
// // import * as winston from 'winston';
// // import { Logger } from "winston";

// export const logger = new Logger({
//     transports: [
//         new transports.Console(),
//     ]
// });


// const logger = new Logger({
//     transports: [
//       new transports.Console(),
//       new transports.File ({ filename: 'somefile.log' })
//     ]
//   });

// // import { ENVIRONMENT } from "./secrets";

// const logger = new (Logger)({
//     transports: [
//         new (winston.transports.Console)({ level: process.env.NODE_ENV === "production" ? "error" : "debug" }),
//         new (winston.transports.File)({ filename: "debug.log", level: "debug"})
//     ]
// });

// if (process.env.NODE_ENV !== "production") {
//     logger.debug("Logging initialized at debug level");
// }

// export default logger;

