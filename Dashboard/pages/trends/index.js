var trendsPage = {};

trendsPage.focusSearchbox = function(){
  focusSearchBox(trendsPage.searchInput);
};

trendsPage.init = function(){
  trendsPage.body = document.getElementById("trendsPage");
  var searchBox = createSearchBox({
    "searchOnEnter": trendsPage.openQueryInNewTab,
    "inputMessage": "Search trends in a new tab..."
  });
  trendsPage.body.appendChild(searchBox);
  trendsPage.searchInput = searchBox.querySelector("input");
  
  trendsPage.content = createContent({
    "iframeSrc": "https://www.google.com/trends/hottrends/gadget?tn=5001&pn=p1&hl=en",
    "toolbarCount": 1
  });
  trendsPage.body.appendChild(trendsPage.content);
};

trendsPage.openQueryInNewTab = function(){
  var query = trendsPage.searchInput.value;
  var url = "http://www.google.com/trends/explore?q=" + encodeURI(query);
  window.open(url, "_blank");
};

if(document.body){
  trendsPage.init();
}
else {
  window.addEventListener("DOMContentLoaded", trendsPage.init);
};