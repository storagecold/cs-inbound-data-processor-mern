const constants = require('./constants')
function getSubmitter(dataFile) {
  return dataFile.substring(0, dataFile.indexOf('.'))
}

function archive(fileName) {
  const src = constants.INBOUND + fileName;
  const dest = constants.ARCHIVE + fileName;

  // fs.move(src, dest, (err) => {
  //   if (err) return console.log(err)
  //   console.log(`File successfully moved!!`)
  // })
}

module.exports = { getSubmitter, archive }
