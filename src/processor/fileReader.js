//imports
const constants = require("./../util/constants");
const SQL = require("./../util/sql");
const ADODB = require("node-adodb");
const { MongoClient } = require("mongodb");

async function readDataFile(dataFile) {
  const client = new MongoClient(constants.URL_CS_DEV);
  try {
    await client.connect();
    //
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
    `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:/Users/HP/Desktop/coldstorage/data/inbound/${dataFile};Persist Security Info=False;`
  );
  // Query the DB
  const data = await connection.query(SQL.AMAD);
  const options = { ordered: true };

  //console.log(JSON.stringify(data, null, 2));
  const result = await client
    .db("CS_DEV")
    .collection("amad")
    .insertMany(data, options);
  console.log(`${result.insertedCount} documents were inserted`);
}

//exports
module.exports = { readDataFile };
