if(location.href.indexOf("first_party_property=YOUTUBE") != -1){
  loadStyle("/pages/youtube/contentScripts/youtube_comments.css");
}
else{
  console.log("gplusComments")
  var count;
  loadStyle("/pages/gplus/contentScripts/gplus_comments.css");
  changeElements();
  plusOneListener();
  document.body.setAttribute("title", "");
};

function plusOneListener(){
  window.addEventListener('message', goToThing, false);
};

function goToThing(event) {
  if(event.data.blackMenuShareAction){
    parent.postMessage({"blackMenuShareAction": event.data.blackMenuShareAction}, '*');
  };
};

function loadStyle(url) {
  console.log("loadCommentsRestyle");
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute("href", chrome.extension.getURL(url));
  document.head.appendChild(link);
};

function changeElements() {
  var oldCommentsHeader = document.getElementsByClassName("DJa")[0];
  var container = document.querySelector("#widget_bounds>div:last-child");
  if(oldCommentsHeader && container){
    var commentsHeader = document.createElement("div");
    commentsHeader.id = "blackMenuCommentsHeader";
    
    var newCount = parseFloat(oldCommentsHeader.innerText.replace(".","").replace(",",""));
    count = !isNaN(newCount) ? newCount : count;
    
    //set favicon and description
    var encodedFaviconUrl = location.href.split("favicon=")[1].split("&")[0];
    var decodedFaviconUrl = decodeURIComponent(encodedFaviconUrl);
    var faviconUrl = decodedFaviconUrl != "undefined" ? decodedFaviconUrl : "http://www.google.com/images/icons/feature/globe-b16.png";			
    var title = decodeURIComponent(location.href.split("title=")[1].split("&")[0]);
    
    
    var url = decodeURIComponent(location.href.split("href=")[1].split("&")[0]);
    
    var div = document.createElement("div");
    div.id = "blackMenuCommentDescription";
    var img = document.createElement("img");
    img.setAttribute("src", faviconUrl);
    var p = document.createElement("p");
    p.innerText = title;
    div.appendChild(img);
    div.appendChild(p);
    div.setAttribute("title", url);
    commentsHeader.appendChild(div);
    
    var plusOneContainer = document.createElement("div");
    plusOneContainer.innerText = "loading...";
    plusOneContainer.id = "blackMenuPlusOneContainer";
    plusOneContainer.classList.add("g-plusone");
    plusOneContainer.dataset.annotation = "inline";
    plusOneContainer.dataset.width = "336";
    plusOneContainer.dataset.extension = "blackMenuCommentsPlusOne";
    plusOneContainer.dataset.href = url;
    commentsHeader.appendChild(plusOneContainer);
    
    var po = document.createElement("script");
    po.type = "text/javascript";
    po.async = true;
    po.src = "https://plus.google.com/js/plusone.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(po, s);
    
    //replace comments text
    var p = document.createElement("p");
    p.id = "sharedThisPageHeader";
    p.setAttribute("style", "color: #999;font-size: 16px;");
    p.textContent = isNaN(count) ? "nobody shared this page yet" : count + (count == 1 ? " other" : " others") + " shared this page";
    if(isNaN(count)){
      document.querySelector(".zPa.g9").setAttribute("style", "display: none !important;");
    };
    container.insertBefore(p, container.firstChild);
    container.insertBefore(commentsHeader, container.firstChild);
  }
  else {
    setTimeout(changeElements, 100);
  };
};