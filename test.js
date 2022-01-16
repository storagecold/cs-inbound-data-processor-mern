const mongoClient = require("mongodb").MongoClient;
//const mongoClient = mongodb.MongoClient;

// mongoClient.connect("mongodb://localhost:27017/CS_DEV", (err, db) => {
//   if (err) throw err;
//   console.log("connected to database========");
//   var dbo = db.db("CS_DEV");
//   dbo.collection("coldInfo").findOne({}, (err, result) => {
//     if (err) throw err;
//     console.log(result.submitterId);
//     db.close();
//   });
// });

mongoClient.connect("mongodb://localhost:27017/CS_DEV", connectDb);

function getResult(err, result) {
  if (err) throw err;
  console.log(result.submitterId);
  
}

// function connectDb(err, db) {
//   if (err) throw err;
//   console.log("connected to database========");
//   var dbo = db.db("CS_DEV");
//   dbo.collection("coldInfo").findOne({}, (err, result) => {
//     if (err) throw err;
//     console.log(result.submitterId);
//     db.close();
//   });
// }

function connectDb(err, db) {
  if (err) throw err;
  console.log("connected to database========");
  var dbo = db.db("CS_DEV");
  dbo.collection("coldInfo").findOne({}, getResult);
  db.close();
}

//mongoClient.connect("mongodb://localhost:27017/CS_DEV", connectDb);
