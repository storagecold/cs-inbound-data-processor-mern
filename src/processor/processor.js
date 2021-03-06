const schedule = require("node-schedule");
const fs = require("fs");
const utils = require("./../util/utils");
const fileReader = require("./fileReader");
const validation = require("./../service/validation");
const config = require("./../config/config");
const loggger = config.logger;
const path = require("path");

let isAnotherFileInProgress = false;

//scheduler, run every 2 seconds.
async function start() {
  loggger.info("in start() method of processor.js");
  await schedule.scheduleJob("*/120 * * * * *", run);
}

async function run() {
  loggger.info("in run() method() of processor.js");
  try {
    if (fs.existsSync(config.STOP)) {
      //file exists
      loggger.info("stop file exists, hence stopped further processing");
    } else {
      await processTrigFiles();
    }
  } catch (err) {
    console.error(err);
  }
}

async function processTrigFiles() {
  let files = fs.readdirSync(config.INBOUND);
  const trigFiles = getTrigFiles(files);
  if (trigFiles.length != 0) {
    for (let i = 0; i < trigFiles.length; i++) {
      loggger.info(`start processing file: ${trigFiles[i]}`);
      if (!isAnotherFileInProgress) {
        isAnotherFileInProgress = true;
        await processTrigFile(trigFiles[i]);
        isAnotherFileInProgress = false;
      } else {
        loggger.info("another file already in progress");
      }
    }
  } else {
    loggger.info("There is no trig file to process.");
  }
}

function getTrigFiles(files) {
  const EXTENSION = ".trig";
  const targetFiles = files.filter((file) => {
    return path.extname(file).toLowerCase() === EXTENSION;
  });
  return targetFiles;
}

async function processTrigFile(trigFile) {
  try {
    //file exists
    if (fs.existsSync(config.INBOUND + trigFile)) {
      const dataFile = trigFile.replace(".trig", "");
      loggger.info(`trigFile: ${trigFile}`);
      loggger.info(`dataFile: ${dataFile}`);
      const isValidFile = await validation.validateFile(trigFile);
      if (isValidFile) {
        await processDataFile(dataFile);
        //archive data and trig file.
        utils.archive(trigFile);
        utils.archive(dataFile);
      } else {
        console.log(`trigFile: ${trigFile} is not a valid file`);
        utils.moveToError(trigFile);
        utils.moveToError(dataFile);
      }
    } else {
      loggger.info(`trig file: ${trigFile} does not exists`);
    }
  } catch (err) {
    loggger.error(err);
  }
}

async function processDataFile(dataFile) {
  try {
    if (fs.existsSync(config.INBOUND + dataFile)) {
      await fileReader.readDataFile(dataFile);
    } else {
      console.log(`dataFile: ${dataFile} does not exists`);
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = { start };
