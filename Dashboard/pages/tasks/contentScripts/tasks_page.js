var stylePath = chrome.extension.getURL("/pages/tasks/contentScripts/tasks_page.css");
var link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("type", "text/css");
link.setAttribute("href", stylePath);

document.addEventListener("readystatechange", prepareStyle);

function prepareStyle() {
  if(document.readyState === "complete"){
    setStyle();
  }
  else {
    document.addEventListener("load", setStyle);
  };
};

function setStyle() {
  var tasks = document.getElementsByTagName("iframe")[0];
  if (!tasks) {
    setTimeout(setStyle, 0);
  }
  else {
    tasks.contentDocument.head.appendChild(link);
    tasks.contentDocument.body.appendChild(createSearchBox());
  };
};


function createSearchBox() {
  var searchContainer = document.createElement("div");
  searchContainer.className = "toolbar searchBox";
  
  var searchInput = document.createElement("input");
  searchInput.className = "searchInput";
  searchInput.type = "search";
  searchInput.placeholder = "Search your tasks";
  searchInput.addEventListener("input", function(){
    var doc = document.getElementsByTagName("iframe")[0].contentDocument;
    var i = 1;
    var query = this.value;
    var queryLC = query.toLowerCase();
    
    while(!doc.getElementById(i.toString())){
      i++
    };
    
    while(doc.getElementById(i.toString())){
      var element = doc.getElementById(i.toString());
      if(element.textContent.toLowerCase().indexOf(queryLC) != -1){
        element.setAttribute("style", "display: table-row !important;");
      }
      else {
        element.setAttribute("style", "display: none !important;");
      };
      i++
    };
    
  });
  
  window.addEventListener("message", function() {
	var message = event.data;
	if(message == "focusSearchbox"){
		searchInput.focus();
		};
	});
  
  var searchButton = document.createElement("button");
  searchButton.className = "blueButton searchButton";
  
  searchContainer.appendChild(searchInput);
  searchContainer.appendChild(searchButton);
  
  return searchContainer;
};