window.addEventListener("load", init);

function init() {
  setInterval(displaySharebox,1000);
  checkIfUrl();
};

function displaySharebox() {
  document.getElementsByClassName("KQc fc")[0].setAttribute("style", "display:block;");
};

function checkIfUrl() {
  if(location.href.indexOf("url=") != -1){
    var url = location.href.split("url=")[1].split("&")[0];
    if(url != "undefined"){
      var decodedUrl = decodeURIComponent(url);
      checkShareboxElement(decodedUrl);
    };
  };
};

function checkShareboxElement(url) {
  if(!document.querySelector('div[guidedhelpid="toolbar"]>div>span:nth-child(2)')) {
    setTimeout(function(){checkShareboxElement(url)}, 100);
  }
  else {
    document.querySelector('div[guidedhelpid="toolbar"]>div>span:nth-child(2)').click();
    checkInputElement(url);
  };
};
var inputCheckedCount = 0;
function checkInputElement(url){
  var inputElement = document.querySelector("input.fm");
  inputCheckedCount += 1;
  if(!inputElement){
    if(inputCheckedCount == 10){
      inputCheckedCount = 1;
      checkShareboxElement(url);
    }
    else {
      setTimeout(function(){checkInputElement(url)}, 100);
    };
  }
  else {
    var keyboardEvent = document.createEvent("KeyboardEvent");
    var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
    
    keyboardEvent[initMethod](
      "keypress", // event type : keydown, keyup, keypress
      true, // bubbles
      true, // cancelable
      window, // viewArg: should be window
      false, // ctrlKeyArg
      false, // altKeyArg
      false, // shiftKeyArg
      false, // metaKeyArg
      13, // keyCodeArg : unsigned long the virtual key code, else 0
      0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
    );
    
    inputElement.value = url;
    inputElement.dispatchEvent(keyboardEvent);
    //checkSubmitButton();
    checkTextareaElement();
  };
};

function checkSubmitButton(){
  console.log("GPLUS - checking submit button element");
  var submitButton = document.querySelector('.cba .ZK div[role="button"]:last-child');
  if(!submitButton){
    setTimeout(function(){checkSubmitButton()}, 100);
  }
  else {
    console.log("GPLUS - found submit button element");
    submitButton.click();
    document.getElementById(':2.f').focus();
    checkTextareaElement();
  };
};

function checkTextareaElement(){
  console.log("GPLUS - checking textarea element");
  var textareaElement = document.getElementById(":2.f");
  if(!textareaElement){
    setTimeout(function(){checkTextareaElement()}, 100);
  }
  else {
    console.log("GPLUS - found textarea element");
    textareaElement.focus();
  };
};