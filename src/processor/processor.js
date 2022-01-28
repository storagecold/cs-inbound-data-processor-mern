const schedule = require('node-schedule')
const fs = require('fs')
const constants = require('./../util/constants')
const utils = require('./../util/utils')
const fileReader = require('./fileReader')
const validation = require('./../service/validation')
const path = require('path')

//scheduler, run every 2 seconds.
async function start() {
  await schedule.scheduleJob('*/2 * * * * *', run)
}

async function run() {
  console.log('processing started ==> ' + new Date())
  try {
    if (fs.existsSync(constants.STOP)) {
      //file exists
      console.log('stop file exists, hence stopped further processing')
    } else {
      await processTrigFiles()
    }
  } catch (err) {
    console.error(err)
  }
}

async function processTrigFiles() {
  let files = fs.readdirSync(constants.INBOUND)
  const trigFiles = getTrigFiles(files)

  for (let i = 0; i < trigFiles.length; i++) {
    console.log(`start processing file: ${trigFiles[i]}`)
    await processTrigFile(trigFiles[i])
  }
}

function getTrigFiles(files) {
  const EXTENSION = '.trig'
  const targetFiles = files.filter((file) => {
    return path.extname(file).toLowerCase() === EXTENSION
  })
  return targetFiles
}

async function processTrigFile(trigFile) {
  try {
    if (fs.existsSync(constants.INBOUND + trigFile)) {
      //file exists
      console.log(`trigFile: ${trigFile}`);
      let dataFile = trigFile.replace(".trig", "");
      console.log(`dataFile: ${dataFile}`);
      await processDataFile(dataFile);
      //archive data and trig file.
      utils.archive(trigFile);
      utils.archive(dataFile);
    } else {
      console.log(`trig file: ${trigFile} does not exists`)
    }
  } catch (err) {
    console.error(err)
  }
}

async function processDataFile(dataFile) {
  try {
    if (fs.existsSync(constants.INBOUND + dataFile)) {
      let isValidFile = true
      // isValidFile = validation.validateFile(dataFile);
      if (isValidFile) {
        await fileReader.readDataFile(dataFile)
      } else {
        console.log(`dataFile: ${dataFile} is not a valid file`)
      }
    } else {
      console.log(`dataFile: ${dataFile} does not exists`)
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = { start }
