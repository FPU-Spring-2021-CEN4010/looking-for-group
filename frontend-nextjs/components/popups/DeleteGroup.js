import axios from 'axios';
import { mutate } from 'swr';
import { useState } from 'react'

/**
 * @method DeleteGroup
 * @description The Delete Group Popup
 * @param {*} param0 
 * @returns 
 */
function DeleteGroup({id, close, filterFunc}) {

     const [invalid, updateInvalid] = useState(false);

     /**
      * @method showInvalid
      * @description the invalid popup
      */
     function showInvalid() {
          updateInvalid(true);
     }

     /**
      * @method handleDelete
      * @description handle the deletion of an advertisement
      * @param {*} e 
      */
     const handleDelete = (e) => {
          e.preventDefault();
          
          // sent an axios request to delete the advertisement
          axios.delete("/advertisments/"+id).then((res) => {
               if (res.status == 200) { // request successful purge it
                    filterFunc(""); 
                    mutate("/advertisments");
                    close();
               }
          }).catch((err) => { // you got error
               if (err.message == "Request failed with status code 401") {
                    showInvalid(); // permission error
               }
          });
     }
     
     if(invalid){ // html for the invalid popup where we instruct the user that they are NOT the owner of this group so they cannot delete it
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
     return ( // html for the delete group popup
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
