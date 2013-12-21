if(location.search.indexOf("q=") != -1){
	var keyboardEvent = document.createEvent("KeyboardEvent");
	var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";

	keyboardEvent[initMethod]("keyup");
	
	checkInput();
	
	function checkInput(){
		if(document.querySelector("input.Sf") != null){
			document.querySelector("input.Sf").value = location.search.split("q=")[1].split("&")[0];
			document.querySelector("input.Sf").dispatchEvent(keyboardEvent);
			}
		else setTimeout(checkInput, 20);
		};
	};