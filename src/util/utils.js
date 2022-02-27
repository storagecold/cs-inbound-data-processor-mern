const fs = require("fs");
const config = require("./../config/config");
function getSubmitter(fileName) {
  return fileName.substring(0, fileName.indexOf("."));
}
function getYear(fileName) {
  return fileName.substring(
    fileName.indexOf(".") + 1,
    fileName.indexOf(".") + 5
  );
}

function archive(fileName) {
  const src = config.INBOUND + fileName;
  const dest = config.ARCHIVE + fileName;
  fs.renameSync(src, dest);
}

function moveToError(fileName) {
  const src = config.INBOUND + fileName;
  const dest = config.ERROR + fileName;
  fs.renameSync(src, dest);
}

module.exports = { getSubmitter, archive, moveToError, getYear };
