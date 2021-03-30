import HowToUse from './navigation/HowToUse'
import CreateNewGroup from './navigation/CreateNewGroup'
import FilterGroup from './navigation/FilterGroups'

module.exports = () => {
     return (
          <div className="color-text-white">
               <HowToUse title="How To Use"/>
               <CreateNewGroup title="Create New Group"/>
               <div id="filterBorder"><FilterGroup title="Filter Groups"/></div>
          </div>
     )
}