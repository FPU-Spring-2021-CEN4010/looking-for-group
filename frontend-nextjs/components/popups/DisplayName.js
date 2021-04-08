import axios from 'axios';
import { useState } from 'react'
import { mutate } from 'swr';

function DisplayName() {
     const initialFormData = Object.freeze({
          Display_Name: "",
          errorMessage: false
     })
     const [formData, updateFormData] = useState(initialFormData);

     // function to handle any changes made to the display name
     const handleChange = (e) => {
          const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value.trim();

          updateFormData({
               ...formData,

               [e.target.name]: value
          });
     }

     const handleSubmit = (e) => {
          e.preventDefault();

          // send a request to set the user's display name
          if (formData.Display_Name != "") { // make sure their name isn't empty
               try {
                    axios.post("/user/auth/login", {Display_Name: formData.Display_Name}).then((res) => {
                         mutate("/user/auth"); // request was successful, let them in
                    })
               } catch (err) {
                    if (err.message == "Request failed with status code 401") {
                         updateFormData({
                              ...formData,

                              errorMessage: true
                         })
                         return;
                    }
                    console.log(err);
               }
          }
     }

     const showError = () => {
          if (formData.errorMessage) {
               return <p className="error-text">The display name is invalid. Please try again...</p>
          }
          return;
     }

     // return html
    return (
          <div>
               <div className="popup">
                    <h3>Welcome to ABD's Looking for Group</h3>
                    <p>Please enter a Display Name Below: 
                         <br />
                         <span className="smallText">Your display name will be active for only 24 hours.</span>
                    </p>

                    {showError()}

                    <input type="text" id="Display_Name" name="Display_Name" placeholder="Enter a Display Name" onChange={handleChange} />
                    <button type="button" onClick={handleSubmit}>Submit</button>
               </div>
               <div className="popup-bg"></div>
          </div>
    )
}

module.exports = DisplayName