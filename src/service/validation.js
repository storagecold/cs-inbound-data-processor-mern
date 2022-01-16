const mongoClient = require("mongodb").MongoClient;
const utils = require("./../util/utils");
const http = require("http");
const URL_CS_DEV = require("./../util/constants");

function validateFile(dataFile) {
  let isColdExist = false;
  const submitter = utils.getSubmitter(dataFile);
  isColdExist = isColdExists(submitter);

  return isColdExist;
}
function getResult(err, result) {
  if (err) throw err;
  if (submitter === result.submitterId) {
    console.log(result.submitterId);
    isSubmitterExists = true;
  } else {
    isSubmitterExists = false;
  }
  db.close();
}

function isColdExists(submitter) {
  let isSubmitterExists = false;
  mongoClient.connect("mongodb://localhost:27017/CS_DEV", (err, db) => {
    if (err) throw err;
    console.log("connected to database========");
    var dbo = db.db("CS_DEV");
    dbo.collection("coldInfo").findOne({}, getResult);
  });
  return isSubmitterExists;
}

module.exports = { validateFile };
