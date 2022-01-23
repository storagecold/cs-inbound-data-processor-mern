const { MongoClient } = require("mongodb");
const ADODB = require("node-adodb");

async function main() {
  const uri = "mongodb://localhost:27017/CS_DEV";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    //
    await readAmad(client);
    //await listDatabases(client);
    //
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function readAmad(client) {
  const connection = ADODB.open(
    "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:/Users/HP/Desktop/coldstorage/data/inbound/lodhirajcs.2021.mdb;Persist Security Info=False;"
  );
  // Query the DB
  //   connection.query("SELECT PARTY,AMADNO,VILL,MARK1 FROM amad")
  //     .then((amadData) => {
  //       console.log(JSON.stringify(data, null, 2));
  //       loadAmad(client, amadData);
  //     });
  // Query the DB
  const data = await connection.query(
    "SELECT PARTY,AMADNO,VILL,MARK1 FROM amad"
  );
  const options = { ordered: true };

  console.log("start printing");
  console.log(JSON.stringify(data, null, 2));
  const result = await client
    .db("CS_DEV")
    .collection("amad")
    .insertMany(data, options);
  console.log(`${result.insertedCount} documents were inserted`);
  console.log("end printing");
}

async function loadAmad(client, amadData) {
  const result = await client
    .db("CS_DEV")
    .collection("amad")
    .insertOne(amadData);
  console.log(
    `new Amad Record created with the following _id: ${result.insertedId}`
  );
}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
}

main().catch(console.error);
