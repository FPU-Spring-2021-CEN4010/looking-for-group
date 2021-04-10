'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
     /**
      * @method serializeField
      * @description Take in the field set of data and remove created_by, updated_by, created_at, updated_at, and Advertisments from the entry. 
      * @param {*} data 
      * @returns Serialized object without the fields listed above.
      */
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