import { useState } from 'react'
import axios from 'axios'
import CreationForm from "../CreationForm"
import {mutate} from 'swr'

/**
 * @method ModifyGroup
 * @description Displays the Modify Group popup
 * @param {*} param0 
 * @returns 
 */
function ModifyGroup({id, initialValues, close, fields, filterFunc}) {
     const [formData, updateFormData] = useState(initialValues);

<<<<<<< Updated upstream

     /**
      * @method validateGroup
      * @description validates all the data entered is of the correct type, and return the updated data
      * @returns 
      */
     const verifyValues = () => {
=======
     const [validation, updateValidation] = useState({
          state: false,
          errMessage: ""
     })

     const validate = async () => {
          return new Promise((resolve, reject) => {
               let formKeys = Object.keys(formData);
               formKeys.forEach((v, i) => {
                    let data = formData[v];
                    if (data == "" || data == null || data.length <= 0) {
                         console.log(data);
                         reject("EMPTY_VAL");
                    }

                    if (i == formKeys.length-1) resolve();
               });
          })
     }
>>>>>>> Stashed changes

     const verifyValues = () => {
          // pull the updated information from the current advertisement
          let updateData = {...formData};

          // remove active user since it isn't used
          delete updateData.Active_User;

          // declare the numeric value fields 
          let numberFields = ["Comm", "Game_Mode", "Game_Name", "Game_Rank", "Num_Players", "Platform", "Player_Role", "Region"]

          // loop through each content of the data and insert it into the updateData
          let allFields = Object.keys(updateData);
          for (let i = 0; i < allFields.length; i++) {
               let field = allFields[i];

               //Check for correct type
               if (numberFields.includes(field)) {
                    if (typeof updateData[field] == "object") {
                         updateData[field] = updateData[field].id
                    }

                    // check for correct type
                    if (typeof updateData[field] != "number") {
                         updateData[field] = parseInt(updateData[field]);
                    }
               }

               //Check not empty
               if (updateData[field] == "") {
                    return false;
               }
          }

          return updateData;
     }

<<<<<<< Updated upstream
     /**
      * @method updateGroup
      * @description Updates the group
      * @param {*} e 
      */
     const updateGroup = (e) => {
=======
     const updateGroup = async (e) => {
>>>>>>> Stashed changes
          e.preventDefault();

          //Validate the form values.
          try {
               await validate();
               updateValidation({
                    state: true,
                    errMessage: ""
               });
          } catch(err) {
               if (err == "EMPTY_VAL") {
                    updateValidation({
                         state: false,
                         errMessage: "Not all form values are entered. Please make sure all fields are filled."
                    });
               }
               console.log(err);
          }

          //Check if validation passed.
          if (validation.state == true && validation.errMessage == "") {
               // pass through verify values to make sure values are ints
               let updateData = verifyValues();

               // attempt a request to update the advertisement
               axios.put("/advertisments/"+id, updateData).then((res) => {
                    if (res.status == 200) { // successful request 
                         filterFunc("");
                         mutate("/advertisments");
                         close();
                    }
               }).catch((err) => { // lmao we got an error
                    if (err.message == "405 Method Not Allowed") {
                         close();
                    }
               });
          }
     }

     //Close the invalid popup. 
     const closeInvalid = () => {
          updateValidation({
               state: false,
               errMessage: ""
          })
     }

     if(validation.errMessage != "") { // html for the invalid popup where we instruct the user that they are NOT the owner of this group so they cannot delete it
          return (
               <div>
                    <div className="popup">
                         <h3>Error Modifying!</h3>
      
                         <p>{validation.errMessage}</p>
      
                         <button id="invalidOwnerPopup" type="button" onClick={closeInvalid}>Close</button>
                    </div>
               </div>
          )
     } else {
          return ( 
               <div>
                    <div className="popup modGroup">                    
                         <CreationForm initialValues={formData} funcState={updateFormData} funcSubmit={updateGroup} title="" hideCancel={false} funcClose={close} fields={fields} />
                    </div>
               </div>
          )
     }
}

module.exports = ModifyGroup