'use strict';

const {sanitizeEntity} = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = { 
     /**
      * @method create
      * @description Overwriting the built in strapi create for our new method. The new method will decode the user's cookie and then apply the data to our insertion of an advertisements.
      * @param {*} ctx 
      * @returns 401 if invalid cookie || 200 with the advertisment created if valid. || 401 if NO_COOKIE
      */
     async create(ctx) {
          try {
               //Get the request from the context body. 
               let data = ctx.request.body;

               //Decode the cookie with a callback. 
               const entity = await strapi.services.login.decodeCookie(ctx, async (err, decoded) => {
                    //Send a 401 if the cookie is not decodable. 
                    if (err) {
                         return ctx.unauthorized("Invalid Cookie!");
                    }

                    //Write in the user ID if the cookie is decodable. 
                    if (!err && decoded) {
                         data = {
                              ...data,
                              Active_User: decoded.uid
                         }
                    }

                    //Create the advertisment in the database utilizing strapi built in functions.
                    const entity = await strapi.services.advertisments.create(data);
                    
                    //Resolve entity as the outer entity variable. 
                    return entity;
               });

               //Sanitize and return to the client the created advertisement. 
               return sanitizeEntity(entity, {model: strapi.models.advertisments})
          } catch (err) {
               /**
                * @catch NO_COOKIE
                */
               if (err == "NO_COOKIE") {
                    return ctx.unauthorized("You do not have an active cookie set!");
               }

               //If there is an error, return it to the caller function. It should be caught there. 
               return err
          }
     },

     /**
      * @method update
      * @description Overwriting the built in strapi update for our new method. The new method will remove the Active_User from the params and then update the entry in the database.
      * @param {*} ctx 
      * @returns 200 with the updated database entry.
      */
     async update(ctx) {
          //Get the id of the advertisement from the context parameters.
          const { id } = ctx.params;

          //Remove the Active_User attriubute from the data, if there is one.
          if (typeof ctx.request.body.Active_User != 'undefined') delete ctx.request.body.Active_User;
          
          //Update the database.
          let entity = await strapi.services.advertisments.update({ id }, ctx.request.body);
          
          //Sanitize and return the entry in the database.
          return sanitizeEntity(entity, { model: strapi.models.advertisments });
     },
     
     /**
      * @method delete
      * @description Overwriting the built in strapi delete for our new method. The new method doesn't change anything, but allowed us to see what is going on. 
      * @param {*} ctx 
      * @returns 200 with the deleted entry.
      */
     async delete(ctx) {
          //Get the id of the advertisement from the context parameters.
          const {id} = ctx.params;

          //Delete the advertisment from the DB.
          const entity = await strapi.services.advertisments.delete({id});

          //Sanitize and return the deleted entry in the DB.
          return sanitizeEntity(entity, {model: strapi.models.advertisments});
     },

     /**
      * @method fields
      * @description Implements a single enpoint to request all values from all fields. 
      * @param {*} ctx 
      * @returns 200 with a JSON object of all of the fields. 
      */
     async fields(ctx) {
          //Get all current fields
          const Comms = await strapi.services.comms.find();
          const Game_Modes = await strapi.services["game-modes"].find();
          const Games = await strapi.services.games.find();
          const Platforms = await strapi.services.platforms.find();
          const Player_Roles = await strapi.services["player-role"].find();
          const Regions = await strapi.services.regions.find();

          //Set the fields to a single object and serialize each.
          const Options = {
               Comms: await strapi.services.fields.serializeField(Comms),
               Game_Modes: await strapi.services.fields.serializeField(Game_Modes),
               Games: await strapi.services.fields.serializeField(Games),
               Platforms: await strapi.services.fields.serializeField(Platforms),
               Player_Roles: await strapi.services.fields.serializeField(Player_Roles),
               Regions: await strapi.services.fields.serializeField(Regions)
          }

          //Send the object back to the client. 
          return Options;
     },
};

