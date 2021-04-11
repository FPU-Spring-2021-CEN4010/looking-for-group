const axios = require('axios');

/**
 * @class Cleaner
 * @variables username, password, authToken, axios
 * @methods login(), clean(url), cleanProcess()
 */
class Cleaner {
     /**
      * @method CleanerConstructor
      * @description Sets the cleaners password and initial values for variables. 
      * @param {*} user 
      * @param {*} pass 
      */
     constructor(user, pass, baseURL) {
          this.username = user;
          this.password = pass;

          this.authToken = "";

          //Setup axios with a baseURL
          this.axios = axios.create({
               baseURL: baseURL
          });
     }

     /**
      * @method login
      * @description Cleaner login handler for getting the authentication token from the server.
      * @returns authToken and sets this instance with an authToken. 
      */
     async login() {
          return new Promise((resolve, reject) => {
               try {
                    //Request the login to the server. 
                    const {data} = await this.axios.post("/auth/local", {
                         identifier: this.username,
                         password: this.password
                    })

                    //Get the login token from the request and store it.
                    this.authToken = data.jwt;

                    resolve(this.authToken);
               } catch (err) {
                    //Catch and throw error to caller function. 
                    reject(err);
               }
          })
     }

     async clean(url) {
          return new Promise(async (resolve, reject) => {
               try {
                    //Get all entries for this URL. 
                    const {data} = await this.axios.get(url, {
                         headers: {
                              Authorization: `Bearer ${this.authToken}`
                         }
                    });

                    //Check Created Date for each entry.
                    for (let i = 0; i < data.length; i++) {
                         try {
                              let v = data[i];

                              let adDate = new Date(v.created_at);
                              let curDate = new Date();
                              
                              let diff = curDate - adDate;

                              //If date is over 24 hours old, run a delete on this entry.
                              if (diff > 86400000) {
                                   await this.axios.delete(`${url}/${v.id}`, {
                                        headers: {
                                             Authorization: `Bearer ${this.authToken}`
                                        }
                                   });
                              }
                         } catch (err) {
                              //Catch and throw error to caller function.
                              reject(err);
                         }
                    }


                    //Finish this clean.
                    resolve();
               } catch (err) {  
                    //Catch and throw error to caller function.   
                    reject(err);
               }
          })
     }

     /**
      * @method cleanProcess
      * @description The static cleaning process to initiate daily cleaning.
      */
     async cleanProcess() {
          try {
               console.log("Logging in to backend service...")
               //Login to the server.
               await this.login();

               console.log("Cleaning advertisments...")
               //Clean advertisments
               await this.clean("/advertisments");

               console.log("Cleaning active users...")
               //Clean users
               await this.clean("/active-users");
          } catch (err) {
               //Log any error that occur to the server console.
               console.log(err);
          }
     }
}

module.exports = Cleaner