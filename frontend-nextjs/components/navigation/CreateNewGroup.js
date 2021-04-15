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
               Region: "1",
               validation: false,
               errMessage: ""
          }
     }

     /**
      * @method validate
      * @description checks for all entries filled. 
      * @returns 
      */
     validate = async () => {
          return new Promise((resolve, reject) => {
               let formData = {...this.state}

               delete formData.validation;
               delete formData.errMessage;
               delete formData.open;
               delete formData.css;

               let formKeys = Object.keys(formData);
               formKeys.forEach((v, i) => {
                    let data = formData[v];
                    if (data == "" || data == null || data?.length <= 0) {
                         console.log(data);
                         reject("EMPTY_VAL");
                    }

                    if (i == formKeys.length-1) resolve();
               });
          })
     }

     /**
      * @method validateGroup
      * @description validates all the data entered is of the correct type, and return the updated data
      * @returns 
      */
     validateGroup = async () => {
          let formData = {...this.state};

          // remove unused properties
          delete formData.css;
          delete formData.open;
          delete formData.errMessage;
          delete formData.validation;

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
     createGroup = async () => {
          //Validate the form values.
          try {
               await this.validate();
               this.setState({
                    ...this.state,

                    validation: true,
                    errMessage: ""
               })
          } catch(err) {
               if (err == "EMPTY_VAL") {
                    this.setState({
                         ...this.state,

                         validation: false,
                         errMessage: "Not all form values are entered. Please make sure all fields are filled."
                    })
               }
               console.log(err);
          }

          //Check if validation passed.
          if (this.state.validation == true && this.state.errMessage == "") {
               // make sure the data entered is valid 
               let validFormData = await this.validateGroup();

               console.log(validFormData)

               // send a request to create a new group
               axios.post("/advertisments", validFormData).then((res) => {
                    if (res.status == 200) { // request successful
                         this.props.filterFunc("");
                         mutate("/advertisments");
                    }
               })
          }
     }

     // update the state
     updateState = (state) => {
          this.setState(state);
     }

     /**
      * @method closeInvalid
      * @description Closes and updates state for the invalid window.
      */
     closeInvalid = () => {
          this.setState({
               ...this.state,

               validation: false,
               errMessage: ""
          })
     }

     // return html
     htmlContent = () => {
          if(this.state.errMessage != "" && this.state.errMessage.length >= 0) { 
               return (
                    <div>
                         <div className="popup">
                              <h3>Error Modifying!</h3>
           
                              <p>{this.state.errMessage}</p>
           
                              <button id="invalidOwnerPopup" type="button" onClick={this.closeInvalid}>Close</button>
                         </div>
                    </div>
               )
          } else {
               return (
                    <div>
                         <CreationForm initialValues={this.state} funcState={this.updateState} funcSubmit={this.createGroup} title="" hideContact={false} fields={this.props.fields}/>
                    </div>
               )
          }
     }
}

module.exports = CreateNewGroup
