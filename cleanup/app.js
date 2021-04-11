const Cleaner = require('./Cleaner');
const Schedule = require('node-schedule')
require('dotenv').config();

console.log("Cleanup process is now running!");

/**
 * Schedule the cleaner to run once, daily. 
 */
const job = Schedule.scheduleJob({hour: process.env.RUNTIME_HR, minute: process.env.RUNTIME_MIN}, async function() {
     console.log("Starting daily cleaning process.");

     //Instantiate the cleaner process for this instance. 
     let dailyCleaner = new Cleaner(process.env.CL_USER, process.env.CL_PASS, process.env.API_URL);

     //Start cleaning process.
     await dailyCleaner.cleanProcess();

     console.log("Finished daily cleaning process.!");
})