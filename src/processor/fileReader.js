//imports
const utils = require("./../util/utils");
const SQL = require("./../util/sql");
const ADODB = require("node-adodb");
const config = require("./../config/config");
const loggger = config.logger;
const Amad = require("./../model/Amad");
const mongoose = require("mongoose");
mongoose.connect(config.URL_CS_DEV);

async function readDataFile(dataFile) {
  try {
    const connection = ADODB.open(
      `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${config.INBOUND}${dataFile};Jet OLEDB:Database Password=state;Persist Security Info=False;`
    );
    //load Amad
    await readAmad(connection, dataFile);
    //load Grp
  } catch (e) {
    console.error(e);
  }
}

async function readAmad(connection, dataFile) {
  try {
    // Query the DB
    const data = await connection.query(SQL.AMAD);
    loggger.info(`data.length ==> ${data.length}`);
    const coldId = utils.getSubmitter(dataFile);
    for (let i = 0; i <= data.length; i++) {
      let repacement = data[i];
      if (!(repacement == undefined)) {
        const amad = await Amad.create({
          coldId: coldId,
          amadNo: repacement.amadNo,
          date: repacement.DATE,
          party: repacement.PARTY,
          village: repacement.VILL,
          commodity: repacement.COMM,
          kism: repacement.KISM,
          lotNo: repacement.MARK1,
          year: repacement.YR,
          chamberNo: repacement.Room,
          chatta: repacement.chatta,
          gulla: repacement.gulla,
        });
        amad.save();
        loggger.info(amad);
      }
    }
  } catch (e) {
    loggger.info(e.message);
  }
}
//exports
module.exports = { readDataFile };
