import NavigationComponent from './NavigationComponent'

class HowToUse extends NavigationComponent {
     htmlContent() {
          return (
               //All the information provided will help new users to navigate the functions of the application.
               <div>
                    <h2>How to Create Groups</h2>
                    <p>To create a group, first click on the <b>Create a New Group</b> tab. Next, fill in all of the provided boxes <br></br>
                    with information pertaining to your group. Afterwords, click the <b>Submit</b> button. Your information will then display on the screen. <br></br>
                    If you do not see your information on the screen, refresh the web broswer. If it still does not show, please contact 1-800-ur-screwed.</p>
                    <h2>How to Filter Groups</h2>
                    <p>To filter groups, first click on the <b>Filter Groups</b> tab. Next, fill in all of the provided boxes <br></br>
                    with information about what groups you want to see. Afterwords, click the <b>Submit</b> button. Your filtered groups will then display on the screen.  <br></br>
                    If you do not see your information on the screen, refresh the web broswer. If it still does not show, please contact 1-800-ur-screwed.</p>
                    <h2>How to Modify your Group</h2>
                    <p>To modify your group, first find your group box displayed on the bottom with other advertisments. Next, click on the modify group icon. <br></br>
                    Next, a pop up with your group information will appear. Fill in the information that you want to modify. <br></br>
                    Afterwords, click the <b>Submit</b> button. Your modified group will then display on the screen.  <br></br>
                    If you do not see your information on the screen, refresh the web broswer. If it still does not show, please contact 1-800-ur-screwed.</p>
                    <h2>How to Delete your Group</h2>
                    <p>To delete your group, first find your group box displayed on the bottom with other advertisments. Next, click on the delete group icon. <br></br>
                    Next, a pop up will appear asking to confirm the deletion. Click on the delete icon. Your group will then dissappear from your screen. <br></br>
                    If you do not see your information on the screen, refresh the web broswer. If it still does not show, please contact 1-800-ur-screwed.</p>
               </div>
          )
     }
}

module.exports = HowToUse