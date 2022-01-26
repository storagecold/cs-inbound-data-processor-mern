//imports
const constants = require('./../util/constants')
const utils = require('./../util/utils')
const SQL = require('./../util/sql')
const ADODB = require('node-adodb')
const { MongoClient } = require('mongodb')
async function readDataFile(dataFile) {
  const client = new MongoClient(constants.URL_CS_DEV)
  try {
    await client.connect()
    
    await readAmad(client, dataFile)
    //
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

async function readAmad(client, dataFile) {
  const connection = ADODB.open(
    `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:/Users/pankaj/Desktop/cold_storage/data/inbound/${dataFile};Persist Security Info=False;`,
  )
  // Query the DB
  const data = await connection.query(SQL.AMAD)
 
  const options = { upsert: true }
  const coldId = utils.getSubmitter(dataFile);
  for (let i = 0; i <= data.length; i++) {
    let repacement = data[i];
    repacement.coldId = coldId;
    let query = { "coldId":repacement.coldId,"AMADNO": repacement.AMADNO, "YR": repacement.YR };
    const result = await client
      .db('CS_DEV')
      .collection('amad')
      .replaceOne(query, repacement, options)
    //console.log(`${result} documents were replaced`);
  }
}
//exports
module.exports = { readDataFile }
