var sitesPage = {};

sitesPage.focusSearchbox = function(){
  focusSearchBox(sitesPage.searchInput);
};

sitesPage.init = function() {
  changeLoading("on", "sites")
  sitesPage.body = document.getElementById("sitesPage");
  var searchBox = createSearchBox({
    searchOnEnter: sitesPage.openQueryInNewTab,
    buttonType: "search",
    buttonTooltip: "Search google sites in a new tab",
    inputMessage: "Search google sites in a new tab...",
    "withBottomBorder": true
  });
  sitesPage.body.appendChild(searchBox);
  sitesPage.searchInput = searchBox.querySelector("input");
  
  sitesPage.content = createContent({
    "toolbarCount": 1
  });
  sitesPage.body.appendChild(sitesPage.content);
  
  sitesPage.checkIfPermission();
};

sitesPage.openQueryInNewTab = function() {
  window.open("https://sites.google.com/site/sites/system/app/pages/meta/search?scope=my&q=" + sitesPage.searchInput.value, "_blank");
};

sitesPage.loadSites = function(){
  
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://sites.google.com/site/sites/system/app/pages/meta/dashboard?mobile=true");
  xhr.addEventListener("load", function(){
    var ul = document.createElement("ul");
    if(xhr.response.indexOf("<ul>") != -1){
      ul.innerHTML = xhr.response.split("<ul>")[1].split("</ul>")[0];
      var items = ul.children;
      
      if(items.length != 0){
        var yourSites = createCardHeader({
          "name": "My Sites"
        });
        sitesPage.content.appendChild(yourSites);
        
        for(var i=0;i<items.length;i++){
          var item = items[i];
          var properties = {
            "name": item.querySelector(".your-site-title").textContent,
            "url": "https://sites.google.com/" + item.querySelector(".your-site-title").href.replace("chrome-extension://" + extensionId + "/", ""),
            "sharedWith": item.querySelector(".site-shared-with").textContent,
            "description": item.querySelector(".wiki_summarized") ? item.querySelector(".wiki_summarized").textContent : undefined,
            "dashUrl": item.querySelector(".sites-dash-site-url").textContent
          };
          var card = sitesPage.createCard(properties);
          sitesPage.content.appendChild(card);
        };
        
        changeLoading("off", "sites");
        return;
      };
    };
    var noResults = createCardHeader({
      "name": "No sites found"
    });
    sitesPage.content.appendChild(noResults);
    
    changeLoading("off", "sites");
  });
  xhr.send();
};

sitesPage.createCard = function(properties){
  var card = document.createElement("div");
  card.className = "card";
  card.addEventListener("click", function(){
    window.open(properties.url, "_blank");
  });
  
  var header = document.createElement("h3");
  header.textContent = properties.name;
  card.appendChild(header);
  
  var sharedWith = document.createElement("h4");
  sharedWith.textContent = properties.sharedWith;
  card.appendChild(sharedWith);
  
  var dashUrl = document.createElement("h4");
  dashUrl.textContent = properties.dashUrl;
  card.appendChild(dashUrl);
  
  if(properties.description){
    var description = document.createElement("article");
    description.textContent = properties.description;
    card.appendChild(description);
  };
  
  var imgContainer = document.createElement("div");
  imgContainer.className = "faviconContainer";
  
  var img = document.createElement("img");
  img.src = "https://www.google.com/images/icons/product/sites.ico";
  
  var testImg = document.createElement("img");
  testImg.addEventListener("load", function(){
    img.src = properties.url + "favicon.ico";
    if(testImg.height < 30){
      imgContainer.classList.add("smallIcon");
    }
  });
  testImg.src = properties.url + "favicon.ico";
  
  imgContainer.appendChild(img);
  
  card.appendChild(imgContainer);
  
  return card;
};

sitesPage.checkIfPermission = function() {
  chrome.permissions.contains({ origins: ["https://sites.google.com/"] }, function(result) {
    result ? sitesPage.loadSites() : sitesPage.displayPermissionPopup();
  });
};

sitesPage.displayPermissionPopup = function() {
  sitesPage.authPopup = createPopup({
    "className": "authPopup",
    "imgUrl": "https://www.google.com/images/icons/feature/padlock-y32.png",
    "name": "Give Permission",
    "noCloseButton": true
  });
  var popupContent = document.createElement("div");
  popupContent.className = "popupContent";
  popupContent.textContent = "Before you can use this page, you need to give Black Menu for Google access to list your Google Sites";
  var br = document.createElement("br");
  popupContent.appendChild(br);
  var br = document.createElement("br");
  popupContent.appendChild(br);
  var authButton = document.createElement("button");
  authButton.className = "blueButton";
  authButton.textContent = "Give permission";
  authButton.addEventListener("click", sitesPage.authorize);
  popupContent.appendChild(authButton);
  sitesPage.authPopup.appendChild(popupContent);
  sitesPage.body.appendChild(sitesPage.authPopup);
};

sitesPage.authorize = function() {
  console.log("authorize");
  chrome.permissions.request({ origins: ["https://sites.google.com/"] }, function(granted) {
    console.log(granted);
    if (granted) {
      sitesPage.loadSites();
      sitesPage.authPopup.classList.remove("on");
    };
  });
};

if(document.body){
  sitesPage.init();
}
else {
  window.addEventListener("DOMContentLoaded", sitesPage.init);
};