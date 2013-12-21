var translatePage = {};

translatePage.focusSearchbox = function(){
  focusSearchBox(translatePage.content);
};

translatePage.init = function() {
  translatePage.body = document.getElementById("translatePage");
  
  translatePage.content = createContent({
    "iframe": true,
    "iframeSrc": translatePage.generateIframeSrc(),
    "toolbarCount": 1
  });
  translatePage.body.appendChild(translatePage.content);
  
  var linksSection = createLinksSection({
    "onMouseEnter": translatePage.loadLinksSection
  });
  translatePage.body.appendChild(linksSection);
};

translatePage.generateIframeSrc = function(){
  var baseUrl = "https://translate.google.com/m/translate";
  var urlParameters = {
    "hl": browserLang,
    "tl": storage.get("prefTranslateTarget", browserLang.split("-")[0]).replace("up_tl=",""),
    "sl": storage.get("prefTranslateSource", "auto").replace("up_sl=","")
  };
  var completeUrl = baseUrl + createUrlParameters(urlParameters);
  
  return completeUrl;
};

translatePage.loadLinksSection = function(){
  if(!translatePage.linksSectionLoaded){
    translatePage.linksSectionLoaded = true;
    var links = [
      {"name": i18n("msg49"), "link": "http://translate.google.com/toolkit/", "icon": "translate"},
      {"name": i18n("msg50"), "link": "http://www.google.com/transliterate/", "icon": "google_input_tools"}
    ];
    document.querySelector("#translatePage .linksSection").appendChild(createShortcutList(links));
  };
};

if(document.body){
  translatePage.init();
}
else {
  window.addEventListener("DOMContentLoaded", translatePage.init);
};