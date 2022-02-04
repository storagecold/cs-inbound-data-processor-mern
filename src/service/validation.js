const utils = require("./../util/utils");
const { MongoClient } = require("mongodb");
const config = require("./../config/config");
const loggger = config.logger;

async function validateFile(fileName) {
  const submitter = utils.getSubmitter(fileName);
  return await isColdExists(submitter);
}

async function isColdExists(submitter) {
  let isColdAvailable = false;
  const client = new MongoClient(config.URL_CS_DEV);
  try {
    await client.connect();
    let query = {
      submitterId: submitter,
    };
    const result = await client
      .db("CS_DEV")
      .collection("coldInfo")
      .findOne(query, { submitterId: 1, _id: 0 });
    if (result) {
      isColdAvailable = true;
    }
  } catch (e) {
    loggger.error(e);
  } finally {
    await client.close();
  }
  return isColdAvailable;
}

module.exports = { validateFile };
