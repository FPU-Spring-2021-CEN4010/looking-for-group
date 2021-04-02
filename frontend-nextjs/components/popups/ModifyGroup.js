import { useState } from 'react'
import axios from 'axios'
import CreationForm from "../CreationForm"

function ModifyGroup({id, initialValues, close}) {
     const [formData, updateFormData] = useState(initialValues);

     const verifyValues = () => {
          let updateData = {...formData};

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

          return updateData;
     }

     const updateGroup = () => {
          // pass through verify values to make sure values are ints
          let updateData = {...verifyValues()};

          console.log(updateData);

          axios.put("/advertisements/"+id, updateData).then((res) => {
               if (res.status == 200) {
                    mutate("/advertisements");
                    close;
               }
               }).catch((err) => {
                    if (err.message == "405 Method Not Allowed") {
                         console.log(err);
                         close;
                    }
               })
          return
     }

     return ( 
          <div>
               <div className="popup modGroup">                    
                    <CreationForm initialValues={formData} funcState={updateFormData} funcSubmit={updateGroup} title="" hideCancel={false} funcClose={close} />
               </div>
          </div>
     )
}

module.exports = ModifyGroup