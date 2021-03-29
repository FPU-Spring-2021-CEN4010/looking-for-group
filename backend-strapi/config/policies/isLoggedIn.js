const { verify } = require('jsonwebtoken');

require('dotenv').config();

module.exports = async (ctx, next) => {

     let cookie = ctx.cookies.get("authenticated", {signed: true})

     if (typeof cookie != 'undefined') {
          verify(cookie, process.env.JWT_SECRET || "bc080210-a1fa-4ff9-af9e-ea61c35e8360", async (err, decoded) => {
               if (err) {
                    ctx.unauthorized(`There was an error verifying the authentication token.`)
               }

               if (!err && decoded) {
                    // Go to next policy or will reach the controller's action.
                    return await next()
               }
          })
     } else {
          ctx.unauthorized(`You're not logged in!`);
     }
};