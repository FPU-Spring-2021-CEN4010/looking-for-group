import NavigationComponent from './NavigationComponent';
import CreationForm from "../CreationForm";
import axios from 'axios';
import {mutate} from 'swr';

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

          let allFields = Object.keys(formData);
          for (let i = 0; i < allFields.length; i++) {
               let field = allFields[i];

               //Check for correct type
               if (numberFields.includes(field)) {
                    if (typeof formData[field] != "number") {
                         formData[field] = parseInt(formData[field]);
                    }
               }

               //Check not empty
               if (formData[field] == "") {
                    return false;
               }
          }

          return formData;
     }

     createGroup = () => {
          let validFormData = this.validateGroup();

          axios.post("/advertisments", validFormData).then((res) => {
               if (res.status == 200) {
                    this.props.filterFunc("");
                    mutate("/advertisments");
               }
          })
     }

     updateState = (state) => {
          this.setState(state);
     }

     htmlContent = () => {
          return (
               <div>
                    <CreationForm initialValues={this.state} funcState={this.updateState} funcSubmit={this.createGroup} title="" hideContact={false} fields={this.props.fields}/>
               </div>
          )
     }
}

module.exports = CreateNewGroup
