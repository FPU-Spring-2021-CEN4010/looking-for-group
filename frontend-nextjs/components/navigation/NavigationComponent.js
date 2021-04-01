import * as React from 'react'


class NavigationComponent extends React.Component {
     constructor(props) {
          super(props)
          this.state = {
               open: false,
               css: ""
          }
     }
     
     //Prototype function to be changed in the components for the specific content.
     htmlContent() {
          return (
               <div></div>
          )
     }

     //Toggle function
     toggleDropdown() {
          if (this.state.open == true) {
               this.setState({open: false, css: ""})
          } else {
               this.setState({open: true, css: "active"})
          }
     }

     //Arrow Icon to be displayed at the left to the option. 
     //Arrow will be facing down originally. If clicked, the arrow will be facing up. If clicked again, it will be facing down again.
     DropdownArrow() {
          if (this.state.open == true) {
               return (
                         <p className="right-aligned-dropdown-arrow"> &uarr; </p>
               )
          } else {
               return (
                         <p className="right-aligned-dropdown-arrow"> &darr; </p>
               )
          }
     }

     //Output HTML of the navigation.
     //This component takes in a prop of "title"
     render() {
          return (
               <div className={"navigation " + this.state.css + ((this.state.specialClass) ? " " + this.state.specialClass : "")}>
                    <div className="nav-header" onClick={(event) => {this.toggleDropdown()}}>
                         <h1 className="header-text">{this.props.title}</h1>
                         {this.DropdownArrow()}
                    </div>
                    <div className="dropdownbox">
                         {this.htmlContent()}
                    </div>
               </div>
          )
     }
}

module.exports = NavigationComponent