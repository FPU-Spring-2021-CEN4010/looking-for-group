import HowToUse from './navigation/HowToUse'
import CreateNewGroup from './navigation/CreateNewGroup'
import FilterGroup from './navigation/FilterGroups'

module.exports = ({filterFunc, fields}) => {
     return ( // display the navigational elements where users can learn how to use the system, create, and filter groups.
          <div className="color-text-white">
               <HowToUse title="How To Use"/>
               <CreateNewGroup title="Create New Group" filterFunc={filterFunc} fields={fields} />
               <FilterGroup title="Filter Groups" filterFunc={filterFunc} fields={fields} />
          </div>
     )
}