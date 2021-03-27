import HowToUse from './navigation/HowToUse'
import CreateNewGroup from './navigation/CreateNewGroup'
import FilterGroup from './navigation/FilterGroups'

module.exports = () => {
     return (
          <div>
               <HowToUse title="How To Use"/>
               <CreateNewGroup title="Create a New Group"/>
               <FilterGroup title="Filter Groups"/>
          </div>
     )
}