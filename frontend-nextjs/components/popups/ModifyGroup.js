function ModifyGroup() {


    return (<div>
        <div className="popup">

            <p>Modify Group #<span id="groupID">12345</span></p>

            <div id="modGroup">
                <div className="gameOptions">
                    <label for="game">Game:</label>
                    <select name="game" id="game">
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
                    <select name="gameMode" id="gameMode">
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
                    <select name="platform" id="platform">
                        <option value="PC">PC</option>
                        <option value="PS4">PS4</option>
                        <option value="PS5">PS5</option>
                        <option value="Xbox One">Xbox One</option>
                        <option value="Xbox One X">Xbox One X</option>
                    </select>
                </div>

                <div className="gameOptions">
                    <label for="ranks">Ranks:</label>
                    <input type="text" id="ranks" placeholder="Rank Perferred" />
                </div>

                
                <div className="gameOptions">
                    <label for="playerRoles">Roles:</label>
                    <input type="text" id="playerRoles" placeholder="Needed Roles" />
                </div>

                
                <div className="gameOptions">
                    <label for="region">Region:</label>
                    <select name="region" id="region">
                        <option value="AS">AS</option>
                        <option value="EU">EU</option>
                        <option value="NA">NA</option>
                        <option value="OC">OC</option>
                        <option value="SA">SA</option>
                    </select>
                </div>

                
                <div className="gameOptions">
                    <label for="playerNum">How many Players:</label>
                    <input type="text" id="playerNum" placeholder="Players Needed" />
                </div>
                
                <div className="gameOptions">
                    <label for="joinInstructions">Join Instructions</label>
                    <textarea id="joinInstructions" name="joinInstructions" rows="4" cols="50">
                        Join Instructions
                    </textarea>
                </div>

                <div className="gameOptions">
                    <button type="button">Submit</button>
                </div>
            </div>
        </div>
    </div>
    )
}

module.exports = ModifyGroup