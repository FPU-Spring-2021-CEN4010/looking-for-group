function HowToUse() {

    return (
         <div>
            <button name="HTU-button" onClick={(e) => {
            var temp = document.getElementsByTagName("template")[0];
            var clon = temp.content.cloneNode(true);
            document.body.appendChild(clon);
            }}>Show hidden content</button>

            <template>
            <h2>Flower</h2>
            <img src="img_white_flower.jpg" width="214" height="204"></img>
            </template>

         </div>
    )
}

module.exports = HowToUse