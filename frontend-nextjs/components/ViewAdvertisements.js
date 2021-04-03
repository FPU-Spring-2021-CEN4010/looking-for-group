import useSWR, { mutate } from "swr";
import Advertisement from "./Advertisement"

function ViewAdvertisements({data, filterFunc, fields, user}) {

     const showAds = () => {
          if (typeof data == 'undefined' || data == {} || data == [] || !data || data == "") {
               return (
                    <h1>No Posts Found. Sorry...</h1>
               )
          } else {
               return (
                    data?.map((v) => {
                         return <Advertisement key={v.id} values={v} filterFunc={filterFunc} fields={fields} user={user} />
                    })
               )
          }
     }

     return (
          <div>
               <div className="advertisements">
                    {showAds()}
               </div>
          </div>
     ) 

}

module.exports = ViewAdvertisements