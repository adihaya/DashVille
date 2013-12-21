var mapsPage = {};

mapsPage.init = function() {
  changeLoading("on", "maps");
  mapsPage.body = document.getElementById("mapsPage");
  var iframe = createContent({
    "iframe": true,
    "iframeSrc": mapsPage.generateIframeUrl(),
    "toolbarCount": 1
  });
  iframe.addEventListener("load", function(){
    changeLoading("off", "maps");
  });
  mapsPage.body.appendChild(iframe);
  
  mapsPage.linksSection = createLinksSection({
    "onMouseEnter": mapsPage.loadLinksSection
  });
  mapsPage.body.appendChild(mapsPage.linksSection);
};

mapsPage.generateIframeUrl = function(){
  var mapType = storage.get("prefMapsMaptype");
  var mapTypeConversion = {
    "up_mapType=m": "ROADMAP",
    "up_mapType=k": "SATELLITE",
    "up_mapType=p": "TERRAIN",
    "up_mapType=h": "HYBRID"
  }
  var mapTypeId = mapTypeConversion[mapType];
  if(!mapTypeId){
    mapTypeId = "ROADMAP"
  };
  
  var baseUrl = chrome.extension.getURL("/pages/maps/gadget/index.html");
  var urlParameters = {
    "mapType": mapTypeId,
    "prefMapsTraffic": storage.get("prefMapsTraffic"),
    "placeHolder": encodeURI(i18n("pmsg7")),
    "defaultLocation": storage.get("prefMapsLocation", undefined)
  };
  var completeUrl = baseUrl + createUrlParameters(urlParameters);
  
  return completeUrl;
};

mapsPage.loadLinksSection = function(){
  if(!mapsPage.linksSectionLoaded){
    mapsPage.linksSectionLoaded = true;
    var links = [
      {"name": "Location History", "link": "https://maps.google.com/locationhistory/", "icon": "maps"},
      {"name": i18n("msg54"), "link": "http://www.google.com/mapmaker", "icon": "mapmaker"},
      {"name": i18n("msg43"), "link": "https://plus.google.com/local", "icon": "local"},
      {"name": i18n("msg183"), "link": "https://www.google.com/sky/", "icon": "sky"},
      {"name": i18n("msg184"), "link": "https://www.google.com/moon/", "icon": "moon"},
      {"name": i18n("msg185"), "link": "https://www.google.com/mars/", "icon": "mars"}
    ];
    mapsPage.linksSection.appendChild(createShortcutList(links));
  };
};

if(document.body){
  mapsPage.init();
}
else {
  window.addEventListener("DOMContentLoaded", mapsPage.init);
};