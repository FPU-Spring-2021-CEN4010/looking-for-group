import useSWR, { mutate } from "swr";
import Advertisement from "./Advertisement"

function ViewAdvertisements({data, filterFunc, fields, user}) {

     // show advertisement function
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