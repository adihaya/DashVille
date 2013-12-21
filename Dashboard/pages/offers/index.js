offersPage = {};

offersPage.focusSearchbox = function(){
  var element = document.querySelector("#offersPage .searchInput");
  focusSearchBox(element);
};

offersPage.init = function(){
  var searchBox = createSearchBox({
    searchOnEnter: offersPage.loadQueryInNewTab,
    buttonType: "search",
    buttonTooltip: "Search Google Offers in a new tab",
    inputMessage: "Search google offers in a new tab..."
  });
  document.getElementById("offersPage").appendChild(searchBox);
  
  var iframe = offersPage.createIframe();
  document.getElementById("offersPage").appendChild(iframe);
};

offersPage.createIframe = function(){
  var url = "https://www.google.com/offers/m?gl=US#category";
  var iframe = document.createElement("iframe");
  iframe.dataset.toolbarCount = 1;
  iframe.className = "content";
  iframe.src = url;
  return iframe;
};

offersPage.loadQueryInNewTab = function(){
  var query = document.querySelector("#mainSearchBox>.searchInput").value;
  var url = "https://www.google.com/offers/search?q=" + query;
  window.open(url, "_blank");
};

if(document.body){
  offersPage.init();
}
else {
  window.addEventListener("DOMContentLoaded", offersPage.init);
};