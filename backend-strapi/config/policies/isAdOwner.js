const { sanitizeEntity } = require('strapi-utils');
const { verify } = require('jsonwebtoken');

require('dotenv').config();

/**
 * @method isAdOwner (filename)
 * @description checks an advertisement to see if the requester is the owner/submitter/publisher.
 * @param {*} ctx 
 * @param {*} next 
 * @returns 401 if invalid cookie || 401 if undecodable cookie || 400 if no advertisement found || 401 if not owner || await next() if user is owner || await next() if user is authed through backend priveleges.
 */
module.exports = async (ctx, next) => {
     return new Promise(async (resolve, reject) => {

          //User is logged in through backend authentication.
          if (ctx.state.user) {
               return resolve(await next());
          }

          //Get cookie from context.
          let cookie = ctx.cookies.get("Authorization", {signed: true})

          //Check if cookie is invalid. 
          if (typeof cookie != 'undefined') {
               verify(cookie, process.env.JWT_SECRET || "bc080210-a1fa-4ff9-af9e-ea61c35e8360", async (err, decoded) => {

                    //Return 401 for non-decodable cookie. 
                    if (err) {
                         resolve(ctx.unauthorized(`There was an error verifying the authentication token.`));
                    }
                    
                    if (!err && decoded) {
                         //Get user ID and advertisement ID
                         let uid = decoded.uid
                         let { id } = ctx.params

                         //Find the advertisment data in the DB.
                         const entity = await strapi.services.advertisments.findOne({ id })

                         //Validate that we were able to find an advertisement with that id. 
                         if (!entity || typeof entity == 'undefined') {
                              return ctx.send({
                                   statusCode: 400,
                                   error: "Invalid Advertisment",
                                   message: "This is not a valid advertisement!"
                              })
                         }

                         //Sanitize the advertisement entry from the database. 
                         sanitizedEntity = sanitizeEntity(entity, { model: strapi.models.advertisments })

                         //// console.log(sanitizedEntity.Active_User.id)
                         //// console.log(uid)

                         //Check to verify that the entry is valid and has an Active_User attribute. 
                         if (!sanitizedEntity || !sanitizedEntity.Active_User) {
                              resolve(ctx.unauthorized("You do not appear to be the owner of this post!"))
                         }

                         //Check if the user is the poster/Active_User
                         if (sanitizedEntity.Active_User.id == uid) {
                              resolve(await next());
                         } else {
                              resolve(ctx.unauthorized(`You are not the owner of this post.`));
                         }
                    }
               })
          } else {
               //Return 401 
               resolve(ctx.unauthorized(`You do not have a valid cookie.`));
          }
     });
};