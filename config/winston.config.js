const winston = require('winston');
const fs = require('fs');


const myCustomLevels = {

    levels : {
        'fatal': 4,
        'error': 3,
        'warn': 2,
        'debug': 1,
        'info': 0
    }

}


const logger = new winston.createLogger({
    levels: myCustomLevels.levels,
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
        }),
        new winston.transports.File({filename: `./logs/data.log`, level:'info'}),
        new winston.transports.File({filename: `./logs/data.log`, level: 'error'}),
        new winston.transports.File({filename: `./logs/data.log`, level: 'fatal'}),
    ],
    exitOnError: false
})

logger.stream = {
    write : (message) => {
        const status_code = message.split(' ')[2];
        if(status_code>=200 && status_code < 400) {
            logger.info(message)
        }
        else if(status_code >= 400 && status_code < 500) {
            logger.error(message)
        } 
        else if(status_code >= 500 && status_code < 600) {
            logger.fatal(message)
        }
    }
}

module.exports = logger;

