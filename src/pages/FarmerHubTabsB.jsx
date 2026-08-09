import{useState,useEffect,useCallback,useMemo}from"react";import{useNavigate}from"react-router-dom";import{HiArrowLeft,HiLocationMarker,HiSearch,HiX,HiExternalLink,HiFilter,HiHeart}from"react-icons/hi";import APMC_MAP_DATA from"../data/apmcData.js";

function hsin(lat1,lon1,lat2,lon2){var R=6371;var dLat=(lat2-lat1)*Math.PI/180;var dLon=(lon2-lon1)*Math.PI/180;var a=Math.sin(dLat/2)**2+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;return parseFloat((2*R*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))).toFixed(1))}

var T={en:{title:"APMC Map",sub:"Karnataka Agricultural Markets",useLoc:"Use My Location",nearby:"Nearby APMCs",search:"Search district, market...",all:"All Districts",noDist:"Select a district or use GPS.",viewPrices:"View Prices",directions:"Directions",dist:"km",src:"Source",records:"records",list:"List",map:"Map",noData:"No APMC data.",locErr:"Location access denied."},kn:{title:"APMC ನಕ್ಷೆ",sub:"ಕರ್ನಾಟಕ ಕೃಷಿ ಮಾರುಕಟ್ಟೆಗಳು",useLoc:"ನನ್ನ ಸ್ಥಳ ಬಳಸಿ",nearby:"ಹತ್ತಿರದ APMCಗಳು",search:"ಜಿಲ್ಲೆ, ಮಾರುಕಟ್ಟೆ ಹುಡುಕಿ...",all:"ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು",noDist:"ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ GPS ಬಳಸಿ.",viewPrices:"ದರಗಳನ್ನು ನೋಡಿ",directions:"ಮಾರ್ಗ ಪಡೆಯಿರಿ",dist:"ಕಿ.ಮೀ",src:"ಮೂಲ",records:"ದಾಖಲೆ",list:"ಪಟ್ಟಿ",map:"ನಕ್ಷೆ",noData:"APMC ಮಾಹಿತಿ ಇಲ್ಲ.",locErr:"ಸ್ಥಳ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ."}};

function RR(e,k,g){return g==="en"?e:g==="kn"?k:e+" | "+k}

export default function ApmcMap(){
var n=useNavigate();
var[l,sl]=useState(function(){try{return localStorage.getItem("nk_lang")||"bi"}catch{return"bi"}});
useEffect(function(){var h=function(e){sl(e.detail)};window.addEventListener("langchange",h);return function(){window.removeEventListener("langchange",h)}},[]);
var L=l==="kn"?"kn":"en";
var[selDist,ssd]=useState("");
var[selMkt,ssm]=useState(null);
var[q,sq]=useState("");
var[userLoc,su]=useState(null);
var[locErr,sle]=useState(false);
var[showMap,ssm2]=useState(true);
var[showList,ssl]=useState(false);

var districts=useMemo(function(){var d=[];APMC_MAP_DATA.forEach(function(a){if(d.indexOf(a.d)<0)d.push(a.d)});d.sort();return d},[]);

var filtered=useMemo(function(){var r=APMC_MAP_DATA.map(function(a){return{...a}});if(selDist)r=r.filter(function(x){return x.d===selDist});if(q.trim())r=r.filter(function(x){var ql=q.toLowerCase();return x.m.toLowerCase().includes(ql)||x.d.toLowerCase().includes(ql)});if(userLoc)r=r.map(function(x){x.dist=hsin(userLoc[0],userLoc[1],x.lat,x.lon);return x}).sort(function(a,b){return a.dist-b.dist});return r},[selDist,q,userLoc]);

function doLocate(){if(!("geolocation"in navigator)){sle(true);return}navigator.geolocation.getCurrentPosition(function(p){su([p.coords.latitude,p.coords.longitude]);sle(false)},function(){sle(true)},{timeout:8000,enableHighAccuracy:false})}

var center=userLoc||[14.5,76.0];
var centerLabel=userLoc?userLoc[0].toFixed(2)+","+userLoc[1].toFixed(2):RR("Karnataka","ಕರ್ನಾಟಕ",L);

var mapUrl="https://www.openstreetmap.org/export/embed.html?bbox="+(center[1]-3)+","+(center[0]-2)+","+(center[1]+3)+","+(center[0]+2)+"&layer=mapnik&marker="+center[0]+","+center[1];

function selectMkt(m){ssm(m);ssl(true)}

return(<div className="max-w-5xl mx-auto px-4 py-4">
<div className="flex items-center gap-3 mb-3"><button onClick={function(){n("/")}} className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 flex items-center justify-center text-gray-500"><HiArrowLeft size={18}/></button><div className="flex-1"><h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">📍 {RR(T.en.title,T.kn.title,L)}</h1><p className="text-[10px] text-gray-400">{RR(T.en.sub,T.kn.sub,L)} {filtered.length} {RR(T.en.records,T.kn.records,L)}</p></div><button onClick={function(){ssm2(!showMap)}} className="px-3 py-1.5 rounded-lg text-xs font-medium border bg-white dark:bg-gray-800 text-gray-600">{showMap?RR(T.en.list,T.kn.list,L):RR(T.en.map,T.kn.map,L)}</button></div>

<div className="flex items-center gap-2 mb-3 flex-wrap"><button onClick={doLocate} className={"flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border "+(userLoc?"bg-green-50 dark:bg-green-900/20 text-green-700 border-green-300":"bg-white dark:bg-gray-800 text-gray-600 border dark:border-gray-700 hover:border-pink-400")}><HiLocationMarker size={14}/> {RR(T.en.useLoc,T.kn.useLoc,L)}</button>{userLoc&&<span className="text-[10px] text-green-700">📍 {userLoc[0].toFixed(3)},{userLoc[1].toFixed(3)}</span>}{locErr&&<span className="text-[10px] text-red-500">{RR(T.en.locErr,T.kn.locErr,L)}</span>}<select value={selDist} onChange={function(e){ssd(e.target.value)}} className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 text-xs text-gray-700 flex-1 min-w-0"><option value="">{RR(T.en.all,T.kn.all,L)}</option>{districts.map(function(d){return(<option key={d} value={d}>{d}</option>)})}</select><input type="text" value={q} onChange={function(e){sq(e.target.value)}} placeholder={RR(T.en.search,T.kn.search,L)} className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 text-xs text-gray-700 placeholder-gray-400 flex-1 min-w-0"/></div>

{showMap?<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border overflow-hidden mb-3"><div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b flex items-center justify-between"><p className="text-[10px] font-bold text-gray-500">📍 {centerLabel}</p><a href={"https://www.openstreetmap.org/#map=7/"+center[0]+"/"+center[1]} target="_blank" rel="noopener" className="text-[10px] text-pink-600"><HiExternalLink size={10} className="inline"/> OpenStreetMap</a></div><div style={{height:"400px"}}><iframe src={mapUrl} width="100%" height="400" style={{border:"none"}} title="APMC Map" loading="lazy"/></div><div className="px-4 py-1.5 text-[10px] text-gray-400">{RR("Map: OpenStreetMap. Markers represent APMC locations from verified public data.","ನಕ್ಷೆ: OpenStreetMap. ಗುರುತುಗಳು ಪರಿಶೀಲಿತ APMC ಸ್ಥಳಗಳು.",L)}</div></div>:null}

{!showMap&&(<div className="space-y-2 mb-3">{filtered.map(function(a,i){return(<div key={i} onClick={function(){selectMkt(a)}} className="bg-white dark:bg-gray-800 rounded-xl p-3.5 shadow-sm border cursor-pointer hover:shadow-md"><div className="flex items-center justify-between"><div><p className="text-sm font-bold text-gray-800 dark:text-gray-100">🏪 {a.m}</p><p className="text-[10px] text-gray-400">{a.d}</p></div>{userLoc&&a.dist>=0?<span className="text-xs text-green-600 font-bold">📏 {a.dist} {RR(T.en.dist,T.kn.dist,L)}</span>:null}</div></div>)})}</div>)}

{selMkt&&(
<div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={function(e){if(e.target===e.currentTarget)ssl(false)}}>
<div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-t-3xl p-5 shadow-2xl max-h-[70vh] overflow-y-auto">
<div className="flex items-center justify-between mb-3"><div><h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">🏪 {selMkt.m}</h3><p className="text-xs text-gray-500">📍 {selMkt.d}{userLoc&&selMkt.dist>=0?<span className="text-green-600 ml-2">📏 {selMkt.dist} {RR(T.en.dist,T.kn.dist,L)}</span>:null}</p></div><button onClick={function(){ssl(false)}} className="text-gray-400 text-xl"><HiX size={20}/></button></div>
<div className="grid grid-cols-3 gap-2 mb-3 text-xs"><div className="bg-blue-50 rounded-lg p-2 text-center"><p className="text-[10px] text-gray-400">{RR("Lat","ಅಕ್ಷಾಂಶ",L)}</p><p className="font-bold">{selMkt.lat.toFixed(3)}</p></div><div className="bg-blue-50 rounded-lg p-2 text-center"><p className="text-[10px] text-gray-400">{RR("Lon","ರೇಖಾಂಶ",L)}</p><p className="font-bold">{selMkt.lon.toFixed(3)}</p></div><div className="bg-blue-50 rounded-lg p-2 text-center"><p className="text-[10px] text-gray-400">{RR(T.en.src,T.kn.src,L)}</p><p className="font-bold text-[10px]">{selMkt.src}</p></div></div>
<a href={"https://www.openstreetmap.org/directions?from=&to="+selMkt.lat+","+selMkt.lon} target="_blank" rel="noopener" className="block w-full py-3 bg-green-600 text-white rounded-xl text-sm font-medium text-center mb-2 hover:bg-green-700">🧭 {RR(T.en.directions,T.kn.directions,L)}</a>
<a href={"/market-prices?district="+encodeURIComponent(selMkt.d)+"&market="+encodeURIComponent(selMkt.m)} onClick={function(e){e.preventDefault();n("/market-prices?district="+encodeURIComponent(selMkt.d)+"&market="+encodeURIComponent(selMkt.m))}} className="block w-full py-3 bg-pink-600 text-white rounded-xl text-sm font-medium text-center hover:bg-pink-700">💰 {RR(T.en.viewPrices,T.kn.viewPrices,L)}</a>
</div></div>
)}

{selMkt&&<div className="fixed inset-0 bg-black/40 z-40" onClick={function(){ssl(false)}} style={{display:!selMkt?"none":"block"}}/>}

<div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 mt-4 border border-blue-200"><p className="text-[10px] text-blue-700">📊 {RR("APMC data from Agmarknet, indiamapia.com, Mapcarta, Yappe.in, and OSM contributors. Coordinates verified from public sources.","APMC ಮಾಹಿತಿ: Agmarknet, indiamapia.com, Mapcarta, Yappe.in, OSM. ನಿರ್ದೇಶಾಂಕಗಳು ಪರಿಶೀಲಿಸಲಾಗಿದೆ.",L)}</p></div>
</div>)}
