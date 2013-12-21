var bookmarksPage = {};

bookmarksPage.focusSearchbox = function(){
  focusSearchBox(bookmarksPage.searchInput);
};

bookmarksPage.currentDate = new Date();
bookmarksPage.currentDateArray = [
  bookmarksPage.currentDate.getFullYear(),
  bookmarksPage.currentDate.getMonth(),
  bookmarksPage.currentDate.getDate()
];

bookmarksPage.monthNames = [
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

bookmarksPage.init = function() {
  changeLoading("on", "bookmarks")
  bookmarksPage.body = document.getElementById("bookmarksPage");
  var searchBox = createSearchBox({
    searchOnEnter: bookmarksPage.openQueryInNewTab,
    buttonType: "search",
    buttonTooltip: "Search google bookmarks in a new tab",
    inputMessage: "Search google bookmarks in a new tab...",
    "withBottomBorder": true
  });
  bookmarksPage.body.appendChild(searchBox);
  bookmarksPage.searchInput = searchBox.querySelector("input");
  
  bookmarksPage.content = createContent({
    "toolbarCount": 1
  });
  bookmarksPage.body.appendChild(bookmarksPage.content);
  
  bookmarksPage.getBookmarks({"callback": bookmarksPage.loadBookmarks});
};

bookmarksPage.openQueryInNewTab = function() {
  window.open("https://www.google.com/bookmarks/find?q=" + bookmarksPage.searchInput.value, "_blank");
};

bookmarksPage.getBookmarks = function(parameters){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://www.google.com/ig/bookmarks?op=list&sort=date");
  xhr.addEventListener("readystatechange", function(){
    if(xhr.status === 0){
      chrome.permissions.contains({ origins: ["http://www.google.com/ig/bookmarks"] }, function(result) {
        result ? function(){bookmarksPage.getBookmarks({"callback": bookmarksPage.loadBookmarks});} : bookmarksPage.displayPermissionPopup();
      });
    };
  });
  xhr.addEventListener("load", function(){
    var response = JSON.parse(xhr.responseText.replace("while(1);", ""));
    var bookmarks = response.bookmarks;
    var bookmarksList = {
      "Unlabeled": []
    };
    bookmarks.forEach(function(item){
      var bookmark = {
        "title": item.title,
        "timestamp": item.timestamp_usec,
        "url": item.url
      };
      if(item.label){
        item.label.forEach(function(label){
          if(!bookmarksList[label]){
            bookmarksList[label] = [];
          };
          bookmarksList[label].push(bookmark);
        });
      }
      else {
        bookmarksList["Unlabeled"].push(bookmark);
      };
    });
    var bookmarksListSorted = bookmarksPage.sortObj(bookmarksList);
    parameters.callback(bookmarksListSorted);
  });
  xhr.send();
};

bookmarksPage.loadBookmarks = function(bookmarks){
  console.log(bookmarks);
  for(var i in bookmarks){
    console.log(i);
    var header = createCardHeader({
      "name": i
    });
    bookmarksPage.content.appendChild(header);
    var card = document.createElement("ul");
    card.className = "card buttonList";
    card.dataset.columnCount = 1;
    bookmarksPage.content.appendChild(card);
    bookmarks[i].forEach(function(item){
      var listItem = bookmarksPage.createFileItem(item);
      card.appendChild(listItem);
    });
  };
  changeLoading("off", "bookmarks");
};

bookmarksPage.createFileItem = function(fileProperties){
  var li = document.createElement("li");
  var a = document.createElement("a");
  a.setAttribute("href", fileProperties.url);
  a.setAttribute("target", "_blank");
  var imgContainer = document.createElement("div");
  var img = document.createElement("img");
  img.setAttribute("src", "https://www.google.com/s2/favicons?domain=" + fileProperties.url);
  imgContainer.appendChild(img);
  a.appendChild(imgContainer);
  var nameContainer = document.createElement("div");
  var name = document.createElement("p");
  name.textContent = fileProperties.title;
  nameContainer.appendChild(name);
  var sharedAndDate = document.createElement("p");
  if(fileProperties.timestamp){
    var date = bookmarksPage.getFileDate(fileProperties.timestamp);
    var modified = document.createTextNode(" added: " + date);
    sharedAndDate.appendChild(modified);
  };
  nameContainer.appendChild(sharedAndDate);
  a.appendChild(nameContainer);
  li.appendChild(a);
  
  return li;
};

bookmarksPage.getFileDate = function(timestamp){
  var time = new Date(timestamp/1000);
  console.log(time);
  var currentDateArray = bookmarksPage.currentDateArray;
  var fileDateArray = [time.getFullYear(), time.getMonth(), time.getDate()];
  console.log(fileDateArray);
  var date = "";
  if((currentDateArray[0] == fileDateArray[0]) && (currentDateArray[1] == fileDateArray[1]) && (currentDateArray[2] == fileDateArray[2])){
    date = "today";
  }
  else {
    if((currentDateArray[0] == fileDateArray[0]) && (currentDateArray[1] == fileDateArray[1]) && ((currentDateArray[2] - fileDateArray[2])  == 1)){
      date = "yesterday";
    }
    else {
      if(currentDateArray[0] != fileDateArray[0]){
        date = fileDateArray[2] + " " + bookmarksPage.monthNames[fileDateArray[1]] + " " + fileDateArray[0];
      }
      else {
        date = fileDateArray[2] + " " + bookmarksPage.monthNames[fileDateArray[1]];
      };
    };
  };
  return date;
};

if(document.body){
  bookmarksPage.init();
}
else {
  window.addEventListener("DOMContentLoaded", bookmarksPage.init);
};

bookmarksPage.sortObj = function(obj) {
  var temp_array = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if(key != "Unlabeled"){
        console.log(key);
        temp_array.push(key);
      };
    };
  };
  temp_array.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });
  temp_array.push("Unlabeled");
  var temp_obj = {};
  for (var i=0; i<temp_array.length; i++) {
    temp_obj[temp_array[i]] = obj[temp_array[i]];
  }
  return temp_obj;
};



bookmarksPage.displayPermissionPopup = function() {
  bookmarksPage.authPopup = createPopup({
    "className": "authPopup",
    "imgUrl": "https://www.google.com/images/icons/feature/padlock-y32.png",
    "name": "Give Permission",
    "noCloseButton": true
  });
  var popupContent = document.createElement("div");
  popupContent.className = "popupContent";
  popupContent.textContent = "Before you can use this page, you need to give Black Menu for Google access to list your Google Bookmarks. It is possible this page worked before without giving permissions.";
  var br = document.createElement("br");
  popupContent.appendChild(br);
  var br = document.createElement("br");
  popupContent.appendChild(br);
  var authButton = document.createElement("button");
  authButton.className = "blueButton";
  authButton.textContent = "Give permission";
  authButton.addEventListener("click", bookmarksPage.authorize);
  popupContent.appendChild(authButton);
  bookmarksPage.authPopup.appendChild(popupContent);
  bookmarksPage.body.appendChild(bookmarksPage.authPopup);
};

bookmarksPage.authorize = function() {
  console.log("authorize");
  chrome.permissions.request({ origins: ["http://www.google.com/ig/bookmarks"] }, function(granted) {
    console.log(granted);
    if (granted) {
      bookmarksPage.getBookmarks({"callback": bookmarksPage.loadBookmarks});
      bookmarksPage.authPopup.classList.remove("on");
    };
  });
};