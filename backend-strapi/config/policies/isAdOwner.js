const { sanitizeEntity } = require('strapi-utils');
const { verify } = require('jsonwebtoken');

require('dotenv').config();

module.exports = async (ctx, next) => {
     return new Promise(async (resolve, reject) => {

          if (ctx.state.user) {
               resolve(await next());
          }

          let cookie = ctx.cookies.get("Authorization", {signed: true})

          if (typeof cookie != 'undefined') {
               verify(cookie, process.env.JWT_SECRET || "bc080210-a1fa-4ff9-af9e-ea61c35e8360", async (err, decoded) => {
                    if (err) {
                         resolve(ctx.unauthorized(`There was an error verifying the authentication token.`));
                    }
                    
                    if (!err && decoded) {
                         let uid = decoded.uid
                         let { id } = ctx.params

                         const entity = await strapi.services.advertisments.findOne({ id })

                         if (!entity || typeof entity == 'undefined') {
                              return ctx.send({
                                   statusCode: 400,
                                   error: "Invalid Advertisment",
                                   message: "This is not a valid advertisement!"
                              })
                         }

                         sanitizedEntity = sanitizeEntity(entity, { model: strapi.models.advertisments })

                         //console.log(sanitizedEntity.Active_User.id)
                         //console.log(uid)

                         if (!sanitizedEntity || !sanitizedEntity.Active_User) {
                              resolve(ctx.unauthorized("You do not appear to be the owner of this post!"))
                         }

                         if (sanitizedEntity.Active_User.id == uid) {
                              resolve(await next());
                         } else {
                              resolve(ctx.unauthorized(`You are not the owner of this post.`));
                         }
                    }
               })
          } else {
               resolve(ctx.unauthorized(`You do not have a valid cookie.`));
          }
     });
};