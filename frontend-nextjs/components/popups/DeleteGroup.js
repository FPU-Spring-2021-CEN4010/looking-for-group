function DeleteGroup() {


     return (
          <div>
               <div className="popup">
                    <h3>Delete Group: #<span id="groupID">2131</span>
                    </h3>

                    <p>Are you sure you want to delete this group?</p>

                    <button id="confirmDelete" type="submit">Confirm</button>
                    &emsp;&emsp;
                    <button id="cancelDelete" type="button">Cancel</button>
               </div>
          </div>
     )
}

module.exports = DeleteGroup
