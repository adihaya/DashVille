window.addEventListener("load", function(){
  setTimeout(init,10);
});

function init(){
  /**
 * Variables
 */
  window.browserLang = window.navigator.language;
  window.isChrome = chrome ? true : false;
  window.isChromeLocalization = isChrome ? (chrome.i18n ? true : false) : false;
  window.extensionId = isChromeLocalization ? chrome.i18n.getMessage("@@extension_id") : "eignhdfgaldabilaaegmdfbajngjmoke";
  window.unreadCountInterval = "";

  window.pages = {
    search: {url: "https://www.google.com/webhp", name: i18n("msg0"), inlinePage: true, iconName: "google_favicon"},
    gplus: {url: "https://plus.google.com/", name: i18n("msg1"), inlinePage: true, iconName: "gplus"},
    youtube: {url: "https://www.youtube.com/", name: i18n("msg5"), inlinePage: true, iconName: "youtube"},
    news: {url: "https://news.google.com/nwshp", name: i18n("msg6"), inlinePage: true, iconName: "news"},
    gmail: {url: "https://mail.google.com/mail/", name: i18n("msg7"), inlinePage: true, iconName: "googlemail"},
    drive: {url: "https://drive.google.com/", name: i18n("msg8"), inlinePage: true, iconName: "drive"},
    chromeapps: {url:"https://chrome.google.com/webstore/", name: "Chrome Apps", inlinePage: true, iconName: "chrome"},
    keep: {url: "https://drive.google.com/keep", name: "Google Keep", panel: "https://drive.google.com/keep/?extension=blackMenu", inlinePage: true, iconName: "keep"},
    facebook: {url: "https://www.facebook.com/", name: "Facebook", inlinePage: true, iconName: "facebook"}
  };
  loadMenuItems();
  mainMenuSystem();
  if(localStorage.getItem("prefGenericUnreadCount") == "true") { unreadCountIntervalChange("set") };
  
  window.addEventListener("dragleave", function(){
    if(event.y == "0"){
      animateMoreDots("stop");
      removeHoverIndicator();
    };
  });
  
  if(location.href.indexOf("?popup") != -1){
    document.body.classList.add("bmInPanel");
  };
};

function createMenuItem(item){
  var properties = {
    "name": pages[item].name,
    "imgName": pages[item].iconName
  };
  var li = createShortcut(properties);
  li.id = item;
  li.setAttribute("draggable", "true");
  li.addEventListener("dragstart", function() {
    animateMoreDots("stop");
    animateMoreDots();
    event.dataTransfer.setData("text",event.srcElement.id);
  });
  li.addEventListener("mouseenter", function () {
    if(this.parentNode.id == "mainMenu"){
      mainMenuRowHovered(this.id);
    };
  });
  li.addEventListener("dragover", function() {
    removeHoverIndicator();
    try {
      if(event.target.parentNode == morePage.servicesList){
        return;
      }
    }
    catch(err){
      console.log(err);
    };
    if(event.offsetY <= 22) {
      event.target.classList.add("dragBorderTop");
    }
    else {
      event.target.nextSibling.classList.add("dragBorderTop");
    };
  });
  li.addEventListener("click", function() {
    
    console.log(this.id);
    //window.open(pages[this.id].url, "_blank");
    
    if(this.parentNode.id == "mainMenu"){
      console.log(this.id);
      window.open(pages[this.id].url, "_blank");
    }
    else {
      mainMenuRowHovered(this.id);
    };
  });
  return li;
};

function loadMenuItems() {
  var defaultSelection = ["search", "gplus", "translate", "maps", "play", "youtube", "news", "gmail", "drive", "calendar"];
  chrome.storage.sync.get("selectedMenuItems", function(storage){
    window.selectedMenuItems = storage.selectedMenuItems;
    if(!storage.selectedMenuItems){
      window.selectedMenuItems = defaultSelection
      chrome.storage.sync.set({"selectedMenuItems": selectedMenuItems});
    };
    selectedMenuItems.forEach(function(item){
      if(item in pages){
        document.getElementById("mainMenu").appendChild(createMenuItem(item));
        loadPage(item);
      };
    });
    
    /* more element */
    var moreLi = document.createElement("li");
    moreLi.id = "more";  
    var dotContainer = document.createElement("div");
    dotContainer.innerHTML = '<span id="dotA" class="moreDot"></span>' +
      '<span id="dotB" class="moreDot"></span>' +
      '<span id="dotC" class="moreDot"></span>';  
    moreLi.appendChild(dotContainer);
    var divP = document.createElement("div");
    var p = document.createElement("p");
    p.textContent = pages.more.name
    divP.appendChild(p);
    moreLi.appendChild(divP);
    
    moreLi.addEventListener("mouseenter", function () {
      mainMenuRowHovered(this.id);
    });
    moreLi.addEventListener("dragover", function() {
      removeHoverIndicator();
      if(event.offsetY <= 22) {
        event.target.classList.add("dragBorderTop");
      }
      else {
        event.target.nextSibling.classList.add("dragBorderTop");
      };
    });
    moreLi.addEventListener("click", function() {
      window.open(pages[this.id].url, "_blank");
    });    
    
    document.getElementById("mainMenu").appendChild(moreLi);
    
    loadPage("more");
    /* */
    
    mainMenuRowHovered(selectedMenuItems[0] ? selectedMenuItems[0] : "more");
    if(selectedMenuItems[0] != false){
      
      document.getElementById(selectedMenuItems[0] + "Page").addEventListener("load", function(){
        this.contentWindow.postMessage("focusSearchbox", location.origin);
      });
    };
  });
};

function loadPage(service) {
  pages[service].loaded = true;
  
  var header = document.createElement("header");
  header.id = service + "Header";
  
  var divA = document.createElement("div");
  var serviceIcon = createIcon({
    "name": pages[service].iconName,
    "color": "w",
    "size": 32
  });
  divA.appendChild(serviceIcon);
  header.appendChild(divA);
  
  var divB = document.createElement("div");
  var p = document.createElement("p");
  p.textContent = pages[service].name;
  divB.appendChild(p);
  header.appendChild(divB);
  
  var divC = document.createElement("div");
  var openInPanelIcon = createIcon({
    "name": "panel",
    "color": "w",
    "size": 32
  });
  openInPanelIcon.className = "openInPanel";
  openInPanelIcon.setAttribute("title", "open widget in a panel");
  divC.addEventListener("click", function () {
    var type = storage.get("prefGenericOpenGadget", "panel");
    var url = pages[service].panel ? pages[service].panel : "chrome-extension://" + extensionId + "/singlepage.html?page=" + service;
    openWindow(type, url, 450, 485);
  });
  divC.appendChild(openInPanelIcon);
  header.appendChild(divC);    
  document.getElementById("mainWindow").appendChild(header);
  
  var container = document.createElement("div");
  container.id = service + "Page";
  document.getElementById("mainWindow").appendChild(container);
  
  var script = document.createElement("script");
  script.setAttribute("src", "/pages/" + service + "/index.js");
  document.head.appendChild(script);
  
  var style = document.createElement("link");
  style.setAttribute("rel", "stylesheet");
  style.setAttribute("href", "/pages/" + service + "/index.css");
  document.head.appendChild(style);
};

function unreadCountUpdate() {
  var unreadCountTypes = ["gplus", "gmail"];
  if(localStorage.getItem("prefGenericUnreadCount") == "true"){
    unreadCountTypes.forEach(function(type){
      if(localStorage.getItem("prefGenericUnreadCounts" + type.capitalize()) == "true") {
        unreadCountGet(type);
      }
      else {
        unreadCountChange("remove", type);
      };
    });
  }
  else {
    unreadCountTypes.forEach(function(type){
      unreadCountChange("remove", type);
    });
    unreadCountIntervalChange("remove");
  };
};

function unreadCountReceive(type, count) {
  unreadCountChange( (isNumber(count) ? "set" : "remove" ), type, count);
};

function unreadCountChange(condition, type, count) {
  var countElement = document.getElementById(type).querySelector("p");
  countElement.dataset.textAfter = (condition === "set") ? (" (" + count + ")") : "";
};

function unreadCountIntervalChange(condition){
  if(condition === "set" && !unreadCountInterval){
    unreadCountInterval = setInterval(unreadCountUpdate, 4000);
    return;
  }
  if(condition === "remove" && unreadCountInterval){
    clearInterval(unreadCountInterval);
  };			
};

//---------general functions-------\\

function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

function openWindow(type,url,width,height){
  if(type == "tab"){
    window.open(url, "_blank");
  }
  else {
    var windowDetails = {
      url: url,
      width: width,
      height: height,
      type: type,
      focused: true
    };
    chrome.windows.create(windowDetails);
  };
};

function mainMenuSystem() {
  loadMenuFunctionality(document.getElementById("mainMenu"));
  document.getElementById("mainWindow").addEventListener("mouseenter", function(){
    clearTimeout(hoverTimeout);
  });
};

function loadMenuFunctionality(element){
  element.addEventListener("drop", function(){
    drop(event);
  });
  element.addEventListener("dragover", function(){
    event.preventDefault();
  });
  /*if(element.id == "mainMenu"){
  element.addEventListener("mouseover", function(ev){
    var service = ev.toElement.id;
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(function(){
      document.querySelector("html").className = service + "Page";
      if(!pages[service].loaded){
        loadPage(service);
      };
      window[service + "Page"].focusSearchbox();
    }, 100);
  });
  };*/
};

function drop(ev) {
  console.log(ev.target);
  animateMoreDots("stop");
  ev.preventDefault();
  var data = ev.dataTransfer.getData("Text");
  var element = document.getElementById(data);
  if(ev.target.tagName == "UL"){
    if(ev.target.id == "mainMenu"){
      ev.target.insertBefore(element, document.getElementById("more"));
    }
    else {
      ev.target.appendChild(element);
    };
  }
  else {
    if(ev.target.id == "more"){
      if(morePage.servicesList){
        morePage.servicesList.appendChild(element);
      };
    }
    else {
      ev.target.parentNode.insertBefore(element, (ev.offsetY <= 22) ? ev.target : ev.target.nextSibling);
    };
  };
  if(document.getElementById("mainMenu").children.length > 11){
    morePage.servicesList.appendChild(document.getElementById("mainMenu").children[10]);
  };
  var selectedServices = [];
  [].forEach.call(document.getElementById("mainMenu").children, function(li){
    if(li.id != "more"){
      selectedServices.push(li.id);
    };
  });
  chrome.storage.sync.set({"selectedMenuItems": selectedServices});
  removeHoverIndicator();
  setTimeout(removeHoverIndicator, 10);
};

function removeHoverIndicator(){
  var dragBorderTop = document.querySelector("#mainMenu>li.dragBorderTop");
  if(dragBorderTop){
    dragBorderTop.classList.remove("dragBorderTop");
  };
};

var hoverTimeout;
function mainMenuRowHovered(service) {
  clearTimeout(hoverTimeout);
  hoverTimeout = setTimeout(function(){
    document.querySelector("html").className = service + "Page";
    if(!pages[service].loaded){
      loadPage(service);
    };
    window[service + "Page"].focusSearchbox();
  }, 100);
};

function calcMoreDotPosition(type,number){
  var value = Math.PI/180
  return Math.round(Math[type](number*value)*12 + 12) + "px"
}

var moreDotDegrees = 0;
function setDotAPosition(){
  document.getElementById("dotA").style.left = calcMoreDotPosition("cos", moreDotDegrees);
  document.getElementById("dotA").style.top  = calcMoreDotPosition("sin", moreDotDegrees);
  document.getElementById("dotB").style.left = calcMoreDotPosition("cos", moreDotDegrees + 120);
  document.getElementById("dotB").style.top  = calcMoreDotPosition("sin", moreDotDegrees + 120);
  document.getElementById("dotC").style.left = calcMoreDotPosition("cos", moreDotDegrees + 240);
  document.getElementById("dotC").style.top  = calcMoreDotPosition("sin", moreDotDegrees + 240);
  moreDotDegrees += 3;
};

var moreDotsInterval;
function animateMoreDots(state){
  if(state == "stop"){
    clearInterval(moreDotsInterval);
    document.getElementById("dotA").style.left = "2px";
    document.getElementById("dotA").style.top  = "13px";
    document.getElementById("dotB").style.left = "12px";
    document.getElementById("dotB").style.top  = "13px";
    document.getElementById("dotC").style.left = "22px";
    document.getElementById("dotC").style.top  = "13px";
  }
  else {
    moreDotsInterval = setInterval(setDotAPosition, 10);
  };
};
