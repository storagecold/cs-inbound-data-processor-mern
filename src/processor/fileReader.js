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
    loggger.error(e);
  }
}

async function readAmad(connection, dataFile) {
  try {
    // Query the DB
    const amadTable = await connection.query(SQL.AMAD);
    loggger.info(`amadTable.length ==> ${amadTable.length}`);
    const coldId = utils.getSubmitter(dataFile);
    for (let i = 0; i <= amadTable.length; i++) {
      let amadRecord = amadTable[i];
      if (!(amadRecord == undefined)) {
        const amad = await Amad.create({
          coldId: coldId,
          amadNo: amadRecord.AMADNO,
          entryDate: amadRecord.DATE,
          party: amadRecord.PARTY,
          village: amadRecord.VILL,
          packets: amadRecord.PKT3,
          commodity: amadRecord.COMM,
          kism: amadRecord.KISM,
          lotNo: amadRecord.MARK1,
          year: amadRecord.DATE.substring(0, 4),
          chamberNo: amadRecord.Room,
          chatta: amadRecord.chatta,
          gulla: amadRecord.gulla,
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
