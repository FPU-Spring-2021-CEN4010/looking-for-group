import { useState } from 'react'
import axios from 'axios'
import CreationForm from "../CreationForm"
import {mutate} from 'swr'

function ModifyGroup({id, initialValues, close, fields, filterFunc}) {
     const [formData, updateFormData] = useState(initialValues);

     const verifyValues = () => {
          let updateData = {...formData};

          delete updateData.Active_User;

          let numberFields = ["Comm", "Game_Mode", "Game_Name", "Game_Rank", "Num_Players", "Platform", "Player_Role", "Region"]

          let allFields = Object.keys(updateData);
          for (let i = 0; i < allFields.length; i++) {
               let field = allFields[i];

               //Check for correct type
               if (numberFields.includes(field)) {
                    if (typeof updateData[field] == "object") {
                         updateData[field] = updateData[field].id
                    }

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

     const updateGroup = (e) => {
          e.preventDefault();

          // pass through verify values to make sure values are ints
          let updateData = verifyValues();

          axios.put("/advertisments/"+id, updateData).then((res) => {
               if (res.status == 200) {
                    filterFunc("");
                    mutate("/advertisments");
                    close();
               }
          }).catch((err) => {
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