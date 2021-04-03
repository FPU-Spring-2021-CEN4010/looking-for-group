import {useState, useEffect} from 'react';

function PopulateSelect({info, db, name, formData, handleChange, hideCancel, hideContact}) {
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

     const modify = () => {
          if (hideCancel && hideContact) {
               return <option key="empty" value=""></option>
          }
          return;
     }

     //console.log(formData[db])

     return (
          <div className="gameOptions">
               <label htmlFor={db}>{name}:</label>
               <select onChange={handleChange} name={db} value={formData[db].id} id={db}>
                    {
                         modify()
                    }
                    {
                         info.map((v) => {
                              return <option key={v.id} value={v.id}>{v[selector]}</option>
                         })
                    }
               </select>
          </div>
     )
}


function CreationForm({
     title,
     initialValues,
     hideContact = false,
     hideCancel = true,
     funcState,
     funcSubmit,
     funcClose,
     fields
}) {
     const initialFormData = initialValues;

     if (hideContact && initialFormData.Contact_Desc) {
          delete initialFormData.Contact_Desc;
     }

     const [formData, updateFormData] = useState(initialFormData);

     const handleChange = (e) => {
          const value = e.target.type === 'textarea' ? e.target.value : e.target.value.trim();
          
          updateFormData({
               ...formData, 

               [e.target.name]: value
          });
     }

     useEffect(() => {
          funcState(formData);
     }, [formData]);

     return (
          <div>
               <p>{title}</p>

               <div id="creationForm">
                    
                    <PopulateSelect info={fields.Comms} db='Comm' name="Comm" formData={formData} handleChange={handleChange} hideCancel={hideCancel} hideContact={hideContact} />
                    <PopulateSelect info={fields.Games} db='Game_Name' name="Game Name" formData={formData} handleChange={handleChange} hideCancel={hideCancel} hideContact={hideContact} />
                    <PopulateSelect info={fields.Game_Modes} db='Game_Mode' name="Game Mode" formData={formData} handleChange={handleChange} hideCancel={hideCancel} hideContact={hideContact} />          
                    <PopulateSelect info={fields.Platforms} db='Platform' name="Platform" formData={formData} handleChange={handleChange} hideCancel={hideCancel} hideContact={hideContact} />
                  

                    <div className="gameOptions">
                         <label htmlFor="ranks">Ranks:</label>
                         <input onChange={handleChange}
                              type="number"
                              name="Game_Rank"
                              id="ranks"
                              placeholder="Rank Perferred"
                              value={formData.Game_Rank}/>
                    </div>

                    <PopulateSelect info={fields.Player_Roles} db='Player_Role' name="Player Role" formData={formData} handleChange={handleChange} hideCancel={hideCancel} hideContact={hideContact} />               
                    <PopulateSelect info={fields.Regions} db='Region' name="Region" formData={formData} handleChange={handleChange} hideCancel={hideCancel} hideContact={hideContact} />

                    <div className="gameOptions">
                         <label htmlFor="playerNum">How many Players:</label>
                         <input onChange={handleChange}
                              type="number"
                              name="Num_Players"
                              id="playerNum"
                              placeholder="Players Needed"
                              min="1"
                              max="10"
                              value={formData.Num_Players}/>
                    </div>

                    <div className="gameOptions">
                         <label htmlFor="joinInstructions"
                              hidden={hideContact}>Info:</label>
                         <textarea onChange={handleChange}
                              maxLength='255'
                              hidden={hideContact}
                              id="joinInstructions"
                              name="Contact_Desc"
                              placeholder="Join Instructions"
                              rows="4"
                              value={formData.Contact_Desc}/>
                    </div>

                    <div className="submitWrapper">
                         <button className="btnSubmit" onClick={funcSubmit} type="submit">Submit</button>
                         <button className="btnCancel" hidden={hideCancel} onClick={funcClose} type="submit">Cancel</button>
                    </div>

               </div>
          </div>
     )
}

module.exports = CreationForm
