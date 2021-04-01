import NavigationComponent from './NavigationComponent'
import CreationForm from '../CreationForm'

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
               Region: ""
          }
     }

     //Verify all data is of the correct type. If its not, fix it and return the updated data.
     validateGroup = () => {
          return this.state;
     }

     filterGroup = () => {
          let validFormData = this.validateGroup();

     }

     updateState = (state) => {
          this.setState(state);
     }

     htmlContent() {
          return (
               <div>
                    <CreationForm initialValues={this.state} funcSubmit={this.filterGroup} title="" hideContact={true} />
               </div>
          )
     }
}

module.exports = FilterGroup