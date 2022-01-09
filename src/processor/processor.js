const schedule = require("node-schedule");
const job = schedule.scheduleJob("*/2 * * * *", function () {
  console.log(
    "--------------Today is recognized by Rebecca Black!------------"
  );
});
