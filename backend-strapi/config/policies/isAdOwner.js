const { sanitizeEntity } = require('strapi-utils');
const { verify } = require('jsonwebtoken');

require('dotenv').config();

module.exports = async (ctx, next) => {
     return new Promise(async (resolve, reject) => {
          let cookie = ctx.cookies.get("Authorization", {signed: true})

          if (typeof cookie != 'undefined') {
               verify(cookie, process.env.JWT_SECRET || "bc080210-a1fa-4ff9-af9e-ea61c35e8360", async (err, decoded) => {
                    if (err) {
                         ctx.unauthorized(`There was an error verifying the authentication token.`)
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

                         if (sanitizedEntity.Active_User.id == uid) {
                              resolve(await next());
                         } else {
                              ctx.unauthorized(`You are not the owner of this post.`)
                         }
                    }
               })
          } else {
               ctx.unauthorized(`You do not have a valid cookie.`)
          }
     });
};