var browserLang = window.navigator.language;
var extensionId = chrome.i18n ? chrome.i18n.getMessage("@@extension_id") : "eignhdfgaldabilaaegmdfbajngjmoke";
var isOpera = window.navigator.userAgent.indexOf("OPR") != -1;
var browser = chrome;

function isKey(key){
  return event.keyCode == key;
};

function i18n(id, message){
  try {
    return chrome.i18n.getMessage(id);
  }
  catch(err) {
    if(!message || message != ""){
      return "placeholder";
    }
    else {
      return message;
    };
  };
};

var storage = {
  "get": function(storageValue, defaultValue){
    var value = localStorage.getItem(storageValue);
    if(defaultValue){
      if(!value || value == ""){
        return defaultValue;
      };
    };
    try{
      return JSON.parse(value);
    }
    catch(err){
      return value;
    };
  },
  "set": function(storageValue, value){
    localStorage.setItem(storageValue, JSON.stringify(value));
  }
};

String.prototype.capitalize = function(){
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function createMoreLinksGhostContainer(clickFunction){
  var moreLinksGhostContainer = document.createElement("div");
  moreLinksGhostContainer.className = "moreLinksGhostContainer";
  if(clickFunction){
    moreLinksGhostContainer.addEventListener("click", clickFunction);
  };
  return moreLinksGhostContainer;
};

function createContent(properties){
  /* properties = {
    "iframeSrc": url, //optional
    "toolbarCount": number, //optional
    "noContentShadow": boolean,  //optional 
    "onScrollBottom": function, //optional
  } */
  var tag = (properties.iframe || properties.iframeSrc) ? "iframe" : "div";
  var content = document.createElement(tag);
  content.className = "content";
  if(properties.iframeSrc){
    content.setAttribute("src", properties.iframeSrc);
  };
  if(properties.toolbarCount){
    content.dataset.toolbarCount = properties.toolbarCount;
  };
  if(!properties.noContentShadow && !properties.iframe){
    loadScrollShadow(content);
  };
  if(properties.onScrollBottom){
    content.addEventListener("scroll", function(){
      if(this.scrollTop + this.offsetHeight == this.scrollHeight){
        properties.onScrollBottom();
      };
    });
  };

  return content;
};

function createLinksSection(properties){
  var linksSection = document.createElement("div");
  linksSection.className = "linksSection";
  linksSection.addEventListener("mouseover", function(){
    if(this.style.maxHeight == "45px"){
      this.removeAttribute("style");
    };
  });
  if(properties.onMouseEnter){
    linksSection.addEventListener("mouseenter", properties.onMouseEnter);
  };
  var header = document.createElement("div");
  header.setAttribute("class", "headerButton");
  header.dataset.state = "off";
  header.addEventListener("click", function(i){
    this.parentNode.style.maxHeight = "45px";
  });
  var p = document.createElement("p");
  p.textContent = properties.name ? properties.name : i18n("msg26");
  header.appendChild(p);
  var arrowElement;
  var arrowIcon = createIcon({
    "name": "arrow_up",
    "size": 32
  });
  if(arrowIcon.tagName == "IMG"){
    arrowElement = document.createElement("span");
    arrowElement.appendChild(arrowIcon);
  }
  else {
    arrowElement = arrowIcon;
  };
  header.appendChild(arrowElement);
  
  linksSection.appendChild(header);
  return linksSection;
};

function createPopup(properties){
  /*properties = {
    "className": string,
    "imgName": string,
    "imgUrl": url,
    "name": string,
    "noCloseButton": boolean,
   }*/
   var popup = document.createElement("div");
  if(properties.className){
    popup.className = properties.className;
  };
  popup.classList.add("on");
  popup.classList.add("popup");
  var popupHeader = document.createElement("header");
  popupHeader.className = "popupHeader";
  if(properties.imgName || properties.imgUrl){
    var imgContainer = document.createElement("span");
    var img = createIcon({
      "src": properties.imgUrl ? properties.imgUrl : undefined,
      "name": properties.imgName,
      "size": 32  
    });
    imgContainer.appendChild(img);
    popupHeader.appendChild(imgContainer);
  }
  var name = document.createElement("p");
  name.textContent = properties.name ? properties.name : "";
  popupHeader.appendChild(name);
  if(!properties.noCloseButton){
    /*
    popup.setAttribute("tabindex", 0);
    popup.addEventListener("blur", function(){
      this.classList.remove("on");
    });
    */
    var closeButton = document.createElement("span");
    closeButton.className = "closePopup";
    closeButton.addEventListener("click", function(){
      this.parentNode.parentNode.classList.remove("on");
    });
    popupHeader.appendChild(closeButton);
  };
  popup.appendChild(popupHeader);
  return popup;
};

function createCardHeader(properties){
  var cardHeader = document.createElement("div");
  cardHeader.className = "cardHeader";
  cardHeader.textContent = properties.name;
  return cardHeader;
};

function createShortcutList(links, searchBox, onClick){
  var ul = document.createElement("div");
  ul.setAttribute("class", "buttonList card");
  ul.dataset.searchBox = searchBox;

  function clickFunction(){
    var url;
    if(this.dataset.search){
      var searchQuery = searchBox ? searchBox.value : null;
      url = searchQuery ? this.dataset.search.replace("[query]",encodeURIComponent(searchQuery)) : this.dataset.link;
    }
    else{
      url = this.dataset.link;
    };
    url.replace("[browserLang]",browserLang);
    window.open(url, "_blank");
  };
  
  links.forEach(function(item){
    if(item.i18n){
      console.log(i18n("msg" + item.i18n));
    };
    var properties = {
      "name": item.name ? item.name : i18n("msg" + item.i18n),
      "imgName": item.icon ? item.icon : item.imgName,
      "searchUrl": item.search,
      "linkUrl": item.link,
      "clickFunction": onClick ? onClick : clickFunction
    };
    
    ul.appendChild(createShortcut(properties));
  });
  
  return ul;
};

function createShortcut(properties){
  /* properties = {
  "name" : string (name),
  "i18n" : string,
  "imgSrc": string (path),
  "imgName": string (name),
  "id": string (name),
  "searchUrl": string (url),
  "linkUrl": string (url),
  "clickFunction": function,
  "tooltip": something,
  }*/
  var li = document.createElement("li");
  if(properties.id){
    li.dataset.id = properties.id;
  };
  if(properties.searchUrl){
    li.dataset.search = properties.searchUrl;
  };
  if(properties.linkUrl){
    li.dataset.link = properties.linkUrl;
  };
  if(properties.tooltip){
    li.setAttribute("tooltip", properties.tooltip);
  };
  var clickFunction = properties.clickFunction ? properties.clickFunction : (properties.linkUrl ? function(){window.open(this.dataset.link, "_blank")} : undefined);
  if(clickFunction){
    li.addEventListener("click", clickFunction);
  };
  
  var divImg = document.createElement("div");
  var img = createIcon({
    "src": properties.imgSrc ? properties.imgSrc : undefined,
    "name": properties.imgName,
    "size": 32  
  });
  divImg.appendChild(img);
  li.appendChild(divImg);
  
  var divP = document.createElement("div");
  var p = document.createElement("p");
  p.textContent = properties.i18n ? i18n(properties.i18n) : properties.name;
  divP.appendChild(p);
  li.appendChild(divP);
  
  return li;
  
};

function createIcon(properties){
  /* var properties = {
    "name": string, //optional
    "src": url,
    "size": size
  }*/
  if(properties.src){
    var img = document.createElement("img");
    img.setAttribute("src", properties.src);
    return img;  
  }
  else {
    var img = document.createElement("img");
    if(!properties.size){
      properties.size = 32;
    };
    var color = properties.color ? properties.color : "";
    var src = "/images/" + properties.size + "/" + properties.name + "-" + color + properties.size + ".png";
    img.setAttribute("src", src);
    return img;
  };
};

function receiveParentMessage(functions) {
  window.addEventListener("message", function() {
    var message = event.data;
    if(message == "focusSearchbox"){
      if(functions.onPageFocus){
        functions.onPageFocus();
      };
    };
  });
};

function createSearchBox(properties) {
  /*var properties = {
    searchOnEnter: function,
    searchOnInput: function,
    buttonType: string,
    buttonTooltip: string,
    inputPmsg: number,
    inputMessage: string,
    inputId: string,
    autoComplete: boolean,
    withBottomBorder: boolean,
    noClearButton: boolean,
    stayOnPageOnEnter: boolean
    }*/
  
  var searchContainer = document.createElement("div");
  searchContainer.className = "toolbar searchBox";
  if(properties.withBottomBorder){
    searchContainer.classList.add("noSecondTopToolbar");
  };
  var searchInput = document.createElement("input");
  searchInput.className = "searchInput";
  if(properties.inputId){
    searchInput.id = properties.inputId;
  };
  searchInput.type = properties.noClearButton ? "text" : "search";
  searchInput.autocomplete = properties.autoComplete ? "on" : "off";
  var placeholder = properties.inputPmsg ? chrome.i18n.getMessage("pmsg" + properties.inputPmsg) : properties.inputMessage; 
  searchInput.placeholder = placeholder;
  
  var searchButton = document.createElement("button");
  searchButton.className = "blueButton searchButton";
  searchButton.dataset.type = properties.buttonType;
  if(properties.buttonTooltip){
    searchButton.title = properties.buttonTooltip;
  };
  if(properties.searchOnInput){
    searchInput.addEventListener("input", function(){	 
      properties.searchOnInput(searchInput.value);
    });
  };
  if(properties.searchOnEnter){
    searchButton.addEventListener("click", function(){
      properties.searchOnEnter(searchInput.value);
    });
    if(properties.stayOnPageOnEnter){
      searchInput.addEventListener("search", function(){
        properties.searchOnEnter(searchInput.value);
      });
    }
    else {
      searchInput.addEventListener("keyup", function(evt){
        if(evt.keyCode == 13){
          properties.searchOnEnter(searchInput.value);
        };
      });
    }
  };
  
  searchContainer.appendChild(searchInput);
  searchContainer.appendChild(searchButton);
  
  return searchContainer;
};

function focusSearchBox(element){
  if(element.tagName === "IFRAME"){
    element.contentWindow.postMessage("focusSearchbox", element.getAttribute("src"));
  }
  else {
    element.focus()
  };
};

function refreshScollShadow(element) {
  var scrollTop = element.scrollTop;
  var currentScrollHeight = scrollTop + element.offsetHeight;
  var totalScrollHeight = element.scrollHeight;
  applyScrollShadow("bottom", currentScrollHeight == totalScrollHeight ? "remove" : "add", element);
  applyScrollShadow("top", scrollTop == 0 ? "remove" : "add", element);
};

function applyScrollShadow(type, condition, element) {
  element.classList[condition](type + "Shadow");
};

function loadScrollShadow(element) {
  element.addEventListener("scroll", function(){
    refreshScollShadow(this);
  });
};

function changeLoading(state, pageName){
console.log(pageName);
  var ele = pageName ? (document.body.id == "body" ? document.getElementById(pageName + "Page") : document.body) : document.body;
  ele.classList[state == "on" ? "add" : "remove"]("loading");
};

function createUrlParameters(object){
  var urlParameters = "";
  for(var i in object){
    if((object[i] != undefined) && (object[i] != "undefined") && (object[i] != null)){
      urlParameters += ((urlParameters.indexOf("?") == -1) ? "?" : "&") + i + "=" + object[i];
    };
  };
  return urlParameters;
};

function createSelectBox(properties){
  var selectBox = document.createElement("select");
  if(properties.id){
    selectBox.id = properties.id;
  };
  selectBox.addEventListener("change", properties.onChange);
  properties.options.forEach(function(item){
    var option = document.createElement("option");
    option.textContent = item.label;
    option.setAttribute("value", item.value);
    if(item.selected){
      option.setAttribute("selected", "true")
    }
    selectBox.appendChild(option);
  });
  return selectBox;
};

function focusIframeSearchBox() { console.log("outdated function"); };
function focusMainSearchBox() { console.log("outdated function"); };
function loadLinksSections() { console.log("outdated function"); };
function loadMainSearchBox() { console.log("outdated function"); };
function loadSearchFilters() { console.log("outdated function"); };
function setDocumentTitle() { console.log("Outdated Function"); };
function loadSearchBox() { console.log("outdated function"); };
function setTitle() { console.log("outdated function"); };