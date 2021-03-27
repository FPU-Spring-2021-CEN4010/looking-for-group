function DisplayName() {


    return (<div>
        <div className="popup">
            <p>Welcome to ABD's Looking for Group</p>
            <p>Please enter a Display Name Below: 
                <br />
                <span class="smallText">Your display name will be active for only 24 hours.</span>
            </p>

            <input type="text" id="displayName" placeholder="Display Name" />
            &emsp;
            <button type="button">Submit</button>
        </div>
    </div>
    )
}

module.exports = DisplayName