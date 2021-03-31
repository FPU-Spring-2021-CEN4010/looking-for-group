import NavigationComponent from './NavigationComponent'
import CreationForm from "../CreationForm"

class CreateNewGroup extends NavigationComponent {

     htmlContent() {
          
     var values = {
          Comm: "",
          ContactDesc: "",
          Game_Mode: "",
          Game_Name: "",
          Game_Rank: "",
          Num_Players: "",
          Platform: "",
          Player_Role: "",
          Region: "",
      };

      function createGroup() {
          // create new group
          

      }

          return (
               <div>
                    <CreationForm initalValue={values} funcSubmit={createGroup} title="" />
               </div>
          )
     }
}

module.exports = CreateNewGroup