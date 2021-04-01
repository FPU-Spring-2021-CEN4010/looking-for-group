import DeleteGroup from './popups/DeleteGroup'
import ModifyGroup from './popups/ModifyGroup'
import { useState } from 'react'

function Advertisement({values}) {

     const initialFormData = Object.freeze({
          modify: false,
          delete: false
     })

     const [formData, updateFormData] = useState(initialFormData);

     function showModify() {
          updateFormData({
               ...formData,

               modify: true
          });
     }

     function showDelete() {
          updateFormData({
               ...formData,

               delete: true
          });
     }

     function displayModify(){
          if(formData.modify == true){
               return <ModifyGroup initialValues={values} />
          }
          return ;
     }
     function displayDelete(){
          if(formData.delete == true){
               return <DeleteGroup />
          }
          return ;
     }

          return (
               <div>
                    <div className="advertisement">
                         <div className="column1">
                              <button id="button-edit" className="edit-button" type="button" onClick={showModify}> &#9999;</button>
                              <button id="button-delete" className="delete-button" type="button" onClick={showDelete}> &times; </button>
                              <p>Game: {values.Game_Name.Title}</p>
                              <p>Platform: {values.Platform.Name}</p>
                              <p>Player Role: {values.Player_Role.Role}</p>
                              <p>Game Mode: {values.Game_Mode.Title}</p>
                              <p>Comms: {values.Comm.Type}</p>
                         </div>

                        <div className="column2">
                              <p>Game Rank: {values.Game_Rank}</p>
                              <p>Region: {values.Region.Name}</p>
                              <p>Looking for {values.Num_Players} more player(s).</p>
                              <p>Info: {values.Contact_Desc}</p>
                        </div>
                    </div>
                    {displayModify()}
                    {displayDelete()}
               </div>

          )


       
}

module.exports = Advertisement