const schedule = require("node-schedule");
const fs = require("fs");
const constants = require("./../util/constants");

function start() {
  schedule.scheduleJob("*/15 * * * * *", run);
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
  // fs.readdirSync(constants.INBOUND).forEach((trigFile) => {
  //   console.log(trigFile);
  // });
  let files = fs.readdirSync(constants.INBOUND);
  let extension = "trig";
  console.log(files);
  files.filter((file) => file.match(new RegExp(`.*\.(${extension})`, "ig")));
}

module.exports = { start };
