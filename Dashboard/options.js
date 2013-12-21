window.addEventListener("DOMContentLoaded", init);

function init(){
  
  var rightList = document.getElementById("rightList");
  var leftList = document.getElementById("leftList");
  rightList.addEventListener("drop", function(){
    drop(event);
  });
  rightList.addEventListener("dragover", function(){
    event.preventDefault();
  });
  leftList.addEventListener("drop", function(){
    drop(event);
  });
  leftList.addEventListener("dragover", function(){
    event.preventDefault();
  });
  
  [].forEach.call(leftList.getElementsByTagName("li"), function(item){
    item.addEventListener("dragstart", function() {
      event.dataTransfer.setData("text", event.srcElement.id);
    });
  });
  
  chrome.storage.sync.get("selectedMenuItems", function(storage){
    console.log(storage.selectedMenuItems);
    if(storage.selectedMenuItems){
      storage.selectedMenuItems.forEach(function(item){
        if(document.getElementById(item)){
          rightList.appendChild(document.getElementById(item));
        };
      });
    };
  });

  
  
  /* new settings */
  
  var unreadCountSettings = createSettingBlock({
    "text": "Unread Counts",
    "imgName": "settings",
    "children": [
      createSettingParagraph({
        "text": "Select the services you want to display unread count for",
        "children": [
          createCheckBox({"text": "Google+", "settingsName": "prefGenericUnreadCountsGplus", "onChange": reloadBackgroundPage}),
          createCheckBox({"text": "Gmail", "settingsName": "prefGenericUnreadCountsGmail", "onChange": reloadBackgroundPage})
        ]
      }),
      createSettingParagraph({
        "text": "Select where the unread count should be displayed",
        "children": [
          createCheckBox({"text": "In the extension itself", "settingsName": "prefGenericUnreadCount"}),
          createCheckBox({"text": "As a badge on the extension icon (experimental)", "settingsName": "prefGenericUnreadCountBadge", "onChange": reloadBackgroundPage})
        ]
      })
    ]
  });
  appendSetting(unreadCountSettings);
  
  
  
  var panelAndWindows = createSettingBlock({
    "text": "Panels and Windows",
    "imgName": "settings",
    "children": [
      createSelectBox({
        "text": 'Define what the "Open gadget in window" button should do: open...',
        "settingsName": "prefGenericOpenGadget",
        "options": [
          {"text": "In a panel","value": "panel", "selected": true},
          {"text": "In a popup", "value": "popup"},
          {"text": "In a new tab", "value": "tab"},
          {"text": "In a new window", "value": "normal"}
        ]
      }),
      createCheckBox({
        "text": i18n("msg190","Open the extension in a panel"),
        "settingsName": "prefGenericPanel",
        "onChange": function(state){
          var url = state ? "openinpanel.html": "popup.html";
          chrome.browserAction.setPopup({popup: url});
        }
      })
    ]
  });
  
  appendSetting(panelAndWindows);
  
  
  var moreSettings = createSettingBlock({
    "text": "More Page",
    "imgName": "settings",
    "children": [
      createRadioBox({
        "text": "Choose the elements that should be displayed",
        "settingsName": "prefMoreHidedElements",
        "options": [
          {"text": "Display all elements","value": "none", "selected": true},
          {"text": "Only display the shortcuts", "value": "pages"},
          {"text": "Only display the pages", "value": "shortcuts"}
        ]
      })
    ]
  });  
  appendSetting(moreSettings);
  
  
  
  var driveSettings = createSettingBlock({
    "text": "Drive Page",
    "imgName": "drive",
    "children": [
      createCheckBox({
        "text": "Hide file extensions",
        "settingsName": "prefDriveHideFileExtension"
      })
    ]
  });  
  appendSetting(driveSettings);
  
  
  
  
  
  var calendarSettings = createSettingBlock({
    "text": "Calendar Page",
    "imgName": "calendar",
    "children": [
      createCheckBox({
        "text": "Show empty days",
        "settingsName": "prefCalendarEmptydays"
      })
    ]
  });  
  appendSetting(calendarSettings);
  
  
  
  
  
  var gplusSettings = createSettingBlock({
    "text": "Google+ Page",
    "imgName": "gplus",
    "children": [
      createSelectBox({
        "text": "Choose default page",
        "settingsName": "prefGplusDefaultpage",
        "options": [
          {"text": "Share this page","value": "comments", "selected": true},
          {"text": "Notifications", "value": "notifications"}
        ]
      })
    ]
  });  
  appendSetting(gplusSettings);
  
  
  
  
  
  
  
  
    
  var translateSettings = createSettingBlock({
    "text": "Translate Page",
    "imgName": "translate",
    "children": [
      createSelectBox({
        "text": i18n("msg157", "Default source language:"),
        "settingsName": "prefTranslateSource",
        "options": [
          {"text":i18n("msg170", "Auto Detect"),"value":"auto"},
          {"text":"ar","value":"ar"},
          {"text":"bg","value":"bg"},
          {"text":"ca","value":"ca"},
          {"text":"cs","value":"cs"},
          {"text":"da","value":"da"},
          {"text":"de","value":"de"},
          {"text":"el","value":"el"},
          {"text":"en","value":"en"},
          {"text":"es","value":"es"},
          {"text":"fi","value":"fi"},
          {"text":"fr","value":"fr"},
          {"text":"hi","value":"hi"},
          {"text":"hr","value":"hr"},
          {"text":"id","value":"id"},
          {"text":"it","value":"it"},
          {"text":"iw","value":"iw"},
          {"text":"ja","value":"ja"},
          {"text":"ko","value":"ko"},
          {"text":"lt","value":"lt"},
          {"text":"lv","value":"lv"},
          {"text":"nl","value":"nl"},
          {"text":"no","value":"no"},
          {"text":"pl","value":"pl"},
          {"text":"pt","value":"pt"},
          {"text":"ro","value":"ro"},
          {"text":"ru","value":"ru"},
          {"text":"sk","value":"sk"},
          {"text":"sl","value":"sl"},
          {"text":"sr","value":"sr"},
          {"text":"sv","value":"sv"},
          {"text":"tl","value":"tl"},
          {"text":"uk","value":"uk"},
          {"text":"vi","value":"vi"},
          {"text":"zh","value":"zh"}
        ]
      }),
      createSelectBox({
        "text": i18n("msg158", "Default target language:"),
        "settingsName": "prefTranslateTarget",
        "options": [
          {"text":"Browser Language","value":"undefined"},
          {"text":"ar","value":"ar"},
          {"text":"bg","value":"bg"},
          {"text":"ca","value":"ca"},
          {"text":"cs","value":"cs"},
          {"text":"da","value":"da"},
          {"text":"de","value":"de"},
          {"text":"el","value":"el"},
          {"text":"en","value":"en"},
          {"text":"es","value":"es"},
          {"text":"fi","value":"fi"},
          {"text":"fr","value":"fr"},
          {"text":"hi","value":"hi"},
          {"text":"hr","value":"hr"},
          {"text":"id","value":"id"},
          {"text":"it","value":"it"},
          {"text":"iw","value":"iw"},
          {"text":"ja","value":"ja"},
          {"text":"ko","value":"ko"},
          {"text":"lt","value":"lt"},
          {"text":"lv","value":"lv"},
          {"text":"nl","value":"nl"},
          {"text":"no","value":"no"},
          {"text":"pl","value":"pl"},
          {"text":"pt","value":"pt"},
          {"text":"ro","value":"ro"},
          {"text":"ru","value":"ru"},
          {"text":"sk","value":"sk"},
          {"text":"sl","value":"sl"},
          {"text":"sr","value":"sr"},
          {"text":"sv","value":"sv"},
          {"text":"tl","value":"tl"},
          {"text":"uk","value":"uk"},
          {"text":"vi","value":"vi"},
          {"text":"zh-CN","value":"zh-CN"},
          {"text":"zh-TW","value":"zh-TW"}
        ]
      })
    ]
  });
  appendSetting(translateSettings);  
  
  
  
  
  
  
  
  
  
  
 
  
    
  
  
  var mapsSettings = createSettingBlock({
    "text": "Maps Page",
    "imgName": "places",
    "children": [
      createSelectBox({
        "text": i18n("msg159","Map View"),
        "settingsName": "prefMapsMaptype",
        "options": [
          {"text": i18n("msg171","Roadmap"),"value": "up_mapType=m", "selected": true},
          {"text": i18n("msg172","Terrain"), "value": "up_mapType=p"},
          {"text": i18n("msg173","Satellite"), "value": "up_mapType=k"},
          {"text": i18n("msg174","Hybrid"), "value": "up_mapType=h"},
        ]
      }),
      createTextBox({
        "text": i18n("msg161", "Default Location"),
        "settingsName": "prefMapsLocation"
      }),
      createCheckBox({
        "text": i18n("msg160","Show Traffic"),
        "settingsName": "prefMapsTraffic"
      })
    ]
  });
  
  appendSetting(mapsSettings);
  
  
  
  
  
  
  
  
  
  
  
  var newsSettings = createSettingBlock({
    "text": "News Page",
    "imgName": "news",
    "children": [
      createSelectBox({
        "text": i18n("msg162","News edition"),
        "settingsName": "prefNewsEdition",
        "options": [
          {"value":"undefined","text":"Autodetect", "selected": true},
          {"value":"lang=es&country=ar","text":"Argentina"},
          {"value":"country=au","text":"Australia"}
          ,{"value":"lang=nl&country=be","text":"België"},
          {"value":"lang=fr&country=be","text":"Belgique"},
          {"value":"lang=en&country=bw","text":"Botswana"},
          {"value":"lang=pt-BR&country=br","text":"Brasil"},
          {"value":"country=ca","text":"Canada English"},
          {"value":"lang=fr&country=ca","text":"Canada Français"},
          {"value":"lang=cs&country=cz","text":"Ceská republika"},
          {"value":"lang=es&country=cl","text":"Chile"},
          {"value":"lang=es&country=co","text":"Colombia"},
          {"value":"lang=es&country=cu","text":"Cuba"},
          {"value":"country=de","text":"Deutschland"},
          {"value":"country=es","text":"España"},
          {"value":"lang=es&country=us","text":"Estados Unidos"},
          {"value":"lang=en&country=et","text":"Ethiopia"},
          {"value":"country=fr","text":"France"},
          {"value":"lang=en&country=gh","text":"Ghana"},
          {"value":"country=in","text":"India"},
          {"value":"lang=id&country=id","text":"Indonesia"},
          {"value":"lang=en&country=ie","text":"Ireland"},
          {"value":"lang=en&country=il","text":"Israel"},
          {"value":"country=it","text":"Italia"},
          {"value":"lang=en&country=ke","text":"Kenya"},
          {"value":"lang=hu&country=hu","text":"Magyarország"},
          {"value":"lang=en&country=my","text":"Malaysia"},
          {"value":"lang=es&country=mx","text":"México"},
          {"value":"lang=en&country=na","text":"Namibia"},
          {"value":"lang=nl&country=nl","text":"Nederland"},
          {"value":"country=nz","text":"New Zealand"},
          {"value":"lang=en&country=ng","text":"Nigeria"},
          {"value":"lang=no&country=no","text":"Norge"},
          {"value":"lang=de&country=at","text":"Österreich"},
          {"value":"lang=en&country=pk","text":"Pakistan"},
          {"value":"lang=es&country=pe","text":"Perú"},
          {"value":"lang=en&country=ph","text":"Philippines"},
          {"value":"lang=pl&country=pl","text":"Polska"},
          {"value":"lang=pt-PT&country=pt","text":"Portugal"},
          {"value":"lang=de&country=ch","text":"Schweiz"},
          {"value":"lang=fr&country=sn","text":"Sénégal"},
          {"value":"lang=en&country=sg","text":"Singapore"},
          {"value":"lang=en&country=za","text":"South Africa"},
          {"value":"lang=fr&country=ch","text":"Suisse"},
          {"value":"lang=sv&country=se","text":"Sverige"},
          {"value":"lang=en&country=tz","text":"Tanzania"},
          {"value":"lang=tr&country=tr","text":"Türkiye"},
          {"value":"country=uk","text":"U.K."},
          {"value":"country=us","text":"U.S."},
          {"value":"lang=en&country=ug","text":"Uganda"},
          {"value":"lang=es&country=ve","text":"Venezuela"},
          {"value":"lang=vi&country=vn","text":"Việt Nam (Vietnam)"},
          {"value":"lang=en&country=zw","text":"Zimbabwe"},
          {"value":"lang=el&country=gr","text":"Ελλάδα (Greece)"},
          {"value":"lang=ru&country=ru","text":"Россия (Russia)"},
          {"value":"lang=ru&country=ua","text":"Украина (Ukraine)"},
          {"value":"lang=uk&country=ua","text":"Україна (Ukraine)"},
          {"value":"lang=iw&country=il","text":"ישראל (Israel)"},
          {"value":"lang=ar&country=ae","text":"الإمارات (UAE"},
          {"value":"lang=ar&country=sa","text":"السعودية (KS"},
          {"value":"lang=ar&country=me","text":"العالم العربي (Arab"},
          {"value":"lang=ar&country=lb","text":"لبنان (Leban"},
          {"value":"lang=ar&country=eg","text":"مصر (Egypt"},
          {"value":"lang=hi&country=in","text":"हिन्दी (In"},
          {"value":"lang=ta&country=in","text":"தமிழ் (Indi"},
          {"value":"lang=te&country=in","text":"తెలుగు (Ind"},
          {"value":"lang=ml&country=in","text":"മലയാളം (Indi"},
          {"value":"country=kr","text":"한국 (Korea)"},
          {"value":"country=cn","text":"中国版 (China)"},
          {"value":"country=tw","text":"台灣版 (Taiwan)"},
          {"value":"country=jp","text":"日本 (Japan)"},
          {"value":"country=hk","text":"香港版 (Hong Kong)"}
        ]
      })
    ]
  });  
  appendSetting(newsSettings);
  
  
  
  
  
  
  
  
  
  
  
  loadFontApi();
};


function appendSetting(setting){
  var lc = document.querySelector(".leftColumn");
  var rc = document.querySelector(".rightColumn");
  (lc.offsetHeight > rc.offsetHeight ? rc : lc).appendChild(setting);

}
function loadFontApi(){
  var link = document.createElement("link");
  link.setAttribute("href", "http://fonts.googleapis.com/css?family=Roboto:400,300,500|Open+Sans:300");
  link.setAttribute("rel", "stylesheet");
  document.head.appendChild(link);
}

function reloadBackgroundPage(){
  chrome.extension.getBackgroundPage().location.reload();
};

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("Text");
  var element = document.getElementById(data);
  if( (ev.target.id == "leftList" || ev.target.parentNode.id == "leftList") && element.parentNode.id == "leftList"){
    return;
  };
  
  if(ev.target.tagName == "UL"){
    ev.target.appendChild(element);
  }
  else {
    if(ev.target.parentNode.id == "leftList"){
      ev.target.parentNode.appendChild(element);
    }
    else {
      if(ev.offsetY <= 22) {
        ev.target.parentNode.insertBefore(element, ev.target);
      }
      else {
        ev.target.parentNode.insertBefore(element, ev.target.nextSibling);
      };
      
      ev.target.parentNode.insertBefore(element, (event.offsetY <= 22 ? ev.target : ev.target.nextSibling));
    };
  };
  if(rightList.children.length > 10){
    leftList.appendChild(rightList.children[10]);
  };
  var selectedServices = [];
  [].forEach.call(document.getElementById("rightList").children, function(li){
    selectedServices.push(li.id);
  });
  chrome.storage.sync.set({"selectedMenuItems": selectedServices});
  setTimeout(removeHoverIndicator, 10);
};

function createSettingBlock(parameters){
  /*parameters = {
"text": string,
"imgSrc": url,
"imgName": string,
"imgSize": number,
"children": array
}
*/
  var card = document.createElement("div");
  card.className = "card";
  var header = document.createElement("header");
  var span = document.createElement("span");
  var img = createIcon({
    "src": parameters.imgSrc ? parameters.imgSrc : undefined,
    "name": parameters.imgName,
    "size": parameters.imgSize ? parameters.imgSize : 32  
  });
  span.appendChild(img);
  header.appendChild(span);
  var h3 = document.createElement("h3");
  h3.textContent = parameters.text;
  header.appendChild(h3);
  card.appendChild(header);
  parameters.children.forEach(function(paragraph){
    card.appendChild(paragraph);
  });
  return card;
};

function createIcon(properties){
  /* var properties = {
    "name": string, //optional
    "src": url,
    "size": size
  }*/
  if(properties.src){
    var img = document.createElement("img");
    img.setAttribute("src", properties.src);
    return img;  
  }
  else {
    var img = document.createElement("img");
    if(!properties.size){
      properties.size = 32;
    };
    var color = properties.color ? properties.color : "";
    var src = "/images/" + properties.size + "/" + properties.name + "-" + color + properties.size + ".png";
    img.setAttribute("src", src);
    return img;
  };
};

function createCheckBox(parameters){
  /*
parameters = {
  "text": string,
  "onChange": function,
  "settingsName": string,
  "checked": boolean
}
*/
  var div = document.createElement("div");
  var label = document.createElement("label");
  var input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.checked = parameters.settingsName ? storage.get(parameters.settingsName) : parameters.checked 
  input.addEventListener("click", function(){
    if(parameters.onChange){
      console.log(parameters.onChange);
      parameters.onChange(this.checked);
    };
    if(parameters.settingsName){
      storage.set(parameters.settingsName, this.checked);
    };
  });
  label.appendChild(input);
  var text = document.createTextNode(parameters.text);
  label.appendChild(text);
  div.appendChild(label);
  return div;
};

function createTextBox(parameters){
  /*
parameters = {
  "text": string,
  "onChange": function,
  "settingsName": string,
  "value": string
}
*/
  var div = document.createElement("div");
  var label = document.createElement("label");
  var text = document.createTextNode(parameters.text);
  label.appendChild(text);
  var input = document.createElement("input");
  input.setAttribute("type", "search");
  var inputValue = (parameters.settingsName ? storage.get(parameters.settingsName) : parameters.value);
  input.value = inputValue == undefined ? "" : inputValue; 
  input.addEventListener("input", function(){
    if(parameters.onChange){
      parameters.onChange(this.value);
    };
    if(parameters.settingsName){
      storage.set(parameters.settingsName, this.value);
    };
  });
  label.appendChild(input);
  div.appendChild(label);
  return div;
};

function createRadioBox(parameters){
  /*
parameters = {
  "text": string,
  "options": [
    {"text": string, "value": string, "selected": boolean},
  ],
  "onChange": function,
  "settingsName"
}
*/
  var div = document.createElement("div");
  var header = document.createElement("label");
  header.textContent = parameters.text + ": ";
  div.appendChild(header);
  
  parameters.options.forEach(function(item){
    
    var br = document.createElement("br");
    div.appendChild(br);
    var label = document.createElement("label");
    var input = document.createElement("input");
    input.type = "radio";
    input.value = item.value;
    if(parameters.settingsName || parameters.value){
      if(item.value == (parameters.value ? parameters.value : storage.get(parameters.settingsName, "none"))){
        input.checked = true;
      };
    }
    else {
      console.log("c");
      input.checked = item.selected;
    };
    input.addEventListener("click", function(){
      if(this.checked){
        [].forEach.call(this.parentNode.parentNode.querySelectorAll("input"), function(element){
          element.checked = false;
        });
        this.checked = true;
        
        if(parameters.onChange){
          parameters.onChange(this.value);
        };
        if(parameters.settingsName){
          storage.set(parameters.settingsName, this.value);
        };
      };
    });
    label.appendChild(input);
    var text = document.createTextNode(item.text);
    label.appendChild(text);
    div.appendChild(label);
  });
  
  var br = document.createElement("br");
  div.appendChild(br);
  
  return div;
};

function createSelectBox(parameters){
  /*
parameters = {
  "text": string,
  "options": [
    {"text": string, "value": string, "selected": boolean},
  
  ],
  "onChange": function,
  "settingsName": string,
  "value": string
}
*/
  var div = document.createElement("div");
  var label = document.createElement("label");
  var select = document.createElement("select");
  select.addEventListener("change", function(){
    if(parameters.onChange){
      parameters.onChange(this.value);
    };
    if(parameters.settingsName){
      console.log(parameters.settingsName, this.value);
      storage.set(parameters.settingsName, this.value);
    };
  });
  parameters.options.forEach(function(element){
    var option = document.createElement("option");
    option.value = element.value;
    option.textContent = element.text;
    if(element.selected){
      option.selected = element.selected;
    };
    select.appendChild(option);
  });
  if(parameters.settingsName || parameters.value){
    select.value = parameters.value ? parameters.value : storage.get(parameters.settingsName);
  };
  var text = document.createTextNode(parameters.text + ": ");
  label.appendChild(text);
  label.appendChild(select);
  div.appendChild(label);
  return div;
};


function createSettingParagraph(parameters){
  /*parameters = {
  text: string,
  children: array
}
*/
  var container = document.createElement("div");
  var p = document.createElement("label");
  p.textContent = parameters.text;
  container.appendChild(p);
  var div = document.createElement("div");
  parameters.children.forEach(function(element){
    div.appendChild(element);
  });
  container.appendChild(div);
  return container;
};
     
var storage = {
  "get": function(storageValue, defaultValue){
    var value = localStorage.getItem(storageValue);
    if(defaultValue){
      if(!value || value == ""){
        return defaultValue;
      };
    };
    try{
      return JSON.parse(value);
    }
    catch(err){
      return value;
    };
  },
  "set": function(storageValue, value){
    localStorage.setItem(storageValue, JSON.stringify(value));
  },
  "remove": function(storageValue){
    localStorage.removeItem(storageValue);
  }
};


function i18n(id, message){
  try {
    return chrome.i18n.getMessage(id);
  }
  catch(err) {
    if(!message || message != ""){
      return "placeholder";
    }
    else {
      return message;
    };
  };
};