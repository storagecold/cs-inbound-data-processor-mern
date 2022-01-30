//imports
const constants = require("./../util/constants");
const utils = require("./../util/utils");
const SQL = require("./../util/sql");
const ADODB = require("node-adodb");
const { MongoClient } = require("mongodb");
const config = require("./../config/config");
const loggger = config.logger;

async function readDataFile(dataFile) {
  const client = new MongoClient(constants.URL_CS_DEV);
  try {
    await client.connect();
    //load Amad Table
    await readAmad(client, dataFile);
    //
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function readAmad(client, dataFile) {
  const connection = ADODB.open(
    `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${constants.INBOUND}${dataFile};Jet OLEDB:Database Password=state;Persist Security Info=False;`
  );
  // Query the DB
  const data = await connection.query(SQL.AMAD);

  const options = { upsert: true };
  const coldId = utils.getSubmitter(dataFile);
  console.log(`data.length ==> ${data.length}`);
  for (let i = 0; i <= data.length; i++) {
    let repacement = data[i];
    if (!(repacement == undefined)) {
      repacement.coldId = coldId;
      let query = {
        coldId: repacement.coldId,
        amadNo: repacement.amadNo,
        YR: repacement.YR,
      };
      const result = await client
        .db("CS_DEV")
        .collection("amad")
        .replaceOne(query, repacement, options);
      console.log(`documents were replaced ==> ${i}`);
    }
  }
  loggger.info("---- whole file has been processed --> ");
}
//exports
module.exports = { readDataFile };
