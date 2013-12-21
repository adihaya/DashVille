var chromeappsPage = {};

chromeappsPage.focusSearchbox = function(){
  focusSearchBox(chromeappsPage.searchInput);
};

chromeappsPage.fullAppList = [];

chromeappsPage.init = function() {
  changeLoading("on", "chromeapps");
  chromeappsPage.body = document.getElementById("chromeappsPage");
  var searchBox = createSearchBox({
    searchOnEnter: chromeappsPage.openFirstShortcut,
    searchOnInput: chromeappsPage.createAppList,
    buttonType: "launch",
    buttonTooltip: "launch first shortcut in the list",
    inputMessage: "Search chrome apps...",
    "withBottomBorder": true
  });
  chromeappsPage.body.appendChild(searchBox);
  chromeappsPage.searchInput = searchBox.querySelector("input");
  
  chromeappsPage.content = createContent({
    "toolbarCount": 1
  });
  chromeappsPage.body.appendChild(chromeappsPage.content);
  
  chromeappsPage.checkIfPermission();
};

chromeappsPage.openFirstShortcut = function() {
  var shortcut = document.querySelector("#chromeappsPage .content li");
  chrome.management.launchApp(shortcut.dataset.id);
};

chromeappsPage.checkIfPermission = function() {
  chrome.permissions.contains({ permissions: ["management"] }, function(result) {
    result ? chromeappsPage.loadApps() : chromeappsPage.displayPermissionPopup();
  });
};

chromeappsPage.loadApps = function() {
  chrome.management.getAll(function(a){
    chromeappsPage.fullAppList = a;
    chromeappsPage.createAppList();
  });
};

chromeappsPage.displayPermissionPopup = function() {
  chromeappsPage.authPopup = createPopup({
    "className": "authPopup",
    "imgUrl": "https://www.google.com/images/icons/feature/padlock-y32.png",
    "name": "Give Permission",
    "noCloseButton": true
  });
  var popupContent = document.createElement("div");
  popupContent.className = "popupContent";
  popupContent.textContent = "Before you can use this page, you need to give Black Menu for Google access to load your installed apps as a shortcut.";
  var br = document.createElement("br");
  popupContent.appendChild(br);
  var br = document.createElement("br");
  popupContent.appendChild(br);
  var authButton = document.createElement("button");
  authButton.className = "blueButton";
  authButton.textContent = "Give permission";
  authButton.addEventListener("click", chromeappsPage.authorize);
  popupContent.appendChild(authButton);
  chromeappsPage.authPopup.appendChild(popupContent);
  chromeappsPage.body.appendChild(chromeappsPage.authPopup);
};

chromeappsPage.authorize = function() {
  chrome.permissions.request({ permissions: ["management"] }, function(granted) {
    if (granted) {
      chromeappsPage.loadApps();
      chromeappsPage.authPopup.classList.remove("on");
    };
  });
};

chromeappsPage.createAppList = function(){
  changeLoading("on", "chromeapps");
  chromeappsPage.content.textContent = "";
  
  var appsHeader = createCardHeader({"name": "Apps"});
  var appsContainer = document.createElement("ul");
  appsContainer.className = "card buttonList";
  
  var websitesHeader = createCardHeader({"name": "Websites"});
  var websitesContainer = document.createElement("ul");
  websitesContainer.className = "card buttonList";
  
  var query = chromeappsPage.searchInput.value;
  chromeappsPage.fullAppList.forEach(function(item){
    if(item.enabled && item.isApp){
      if(query){
        if(item.name.toLowerCase().indexOf(query.toLowerCase()) + item.description.toLowerCase().indexOf(query.toLowerCase()) <= -2){
          return;          
        };
      };
      var properties = {
        "name": item.shortName ? item.shortName : item.name,
        "id": item.id,
        "imgSrc": chromeappsPage.shortcutIcon(item),
        "clickFunction": chromeappsPage.launchApp
      };
      var shortcut = createShortcut(properties);
      if(item.type == "packaged_app"){
        appsContainer.appendChild(shortcut);
      }
      else {
        websitesContainer.appendChild(shortcut);
      };
    };
  });
  
  if(appsContainer.children.length != 0){
    chromeappsPage.content.appendChild(appsHeader);
    chromeappsPage.content.appendChild(appsContainer);
  };
  if(websitesContainer.children.length != 0){
    chromeappsPage.content.appendChild(websitesHeader);
    chromeappsPage.content.appendChild(websitesContainer);
  };
  changeLoading("off", "chromeapps");
};

chromeappsPage.shortcutIcon = function(thisapp){
  var icon = chrome.extension.getURL("images/defaultIcon.png");
  var icons = thisapp.icons;
  if(icons != undefined) {
    var found = false;
    icons.forEach(function(thisicon){
      var wantedSizes = [32, 38, 48, 64, 96, 128];
      wantedSizes.forEach(function(wantedSize){
        if(!found){
          if(thisicon.size == wantedSize){
            icon = thisicon.url;
            found = true;
          };
        };
      });
    });
    if(!found){
      icon = icons[icons.length-1].url;
    };
  }
  return icon;
};

chromeappsPage.launchApp = function(){
  chrome.management.launchApp(this.dataset.id);
};

if(document.body){
  chromeappsPage.init();
}
else {
  window.addEventListener("DOMContentLoaded", chromeappsPage.init);
};