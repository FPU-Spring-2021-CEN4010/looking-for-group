import NavigationComponent from './NavigationComponent'
import CreationForm from "../CreationForm"

class CreateNewGroup extends NavigationComponent {

     constructor (props) {
          super(props);
          
          this.state = {    
               Comm: "0",
               Contact_Desc: "",
               Game_Mode: "0",
               Game_Name: "0",
               Game_Rank: "",
               Num_Players: "",
               Platform: "0",
               Player_Role: "0",
               Region: "0"     
       };
     }

     createGroup=() => {
          console.log(this.state);
     }

     updateState=(state) => {
          this.setState(state);
     }

     htmlContent=() => {
          return (
               <div>
                    <CreationForm funcState={this.updateState} funcSubmit={this.createGroup} title="" />
               </div>
          )
     }
}

module.exports = CreateNewGroup