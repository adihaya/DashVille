var playPage = {};

playPage.focusSearchbox = function(){
  focusSearchBox(playPage.searchInput);
};

playPage.init = function() {
  playPage.body = document.getElementById("playPage");
  var searchBox = createSearchBox({
    "searchOnEnter": playPage.loadQueryInNewTab,
    "inputPmsg": 2,
    "withBottomBorder": true
  });
  playPage.body.appendChild(searchBox);
  playPage.searchInput = searchBox.querySelector("input");
  
  var content = createContent({
    "toolbarCount": 1
  });
  playPage.body.appendChild(content);

  var playStoreLinks = [
    {"name": i18n("msg56"), "link": "https://play.google.com/store/apps","search": "https://play.google.com/store/search?c=apps&q=[query]", "icon": "play_apps"},
    {"name": i18n("msg59"), "link": "https://play.google.com/store/movies", "search": "https://play.google.com/store/search?c=movies&q=[query]", "icon": "play_movies"},
    {"name": i18n("msg57"), "link": "https://play.google.com/store/books", "search": "https://play.google.com/store/search?c=books&q=[query]", "icon": "play_books"},
    {"name": i18n("msg60"), "link": "https://play.google.com/store/music", "search": "https://play.google.com/store/search?c=music&q=[query]", "icon": "play_music"},
    {"name": i18n("msg58"), "link": "https://play.google.com/store/magazines", "search": "https://play.google.com/store/search?c=magazines&q=[query]", "icon": "play_magazines"},
    {"name": i18n("msg61"), "link": "https://play.google.com/store/devices", "search": "https://play.google.com/store/search?c=devices&q=[query]", "icon": "play_devices"}
  ];
  content.appendChild(createShortcutList(playStoreLinks, playPage.searchInput));
  
  content.appendChild(createCardHeader({"name": i18n("msg62")}));
  var morePlayStoreLinks = [
    {"name": i18n("msg63"), "link": "https://play.google.com/store/account?orders", "icon": "play"},
    {"name": i18n("msg64"), "link": "https://play.google.com/store/account?settings", "icon": "play"}
  ];
  content.appendChild(createShortcutList(morePlayStoreLinks));
  
  content.appendChild(createCardHeader({"name": i18n("msg65")}));
  var playMyContent = [
    {"name": i18n("msg66"), "link": "https://play.google.com/apps", "icon": "play_apps"},
    {"name": i18n("msg69"), "link": "https://play.google.com/movies", "icon": "play_movies"},
    {"name": i18n("msg67"), "link": "https://play.google.com/books", "icon": "play_books"},
    {"name": i18n("msg70"), "link": "https://play.google.com/music", "icon": "play_music"},
    {"name": i18n("msg68"), "link": "https://play.google.com/magazines", "icon": "play_magazines"},
    {"name": i18n("msg71"), "link": "https://play.google.com/devices", "icon": "play_devices"}
  ];
  content.appendChild(createShortcutList(playMyContent));
  
};

playPage.loadQueryInNewTab = function() {
  var query = playPage.searchInput.value;
  var url = "https://play.google.com/store/search?c=apps&q=" + query;
  window.open(url, "_blank");
};

if(document.body){
  playPage.init();
}
else {
  window.addEventListener("DOMContentLoaded", playPage.init);
};