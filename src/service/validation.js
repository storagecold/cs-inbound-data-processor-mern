const utils = require("./../util/utils");
function validateFile(dataFile) {
  let isColdExists = false;
  let submitter = utils.getSubmitter(dataFile);

  return isColdExists;
}

module.exports = { validateFile };
