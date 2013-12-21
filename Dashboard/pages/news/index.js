var newsPage = {};

newsPage.defaultPreference = ["h", "w", "n", "b", "t", "e", "s", "m", "po"];

newsPage.preferenceStorage = localStorage.getItem("prefNewsSections");

newsPage.newsNames = {
  "h": "Top Stories",
  "w": "World",
  "n": "Your Country",
  "b": "Business",
  "t": "Sci/Tech",
  "e": "Entertainment",
  "s": "Sports",
  "m": "Health",
  "po": "Popular"
};

newsPage.init = function(){
  changeLoading("on", "news");
  
  var moreLinksGhostContainer = createMoreLinksGhostContainer(newsPage.toggleMoreMenu);
  document.getElementById("newsPage").appendChild(moreLinksGhostContainer);
  
  var searchBox = createSearchBox({
    "searchOnEnter": newsPage.search,
    "inputPmsg": 3,
    "stayOnPageOnEnter": true
  });
  document.getElementById("newsPage").appendChild(searchBox);
  
  var preference = newsPage.preferenceStorage ? (newsPage.preferenceStorage.replace("up_tabs=,", "").split(",")) : newsPage.defaultPreference;
  
  var tabBar = newsPage.createTabBar(preference);
  document.getElementById("newsPage").appendChild(tabBar);
  
  var newsContainer = newsPage.createNewsContainer();
  document.getElementById("newsPage").appendChild(newsContainer);
  
  receiveParentMessage({"onPageFocus": focusMainSearchBox}); //from main.js
  
  newsPage.refreshList({"sectionId": preference[0]});
};

newsPage.focusSearchbox = function(){
  var element = document.querySelector("#newsPage .searchInput");
  focusSearchBox(element);
};

newsPage.createNewsContainer = function(){
  var newsContainer = document.createElement("div");
  newsContainer.className = "content newsContainer";
  newsContainer.dataset.toolbarCount = "2";
  loadScrollShadow(newsContainer);
  return newsContainer;
};

newsPage.createTabBar = function(preference){
  var tabBar = document.createElement("ul");
  tabBar.className = "toolbar toolbarTabs mainLinks";
  
  var li = newsPage.newTabItem(preference[0]);
  li.classList.add("on");
  tabBar.appendChild(li);
  
  if(preference.length <= 4){
    tabBar.dataset.count = preference.length;
    for(var i = 1; i<preference.length; i++){
      var li = newsPage.newTabItem(preference[i]);
      tabBar.appendChild(li);
    };
  }
  else {
    for(var i = 1; i<3; i++){
      var li = newsPage.newTabItem(preference[i]);
      tabBar.appendChild(li);
    };
    var li = document.createElement("li");
    li.addEventListener("click", newsPage.toggleMoreMenu);
    li.classList.add("dropdown");
    var span = document.createElement("span");
    span.innerText = "More";
    li.appendChild(span);
    tabBar.appendChild(li);
    var ul = document.createElement("ul");
    ul.className = "moreLinks"
    for(var i = 3; i<preference.length; i++){
      var li = newsPage.newTabItem(preference[i]);
      ul.appendChild(li);
    };
    tabBar.appendChild(ul);
  };
  return tabBar;
};

newsPage.newTabItem = function(sectionId){
  var li = document.createElement("li");
  li.dataset.sectionId = sectionId;
  li.classList.add("searchFilter");
  li.addEventListener("click", function(){
    var oldActiveLi = document.querySelector("#newsPage .searchFilter.on");
    if(oldActiveLi){
      if(this.parentNode.classList.contains("moreLinks")){
        var container = document.querySelector("#newsPage .mainLinks");
        container.insertBefore(this, oldActiveLi);
        console.log(this.parentNode);
        document.querySelector("#newsPage .moreLinks").appendChild(oldActiveLi);
        newsPage.toggleMoreMenu();
      };
      oldActiveLi.classList.remove("on");
    };
    this.classList.add("on");
    newsPage.refreshList({"sectionId": this.dataset.sectionId});
  });
  var span = document.createElement("span");
  span.innerText = newsPage.newsNames[sectionId];
  li.appendChild(span);
  return li;
};

newsPage.createNewsItemElement = function(newsDetails) {
  var container = document.createElement("div");
  container.classList.add("card");
  var newsTop = document.createElement("header");
  if(newsDetails.img){
    var imageContainer = document.createElement("div");
    imageContainer.setAttribute("class", "imageContainer");
    var imageSubContainer = document.createElement("div");
    var image = document.createElement("img");
    image.src = newsDetails.img;
    imageSubContainer.appendChild(image);
    imageContainer.appendChild(imageSubContainer);
    newsTop.appendChild(imageContainer);
    newsTop.classList.add("hasImage");
  };
  var a = document.createElement("a");
  a.setAttribute("target", "_blank");
  a.setAttribute("href", newsDetails.url);
  var newsTitle = document.createElement("h3");
  newsTitle.textContent = newsDetails.title;
  a.appendChild(newsTitle);
  newsTop.appendChild(a);
  var newsProvider = document.createElement("h4")
  newsProvider.textContent = newsDetails.newsProvider;
  newsTop.appendChild(newsProvider);
  var description = document.createElement("article");
  description.textContent = newsDetails.description;
  container.appendChild(newsTop);	
  container.appendChild(description);
  return container;
};

newsPage.refreshList = function(data) {
  changeLoading("on", "news");
  var baseUrl = "https://news.google.com/news";
  var urlParameters = {
    "output": "rss",
    "topic": data.sectionId,
    "q": data.query
  };
  var completeUrl = baseUrl + createUrlParameters(urlParameters);
  
  var prefNewsEdition = localStorage.getItem("prefNewsEdition");
  
  if(prefNewsEdition){
    if(prefNewsEdition.indexOf("lang=") != -1){
      urlParameters.hl = prefNewsEdition.split("lang=")[1].split("&")[0];
    }
    if(prefNewsEdition.indexOf("country=") != -1){
      urlParameters.ned = prefNewsEdition.split("country=")[1].split("&")[0];
    };
  }
  else {
    urlParameters.hl = browserLang;
  };
  
  var xhr = new XMLHttpRequest();
  xhr.open("get", completeUrl , true);
  xhr.addEventListener("load", function(){
    newsPage.createList(xhr.responseXML)
  });
  xhr.send();
};

newsPage.toggleMoreMenu = function() {
  document.querySelector("#newsPage .moreLinks").classList.toggle("on");
  document.querySelector("#newsPage .moreLinksGhostContainer").classList.toggle("on");		
};

newsPage.createList = function(XMLDocument) {
  var newsContainer = document.querySelector("#newsPage .newsContainer");
  newsContainer.innerText = "";
  var items = XMLDocument.querySelectorAll("rss>channel>item");
  window.data =XMLDocument;
  [].forEach.call(items, function(newsItemData){
    var newsDetails = {};
    newsDetails.title = newsItemData.getElementsByTagName("title")[0].textContent.split(" - ")[0];
    newsDetails.url = newsItemData.getElementsByTagName("link")[0].textContent;
    var descriptionHTML = newsItemData.getElementsByTagName("description")[0].textContent;
    var descriptionData = document.createElement("div");
    descriptionData.innerHTML = descriptionHTML.replace(/src\=\"\//g, 'src="https://');
    if(descriptionData.getElementsByTagName("img")[0]){
      if(descriptionData.getElementsByTagName("img")[0].src){
        newsDetails.img = descriptionData.getElementsByTagName("img")[0].src;
      };
    };
    newsDetails.newsProvider = descriptionData.querySelector(".lh>font").textContent;
    newsDetails.description = descriptionData.querySelectorAll(".lh>font")[1] ? descriptionData.querySelectorAll(".lh>font")[1].textContent : undefined;
    var newsElement = newsPage.createNewsItemElement(newsDetails);
    newsContainer.appendChild(newsElement);
  });
  refreshScollShadow(document.querySelector("#newsPage .content"));
  changeLoading("off", "news");
};

newsPage.search = function(){
  var searchQuery = document.querySelector("#newsPage .searchInput").value;
  newsPage.refreshList({"query": searchQuery});
  
  var oldActiveLi = document.querySelector("#newsPage .searchFilter.on");
  if(oldActiveLi){
    oldActiveLi.classList.remove("on");
  };
};

if(document.body){
  newsPage.init();
}
else {
  window.addEventListener("DOMContentLoaded", newsPage.init);
};