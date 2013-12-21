var scholarPage = {};

scholarPage.focusSearchbox = function(){
  focusSearchBox(scholarPage.searchInput);
};

scholarPage.init = function() {
  scholarPage.body = document.getElementById("scholarPage");
  var searchBox = createSearchBox({
    searchOnEnter: scholarPage.loadSearchResults,
    buttonType: "search",
    buttonTooltip: "Search google scholar",
    inputMessage: "Search google scholar...",
    "withBottomBorder": true
  });
  scholarPage.body.appendChild(searchBox);
  scholarPage.searchInput = searchBox.querySelector("input");
  
  scholarPage.content = createContent({
    "toolbarCount": 1
  });
  scholarPage.body.appendChild(scholarPage.content);
  scholarPage.checkIfPermission();
};

scholarPage.checkIfPermission = function() {
  chrome.permissions.contains({ origins: ["http://scholar.google.com/scholar"] }, function(result) {
    result ? scholarPage.loadSearchResults() : scholarPage.displayPermissionPopup();
  });
};

scholarPage.loadSearchResults = function(query) {
  if(query){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://scholar.google.com/scholar?q=" + query);
    xhr.addEventListener("load", function(){
      var responseText = xhr.responseText;
      var parent = document.createElement("div");
      parent.innerHTML = responseText.split('id="gs_ccl"')[1].replace('">',"blackMenuSplitHere").split("blackMenuSplitHere")[1].split("<script")[0];
      scholarPage.content.innerText = "";
      for(var i = 0;i<parent.children.length;i++){
        var item = parent.children[i];
        if(item.tagName == "DIV"){
          
          var properties = {
            "url": item.querySelector("h3 a") ? item.querySelector("h3 a").href.replace("chrome-extension://" + extensionId + "/", "http://scholar.google.com/") : undefined,
            "title": item.querySelector("h3").textContent,
            "subTitle": item.querySelector(".gs_a") ? item.querySelector(".gs_a").textContent : undefined,
            "description": item.querySelector(".gs_rs") ? item.querySelector(".gs_rs").textContent : undefined,
            "citedBy": item.querySelector(".gs_fl>a:first-child") ? item.querySelector(".gs_fl>a:first-child").textContent : undefined,
            "citedByUrl": item.querySelector(".gs_fl>a:first-child") ? item.querySelector(".gs_fl>a:first-child").href : undefined,
            "relatedArticles": item.querySelector(".gs_fl>a:nth-child(2)") ? item.querySelector(".gs_fl>a:nth-child(2)").textContent : undefined,
            "relatedArticlesUrl": item.querySelector(".gs_fl>a:nth-child(2)") ? item.querySelector(".gs_fl>a:nth-child(2)").href : undefined,
            "AllVersions": item.querySelector(".gs_fl>a:nth-child(3):not([onclick]") ? item.querySelector(".gs_fl>a:nth-child(3):not([onclick]").textContent : undefined,
            "AllVersionsUrl": item.querySelector(".gs_fl>a:nth-child(3):not([onclick]") ? item.querySelector(".gs_fl>a:nth-child(3):not([onclick]").href : undefined,
          };
          var card = scholarPage.createCard(properties);
          scholarPage.content.appendChild(card);
        };
      };
    });
    xhr.send();
  }
  else {
    scholarPage.content.innerText = "";
    var noResultsHeader = createCardHeader({
      "name": "Please enter a query"
    });
    scholarPage.content.appendChild(noResultsHeader);
  };
};

scholarPage.createCard = function(properties){
  var card = document.createElement("div");
  card.className = "card";
  
  var title = document.createElement("h3");
  title.textContent = properties.title;
  if(properties.url){
    title.addEventListener("click", function(){
      window.open(properties.url, "_blank");
    });
  };
  card.appendChild(title);
  
  if(properties.subTitle){
    var subTitle = document.createElement("h4");
    subTitle.textContent = properties.subTitle;
    card.appendChild(subTitle);
  };
  
  if(properties.description){
    var description = document.createElement("article");
    description.textContent = properties.description;
    card.appendChild(description);
  };
  
  return card;
};

if(document.body){
  scholarPage.init();
}
else {
  window.addEventListener("DOMContentLoaded", scholarPage.init);
};

scholarPage.displayPermissionPopup = function() {
  scholarPage.authPopup = createPopup({
    "className": "authPopup",
    "imgName": "padlock",
    "name": "Give Permission",
    "noCloseButton": true
  });
  var popupContent = document.createElement("div");
  popupContent.className = "popupContent";
  popupContent.textContent = "Before you can use this page, you need to give Black Menu for Google access to Google Scholar.";
  var br = document.createElement("br");
  popupContent.appendChild(br);
  var br = document.createElement("br");
  popupContent.appendChild(br);
  var authButton = document.createElement("button");
  authButton.className = "blueButton";
  authButton.textContent = "Give permission";
  authButton.addEventListener("click", scholarPage.authorize);
  popupContent.appendChild(authButton);
  scholarPage.authPopup.appendChild(popupContent);
  scholarPage.body.appendChild(scholarPage.authPopup);
};

scholarPage.authorize = function() {
  console.log("authorize");
  chrome.permissions.request({ origins: ["http://scholar.google.com/scholar"] }, function(granted) {
    console.log(granted);
    if (granted) {
      scholarPage.loadSearchResults();
      scholarPage.authPopup.classList.remove("on");
    };
  });
};