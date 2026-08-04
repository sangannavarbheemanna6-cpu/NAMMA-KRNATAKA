import React,{useState,useEffect,useCallback,useMemo}from"react";
import{TMDB_KEY,TMDB_API,RADIO_STATIONS,T}from"../data/entertainmentData.js";
import{HiSearch,HiRefresh,HiStar,HiPlay,HiPause,HiArrowLeft,HiMusicNote,HiFilm}from"react-icons/hi";

function suGrid(){var g=[[1,2,3,4],[3,4,1,2],[2,1,4,3],[4,3,2,1]],m=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];[[0,0],[0,3],[1,1],[2,0],[2,3],[3,1]].forEach(function(p){m[p[0]][p[1]]=g[p[0]][p[1]]});return{grid:g,mask:m}}
function ttWin(b){for(var i=0;i<3;i++){if(b[i][0]&&b[i][0]===b[i][1]&&b[i][1]===b[i][2])return{win:!0,w:b[i][0],l:[[i,0],[i,1],[i,2]]};if(b[0][i]&&b[0][i]===b[1][i]&&b[1][i]===b[2][i])return{win:!0,w:b[0][i],l:[[0,i],[1,i],[2,i]]}}if(b[0][0]&&b[0][0]===b[1][1]&&b[1][1]===b[2][2])return{win:!0,w:b[0][0],l:[[0,0],[1,1],[2,2]]};if(b[0][2]&&b[0][2]===b[1][1]&&b[1][1]===b[2][0])return{win:!0,w:b[0][2],l:[[0,2],[1,1],[2,0]]};var f=!0;for(var i=0;i<3;i++)for(var j=0;j<3;j++)if(!b[i][j])f=!1;return{win:!1,draw:f}}
var emj=["🍎","🍊","🍋","🍇","🍓","🍒","🥝","🍌","🍎","🍊","🍋","🍇","🍓","🍒","🥝","🍌"];

export default function Entertainment(){
var _0=useState("movies"),tab=_0[0],st=_0[1],
_1=useState(""),search=_1[0],ss=_1[1],
_2=useState([]),movies=_2[0],sm=_2[1],
_3=useState(!1),ml=_3[0],sml=_3[1],
_4=useState(""),me=_4[0],sme=_4[1],
_5=useState(function(){try{return JSON.parse(localStorage.getItem("ent_favs")||"[]")}catch(e){return[]}}),favs=_5[0],sfv=_5[1],
_6=useState(function(){try{return localStorage.getItem("nk_lang")||"bi"}catch(e){return"bi"}}),lg=_6[0],slg=_6[1],
_7=useState(null),radio=_7[0],sr=_7[1],
_8=useState(!1),rp=_8[0],srp=_8[1],
_9=useState("all"),rc=_9[0],src=_9[1],
_10=useState("tictactoe"),game=_10[0],sg=_10[1],
_11=useState([["","",""],["","",""],["","",""]]),tb=_11[0],stb=_11[1],
_12=useState("X"),turn=_12[0],stu=_12[1],
_13=useState(null),tr=_13[0],str=_13[1],
_14=useState([]),mc=_14[0],smc=_14[1],
_15=useState([]),mf=_15[0],smf=_15[1],
_16=useState([]),mm=_16[0],smm=_16[1],
_17=useState(0),mt=_17[0],smt=_17[1],
_18=useState(suGrid()),su=_18[0],ssu=_18[1],
_19=useState(0),ns=_19[0],sns=_19[1],
_20=useState(""),ng=_20[0],sng=_20[1],
_21=useState(""),nm=_21[0],snm=_21[1],
_22=useState(0),nt=_22[0],snt=_22[1],
_23=useState(""),ws=_23[0],sws=_23[1],
_24=useState(""),wa=_24[0],swa=_24[1],
_25=useState(""),wm=_25[0],swm=_25[1];
var R=function(e,k){if(lg==="en")return e;if(lg==="kn")return k;return e+" | "+k};
useEffect(function(){var h=function(e){slg(e.detail)};window.addEventListener("langchange",h);return function(){window.removeEventListener("langchange",h)}},[]);
var fm=useCallback(function(t){sml(!0);sme("");if(!TMDB_KEY){sme("nokey");sml(!1);return}fetch(TMDB_API+"/movie/"+t+"?api_key="+TMDB_KEY+"&language=en-US&page=1&region=IN").then(function(r){if(!r.ok)throw Error("HTTP "+r.status);return r.json()}).then(function(d){sm((d.results||[]).slice(0,20).map(function(m){return{id:m.id,title:m.title,poster:m.poster_path?"https://image.tmdb.org/t/p/w342"+m.poster_path:"",rating:m.vote_average,release:m.release_date||""}}))}).catch(function(e){sme(e.message)}).finally(function(){sml(!1)})},[]);
var smv=useCallback(function(q){if(!q.trim()){fm("popular");return}sml(!0);sme("");if(!TMDB_KEY){sme("nokey");sml(!1);return}fetch(TMDB_API+"/search/movie?api_key="+TMDB_KEY+"&query="+encodeURIComponent(q)+"&page=1&region=IN").then(function(r){if(!r.ok)throw Error("HTTP "+r.status);return r.json()}).then(function(d){sm((d.results||[]).slice(0,20).map(function(m){return{id:m.id,title:m.title,poster:m.poster_path?"https://image.tmdb.org/t/p/w342"+m.poster_path:"",rating:m.vote_average,release:m.release_date||""}}))}).catch(function(e){sme(e.message)}).finally(function(){sml(!1)})},[fm]);
useEffect(function(){fm("popular")},[fm]);
var tf=function(item){var id=item.id||item,ex=favs.find(function(f){return(typeof f==="object"?f.id:f)===id}),nf=ex?favs.filter(function(f){return(typeof f==="object"?f.id:f)!==id}):favs.concat([item]);sfv(nf);localStorage.setItem("ent_favs",JSON.stringify(nf))};
var isF=function(id){return favs.some(function(f){return(typeof f==="object"?f.id:f)===id})};
var im=function(){var s=emj.sort(function(){return Math.random()-0.5});smc(s);smf([]);smm([]);smt(0)};
var fc=function(i){if(mf.length===2||mm.includes(i)||mf.includes(i))return;var n=mf.concat([i]);smf(n);if(n.length===2){smt(mt+1);if(mc[n[0]]===mc[n[1]]){smm(mm.concat(n));smf([])}else setTimeout(function(){smf([])},800)}};
var nn=function(){var s=Math.floor(Math.random()*90)+10;sns(s);sng("");snm("");snt(0)};
var cn=function(){var g=parseInt(ng),t=nt+1;snt(t);if(g===ns){snm(R(T.en.win,T.kn.win)+" "+t+" "+R(T.en.turns,T.kn.turns));if(t<=5)snm("🎯 "+R(T.en.win,T.kn.win)+"! "+t+" "+R(T.en.turns,T.kn.turns))}else snm((g<ns?"📈 "+(lg==="kn"?"ದೊಡ್ಡ ಸಂಖ್ಯೆ":"Higher"):"📉 "+(lg==="kn"?"ಚಿಕ್ಕ ಸಂಖ್ಯೆ":"Lower"))+"!")};
var wds=["KARNATAKA","BENGALURU","MYSORE","HUBLI","MANGALORE","BELAGAVI","KANNADA","SANDALWOOD"];
var iw=function(){var w=wds[Math.floor(Math.random()*wds.length)];swa(w);var a=w.split("");for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}sws(a.join(""));swm("")};
useEffect(function(){im();nn();iw()},[]);
var tc=function(r,c){if(tr||tb[r][c])return;var nb=tb.map(function(w){return w.slice()});nb[r][c]=turn;stb(nb);var z=ttWin(nb);if(z.win)str({w:z.w,l:z.l});else if(z.draw)str({draw:!0});else stu(turn==="X"?"O":"X")};
var rt=function(){stb([["","",""],["","",""],["","",""]]);stu("X");str(null)};
var scg=function(r,c){var nm=su.mask.map(function(w){return w.slice()});nm[r][c]=nm[r][c]?0:su.grid[r][c];ssu({grid:su.grid,mask:nm})};
var rf=useMemo(function(){return rc==="all"?RADIO_STATIONS:RADIO_STATIONS.filter(function(s){return s.cat===rc})},[rc]);
var rcs=useMemo(function(){return["all","Kannada FM","Telugu FM","Tamil FM","Hindi FM","Devotional FM"]},[]);
var tabs=[{v:"movies",en:"🎬 "+T.en.movies,kn:"🎬 "+T.kn.movies},{v:"radio",en:"📻 "+T.en.radio,kn:"📻 "+T.kn.radio},{v:"games",en:"🎮 "+T.en.games,kn:"🎮 "+T.kn.games},{v:"ott",en:"📺 "+T.en.ott,kn:"📺 "+T.kn.ott},{v:"music",en:"🎵 "+T.en.music,kn:"🎵 "+T.kn.music},{v:"events",en:"🎉 "+T.en.events,kn:"🎉 "+T.kn.events}];
var gms=[{v:"tictactoe",en:"❌⭕ "+T.en.tictactoe,kn:"❌⭕ "+T.kn.tictactoe},{v:"memory",en:"🧠 "+T.en.memoryGame,kn:"🧠 "+T.kn.memoryGame},{v:"number",en:"🔢 "+T.en.numberPuzzle,kn:"🔢 "+T.kn.numberPuzzle},{v:"word",en:"🔤 "+T.en.wordPuzzle,kn:"🔤 "+T.kn.wordPuzzle},{v:"sudoku",en:"🧩 "+T.en.sudoku,kn:"🧩 "+T.kn.sudoku}];

return<div className="max-w-5xl mx-auto px-4 py-4">
<h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{R(T.en.title,T.kn.title)}</h2>
<div className="flex gap-1 mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 overflow-x-auto">
{tabs.map(function(tb){return<button key={tb.v} onClick={function(){st(tb.v)}} className={"flex-shrink-0 py-2 px-3 rounded-md text-xs font-medium transition-all whitespace-nowrap "+(tab===tb.v?"bg-white dark:bg-gray-700 text-primary-700 dark:text-primary-300 shadow-sm":"text-gray-500 dark:text-gray-400")}>{R(tb.en,tb.kn)}</button>})}
</div>

{(tab==="movies"||tab==="ott"||tab==="music"||tab==="events")&&<div className="mb-3"><div className="relative">
<HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
<input type="text" placeholder={R(T.en.search,T.kn.search)} value={search} onChange={function(e){ss(e.target.value)}} onKeyDown={function(e){if(e.key==="Enter")smv(search)}} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"/>
</div></div>}

{tab==="movies"&&<div>
<div className="flex gap-2 mb-3">
{[{v:"popular",en:T.en.popular,kn:T.kn.popular},{v:"upcoming",en:T.en.upcoming,kn:T.kn.upcoming},{v:"now_playing",en:T.en.nowPlaying,kn:T.kn.nowPlaying}].map(function(bt){return<button key={bt.v} onClick={function(){fm(bt.v)}} className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300 transition-all">{R(bt.en,bt.kn)}</button>})}
</div>
{!TMDB_KEY||me==="nokey"?<div className="text-center py-12"><div className="text-4xl mb-3">🎬</div><p className="text-gray-500 dark:text-gray-400 mb-2">{R(T.en.noData,T.kn.noData)}</p><p className="text-xs text-gray-400 dark:text-gray-500">{R(T.en.noKey,T.kn.noKey)}</p></div>
:ml?<div className="text-center py-12"><div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-3"/><p className="text-gray-500 dark:text-gray-400">{R(T.en.loading,T.kn.loading)}</p></div>
:me?<div className="text-center py-12"><p className="text-red-500 mb-2">{R(T.en.error,T.kn.error)}: {me}</p><button onClick={function(){fm("popular")}} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm">{R(T.en.retry,T.kn.retry)}</button></div>
:<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
{movies.map(function(m,i){var fid=isF(m.id);return<div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-all">
<div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 relative">
{m.poster?<img src={m.poster} alt={m.title} className="w-full h-full object-cover" loading="lazy" onError={function(e){e.target.style.display="none";e.target.nextSibling.style.display="flex"}}/>:null}
<div className={"w-full h-full flex items-center justify-center text-4xl "+(m.poster?"hidden":"")}><HiFilm className="text-gray-400" size={40}/></div>
<button onClick={function(){tf(m)}} className={"absolute top-1 right-1 p-1 rounded-full bg-black/40 "+(fid?"text-yellow-400":"text-white/70 hover:text-yellow-400")}><HiStar size={14}/></button></div>
<div className="p-2"><h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">{m.title}</h3>
<div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500 dark:text-gray-400"><span className="text-yellow-500">⭐</span>{(m.rating||0).toFixed(1)}<span className="ml-auto">{m.release?m.release.slice(0,4):"—"}</span></div></div></div>})}
</div>}
</div>}

{tab==="radio"&&<div>
<div className="flex gap-1.5 overflow-x-auto pb-2 mb-3">
{rcs.map(function(c){return<button key={c} onClick={function(){src(c)}} className={"px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all "+(rc===c?"bg-primary-600 text-white shadow-sm":"bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600")}>{c==="all"?R(T.en.all,T.kn.all):c}</button>})}
</div>
{radio?<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm mb-3">
<div className="flex items-center justify-between mb-3"><div><p className="font-semibold text-gray-900 dark:text-gray-100">{radio.name}</p><p className="text-xs text-gray-500 dark:text-gray-400">{radio.lang} · {radio.cat}</p></div><button onClick={function(){sr(null);srp(!1)}} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><HiArrowLeft size={18}/></button></div>
<audio ref={function(el){if(el){el.src=radio.url;if(rp)el.play().catch(function(){})}}} controls autoPlay={rp} className="w-full" style={{height:32}}/>
<p className="text-center text-[10px] text-gray-400 dark:text-gray-500 mt-2">{R(T.en.radioPlaying,T.kn.radioPlaying)}: {radio.name}</p></div>
:<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{rf.map(function(s,i){return<button key={i} onClick={function(){sr(s);srp(!0)}} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-3 shadow-sm hover:shadow-md transition-all text-left"><div className="flex items-center gap-2"><div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center"><HiMusicNote className="text-primary-600 dark:text-primary-400" size={20}/></div><div><p className="text-sm font-medium text-gray-900 dark:text-gray-100">{s.name}</p><p className="text-[10px] text-gray-500 dark:text-gray-400">{s.lang} · {s.cat}</p></div></div></button>})}</div>}
</div>}

{tab==="games"&&<div>
<div className="flex gap-1.5 overflow-x-auto pb-2 mb-3">
{gms.map(function(g){return<button key={g.v} onClick={function(){sg(g.v)}} className={"px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all "+(game===g.v?"bg-primary-600 text-white shadow-sm":"bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600")}>{R(g.en,g.kn)}</button>})}
</div>

{game==="tictactoe"&&<div className="max-w-xs mx-auto text-center">
{!tr?<p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{R(T.en.yourTurn,T.kn.yourTurn)}: {(turn==="X"?R(T.en.playerX,T.kn.playerX):R(T.en.playerO,T.kn.playerO))}</p>
:tr.draw?<p className="text-lg font-bold text-gray-600 dark:text-gray-300 mb-2">{R(T.en.draw,T.kn.draw)}</p>
:<p className="text-lg font-bold text-green-600 dark:text-green-400 mb-2">{(tr.w==="X"?R(T.en.playerX,T.kn.playerX):R(T.en.playerO,T.kn.playerO))} {R(T.en.win,T.kn.win)}</p>}
<div className="grid grid-cols-3 gap-1 mb-3">{tb.map(function(row,r){return row.map(function(cell,c){var hl=tr&&tr.l&&tr.l.some(function(p){return p[0]===r&&p[1]===c});return<button key={r+"-"+c} onClick={function(){tc(r,c)}} className={"aspect-square rounded-lg text-2xl font-bold transition-all "+(hl?"bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400":"bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600")}>{cell}</button>})})}</div>
<button onClick={rt} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm">{R(T.en.newGame,T.kn.newGame)}</button></div>}

{game==="memory"&&<div className="max-w-sm mx-auto text-center">
<div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2"><span>{R(T.en.turns,T.kn.turns)}: {mt}</span><span>{R(T.en.pairs,T.kn.pairs)}: {mm.length/2}/8</span></div>
<div className="grid grid-cols-4 gap-1 mb-3">{mc.map(function(card,i){var f=mf.includes(i)||mm.includes(i);return<button key={i} onClick={function(){fc(i)}} className={"aspect-square rounded-lg text-2xl transition-all "+(f?"bg-primary-100 dark:bg-primary-900/40":"bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600")+(mm.includes(i)?" opacity-50":"")}>{f?card:"?"}</button>})}</div>
<button onClick={im} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm">{mm.length===16?"🎉 "+R(T.en.newGame,T.kn.newGame):R(T.en.reset,T.kn.reset)}</button></div>}

{game==="number"&&<div className="max-w-xs mx-auto text-center">
<p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{lg==="kn"?"10-99 ರ ನಡುವಿನ ಸಂಖ್ಯೆ ಊಹಿಸಿ":"Guess a number between 10-99"}</p>
<input type="number" value={ng} onChange={function(e){sng(e.target.value)}} placeholder="10-99" className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm text-center mb-2"/>
<button onClick={cn} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm mb-2">{R(T.en.play,T.kn.play)}</button>
{nm&&<p className={"text-sm font-medium "+(nm.includes("🎯")?"text-green-600 dark:text-green-400":"text-gray-600 dark:text-gray-300")}>{nm}</p>}
<p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">{R(T.en.turns,T.kn.turns)}: {nt}</p>
{ns&&nm&&nm.includes("🎯")&&<button onClick={nn} className="mt-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm">{R(T.en.newGame,T.kn.newGame)}</button>}</div>}

{game==="word"&&<div className="max-w-xs mx-auto text-center">
<div className="text-2xl font-mono tracking-widest text-gray-900 dark:text-gray-100 mb-3">{ws.split("").map(function(l,i){return<span key={i} className="inline-block w-8 h-10 mx-0.5 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center font-bold">{l}</span>})}</div>
<input type="text" placeholder={R(T.en.search,T.kn.search)} onKeyDown={function(e){if(e.key==="Enter"){if(e.target.value.toUpperCase()===wa)swm("✅ "+R(T.en.win,T.kn.win));else swm("❌ "+(lg==="kn"?"ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ":"Try again"))}}} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm text-center uppercase mb-2"/>
{wm&&<p className={"text-sm font-medium mb-2 "+(wm.includes("✅")?"text-green-600":"text-red-500")}>{wm}</p>}
<button onClick={iw} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm">{wm&&wm.includes("✅")?R(T.en.newGame,T.kn.newGame):R(T.en.reset,T.kn.reset)}</button></div>}

{game==="sudoku"&&<div className="max-w-[240px] mx-auto text-center">
<div className="grid grid-cols-4 gap-px bg-gray-300 dark:bg-gray-600 rounded-lg overflow-hidden mb-3">
{su.mask.map(function(row,r){return row.map(function(cell,c){var o=su.grid[r][c]!==0&&cell!==0;return<button key={r+"-"+c} onClick={function(){scg(r,c)}} className={"aspect-square flex items-center justify-center text-lg font-bold transition-all "+(o?"bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300":"bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700")}>{cell||""}</button>})})}</div>
<button onClick={function(){ssu(suGrid())}} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm">{R(T.en.newGame,T.kn.newGame)}</button></div>}
</div>}

{tab==="ott"&&<div className="text-center py-12"><div className="text-4xl mb-3">📺</div><p className="text-gray-500 dark:text-gray-400 mb-1">{R(T.en.ottLatest,T.kn.ottLatest)}</p><p className="text-xs text-gray-400 dark:text-gray-500">{R(T.en.noData,T.kn.noData)}</p><p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{lg==="kn"?"ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ":"Coming soon"}</p></div>}
{tab==="music"&&<div className="text-center py-12"><div className="text-4xl mb-3">🎵</div><p className="text-gray-500 dark:text-gray-400 mb-1">{R(T.en.musicTrending,T.kn.musicTrending)}</p><p className="text-xs text-gray-400 dark:text-gray-500">{R(T.en.noData,T.kn.noData)}</p><p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{lg==="kn"?"ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ":"Coming soon"}</p></div>}
{tab==="events"&&<div className="text-center py-12"><div className="text-4xl mb-3">🎉</div><p className="text-gray-500 dark:text-gray-400 mb-1">{R(T.en.eventsNearby,T.kn.eventsNearby)}</p><p className="text-xs text-gray-400 dark:text-gray-500">{R(T.en.noData,T.kn.noData)}</p><p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{lg==="kn"?"ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ":"Coming soon"}</p></div>}

{favs.length>0&&<div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl border border-yellow-100 dark:border-yellow-900/30"><p className="text-xs font-medium text-yellow-700 dark:text-yellow-400 mb-2">⭐ {R(T.en.favorites,T.kn.favorites)}</p><div className="flex flex-wrap gap-1">{favs.map(function(f,i){return<span key={i} className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-xs cursor-pointer hover:bg-yellow-200" onClick={function(){tf(f)}}>{f.title||f}</span>})}</div></div>}

<div className="mt-4 text-center text-[10px] text-gray-400 dark:text-gray-500">Data: TMDB · {R(T.en.updated,T.kn.updated)}: {new Date().toLocaleDateString("en-IN")}</div>
</div>}
