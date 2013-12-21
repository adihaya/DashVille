
function startTime()
{
var today=new Date();
var h=today.getHours();

     if (h>12){
          h-=12;
     }
var m=today.getMinutes();
var s=today.getSeconds();
// add a zero in front of numbers<10
m=checkTime(m);
s=checkTime(s);
document.getElementById('nowtime').innerHTML=h+":"+m;
t=setTimeout(function(){startTime()},500);
}

function checkTime(i)
{
if (i<10)
  {
  i="0" + i;
  }
return i;
}

function pgreload()
{
     window.location.reload();
}

function newtab(loc) {
     chrome.tabs.create({url: loc});
}

function newtabhere() {
     chrome.tabs.create({url:window.location.href})
}

function gotogame() {
     var game_src= "http://cache.hackedonlinegames.com/uploads/games/files/247/4FJ2FL2YS82H.swf?version=2";
     chrome.tabs.create({url:game_src})
     console.log("gotogame() called, game_src to '"+game_src+"', initiated")
     alert("gotogame debug alert\n press OK to exit alert")
}
     
chrome.browserAction.onClicked.addListener(newtab);
chrome.browserAction.onClicked.addListener(newtabhere);
chrome.browserAction.onClicked.addListener(gotogame);




