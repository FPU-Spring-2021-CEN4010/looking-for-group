import Header from '../components/header'
import DeleteGroup from '../components/popups/DeleteGroup'
import DisplayName from '../components/popups/DisplayName'
import ModifyGroup from '../components/popups/ModifyGroup'

function HomePage() {     
     return ( <div>
          <Header name="Hello World" /> 
          {/*
          <DeleteGroup />
          <DisplayName />
     */}
          
          <ModifyGroup />
          </div>
     )
}

export default HomePage
