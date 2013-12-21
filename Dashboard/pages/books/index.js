var booksPage = {};

booksPage.focusSearchbox = function(){
  focusSearchBox(booksPage.searchInput);
};

booksPage.init = function(){
  changeLoading("on", "books");
  booksPage.query = (location.href.indexOf("q=") != -1) ? location.href.split("q=")[1].split("&")[0] : undefined;
  booksPage.body = document.getElementById("booksPage");
  if(!booksPage.query && booksPage.query != ""){
    var searchBox = createSearchBox({
      "searchOnEnter": booksPage.searchBooks,
      "inputMessage": "Search books...",
      "withBottomBorder": true,
    "stayOnPageOnEnter": true
    });
    booksPage.body.appendChild(searchBox);
    booksPage.searchInput = searchBox.querySelector("input");
  };
  
  booksPage.content = createContent({
    "toolbarCount": booksPage.query ? 0 : 1,
    "onScrollBottom": booksPage.loadMoreResults
  });
  booksPage.body.appendChild(booksPage.content);
  booksPage.searchBooks();
};

booksPage.loadMoreResults = function(){
  booksPage.searchBooks(true);
};

booksPage.searchBooks = function(moreResults){
  if(!moreResults){
    booksPage.startIndex = 0;
    booksPage.content.textContent = "";
  }
  else {
    booksPage.startIndex += 9;
  };
  var maxResults = 10;
  var query = booksPage.searchInput ? booksPage.searchInput.value : booksPage.query;
  if(query && (query != "")){
    var url = "https://www.googleapis.com/books/v1/volumes?q=" + encodeURI(query) + "&maxResults=9&startIndex=" + booksPage.startIndex;
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.addEventListener("load", function(){
      if(xhr.status == 200){
        var results = JSON.parse(xhr.responseText);
        var totalItems = results.totalItems;
        if(totalItems != 0){
          booksPage.loadResults(results.items);
          return;
        };
      };
      booksPage.noResults();
    });
    xhr.send();
  }
  else {
    booksPage.enterSearchQuery();
  };
};

booksPage.noResults = function() {
  var header = createCardHeader({"name": "No books matched the query"});
  booksPage.content.appendChild(header);
  changeLoading("off", "books");
};

booksPage.enterSearchQuery = function() {
  var header = createCardHeader({"name": "Please enter a search query"});
  booksPage.content.appendChild(header);
  changeLoading("off", "books");
};

booksPage.loadResults = function(items) {
  items.forEach(function(item) {
    console.log(item);
    var info = {};
    var volumeInfo = item.volumeInfo;
    info.title = volumeInfo.title;
    if(volumeInfo.industryIdentifiers){
      info.isbn = volumeInfo.industryIdentifiers[0].identifier;
    };
    info.id = item.id;
    info.longDescription = volumeInfo.description;
    info.description = volumeInfo.description ? volumeInfo.description : (volumeInfo.searchInfo ? volumeInfo.searchInfo.textSnippet : volumeInfo.searchInfo);
    info.infoLink = volumeInfo.infoLink;
    info.previewLink = volumeInfo.previewLink;
    info.authors = volumeInfo.authors;
    info.year = volumeInfo.publishedDate;
    booksPage.content.appendChild(booksPage.createResultElement(info));
  });
  refreshScollShadow(booksPage.content);
  changeLoading("off", "books");
};

booksPage.createResultElement = function(info) {
  var card = document.createElement("div");
  card.classList.add("card");
  var header = document.createElement("header");
  var thumbnailMainContainer = document.createElement("div");
  thumbnailMainContainer.classList.add("imageContainer");
  thumbnailSubContainer = document.createElement("div");
  
  var thumbnail = document.createElement("img");
  var thumbnailUrl = "https://books.google.com/books?printsec=frontcover&img=1&zoom=5&id=" + info.id;
  thumbnail.setAttribute("src", thumbnailUrl);
  thumbnailSubContainer.appendChild(thumbnail);
  thumbnailMainContainer.appendChild(thumbnailSubContainer);
  header.appendChild(thumbnailMainContainer);
  var heading = document.createElement("a");
  heading.setAttribute("href", info.infoLink);
  heading.setAttribute("target", "_blank");
  var a = document.createElement("h3");
  a.innerText = info.title;
  heading.appendChild(a);
  header.appendChild(heading);
  if(info.isbn || info.id){
    var citation = document.createElement("h4");
    var parameter = info.isbn ? ("isbn=" + info.isbn) : ("id=" + info.id);
    citation.innerText = "books.google.com/books?" + parameter;
    header.appendChild(citation);
  }
  var links = document.createElement("div");
  links.classList.add("links");
  if(info.previewLink){
    var preview = document.createElement("a");
    preview.innerText = "Preview" + " ";
    preview.setAttribute("href", info.previewLink);
    preview.setAttribute("target", "_blank");
    links.appendChild(preview);
  };
  if(info.year){
    var year = document.createElement("span");
    year.innerText = info.year + " ";
    links.appendChild(year);
  };
  if(info.authors){
    var authors = document.createElement("span");
    var authorsText = "";
    info.authors.forEach(function(author){
      authorsText += " " + author;
    });
    authors.innerText = authorsText;
    links.appendChild(authors);
  };
  header.appendChild(links);
  card.appendChild(header);
  if(info.description) {
    var description = document.createElement("article");
    var descriptionText = info.description;
    if(descriptionText.length > 500) {
      descriptionText = descriptionText.substring(0,500) + "..."; 
    };
    description.textContent = descriptionText;
    card.appendChild(description);
  };
  return card;		
};

if(document.body){
  booksPage.init();
}
else {
  window.addEventListener("DOMContentLoaded", booksPage.init);
};