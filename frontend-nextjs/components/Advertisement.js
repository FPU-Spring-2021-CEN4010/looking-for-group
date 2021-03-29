
function Advertisement() {

     var values = {
          Comm: "Third-Party Voice",
          ContactDesc: "Join my discord at shrektyermum#6969",
          Game_Mode: "Arenas",
          Game_Name: "World of Warcraft",
          Game_Rank: "2.2k+ Rating Min",
          Num_Players: 2,
          Platform: "PC",
          Player_Role: "Healer",
          Region: "EU",
      };

          return (
               <div>
                    <div className="advertisement">
                         <div className="column1">
                              <p>Game: {values.Game_Name}</p>
                              <p>Platform: {values.Platform}</p>
                              <p>Player Role: {values.Player_Role}</p>
                              <p>Game Mode: {values.Game_Mode}</p>
                         </div>

                        <div className="column2">
                              <p>Game Rank: {values.Game_Rank}</p>
                              <p>Region: {values.Region}</p>
                              <p>Looking for {values.Num_Players} more players.</p>
                              <p>Info: {values.ContactDesc}</p>
                        </div>
                    </div>
               </div>
          )
       
}

module.exports = Advertisement