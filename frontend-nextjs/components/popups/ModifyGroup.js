import CreationForm from "../CreationForm"

function ModifyGroup({initialValues}) {
     const [formData, updateFormData] = useState(initialValues);

     const updateGroup = (state) => {
          //Do something here
          return
     }

     return ( 
          <div>
               <CreationForm initialValues={formData} funcState={updateFormData} funcSubmit={updateGroup} title="" hideContact={false} />
          </div>
     )
}

module.exports = ModifyGroup