import NavigationComponent from './NavigationComponent'
import CreationForm from "../CreationForm"

class CreateNewGroup extends NavigationComponent {

     constructor (props) {
          super(props);
          
          this.state = {    
               Comm: "",
               Contact_Desc: "",
               Game_Mode: "",
               Game_Name: "",
               Game_Rank: "",
               Num_Players: "",
               Platform: "",
               Player_Role: "",
               Region: ""     
       };
     }

     createGroup=() => {
          return;
     }

     updateState=(state) => {
          this.setState(state);
     }

     getState=() => {
          return this.state;
     }

     htmlContent=() => {

          console.log(this.state);

          return (
               <div>
                    <CreationForm funcState={this.updateState} initialValue={this.getState()} funcSubmit={this.createGroup} title="" />
               </div>
          )
     }
}

module.exports = CreateNewGroup