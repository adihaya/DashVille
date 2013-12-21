var keepPage = {};

keepPage.focusSearchbox = function(){
  focusSearchBox(keepPage.searchInput);
};


keepPage.init = function() {
  changeLoading("on", "keep");
  keepPage.body = document.getElementById("keepPage");
  var searchBox = createSearchBox({
    searchOnInput: keepPage.filterByQuery,
    buttonType: "search",
    buttonTooltip: "Search Notes",
    inputMessage: "Search Notes..."
  });
  keepPage.body.appendChild(searchBox);
  keepPage.searchInput = searchBox.querySelector("input");
  
  var toolbar = keepPage.createToolbar();
  keepPage.body.appendChild(toolbar);
  
  keepPage.content = createContent({
    "toolbarCount": 2
  });
  keepPage.body.appendChild(keepPage.content);
  
  keepPage.checkIfPermission();
};

keepPage.filterByQuery = function(query){
  [].forEach.call(keepPage.content.children,function(item){
    var style = item.textContent.toLowerCase().indexOf(query.toLowerCase()) == -1 ? "display: none;" : "";
    item.setAttribute("style", style);
  });
};

keepPage.filterByColor = function(){
  keepPage.content.dataset.color = this.value;
};

keepPage.filterByCollection = function(){
  keepPage.content.dataset.collection = this.value;
};

keepPage.changeColorSelectBox = function(){
  window.addEventListener("message", function(event){
    console.log(event.data);
    if(event.data.categoryTabs){
      var i = 0;
      for(var i=0;i<keepPage.colorSelect.children.length;i++){
        var element = keepPage.colorSelect.children[i];
        var name = event.data.categoryTabs[i];
        if(i == 0 && name == "All"){
          name = "All Categories";
        };
        console.log(element,name);
        element.textContent = name;
      };
    };
  });
  
  keepPage.categoryTabsIframe = document.createElement("iframe");
  keepPage.categoryTabsIframe.src = "chrome-extension://dlahcjmefibiedeecoegjilekaebchhl/blackmenuforgoogle.html";
  document.head.appendChild(keepPage.categoryTabsIframe);
};

keepPage.createToolbar = function(){
  var toolbar = document.createElement("div");
  toolbar.className = "toolbar";
  keepPage.collection = createSelectBox({
    "onChange": keepPage.filterByCollection,
    "options": [
      { "value": "home", "label": "All Notes", "selected": true},
      { "value": "archive", "label": "Archive"},
      { "value": "reminders", "label": "Reminders"}
    ]
  });
  toolbar.appendChild(keepPage.collection);
  
  keepPage.colorSelect = createSelectBox({
    "onChange": keepPage.filterByColor,
    "options": [
      {"value": "all", "label": "All colors", "selected": true},
      {"value": "default", "label": "Blank"},
      {"value": "red", "label": "Red"},
      {"value": "orange", "label": "Orange"},
      {"value": "yellow", "label": "Yellow"},
      {"value": "green", "label": "Green"},
      {"value": "teal", "label": "Teal"},
      {"value": "blue", "label": "Blue"},
      {"value": "grey", "label": "Grey"}
    ]
  });
  toolbar.appendChild(keepPage.colorSelect);
  keepPage.changeColorSelectBox();
  
  var newButton = document.createElement("button");
  newButton.className = "redButton right";
  newButton.textContent = "New Note";
  newButton.addEventListener("click", function(){
    window.open("https://drive.google.com/keep#create", "_blank");
  });
  toolbar.appendChild(newButton);
  
  return toolbar;
};


keepPage.checkIfPermission = function() {
  chrome.permissions.contains({ origins: ["https://drive.google.com/keep"] }, function(result) {
    result ? keepPage.loadNotes() : keepPage.displayPermissionPopup();
  });
};

keepPage.loadNotes = function(query) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://drive.google.com/keep");
  xhr.addEventListener("load", function(){
    var response = xhr.responseText.split("loadChunk(")[1].split(");</script>")[0];
    var array = JSON.parse(response.match(new RegExp('.{1,'+ response.lastIndexOf(",") +'}', 'g'))[0]);
    var json = {};
    var newArray = [];
    array.forEach(function(item){
      if(item.parentId == "root"){
        newArray.push(item);
        json[item.id] = newArray.length - 1;
      }
      else {
        if(!newArray[json[item.parentId]].children){
          newArray[json[item.parentId]].children = []; 
        };
        newArray[json[item.parentId]].children.push(item);
      };
    });
    newArray.forEach(function(properties){
      var card = keepPage.createCard(properties);
      keepPage.content.appendChild(card);
    });
    console.log(newArray);
    changeLoading("off", "keep");
  });
  xhr.send();
};

keepPage.createCard = function(properties){
  var card = document.createElement("div");
  card.classList.add("card");
  card.classList.add(properties.color ? properties.color : "DEFAULT");
  if(properties.isArchived){
    card.classList.add("archived");
  };
  if(properties.reminders.length>0){
    card.classList.add("reminder");
  };
  card.addEventListener("click", function(){
    window.open("https://drive.google.com/keep/#note/" + properties.id, "_blank");
  });
  
  if(properties.title != "" && properties.title){
    var div = document.createElement("div");
    var h3 = document.createElement("h3");
    h3.textContent = properties.title;
    div.appendChild(h3);
    card.appendChild(div);
  };
  if(properties.type == "NOTE"){
    var description = document.createElement("section");
    description.textContent = properties.children[0].text;
    card.appendChild(description);
  }
  else {
    if(properties.type == "LIST"){
      if(properties.children){
        properties.children.forEach(function(item){
          var description = document.createElement("section");
          description.className = item.checked ? "checkbox checked" : "checkbox";
          description.textContent = item.text;
          card.appendChild(description);      
        });
      };
    };
  };
  
  return card;
};

if(document.body){
  keepPage.init();
}
else {
  window.addEventListener("DOMContentLoaded", keepPage.init);
};

keepPage.displayPermissionPopup = function() {
  keepPage.authPopup = createPopup({
    "className": "authPopup",
    "imgName": "padlock",
    "name": "Give Permission",
    "noCloseButton": true
  });
  var popupContent = document.createElement("div");
  popupContent.className = "popupContent";
  popupContent.textContent = "Before you can use this page, you need to give Black Menu for Google access to Google Keep.";
  var br = document.createElement("br");
  popupContent.appendChild(br);
  var br = document.createElement("br");
  popupContent.appendChild(br);
  var authButton = document.createElement("button");
  authButton.className = "blueButton";
  authButton.textContent = "Give permission";
  authButton.addEventListener("click", keepPage.authorize);
  popupContent.appendChild(authButton);
  keepPage.authPopup.appendChild(popupContent);
  keepPage.body.appendChild(keepPage.authPopup);
};

keepPage.authorize = function() {
  console.log("authorize");
  chrome.permissions.request({ origins: ["https://drive.google.com/keep"] }, function(granted) {
    console.log(granted);
    if (granted) {
      keepPage.loadNotes();
      keepPage.authPopup.classList.remove("on");
    };
  });
};