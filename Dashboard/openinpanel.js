chrome.windows.create({
  url: "popup.html?popup",
  width: 610,
  height: 512,
  type: "panel",
  focused: true
});
window.close();