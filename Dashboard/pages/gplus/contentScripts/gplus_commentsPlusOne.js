loadStyle();
createButtons();

function loadStyle() {
	var link = document.createElement("link");
	link.setAttribute("rel", "stylesheet");
	link.setAttribute("type", "text/css");
	link.setAttribute("href", chrome.extension.getURL("/pages/gplus/contentScripts/gplus_commentsPlusOne.css"));
	document.head.appendChild(link);
	};

function createButtons() {
	var oldPlusOneButton = document.getElementById("button");
	
	var shareButton = document.createElement("button");
	shareButton.innerText = "share";
	shareButton.id = "blackMenuShareButton";
	shareButton.classList.add("blackMenuButton");
	shareButton.addEventListener("click", sharePage);
	appendAfter(oldPlusOneButton, shareButton);
	
	var newPlusOneButton = document.createElement("button");
	newPlusOneButton.innerText = "+1";
	newPlusOneButton.id = "blackMenuPlusOneButton";
	newPlusOneButton.classList.add("blackMenuButton");
	newPlusOneButton.addEventListener("click", function(){
		plusOnePage();
		});
	appendAfter(oldPlusOneButton, newPlusOneButton);
	plusOneDefaultState();
	};

function plusOneDefaultState() {
	if(document.getElementById("button").getAttribute("aria-pressed") == undefined){
		setTimeout(plusOneDefaultState, 500);
		}
	else {
		if(document.getElementById("button").getAttribute("aria-pressed") == "true"){
			document.getElementById("blackMenuPlusOneButton").classList.add("on");
			};
		};
	}
function plusOnePage() {
	var plusOneState = document.getElementById("button").getAttribute("aria-pressed") == "true";
	document.getElementById("blackMenuPlusOneButton").classList[plusOneState ? "remove" : "add"]("on");
	document.getElementById("button").click();
	};

function sharePage() {
	var encodedUrl = location.href.split("url=")[1].split("&")[0];
    parent.postMessage({"blackMenuShareAction": encodedUrl}, "*");
	};
	
function appendAfter(parentGuest, childGuest){
	if (parentGuest.nextSibling) {
	  parentGuest.parentNode.insertBefore(childGuest, parentGuest.nextSibling);
		}
	else {
	  parentGuest.parentNode.appendChild(childGuest);
		};
	};