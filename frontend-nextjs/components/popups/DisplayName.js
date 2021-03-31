import axios from 'axios';
import { useState } from 'react'
import { mutate } from 'swr';

function DisplayName() {
     const initialFormData = Object.freeze({
          Display_Name: ""
     })
     const [formData, updateFormData] = useState(initialFormData);

     const handleChange = (e) => {
          const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value.trim();

          // console.log(e.target.name + " value changed to " + e.target.value);

          updateFormData({
               ...formData,

               [e.target.name]: value
          });
     }

     const handleSubmit = (e) => {
          e.preventDefault();

        //  console.log(formData.Display_Name)

          if (formData.Display_Name != "") {
               axios.post("/user/auth/login", {Display_Name: formData.Display_Name}).then((res) => {
                    mutate("/user/auth");
               })
          }
     }

    return (
          <div>
               <div className="popup">
                    <h3>Welcome to ABD's Looking for Group</h3>
                    <p>Please enter a Display Name Below: 
                         <br />
                         <span class="smallText">Your display name will be active for only 24 hours.</span>
                    </p>

                    <input type="text" id="Display_Name" name="Display_Name" placeholder="Enter a Display Name" onChange={handleChange} />
                    <button type="button" onClick={handleSubmit}>Submit</button>
               </div>
               <div className="popup-bg"></div>
          </div>
    )
}

module.exports = DisplayName