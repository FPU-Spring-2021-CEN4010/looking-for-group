'use strict';

const {sanitizeEntity} = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = { 
     async create(ctx) {
          try {
               let data = ctx.request.body;

               const entity = await strapi.services.login.decodeCookie(ctx, async (err, decoded) => {
                    if (err) {
                         ctx.unauthorized("Invalid Cookie!");
                    }

                    if (!err && decoded) {
                         data = {
                              ...data,
                              Active_User: decoded.uid
                         }
                    }

                    const entity = await strapi.services.advertisments.create(data);

                    return entity;
               });

               return sanitizeEntity(entity, {model: strapi.models.advertisments})
          } catch (err) {
               if (err == "NO_COOKIE") {
                    return ctx.unauthorized("You do not have an active cookie set!");
               }
               return err
          }
     },

     async delete(ctx) {
          const {id} = ctx.params;

          const entity = await strapi.services.advertisments.delete({id});
          return sanitizeEntity(entity, {model: strapi.models.advertisments});
     },

     async fields(ctx) {
          const Comms = await strapi.services.comms.find();
          const Game_Modes = await strapi.services["game-modes"].find();
          const Games = await strapi.services.games.find();
          const Platforms = await strapi.services.platforms.find();
          const Player_Roles = await strapi.services["player-role"].find();
          const Regions = await strapi.services.regions.find();

          const Options = {
               Comms: await strapi.services.fields.serializeField(Comms),
               Game_Modes: await strapi.services.fields.serializeField(Game_Modes),
               Games: await strapi.services.fields.serializeField(Games),
               Platforms: await strapi.services.fields.serializeField(Platforms),
               Player_Roles: await strapi.services.fields.serializeField(Player_Roles),
               Regions: await strapi.services.fields.serializeField(Regions)
          }

          return Options;
     },
};

