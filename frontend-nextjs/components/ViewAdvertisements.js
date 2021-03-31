import useSWR, { mutate } from "swr";
import Advertisement from "./Advertisement"

function ViewAdvertisements() {

     const {data} = useSWR("/advertisments", {
          initialData: []
     });

     mutate("/advertisments");

     return (
          <div>
               <div className="advertisements">
                    {data.map((v) => {
                         return <Advertisement values={v} />
                    }) }
               </div>
          </div>
     ) 

}

module.exports = ViewAdvertisements