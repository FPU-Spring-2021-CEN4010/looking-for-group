import Image from 'next/image'

function Header({name}) {


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