// console.log('hello, World!')

// import { createLogger, format, transports } from 'winston'
// const fs = require('fs');
// const path = require('path');
//
// const env = process.env.NODE_ENV || 'development';
// const logDir = 'log';
//
// // Create the log directory if it does not exist
// if (!fs.existsSync(logDir)) {
//     fs.mkdirSync(logDir);
// }
//
// const filename = path.join(logDir, 'results.log');
//
// const logger = createLogger({
//     // change level if in dev environment versus production
//     level: env === 'development' ? 'debug' : 'info',
//     format: format.combine(
//         format.colorize(),
//         format.timestamp({
//             format: 'YYYY-MM-DD HH:mm:ss'
//         }),
//         format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
//     ),
//     transports: [
//         new transports.Console({
//             level: 'info',
//             format: format.combine(
//                 format.colorize(),
//                 format.printf(
//                     info => `${info.timestamp} ${info.level}: ${info.message}`
//                 )
//             )
//         }),
//         new transports.File({ filename })
//     ]
// });
//
//
// logger.info('Hello world');
// logger.warn('Warning message');
// logger.debug('Debugging info');

'use strict';

const { createLogger, format, transports } = require('winston');
import fs from 'fs';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
const logDir = process.env.LOG_DIR || 'log';
const baseLogFileName = process.env.LOG_BASE_FILE_NAME || 'application';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filename = path.join(logDir, `${baseLogFileName}.log`);

export const getLogger = (fileName: string) => {
  return createLogger({
    // change level if in dev environment versus production
    level: env === 'development' ? 'debug' : 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.json()
    ),
    transports: [
      new transports.Console({
        level: 'info',
        format: format.combine(
          format.colorize(),
          format.printf(info => `${info.timestamp} ${fileName} ${info.level}: ${info.message}`)
        )
      }),
      new transports.File({ filename })
    ]
  });
};

// const logger = createLogger({
//     // change level if in dev environment versus production
//     level: env === 'development' ? 'debug' : 'info',
//     format: format.combine(
//         format.timestamp({
//             format: 'YYYY-MM-DD HH:mm:ss'
//         }),
//         format.json()
//     ),
//     transports: [
//         new transports.Console({
//             level: 'info',
//             format: format.combine(
//                 format.colorize(),
//                 format.printf(
//                     info => `${info.timestamp} ${info.level}: ${info.message}`
//                 )
//             )
//         }),
//         new transports.File({ filename })
//     ]
// });

// getLogger('index.ts').info('Hello world');
// getLogger('index.ts').warn('Warning message');
// getLogger('index.ts').debug('Debugging info');
