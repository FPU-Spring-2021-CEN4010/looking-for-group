import axios from 'axios';
import { mutate } from 'swr';
import { useState } from 'react'

function DeleteGroup({id, close, filterFunc}) {


     const [invalid, updateInvalid] = useState(false);

     function showInvalid() {
          updateInvalid(true);
     }

     const handleDelete = (e) => {
          e.preventDefault();
          
          axios.delete("/advertisments/"+id).then((res) => {
               if (res.status == 200) {
                    filterFunc("");
                    mutate("/advertisments");
                    close();
               }
          }).catch((err) => {
               if (err.message == "Request failed with status code 401") {
                    console.log("running error message");
                    /*close();*/
                    showInvalid();
               }
          });
     }


     if(invalid){
          return (
               <div>
                    <div className="popup">
                         <h3>Invalid Owner!</h3>
      
                         <p>You are not the owner of this group!</p>
      
                         <button id="invalidOwnerPopup" type="button" onClick={close}>Close</button>
                    </div>
               </div>
          )
     }
     else{
     return (
          <div>
               <div className="popup">
                    <h3>Delete Group: #<span id="groupID">2131</span></h3>

                    <p>Are you sure you want to delete this group?</p>

                    <button id="confirmDelete" type="submit" onClick={handleDelete}>Confirm</button>
                    &emsp;
                    <button id="cancelDelete" type="button" onClick={close}>Cancel</button>
               </div>
          </div>
          )
     }
}

module.exports = DeleteGroup
