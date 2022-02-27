const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console({})],
});

// config.js
const dotenv = require("dotenv");
dotenv.config();
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const INBOUND = process.env.INBOUND;
const ARCHIVE = process.env.ARCHIVE;
const ERROR = process.env.ERROR;
const STOP = process.env.STOP;
const URL_CS_DEV = process.env.URL_CS_DEV;
const LOCALDB_CS_DEV = process.env.LOCALDB_CS_DEV;

module.exports = {
  logger,
  NODE_ENV,
  PORT,
  INBOUND,
  ARCHIVE,
  STOP,
  URL_CS_DEV,
  LOCALDB_CS_DEV,
};
