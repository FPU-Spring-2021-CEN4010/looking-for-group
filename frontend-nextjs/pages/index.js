import Header from '../components/Header'
import ModifyGroup  from '../components/popups/ModifyGroup'
import Navigation from '../components/Navigation'
import ViewAdvertisements from "../components/ViewAdvertisements"
import DisplayName from "../components/popups/DisplayName"


function HomePage({user}) {

     let css = "";
     if (!user) {
          css = "blur";
     }

     if (user) {
          return (
               <div>
                    <div className={"container " + css}>
                         <Header name={(user) ? user.Display_Name : user} />
                         <Navigation />

                         <p id="advertisementText"><strong>Viewing All Groups</strong></p>
                         <ViewAdvertisements />
                    </div>
               </div>
               
          )
     } else {
          return (
               <div>
                    <div className={"container " + css}>
                         <Header name={(user) ? user.Display_Name : user} />
                         <Navigation />

                         <p id="advertisementText"><strong>Viewing All Groups</strong></p>
                         <ViewAdvertisements />
                    </div>

                    <DisplayName />
               </div>
               
          )
     }
}

export default HomePage
