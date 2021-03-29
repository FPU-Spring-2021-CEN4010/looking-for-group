import Header from '../components/Header'
import ModifyGroup  from '../components/popups/ModifyGroup'
import Navigation from '../components/Navigation'
import ViewAdvertisements from "../components/ViewAdvertisements"

function HomePage() {

     
     return (
          <div>
               <div className="container">
                    <Header name="Yo mama" />
                    <Navigation />

                    <p id="advertisementText"><strong>Viewing All Groups</strong></p>
                    <ViewAdvertisements />
               </div>
          </div>
          
     )
}

export default HomePage
