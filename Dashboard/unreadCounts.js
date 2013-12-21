var unreadCountVariables = {
	availableTypes: ["gplus", "gmail"],
	selectedTypes: [],
	typeNumber: 0,
	defaultType: {
		name: "Black Menu",
		color: [100, 100, 100, 255],
		icon: "images/icon_19.png",
		count: ""
		},
	gmail: {
		url: "https://mail.google.com/mail/feed/atom",
		name: i18n("msg7"),
		color: [174,  98, 128, 255],
		icon: "images/icon_19_gmail.png",
		count: ""
		},
	gplus: {
		url: "https://plus.google.com/app/basic/home?sview=2",
		name: i18n("msg1"),
		color: [226,  78,  66, 255],
		icon: "images/icon_19_gplus.png",
		count: ""
		}
	}

function unreadCountGet(type){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", unreadCountVariables[type].url, true);
	xhr.onload = function(){
		unreadCountOnload(this,type);
		};
	xhr.send(null);
	};

function unreadCountOnload(xhr,type) {
	var response;
	switch (type){
		case "gmail":	
			if(xhr.status == 200){
				var count = xhr.responseXML.getElementsByTagName("fullcount")[0]
				if(count){
					response = count.textContent;
					};
				};
			break;
		case "gplus":
			if(xhr.status == 200){
				var response;
				var count = xhr.responseText.split('id="67">')[1];
				if(count){
					count = count.split(">")[1];
					if(count){
						response = count.split("<")[0];
						};
					};
				};
			break;
		};
	unreadCountReceive(type, (response ? response : "error"));
	};