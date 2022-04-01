//imports
const utils = require("./../util/utils");
const SQL = require("./../util/sql");
const ADODB = require("node-adodb");
const config = require("./../config/config");
const logger = config.logger;
const Amad = require("./../model/Amad");
const Account = require("./../model/Account");
const Partyledger = require("./../model/Partyledger");
const constants = require("./../util/constants");
const Neft = require("./../model/NEFT")
const mongoose = require("mongoose");
mongoose.connect(config.URL_CS_DEV);

async function readDataFile(dataFile) {
  try {
    const connection = ADODB.open(
      `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${config.INBOUND}${dataFile};Jet OLEDB:Database Password=state;Persist Security Info=False;`
    );
    //loadGrp
    await loadData(connection, dataFile);
    //load Amad
    // await readAmad(connection, dataFile);
    //load Grp
  } catch (e) {
    logger.error(e);
  }
}

async function loadData(connection, dataFile) {
  try {
    const coldId = utils.getSubmitter(dataFile);
    const year = utils.getYear(dataFile);
    const grpTable = await connection.query(constants.GRP_QUERY);
    for (let i = 0; i < grpTable.length; i++) {
      let grpRecord = grpTable[i];
      let partyName = grpRecord.descrip.trim();
      //logger.info("grpRecord ==> " + partyName);
      //grp
      // const account = await Account.create({
      //   coldId: coldId,
      //   year: year,
      //   accountName: grpRecord.descrip,
      //   address: grpRecord.add1,
      //   subGroup: grpRecord.under,
      //   open: grpRecord.open,
      //   dr: grpRecord.dr,
      //   close: grpRecord.close,
      //   balance: grpRecord.balance,
      //   nature: grpRecord.Nature,
      //   openOTHER: grpRecord.openOTHER,
      //   AccName: grpRecord.AccName,
      //   kName: grpRecord.KName,
      //   fName: grpRecord.FName,
      //   fRelation: grpRecord.FRelation,
      // });
      // account.save();
      // logger.info(account);

      //amad
      // let amadQuery = constants.AMAD_QUERY + partyName + constants.SINGLE_QUOTE;
      // const amadRows = await connection.query(amadQuery);
      // for (let i = 0; i < amadRows.length; i++) {
      //   let amadRow = amadRows[i];
      //   logger.info("amadRecord ==>" + amadRow.PARTY);
      //   const amad = await Amad.create({
      //     coldId: coldId,
      //     amadNo: amadRow.AMADNO,
      //     entryDate: amadRow.DATE,
      //     accountName: amadRow.PARTY,
      //     village: amadRow.VILL,
      //     packets: amadRow.PKT3,
      //     commodity: amadRow.COMM,
      //     kism: amadRow.KISM,
      //     lotNo: amadRow.MARK1,
      //     year: amadRow.DATE.substring(0, 4),
      //     chamberNo: amadRow.Room,
      //     chatta: amadRow.chatta,
      //     gulla: amadRow.gulla,
      //   });
      //   amad.save();
      //   logger.info(amad);
      // }

      //same do here fro partyledger.
      // let partyledgerQuery =
      //   constants.PARTY_LEDGER_QUERY + partyName + constants.SINGLE_QUOTE;
      // const partyledgerRows = await connection.query(partyledgerQuery);
      // for (let i = 0; i < partyledgerRows.length; i++) {
      //   let partyledgerRow = partyledgerRows[i];
      //   logger.info("partyledgerRow ==> " + partyledgerRow.name);
      //   const partyledger = await Partyledger.create({
      //     coldId: coldId,
      //     year: year,
      //     accountName: partyledgerRow.name,
      //     vouchtype: partyledgerRow.vouch_type,
      //     entryDate: partyledgerRow.date,
      //     amount: partyledgerRow.amount,
      //     acc: partyledgerRow.acc,
      //     loan: partyledgerRow.Loan,
      //     rent: partyledgerRow.Rent,
      //     interest: partyledgerRow.Intrst,
      //     oth: partyledgerRow.Oth,
      //     bardana: partyledgerRow.Bar,
      //     bardanaRate: partyledgerRow.BarRate,
      //     bardanaQtyIn: partyledgerRow.BarQtyIn,
      //     bardanaQtyOut: partyledgerRow.BarQtyOut,
      //     inWords: partyledgerRow.InWords,
      //   });
      //   partyledger.save();
      //   logger.info(partyledger);
      // }

      //NEFT

      let neftQuery = constants.NEFT_QUERY + partyName + constants.SINGLE_QUOTE;
      const neftRows = await connection.query(neftQuery);
      console.log(neftQuery)
      logger.info(`NEFT_Rows ==>${neftRows}`);
      
      for (let i = 0; i < neftRows.length; i++) {
        let neftRow = neftRows[i];
        logger.info(`NEFT_Row ==>${neftRow}`);
        const neft = await Neft.create({
          coldId: coldId,
          accountName: neftRow.name,
          date: neftRow.DAT,
          branch: neftRow.Branch,
          accNo: neftRow.AccNo,
          bankName: neftRow.BankName,
          accName: neftRow.AccName,
          ifsc: neftRow.IFSC,
          partyBranch: neftRow.PBranch,
          partyAccNo: neftRow.PAccNo,
          partyIfsc: neftRow.PIFSC,
          partyBankName: neftRow.PBankName,
          partyAccName: neftRow.PAccName,
          patyName: neftRow.PartyName,
          village: neftRow.PartyState,
          amount: neftRow.Amount,
          amountInWords: neftRow.AmtInWords,
          chqNo: neftRow.ChqNo,
          remark: neftRow.REMARK
        });
        neft.save();
        logger.info(neft)
      }
    }
  } catch (e) {
    logger.info(e.message);
  }
}


//exports
module.exports = { readDataFile };
