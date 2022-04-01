require("dotenv").config();
const{createLogger,format,transports} = require("winston");
const logger = createLogger({
    format:format.combine(format.timestamp(),format.json()),
    transports:[new transports.Console({})]
})

NODE_ENV = process.env.NODE_ENV;
PORT = process.env.PORT;
INBOUND = process.env.INBOUND;
ARCHIVE = process.env.ARCHIVE;
ERROR = process.env.ERROR;
STOP = process.env.STOP;
URL_CS_DEV = process.env.URL_CS_DEV;


module.exports = {logger,NODE_ENV,PORT,INBOUND,ARCHIVE,ERROR,STOP,URL_CS_DEV}