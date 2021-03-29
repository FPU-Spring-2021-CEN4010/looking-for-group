'use strict';

const { sign, verify } = require('jsonwebtoken');

require('dotenv').config();

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
     async decodeCookie(ctx, callback) {
          let cookie = ctx.cookies.get("Authorization", {signed: true});

          if (typeof cookie != 'undefined') {
               verify(cookie, process.env.JWT_SECRET || "bc080210-a1fa-4ff9-af9e-ea61c35e8360", (err, decoded) => {
                    callback(err, decoded);
               })
          } else {
               throw "NO_COOKIE";
          }
     },

     async saveDisplayName(data) {
          try {
              const validData = await strapi.entityValidator.validateEntityCreation(
                    strapi.models["active-users"],
                    data
               );

               const entry = await strapi.query('active-users').create(validData);

               return entry;
          } catch (err) {
               if (err.message.toLowerCase() == "duplicate entry") {
                    return "DUPLICATE_ENTRY";
               }
          }
     },

     async createJWT(ctx, entity) {
          const claim = {
               uid: entity.id,
               display_name: entity.Display_Name
          }

          //Create JWT
          const jwt = sign(claim, process.env.JWT_SECRET || "bc080210-a1fa-4ff9-af9e-ea61c35e8360", {expiresIn: '1d'});

          ctx.cookies.set("Authorization", jwt, {
               maxAge: 86400000,
               secure: false,
               httpOnly: true,
               domain: "localhost",
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
