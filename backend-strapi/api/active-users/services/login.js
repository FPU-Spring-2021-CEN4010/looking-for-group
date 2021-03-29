'use strict';

const { sign } = require('jsonwebtoken');

require('dotenv').config();

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
     async saveDisplayName(data) {
          try {
              const validData = await strapi.entityValidator.validateEntityCreation(
                    strapi.models["active-users"],
                    data
               );

               const entry = await strapi.query('active-users').create(validData);

               return entry 
          } catch (err) {
               if (err.message.toLowerCase() == "duplicate entry") {
                    return "DUPLICATE_ENTRY"
               }
          }
     },

     async createJWT(ctx, entity) {

          console.log(entity.Display_Name);
          const claim = {
               uid: entity.id,
               display_name: entity.Display_Name
          }

          //Create JWT
          const jwt = sign(claim, process.env.JWT_SECRET || "bc080210-a1fa-4ff9-af9e-ea61c35e8360", {expiresIn: '1d'})

          ctx.cookies.set("authenticated", jwt, {
               maxAge: 86400000,
               secure: false,
               httpOnly: true,
               path: '/',
               sameSite: 'strict',
               signed: true
          })

          //Send JWT to Client
          return {
               uid: entity.id,
               display_name: entity.Display_Name,
               jwt: jwt
          }
     }
};
