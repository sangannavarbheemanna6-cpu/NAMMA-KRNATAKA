var RADIO_STATIONS=[
  {name:"Radio City 91.1 FM",lang:"Kannada",url:"https://prclive1.listenon.in/Kannada",cat:"Kannada FM"},
  {name:"Big FM 92.7",lang:"Kannada",url:"https://stream.radio.co/s5c4e6db4c/listen",cat:"Kannada FM"},
  {name:"Radio Mirchi 98.3",lang:"Kannada",url:"https://stream.radio.co/sf7e2e1f60/listen",cat:"Kannada FM"},
  {name:"Radio City 91.1",lang:"Telugu",url:"https://prclive1.listenon.in/Telugu",cat:"Telugu FM"},
  {name:"Big FM 92.7",lang:"Telugu",url:"https://stream.radio.co/sa3e6db4c/listen",cat:"Telugu FM"},
  {name:"Radio Mirchi 98.3",lang:"Tamil",url:"https://stream.radio.co/sa1c5e3d4b/listen",cat:"Tamil FM"},
  {name:"Radio City",lang:"Hindi",url:"https://prclive1.listenon.in/Hindi",cat:"Hindi FM"},
  {name:"Fever FM 104",lang:"Hindi",url:"https://stream.radio.co/s1a2b3c4d5/listen",cat:"Hindi FM"},
  {name:"Radio Mirchi",lang:"Hindi",url:"https://peridot.streamguys.com:7150/Mirchi",cat:"Hindi FM"},
  {name:"AIR Vividh Bharati",lang:"Hindi",url:"https://air.pc.cdn.bitgravity.com/air/live/pbaudio110/playlist.m3u8",cat:"Hindi FM"},
  {name:"Divyavani FM",lang:"Devotional",url:"https://stream.radio.co/s3d7e8f9a0/listen",cat:"Devotional FM"},
  {name:"Radio Sai Global",lang:"Devotional",url:"https://stream.radiosai.in:8002/stream",cat:"Devotional FM"}
];
var RSS_FEEDS=[
  {name:"Times of India",url:"https://timesofindia.indiatimes.com/rssfeedstopstories.cms",cat:"news"},
  {name:"NDTV Movies",url:"https://feeds.feedburner.com/ndtvmovies-latest",cat:"movies"}
];
var RSS_PROXY="https://api.rss2json.com/v1/api.json";
var T={
  en:{title:"Entertainment",movies:"News",ott:"OTT",music:"Music",radio:"Radio",games:"Games",events:"Events",
    popular:"Latest News",upcoming:"Movies",nowPlaying:"Trending",search:"Search...",all:"All",noData:"No entertainment news available.",
    loading:"Loading...",error:"Error",retry:"Retry",refresh:"Refresh",favorites:"Favorites",addFav:"Add",removeFav:"Remove",
    play:"Play",pause:"Pause",reset:"Reset",newGame:"New Game",win:"You Win!",draw:"Draw!",
    playerX:"Player X",playerO:"Player O",yourTurn:"Your Turn",turns:"Turns",pairs:"Pairs",
    radioPlaying:"Now Playing",radioSelect:"Select Station",radioNow:"Online Radio",radioCat:"Categories",
    gamesPlay:"Play Games",sudoku:"Sudoku",tictactoe:"Tic-Tac-Toe",memoryGame:"Memory Game",wordPuzzle:"Word Puzzle",numberPuzzle:"Number Puzzle",
    ottLatest:"OTT Releases",musicTrending:"Trending",eventsNearby:"Events",watch:"Read More"},
  kn:{title:"ಮನರಂಜನೆ",movies:"ಸುದ್ದಿ",ott:"OTT",music:"ಸಂಗೀತ",radio:"ರೇಡಿಯೋ",games:"ಆಟಗಳು",events:"ಈವೆಂಟ್",
    popular:"ಇತ್ತೀಚಿನ ಸುದ್ದಿ",upcoming:"ಸಿನಿಮಾ",nowPlaying:"ಟ್ರೆಂಡಿಂಗ್",search:"ಹುಡುಕಿ...",all:"ಎಲ್ಲಾ",noData:"ಮನರಂಜನಾ ಸುದ್ದಿ ಲಭ್ಯವಿಲ್ಲ.",
    loading:"ಲೋಡ್...",error:"ದೋಷ",retry:"ಮರುಪ್ರಯತ್ನ",refresh:"ರಿಫ್ರೆಶ್",favorites:"ಮೆಚ್ಚಿನವು",addFav:"ಸೇರಿಸಿ",removeFav:"ತೆಗೆದು",
    play:"ಪ್ಲೇ",pause:"ವಿರಾಮ",reset:"ಮರುಹೊಂದಿಸಿ",newGame:"ಹೊಸ ಆಟ",win:"ಗೆದ್ದಿದ್ದೀರಿ!",draw:"ಡ್ರಾ!",
    playerX:"ಆಟಗಾರ X",playerO:"ಆಟಗಾರ O",yourTurn:"ನಿಮ್ಮ ಸರದಿ",turns:"ಸರದಿಗಳು",pairs:"ಜೋಡಿಗಳು",
    radioPlaying:"ಈಗ ಪ್ಲೇ",radioSelect:"ಸ್ಟೇಷನ್",radioNow:"ಆನ್‌ಲೈನ್ ರೇಡಿಯೋ",radioCat:"ವರ್ಗಗಳು",
    gamesPlay:"ಆಟ ಆಡಿ",sudoku:"ಸುಡೊಕು",tictactoe:"ಟಿಕ್-ಟ್ಯಾಕ್-ಟೋ",memoryGame:"ಮೆಮೊರಿ",wordPuzzle:"ಪದ ಒಗಟು",numberPuzzle:"ಸಂಖ್ಯೆ ಒಗಟು",
    ottLatest:"OTT",musicTrending:"ಟ್ರೆಂಡಿಂಗ್",eventsNearby:"ಈವೆಂಟ್",watch:"ಓದಿ"}
};
export{RADIO_STATIONS,RSS_FEEDS,RSS_PROXY,T};