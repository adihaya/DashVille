var morePage = {};

morePage.services = {
0: {name: "3D Warehouse", url: "http://sketchup.google.com/3dwarehouse", msg: "", tooltip: "Google 3D Warehouse is an online service that hosts 3D models of existing objects, locations (including buildings) and vehicles created in Google SketchUp by the aforementioned application's users. The models can be downloaded into Google SketchUp by other users or Google Earth.", icon: "3d_warehouse"},
1: {name: "About", url: "https://www.google.com/about/", msg: "", tooltip: "The one place to find everything about Google.", icon: "about"},
2: {name: "DoubleClick for Publishers", url: "https://www.google.com/admanager", msg: "", tooltip: "A hosted ad management solution.", icon: "doubleclick"},
3: {name: "Adwords - Display Planner", url: "https://adwords.google.com/da/DisplayPlanner/Home", msg: "", tooltip: "An online tool that allows users to view traffic estimates for popular web sites and create media plans.", icon: "adwords"},
4: {name: "AdSense", url: "https://www.google.com/adsense/", msg: "110", tooltip: "Advertisement program for Website owners. Adverts generate revenue on either a per-click or per-thousand-ads-displayed basis, and adverts shown are from AdWords users, depending on which adverts are relevant.", icon: "adsense"},
5: {name: "Advanced Search", url: "https://www.google.com/advanced_search", msg: "", tooltip: "Advanced Search", icon: "search"},
6: {name: "AdWords", url: "https://adwords.google.com/", msg: "120", tooltip: "Google's flagship advertising product, and main source of revenue. AdWords offers pay-per-click (PPC) advertising, and site-targeted advertising for both text and banner ads.", icon: "adwords"},
7: {name: "AdWords - External Keyword Tool", url: "https://adwords.google.com/select/KeywordToolExternal", msg: "", tooltip: "Helps users come up with keyword ideas for their AdWords campaigns, view keywords' search volume and determine the number of people running ads against a particular term.", icon: "adwords"},
8: {name: "AdWords - My Client Center", url: "https://www.google.com/adwords/myclientcenter", msg: "", tooltip: "With My Client Center (MCC), AdWords's powerful tool for large advertisers and third parties, you can manage multiple AdWords accounts quickly and easily from a single location.", icon: "adwords"},
9: {name: "AdWords - Traffic Estimator", url: "https://adwords.google.com/select/TrafficEstimatorSandbox", msg: "", tooltip: "Indicates the number of clicks to expect on Google Adwords ads for particular keywords. The tool can be used to indicate search volume, average cost per click, estimated ad positions, estimated clicks per day and estimated cost per day.", icon: "adwords"},
10: {name: "Alerts", url: "https://www.google.com/alerts", msg: "111", tooltip: "E-mail notification service, which sends alerts based on chosen search terms, whenever there are new results. Alerts include web results, Groups results news, and video.", icon: "alerts"},
11: {name: "Analytics", url: "https://www.google.com/analytics/web/", msg: "121", tooltip: "Traffic statistics generator for defined websites, with strong AdWords integration. Webmasters can optimize their ad campaigns, based on the statistics that are given.", icon: "analytics"},
12: {name: "Android Device Gallery", url: "https://www.android.com/devices/", msg: "", tooltip: "Browse the best Android-powered phones. Search by manufacturer, operator, and region. Compare tech specs and buy.", icon: "android_device_gallery"},
13: {name: "Api Console", url: "https://code.google.com/apis/console/", msg: "", tooltip: "Google Api Console", icon: "developers"},
14: {name: "Api Explorer", url: "https://developers.google.com/apis-explorer/", msg: "", tooltip: "Google Api Explorer", icon: "developers"},
15: {name: "App Engine", url: "https://appengine.google.com/", msg: "112", tooltip: "App Engine offers a complete development stack that uses familiar technologies to build and host web applications. Starting out will always be free and if you need additional computing resources, they're available at competitive market pricing.", icon: "app_engine"},
16: {name: "Apps", url: "https://www.google.com/enterprise/apps/", msg: "", tooltip: "Custom domain and service integration service for businesses, enterprise and education, featuring Gmail and other Google products.", icon: "apps"},
17: {name: "Apps Marketplace", url: "https://www.google.com/enterprise/marketplace/", msg: "", tooltip: "The Google Apps Marketplace offers products and services designed for Google users, including installable apps that integrate directly with Google Apps. Installable apps are easy to use because they include single sign-on, Google's universal navigation, and some even include features that integrate with your domain's data.", icon: "apps_marketplace"},
18: {name: "Art Project", url: "http://www.googleartproject.com", msg: "", tooltip: "Explore museums from around the world, discover and view hundreds of artworks at incredible zoom levels, and even create and share your own collection of masterpieces.", icon: "art_project"},
19: {name: "Baraza", url: "http://www.google.com/baraza", msg: "", tooltip: "To help users in Africa enrich and shape the content about Africa, the engineers of Google have created Google Baraza. Baraza, which means 'taskforce' or 'council' in Swahili, allows people in countries across Africa to share knowledge with each other by asking questions and posting answers.", icon: "guru"},
20: {name: "Blog Directory", url: "https://www.google.com/press/blog-directory.html", msg: "", tooltip: "A directory containing all Google blogs.", icon: "blogdirectory"},
21: {name: "Blogger", url: "https://draft.blogger.com/home", msg: "122", tooltip: "Weblog publishing tool. Users can create custom, hosted blogs with features such as photo publishing, comments, group blogs, blogger profiles and mobile-based posting with little technical knowledge.", icon: "blogger"},
22: {name: "Blogsearch", url: "https://www.google.com/blogsearch", msg: "", tooltip: "Weblog search engine, with a continuously-updated search index. Results include all blogs, not just those published through Blogger. Results can be viewed and filtered by date.", icon: "blogs"},
23: {name: "Bookmarks", url: "https://www.google.com/bookmarks/", msg: "", tooltip: "Use Web History to find the sites you visit frequently and bookmark your favorites.", icon: "bookmarks"},
24: {name: "Books", url: "http://books.google.com/", msg: "", tooltip: "Search engine for the full text of printed books Google scans and stores in its digital database. The content that is displayed depends on the arrangement with the publishers, ranging from short extracts to entire books.", icon: "books"},
25: {name: "Browser Size", url: "http://browsersize.googlelabs.com", msg: "", tooltip: "Google Browser Size is a visualization of browser window sizes for people who visit Google.", icon: "browser_size"},
27: {name: "Calendar", url: "https://www.google.com/calendar/", msg: "13", tooltip: "Free online calendar. It includes a unique 'quick add' function which allows users to insert events using natural language input. Other features include Gmail integration and calendar sharing.", icon: "calendar"},
28: {name: "Calendar - New event", url: "https://www.google.com/calendar/render?action=TEMPLATE", msg: "", tooltip: "Create a new event in Google Calendar.", icon: "calendar_new"},
29: {name: "Cars", url: "https://www.google.com/cars", msg: "", tooltip: "Google Cars", icon: "cars"},
30: {name: "Chrome Experiments", url: "http://www.chromeexperiments.com", msg: "", tooltip: "Chrome Experiments is a showcase for creative web experiments, the vast majority of which are built with the latest open technologies, including HTML5, Canvas, SVG, and WebGL.", icon: "chrome_experiments"},
31: {name: "Chrome Web Store", url: "https://chrome.google.com/webstore/", msg: "113", tooltip: "The Chrome Web Store is an online marketplace where you can discover thousands of apps, extensions and themes for Google Chrome.", icon: "chrome_web_store"},
32: {name: "Chrome Web Store - Developer Dashboard", url: "https://chrome.google.com/webstore/developer/dashboard", msg: "", tooltip: "Administer your Google Chrome apps and extensions through this developer website.", icon: "chrome_web_store"},
33: {name: "Chrome Web Store - Extensions", url: "https://chrome.google.com/webstore/category/extensions", msg: "", tooltip: "Add features to Google Chrome by installing extensions via the extensions online gallery.", icon: "chrome_extensions"},
34: {name: "Chrome Web Store - Themes", url: "https://chrome.google.com/webstore/category/themes", msg: "", tooltip: "", icon: "chrome_web_store"},
35: {name: "Cloud Print", url: "https://www.google.com/cloudprint", msg: "", tooltip: "Google Cloud Print makes printing more intuitive, accessible and useful, by letting you print to your printers from Google Cloud Print-enabled apps on any computer or smart phone.", icon: "cloudprint"},
36: {name: "Code", url: "https://code.google.com", msg: "", tooltip: "Google's site for developers interested in Google-related development. The site contains Open Source code and lists of their API services. Also provides project hosting for any free and open source software.", icon: "code"},
37: {name: "Consumer Surveys", url: "https://www.google.com/insights/consumersurveys/home", msg: "", tooltip: "Create surveys in minutes and access near instant Google-powered reports, charts, and insights.", icon: "consumer_surveys"},
38: {name: "Consumer Surveys - New Survey", url: "https://www.google.com/insights/consumersurveys/create", msg: "", tooltip: "", icon: "consumer_surveys"},
39: {name: "Contacts", url: "https://www.google.com/contacts/", msg: "97", tooltip: "Manage your Gmail contacts.", icon: "contacts"},
40: {name: "Coordinate", url: "https://coordinate.google.com", msg: "", tooltip: "Communicate with your mobie workforce, see all of their locations on a map, pinpoint and assign jobs to your workforce, notify and update your workforce instantly, report and review everything that happens.", icon: "coordinate"},
41: {name: "CS4HS", url: "http://cs4hs.com", msg: "", tooltip: "CS4HS (Computer Science for High School) is an initiative sponsored by Google to promote Computer Science and Computational Thinking in high school and middle school curriculum.", icon: "cs4hs"},
42: {name: "Custom Search", url: "https://www.google.com/cse", msg: "28", tooltip: "With Google Custom Search, you can harness the power of Google to create a customized search experience for your own website.", icon: "customsearch"},
43: {name: "Dashboard", url: "https://www.google.com/dashboard/", msg: "119", tooltip: "Dashboard is an online tool that allows Google Account holders to view all their personal information Google is storing on their servers.", icon: "dashboard"},
44: {name: "Demo Slam", url: "http://www.demoslam.com", msg: "", tooltip: "Google Demo Slam: Technology is awesome. Learning about it isn't. Until now.", icon: "demo_slam"},
45: {name: "Developers", url: "https://developers.google.com/", msg: "114", tooltip: "A new Google Developers site to unite all our developer resources, programs, events, groups, tools, and products. ", icon: "developers"},
46: {name: "Docs", url: "https://drive.google.com/document/create", msg: "", tooltip: "Create a new document in Google Docs.", icon: "docs"},
47: {name: "Drawings", url: "https://drive.google.com/drawings/create", msg: "", tooltip: "Create a new drawing in Google Docs.", icon: "drawings"},
48: {name: "Drive", url: "https://drive.google.com", msg: "8", tooltip: "On April 26, 2012, Google launched Google Drive, which supplants Google Docs. It combines all of the Docs features with improved storage functionality: Document, spreadsheet and presentation application, with document collaboration and publishing capabilities.", icon: "drive"},
49: {name: "Earth", url: "https://www.google.com/earth/", msg: "", tooltip: "Virtual globe that uses satellite imagery, aerial photography and GIS over a 3D globe.", icon: "earth"},
50: {name: "Earth Engine", url: "https://earthengine.google.org/", msg: "", tooltip: "Google Earth Engine brings together the world's satellite imagery - trillions of scientific measurements dating back more than 25 years - and makes it available online with tools for scientists, independent researchers, and nations to mine this massive warehouse of data to detect changes, map trends and quantify differences on the earth's surface.", icon: "earth_engine"},
51: {name: "Ejabat", url: "http://ejabat.google.com/ejabat", msg: "", tooltip: "Google Ejabat is a new question & answers site in Arabic language powered by Google. It is like the service Wenda in China and similar to Yahoo! Answers.", icon: "guru_rtl"},
52: {name: "Elections", url: "https://www.google.com/elections/", msg: "", tooltip: "All news about politics and elections aggregated in one place.", icon: "elections"},
53: {name: "Feedburner", url: "https://feedburner.google.com/", msg: "", tooltip: "News feed management services, including feed traffic analysis and advertising facilities.", icon: "feedburner"},
54: {name: "Finance", url: "https://www.google.com/finance", msg: "123", tooltip: "Searchable US business news, opinion, and financial data. Features include company-specific pages, blog search, interactive charts, executives information, discussion groups and a portfolio.", icon: "finance"},
55: {name: "Finance - Currency Converter", url: "https://www.google.com/finance/converter", msg: "", tooltip: "Google Currency Converter is a tool from Google Finance, that converts a currency into another one.", icon: "currency_converter"},
56: {name: "Flights", url: "https://www.google.com/flights/", msg: "", tooltip: "Choose your flight from a simple list of results, explore destinations on a map, and find travel dates with the lowest fare with Flight Search.", icon: "flights"},
57: {name: "Forms", url: "https://docs.google.com/forms/create", msg: "", tooltip: "Create a new form in Google Docs.", icon: "forms"},
58: {name: "Fusion Tables", url: "https://www.google.com/fusiontables/DataSource?dsrcid=implicit", msg: "", tooltip: "Share and discuss your data online. Upload small or large data sets from spreadsheets or CSV files. Visualize your data on maps, timelines and charts. Pick who can access your data; hide parts of your data if needed. Merge data from multiple tables. Discuss your data with others. Track changes and discussions.", icon: "fusion_tables"},
59: {name: "Gmail", url: "https://mail.google.com", msg: "7", tooltip: "Free Webmail IMAP and POP e-mail service provided by Google, known for its abundant storage and advanced interface.", icon: "googlemail"},
60: {name: "Gmail - New mail", url: "https://mail.google.com/mail/?view=cm", msg: "", tooltip: "Create a new mail in Google Mail.", icon: "googlemail_compose"},
61: {name: "Fonts", url: "https://www.google.com/fonts/", msg: "", tooltip: "The Google Web Fonts lets you browse all the fonts available via the Google Font API. All fonts in the directory are available for use on your website under an open source license and served by Google servers.", icon: "fonts"},
62: {name: "Input Tools", url: "https://www.google.com/inputtools/cloud/try/", msg: "50", tooltip: "Google Transliteration offers an option for converting Roman characters to their phonetic equivalent in your language. Note that this is not the same as translation -- it is the sound of the words that are converted from one alphabet to the other, not their meaning.", icon: "google_input_tools"},
63: {name: "Play -  Developer Console", url: "https://play.google.com/apps/publish/", msg: "", tooltip: "You need to be registered as a developer to access it.", icon: "android_developer_console"},
64: {name: "Play - Artist Hub", url: "https://play.google.com/artists/", msg: "", tooltip: "", icon: "play_music_artist_hub"},
65: {name: "Play - My Books", url: "https://play.google.com/books", msg: "", tooltip: "Discovering your favorite books and authors has never been easier. With Google Play, you can shop the world's largest selection of ebooks and read them anywhere you like - on a tablet, phone, ereader, or the Web.", icon: "play_books"},
66: {name: "Play - My Devices", url: "https://play.google.com/device", msg: "", tooltip: "Buy devices directly from Google.", icon: "play_devices"},
67: {name: "Play - My Magazines", url: "https://play.google.com/magazines", msg: "", tooltip: "", icon: "play_magazines"},
68: {name: "Play - My Movies", url: "https://play.google.com/movies", msg: "", tooltip: "", icon: "play_movies"},
69: {name: "Play - My Music", url: "https://play.google.com/music/", msg: "", tooltip: "", icon: "play_music"},
70: {name: "Play Store", url: "https://play.google.com/store", msg: "", tooltip: "Get all the Android apps and games you love on Google Play. With over 450,000 apps, Google Play has something for everyone. Browse and install your favorite Android apps from your device or the Web instantly.", icon: "play_store"},
71: {name: "Play Store - Apps", url: "https://play.google.com/store/apps", msg: "", tooltip: "", icon: "play_store_apps"},
72: {name: "Play Store - Books", url: "https://play.google.com/store/books", msg: "", tooltip: "Discovering your favorite books and authors has never been easier. With Google Play, you can shop the world's largest selection of ebooks and read them anywhere you like - on a tablet, phone, ereader, or the Web.", icon: "play_store_books"},
73: {name: "Play Store - Devices", url: "https://play.google.com/store/devices", msg: "", tooltip: "Buy devices directly from Google.", icon: "play_store_devices"},
74: {name: "Play Store - Magazines", url: "https://play.google.com/store/magazines", msg: "", tooltip: "Enjoy your favorite magazines, anywhere you go. Discover hundreds of bestselling magazines on Google Play.", icon: "play_store_magazines"},
75: {name: "Play Store - Movies", url: "https://play.google.com/store/movies", msg: "", tooltip: "With Google Play, watch HD movies, including new releases, award-winning films, and your favorite classics on any Android device or on the Web. Stream movies or download them for offline viewing at any time.", icon: "play_store_movies"},
76: {name: "Play Store - Music", url: "https://play.google.com/store/music", msg: "", tooltip: "With Google Play you can discover new artists, browse millions of tracks and share music you buy with your friends on Google+. You can even store up to 20,000 songs from your own library for free and instantly access your music on any of your Android devices or the web -- no more syncing or wires.", icon: "play_store_movies"},
77: {name: "Play Store - Orders", url: "https://play.google.com/store/account", msg: "", tooltip: "", icon: "play_store"},
78: {name: "Play Store - Settings", url: "https://play.google.com/store/account?settings=1", msg: "", tooltip: "", icon: "play_store"},
79: {name: "Google Settings", url: "https://www.google.com/settings/", msg: "129", tooltip: "Overview of your various Google Services & access to their account settings.", icon: "google_settings"},
80: {name: "Google Store", url: "http://www.google-store.com", msg: "", tooltip: "Official Google and YouTube merchandise -- logo clothing, items, etc.", icon: "googlestore"},
81: {name: "Google TV", url: "https://www.google.com/tv/", msg: "", tooltip: "Google TV is a new experience that combines TV, the entire web, and apps -- as well as a way to search across them all.", icon: "google_tv"},
82: {name: "Google+", url: "https://plus.google.com", msg: "1", tooltip: "Google Plus (originally written as Google+, sometimes abbreviated as G+) is a social networking and identity service.", icon: "gplus"},
83: {name: "Google+ Circles", url: "https://plus.google.com/circles", msg: "", tooltip: "Your Google+ circles.", icon: "gplus_circles"},
84: {name: "Google+ Events", url: "https://plus.google.com/events/", msg: "", tooltip: "Events - Celebrate what matters with the people who matter most", icon: "gplus_events"},
85: {name: "Google+ What's hot", url: "https://plus.google.com/explore", msg: "", tooltip: "Find out what's new and interesting on Google+.", icon: "gplus_explore"},
87: {name: "Google+ Hangouts on air", url: "https://plus.google.com/hangouts", msg: "", tooltip: "Catch up with your friends, face-to-face-to-face.", icon: "gplus_hangouts"},
88: {name: "Google+ Pages", url: "https://plus.google.com/dashboard", msg: "", tooltip: "", icon: "gplus_pages"},
89: {name: "Google+ Photos", url: "https://plus.google.com/u/0/photos", msg: "", tooltip: "Your photos shared in Google+.", icon: "gplus_photos"},
90: {name: "Google+ Profile", url: "https://plus.google.com/u/0/me", msg: "", tooltip: "Manage your Google+ profile.", icon: "gplus_profile"},
91: {name: "Government requests", url: "https://www.google.com/transparencyreport/removals/government/", msg: "", tooltip: "Google regularly receives requests from government agencies around the world to remove content from services, or provide information about users of services and products. A world map shows the number of requests.", icon: "governmentrequests"},
92: {name: "Green", url: "https://www.google.com/green/", msg: "", tooltip: "A better web. Better for the environment. Google is creating a better web that's better for the environment. We're greening our company by using resources efficiently and supporting renewable power. That means when you use Google products, you're being better to the environment.", icon: "green"},
93: {name: "Groups", url: "https://groups.google.com/", msg: "124", tooltip: "Web and e-mail discussion service and Usenet archive. Users can join a group, make a group, publish posts, track their favorite topics, write a set of group web pages updatable by members and share group files.", icon: "groups"},
94: {name: "Hotel Finder", url: "https://www.google.com/hotels/", msg: "", tooltip: "Google Hotel Finder is a new experimental product that makes it easier to compare and book hotels that are found across the web.", icon: "hotel_finder"},
95: {name: "iGoogle", url: "https://www.google.com/ig", msg: "", tooltip: "Customizable homepage, which can contain Web feeds and Google Gadgets.", icon: "igoogle"},
96: {name: "Image Search", url: "https://www.google.com/imghp", msg: "", tooltip: "Image search engine, with results based on the filename of the image, the link text pointing to the image and text adjacent to the image. When searching, a thumbnail of each matching image is displayed.", icon: "images"},
97: {name: "Keep", url: "https://drive.google.com/keep/", msg: "", tooltip: "Quickly capture what’s on your mind and recall it easily wherever you are. Create a checklist, enter a voice note or snap a photo and annotate it.", icon: "keep"},
99: {name: "LIFE photo archive", url: "http://images.google.com/hosted/life", msg: "", tooltip: "Search millions of photographs (including unpublished) from the LIFE photo archive, stretching from the 1750s to today.", icon: "life"},
100: {name: "Mapmaker", url: "https://www.google.com/mapmaker", msg: "54", tooltip: "Edit the map in more than a hundred countries and watch your edits go into Google Maps. Become a citizen cartographer and help map your world!", icon: "mapmaker"},
101: {name: "Maps", url: "https://www.google.com/maps", msg: "3", tooltip: "Mapping service that indexes streets and displays satellite and street-level imagery, providing driving directions and local business search.", icon: "maps"},
102: {name: "Maps - Floor plans", url: "https://maps.google.com/floorplans/find", msg: "", tooltip: "Add floor plans of buildings to Google Maps.", icon: "floor_plans"},
103: {name: "Mars", url: "https://www.google.com/mars/", msg: "185", tooltip: "A shaded relief map color-coded by altitude of the mars.", icon: "mars"},
104: {name: "Merchant Center", url: "http://www.google.com/merchants", msg: "", tooltip: "Service that makes it easy to upload and manage the Product listings you want to appear in Google Product Search, AdWords, and other Google properties. (Replaced Google Base)", icon: "merchant_center"},
105: {name: "Moderator", url: "https://www.google.com/moderator/", msg: "", tooltip: "Google Moderator is a Google service that uses crowdsourcing to rank user-submitted questions, suggestions and ideas. The service allows the management of feedback from a large number of people, who can vote for the top questions that they think should be posed and ask their own. The service aims to ensure that every question is considered, lets the audience see others' questions, and helps the moderator of a team or event address the questions that the audience most cares about.", icon: "moderator"},
106: {name: "Moon", url: "https://www.google.com/moon/", msg: "183", tooltip: "A photographic map of the equatorial region with pan and zoom capability, showing locations of the Apollo landings.", icon: "moon"},
107: {name: "Movies", url: "https://www.google.com/movies", msg: "", tooltip: "A specialised search engine that obtains Film showing times near a user-entered location as well as providing reviews of films compiled from several different websites.", icon: "movies"},
108: {name: "My Devices", url: "https://www.google.com/apps/mydevices", msg: "", tooltip: "Allow mobile device management by end users: Reset PIN, Lock device, Ring device, Locate device. This is available only for Google Apps accounts with Google Apps Device Policy app installed and correct permissions on the back end by Google Apps administrator.", icon: "mydevices"},
109: {name: "News", url: "https://news.google.com/", msg: "6", tooltip: "Automated news compilation service and search engine for news. There are versions of the aggregator for more than 20 languages. While the selection of news stories is fully automated, the sites included are selected by human editors.", icon: "news"},
110: {name: "News Archive", url: "https://news.google.com/news/advanced_news_search?as_drrb=a", msg: "78", tooltip: "Feature within Google News, that allows users to browse articles from over 200 years ago.", icon: "news_archive"},
111: {name: "Offers", url: "https://www.google.com/offers/home", msg: "115", tooltip: "Google Offers is a deal-of-the-day website that will be localized to major geographic markets in the United States and abroad.", icon: "offers"},
112: {name: "Orkut", url: "https://www.orkut.com/", msg: "", tooltip: "Social networking service, where users can list their personal and professional information, create relationships amongst friends and join communities of mutual interest.", icon: "orkut"},
113: {name: "Pacman", url: "https://www.google.com/doodles/30th-anniversary-of-pac-man", msg: "", tooltip: "Mini version of game, originally created as an animated logo for the game's 30th anniversary on May 22, 2010.", icon: "pacman"},
114: {name: "Panoramio", url: "http://www.panoramio.com", msg: "", tooltip: "Panoramio is a geolocation-oriented photo sharing website. Accepted photos uploaded to the site can be accessed as a layer in Google Earth and Google Maps, with new photos being added at the end of every month.", icon: "panoramio"},
115: {name: "Patent Search", url: "https://www.google.com/?tbm=pts", msg: "", tooltip: "Search engine to search through millions of patents, each result with its own page, including drawings, claims and citations.", icon: "patents"},
116: {name: "Picasa Web Albums", url: "https://picasaweb.google.com/home", msg: "125", tooltip: "Lets you view photo albums that you have stored online.", icon: "picasa"},
117: {name: "Places - New Place", url: "https://www.google.com/local/add", msg: "", tooltip: "Create, edit & manage your free local Google Maps business listing. Add address, phone number, hours of operation, photos, and other details.", icon: "places_new"},
118: {name: "Postini", url: "https://login.postini.com/exec/login", msg: "", tooltip: "Postini is an E-mail and Web security and archiving service owned by Google since 2007. It provides cloud computing services for filtering e-mail spam and malware (before it is delivered to a client's mail server), offers optional e-mail archiving, and protects client networks from web-borne malware. Please change the URL according to your e-mail address.", icon: "postini"},
119: {name: "Product Ideas", url: "https://www.google.com/productideas/", msg: "", tooltip: "Share your feedback and make suggestions to help improve Google products.", icon: "product_ideas"},
120: {name: "Public Alerts", url: "https://www.google.org/publicalerts", msg: "", tooltip: "", icon: "public_alerts"},
121: {name: "Public data explorer", url: "https://www.google.com/publicdata/home", msg: "", tooltip: "Students, journalists, policy makers and everyone else can play with the tool to create visualizations of public data, link to them, or embed them in their own webpages.", icon: "public_data_explorer"},
124: {name: "Schemer", url: "https://www.schemer.com/", msg: "", tooltip: "Whether it's exploring a new city, checking out a friend's movie recommendation, or just finding new activities for your weekends, Schemer lets you discover new things to do, share schemes with friends, and make the most of your day.", icon: "schemer"},
125: {name: "Scholar", url: "https://www.google.com/scholar", msg: "116", tooltip: "Search engine for the full text of scholarly literature across an array of publishing formats and scholarly fields. Today, the index includes virtually all peer-reviewed journals available online.", icon: "scholar"},
126: {name: "Scripts", url: "https://google.com/script", msg: "", tooltip: "Google Scripts", icon: "script"},
127: {name: "Search Settings", url: "https://www.google.com/preferences", msg: "", tooltip: "Set your preferences regarding the Google Search.", icon: "search"},
128: {name: "Sheets", url: "https://docs.google.com/spreadsheet/ccc?new=true", msg: "", tooltip: "Create a new spreadsheet in Google Docs.", icon: "spreadsheets"},
129: {name: "Shopping", url: "https://www.google.com/shopping", msg: "", tooltip: "Google Shopping, formerly Google Products and Froogle, is a price comparison service.", icon: "shopping"},
130: {name: "Sites", url: "https://sites.google.com/", msg: "126", tooltip: "Google Sites is a structured wiki offered by Google as part of Google Apps. It replaces Google Page Creator, Google's previous webpage creation service.", icon: "sites"},
131: {name: "SketchUp Showcase", url: "http://showcase.sketchup.com/", msg: "", tooltip: "Browse some of the best SketchUp projects from around the world.", icon: "sketchup"},
132: {name: "Sky", url: "https://www.google.com/sky/", msg: "183", tooltip: "An Internet tool for viewing the stars and galaxies.", icon: "sky"},
133: {name: "Slides", url: "https://docs.google.com/presentation/create", msg: "", tooltip: "Create a new presentation in Google Docs.", icon: "presentations"},
134: {name: "SMS Channels", url: "http://labs.google.co.in/smschannels/browse", msg: "", tooltip: "Google India only. Launched September 2008, allows users to create and subscribe to channels over SMS. Channels can be based on RSS feeds.", icon: "sms_channels"},
135: {name: "SMS Channels - My Channels", url: "http://labs.google.co.in/smschannels/browse?cat=All&sort=2&ctab=My&select=status%3AAll&cr=in", msg: "", tooltip: "Google India only. Launched September 2008, allows users to create and subscribe to channels over SMS. Channels can be based on RSS feeds.", icon: "sms_channels"},
136: {name: "Submit your content", url: "https://www.google.com/submityourcontent/", msg: "", tooltip: "Site with links to all Google sites where users can share their content.", icon: "submityourcontent"},
137: {name: "Support", url: "https://support.google.com/", msg: "", tooltip: "Google Help Centers. Visit the Help Centers to find instructions and tips for the Google products you use and solve any problems you encounter.", icon: "help"},
138: {name: "Support forum", url: "https://www.google.com/support/forum", msg: "", tooltip: "Googles support forums for its different services like AdSense, Chrome, News, iGoogle, Websearch, etc.", icon: "help"},
139: {name: "Takeout", url: "https://www.google.com/takeout", msg: "", tooltip: "Download an archive of your data from: +1s, Buzz, Contacts and Circles, Picasa Web Albums, Profile, Stream, Voice.", icon: "takeout"},
140: {name: "Tasks", url: "https://mail.google.com/tasks/canvas", msg: "109", tooltip: "Manage your to-do list while you're on the go. You can create lists of things you need to get done and check off tasks as they're completed.", icon: "tasks"},
141: {name: "Teach Parents Tech", url: "http://www.teachparentstech.org", msg: "", tooltip: "This site was built by a few folks at Google to help keep tech support a family business.", icon: "teach_parents_tech"},
142: {name: "Templates", url: "https://docs.google.com/templates", msg: "", tooltip: "Create a new document from a template in Google Docs.", icon: "templates"},
143: {name: "Transit", url: "https://www.google.com/transit", msg: "", tooltip: "Public transport trip planning through the Google Maps interface.", icon: "transit"},
144: {name: "Translate", url: "https://translate.google.com", msg: "2", tooltip: "Google Translate is a service to translate a section of text, or a webpage, into another language.", icon: "translate"},
145: {name: "Translator Toolkit", url: "https://translate.google.com/toolkit/", msg: "49", tooltip: "Free online language translation service that instantly translates text and/or web pages.", icon: "translator_toolkit"},
146: {name: "Transparency Report", url: "https://www.google.com/transparencyreport/", msg: "", tooltip: "Website containing the interactive map of Government Requests that shows the number of government inquiries for information about users and requests for Google to take down or censor content, and the interactive Traffic graph providing information about traffic to Google services around the world.", icon: ""},
147: {name: "Trends", url: "https://www.google.com/trends/", msg: "27", tooltip: "Graph plotting application for Web Search statistics, showing the popularity of particular search terms over time. Multiple terms can be shown at once. Results can also be displayed by city, region or language. Related news stories are also shown.", icon: "trends"},
148: {name: "Trends - Cold Searches", url: "https://www.google.com/trends/coldtrends", msg: "", tooltip: "", icon: "trends"},
149: {name: "Trends - Hot Searches", url: "https://www.google.com/trends/hottrends", msg: "", tooltip: "The top 100 fastest-rising search queries right now (U.S. only). Updates throughout the day.", icon: "trends_hot"},
150: {name: "Trusted Stores", url: "https://www.google.com/trustedstores/sell/", msg: "", tooltip: "", icon: "trusted_stores"},
151: {name: "Trusted Tester", url: "https://www.google.com/trustedtester/", msg: "", tooltip: "", icon: ""},
152: {name: "Url Shortener - Dashboard", url: "https://goo.gl/", msg: "117", tooltip: "Google URL Shortener at goo.gl is a service that takes long URLs and squeezes them into fewer characters to make a link that is easier to share, tweet, or email to friends. The shortened URL will be displayed in the popup where it can be copied for further use.", icon: "goo_gl"},
153: {name: "Video", url: "https://www.google.com/videohp", msg: "", tooltip: "Video search engine and online store for clips internally submitted by companies and the general public. Google's main video partnerships include agreements with CBS, NHL and the NBA. Also searches videos posted on YouTube, Metacafe, Daily Motion, and other popular video hosting sites.", icon: "videos"},
154: {name: "Voice", url: "https://www.google.com/voice", msg: "127", tooltip: "This is a free voice communications product that includes a POTS telephone number. It includes a follow-me service that allows the user to forward their Google voice phone number to simultaneously ring up to 6 other phone numbers. It also features a unified voice mail service, SMS and free outgoing calls via Google's 'click2call' and 3rd party dialers.", icon: "voice"},
155: {name: "Wallet", url: "https://wallet.google.com/manage/", msg: "118", tooltip: "Introducing Google Wallet - a smart, virtual wallet that saves you time and money. With the Google Wallet mobile app, you can make your phone your wallet.", icon: "wallet"},
156: {name: "Web History", url: "https://history.google.com/history/", msg: "", tooltip: "Web page tracking, which records Google searches, Web pages, images, videos, music and more. It also includes Bookmarks, search trends and item recommendations.", icon: "web_history"},
157: {name: "Web Search", url: "https://www.google.com/webhp", msg: "0", tooltip: "Web search engine, which is Google's core product.", icon: "search"},
158: {name: "Webmaster Tools", url: "https://www.google.com/webmasters/tools/home", msg: "128", tooltip: "Sitemap submission and analysis for the Sitemaps protocol. Renamed from Google Sitemaps to cover broader features, including query statistics and robots.txt analysis.", icon: "webmaster_tools"},
159: {name: "Wenda", url: "http://www.google.com.hk/wenda", msg: "", tooltip: "Wenda (wen da meaning 'ask and answer' in Chinese) is a new question & answers site in China powered by Google, in cooperation with Tianya.cn, a popular net forum in China.", icon: "guru"},
160: {name: "YouTube", url: "https://www.youtube.com", msg: "5", tooltip: "Popular free video sharing Web site which lets users upload, view, and share video clips.", icon: "youtube"},
161: {name: "YouTube - Analytics", url: "https://www.youtube.com/analytics", msg: "", tooltip: "YouTube Analytics allows anyone with a video on YouTube to analyze their performance, understand their audience, and measure their global engagement.", icon: "youtube_analytics"},
162: {name: "YouTube TV", url: "https://www.youtube.com/tv", msg: "", tooltip: "YouTube Leanback is a personalized channel that can be accessed on Google TV and the web. Leanback gives the user a customized and easy viewing experience with a well designed interface to access full HD videos.", icon: "youtube"},
163: {name: "Zeitgeist", url: "https://www.google.com/zeitgeist/", msg: "", tooltip: "Along with Year-end Zeitgeist and Zeitgeist archives the Zeitgeist website provides several tools that give insight into global, regional, past and present search trends.", icon: "zeitgeist"},
164: {name: "Tag Manager", url: "https://www.google.com/tagmanager/web/", msg: "", tooltip: "Google Tag Manager makes it easy for marketers to add and update website tags -- including analytics, remarketing, and more – with just a few clicks, and without bugging the IT folks.", icon: "tag_manager"},
165: {name: "Tables Search", url: "https://research.google.com/tables", msg: "", tooltip: "Create and share your work online and access your documents from anywhere. Manage documents, spreadsheets, presentations, surveys, and more all in one easy to use productivity suite. It's easy to get started - just upload a file from your desktop.", icon: "fusion_tables"},
166: {name: "Offers - my offers", url: "https://www.google.com/offers/my", msg: "", tooltip: "Get amazing deals at the best places to eat, shop, and play. Subscribe now and get offers in your inbox when Google Offers launches in your city.", icon: "offers"},
167: {name: "Maps Engine", url: "https://mapsengine.google.com/map", msg: "", tooltip: "Maps Engine makes it easy to create and share maps online.", icon: "maps_engine"},
168: {name: "Maps Preview", url: "https://www.google.com/maps/preview", msg: "", tooltip: "Try out the google maps of the future.", icon: "maps"},
169: {name: "AdWords Express", url: "https://adwords.google.com/express/", msg: "", tooltip: "Google AdWords Express is the simplest way to advertise your local business on both Google Search and Google Maps.", icon: "adwords_express"},
170: {name: "Google+ Communities", url: "https://plus.google.com/communities", msg: "", tooltip: "Your Google+ communities.", icon: "gplus_communities"},
171: {name: "Admin Console", url: "https://admin.google.com/", msg: "", tooltip: "Allow mobile device management by end users: Reset PIN, Lock device, Ring device, Locate device. This is available only for Google Apps accounts with Google Apps Device Policy app installed and correct permissions on the back end by Google Apps administrator.", icon: "admin_console"},
179: {name: "Android Device Manager", url: "https://www.google.com/android/devicemanager", msg: "", tooltip: "Android Device Manager makes it easy to locate, ring, or wipe your device from the web.", icon: "android_device_manager"},
180: {name: "YouTube - Subscriptions", url: "https://www.youtube.com/feed/subscriptions", msg: "", tooltip: "Share your videos with friends, family, and the world", icon: "youtube"},
181: {name: "Feedback Reports", url: "https://www.google.com/tools/feedback/reports", msg: "", tooltip: "", icon: "feedback"},
182: {name: "Adwords - Keyword Planner", url: "https://adwords.google.com/ko/KeywordPlanner/Home", msg: "", tooltip: "", icon: "adwords"},
183: {name: "Wallet - Merchant Center", url: "https://wallet.google.com/merchant/", msg: "", tooltip: "", icon: "wallet"},
184: {name: "DoubleClick Studio", url: "http://www.google.com/doubleclick/studio/", msg: "", tooltip: "", icon: "doubleclick"},
185: {name: "Maps - Location History", url: "https://maps.google.com/locationhistory/b/0/", msg: "", tooltip: "", icon: "maps"},
186: {name: "Analytics Gallery", url: "https://www.google.com/analytics/gallery/#landing/start/", msg: "", tooltip: "", icon: "analytics"},
187: {name: "YouTube - Keyword tool", url: "https://www.youtube.com/keyword_tool", msg: "", tooltip: "", icon: "youtube"},
188: {name: "ReCaptcha", url: "https://www.google.com/recaptcha/admin/", msg: "", tooltip: "", icon: "recaptcha"},
189: {name: "Trends - Explore", url: "http://www.google.com/trends/explore", msg: "", tooltip: "", icon: "trends"},
190: {name: "Webmaster Tools - My Removal Requests", url: "https://www.google.com/webmasters/tools/removals", msg: "", tooltip: "", icon: "webmaster_tools"},
}

morePage.focusSearchbox = function(){
  focusSearchBox(morePage.searchInput);
};

morePage.init = function() {
  morePage.body = document.getElementById("morePage");
  
  var searchBox = createSearchBox({
    searchOnEnter: morePage.openFirstShortcut,
    searchOnInput: morePage.searchServices,
    buttonType: "launch",
    buttonTooltip: "launch first shortcut in the list",
    inputMessage: "Search all google services...",
    "withBottomBorder": true
  });
  morePage.body.appendChild(searchBox);
  morePage.searchInput = searchBox.querySelector("input");
  
  morePage.content = createContent({
    "toolbarCount": 1
  });
  
  if(storage.get("prefMoreHidedElements", "none") != "pages" && document.body.id == "body"){
    morePage.servicesListHeader = createCardHeader({
      "name": "More Pages - drag to the right to add"
    });
    morePage.content.appendChild(morePage.servicesListHeader);
    
    morePage.servicesList = document.createElement("ul");
    morePage.servicesList.className = "buttonList cardButtonList";
    for(var i in pages){
      if((selectedMenuItems.indexOf(i) == -1) && (i != "more")){
        morePage.servicesList.appendChild(createMenuItem(i));
      };
    };
    loadMenuFunctionality(morePage.servicesList);
    morePage.content.appendChild(morePage.servicesList);
  };
  
  if(storage.get("prefMoreHidedElements", "none") != "shortcuts" || document.body.id != "body"){
    morePage.shortcutsListHeader = createCardHeader({
      "name": "Google Shortcuts"
    });
    morePage.content.appendChild(morePage.shortcutsListHeader);
    
    morePage.shortcutsList = document.createElement("ul");
    morePage.shortcutsList.className = "buttonList card";
    morePage.content.appendChild(morePage.shortcutsList);
    morePage.loadList();
  };
  
  
    morePage.body.appendChild(morePage.content);
  
};

morePage.loadList = function() {
  var ul = [];
  for(var i in morePage.services){
    morePage.loadService(i,ul);
  };
  morePage.sortList(ul);
};

morePage.searchServices = function() {
  var query = morePage.searchInput.value;
  var queryLowerCase = query.toLowerCase();
  
  var elements = morePage.content.querySelectorAll(".buttonlist li");
  for(var i = elements.length; i--; i>0){
    elements[i].classList[(elements[i].textContent.toLowerCase().indexOf(queryLowerCase) == -1) ? "add" : "remove"]("off");
  };
  
  var shortcutsListEmpty = morePage.shortcutsList.querySelectorAll("li:not(.off)").length == 0;
  morePage.shortcutsListHeader.classList[shortcutsListEmpty ? "add": "remove"]("off");
  var servicesListEmpty = morePage.servicesList.querySelectorAll("li:not(.off)").length == 0;
  morePage.servicesListHeader.classList[servicesListEmpty ? "add": "remove"]("off");
};

morePage.openFirstShortcut = function(){
  morePage.shortcutsList.querySelector("li:not(.off)").click();
};

morePage.loadService = function(id,ul,query) {
  var serviceName = morePage.services[id].name;
  var properties = {
    "id": id,
    "name": serviceName,
    "imgName": morePage.services[id].icon == "" ? "undefined": morePage.services[id].icon,
    "tooltip": (morePage.services[id].tooltip) ? (serviceName + " - " + morePage.services[id].tooltip) : serviceName,
    "clickFunction": morePage.openShortcut
  };  
  ul.push(createShortcut(properties));
};

morePage.openShortcut = function() {
  var serviceId = this.dataset.id;
  chrome.storage.sync.get("serviceClicks", function(item) {
    var list = item.serviceClicks == undefined ? {} : item.serviceClicks;
    if(list[serviceId] == undefined) list[serviceId] = 0;
    list[serviceId] += 1;
    chrome.storage.sync.set({"serviceClicks":list});
    var url = morePage.services[serviceId].url;
    window.open(url, "_blank");
  });
};

morePage.sortList = function(list) {
  var newList = [];
  chrome.storage.sync.get("serviceClicks", function(item) {
    console.log(item.serviceClicks);
    var ali = Array.prototype.slice.call(list);
    ali.sort(liServiceClicks);
    for( var i=0;i<ali.length;i++){
      newList.push(ali[i]);
    };
    morePage.refreshList(newList);
    function liServiceClicks(one, two) {
      var oneServiceClicks;
      var twoServiceClicks;
      if(item.serviceClicks != undefined){
        oneServiceClicks = item.serviceClicks[one.dataset.id];
        twoServiceClicks = item.serviceClicks[two.dataset.id];
      };
      if(oneServiceClicks == undefined) oneServiceClicks = 0;
      if(twoServiceClicks == undefined) twoServiceClicks = 0;
      return oneServiceClicks == twoServiceClicks ? (one.getElementsByTagName("p")[0].textContent < two.getElementsByTagName("p")[0].textContent ? -1 : 1) : (oneServiceClicks > twoServiceClicks ? -1 : 1);
    };
  });
};

morePage.refreshList = function(listItems) {
  listItems.forEach(function(item){
    morePage.shortcutsList.appendChild(item);
  });
};

if(document.body){
  morePage.init();
  
  if(document.querySelector("#moreHeader")){
  var div = document.createElement("div");
  var openSettings = createIcon({
    "name": "settings",
    "color": "w",
    "size": 32
  });
  openSettings.addEventListener("click", function(){
    window.open("/options.html", "_blank");
  });
  div.appendChild(openSettings);
  document.querySelector("#moreHeader").appendChild(div);
  };
}
else {
  window.addEventListener("DOMContentLoaded", morePage.init);
};