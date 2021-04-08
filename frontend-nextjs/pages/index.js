import Header from '../components/Header'
import Navigation from '../components/Navigation'
import ViewAdvertisements from "../components/ViewAdvertisements"
import DisplayName from "../components/popups/DisplayName"
import {useState} from 'react'
import useSWR, { mutate } from 'swr'
import axios from 'axios'


function HomePage({user, fields}) {
     
     // set the css to none
     let css = ""; 
     if (!user) { // check if the user has an active cookie,
          css = "blur"; // add the blur css property
     }

     // declare the filter states
     const [filter, updateFilter] = useState("");

     // declare the data for the advertisements
     const {data} = useSWR('/advertisments' + filter);
     mutate('/advertisments' + filter);

     if (user) { // user has an active cookie, show the content for the website
          return (
               <div>
                    <div className={"container " + css}>
                         <Header name={(user) ? user.Display_Name : user} /> 
                         <Navigation filterFunc={updateFilter} fields={fields} />

                         <p id="advertisementText"><strong>Viewing All Groups</strong></p>
                         <ViewAdvertisements data={data} filterFunc={updateFilter} fields={fields} user={user} />
                    </div>
               </div>
               
          )
     } else { // user doesn't have an active cookie, prompt them to enter a display name.
          return (
               <div>
                    <div className={"container " + css}>
                         <Header name={(user) ? user.Display_Name : user} />
                         <Navigation filterFunc={updateFilter} fields={fields} />

                         <p id="advertisementText"><strong>Viewing All Groups</strong></p>
                         <ViewAdvertisements data={data} filterFunc={updateFilter} fields={fields} user={user} />
                    </div>

                    <DisplayName />
               </div>
               
          )
     }
}

export default HomePage

export async function getServerSideProps(ctx) {

     let {data} = await axios.get("/fields");

     return {
          props: {
               fields: data
          }
     }
}