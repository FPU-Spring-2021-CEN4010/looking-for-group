import { useState } from 'react'
import CreationForm from "../CreationForm"

function ModifyGroup({initialValues, close}) {
     const [formData, updateFormData] = useState(initialValues);

     const updateGroup = () => {
          let updateData = {...formData};

          console.log(updateData);


          //Do something here
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