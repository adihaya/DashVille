document.body.innerText = "";
document.body.id = "body";
document.title = "Google Plus";

appendScript(chrome.extension.getURL("pages/gplus/contentScripts/gplus_core.js"));
appendScript("https://apis.google.com/js/plusone.js");

function appendScript(url) {
	var script = document.createElement("script");
	script.setAttribute("src", url);
	script.setAttribute("type", "text/javascript");
	document.body.appendChild(script);
	};