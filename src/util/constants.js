const { where } = require("../model/Amad");

const COLD_INFO = "coldInfo";
const GRP = "grp";
const PARTY_LEDGER = "partyledger";
const AMAD = "amad";
const SINGLE_QUOTE = "'";
const NEFT = "neft"
const GRP_QUERY =
  "SELECT grp.[descrip],grp.[add1],grp.[under],grp.[open],grp.[dr],grp.[close],grp.[balance],grp.[Nature],grp.[openOTHER],grp.[AccName],grp.[KName],grp.[FName],grp.[FRelation] from grp";
const PARTY_LEDGER_QUERY =
  "select partyledger.[name], partyledger.[vouch_type],partyledger.[date],partyledger.[amount],partyledger.[acc], partyledger.[Loan],partyledger.[Rent], partyledger.[Loan], partyledger.[Intrst], partyledger.[Oth], partyledger.[Bar], partyledger.[BarRate], partyledger.[BarQtyIn], partyledger.[BarQtyOut],partyledger.[InWords] from partyledger where partyledger.[name] = '";
const AMAD_QUERY =
  "SELECT amad.[AMADNO],amad.[DATE],amad.[PARTY],amad.[VILL],amad.[PKT3],amad.[COMM],amad.[KISM] ,amad.[MARK1] ,amad.[YR],amad.[Room] ,amad.[chatta],amad.[gulla] from amad where amad.[PARTY] ='";
  const NEFT_QUERY = 
  "SELECT  neft.[DAT], neft.[Branch], neft.[AccNo], neft.[IFSC], neft.[BankName], neft.[AccName],  neft.[PBranch], neft.[PAccNo], neft.[PIFSC], neft.[PBankName], neft.[PAccName],  neft.[PartyName], neft.[PartyState], neft.[Amount], neft.[AmtInWords], neft.[ChqNo], neft.[REMARK] from neft where neft.[PartyName] = '";
  module.exports = {
  COLD_INFO,
  GRP,
  PARTY_LEDGER,
  AMAD,
  GRP_QUERY,
  PARTY_LEDGER_QUERY,
  AMAD_QUERY,
  SINGLE_QUOTE,
  NEFT,
  NEFT_QUERY
};
