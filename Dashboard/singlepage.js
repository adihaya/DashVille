var pages = {
  search: {url: "https://www.google.com/webhp", name: i18n("msg0"), inlinePage: true, iconName: "google_favicon"},
  gplus: {url: "https://plus.google.com/", name: i18n("msg1"), inlinePage: true, iconName: "gplus"},
  translate: {url: "https://translate.google.com/", name: i18n("msg2"), inlinePage: true, iconName: "translate"},
  maps: {url: "https://maps.google.com/maps", name: i18n("msg3"), inlinePage: true, iconName: "places"},
  play: {url: "https://play.google.com/", name: i18n("msg4"), inlinePage: true, iconName: "play"},
  youtube: {url: "https://www.youtube.com/", name: i18n("msg5"), inlinePage: true, iconName: "youtube"},
  news: {url: "https://news.google.com/nwshp", name: i18n("msg6"), inlinePage: true, iconName: "news"},
  gmail: {url: "https://mail.google.com/mail/", name: i18n("msg7"), inlinePage: true, iconName: "googlemail"},
  drive: {url: "https://drive.google.com/", name: i18n("msg8"), inlinePage: true, iconName: "drive"},
  calendar: {url: "https://www.google.com/calendar/render", name: i18n("msg9"), inlinePage: true, iconName: "calendar"},
  offers: {url: "https://www.google.com/offers", name: i18n("msg115"), inlinePage: true, iconName: "offers"},
  chromeapps: {url:"https://chrome.google.com/webstore/", name: "Chrome Apps", inlinePage: true, iconName: "chrome"},
  urlshortener: {url: "https://goo.gl/", name: i18n("msg117"), inlinePage: true, iconName: "goo_gl"},
  books: {url: "http://books.google.com/", name: i18n("msg21"), iconName: "books", inlinePage: true},
  shortcuts: {url: "http://www.google.com/intl/en_us/about/products/", name: "Shortcuts", iconName: "shortcuts", inlinePage: true},
  trends: {url: "https://www.google.com/trends/", name: i18n("msg27"), inlinePage: true, iconName: "trends"},
  sites: {url: "https://sites.google.com/", name: i18n("msg126"), inlinePage: true, iconName: "sites"},
  tasks: {url: "https://mail.google.com/tasks/canvas", name: i18n("msg109"), inlinePage: true, iconName: "tasks"},
  bookmarks: {url: "https://www.google.com/bookmarks", name: "Bookmarks", inlinePage: true, iconName: "bookmarks"},
  scholar: {url: "http://scholar.google.com/", name: "Scholar", inlinePage: true, iconName: "scholar"},
  keep: {url: "https://drive.google.com/keep", name: "Keep", inlinePage: true, iconName: "keep"},
  more: {url: "https://www.google.com/intl/en_us/about/products/index.html", name: i18n("msg10"), loaded: true},
};

var pageName = location.href.split("?page=")[1].split("&")[0];
window.addEventListener("DOMContentLoaded", init);

function i18n(id){
  return chrome.i18n.getMessage(id)
};

function init(){
  if(pageName){
    document.body.id = pageName + "Page";
    
    var script = document.createElement("script");
    script.setAttribute("src", "/pages/" + pageName + "/index.js");
    document.head.appendChild(script);
    
    var style = document.createElement("link");
    style.setAttribute("rel", "stylesheet");
    style.setAttribute("href", "/pages/" + pageName + "/index.css");
    document.head.appendChild(style);
    
    var favicon = document.createElement("link");
    favicon.setAttribute("rel", "shortcut icon");
    favicon.setAttribute("href", "/images/16/" + pages[pageName].iconName + "-16.png");
    document.head.appendChild(favicon);
    
    var title = document.head.querySelector("title");
    title.textContent = pages[pageName].name + " - Black Menu for Google";
  };
};