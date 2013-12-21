window.addEventListener("DOMContentLoaded", init);

var resultStart = 0;
var query;
var columnsHeight = [0,0,0];
var imgWidth = 119;

function init(){
  query = (location.href.indexOf("?q=") != -1) ? location.href.split("?q=")[1].split("&")[0] : undefined;
  if(query && query != ""){
    loadResults();
  }
  else {
    var resultsCountElement = createCardHeader({
      "name": "Please enter a search query"
    });
    document.body.appendChild(resultsCountElement);
    changeLoading("off");
  };
};

function loadResults(){
  changeLoading("on");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://www.google.com/search?newwindow=1&igu=1&extension=blackMenu&safe=off&noj=0&tbm=isch&sout=1&q=" + query + "&start=" + resultStart)
  xhr.addEventListener("load", function(){
    if(resultStart == 0){
      var resultsCount = xhr.responseText.split('id="resultStats">')[1].split("</div>")[0]
      
      window.content = createContent({
        "onScrollBottom": loadResults
      });
      document.body.appendChild(content);
      
      var resultsCountElement = createCardHeader({
        "name": resultsCount
      });
      content.appendChild(resultsCountElement);
      
      window.leftColumn = document.createElement("div");
      leftColumn.className = "column leftColumn";
      content.appendChild(leftColumn);
      
      window.middleColumn = document.createElement("div");
      middleColumn.className = "column middleColumn";
      content.appendChild(middleColumn);
      
      window.rightColumn = document.createElement("div");
      rightColumn.className = "column rightColumn";
      content.appendChild(rightColumn);
    };
    resultStart += 20;
    var newImgWidth = document.body.offsetWidth / 3 - 20;
    if(newImgWidth < 20){
      newImgWidth = 119
    }
    imgWidth = newImgWidth;
    
    var div = document.createElement("div")
    div.innerHTML = xhr.responseText.split('id="ires">')[1].split("</div>")[0]
    var elements = div.querySelectorAll("td");
    for(var i=0;i<elements.length;i++){
      var properties = {
        "imgSrc": elements[i].querySelector("img").src,
        "imgHeight": elements[i].querySelector("img").height,
        "imgWidth": elements[i].querySelector("img").width,
        "url": "https://www.google.com/url?url=" + elements[i].querySelector("a").href.split("?url=")[1],
        "originLong": elements[i].querySelector("cite").title,
        "sizeAndType": elements[i].innerText.split("\n")[3]/*,
        "description": elements[i].innerText.split("\n")[2],
        "originShort": elements[i].querySelector("cite").textContent*/
      };
      createImagesCard(properties);
    };
    changeLoading("off");
  });
  xhr.send();
};

function createImagesCard(properties){
  console.log(properties.sizeAndType.split("-"));
  var card = document.createElement("div");
  card.className = "card";
  card.dataset.after = properties.originLong;
  card.dataset.before = properties.sizeAndType;
  card.addEventListener("click", function(){
    window.open(properties.url, "_blank");
  });
  var img = document.createElement("img");
  img.src = properties.imgSrc;
  card.appendChild(img);
  var min = Math.min.apply(Math, columnsHeight);
  var columnId = columnsHeight.indexOf(min);
  var imgHeight = imgWidth / properties.imgWidth * properties.imgHeight;
  columnsHeight[columnId] += imgHeight;
  console.log(imgWidth);
  document.getElementsByClassName("column")[columnId].appendChild(card);
};