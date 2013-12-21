window.addEventListener("load", init);

function init() {
	if(location.href.indexOf("mui=blackMenu") != -1){
		loadRedesign();
		if(location.href.indexOf("json") != -1){
			loadRowRedesign();
			console.log("loadRowDesign");
			};
		searchBox();
		};
	};
	
function loadRowRedesign() {
	var jsonEncoded = location.href.split("json")[1].split("&")[0].split(";")[0];
	var jsonDecoded = decodeURIComponent(jsonEncoded);
	var json = jsonDecoded.split("=")[1];
	var classNames = JSON.parse(json);
	var container = classNames[0];
	var row = classNames[1];
	var unread = classNames[2];
	var read = classNames[3];
	var selected = classNames[4];
	var css = "." + container + "," + "." + row + "." + unread + " {\nbackground: transparent !important;\n}\n"
	+ "." + row + " {\nmargin-top: 0px !important;\nborder-bottom: 1px solid #E5E5E5 !important;\n}\n"
	+ "." + row + "." + read + " {\nbackground: rgba(0,0,0,.03) !important;\n}\n"
	+ "." + row + "." + selected + " {\nbackground: rgba(255, 255, 0, 0.15) !important;\n}\n";
	var s = document.createElement("style");
	s.innerText = css;
	document.head.appendChild(s);
	};

function loadRedesign() {
	var s = document.createElement('link');
	s.setAttribute("href", chrome.extension.getURL("pages/gmail/contentScripts/gmail.css"));
	s.setAttribute("rel", "stylesheet");
	s.setAttribute("type", "text/css");
	document.head.appendChild(s);
	};

function searchBox(){
	var input = document.querySelector("#tl_ form input");
	if(input){
		input.placeholder = chrome.i18n.getMessage("pmsg4");
		input.type = "";
		input.addEventListener("keyup", function(){
			if(this.value == ""){
				_e(event, 'Hd')
				};
			chrome.extension.sendMessage({inputValue: input.value}, function(response) {
				console.log(response.farewell);
				});
			});
		var button = document.createElement("button");
		button.setAttribute("id", "searchButton");
		input.parentNode.appendChild(button);
		}
	else {setTimeout(searchBox,20);};
	};