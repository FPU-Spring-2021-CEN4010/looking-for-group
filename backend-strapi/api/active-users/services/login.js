'use strict';

const { sign, verify } = require('jsonwebtoken');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
     /**
      * @method decodeCookie
      * @description Get the user's cookie and decode it. Reject if error with the cookie. Resolve with success cookie. 
      * @param {*} ctx 
      * @param {*} callback 
      * @returns Callback of the function if valid || throw NO_COOKIE if invalid
      */
     async decodeCookie(ctx, callback) {
          return new Promise((resolve, reject) => {
               //Get the cookie in memory. 
               let cookie = ctx.cookies.get("Authorization", {signed: true});

               //If cookie is present, verify no manipulation of the JWT utilizing the verify function.
               if (typeof cookie != 'undefined') {
                    verify(cookie, process.env.JWT_SECRET || "bc080210-a1fa-4ff9-af9e-ea61c35e8360", (err, decoded) => {
                         //Resolve witht he callback, passing in the error and the decoded cookie information.
                         resolve(callback(err, decoded));
                    })
               } else {
                    /**
                     * @throw NO_COOKIE
                     */
                    reject("NO_COOKIE");
               }
          });
     },

     /**
      * @method saveDisplayName
      * @description Save the display name into the database. 
      * @param {*} data 
      * @returns Entry in database if valid || throw DUPLICATE_ENTRY if invalid
      */
     async saveDisplayName(data) {
          try {
               //Vaidate the data submitted utilizing strapi built in functions.
               const validData = await strapi.entityValidator.validateEntityCreation(
                    strapi.models["active-users"],
                    data
               );
               
               //Create the entry in DB utilizing strapi built in query.
               const entry = await strapi.query('active-users').create(validData);
               
               //Return the successful query response (should be the entry in the DB)
               return entry;
          } catch (err) {
               /**
                * @catch DUPLICATE_ENTRY
                */
               if (err.message.toLowerCase() == "duplicate entry") {
                    return "DUPLICATE_ENTRY";
               }
          }
     },

     /**
      * @method createJWT
      * @description Create a JWT for the new entry in the database. 
      * @param {*} ctx 
      * @param {*} entity 
      * @returns Response to the user containing JS Object of uid, display_name, and jwt.
      */
     async createJWT(ctx, entity) {
          //Load information into object.
          const claim = {
               uid: entity.id,
               display_name: entity.Display_Name
          }

          //Create JWT
          const jwt = sign(claim, process.env.JWT_SECRET || "bc080210-a1fa-4ff9-af9e-ea61c35e8360", {expiresIn: '1d'});

          ///// console.log(process.env.COOKIE_DOMAIN)

          //Set the cookie on the context parameter.
          ctx.cookies.set("Authorization", jwt, {
               maxAge: 86400000,
               secure: false,
               httpOnly: true,
               domain: process.env.COOKIE_DOMAIN || 'localhost',
               path: "/",
               signed: true,
               sameSite: false
          });

          //Send JWT to Client
          return {
               uid: entity.id,
               display_name: entity.Display_Name,
               jwt: jwt
          };
     }
};
