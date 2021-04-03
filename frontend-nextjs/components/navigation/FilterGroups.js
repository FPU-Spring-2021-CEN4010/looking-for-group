import NavigationComponent from './NavigationComponent';
import CreationForm from '../CreationForm';
import axios from 'axios';
import {mutate} from 'swr';

class FilterGroup extends NavigationComponent {
     constructor(props) {
          super(props);

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
          
          delete formData.css;
          delete formData.open;
          delete formData.specialClass;

          let urlFilter = "";
          let fieldKeys = Object.keys(formData);
          for (let i = 0; i < fieldKeys.length; i++) {
               let field = [fieldKeys[i]]
               if (formData[field] != "") {
                    urlFilter += `${(i>0) ? '&' : ''}${field}=${formData[field]}`;
               }
          }

          return urlFilter;
     }

     filterGroup = () => {
          let validFormData = this.validateGroup();
          this.props.filterFunc(`?${validFormData}`);
     }

     updateState = (state) => {
          this.setState({...this.state, ...state});
     }

     htmlContent() {
          return (
               <div>
                    <CreationForm initialValues={this.state} funcState={this.updateState} funcSubmit={this.filterGroup} title="" hideContact={true} fields={this.props.fields} />
               </div>
          )
     }
}

module.exports = FilterGroup