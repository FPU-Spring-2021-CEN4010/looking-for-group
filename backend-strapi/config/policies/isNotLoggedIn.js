const { verify } = require('jsonwebtoken');

require('dotenv').config();

module.exports = async (ctx, next) => {
     return new Promise(async (resolve, reject) => {
          if (ctx.state.user) {
               resolve(ctx.unauthorized("User is logged in, and is stored under context states."));
          }

          let cookie = ctx.cookies.get("Authorization", {signed: true});

          if (typeof cookie != 'undefined') {
               verify(cookie, process.env.JWT_SECRET || "bc080210-a1fa-4ff9-af9e-ea61c35e8360", async (err, decoded) => {
                    if (err) {
                         resolve(await next());
                    }

                    if (!err && decoded) {
                         resolve(ctx.unauthorized(`There is an active cookie, meaning there is already an active section.`));
                    }
               })
          } else {
               resolve(await next());
          }
     })
};