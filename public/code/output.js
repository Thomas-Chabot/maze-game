var mazeOut = {
	//clear: function(){

	//},
	mazeLog: function(text){
    document.getElementById("maze").innerHTML = text.replace(/\n/g, "<br>").replace(/ /g, "&nbsp").replace(/■/g, "&#9632;");
	},
	log: function(text){
		//console.clear();
    console.log (text);
    mazeOut.mazeLog (text)
	}
}
