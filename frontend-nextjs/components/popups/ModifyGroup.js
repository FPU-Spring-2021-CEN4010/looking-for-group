import CreationForm from "../CreationForm"

function ModifyGroup() {

    var values = {
        Comm: "",
        ContactDesc: "",
        Game_Mode: "",
        Game_Name: "",
        Game_Rank: "",
        Num_Players: "",
        Platform: "",
        Player_Role: "",
        Region: "",
    };

    return ( 
        <div>
            <CreationForm initalValue={values} title="Modify Group" />
        </div>
    )
}

module.exports = ModifyGroup