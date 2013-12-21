var youtubePage = {};

youtubePage.apiKey = "AIzaSyBoU4_PBKEtA-GJp5z55vwkv5qMAbhgOlo";
youtubePage.apiUrl = "https://www.googleapis.com/youtube/v3/";

youtubePage.focusSearchbox = function(){
  focusSearchBox(youtubePage.searchInput);
};

youtubePage.init = function (){
  youtubePage.body = document.getElementById("youtubePage");
  changeLoading("on", "youtube");
  
  var searchBox = createSearchBox({
    "searchOnEnter": youtubePage.startSearch,
    "inputPmsg": 8,
    "stayOnPageOnEnter": true
  });
  youtubePage.body.appendChild(searchBox);
  youtubePage.searchInput = searchBox.querySelector("input");
  
  youtubePage.searchResultsContainer = youtubePage.createSearchResultsContainer();
  youtubePage.body.appendChild(youtubePage.searchResultsContainer);
  
  youtubePage.videoPlayerContainer = youtubePage.createPlayerContainer();
  youtubePage.body.appendChild(youtubePage.videoPlayerContainer);
  
  var linksSection = createLinksSection({"onMouseEnter": youtubePage.loadLinksSection});
  youtubePage.body.appendChild(linksSection);
  
  youtubePage.searchVideos();
};

youtubePage.createPlayerContainer = function(){
  var videoPlayerContainer = document.createElement("div");
  videoPlayerContainer.className = "content view";
  videoPlayerContainer.dataset.toolbarCount = 1;
  return videoPlayerContainer;
};

youtubePage.createSearchResultsContainer = function(){
  var searchResults = document.createElement("div");
  searchResults.className = "content view on searchResults";
  searchResults.dataset.toolbarCount = 2;
  
  var filterBar = document.createElement("ul");
  filterBar.className = "toolbar";
  filterBar.appendChild(createSelectBox({
    "id": "filterSort",
    "onChange": youtubePage.startSearch,
    "options": [
      { "value": "date", "label": "sort by date"},
      { "value": "rating", "label": "sort by rating"},
      { "value": "relevance", "label": "sort by relevance", "selected": true},
      { "value": "title", "label": "sort by title"},
      { "value": "viewCount", "label": "sort by views"}
    ]
  }));
  
  filterBar.appendChild(createSelectBox({
    "id": "filterDuration",
    "onChange": youtubePage.startSearch,
    "options": [
      { "value": "any", "label": "any duration", "selected": true},
      { "value": "long", "label": "longer than 20 min"},
      { "value": "medium", "label": "between 4 and 20 min"},
      { "value": "short", "label": "shorter than 4 min"}
    ]
  }));
  
  filterBar.appendChild(createSelectBox({
    "id": "filterType",
    "onChange": youtubePage.startSearch,
    "options": [
      { "value": "any", "label": "any type", "selected": true},
      { "value": "episode", "label": "episodes"},
      { "value": "movie", "label": "movies"}
    ]
  }));  
  
  searchResults.appendChild(filterBar);
  
  youtubePage.searchResultList = createContent({
    "toolbarCount": 1,
    "onScrollBottom": youtubePage.loadMoreVideos
  });
  searchResults.appendChild(youtubePage.searchResultList);
  
  return searchResults;
};

youtubePage.loadLinksSection = function(){
  if(!youtubePage.linksSectionLoaded){
    youtubePage.linksSectionLoaded = true;
    var links = [
      {"i18n": 193, "link": "https://www.youtube.com/my_profile", "icon": "youtube_profile"},
      {"i18n": 194, "link": "https://www.youtube.com/my_videos", "icon": "youtube_uploads"},
      {"i18n": 195, "link": "https://www.youtube.com/my_favorites", "icon": "youtube_favorites"},
      {"i18n": 196, "link": "https://www.youtube.com/my_liked_videos", "icon": "youtube_likes"},
      {"i18n": 197, "link": "https://www.youtube.com/my_subscriptions", "icon": "youtube_subscriptions"},
      {"i18n": 198, "link": "https://www.youtube.com/channels", "icon": "youtube_channels"},
      {"i18n": 199, "link": "https://www.youtube.com/dashboard", "icon": "youtube_dashboard"},
      {"i18n": 200, "link": "https://www.youtube.com/editor", "icon": "youtube_video_editor"},
      {"i18n": 201, "link": "https://www.youtube.com/analytics", "icon": "youtube_analytics"},
      {"i18n": 202, "link": "https://www.youtube.com/inbox", "icon": "youtube_inbox"},
      {"i18n": 203, "link": "https://www.youtube.com/feed", "icon": "youtube_subscriptions"},
      {"i18n": 74,  "link": "https://www.youtube.com/feed/watch_later", "icon": "youtube_watch_later"},
      {"i18n": 204, "link": "https://www.youtube.com/feed/history", "icon": "youtube_history"},
      {"i18n": 75,  "link": "https://www.youtube.com/feed/playlists", "icon": "youtube_playlists"},
      {"i18n": 205, "link": "https://www.youtube.com/feed/subscriptions", "icon": "youtube_subscriptions"},
      {"i18n": 206, "link": "https://www.youtube.com/feed/social", "icon": "youtube_social"}
    ];
    document.querySelector("#youtubePage .linksSection").appendChild(createShortcutList(links));
    
  };
};

youtubePage.loadVideo = function(videoId){
  changeLoading("on", "youtube");
  var videoTitle = document.querySelector(".card[data-video-id='" + videoId + "'] .videoTitle").textContent;
  var videoUrl = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&theme=dark&html5=1&autohide=2";
  var videoPlayer = document.querySelector("#youtubePage .videoPlayer");
  if(!youtubePage.videoPlayerLoaded){
    youtubePage.videoPlayerLoaded = true;
    var ul = document.createElement("ul");
    ul.className = "toolbar";
    var backButton = document.createElement("button");
    backButton.className = "iconButton backButton";
    backButton.addEventListener("click", function(){
      youtubePage.searchResultsContainer.classList.add("on");
      document.querySelector("#youtubePage .videoPlayer").classList.remove("on");
      youtubePage.videoPlayerFrame.removeAttribute("src");
    });
    ul.appendChild(backButton);
    
    var videoTitleElement = document.createElement("p");
    videoTitleElement.className = "videoPlayerTitle";
    videoTitleElement.textContent = videoTitle;
    ul.appendChild(videoTitleElement);
    
    var previousButton = document.createElement("button");
    previousButton.className = "iconButton previousButton rightOpen";
    previousButton.addEventListener("click", function(){
      var oldVideoId = youtubePage.videoPlayerFrame.dataset.videoId;
      var newVideoId = document.querySelector(".card[data-video-id='" + oldVideoId + "']").previousSibling.dataset.videoId;
      if(newVideoId){
        youtubePage.loadVideo(newVideoId);
      };
    });
    ul.appendChild(previousButton);
    
    var nextButton = document.createElement("button");
    nextButton.className = "iconButton nextButton leftOpen";
    nextButton.addEventListener("click", function(){
      var oldVideoId = youtubePage.videoPlayerFrame.dataset.videoId;
      var oldVideoElement = document.querySelector(".card[data-video-id='" + oldVideoId + "']");
      if(oldVideoElement){
        var newVideoElement = oldVideoElement.nextSibling;
        if(newVideoElement){
          var newVideoId = newVideoElement.dataset.videoId;
          youtubePage.loadVideo(newVideoId);
        };
      };
    });
    ul.appendChild(nextButton);
    youtubePage.videoPlayerContainer.appendChild(ul);
    
    youtubePage.videoPlayerFrame = document.createElement("iframe");
    youtubePage.videoPlayerFrame.className = "videoPlayerFrame content";
    youtubePage.videoPlayerFrame.dataset.toolbarCount = 2;
    youtubePage.videoPlayerFrame.dataset.videoId = videoId;
    youtubePage.videoPlayerFrame.type = "text/html";
    youtubePage.videoPlayerFrame.frameBorder = 0;
    youtubePage.videoPlayerFrame.setAttribute("allowfullscreen", true);
    youtubePage.videoPlayerFrame.src = videoUrl;
    youtubePage.videoPlayerFrame.addEventListener("load", function(){
      changeLoading("off", "youtube");
    });
    youtubePage.videoPlayerContainer.appendChild(youtubePage.videoPlayerFrame);
    
    youtubePage.commentsSection = createLinksSection({"onMouseEnter": youtubePage.loadComments, "name": "Comments"});
    youtubePage.commentsSection.classList.add("commentsSection");
    youtubePage.videoPlayerContainer.appendChild(youtubePage.commentsSection);
  }
  else{
    document.querySelector("#youtubePage .videoPlayerTitle").textContent = videoTitle;
    youtubePage.videoPlayerFrame.src = videoUrl;
    youtubePage.videoPlayerFrame.dataset.videoId = videoId;
  };
};

youtubePage.loadComments = function(){
  var videoId = youtubePage.videoPlayerFrame.dataset.videoId;
  var baseUrl = "https://apis.google.com/_/widget/render/comments?extension=blackMenu&first_party_property=YOUTUBE&href=http://www.youtube.com/watch?v=";
  var url = baseUrl + videoId;
  if(youtubePage.commentsFrame){
    if(youtubePage.commentsFrame.src != url){
      youtubePage.commentsFrame.src = url;
    }
  }
  else {
    youtubePage.commentsFrame = document.createElement("iframe");
    youtubePage.commentsFrame.src = url;
    youtubePage.commentsFrame.className = "card";
    youtubePage.commentsSection.appendChild(youtubePage.commentsFrame);
  };
};

youtubePage.newListItem = function(videoDetails){
  var container = document.createElement("div");
  container.classList.add("card");
  container.dataset.videoId = videoDetails.videoId;
  container.addEventListener("click", function(){
    youtubePage.searchResultsContainer.classList.remove("on");
    youtubePage.videoPlayerContainer.classList.add("on");
    youtubePage.loadVideo(this.dataset.videoId);
  });
  var imageContainer = document.createElement("div");
  imageContainer.setAttribute("class", "imageContainer");
  imageContainer.setAttribute("style", "background-image: url('" + videoDetails.imageUrl + "');");
  imageContainer.dataset.duration = videoDetails.duration;
  container.appendChild(imageContainer);
  var descriptionContainer = document.createElement("div");
  descriptionContainer.setAttribute("class", "descriptionContainer");
  var videoTitle = document.createElement("h3");
  videoTitle.setAttribute("class", "videoTitle");
  videoTitle.textContent = videoDetails.videoTitle;
  descriptionContainer.appendChild(videoTitle);
  var channelTitle = document.createElement("h4")
  channelTitle.textContent = videoDetails.channelTitle;
  descriptionContainer.appendChild(channelTitle);
  container.appendChild(descriptionContainer);	
  var openInNewTab = document.createElement("div");
  openInNewTab.setAttribute("class", "openInNewTab");
  openInNewTab.setAttribute("title", "open video in a new tab");
  openInNewTab.addEventListener("click", function(){
    window.open("https://www.youtube.com/watch?v=" + this.parentNode.dataset.videoId, "_blank");
  });
  container.appendChild(openInNewTab);
  return container;
};

youtubePage.startSearch = function(){
  var searchQuery = youtubePage.searchInput.value;
  youtubePage.searchVideos({"q": searchQuery});
  youtubePage.searchResultsContainer.classList.add("on");
  youtubePage.videoPlayerContainer.classList.remove("on"); 
};

youtubePage.parseDurationString = function(durationString) {
  /* source: https://github.com/nezasa/iso8601-js-period/blob/master/iso8601.js */
  var valueIndexes = [2, 3, 4, 5, 7, 8, 9];
  var durationArray = [0, 0, 0, 0, 0, 0, 0];
  var struct = /^P((\d+Y)?(\d+M)?(\d+W)?(\d+D)?)?(T(\d+H)?(\d+M)?(\d+S)?)?$/.exec(durationString);
  
  for (var i = 0; i < valueIndexes.length; i++) {
    var structIndex = valueIndexes[i];
    durationArray[i] = struct[structIndex] ? +struct[structIndex].replace(/[A-Za-z]+/g, '') : 0;
  };
  var hour = durationArray[4] + 24 * (durationArray[3] + durationArray[2] * 7 + durationArray[1] * 30 + durationArray[0] * 360);
  var min = (durationArray[5].toString().length == 1) ? ("0" + durationArray[5]) : durationArray[5];
  var sec = (durationArray[6].toString().length == 1) ? ("0" + durationArray[6]) : durationArray[6];
  var duration =  ((hour == 0) ? "" : (hour + ":")) + min + ":" + sec;
  return duration;
};


youtubePage.loadVideoList = function(videos, moreResults){
  if(!moreResults){
    youtubePage.searchResultList.textContent = "";
  };
  for(var i in videos){
    youtubePage.searchResultList.appendChild(youtubePage.newListItem(videos[i]));
  };
  refreshScollShadow(youtubePage.searchResultList);
  changeLoading("off", "youtube");
};

youtubePage.loadMoreVideos = function(){
  youtubePage.searchVideos({"pageToken": youtubePage.nextPageToken}, true);
};

youtubePage.searchVideos = function(extraUrlParameters, moreResults){
  changeLoading("on", "youtube");
  var urlBase = youtubePage.apiUrl + "search";
  var parameters = {
  "part": "snippet",
  "key": youtubePage.apiKey,
  "fields": "items(id/videoId,snippet/title,snippet/channelTitle,snippet/thumbnails/default/url),nextPageToken",
  "type": "video",
  "order": document.getElementById("filterSort").value,
  "videoDuration": document.getElementById("filterDuration").value,
  "videoType": document.getElementById("filterType").value,
  "maxResults": 9
  };
  for(var i in extraUrlParameters){
    parameters[i] = extraUrlParameters[i];    
  };
  var urlParameters = createUrlParameters(parameters);
  var completeUrl = urlBase + urlParameters;
  console.log(completeUrl);
  var xhrSearch = new XMLHttpRequest();
  xhrSearch.open("get", completeUrl);
  xhrSearch.addEventListener("load", function(){
    var searchString = xhrSearch.responseText;
    var searchJSON = JSON.parse(searchString);
    youtubePage.nextPageToken = searchJSON.nextPageToken;
    var results = searchJSON.items;
    var videos = {};
    results.forEach(function(item){
      var videoId = item.id.videoId;
      videos[videoId] = {
        "videoId": videoId,
        "imageUrl": item.snippet.thumbnails.default.url,
        "channelTitle": item.snippet.channelTitle,
        "videoTitle": item.snippet.title
      };
    });
    var videoIds = [];
    for(var i in videos){
      videoIds.push(i);
    };
    var durationUrl = youtubePage.apiUrl + "videos"
    + "?part=contentDetails"
    + "&key=" + youtubePage.apiKey
    + "&fields=items(contentDetails/duration)"
    + "&id=" + videoIds.join(",");
    console.log(durationUrl);
    var xhrDuration = new XMLHttpRequest();
    xhrDuration.open("get", durationUrl);
    xhrDuration.addEventListener("load", function(){
      var durationString = xhrDuration.responseText;
      var durationJSON = JSON.parse(durationString);
      for(var i=0;i<videoIds.length;i++){
        var duration = youtubePage.parseDurationString(durationJSON.items[i].contentDetails.duration);
        videos[videoIds[i]].duration = duration;
      };
      youtubePage.loadVideoList(videos, moreResults);
    });
    xhrDuration.send();
  });
  xhrSearch.send();
};

if(document.body){
  youtubePage.init();
}
else {
  window.addEventListener("DOMContentLoaded", youtubePage.init);
};