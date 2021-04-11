import DeleteGroup from './popups/DeleteGroup'
import ModifyGroup from './popups/ModifyGroup'
import {useState} from 'react'

/**
 * @method Advertisement
 * @description Advertisment functions
 * @param {*} param0 
 * @returns 
 */
function Advertisement({values, filterFunc, fields, user}) {

     const initialFormData = Object.freeze({modify: false, delete: false})

     const [formData, updateFormData] = useState(initialFormData);

     // create helper functions to show/hide the Modify/Delete buttons 
          
     /**
      * @method showModify
      * @description show the modify button
      * @param {*} param0 
      * @returns 
      */
     function showModify() {
          updateFormData({
               ...formData,

               modify: true
          });
     }

     /**
      * @method showDelete
      * @description show the delete button
      * @param {*} param0 
      * @returns 
      */
     function showDelete() {
          updateFormData({
               ...formData,

               delete: true
          });
     }


    /**
      * @method hideModify
      * @description hide the modify button
      * @param {*} param0 
      * @returns 
      */
     function hideModify() {
          updateFormData({
               ...formData,

               modify: false
          });
     }

     /**
      * @method hideDelete
      * @description hide the delete button
      * @param {*} param0 
      * @returns 
      */
     function hideDelete() {
          updateFormData({
               ...formData,

               delete: false
          });
     }


     /**
      * @method displayModify
      * @description display the modify popup with the values from the current advertisement
      * @param {*} param0 
      * @returns 
      */
     function displayModify() {
          if (formData.modify == true) { 
               return <ModifyGroup initialValues={values} id={values.id} close={hideModify} fields={fields} filterFunc={filterFunc}/>
          }
          return;
     }

      /**
      * @method displayModify
      * @description display the delete popup
      * @param {*} param0 
      * @returns 
      */
     function displayDelete() {
          if (formData.delete == true) {
               return <DeleteGroup close={hideDelete} id={values.id} filterFunc={filterFunc}/>
          }
          return;
     }
     
      /**
      * @method showButtons
      * @description show the edit/delete buttons 
      * @param {*} param0 
      * @returns 
      */
     function showButtons() {
          if (user?.uid == values.Active_User.id) {
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
                         values.Num_Players + " "
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
