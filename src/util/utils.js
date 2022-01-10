function getSubmitter(dataFile) {
  return dataFile.substring(0, dataFile.indexOf("."));
}
module.exports = { getSubmitter };
