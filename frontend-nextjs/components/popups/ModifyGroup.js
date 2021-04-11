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


     /**
      * @method validateGroup
      * @description validates all the data entered is of the correct type, and return the updated data
      * @returns 
      */
     const verifyValues = () => {

          // pull the updated information from the current advertisement
          let updateData = {...formData};

          // remove active user since it is not used
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

     /**
      * @method updateGroup
      * @description Updates the group
      * @param {*} e 
      */
     const updateGroup = (e) => {
          e.preventDefault();

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

     return ( 
          <div>
               <div className="popup modGroup">                    
                    <CreationForm initialValues={formData} funcState={updateFormData} funcSubmit={updateGroup} title="" hideCancel={false} funcClose={close} fields={fields} />
               </div>
          </div>
     )
}

module.exports = ModifyGroup