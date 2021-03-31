const DeleteGroup = require("./popups/DeleteGroup");
const ModifyGroup = require("./popups/ModifyGroup");

function Advertisement({values}) {

          return (
               <div>
                    <div className="advertisement">
                         <div className="column1">
                              <button className="edit-button" type="button" onClick={ModifyGroup}> &#9999;</button>
                              <button className="delete-button" type="button" onClick={DeleteGroup}> &times; </button>
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
               </div>
          )
       
}

module.exports = Advertisement