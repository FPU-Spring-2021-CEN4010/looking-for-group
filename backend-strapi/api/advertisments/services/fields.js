'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
     async serializeField(data) {

          let keys = Object.keys(data);

          keys.forEach((v, i) => {
               delete data[v].created_by;
               delete data[v].updated_by;
               delete data[v].created_at;
               delete data[v].updated_at;
               delete data[v].Advertisments;
          })

          return data;
     }
}