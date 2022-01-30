const config = require("./config/config");
const processor = require("./processor/processor");
const loggger = config.logger;
loggger.info("-----Application Started----");
processor.start();
