const schedule = require("node-schedule");
const fs = require("fs");
const constants = require("./../util/constants");
const validation = require("./../service/validation");
const path = require("path");

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
    console.log(constants.INBOUND + trigFile);
    if (fs.existsSync(constants.INBOUND + trigFile)) {
      //file exists
      console.log(`trigFile: ${trigFile}`);
      let dataFile = trigFile.replace(".trig", "");
      console.log(`dataFile: ${dataFile}`);
      processDataFile(trigFile, dataFile);
    } else {
      console.log(`trig file: ${trigFile} does not exists`);
    }
  } catch (err) {
    console.error(err);
  }
}

function processDataFile(trigFile, dataFile) {
  try {
    if (fs.existsSync(constants.INBOUND + dataFile)) {
      validation.validateFile(dataFile);
    } else {
      console.log(`dataFile: ${dataFile} does not exists`);
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = { start };
