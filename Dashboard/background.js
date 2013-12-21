window.addEventListener("load", init);

function init(){
	checkVersion();
	checkUnreadCount();
	setDefaultSettings();
	};

function checkVersion() {
	var oldVersion = localStorage.getItem("versionNumber");
	var version = chrome.app.getDetails().version;

	//check update or first install

	var extension = "blackmenu";
	var landingPage = "http://" + extension + ".carlosjeurissen.com/landing.html";
	if(oldVersion == undefined){
		window.open(landingPage + "?type=installed");
		setVersion();
		}
	else {
		if(oldVersion.split(".")[0] != version.split(".")[0] || oldVersion.split(".")[1].split(".")[0] != version.split(".")[1].split(".")[0]){
			window.open(landingPage + "?type=updated&version=" + version.split(".")[0] + "." + version.split(".")[1].split(".")[0]);
			setVersion();
			};
		};

	function setVersion(){
		localStorage.setItem("versionNumber", version);
		};
	};

function checkUnreadCount() {
	if(localStorage.getItem("prefGenericUnreadCountBadge") == "true"){
		setInterval(unreadCountUpdate, 5000);
		unreadCountUpdate();
		unreadCountVariables.availableTypes.forEach(function(type){
			if(localStorage.getItem("prefGenericUnreadCounts" + type.capitalize()) == "true") {
				unreadCountVariables.selectedTypes.push(type);
				}
			});
		unreadCountApply();
		}
	else {
		var typeDefaultVariables = unreadCountVariables.defaultType;
		var icon = typeDefaultVariables.icon;
		var title = typeDefaultVariables.name;
		var text = "";
		var color = unreadCountVariables.gplus.color;
		unreadCountSet(icon,title,text, color);
		};
	};

function isNumber(value) {
	return !isNaN(parseFloat(value)) && isFinite(value);
	};	
	
	
String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
	};

function unreadCountApply() {
	var selectedTypes = unreadCountVariables.selectedTypes;
	var selectedTypesNumber = selectedTypes.length;
	var typeNumber = unreadCountVariables.typeNumber;
	var type = selectedTypes[typeNumber];
	var typeVariables = unreadCountVariables[type];
	var typeDefaultVariables = unreadCountVariables.defaultType;
	var title = "Black Menu - " + typeVariables.name;
	var icon = typeVariables.icon;
	var count = typeVariables.count;
	var color = count != 0 ? typeVariables.color : typeDefaultVariables.color;
	unreadCountSet(icon,title,count,color);
	
	unreadCountVariables.typeNumber = (typeNumber == selectedTypesNumber - 1) ? 0 : (typeNumber + 1);
	setTimeout(unreadCountApply, 5000);
	};
	
function unreadCountSet(icon,title,count,color) {
	chrome.browserAction.setIcon({path: icon});
	chrome.browserAction.setTitle({title: title});
	chrome.browserAction.setBadgeText({text: count});
	chrome.browserAction.setBadgeBackgroundColor({color: color});
	};

function unreadCountUpdate() {
	unreadCountVariables.availableTypes.forEach(function(type){
		if(localStorage.getItem("prefGenericUnreadCounts" + type.capitalize()) == "true") {
			unreadCountGet(type);
			}
		else {
			unreadCountChange(type, "");
			};
		});
	};
	
function unreadCountReceive(type, count) {
	unreadCountChange(type, (isNumber(count) ? count : ""));
	};
	
function unreadCountChange(type, count) {
	unreadCountVariables[type].count = count;
	console.log(unreadCountVariables);
	};
	
function setDefaultSettings() {
	chrome.storage.sync.get("selectedMenuItems", function(storage){
		if(!storage.selectedMenuItems){
			var selectedServices = ["search", "gplus", "translate", "maps", "play", "youtube", "news", "gmail", "drive", "calendar"];
			chrome.storage.sync.set({"selectedMenuItems": selectedServices});
			};
		if(storage.selectedMenuItems.indexOf("reader") != -1){
			var selectedServices = storage.selectedMenuItems;
			var index = selectedServices.indexOf("reader");
			selectedServices.splice(index, 1);
			chrome.storage.sync.set({"selectedMenuItems": selectedServices});
			};
		});
	var prefMapsLocationOld = localStorage.getItem("prefMapsLocation");
	if(prefMapsLocationOld == "undefined" || prefMapsLocationOld == "" || prefMapsLocationOld == null){
		if(isChromeLocalization){
			var browserLangLocation = chrome.i18n.getMessage("browserLangLocation");
			localStorage.setItem("prefMapsLocation", (browserLangLocation != "") ? browserLangLocation : "Atlantic Ocean");
			}
		else{
			localStorage.setItem("prefMapsLocation", "Atlantic Ocean");
			};
		}
	else {
		if(prefMapsLocationOld.indexOf("&up_location=") != -1){
			localStorage.setItem("prefMapsLocation", prefMapsLocationOld.replace("&up_location=",""));
			};
		};

	if(!localStorage.getItem("prefGenericOpenGadget")){
		localStorage.setItem("prefGenericOpenGadget", "panel");
		};

	if(!localStorage.getItem("prefGenericUnreadCountsGplus")){
		localStorage.setItem("prefGenericUnreadCountsGplus", "true");
		}
	if(!localStorage.getItem("prefGenericUnreadCountsGmail")){
		localStorage.setItem("prefGenericUnreadCountsGmail", "true");
		}
	};