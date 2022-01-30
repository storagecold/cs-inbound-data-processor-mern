const fs = require("fs");
const constants = require("./constants");
function getSubmitter(fileName) {
  return fileName.substring(0, fileName.indexOf("."));
}

function archive(fileName) {
  const src = constants.INBOUND + fileName;
  const dest = constants.ARCHIVE + fileName;
  fs.renameSync(src, dest);
}

function moveToError(fileName) {
  const src = constants.INBOUND + fileName;
  const dest = constants.ERROR + fileName;
  fs.renameSync(src, dest);
}

module.exports = { getSubmitter, archive, moveToError };
