var urlshortenerPage = {};

urlshortenerPage.init = function(){
  urlshortenerPage.body = document.getElementById("urlshortenerPage");
  var searchBox = createSearchBox({
    "searchOnEnter": urlshortenerPage.shortenUrl,
    "inputMessage": "Insert url to shorten here...",
    "withBottomBorder": true,
    "stayOnPageOnEnter": true
  });
  urlshortenerPage.body.appendChild(searchBox);
  
  urlshortenerPage.content = urlshortenerPage.createContent();
  urlshortenerPage.body.appendChild(urlshortenerPage.content);
  
  urlshortenerPage.searchInput = searchBox.querySelector(".searchInput");
  
  urlshortenerPage.setActiveTab();
};

urlshortenerPage.createContent = function(){
  var div = document.createElement("div");
  div.dataset.toolbarCount = "1";
  div.className = "content";
  var cardHeader = createCardHeader({"name":"All goo.gl URLs and click analytics are public and can be accessed by anyone."});
  div.appendChild(cardHeader);
  return div;
};

urlshortenerPage.focusSearchbox = function(){
  if(!urlshortenerPage.body.querySelector(".resultsContainer")){
    urlshortenerPage.searchInput.focus();
  };
};

urlshortenerPage.changeVisibility = function(element, state){
  element.classList[state == "hide" ? "remove" : "add"]("on");
};

urlshortenerPage.setActiveTab = function() {
  chrome.tabs.getSelected(null, function(tab){
    var url = tab.url;
    if(url){
      urlshortenerPage.searchInput.value = tab.url;
    };
  });
};

urlshortenerPage.shortenUrl = function(){
  changeLoading("on", "urlshortener");
  urlshortenerPage.getShortenedUrl(urlshortenerPage.searchInput.value, urlshortenerPage.appendShortenResults);
};

urlshortenerPage.appendShortenResults = function(response){
  changeLoading("off", "urlshortener");
  if(response.status != "error"){
    var container = document.createElement("div");
    container.className = "resultsContainer";
    container.setAttribute("style", "display: block !important;");
    
    var inputContainer = document.createElement("div");
    inputContainer.dataset.tooltipText = "Press CTRL-C to copy";
    inputContainer.dataset.tooltipPosition = "top";
    inputContainer.setAttribute("class", "tooltipOn");
    var input = document.createElement("input");
    input.className = "result";
    input.setAttribute("type", "text");
    input.setAttribute("spellcheck", "false");
    input.setAttribute("readonly", "true");
    input.setAttribute("value", response.shortUrl);
    input.addEventListener("blur", function(){
      this.parentNode.classList.remove("tooltipOn");
    });
    input.addEventListener("click", function(){
      this.parentNode.classList.add("tooltipOn");
      setTimeout(function(){input.select() }, 10);
    });
    setTimeout(function(){input.select() },10);
    inputContainer.appendChild(input);
    
    container.appendChild(inputContainer);
    
    var detailsContainer = document.createElement("div");
    detailsContainer.className = "detailsContainer";
    var timeSpan = document.createElement("span");
    timeSpan.textContent = "0 minutes ago";
    detailsContainer.appendChild(timeSpan);
    var textNode = document.createTextNode(" - ");
    detailsContainer.appendChild(textNode);
    var detailsButton = document.createElement("a");
    detailsButton.setAttribute("target", "_blank");
    detailsButton.className = "detailsButton";
    detailsButton.textContent = "details";
    var detailsUrl = "http://goo.gl/#analytics/goo.gl/" + response.shortUrl.split("http://goo.gl/")[1].split("/")[0] + "/all_time";
    detailsButton.setAttribute("href", detailsUrl);
    detailsContainer.appendChild(detailsButton);
    
    container.appendChild(detailsContainer);
    
    var originUrlContainer = document.createElement("div");
    var originUrlButton = document.createElement("a");
    originUrlButton.className = "originUrlButton";
    originUrlButton.setAttribute("target", "_blank");
    originUrlButton.setAttribute("href", response.longUrl);
    originUrlButton.textContent = response.longUrl;
    originUrlContainer.appendChild(originUrlButton);
    
    container.appendChild(originUrlContainer);
    
    urlshortenerPage.content.textContent = "";
    urlshortenerPage.content.appendChild(container);
  }
  else {
    urlshortenerPage.content.textContent = "";
    var errorText = (response.errorMessage == "invalidUrl") ? "Please fill in a valid URL" : "Error while generating short url";
    var errorElement = createCardHeader({"name": errorText});
    urlshortenerPage.content.appendChild(errorElement);
    console.log({page: "urlShortener", message: "error while generating short url", errorMessage: response.errorMessage});
  };
};

urlshortenerPage.validUrl = function(url){
  return url.indexOf("http://") != -1 || url.indexOf("https://") != -1;
};

urlshortenerPage.getShortenedUrl = function(longUrl, callback) {
  if(!urlshortenerPage.validUrl(longUrl)){
    callback({status: "error", errorMessage: "invalidUrl"});
    return;
  };
  var url = "https://www.googleapis.com/urlshortener/v1/url";
  var key = "AIzaSyBoU4_PBKEtA-GJp5z55vwkv5qMAbhgOlo";
  var timer = null;
  var milliseconds = 10000;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url + "?key=" + key, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.addEventListener("readystatechange", function(){
    if(xhr.readyState == 4 && xhr.status != 0) {
      clearTimeout(timer);
      var response = JSON.parse(xhr.responseText);
      var error = response.id == undefined;
      if(response.id == undefined){
        if(response.error.code == "401"){
          oauth.clearTokens();
        };
        callback({status: "error", errorMessage: response.error.message, response: response});
      }
      else {
        console.log(response);
        callback({status: "success", shortUrl: response.id, longUrl: longUrl});		
      };
    };
  });
  xhr.send(JSON.stringify({"longUrl": longUrl}));
  
  timer = setTimeout(function(){
    xhr.abort();
    callback({status: "error", errorMessage: "request timeout"});
  }, milliseconds);
};

if(document.body){
  urlshortenerPage.init();
}
else {
  window.addEventListener("DOMContentLoaded", urlshortenerPage.init);
};