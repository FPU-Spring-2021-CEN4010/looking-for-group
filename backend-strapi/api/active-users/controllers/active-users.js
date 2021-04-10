'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
     /**
      * @method Authentication
      * @description Get the user's cookie and check that they are an active user.
      * @param {*} ctx 
      * @returns 401 Error on Invalid || 200 on Valid
      */
     async authenticate(ctx) {
          try {
               //Decode the User's cookie. 
               await strapi.services.login.decodeCookie(ctx, (err, decoded) => {
                    //If cookie can't be decoded
                    if (err) {
                         return ctx.unauthorized(`There was an error verifying the cookie.`);
                    }

                    //Cookie was able to be decoded and should be sent to client. 
                    if (!err && decoded) {
                         return ctx.send({...decoded, iat: undefined, exp: undefined});
                    }
               })
          } catch (err) {
               /**
                * @Catch NO_COOKIE
                */
               if (err == "NO_COOKIE") {
                    return ctx.unauthorized(`No cookie present.`);
               }

               //If it is not a NO_COOKIE error, print the error to console for review. 
               //This should not interrupt any service for the client - only seen by server admin.
               console.log(err);
          }
     },

     /**
      * @method Login
      * @description Receive the display name, save it int he database, and create a JWT. 
      * @param {*} ctx 
      * @returns 401 on Duplicate || 500 on Failure || Run createJWT on Valid
      */
     async login(ctx) {
          //Add the user to the database.
          let entity = await strapi.services.login.saveDisplayName(ctx.request.body);

          //If our service fails
          if (!entity || typeof entity == 'undefined') {
               return ctx.send({
                    statusCode: 500,
                    error: "Login Failed",
                    message: "Login was unsuccessful, please try again..."
               });
          }

          //Did our service give us a duplicate error?
          if (entity == "DUPLICATE_ENTRY") {
               return ctx.unauthorized("The display name entered has already been added to the database. Please try a unique one...");
          }

          //Send JWT to Client
          return await strapi.services.login.createJWT(ctx, entity);
     }
};
