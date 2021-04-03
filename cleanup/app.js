const Cleaner = require('./Cleaner');
require('dotenv').config();

const job = Schedule.scheduleJob({hour: process.env.RUNTIME_HR, minute: process.env.RUNTIME_MIN}, async function() {
     let dailyCleaner = new Cleaner(process.env.CL_USER, process.env.CL_PASS);

     await dailyCleaner.cleanProcess();
})