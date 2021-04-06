import DeleteGroup from './popups/DeleteGroup'
import ModifyGroup from './popups/ModifyGroup'
import {useState} from 'react'

function Advertisement({values, filterFunc, fields, user}) {

     const initialFormData = Object.freeze({modify: false, delete: false})

     const [formData, updateFormData] = useState(initialFormData);

     // create helper functions to show/hide the Modify/Delete buttons 

     // show the modify popup
     function showModify() {
          updateFormData({
               ...formData,

               modify: true
          });
     }

     // show the delete popup
     function showDelete() {
          updateFormData({
               ...formData,

               delete: true
          });
     }


     // hide the modify popup
     function hideModify() {
          updateFormData({
               ...formData,

               modify: false
          });
     }

     // hide the delete popup
     function hideDelete() {
          updateFormData({
               ...formData,

               delete: false
          });
     }


     // display the modify popup, with the advertisements' current values
     function displayModify() {
          if (formData.modify == true) { // show the modify popup with the values from the current advertisement
               return <ModifyGroup initialValues={values} id={values.id} close={hideModify} fields={fields} filterFunc={filterFunc}/>
          }
          return;
     }

     // display the delete popup
     function displayDelete() {
          if (formData.delete == true) { // show the delete popup
               return <DeleteGroup close={hideDelete} id={values.id} filterFunc={filterFunc}/>
          }
          return;
     }
     
     // display the buttons
     function showButtons() {
          if (user?.uid == values.Active_User.id) { // show the edit/delete buttons 
               return (
                    <div className="alter-buttons">
                         <button className="edit-button" type="button" onClick={showModify}>&#9999;</button>
                         <button className="delete-button" type="button" onClick={showDelete}>&times;</button>
                    </div>
               )
          } else {
               return;
          }
     }

     // the actual advertisement along with each the gameOptions listed
     return (
               <div className="advertisement">
                    {showButtons()}

                    <p>Game: {
                         values.Game_Name.Title
                    }</p>
                    <p>Platform: {
                         values.Platform.Name
                    }</p>
                    <p>Player Role: {
                         values.Player_Role.Role
                    }</p>
                    <p>Game Mode: {
                         values.Game_Mode.Title
                    }</p>
                    <p>Comms: {
                         values.Comm.Type
                    }</p>

                    <p>Game Rank: {
                         values.Game_Rank
                    }</p>
                    <p>Region: {
                         values.Region.Name
                    }</p>
                    <p>Looking for {
                         values.Num_Players
                    }
                         more player(s).</p>
                    <p className="info">Info: {
                         values.Contact_Desc
                    }</p>

                    {displayModify()}
                    {displayDelete()}
               </div>

     )


}

module.exports = Advertisement
