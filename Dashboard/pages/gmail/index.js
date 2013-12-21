var gmailPage = {};
gmailPage.input = "";

gmailPage.setInput = function(value) {
  gmailPage.input = value;
};

gmailPage.init = function() {
  var iframe = gmailPage.createIframe();
  document.getElementById("gmailPage").appendChild(iframe);
  
  var linksSection = createLinksSection({"onMouseEnter": gmailPage.loadLinksSection, "name": i18n("msg189")});
  document.getElementById("gmailPage").appendChild(linksSection);
  
  gmailPage.gadgetMessageListener();
};

gmailPage.createIframe = function() {
  var iframe = document.createElement("iframe");
  iframe.src = "https://mail.google.com/mail/mu/mp/?mui=blackMenu&hl=" + browserLang;
  iframe.className = "content";
  iframe.dataset.toolbarCount = 1;
  return iframe;
};

gmailPage.loadLinksSection = function(){
  var gmailLinks = [
    {"i18n": 81, "link": "https://mail.google.com/mail/#all", "search": "https://mail.google.com/mail/#search/[query]", "icon": "googlemail_all"},
    {"i18n": 88, "link": "https://mail.google.com/mail/#search/in:anywhere", "search": "https://mail.google.com/mail/#search/in:anywhere [query]", "icon": "googlemail_anywhere"},
    {"i18n": 82, "link": "https://mail.google.com/mail/#inbox", "search": "https://mail.google.com/mail/#search/in:inbox [query]", "icon": "googlemail_inbox"},
    {"i18n": 89, "link": "https://mail.google.com/mail/#sent", "search": "https://mail.google.com/mail/#search/in:sent [query]", "icon": "send"},
    {"i18n": 83, "link": "https://mail.google.com/mail/#search/is:unread", "search": "https://mail.google.com/mail/#search/is:unread [query]", "icon": "googlemail_unread"},
    {"i18n": 90, "link": "https://mail.google.com/mail/#search/is:read", "search": "https://mail.google.com/mail/#search/is:read [query]", "icon": "googlemail_read"},
    {"i18n": 91, "link": "https://mail.google.com/mail/#starred", "search": "https://mail.google.com/mail/#search/in:starred [query]", "icon": "starred"},
    {"i18n": 84, "link": "https://mail.google.com/mail/#search/in:important", "search": "https://mail.google.com/mail/#search/in:important [query]", "icon": "googlemail_priority"},
    {"i18n": 85, "link": "https://mail.google.com/mail/#drafts", "search": "https://mail.google.com/mail/#search/in:drafts [query]", "icon": "googlemail_templates"},
    {"i18n": 92, "link": "https://mail.google.com/mail/#search/has:attachment", "search": "https://mail.google.com/mail/#search/has:attachment [query]", "icon": "attachments"},
    {"i18n": 86, "link": "https://mail.google.com/mail/#spam", "search": "https://mail.google.com/mail/#search/in:spam [query]", "icon": "spam" },
    {"i18n": 93, "link": "https://mail.google.com/mail/#trash", "search": "https://mail.google.com/mail/#search/in:trash [query]", "icon": "trash"},
    {"i18n": 87, "link": "https://mail.google.com/mail/#search/has:circle", "search": "https://mail.google.com/mail/#search/has:circle [query]", "icon": "googlemail_circles"},
    {"i18n": 94, "link": "https://mail.google.com/mail/#chats", "search": "https://mail.google.com/mail/#search/in:chats [query]", "icon": "hangouts"}
  ];
  document.querySelector("#gmailPage .linksSection").appendChild(createShortcutList(gmailLinks, null, gmailPage.linksSectionShortcutClick));
  
  var contactsLinks = [
    {"i18n": 97, "link": "https://mail.google.com/mail/#contacts/", "search": "https://mail.google.com/mail/#contacts/search/[query]", "icon": "contacts"},
     {"i18n": 188, "link": "https://www.google.com/contacts/#contact/new", "search": "https://www.google.com/contacts/#contact/new", "icon": "contacts"}
  ];
  document.querySelector("#gmailPage .linksSection").appendChild(createShortcutList(contactsLinks, null, gmailPage.linksSectionShortcutClick));
  
  document.querySelector("#gmailPage .linksSection").removeEventListener("mouseenter", gmailPage.loadLinksSection);
};

gmailPage.compose = function(){
  if(localStorage.getItem("prefGmailCompose") == "true"){
    chrome.windows.create({ url: "https://mail.google.com/mail?view=cm&tf=0", focused: true, width: 500, height: 516, type: 'panel'});
    if(window.location.href.split("?")[1]!="popup"){ window.close();}
  }
  else{
    window.open("https://mail.google.com/mail/#compose")
  };
};

gmailPage.gadgetMessageListener = function(){
  chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.gmail == "compose"){
        sendResponse({farewell: gmailPage.Compose()});
      };
      if (request.inputValue){
        sendResponse({farewell: gmailPage.setInput(encodeURIComponent(request.inputValue))});
      };
    }
  );
};	

gmailPage.linksSectionShortcutClick = function() {
  console.log(gmailPage.input);
  if(gmailPage.input.length > 0) {
    window.open(this.dataset.search.replace("[browserLang]",browserLang).replace("[query]",gmailPage.input))
  }
  else{
    window.open(this.dataset.link.replace("[browserLang]",browserLang))
  };
};

if(document.body){
  gmailPage.init();
}
else {
  window.addEventListener("DOMContentLoaded", gmailPage.init);
};