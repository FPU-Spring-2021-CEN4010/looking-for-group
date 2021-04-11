const { verify } = require('jsonwebtoken');

require('dotenv').config();

/**
 * @method isNotLoggedIn (filename)
 * @description Checks to see if the user is not logged in. 
 * @param {*} ctx 
 * @param {*} next 
 * @returns await next() if invalid cookie or undecodable cookie or logged in through backend || 401 if the user is logged in and has a decodable cookie. 
 */
module.exports = async (ctx, next) => {
     return new Promise(async (resolve, reject) => {
          //Check to see if user is logged in on the backend.
          if (ctx.state.user) {
               resolve(ctx.unauthorized("User is logged in, and is stored under context states."));
          }

          //Get cookie from context.
          let cookie = ctx.cookies.get("Authorization", {signed: true});

          //Check if cookie exists.
          if (typeof cookie != 'undefined') {
               //Decode the cookie. 
               verify(cookie, process.env.JWT_SECRET || "bc080210-a1fa-4ff9-af9e-ea61c35e8360", async (err, decoded) => {
                    //Cookie is not decodable and passes this check.
                    if (err) {
                         // Go to next policy or will reach the controller's action.
                         resolve(await next());
                    }

                    //Cookie is valid and doesn't pass this check. 
                    if (!err && decoded) {
                         resolve(ctx.unauthorized(`There is an active cookie, meaning there is already an active section.`));
                    }
               })
          } else {
               // Go to next policy or will reach the controller's action.
               resolve(await next());
          }
     })
};