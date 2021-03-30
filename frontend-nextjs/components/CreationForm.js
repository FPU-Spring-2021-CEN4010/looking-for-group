import {useState} from 'react'
import useSWR, { mutate } from 'swr';

function CreationForm({
     initalValue,
     title,
     hideContact = false
}) { /*
        {
            Comm: "",
            ContactDesc: "",
            Game_Mode: "",
            Game_Name: "",
            Game_Rank: "",
            Num_Players: "",
            Platform: "",
            Player_Role: "",
            Region: "",
        }   
    */

     const initialFormData = Object.freeze(initalValue)
     const [formData, updateFormData] = useState(initialFormData);

     const handleChange = (e) => {
          const value = e.target.type ? e.target.input : e.target.select;

          // console.log(e.target.name + " value changed to " + e.target.value);

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

     function PopulateSelect({info, name}) {
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
                    <label for={name}>{name}</label>
                    <select onChange={handleChange} name={name} id={name}>
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
                    <PopulateSelect info={data.Games} name="Game" />

                    <PopulateSelect info={data.Game_Modes} name="Game Mode" />
          
                    <PopulateSelect info={data.Platforms} name="Platform" />
                  

                    <div className="gameOptions">
                         <label for="ranks">Ranks:</label>
                         <input onChange={handleChange}
                              type="text"
                              name="playerRank"
                              id="ranks"
                              placeholder="Rank Perferred"/>
                    </div>

                    <PopulateSelect info={data.Player_Roles} name="Player Role" />
               
                    <PopulateSelect info={data.Regions} name="Region" />

                    <div className="gameOptions">
                         <label for="playerNum">How many Players:</label>
                         <input onChange={handleChange}
                              type="text"
                              name="playerNum"
                              id="playerNum"
                              placeholder="Players Needed"/>
                    </div>

                    <div className="gameOptions">
                         <label for="joinInstructions"
                              hidden={hideContact}>Join Instructions:</label>
                         <textarea onChange={handleChange}
                              maxlength='255'
                              hidden={hideContact}
                              id="joinInstructions"
                              name="joinInstructions"
                              placeholder="Join Instructions"
                              rows="4"
                              cols="50"/>
                    </div>
               </div>
          </div>
     )
}

module.exports = CreationForm
