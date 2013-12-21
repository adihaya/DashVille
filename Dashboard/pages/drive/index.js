var drivePage = {};

drivePage.extensionIds = {
  eignhdfgaldabilaaegmdfbajngjmoke: "494086030851-cj38b8lptkkqmidj2ot5m3mdodkoi0ab.apps.googleusercontent.com", //black menu stable
  mcehjneglbcohdablcifclpeaokebamb: "494086030851-n38sop51kh4bqibjgv82run5n5t362g4.apps.googleusercontent.com", //black menu dev
  aiepgcafnknjemheekgibknomfihkldd: "494086030851-iekugobhf4tjnun1b2ul7j3p6ov8te6b.apps.googleusercontent.com", //black menu carlos-only
};
drivePage.clientId = drivePage.extensionIds[extensionId];
drivePage.scopes = "https://www.googleapis.com/auth/drive";
drivePage.firstLoad = true;
drivePage.currentDate = new Date();
drivePage.currentDateArray = [
  drivePage.currentDate.getFullYear(),
  drivePage.currentDate.getMonth(),
  drivePage.currentDate.getDate()
];

drivePage.focusSearchbox = function(){
  focusSearchBox(drivePage.searchInput);
};

drivePage.monthNames = [
  "Jan",
  "Feb",
  "Mrt",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

function drivePageApiClientOnLoad(){
  drivePage.checkAuth();
};

drivePage.init = function() {
  changeLoading("on", "drive");
  
  drivePage.body = document.getElementById("drivePage");
  var searchBox = createSearchBox({
    "searchOnEnter": drivePage.updateList,
    "inputPmsg": 9,
    "stayOnPageOnEnter": true
  });
  drivePage.searchInput = searchBox.querySelector("input");
  drivePage.body.appendChild(searchBox);
  
  var toolbar = drivePage.createToolbar();
  drivePage.body.appendChild(toolbar);
  
  drivePage.content = createContent({
    "toolbarCount": 3,
    "onScrollBottom": drivePage.loadMoreItems
  });
  drivePage.body.appendChild(drivePage.content);
  
  drivePage.fileList = drivePage.createFilelist();
  drivePage.content.appendChild(drivePage.fileList);
  
  drivePage.moreResultsButton = drivePage.createMoreResultsButton();
  drivePage.content.appendChild(drivePage.moreResultsButton);
  
  drivePage.linksSection = createLinksSection({
    "onMouseEnter": drivePage.loadLinksSection
  });
  drivePage.body.appendChild(drivePage.linksSection);
  
  drivePage.loadApiClient();
  
  chrome.storage.local.get("driveCache", function(item) {
    console.log(item.driveCache);
    if(item.driveCache){
      drivePage.loadItems(item.driveCache, undefined, true);
    };
  });
};

drivePage.createToolbar = function(){
  var toolbar = document.createElement("div");
  toolbar.className = "toolbar";
  drivePage.fileLocation = createSelectBox({
    "onChange": drivePage.updateList,
    "options": [
      { "value": "", "label": "All Files", "selected": true},
      { "value": "trashed", "label": "Trashed"},
      { "value": "starred", "label": "Starred"},
      { "value": "sharedWithMe", "label": "Shared with me"}
    ]
  });
  toolbar.appendChild(drivePage.fileLocation);
  
  drivePage.docType = createSelectBox({
    "onChange": drivePage.updateList,
    "options": [
      {"value": "", "label": "All file types", "selected": true},
      {"value": "application/vnd.google-apps.folder", "label": "Folders"},
      {"value": "application/vnd.google-apps.document", "label": "Documents"},
      {"value": "application/vnd.google-apps.spreadsheet", "label": "Spreadsheets"},
      {"value": "application/vnd.google-apps.presentation", "label": "Presentations"},
      {"value": "application/vnd.google-apps.drawing", "label": "Drawings"},
      {"value": "application/vnd.google-apps.form", "label": "Forms"},
      {"value": "application/vnd.google-apps.fusiontable", "label": "Fusion Tables"},
      {"value": "application/vnd.google-apps.script", "label": "Scripts"},
      {"value": "application/pdf", "label": "PDF files"}
    ]
  });
  toolbar.appendChild(drivePage.docType);
  
  var uploadButton = document.createElement("button");
  uploadButton.className = "redButton right";
  uploadButton.textContent = "upload";
  uploadButton.addEventListener("click", drivePage.displayUploadPopup);
  toolbar.appendChild(uploadButton);
  
  var newButton = document.createElement("button");
  newButton.className = "redButton right";
  newButton.textContent = "new";
  newButton.addEventListener("click", drivePage.displayNewFilePopup);
  toolbar.appendChild(newButton);
  
  return toolbar;
};

drivePage.createMoreResultsButton = function(properties){
  var moreResultsContainer = document.createElement("div");
  moreResultsContainer.className = "toolbar";
  var moreResultsButton = document.createElement("button");
  moreResultsButton.textContent = "Show more results in a new tab";
  if(properties){
    var buttonColor = properties.buttonColor;
    if(buttonColor == "blue"){
      moreResultsButton.classList.add("blueButton");
    };
  }
  moreResultsButton.addEventListener("click", function(){
    window.open("https://drive.google.com/#search/" + document.getElementById("query").value, "_blank")
  });
  moreResultsContainer.appendChild(moreResultsButton);
  return moreResultsContainer;
};

drivePage.loadLinksSection = function(){
  if(!drivePage.linksSectionLoaded){
    drivePage.linksSectionLoaded = true;
    var buttonList = createShortcutList([
      {"name": i18n("msg100"), "link": "https://drive.google.com/#my-drive", "icon": "person"},
      {"name": i18n("msg104"), "link": "https://drive.google.com/#activity", "icon": "drive_activity"},
      {"name": i18n("msg101"), "link": "https://drive.google.com/#shared-with-me", "icon": "shared"},
      {"name": i18n("msg105"), "link": "https://drive.google.com/#all", "icon": "drive_all"},
      {"name": i18n("msg102"), "link": "https://drive.google.com/#starred", "icon": "starred"},
      {"name": i18n("msg106"), "link": "https://drive.google.com/#trash", "icon": "trash"},
      {"name": i18n("msg103"), "link": "https://drive.google.com/#recent", "icon": "clock"},
      {"name": i18n("msg187"), "link": "https://drive.google.com/#offline", "icon": "googlemail_templates"}
    ]);
    drivePage.linksSection.appendChild(buttonList);
    drivePage.linksSection.removeEventListener("mouseenter", drivePage.loadLinksSection);
  };
};

drivePage.loadApiClient = function(onLoad){
  var script = document.createElement("script");
  script.src = "https://apis.google.com/js/client.js?onload=drivePageApiClientOnLoad";
  document.head.appendChild(script);
};

drivePage.displayNewFilePopup = function(){
  if(!drivePage.newFilePopup){
    drivePage.newFilePopup = createPopup({
      "imgName": "googlemail_templates",
      "name": "New File"
    });
    var searchbox = createSearchBox({
      "searchOnEnter": function(){drivePage.newFilePopup.querySelector("li").click()},
      "inputMessage": "Enter document title...",
      "buttonType": "launch"
    });
    drivePage.newFilePopup.appendChild(searchbox);
    setTimeout(function(){searchbox.querySelector("input").focus()}, 10);
    
    var items = [
      {"name": "Document", "search": "https://drive.google.com/document/create?title=[query]", "link": "https://drive.google.com/document/create", "imgName": "docs"},
      {"name": "Spreadsheet", "search": "https://docs.google.com/spreadsheet/ccc?new", "imgName": "spreadsheets"},
      {"name": "Presentation", "search": "https://drive.google.com/presentation/create?title=[query]", "link": "https://drive.google.com/presentation/create", "imgName": "presentations"},
      {"name": "Drawing", "search": "https://drive.google.com/drawings/create?title=[query]", "link": "https://drive.google.com/drawings/create", "imgName": "drawings"},
      {"name": "Form", "search": "https://drive.google.com/forms/create?title=[query]", "link": "https://drive.google.com/forms/create", "imgName": "forms"},
      {"name": "Fusion Table", "link": "https://www.google.com/fusiontables/DataSource?dsrcid=implicit", "imgName": "fusion_tables"},
      {"name": "Script", "link": "https://script.google.com/create", "imgName": "script"},
      {"name": "From Template...", "search": "https://drive.google.com/templates?q=[query]", "link": "https://drive.google.com/templates", "imgName": "templates"}
    ];
    
    var ul = createShortcutList(items, searchbox.querySelector("input"));
    ul.classList.remove("card");
    drivePage.newFilePopup.appendChild(ul);
    drivePage.body.appendChild(drivePage.newFilePopup);
  }
  else {
    drivePage.newFilePopup.classList.toggle("on");
  };
};

drivePage.displayAuthPopup = function(){
  if(!drivePage.authPopup){
    drivePage.authPopup = createPopup({
      "imgUrl": "https://www.google.com/images/icons/feature/padlock-y32.png",
      "name": "Give Permission",
      "noCloseButton": true
    });
    var popupContent = document.createElement("div");
    popupContent.className = "popupContent";
    popupContent.textContent = "Before you can use this page, you need to give Black Menu for Google permission to view your Google Drive files and folders.";
    var br = document.createElement("br");
    popupContent.appendChild(br);
    var br = document.createElement("br");
    popupContent.appendChild(br);
    var authButton = document.createElement("button");
    authButton.className = "blueButton";
    authButton.addEventListener("click", drivePage.authorize);
    authButton.textContent = "Give permission";
    popupContent.appendChild(authButton);
    drivePage.authPopup.appendChild(popupContent);
    drivePage.body.appendChild(drivePage.authPopup);
  }
  else {
    drivePage.authPopup.classList.toggle("on");
  };
};

/**
 * Check if the current user has authorized the application.
 */
drivePage.checkAuth = function() {
  console.log("checkAuth");
  gapi.auth.authorize(
    {
      "client_id": drivePage.clientId,
      "scope": drivePage.scopes,
      "immediate": true
    },
    drivePage.handleAuthResult
  );
};

/**
  * Called when authorization server replies.
  *
  * @param {Object} authResult Authorization result.
  */

drivePage.handleAuthResult = function(authResult) {
  if (authResult && !authResult.error) {
    // Access token has been successfully retrieved, requests can be sent to the API.
    drivePage.updateList();
  }
  else {
    changeLoading("off", "drive");
    // No access token could be retrieved, show the button to start the authorization flow.
    drivePage.displayAuthPopup();
  };
};

drivePage.authorize = function() {
  gapi.auth.authorize(
    {"client_id": drivePage.clientId,
     "scope": drivePage.scopes,
     "immediate": false
    },
    drivePage.handleAuthResult
  );
};

/**
 * list files system
 */

drivePage.updateList = function(){
  changeLoading("on", "drive");
  var q = "";
  var title = drivePage.searchInput.value;
  var docType = drivePage.docType.value;
  var fileLocation = drivePage.fileLocation.value;
  var fileNumberFit = parseInt((drivePage.content.offsetHeight / 44) + 1);
  var fileNumber = fileNumberFit <= 8 ? 8 : fileNumberFit;
  function addFilter(filter){
    q += (q != "") ? " and " : filter;
  };
  if(title != ""){
    addFilter("title contains '" + title + "'");
  };
  if(docType != ""){
    addFilter("mimeType='" + docType + "'");
  };
  if(fileLocation != ""){
    addFilter(fileLocation);
  };
  var fields = "kind,items(alternateLink,iconLink,title,modifiedDate,shared),nextPageToken";
  drivePage.requestParameters = {maxResults: fileNumber, q: q, fields: fields};
  retrieveFiles(drivePage.requestParameters, drivePage.loadItems);
};

drivePage.loadMoreItems = function(){
  changeLoading("on", "drive");
  retrieveFiles(drivePage.requestParameters, function(object){drivePage.loadItems(object, true)});
};

drivePage.loadItems = function(object, moreResults, cache) {
  if(drivePage.firstLoad && !cache){
    chrome.storage.local.set({"driveCache": object});
    drivePage.firstLoad = false;
  };
  if(!moreResults){
    drivePage.content.textContent = "";
    drivePage.fileList = drivePage.createFilelist();
    drivePage.content.appendChild(drivePage.fileList);
    var moreResultsHeader = drivePage.createMoreResultsButton();
    drivePage.content.appendChild(moreResultsHeader);
  }
  else {
  }
  var fileArray = object.items ? object.items : object;
  if(fileArray.length == 0){
    drivePage.noFilesMatched();
    return;
  }
  else {
    if(!fileArray[0].alternateLink){
      drivePage.noFilesMatched();
      return;
    };
  };
  for (var i=0;i<fileArray.length;i++){
    var file = drivePage.createFileItem(fileArray[i]);
    drivePage.fileList.appendChild(file);
  };
  if(!cache){
    changeLoading("off", "drive");
  };
};

drivePage.createFilelist = function() {
  drivePage.fileList = document.createElement("div");
  drivePage.fileList.className = "buttonList";
  drivePage.fileList.dataset.columnCount = 1;
  return drivePage.fileList;
};

drivePage.createFileItem = function(fileProperties){
  var li = document.createElement("li");
  var a = document.createElement("a");
  a.setAttribute("href", fileProperties.alternateLink);
  a.setAttribute("target", "_blank");
  var imgContainer = document.createElement("div");
  var img = document.createElement("img");
  img.setAttribute("src", fileProperties.iconLink);
  imgContainer.appendChild(img);
  a.appendChild(imgContainer);
  var nameContainer = document.createElement("div");
  var name = document.createElement("p");
  var hideFileExtension = storage.get("prefDriveHideFileExtension", false);
  name.textContent = hideFileExtension ? fileProperties.title.split(".")[0] : fileProperties.title;
  nameContainer.appendChild(name);
  var sharedAndDate = document.createElement("p");
  if(fileProperties.shared){
    var shared = document.createElement("img");
    shared.src = "/images/shared.png";
    sharedAndDate.appendChild(shared);
  };
  if(fileProperties.modifiedDate){
    var date = drivePage.getFileDate(fileProperties.modifiedDate);
    var modified = document.createTextNode(" modified: " + date);
    sharedAndDate.appendChild(modified);
  };
  nameContainer.appendChild(sharedAndDate);
  a.appendChild(nameContainer);
  li.appendChild(a);
  
  return li;
};
drivePage.getFileDate = function(modifiedDate){
  var currentDateArray = drivePage.currentDateArray;
  var fileDateArrayString = modifiedDate.split("T")[0].split("-");
  var fileDateArray = [parseFloat(fileDateArrayString[0]), parseFloat(fileDateArrayString[1]) - 1, parseFloat(fileDateArrayString[2])];
  var date = "";
    console.log(fileDateArray);
  if((currentDateArray[0] == fileDateArray[0]) && (currentDateArray[1] == fileDateArray[1]) && (currentDateArray[2] == fileDateArray[2])){
    date = "today";
  }
  else {
    if((currentDateArray[0] == fileDateArray[0]) && (currentDateArray[1] == fileDateArray[1]) && ((currentDateArray[2] - fileDateArray[2])  == 1)){
      date = "yesterday";
    }
    else {
      if(currentDateArray[0] != fileDateArray[0]){
        date = fileDateArray[2] + " " + drivePage.monthNames[fileDateArray[1]] + " " + fileDateArray[0];
      }
      else {
        date = fileDateArray[2] + " " + drivePage.monthNames[fileDateArray[1]];
      };
    };
  };
  return date;
};

drivePage.noFilesMatched = function(){
  drivePage.content.textContent = "";
  var noFilesMatchedText = createCardHeader({"name": "No files matched the search query"});
  drivePage.content.appendChild(noFilesMatchedText);
  drivePage.content.appendChild(drivePage.createMoreResultsButton({"buttonColor": "blue"}));
};

/**
 * file upload system
 */

drivePage.displayUploadPopup = function(){
  drivePage.uploadPopup = createPopup({
    "imgName": "googlemail_templates",
    "name": "Upload"
  });
  var popupContent = document.createElement("div");
  popupContent.className = "popupContent";
  var div = document.createElement("div");
  var br = document.createElement("br");
  var input = document.createElement("input");
  var startUploadButton = document.createElement("button");
  var chooseFileButton = document.createElement("button");
  div.textContent = "no file selected...";
  popupContent.appendChild(div);
  popupContent.appendChild(br);
  input.setAttribute("type", "file");
  input.addEventListener("change", function(){
    if(this.files[0] == undefined){
      noFileSelected();
    }
    else {
      div.innerText = this.files[0]["name"];
      chooseFileButton.classList.remove("blueButton");
      startUploadButton.classList.remove("inactive");
      chooseFileButton.innerText = "change file";
    };
  });
  
  startUploadButton.addEventListener("click", function(){
    drivePage.uploadFile(input.files[0]);
  });
  startUploadButton.className = "inactive blueButton";
  startUploadButton.textContent = "upload";
  popupContent.appendChild(startUploadButton);
  chooseFileButton.textContent = "choose file";
  chooseFileButton.addEventListener("click", function(){
    input.click();
  });
  popupContent.appendChild(chooseFileButton);
  
  drivePage.uploadPopup.appendChild(popupContent);
  drivePage.body.appendChild(drivePage.uploadPopup);
};

drivePage.uploadFile = function(file) {
  changeLoading("on", "drive");
  gapi.client.load('drive', 'v2', function() {
    insertFile(file, function(){
      changeLoading("off", "drive");
      document.body.removeChild(drivePage.uploadPopup);
    });
  });
};

function insertFile(fileData, callback) {
  const boundary = "-------314159265358979323846";
  const delimiter = "\r\n--" + boundary + "\r\n";
  const close_delim = "\r\n--" + boundary + "--";
  
  var reader = new FileReader();
  reader.readAsBinaryString(fileData);
  reader.onload = function(e) {
    var contentType = fileData.type || 'application/octet-stream';
    var metadata = {
      'title': fileData.name,
      'mimeType': contentType
    };
    var base64Data = btoa(reader.result);
    var multipartRequestBody =
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: ' + contentType + '\r\n' +
        'Content-Transfer-Encoding: base64\r\n' +
        '\r\n' +
        base64Data +
        close_delim;
    
    var request = gapi.client.request({
      "path": "/upload/drive/v2/files",
      "method": "POST",
      "params": {
        "uploadType": "multipart"
      },
      "headers": {
        "Content-Type": 'multipart/mixed; boundary="' + boundary + '"'
      },
      "body": multipartRequestBody
    });
    request.execute(callback);
  };
};

function retrieveFiles(parameters, callback) {
  var retrievePageOfFiles = function(request, result) {
    request.execute(function(resp) {
      console.log(resp);
      drivePage.requestParameters.pageToken = resp.nextPageToken
      //result = result.concat(resp.items);
      callback(resp.items);
    });
  };
  var initialRequest = gapi.client.request({
    'path': '/drive/v2/files',
    'method': 'GET',
    'params': parameters
  });
  retrievePageOfFiles(initialRequest, []);
};

if(document.body){
  drivePage.init();
}
else {
  window.addEventListener("DOMContentLoaded", drivePage.init);
};