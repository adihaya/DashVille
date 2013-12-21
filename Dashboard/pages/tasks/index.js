var tasksPage = {};

tasksPage.init = function() {
  tasksPage.body = document.getElementById("tasksPage");
  
  var tasksUrl = window.self != window.top ? ("https://www.google.com/blackmenu/tasks/"+ Date() + "/") : ("https://mail.google.com/tasks/ig?extension=blackMenu&")
  + "hl=" + browserLang;
  
  tasksPage.content = createContent({
    "iframe": true,
    "iframeSrc": tasksUrl,
  });
  tasksPage.body.appendChild(tasksPage.content);
};

tasksPage.focusSearchbox = function(){
  focusSearchBox(tasksPage.content);
};

if(document.body){
  tasksPage.init();
}
else {
  window.addEventListener("DOMContentLoaded", tasksPage.init);
};