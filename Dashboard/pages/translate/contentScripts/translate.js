var phrasebook = document.querySelector(".page:last-child");
var results = document.querySelector(".cllist");
var toolbar = document.querySelector(".main-header");
var input = document.querySelector(".orig");
var starredButton = document.createElement("button");
var closePopupButton = phrasebook.querySelector("div:first-child>div:first-child>div:first-child");

window.addEventListener("message", function() {
  var message = event.data;
  if(message == "focusSearchbox"){
    input.focus();
  };
});

changeView("phrasebook");

document.querySelector(".page:last-child > div:first-child > div:first-child > div:nth-child(2)").classList.add("CSS_WUI_ACTIVE");

input.addEventListener("keydown", function(e){
  if(event.keyCode==13){
    translate();
  };
});

input.setAttribute("placeholder", chrome.i18n.getMessage("pmsg6"));

document.querySelectorAll(".ls-select")[0].addEventListener("change", translate);
document.querySelectorAll(".ls-select")[1].addEventListener("change", translate);
document.querySelectorAll(".swap-wrap")[0].addEventListener("click", translate);

function translate(){
  document.querySelector(".go-wrap>div").click();
  changeView("translate");
};

loadPhrasebook();
var s = document.createElement("style");
s.innerText = ".page{display:block !important;}";
document.head.appendChild(s);

function loadPhrasebook() {
  starredButton.setAttribute("id", "starredButton");
  var icon = document.createElement("div");
  icon.setAttribute("id", "phrasebookIcon");
  starredButton.appendChild(icon);
  console.log(starredButton);
  toolbar.appendChild(starredButton);
  
  starredButton.addEventListener("click", function(){
    changeView("toggle");
  });
  
  closePopupButton.addEventListener("click", function(){
    changeView("toggle");
  });
  
  closePopupButton.innerText = "ok";
  
  document.querySelector(".outer-wrap").addEventListener("click", function(){
    if(event["srcElement"].className == "translate_item"){
      changeView("toggle");
    };
  });
};

function changeView(mode){
  phrasebook.classList[mode == "translate" ? "remove" : (mode == "phrasebook" ? "add" : "toggle")]("enabled");
  starredButton.classList[mode == "translate" ? "remove" : (mode == "phrasebook" ? "add" : "toggle")]("enabled")
  results.classList[mode == "translate" ? "add" : (mode == "phrasebook" ? "remove" : "toggle")]("enabled");
};