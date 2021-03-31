import NavigationComponent from './NavigationComponent'
import CreationForm from '../CreationForm'

class FilterGroup extends NavigationComponent {

     htmlContent() {
          
     var values = {
          Comm: "",
          Contact_Desc: "",
          Game_Mode: "",
          Game_Name: "",
          Game_Rank: "",
          Num_Players: "",
          Platform: "",
          Player_Role: "",
          Region: "",
      };

      function filterGroup() {
          console.log("urgay");
      }

          return (
               <div>
                    <CreationForm initalValue={values} funcSubmit={filterGroup} title="" hideContact={true} />
               </div>
          )
     }
}

module.exports = FilterGroup