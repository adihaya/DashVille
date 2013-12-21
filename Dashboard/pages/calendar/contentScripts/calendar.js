var newEventButtonClicked = false;
window.addEventListener("DOMContentLoaded", init);

function init(){
  setCalendarFunctionality();
};

function setCalendarFunctionality(){
  var picker = document.getElementById("picker1");
  var quickAddDiv = document.getElementById("quickAddDiv1");
  var toolbar1 = document.getElementById("toolbar1");
  var calendarButton = document.querySelector("#optionsLink1>span:first-child");
  var newEventButton = document.getElementById("addEventLink1");
  if(picker && calendarButton && newEventButton && quickAddDiv && toolbar1){
    calendarButton.textContent = "Calendar";
    calendarButton.addEventListener("mouseenter", function(){
      var ele = document.querySelector("#quickAddDiv1.on,#picker1.on");
      if(ele){
        if(ele != picker){
          ele.classList.remove("on");
        };
      };
      picker.classList.add("on");
    });
    document.querySelector("#toolbar1>div:first-child").insertBefore(calendarButton, document.getElementById("todayLink1"));
    
    newEventButton.addEventListener("mouseenter", function(){
      if(document.querySelector("body.locale-en #quickAddDiv1")){
        if(!newEventButtonClicked){
          newEventButtonClicked = true;
          this.click();
        };
        var ele = document.querySelector("#quickAddDiv1.on,#picker1.on");
        if(ele){
          if(ele != quickAddDiv){
            ele.classList.remove("on");
          };
        };
        quickAddDiv.classList.add("on");
      };
    });
    toolbar1.addEventListener("mouseleave", function(){
      var ele = document.querySelector("#quickAddDiv1.on,#picker1.on");
      if(ele){
        ele.classList.remove("on");
      };
    });   
  }
  else {
    setTimeout(setCalendarFunctionality, 100);
  };
};


/*String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var goBackTitle = false;
var moreDetailsTitle = false;
getPicker();

function getPicker() {
	if(document.getElementById("gadget-dp-1cur")){
		changeMonth();
		}
	else{
		setTimeout(getPicker,1);
		};
	};

function changeMonth(){
	var monthAndYear = document.getElementById("gadget-dp-1cur").innerHTML.split(" ");
	var year = monthAndYear[1];
	var month = monthAndYear[0];
	var monthShortened = month.substring(0,3);
	document.getElementById("gadget-dp-1cur").innerHTML = monthShortened + " " + year;
	setTimeout(changeMonth,1);
	};
	
function addOtherTitles(){
	var goBack = document.getElementById("hideDetailsLink1");
	var moreDetails = document.querySelector("#hideDetailsLink1 + .menu-link");
	if(goBack && moreDetails){
		if(!moreDetailsTitle){
			moreDetailsTitle = moreDetails.innerText.split(" ")[0].capitalize();
			};
		moreDetails.innerText = "...";
		moreDetails.setAttribute("style", moreDetails.getAttribute("style") + ";font-size:17px !important");
		moreDetails.setAttribute("title", moreDetailsTitle);
		if(!goBackTitle){
			goBackTitle = goBack.innerText.substr(2).capitalize();
			};
		goBack.setAttribute("title", goBackTitle);
		}
	};
	
addHomeTitles();

function addHomeTitles(){
	var newEvent = document.getElementById("addEventLink1");
	var todayButton = document.getElementById("todayLink1");
	if(newEvent && todayButton){
		newEvent.setAttribute("title", newEvent.innerText);
		todayButton.setAttribute("title", todayButton.innerText);
		}
	else{
		setTimeout(addHomeTitles, 20);
		}
	};
	
window.addEventListener("load", function(){
	var scriptElements = document.getElementsByTagName("script");
	var email = "";
	for(var i = scriptElements.length; i--; i>0){
		if (email == ""){
			var scriptInner = scriptElements[i].innerHTML
			if(scriptInner.indexOf("@gmail.com") != -1){
				email = scriptInner.split('email":"')[1].split('","')[0];
				chrome.storage.local.set({'calendarEmail':email})
				};
			};
		};
	});
	
document.addEventListener("mousedown", addOtherTitles);*/