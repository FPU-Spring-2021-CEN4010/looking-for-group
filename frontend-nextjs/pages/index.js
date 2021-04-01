import Header from '../components/Header'
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
                         <ViewAdvertisements data={data} filterFunc={updateFilter} />
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
                         <ViewAdvertisements data={data} filterFunc={updateFilter} />
                    </div>

                    <DisplayName />
               </div>
               
          )
     }
}

export default HomePage
