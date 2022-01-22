//imports
const constants = require("./../util/constants");
const ADODB = require("node-adodb");
const url = "mongodb://localhost:27017/CS_DEV";
// Connect to the MS Access DB
readDataFile("test");
function readDataFile(dataFile) {
  const connection = ADODB.open(
    "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:/Users/HP/Desktop/coldstorage/data/inbound/lodhirajcs.2021.mdb;Persist Security Info=False;"
  );
  // Query the DB
  connection
    .query("SELECT PARTY,AMADNO,VILL,MARK1 FROM amad")
    .then((data) => {
      console.log(JSON.stringify(data, null, 2));
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("amad").insertOne(data, function (err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

//exports
module.exports = { readDataFile };
