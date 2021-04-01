import Header from '../components/Header'
import ModifyGroup  from '../components/popups/ModifyGroup'
import Navigation from '../components/Navigation'
import ViewAdvertisements from "../components/ViewAdvertisements"
import DisplayName from "../components/popups/DisplayName"
import {useState} from 'react'
import useSWR, { mutate } from 'swr'


function HomePage({user}) {

     let css = "";
     if (!user) {
          css = "blur";
     }

     const [filter, updateFilter] = useState("");

     const {data} = useSWR('/advertisments' + filter);
     mutate('/advertisments' + filter);

     if (user) {
          return (
               <div>
                    <div className={"container " + css}>
                         <Header name={(user) ? user.Display_Name : user} />
                         <Navigation filterFunc={updateFilter} />

                         <p id="advertisementText"><strong>Viewing All Groups</strong></p>
                         <ViewAdvertisements data={data} />
                    </div>
               </div>
               
          )
     } else {
          return (
               <div>
                    <div className={"container " + css}>
                         <Header name={(user) ? user.Display_Name : user} />
                         <Navigation filterFunc={updateFilter} />

                         <p id="advertisementText"><strong>Viewing All Groups</strong></p>
                         <ViewAdvertisements data={data} />
                    </div>

                    <DisplayName />
               </div>
               
          )
     }
}

export default HomePage
