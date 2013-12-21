check();

function check() {
    if (typeof iframes == "undefined") return setTimeout(check, 100);
	setUpGadget();
	};
	
function setUpGadget() {
	if(location.href.indexOf("page=") != -1){
		var page = location.href.split("page=")[1].split("&")[0];
		if(page == "sharebox"){
			setUp("Sharebox")
			return;
			};
		};
	setUp("Notifications");
	};
	
function setUp(type){
	var url = location.href.indexOf("url=") != -1 ? location.href.split("url=")[1].split("&")[0] : undefined;
    iframes.setHandler("iframe-style", {
		onOpen: function(c){ c.openInto("body") },
		onReady: function(){frame["onShow" + type + "Only"]()}
		});
    frame = iframes.open(
		"https://plus.google.com/wm/blackMenu" + type + "/_/notifications/frame?blackMenu=inner&page=" + type + "&url=" + url,
		{style: "iframe-style" },
		{origin: "https://www.google.com/" },
		{setNotificationWidgetHeight: "", setNotificationText:"" }
		);
	};