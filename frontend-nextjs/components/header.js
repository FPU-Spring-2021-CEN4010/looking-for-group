import Image from 'next/image'

function Header({name}) {

     //shows the team logo on top of the browser along with the Welcome message, with the Users display name being shown if the have a valid cookie
     return (
          <div>
               <Image
               src="/images/logo.png"
               alt="ABD logo"
               width={500}
               height={200}
               />
               <h1 className="center">Welcome to ABD's Looking for Group, { name } <br/>
               Start finding your groups below!
               </h1>
          </div>
     )
}

module.exports = Header