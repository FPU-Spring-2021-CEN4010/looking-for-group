'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
     async authenticate(ctx) {
          return "Authenticated"
     },

     async login(ctx) {
          //Add the user to the database.
          let entity = await strapi.services.login.saveDisplayName(ctx.request.body)

          //If our service fails
          if (!entity || typeof entity == 'undefined') {
               return ctx.send({
                    statusCode: 500,
                    error: "Login Failed",
                    message: "Login was unsuccessful, please try again..."
               })
          }

          //Did our service give us a duplicate error?
          if (entity == "DUPLICATE_ENTRY") {
               return ctx.send({
                    statusCode: 400,
                    error: "Duplicate Entry",
                    message: "The display name entered has already been added to the database. Please try a unique one..."
               })
          }

          //Send JWT to Client
          return await strapi.services.login.createJWT(ctx, entity)
     }
};
