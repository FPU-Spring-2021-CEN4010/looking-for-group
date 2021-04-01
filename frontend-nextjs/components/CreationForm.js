import {useState} from 'react'
import useSWR, { mutate } from 'swr';

function CreationForm({
     title,
     hideContact = false,
     funcState,
     funcSubmit
}) {
     const initialFormData = {    
          Comm: "1",
          Contact_Desc: "",
          Game_Mode: "1",
          Game_Name: "1",
          Game_Rank: "",
          Num_Players: "",
          Platform: "1",
          Player_Role: "1",
          Region: "1"      
     }

     if (hideContact) {
          delete initialFormData.Contact_Desc;
     }

     const [formData, updateFormData] = useState(initialFormData);

     const handleChange = (e) => {
          const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value.trim();
          
          funcState({
               ...formData, 

               [e.target.name]: value
          });

          updateFormData({
               ...formData, 

               [e.target.name]: value
          });
     }

     let {data} = useSWR("/fields", {
          initialData: {
               Comms: [
                    {
                         "id": 1,
                         "Type": "In Game Voice"
                    }, {
                         "id": 2,
                         "Type": "Text"
                    }, {
                         "id": 3,
                         "Type": "Third Party Voice"
                    }, {
                         "id": 4,
                         "Type": "Disabled"
                    }
               ],
               Game_Modes: [
                    {
                         "id": 1,
                         "Title": "Raid"
                    },
                    {
                         "id": 2,
                         "Title": "Battle Royale"
                    },
                    {
                         "id": 3,
                         "Title": "Plunder"
                    },
                    {
                         "id": 4,
                         "Title": "PvP"
                    }, {
                         "id": 5,
                         "Title": "PvE"
                    }, {
                         "id": 6,
                         "Title": "Multiplayer"
                    }, {
                         "id": 7,
                         "Title": "Zombies"
                    }
               ],
               Games: [
                    {
                         "id": 1,
                         "Title": "Dark Souls"
                    },
                    {
                         "id": 2,
                         "Title": "Destiny"
                    },
                    {
                         "id": 3,
                         "Title": "Dark Souls 2"
                    },
                    {
                         "id": 4,
                         "Title": "Warzone"
                    }, {
                         "id": 5,
                         "Title": "Darks Souls 3"
                    }, {
                         "id": 6,
                         "Title": "Call of Duty: Modern Warfare"
                    }, {
                         "id": 7,
                         "Title": "Call of Duty: Black Ops Cold War"
                    }, {
                         "id": 8,
                         "Title": "Battlefield 1"
                    }
               ],
               Platforms: [
                    {
                         "id": 1,
                         "Name": "PC"
                    },
                    {
                         "id": 2,
                         "Name": "Xbox One"
                    },
                    {
                         "id": 3,
                         "Name": "PS4"
                    },
                    {
                         "id": 4,
                         "Name": "Xbox One X"
                    }, {
                         "id": 5,
                         "Name": "PS5"
                    }
               ],
               Player_Roles: [
                    {
                         "id": 1,
                         "Role": "Top"
                    },
                    {
                         "id": 2,
                         "Role": "Support"
                    },
                    {
                         "id": 3,
                         "Role": "Healer/Medic"
                    },
                    {
                         "id": 4,
                         "Role": "Tank"
                    }, {
                         "id": 5,
                         "Role": "Middle"
                    }, {
                         "id": 6,
                         "Role": "Bottom"
                    }, {
                         "id": 7,
                         "Role": "Jungler"
                    }
               ],
               Regions: [
                    {
                         "id": 1,
                         "Name": "NA"
                    },
                    {
                         "id": 2,
                         "Name": "EU"
                    },
                    {
                         "id": 3,
                         "Name": "SA"
                    },
                    {
                         "id": 4,
                         "Name": "OC"
                    }, {
                         "id": 5,
                         "Name": "AS"
                    }
               ]
          }
     });

     mutate("/fields");

     function PopulateSelect({info, db, name}) {
          let selector = "Name";
          let testKeys = Object.keys(info[0]);

          testKeys.forEach((v) => {
               if (v == "Type") {
                    selector = "Type";
               } else if (v == "Role") {
                    selector = "Role";
               } else if (v == "Title") {
                    selector = "Title";
               }
          });

          return (
               <div className="gameOptions">
                    <label for={name}>{name}:</label>
                    <select onChange={handleChange} name={db} value={formData[db]}  id={db}>
                         {
                              info.map((v) => {
                                   return <option key={v.id} value={v.id}>{v[selector]}</option>
                              })
                         }
                    </select>
               </div>
          )
     }

     return (
          <div>
               <p>{title}</p>

               <div id="creationForm">
                    
                    <PopulateSelect info={data.Comms} db='Comm' name="Comm" />

                    <PopulateSelect info={data.Games} db='Game_Name' name="Game Name" />

                    <PopulateSelect info={data.Game_Modes} db='Game_Mode' name="Game Mode" />
          
                    <PopulateSelect info={data.Platforms} db='Platform' name="Platform" />
                  

                    <div className="gameOptions">
                         <label for="ranks">Ranks:</label>
                         <input onChange={handleChange}
                              type="number"
                              name="Game_Rank"
                              id="ranks"
                              placeholder="Rank Perferred"/>
                    </div>

                    <PopulateSelect info={data.Player_Roles} db='Player_Role' name="Player Role" />
               
                    <PopulateSelect info={data.Regions} db='Region' name="Region" />

                    <div className="gameOptions">
                         <label for="playerNum">How many Players:</label>
                         <input onChange={handleChange}
                              type="number"
                              name="Num_Players"
                              id="playerNum"
                              placeholder="Players Needed"
                              min="1"
                              max="10"/>
                    </div>

                    <div className="gameOptions">
                         <label for="joinInstructions"
                              hidden={hideContact}>Info:</label>
                         <textarea onChange={handleChange}
                              maxlength='255'
                              hidden={hideContact}
                              id="joinInstructions"
                              name="Contact_Desc"
                              placeholder="Join Instructions"
                              rows="4"
                              cols="50"/>
                    </div>

                    <div className="submitWrapper">
                         <button className="btnSubmit" onClick={funcSubmit} type="submit">Submit</button>
                    </div>
               </div>
          </div>
     )
}

module.exports = CreationForm
