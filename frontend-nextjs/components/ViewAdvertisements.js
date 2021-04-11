import useSWR, { mutate } from "swr";
import Advertisement from "./Advertisement"

/**
 * @method ViewAdvertisements
 * @description Views advertisements on the sises
 * @param {*} param0 
 * @returns 
 */
function ViewAdvertisements({data, filterFunc, fields, user}) {

     /**
      * @method showAds
      * @description retrieves advertisements from the server (checks for filters) and displays 
      * @returns 
      */
     const showAds = () => {
          if (typeof data == 'undefined' || data == {} || data == [] || !data || data == "") {
               return (
                    // no advertisements found :(
                    <h1>No Posts Found. Sorry...</h1>
               )
          } else {
               return ( // advertisements found
                    data?.map((v) => {
                         return <Advertisement key={v.id} values={v} filterFunc={filterFunc} fields={fields} user={user} />
                    })
               )
          }
     }

     return ( // show the advertisements
          <div>
               <div className="advertisements">
                    {showAds()}
               </div>
          </div>
     ) 

}

module.exports = ViewAdvertisements