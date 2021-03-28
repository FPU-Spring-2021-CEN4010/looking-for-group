import { useState } from 'react'

function CreationForm({initalValue, title}) {

    /*
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

    return (<div>
            <p>{title}</p>

            <div id="modGroup">
                <div className="gameOptions">
                    <label for="game">Game:</label>
                    <select onChange={handleChange} name="game" id="game">
                        <option value="BF1">Battlefield 1</option>
                        <option value="CODCW">Call of Duty: Cold War</option>
                        <option value="CODMF">Call of Duty: Modern Warfare</option>
                        <option value="DS1">Dark Souls</option>
                        <option value="DS2">Dark Souls II</option>
                        <option value="DS3">Dark Souls III</option>
                        <option value="Destiny">Destiny</option>
                        <option value="Warzone">Warzone</option>
                        <option value="WoW">World of Warcraft</option>
                    </select>
                </div>

                <div className="gameOptions">
                    <label for="gameMode">Game Mode:</label>
                    <select onChange={handleChange} name="gameMode" id="gameMode">
                        <option value="Arenas">Arena</option>
                        <option value="Battle Royale">Battle Royale</option>
                        <option value="Multiplayer">Multiplayer</option>
                        <option value="Plunder">Plunder</option>
                        <option value="Premade">Premade</option>
                        <option value="PvE">PvE</option>
                        <option value="PvP">PvP</option>
                        <option value="Raid">Raid</option>
                        <option value="Zombies">Zombies</option>
                    </select>
                </div>

                <div className="gameOptions">
                    <label for="platform">Platform:</label>
                    <select onChange={handleChange} name="platform" id="platform">
                        <option value="PC">PC</option>
                        <option value="PS4">PS4</option>
                        <option value="PS5">PS5</option>
                        <option value="Xbox One">Xbox One</option>
                        <option value="Xbox One X">Xbox One X</option>
                    </select>
                </div>

                <div className="gameOptions">
                    <label for="ranks">Ranks:</label>
                    <input onChange={handleChange} type="text" name="playerRank" id="ranks" placeholder="Rank Perferred" />
                </div>

                
                <div className="gameOptions">
                    <label for="playerRoles">Roles:</label>
                    <input onChange={handleChange} type="text" name="playerRoles" id="playerRoles" placeholder="Needed Roles" />
                </div>

                
                <div className="gameOptions">
                    <label for="region">Region:</label>
                    <select onChange={handleChange} name="region" id="region">
                        <option value="AS">Asia</option>
                        <option value="EU">Europe</option>
                        <option value="NA">North America</option>
                        <option value="OC">Oceanic</option>
                        <option value="SA">South Asia</option>
                    </select>
                </div>

                
                <div className="gameOptions">
                    <label for="playerNum">How many Players:</label>
                    <input onChange={handleChange} type="text" name="playerNum" id="playerNum" placeholder="Players Needed" />
                </div>
                
                <div className="gameOptions">
                    <label for="joinInstructions">Join Instructions:</label>
                    <textarea onChange={handleChange} id="joinInstructions" name="joinInstructions" placeholder="Join Instructions" rows="4" cols="50">
                        
                    </textarea>
                </div>

                <div className="gameOptions">
                    <button type="button">Submit</button>
                </div>
            </div>
        </div>
    )
}

module.exports = CreationForm