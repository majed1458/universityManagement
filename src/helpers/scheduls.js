const schedule = require("node-schedule");
const { updateAccount } = require("./Mail");

const rule = new schedule.RecurrenceRule();
rule.month=8;
rule.date=15

exports.subscribeToShudel =(user)=>{
    schedule.scheduleJob(rule,async function () {
        console.log("i m here1");
      
       await updateAccount(user)


      });
}
