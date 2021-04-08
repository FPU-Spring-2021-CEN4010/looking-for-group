import NavigationComponent from './NavigationComponent';
import CreationForm from '../CreationForm';
import axios from 'axios';
import {mutate} from 'swr';

class FilterGroup extends NavigationComponent {
     constructor(props) {
          super(props);

          // default properties
          this.state = {
               Comm: "",
               Game_Mode: "",
               Game_Name: "",
               Game_Rank: "",
               Num_Players: "",
               Platform: "",
               Player_Role: "",
               Region: "",

               specialClass: "filter"
          }
     }

     //Verify all data is of the correct type. If its not, fix it and return the updated data.
     validateGroup = () => {
          let formData = {...this.state};
          
          // remove unused properties
          delete formData.css;
          delete formData.open;
          delete formData.specialClass;

          // validate the group types and the urlFilter
          let urlFilter = "";
          let fieldKeys = Object.keys(formData);
          for (let i = 0; i < fieldKeys.length; i++) {
               let field = [fieldKeys[i]]
               if (formData[field] != "") {
                    urlFilter += `${(i>0) ? '&' : ''}${field}=${formData[field]}`;
               }
          }

          // return the group filters
          return urlFilter;
     }

     // filter group function
     filterGroup = () => {
          // ensure the data is valid
          let validFormData = this.validateGroup();
          this.props.filterFunc(`?${validFormData}`);
     }

     // update state
     updateState = (state) => {
          this.setState({...this.state, ...state});
     }

     // return the form to filter groups
     htmlContent() {
          return (
               <div>
                    <CreationForm initialValues={this.state} funcState={this.updateState} funcSubmit={this.filterGroup} title="" hideContact={true} fields={this.props.fields} />
               </div>
          )
     }
}

module.exports = FilterGroup