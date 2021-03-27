import NavigationComponent from './NavigationComponent'

class HowToUse extends NavigationComponent {
     htmlContent() {
          return (
               <div>
                    <h1>I love pancakes!!!</h1>
                    <p>This is why I like pancakes:</p>
                    <ul>
                         <li>They are breakfast</li>
                         <li>They taste good</li>
                         <li>Yummy in my Tummy</li>
                    </ul>
               </div>
          )
     }
}

module.exports = HowToUse