function ModifyGroup() {


    return (<div>
        <div className="popup">
            { /* ADDED <br /> tags just for easy reading it will restyled later - Hassan */ }

            <p>Modify Group #<span id="groupID">12345</span></p>

            <div id="gameOptions">
                <label for="game">Game:</label>
                <select name="game" id="game">
                    <option value="Battlefield 1">Battlefield 1</option>
                    <option value="Battlefield 1">Call of Duty: Cold War</option>
                    <option value="Battlefield 1">Call of Duty: Modern Warfare</option>
                    <option value="Dark Souls">Dark Souls</option>
                    <option value="Dark Souls II">Dark Souls II</option>
                    <option value="Dark Souls III">Dark Souls III</option>
                    <option value="Destiny">Destiny</option>
                    <option value="Warzone">Warzone</option>
                </select>


                <br />
                <label for="gameMode">Game Mode:</label>
                <select name="gameMode" id="gameMode">
                    <option value="Battle Royale">Battle Royale</option>
                    <option value="Battle Royale">Multiplayer</option>
                    <option value="Battle Royale">Plunder</option>
                    <option value="Battle Royale">PvE</option>
                    <option value="Battle Royale">PvP</option>
                    <option value="Battle Royale">Raid</option>
                    <option value="Battle Royale">Zombies</option>
                </select>


                <br />
                <label for="platform">Game:</label>
                <select name="platform" id="platform">
                    <option value="PC">PC</option>
                    <option value="PS4">PS4</option>
                    <option value="PS5">PS5</option>
                    <option value="Xbox One">Xbox One</option>
                    <option value="Xbox One X">Xbox One X</option>
                </select>


                <br />
                <label for="ranks">Ranks:</label>
                <select name="ranks" id="ranks">
                    <option value="Destiny II">Destiny II</option>
                    <option value="Warzone">Warzone</option>
                    <option value="Battlefield 1">Battlefield 1</option>
                </select>


                <br />
                <label for="playerType">Game:</label>
                <select name="playerType" id="playerType">
                    <option value="Dark Souls">Dark Souls</option>
                    <option value="Destiny II">Destiny II</option>
                    <option value="Warzone">Warzone</option>
                    <option value="Battlefield 1">Battlefield 1</option>
                </select>

                <br />
                <label for="region">Game:</label>
                <select name="region" id="region">
                    <option value="AS">AS</option>
                    <option value="EU">EU</option>
                    <option value="NA">NA</option>
                    <option value="OC">OC</option>
                    <option value="SA">SA</option>
                </select>

                <br />
                <label for="playerNum">How many Players:</label>
                <input type="text" id="playerNum" placeholder="Players Needed" />
                

                <br />
                <label for="joinInstructions">Join Instructions</label>
                <textarea id="joinInstructions" name="joinInstructions" rows="4" cols="50">
                    Join Instructions
                </textarea>

                <br />
                <button type="button">Submit</button>
            </div>
        </div>
    </div>
    )
}

module.exports = ModifyGroup