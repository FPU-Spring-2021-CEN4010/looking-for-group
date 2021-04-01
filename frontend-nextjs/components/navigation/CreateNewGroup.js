import NavigationComponent from './NavigationComponent'
import CreationForm from "../CreationForm"
import axios from 'axios'
import {mutate} from 'swr'

class CreateNewGroup extends NavigationComponent {

     constructor(props) {
          super(props);

          this.state = {
               Comm: "1",
               Contact_Desc: "",
               Game_Mode: "1",
               Game_Name: "1",
               Game_Rank: "",
               Num_Players: "",
               Platform: "1",
               Player_Role: "1",
               Region: "1"
          }
     }

     //Verify all data is of the correct type. If its not, fix it and return the updated data.
     validateGroup = () => {
          let formData = this.state;

          delete formData.css;
          delete formData.open;
          
          let numberFields = ["Comm", "Game_Mode", "Game_Name", "Game_Rank", "Num_Players", "Platform", "Player_Role", "Region"]

          for (let i = 0; i < numberFields.length; i++) {
               let numberField = numberFields[i];
               if (typeof formData[numberField] == "number") {
                    continue;
               } else {
                    formData[numberField] = parseInt(formData[numberField]);
               }
          }

          return formData;
     }

     createGroup = () => {
          let validFormData = this.validateGroup();

          axios.post("/advertisments", validFormData).then((res) => {
               if (res.status == 200) {
                    mutate('/advertisments', async ads => {
                         return [...ads, res.data];
                    });
               }
          })
     }

     updateState = (state) => {
          this.setState(state);
     }

     htmlContent = () => {
          return (
               <div>
                    <CreationForm funcState={this.updateState} funcSubmit={this.createGroup} title=""/>
               </div>
          )
     }
}

module.exports = CreateNewGroup
