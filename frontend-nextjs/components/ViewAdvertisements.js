import useSWR, { mutate } from "swr";
import Advertisement from "./Advertisement"

function ViewAdvertisements({data}) {

     const showAds = () => {
          if (typeof data == 'undefined' || data == {} || data == [] || !data || data == "") {
               return (
                    <h1>No Posts Found. Sorry...</h1>
               )
          } else {
               return (
                    data?.map((v) => {
                         return <Advertisement values={v} />
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