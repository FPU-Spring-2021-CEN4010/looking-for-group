import NavigationComponent from './NavigationComponent';
import CreationForm from "../CreationForm";
import axios from 'axios';
import {mutate} from 'swr';

class CreateNewGroup extends NavigationComponent {

     constructor(props) {
          super(props);

          // default properties 
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

     /**
      * @method validateGroup
      * @description validates all the data entered is of the correct type, and return the updated data
      * @returns 
      */
     validateGroup = () => {
          let formData = this.state;

          // remove unused properties
          delete formData.css;
          delete formData.open;

          // declare the numerical value selects
          let numberFields = ["Comm", "Game_Mode", "Game_Name", "Game_Rank", "Num_Players", "Platform", "Player_Role", "Region"]

          // loop through each value and validate that they are of the correct type
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

          // return data
          return formData;
     }

     /**
      * @method createGroup
      * @description creates a group

      */
     // create group function
     createGroup = () => {
          // make sure the data entered is valid 
          let validFormData = this.validateGroup();

          // send a request to create a new group
          axios.post("/advertisments", validFormData).then((res) => {
               if (res.status == 200) { // request successful
                    this.props.filterFunc("");
                    mutate("/advertisments");
               }
          })
     }

     // update the state
     updateState = (state) => {
          this.setState(state);
     }

     // return html
     htmlContent = () => {
          return (
               <div>
                    <CreationForm initialValues={this.state} funcState={this.updateState} funcSubmit={this.createGroup} title="" hideContact={false} fields={this.props.fields}/>
               </div>
          )
     }
}

module.exports = CreateNewGroup
