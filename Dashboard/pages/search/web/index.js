window.addEventListener("DOMContentLoaded", init);

var resultStart = 0;
var query;

function init(){
  query = (location.href.indexOf("?q=") != -1) ? location.href.split("?q=")[1].split("&")[0] : undefined;
  if(query && query != ""){
    loadResults();
  }
  else {
    var resultsCountElement = createCardHeader({
      "name": "Please enter a search query"
    });
    document.body.appendChild(resultsCountElement);
    changeLoading("off");
  };
};

function loadResults(){
  changeLoading("on");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://www.google.com/custom?num=20&q=" + query + "&start=" + resultStart)
  xhr.addEventListener("load", function(){
    if(resultStart == 0){
      var resultsCount = xhr.responseText.split('<font size="-1">')[1].split("</font>")[0].split("(")[0];
      
      window.content = createContent({
        "onScrollBottom": loadResults
      });
      document.body.appendChild(content);
      
      var resultsCountElement = document.createElement("div");
      resultsCountElement.className = "cardHeader";
      resultsCountElement.innerText = resultsCount;
      content.appendChild(resultsCountElement);
    };
    resultStart += 20;
    
    var div = document.createElement("div");
    div.innerHTML = xhr.responseText.split("<ol")[1].split('list-style:none">')[1].split("</ol>")[0];
    var elements = div.children;
    for(var i=0;i<elements.length;i++){
      var properties = {
        "src": elements[i].querySelector("h2>a").href,
        "title": elements[i].querySelector("h2>a").innerHTML,
        "description": elements[i].querySelector("table .s") ? elements[i].querySelector("table .s").innerHTML.toString().replace(/<br>/g, '') : undefined,
        "origin": elements[i].querySelector("table .a").innerHTML,
        "originText": elements[i].querySelector("table .a").textContent,
        "cachedUrl": elements[i].querySelector('nobr>a[target="_blank"]') ? elements[i].querySelector('nobr>a[target="_blank"]').href : undefined,
        "similarUrl": elements[i].querySelector('nobr>a:not([target="_blank"])') ? elements[i].querySelector('nobr>a:not([target="_blank"])').href : undefined
      };
      content.appendChild(createWebCard(properties));
    };
    changeLoading("off");
  });
  xhr.send();
};

function createWebCard(properties){
  var card = document.createElement("div");
  card.className = "card";
  var h3 = document.createElement("h3");
  h3.innerHTML = properties.title;
  h3.addEventListener("click", function(){
    window.open(properties.src, "_blank");
  });
  card.appendChild(h3);
  
  var actionContainer = document.createElement("h4");
  var origin = document.createElement("span");
  origin.className = "origin";
  origin.innerHTML = properties.origin.split(" ")[0];
  origin.addEventListener("click", function(){
    window.open("http://" + properties.originText.split(" ")[0], "_blank");
  });
  actionContainer.appendChild(origin);
  if(properties.cachedUrl){
    var cachedUrl = document.createElement("span");
    cachedUrl.className = "action";
    cachedUrl.textContent = "cached";
    cachedUrl.addEventListener("click", function(){
      window.open(properties.cachedUrl.replace("chrome-extension://", "http://"), "_blank");
    });
    actionContainer.appendChild(cachedUrl);
  };
  card.appendChild(actionContainer);
  
  if(properties.description){
    var description = document.createElement("article");
    description.innerHTML = properties.description;
    card.appendChild(description);
  };
  
  return card;
};