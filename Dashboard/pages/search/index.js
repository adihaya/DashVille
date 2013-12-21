var searchPage = {};

searchPage.focusSearchbox = function(){
  var element = document.querySelector("#searchPage .searchInput");
  focusSearchBox(element);
};

searchPage.frameUrls = {
  //web: "http://www.google.com/custom?q=",
  //images: "https://www.google.com/search?newwindow=1&igu=1&extension=blackMenu&safe=off&noj=0&tbm=isch&sout=1&q=",
  web: chrome.extension.getURL("/pages/search/web/index.html?q="),
  images: chrome.extension.getURL("/pages/search/images/index.html?q="),
  books: chrome.extension.getURL("/singlepage.html?page=books&q=")
};

searchPage.searchFilters = [
  {"service": "web", "search": "https://www.google.com/search?hl=[chromeLang]&q=[query]", "link": "https://www.google.com/webhp?hl=[chromeLang]", "name": "Web"},
  {"service": "images", "search": "https://www.google.com/search?tbm=isch&hl=[chromeLang]&q=[query]", "link": "https://www.google.com/imghp?hl=[chromeLang]", "name": "Images"},
  {"service": "books", "search": "https://www.google.com/search?tbm=bks&hl=[chromeLang]&q=[query]", "link": "http://books.google.com/books?hl=[chromeLang]", "name": "Books"},
  {"search": "https://www.google.com/search?tbm=shop&hl=[chromeLang]&q=[query]", "link": "https://www.google.com/shopping?hl=[chromeLang]", "name": "Shopping"},
  {"search": "https://www.google.com/search?tbm=vid&hl=[chromeLang]&q=[query]", "link": "https://www.google.com/videohp?hl=[chromeLang]", "name": "Videos"},
  {"search": "https://www.google.com/search?tbm=nws&hl=[chromeLang]&q=[query]", "link": "https://www.google.com/news?hl=[chromeLang]", "name": "News"},
  {"search": "https://www.google.com/search?tbm=plcs&hl=[chromeLang]&q=[query]", "link": "https://www.google.com/?tbm=plcs&hl=[chromeLang]", "name": "Places"},
  {"search": "https://www.google.com/search?tbm=blg&hl=[chromeLang]&q=[query]", "link": "https://www.google.com/blogsearch/?hl=[chromeLang]", "name": "Blogs"},
  {"search": "https://www.google.com/search?tbm=dsc&hl=[chromeLang]&q=[query]", "link": "https://www.google.com/?tbm=dsc&hl=[chromeLang]", "name": "Discussions"},
  {"search": "https://www.google.com/search?tbm=rcp&hl=[chromeLang]&q=[query]", "link": "https://www.google.com/webhp?tbm=rcp&hl=[chromeLang]", "name": "Recipes"},
  {"search": "https://www.google.com/search?tbm=pts&hl=[chromeLang]&q=[query]", "link": "https://www.google.com/?tbm=pts&hl=[chromeLang]", "name": "Patents"},
  {"search": "https://www.google.com/search?tbm=app&hl=[chromeLang]&q=[query]", "link": "https://www.google.com/?tbm=app&hl=[chromeLang]", "name": "Applications"},
  {"search": "https://www.google.com/flights/#search;hl=[chromeLang]&q=[query]", "link": "https://www.google.com/flights/?hl=[chromeLang]", "name": "Flights"}
];

searchPage.init = function() {
  var moreLinksGhostContainer = createMoreLinksGhostContainer(searchPage.toggleMoreMenu);
  document.getElementById("searchPage").appendChild(moreLinksGhostContainer);
  
  var searchBox = createSearchBox({
    "searchOnEnter": searchPage.loadIframes,
    "inputPmsg": "0",
    "stayOnPageOnEnter": true
  });
  document.getElementById("searchPage").appendChild(searchBox);
  
  var toolbar = searchPage.createToolbar();
  document.getElementById("searchPage").appendChild(toolbar);
  
  /*var content = searchPage.createIframe();
  document.getElementById("searchPage").appendChild(content);*/
  
  receiveParentMessage({"onPageFocus": focusMainSearchBox}); //from main.js
};

searchPage.createToolbar = function(){
  var toolbar = document.createElement("ul");
  toolbar.className = "toolbar toolbarTabs";
  
  var moreLinks = document.createElement("ul");
  moreLinks.className = "moreLinks";
  
  searchPage.searchFilters.forEach(function(searchFilter){
    var li = document.createElement("li");
    li.addEventListener("click", searchPage.searchFilterClick);
    li.dataset.search = searchFilter.search;
    li.dataset.link = searchFilter.link;
    if(searchFilter.service){
      li.dataset.service = searchFilter.service;
    };
    var span = document.createElement("span");
    span.textContent = searchFilter.name;
    li.appendChild(span);
    if(searchFilter.service){
      if(toolbar.children.length == 0){
        li.classList.add("on");
      };
      toolbar.appendChild(li);
    }
    else{
      moreLinks.appendChild(li);
    };
  });
  
  var moreButton = document.createElement("li");
  moreButton.className = "dropdown";
  moreButton.addEventListener("click", searchPage.toggleMoreMenu);
  var moreSpan = document.createElement("span");
  moreSpan.textContent = "More";
  moreButton.appendChild(moreSpan);
  toolbar.appendChild(moreButton);
  
  toolbar.appendChild(moreLinks);
  
  return toolbar;
};

searchPage.searchFilterClick = function(){
  if(this.dataset.service){
    if(this.classList.contains("on")){
      searchPage.openQueryInNewTab(this);
    }
    else {
      document.querySelector("#searchPage li.on").classList.remove("on");
      this.classList.add("on");
      searchPage.loadIframes();
      searchPage.displayFrame(this.dataset.service);
    };
  }
  else {
    searchPage.openQueryInNewTab(this);
  };
};

searchPage.displayFrame = function(service){
  var oldIframe = document.querySelector('#searchPage iframe.on');
  var newIframe = document.querySelector('#searchPage iframe[data-service="' + service + '"]');
  if(oldIframe != newIframe){
    if(oldIframe){
      oldIframe.classList.remove("on");
    };
    newIframe.classList.add("on");
  };
};

searchPage.createIframe = function(service, url, state) {
  var iframe = document.createElement("iframe");
  iframe.className = "content";
  if(state){
    iframe.classList.add("on");
  }
  iframe.src = url;
  iframe.dataset.toolbarCount = 2;
  iframe.dataset.service = service;
  return iframe;
};

searchPage.loadIframes = function() {
  var searchInput = document.querySelector("#searchPage .searchInput");
  var service = document.querySelector("#searchPage li.on").dataset.service;
  for (var i in searchPage.frameUrls){
    var url = searchPage.frameUrls[i] + searchInput.value;
    var iframe = document.querySelector('#searchPage iframe[data-service="' + i + '"]');
    if(iframe){
      if(iframe.src != url){
        iframe.src = url;
      };
    }
    else {
      document.getElementById("searchPage").appendChild(searchPage.createIframe(i, url));
    };
    
  };
  searchPage.displayFrame(service);
};

searchPage.toggleMoreMenu = function() {
  document.querySelector("#searchPage .moreLinks").classList.toggle("on");
  document.querySelector("#searchPage .moreLinksGhostContainer").classList.toggle("on");
};

searchPage.openQueryInNewTab = function(li){
  var query = document.querySelector("#searchPage .searchInput").value;
  var url = query ? li.dataset.search.replace("[query]", query) : li.dataset.link;
  url = url.replace("[chromeLang]", window.navigator.language);
  window.open(url);
};

if(document.body){
  searchPage.init();
}
else {
  window.addEventListener("DOMContentLoaded", searchPage.init);
};

/*
web
var xhr = new XMLHttpRequest()
xhr.open("GET", "http://www.google.com/custom?q=hoi")
xhr.addEventListener("load", function(){
var resultsCount = xhr.resposneText.split('<font size="-1">')[1].split("</font>")[0];
var div = document.createElement("div");
div.innerHTML = xhr.responseText.split("<ol")[1].split('list-style:none">')[1].split("</ol>")[0];
var elements = div.children;
[].forEach.call(elements, function(item){
var properties = {
"src": item.querySelector("h2>a").href,
"title": item.querySelector("h2>a").innerHTML,
"description": item.querySelector("table .s").innerHTML,
"origin": item.querySelector("table .a").innerHTML,
"cachedUrl": item.querySelector("nobr>a:first-child").href,
"similarUrl": item.querySelector("nobr>a:last-child").href
}
console.log(properties)
});
});
xhr.send();
*/

/*
images:
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.google.com/search?newwindow=1&igu=1&extension=blackMenu&safe=off&noj=0&tbm=isch&sout=1&q=hoi")
xhr.addEventListener("load", function(){
var resultsCount = xhr.responseText.split('id="resultStats">')[1].split("</div>")[0]
console.log(resultsCount);
var div = document.createElement("div")
div.innerHTML = xhr.responseText.split('id="ires">')[1].split("</div>")[0]
var elements = div.querySelectorAll("td");
[].forEach.call(elements, function(item){
var properties = {
"imgSrc": item.querySelector("img").src,
"url": item.querySelector("a").href,
"originShort": item.querySelector("cite").textContent,
"originLong": item.querySelector("cite").title,
"description": item.innerText.split("\n")[2],
"sizeAndType": item.innerText.split("\n")[3]
};
console.log(properties);
});
});
xhr.send()
*/