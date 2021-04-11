const { verify } = require('jsonwebtoken');

require('dotenv').config();

/**
 * @method isLoggedIn (filename)
 * @description Checks to see if the user has a valid login cookie.
 * @param {*} ctx 
 * @param {*} next 
 * @returns 401 if cookie is invalid or non-decodable || await next() if the cookie is decodable and an active user. 
 */
module.exports = async (ctx, next) => {
     return new Promise(async (resolve, reject) => {
          //Check if the user is logged in through the backend. 
          if (ctx.state.user) {
               return resolve(await next());
          }


          //Ge the cookie from the context.
          let cookie = ctx.cookies.get("Authorization", {signed: true});

          //Verify that cookie exists. 
          if (typeof cookie != 'undefined') {
               //Decode the cookie.
               verify(cookie, process.env.JWT_SECRET || "bc080210-a1fa-4ff9-af9e-ea61c35e8360", async (err, decoded) => {
                    //Return not logged in due to non-decodable cookie. 
                    if (err) {
                         resolve(ctx.unauthorized(`There was an error verifying the authentication token.`));
                    }

                    //Cookie was decodable.
                    if (!err && decoded) {
                         // Go to next policy or will reach the controller's action.
                         resolve(await next());
                    }
               })
          } else {
               resolve(ctx.unauthorized(`You're not logged in!`));
          }
     });
};