const axios = require('axios');

class Cleaner {
     constructor(user, pass) {
          this.username = user;
          this.password = pass;

          this.authToken = "";

          this.axios = axios.create({
               baseURL: 'http://localhost:1337/'
          });
     }

     async login() {
          try {
               const {data} = await this.axios.post("/auth/local", {
                    identifier: this.username,
                    password: this.password
               })

               this.authToken = data.jwt
          } catch (err) {
               reject(err);
          }
     }

     async clean(url) {
          return new Promise(async (resolve, reject) => {
               try {
                    const {data} = await this.axios.get(url, {
                         headers: {
                              Authorization: `Bearer ${this.authToken}`
                         }
                    });

                    //Check Created Date
                    for (let i = 0; i < data.length; i++) {
                         try {
                              let v = data[i];

                              let adDate = new Date(v.created_at);
                              let curDate = new Date();
                              
                              let diff = curDate - adDate;

                              if (diff > 86400000) {
                                   await this.axios.delete(`${url}/${v.id}`, {
                                        headers: {
                                             Authorization: `Bearer ${this.authToken}`
                                        }
                                   });
                              }
                         } catch (err) {
                              reject(err);
                         }
                    }

                    resolve();
               } catch (err) {     
                    reject(err);
               }
          })
     }

     async cleanProcess() {
          try {
               await this.login();

               //Clean advertisments
               await this.clean("/advertisments");

               //Clean users
               await this.clean("/active-users");
          } catch (err) {
               console.log(err);
          }
     }
}

module.exports = Cleaner