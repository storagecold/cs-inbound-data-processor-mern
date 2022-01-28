const fs = require("fs");
const constants = require("./constants");
function getSubmitter(dataFile) {
  return dataFile.substring(0, dataFile.indexOf("."));
}

function archive(fileName) {
  const src = constants.INBOUND + fileName;
  const dest = constants.ARCHIVE + fileName;
  fs.renameSync(src, dest);
}

module.exports = { getSubmitter, archive };
