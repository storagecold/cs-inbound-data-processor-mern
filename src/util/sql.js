const PARTYLEDGER ="SELECT name,date,amount,acc,oth,v_srno,InWords, from partyledger" ;
const AMAD =
  "SELECT AMADNO,DATE,PARTY,VILL,PKT3,COMM ,KISM ,MARK1 ,YR,Room ,chatta,gulla from amad";
  const NEFT =
  "SELECT DAT,Branch,AccNo,IFSC,BankName,AccName,PBranch,PAccNo,PIFSC,PBankName,PAccName,PartyName,PartyState,Amount,AmtInWords,ChqNo,REMARK from neft";
module.exports = { AMAD,PARTYLEDGER ,NEFT};
