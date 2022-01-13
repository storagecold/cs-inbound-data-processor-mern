const utils = require("./../util/utils");
const http = require("http");
const URLCOLDDB = require("./../util/constants");

function validateFile(dataFile) {
  let isColdExist = false;
  const submitter = utils.getSubmitter(dataFile);

  const submitterDB = isColdExists(submitter);
  if (submitterDB) {
    isColdExist = true;
  }
  return isColdExist;
}

function isColdExists(submitter) {
  const db = getDatabaseObject();
  var dbo = db.db("coldDB");
  dbo.collection("amad").findOne({}, function (err, result) {
    if (err) throw err;
    console.log(result.party);
    db.close();
  });
}

function getDatabaseObject() {
  const mongoClient = require("mongodb").MongoClient;
  const dbo = null;
  mongoClient.connect(URLCOLDDB, (err, db) => {
    if (err) throw err;
    console.log("connected to database-----> ");
    dbo = db;
  });
  return dbo;
}

module.exports = { validateFile };
