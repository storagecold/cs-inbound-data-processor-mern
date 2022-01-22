const schedule = require("node-schedule");
const fs = require("fs");
const constants = require("./../util/constants");
const fileReader = require("./fileReader");
const validation = require("./../service/validation");
const path = require("path");

//scheduler, run every 2 seconds.
function start() {
  schedule.scheduleJob("*/2 * * * * *", run);
}

function run() {
  console.log("processing started ==> " + new Date());
  try {
    if (fs.existsSync(constants.STOP)) {
      //file exists
      console.log("stop file exists, hence stopped further processing");
    } else {
      processTrigFiles();
    }
  } catch (err) {
    console.error(err);
  }
}

function processTrigFiles() {
  let files = fs.readdirSync(constants.INBOUND);
  const trigFiles = getTrigFiles(files);
  if (trigFiles.length > 0) {
    trigFiles.forEach((trigFile) => {
      console.log(`start processing file: ${trigFile}`);
      processTrigFile(trigFile);
    });
  }
}

function getTrigFiles(files) {
  const EXTENSION = ".trig";
  const targetFiles = files.filter((file) => {
    return path.extname(file).toLowerCase() === EXTENSION;
  });
  return targetFiles;
}

function processTrigFile(trigFile) {
  try {
    if (fs.existsSync(constants.INBOUND + trigFile)) {
      //file exists
      console.log(`trigFile: ${trigFile}`);
      let dataFile = trigFile.replace(".trig", "");
      console.log(`dataFile: ${dataFile}`);
      processDataFile(dataFile);
    } else {
      console.log(`trig file: ${trigFile} does not exists`);
    }
  } catch (err) {
    console.error(err);
  }
}

function processDataFile(dataFile) {
  try {
    if (fs.existsSync(constants.INBOUND + dataFile)) {
      let isValidFile = true;
      // isValidFile = validation.validateFile(dataFile);
      if (isValidFile) {
        fileReader.readDataFile(dataFile);
      } else {
        console.log(`dataFile: ${dataFile} is not a valid file`);
      }
    } else {
      console.log(`dataFile: ${dataFile} does not exists`);
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = { start };
