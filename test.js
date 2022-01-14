const mongoClient = require("mongodb").MongoClient;

mongoClient.connect("mongodb://localhost:27017/CS_DEV", (err, db) => {
  if (err) throw err;
  console.log("connected to database========");
  var dbo = db.db("CS_DEV");
  dbo.collection("coldInfo").findOne({}, function (err, result) {
    if (err) throw err;
    console.log(result.submitterId);
    db.close();
  });
});
console.log("hello");
console.log("hello");