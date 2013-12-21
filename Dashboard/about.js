window.addEventListener("DOMContentLoaded", init);

function init(){
	var credits = [
		{"name": "Andrea Brandi", "id": "115728989643218525512"},
		{"name": "Bruno Zobbio", "id": "118099032245052207939"},
		{"name": "Christopher Hall", "id": "107518467849621748571"},
		{"name": "Dani Muñoz Guardiola", "id": "116557673999349947589"},
		{"name": "Daniel Zarco", "id": "109530012059707563382"},
		{"name": "Florian Kiersch", "id": "109543393310967160565"},
		{"name": "François Bacconnet", "id": "111903264144278356023"},
		{"name": "François Beaufort", "id": "100132233764003563318"},
		{"name": "Halfdan Reschat", "id": "103697368260407276883"},
		{"name": "Jordi Pagano", "id": "112888215225077342170"},
		{"name": "Kevin Kwok", "id": "116347431032639424492"},
		{"name": "Michael Cook", "id": "106347588867026921146"},
		{"name": "Mаксим Мекеня", "id": "104262998480220547117"},
		{"name": "Sinan baş", "id": "118272951807290672614"},
		{"name": "Sing-yu Chan", "id": "105029095754085262784"},
		{"name": "Tulho Melo", "id": "118309170949836127455"},
		];

	credits.forEach(function(personData){
		var a = document.createElement("a");
		a.setAttribute("target", "_blank");
		a.setAttribute("href", "https://plus.google.com/" + personData.id);
			var divImg = document.createElement("div");
				var img = document.createElement("img");
				img.setAttribute("src", "https://profiles.google.com/s2/photos/profile/" + personData.id + "?sz=32");
				divImg.appendChild(img);
			a.appendChild(divImg);
			var divP = document.createElement("div");
				var p = document.createElement("p");
				p.innerText = personData.name;
				divP.appendChild(p);
			a.appendChild(divP);
		document.getElementById("creditsList").appendChild(a);
		});
	
	document.getElementById("buildNumber").innerText = "Black Menu v." + chrome.app.getDetails()["version"];
	
	var socialMedia = {
		"Facebook": "https://www.facebook.com/sharer/sharer.php?u=http://blackmenu.carlosjeurissen.com/google/&amp;t=Black Menu for Google",
		"Twitter": "https://twitter.com/intent/tweet?hashtags=blackMenu,blackMenuForGoogle&amp;text=Black%20Menu%20for%20Google&amp;url=http%3A%2F%2Fblackmenu.carlosjeurissen.com%2Fgoogle%2F",
		"Gplus": "https://plus.google.com/share?url=http://blackmenu.carlosjeurissen.com/google/"
		};
	for(var i in socialMedia){
		document.getElementById(i).addEventListener("click", function(){
			window.open(this.dataset.url, this.id, 'width=675,height=275,scrollbars=no,toolbar=no,location=no');
			return false;
			});
		};
	

	var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	po.src = 'https://apis.google.com/js/plusone.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	};