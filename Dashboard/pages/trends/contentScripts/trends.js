var pn = "p1";
var options = {
  "p1": "United States",
  "p3": "India",
  "p4": "Japan",
  "p5": "Singapore",
  "p6": "Israel",
  "p8": "Australia",
  "p9": "United Kingdom",
  "p10": "Hong Kong",
  "p12": "Taiwan",
  "p13": "Canada",
  "p14": "Russia",
  "p15": "Germany",
  "p16": "France",
  "p17": "Netherlands"
};

window.addEventListener("load", init);

function init(){
  
  pn = location.href.split("pn=")[1].split("&")[0];
  var selectBox = createSelectBox({
    "onChange": changeLocation,
    "options": options
  });
  var container = document.getElementById("widget-list-panel-container");
  var firstChild = container.children[0];
  container.insertBefore(selectBox, firstChild);
  firstChild.setAttribute("style", "display: none !important;");
};

function createSelectBox(properties){
  var selectBox = document.createElement("select");
  if(properties.id){
    selectBox.id = properties.id;
  };
  selectBox.addEventListener("change", properties.onChange);
  for(var i in properties.options){
    var option = document.createElement("option");
    option.textContent = options[i];
    option.setAttribute("value", i);
    if(i == pn){
      option.setAttribute("selected", "true");
    };
    selectBox.appendChild(option);
  };
  return selectBox;
};

function changeLocation(){
  location.href = "https://www.google.com/trends/hottrends/gadget?hl=en&tn=5001&pn=" + this.value;
};