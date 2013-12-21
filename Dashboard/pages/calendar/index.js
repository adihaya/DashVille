var calendarPage = {};

calendarPage.init = function() {
  calendarPage.body = document.getElementById("calendarPage");
  var searchBox = createSearchBox({
    searchOnEnter: calendarPage.loadQueryInNewTab,
    buttonType: "search",
    buttonTooltip: "Search Google Calendar in a new tab",
    inputMessage: "Search Google Calendar in a new tab..."
  });
  
  calendarPage.body.appendChild(searchBox);
  calendarPage.searchInput = searchBox.querySelector("input");
  
  var calendarUrl = "https://www.google.com/calendar/ig"
  + "?hl=" + browserLang
  + "&up_showEmptyDays=" + localStorage.getItem("prefCalendarEmptydays");
  
  var calendarIframe = createContent({
    "iframe": true,
    "iframeSrc": calendarUrl,
    "toolbarCount": 2
  });
  calendarPage.body.appendChild(calendarIframe);
  
  var linksSection = createLinksSection({
    "onMouseEnter": calendarPage.loadTasksIframe,
    "name": i18n("msg109")
  });
  var tasksIconElement;
  var tasksIcon = createIcon({
    "name": "tasks",
    "size": 32
  });
  if(tasksIcon.tagName == "IMG"){
    tasksIconElement = document.createElement("span");
    tasksIconElement.appendChild(tasksIcon);
  }
  else {
    tasksIconElement = tasksIcon;
  };
  linksSection.querySelector(".headerButton").insertBefore(tasksIconElement, linksSection.querySelector("p"));
  calendarPage.body.appendChild(linksSection);
};

calendarPage.focusSearchbox = function(){
  focusSearchBox(calendarPage.searchInput);
};

calendarPage.loadQueryInNewTab = function() {
  var query = calendarPage.searchInput.value;
  var url = "https://www.google.com/calendar/render?q=" + query;
  window.open(url, "_blank");
};

calendarPage.loadTasksIframe = function() {
  if(!document.querySelector("#calendarPage .iframeTasks")){
    changeLoading("on", "calendar");
    var tasksUrl = window.self != window.top ? ("https://www.google.com/blackmenu/tasks/"+ Date() + "/") : ("https://mail.google.com/tasks/ig?extension=blackMenu&")
    + "hl=" + browserLang;
    var iframe = document.createElement("iframe");
    iframe.className = "iframeTasks";
    iframe.src = tasksUrl;
    iframe.addEventListener("load", function(){
      changeLoading("off", "calendar");
    });
    document.querySelector("#calendarPage .linksSection").appendChild(iframe);
  };
};

if(document.body){
  calendarPage.init();
}
else {
  window.addEventListener("DOMContentLoaded", calendarPage.init);
};