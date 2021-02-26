const winston = require('winston');

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "production"
let logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'user-service'},
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'info.log',
            handleExceptions: true,
            json: true,
            colorize: true
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: true,
            colorize: true
        })
    ]
});

logger.stream = {
    write: function(message, encoding) {
        logger.info(message)
    }
} 

module.exports = logger;
