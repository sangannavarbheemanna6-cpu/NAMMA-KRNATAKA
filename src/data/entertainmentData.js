var TMDB_KEY="";
var TMDB_API="https://api.themoviedb.org/3";
var LASTFM_KEY="";
var LASTFM_API="https://ws.audioscrobbler.com/2.0";

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

var T={
  en:{title:"Entertainment",movies:"Movies",ott:"OTT",music:"Music",
    radio:"Radio",games:"Games",events:"Events",
    popular:"Popular Movies",upcoming:"Upcoming Movies",nowPlaying:"Now Playing",
    search:"Search movies, songs, events...",all:"All",
    rating:"Rating",release:"Release",language:"Language",genre:"Genre",
    duration:"Duration",overview:"Overview",
    ottLatest:"Latest OTT Releases",ottPlatform:"Platform",
    musicTrending:"Trending Songs",musicTop:"Top Albums",
    radioNow:"Online Radio",radioCat:"Categories",
    gamesPlay:"Play Games",sudoku:"Sudoku",tictactoe:"Tic-Tac-Toe",
    memoryGame:"Memory Game",wordPuzzle:"Word Puzzle",numberPuzzle:"Number Puzzle",
    eventsNearby:"Events in Karnataka",eventsFestivals:"Festivals",
    eventsCulture:"Cultural Programs",eventsMusic:"Music Shows",
    noData:"Data is currently unavailable.",
    noKey:"TMDB API key required. Get one free at themoviedb.org and set TMDB_KEY.",
    loading:"Loading...",error:"Error loading.",retry:"Retry",
    refresh:"Refresh",favorites:"Favorites",addFav:"Add to Favorites",
    removeFav:"Remove",watch:"Watch Trailer",details:"Details",
    play:"Play",pause:"Pause",reset:"Reset",newGame:"New Game",
    win:"You Win!",draw:"Draw!",lose:"You Lose!",
    playerX:"Player X",playerO:"Player O",yourTurn:"Your Turn",
    turns:"Turns",pairs:"Pairs",time:"Time",
    radioPlaying:"Now Playing",radioSelect:"Select Station"},
  kn:{title:"ಮನರಂಜನೆ",movies:"ಸಿನಿಮಾ",ott:"OTT",music:"ಸಂಗೀತ",
    radio:"ರೇಡಿಯೋ",games:"ಆಟಗಳು",events:"ಈವೆಂಟ್‌ಗಳು",
    popular:"ಜನಪ್ರಿಯ ಸಿನಿಮಾಗಳು",upcoming:"ಮುಂಬರುವ ಸಿನಿಮಾಗಳು",nowPlaying:"ಈಗ ಪ್ರದರ್ಶನ",
    search:"ಸಿನಿಮಾ, ಹಾಡು, ಈವೆಂಟ್ ಹುಡುಕಿ...",all:"ಎಲ್ಲಾ",
    rating:"ರೇಟಿಂಗ್",release:"ಬಿಡುಗಡೆ",language:"ಭಾಷೆ",genre:"ಪ್ರಕಾರ",
    duration:"ಅವಧಿ",overview:"ವಿವರ",
    ottLatest:"ಇತ್ತೀಚಿನ OTT ಬಿಡುಗಡೆಗಳು",ottPlatform:"ಪ್ಲಾಟ್‌ಫಾರ್ಮ್",
    musicTrending:"ಟ್ರೆಂಡಿಂಗ್ ಹಾಡುಗಳು",musicTop:"ಟಾಪ್ ಆಲ್ಬಮ್‌ಗಳು",
    radioNow:"ಆನ್‌ಲೈನ್ ರೇಡಿಯೋ",radioCat:"ವರ್ಗಗಳು",
    gamesPlay:"ಆಟ ಆಡಿ",sudoku:"ಸುಡೊಕು",tictactoe:"ಟಿಕ್-ಟ್ಯಾಕ್-ಟೋ",
    memoryGame:"ಮೆಮೊರಿ ಗೇಮ್",wordPuzzle:"ಪದ ಒಗಟು",numberPuzzle:"ಸಂಖ್ಯೆ ಒಗಟು",
    eventsNearby:"ಕರ್ನಾಟಕದ ಈವೆಂಟ್‌ಗಳು",eventsFestivals:"ಹಬ್ಬಗಳು",
    eventsCulture:"ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳು",eventsMusic:"ಸಂಗೀತ ಕಾರ್ಯಕ್ರಮಗಳು",
    noData:"ಡೇಟಾ ಪ್ರಸ್ತುತ ಲಭ್ಯವಿಲ್ಲ.",
    noKey:"TMDB API ಕೀ ಅಗತ್ಯವಿದೆ. themoviedb.org ನಲ್ಲಿ ಉಚಿತವಾಗಿ ಪಡೆಯಿರಿ.",
    loading:"ಲೋಡ್ ಆಗುತ್ತಿದೆ...",error:"ದೋಷ.",retry:"ಮರುಪ್ರಯತ್ನ",
    refresh:"ರಿಫ್ರೆಶ್",favorites:"ಮೆಚ್ಚಿನವು",addFav:"ಮೆಚ್ಚಿನವುಗಳಿಗೆ ಸೇರಿಸಿ",
    removeFav:"ತೆಗೆದುಹಾಕಿ",watch:"ಟ್ರೈಲರ್ ವೀಕ್ಷಿಸಿ",details:"ವಿವರಗಳು",
    play:"ಪ್ಲೇ",pause:"ವಿರಾಮ",reset:"ಮರುಹೊಂದಿಸಿ",newGame:"ಹೊಸ ಆಟ",
    win:"ನೀವು ಗೆದ್ದಿದ್ದೀರಿ!",draw:"ಡ್ರಾ!",lose:"ನೀವು ಸೋತಿದ್ದೀರಿ!",
    playerX:"ಆಟಗಾರ X",playerO:"ಆಟಗಾರ O",yourTurn:"ನಿಮ್ಮ ಸರದಿ",
    turns:"ಸರದಿಗಳು",pairs:"ಜೋಡಿಗಳು",time:"ಸಮಯ",
    radioPlaying:"ಈಗ ಪ್ಲೇ ಆಗುತ್ತಿದೆ",radioSelect:"ಸ್ಟೇಷನ್ ಆಯ್ಕೆಮಾಡಿ"}
};

export{TMDB_KEY,TMDB_API,LASTFM_KEY,LASTFM_API,RADIO_STATIONS,T};
