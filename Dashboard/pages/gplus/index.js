var gplusPage = {};

gplusPage.pages = {
  "comments": {"name": "Share this page"},
  "sharebox": {"name": "New Post", "iframe": true},
  "notifications": {"name": "Notifications", "iframe": true}
};

gplusPage.focusSearchbox = function(){
  focusSearchBox(gplusPage.searchInput);
};

gplusPage.init = function() {
  gplusPage.body = document.getElementById("gplusPage");
  var searchBox = createSearchBox({
    "searchOnEnter": gplusPage.loadQueryInNewTab,
    "searchOnInput": gplusPage.openLinksSectionAfterSearch,
    "inputPmsg": 1
  });
  gplusPage.body.appendChild(searchBox);
  gplusPage.searchInput = searchBox.querySelector("input");
  
  var toolbar = gplusPage.createToolbar();
  gplusPage.body.appendChild(toolbar);
  
  var content = gplusPage.createContent();
  gplusPage.body.appendChild(content);
  
  gplusPage.loadDefaultPage();
  
  var linksSection = createLinksSection({"onMouseEnter": gplusPage.loadLinksSection, "name": i18n("msg189")});
  linksSection.dataset.state = "link";
  gplusPage.body.appendChild(linksSection);
};

gplusPage.createToolbar = function(){
  var ul = document.createElement("ul");
  ul.className = "toolbar toolbarTabs";
  ul.dataset.count = 3;
  for(var i in gplusPage.pages){
    var li = document.createElement("li");
    li.className = i + "Button";
    li.addEventListener("click", function(){
      gplusPage.displayPage(this.className.split("Button")[0]);
    });
    var span = document.createElement("span");
    span.textContent = gplusPage.pages[i].name;
    li.appendChild(span);
    ul.appendChild(li);
  };
  return ul;
};

gplusPage.createContent = function(){
  var div = document.createElement("div");
  div.className = "content";
  div.dataset.toolbarCount = 3;
  for(var i in gplusPage.pages){
    var element = document.createElement(gplusPage.pages[i].iframe ? "iframe" : "div");
    element.className = i;
    div.appendChild(element);
  };
  return div;
};
gplusPage.loadLinksSection = function(){
  if(!gplusPage.linksSectionLoaded){
    gplusPage.linksSectionLoaded = true;
    var links = [
      {"name": i18n("msg30"), "search": "https://plus.google.com/s/[query]", "imgName": "gplus_home"},
      {"name": i18n("msg33"), "search": "https://plus.google.com/s/[query]/posts", "imgName": "gplus_home"},
      {"name": i18n("msg37"), "link": "https://plus.google.com/stream", "imgName": "gplus_home"},
      {"name": i18n("msg39"), "link": "https://plus.google.com/me", "imgName": "gplus_profile"},
      {"name": "People", "link": "https://plus.google.com/people", "search": "https://plus.google.com/people/search/[query]", "imgName": "gplus_circles"},
      {"name": i18n("msg35"), "search": "https://plus.google.com/s/[query]/people", "imgName": "gplus_circles"},
      {"name": i18n("msg44"), "link": "https://plus.google.com/photos", "search": "https://plus.google.com/s/[query]/photos", "imgName": "gplus_photos"},
      {"name": "What's Hot", "link": "https://plus.google.com/explore", "imgName": "gplus_whatshot"},
      {"name": i18n("msg31"), "link": "https://plus.google.com/communities", "search": "https://plus.google.com/s/[query]/communities", "imgName": "gplus_communities"},
      {"name": i18n("msg32"), "link": "https://plus.google.com/events", "search": "https://plus.google.com/s/[query]/events", "imgName": "gplus_events"},
      {"name": "Hangouts On Air", "link": "https://plus.google.com/hangouts", "search": "https://plus.google.com/s/[query]/hangouts", "imgName": "gplus_hangouts"},
      {"name": i18n("msg38"), "link": "https://plus.google.com/pages/manage", "imgName": "gplus_pages"},
      {"name": i18n("msg43"), "link": "https://plus.google.com/local", "search": "https://plus.google.com/local/s/[query]", "imgName": "gplus_local"},
      {"name": "Notifications", "link": "https://plus.google.com/notifications/", "imgName": "gplus_notifications"},
      {"name": "Settings", "link": "https://plus.google.com/settings/plus/", "imgName": "gs-settings"}
    ];
    document.querySelector("#gplusPage .linksSection").appendChild(createShortcutList(links, "gplusPageSearchBox"));
  };
};

gplusPage.loadDefaultPage = function() {
  var defaultPage = storage.get("prefGplusDefaultpage", "comments");
  gplusPage.displayPage(defaultPage);
};

gplusPage.loadQueryInNewTab = function() {
  window.open("https://plus.google.com/s/" + gplusPage.searchInput.value, "_blank");
};

gplusPage.openLinksSectionAfterSearch = function() {
  var linksSection = document.getElementsByClassName("linksSection")[0];
  if(this.value == ""){
    linksSection.setAttribute("style","max-height: 45px");
    linksSection.dataset.state = "link";
  }
  else {
    gplusPage.loadLinksSection();
    linksSection.setAttribute("style","max-height: 440px");
    linksSection.dataset.state = "search";
  };
};

gplusPage.displayPage = function(type) {
  if(document.querySelector("#gplusPage ." + type) != document.querySelector("#iframeContainer>.on")){
    if(document.querySelector("#gplusPage .content>.on")){
      document.querySelector("#gplusPage .content>.on").classList.remove("on");
    };
    document.querySelector("#gplusPage ." + type).classList.add("on");
    if(document.querySelector("#gplusPage .toolbar>li.on")){
      document.querySelector("#gplusPage .toolbar>li.on").classList.remove("on");
    };
    document.querySelector("#gplusPage ." + type + "Button").classList.add("on");
    if(!gplusPage.pages[type].loaded){
      gplusPage.loadFrame(type);
    };
  };
};

/**
 *	notifications and sharebox (new post)
 */

gplusPage.loadFrame = function(type, url) {
  if(type == "notifications" || type == "sharebox"){
    document.querySelector("#gplusPage ." + type).src = "https://www.google.com/blackmenu/gplus/" + Date() + "/?extension=blackMenu&page=" + type + "&url=" + url;
  }
  else {
    gplusPage.getActiveTab();
  };
  gplusPage.pages[type].loaded = true;
};

/**
 *	comments
 */

gplusPage.getActiveTab = function() {
  chrome.tabs.query({"currentWindow": true, "active": true}, gplusPage.checkIfCommentsShouldBeLoaded);
  //setTimeout(gplusPage.getActiveTab, 500);
};

gplusPage.checkIfCommentsShouldBeLoaded = function(tabArray) {
  var tab = tabArray[0];
  var url = tab.url;
  if(url != gplusPage.activeTabUrl){
    gplusPage.activeTabUrl = tab.url;
    var favicon = tab.favIconUrl;
    var title = tab.title;
    if(url){
      if((url.indexOf("http://") != -1) || (url.indexOf("https://") != -1)){
        gplusPage.loadComments(url,favicon,title);
        return;
      }
      else {
        gplusPage.commentsError();
      };
    };
  };
};

gplusPage.commentsError = function(){
  var comments = document.querySelector("#gplusPage .comments");
  comments.innerHTML = "<div><br><br><br><img src='/images/frown_cloud.png'><br>" + 
    "<div class='cardHeader centered'>Sorry, you can't share this page</div></div>";
};

gplusPage.loadComments = function(url, favicon, title) {
  console.log("loadingComments...");
  
  document.querySelector("#gplusPage .comments").textContent = "";
  var container = document.createElement("div");
  document.querySelector("#gplusPage .comments").appendChild(container);
  
  if(!document.getElementById("gplusapi")){
    var script = document.createElement("script");
    script.addEventListener("load", function(){
      gapi.comments.render(
        document.querySelector("#gplusPage .comments div"), {
          "href": url,
          "width": 400,
          "first_party_property": "BLOGGER",
          "view_type": "FILTERED_POSTMOD",
          "extension": "blackMenu",
          "favicon": favicon,
          "title": title
        });
    });
    script.textContent = "{parsetags: 'explicit'}";
    script.setAttribute("gapi_processed", "true");
    script.setAttribute("src", "https://apis.google.com/js/plusone.js");
    document.head.appendChild(script);
  }
  else {
    gapi.comments.render(
      document.querySelector("#gplusPage .comments div"), {
        "href": url,
        "width": 400,
        "first_party_property": "BLOGGER",
        "view_type": "FILTERED_POSTMOD",
        "extension": "blackMenu",
        "favicon": favicon,
        "title": title
      }
    );
  };
  
  window.addEventListener("message", gplusPage.openShareboxWithUrl, false);
};

gplusPage.openShareboxWithUrl = function(event) {
  if(event.data.blackMenuShareAction){
    console.log(event.data.blackMenuShareAction);
    gplusPage.loadFrame("sharebox", event.data.blackMenuShareAction);
    gplusPage.displayPage("sharebox");
  };
};

if(document.body){
  gplusPage.init();
}
else {
  window.addEventListener("DOMContentLoaded", gplusPage.init);
};