import Image from 'next/image'

function Header({name}) {

     function Title({name}) {
          return (name) ? "Welcome to ABD's Looking for Group, " + name : "Welcome to ABD's Looking for Group"
     }

     //shows the team logo on top of the browser along with the Welcome message, with the Users display name being shown if the have a valid cookie
     return (
          <div>
               <Image
               src="/images/logo.png"
               alt="ABD logo"
               width={500}
               height={200}
               />
               <h1 className="center-header-text"><Title name={name} /> <br/>
               Start finding your groups below!
               </h1>
          </div>
     )
}

module.exports = Header