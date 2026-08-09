import{useState,useEffect,useCallback,useMemo}from"react";import{useNavigate,useSearchParams}from"react-router-dom";import{HiArrowLeft,HiSearch,HiX,HiExternalLink,HiRefresh,HiLocationMarker}from"react-icons/hi";import APMC_MAP_DATA from"../data/apmcData.js";

function hsin(lat1,lon1,lat2,lon2){var R=6371;var dLat=(lat2-lat1)*Math.PI/180;var dLon=(lon2-lon1)*Math.PI/180;var a=Math.sin(dLat/2)**2+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;return parseFloat((2*R*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))).toFixed(1))}

var AK="579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b";
var B="https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

var T={en:{t:"All Market Prices",s:"Karnataka APMC · National · Global",sr:"Search commodity...",dist:"District",all:"All",fet:"Fetch Prices",min:"Min",max:"Max",mod:"Modal",err:"API error. Retry.",re:"Retry",no:"No data.",src:"Source",loc:"📍 Karnataka Markets",agri:"Agriculture APMC",gold:"Gold",silver:"Silver",oil:"Crude Oil",copper:"Copper",ng:"Natural Gas",upd:"Updated",viewAll:"View All Prices",dir:"Directions",useLoc:"Use My Location",national:"National/Global Price",apmc:"Karnataka APMC Price",cat:"Category",mkt:"Market",unit:"Unit",price:"Price",date:"Date"},kn:{t:"ಎಲ್ಲಾ ಮಾರುಕಟ್ಟೆ ದರಗಳು",s:"ಕರ್ನಾಟಕ APMC · ರಾಷ್ಟ್ರೀಯ · ಜಾಗತಿಕ",sr:"ವಸ್ತು ಹುಡುಕಿ...",dist:"ಜಿಲ್ಲೆ",all:"ಎಲ್ಲಾ",fet:"ದರ ಪಡೆಯಿರಿ",min:"ಕನಿಷ್ಠ",max:"ಗರಿಷ್ಠ",mod:"ಮಾದರಿ",err:"API ದೋಷ.",re:"ಮರುಪ್ರಯತ್ನ",no:"ಮಾಹಿತಿ ಇಲ್ಲ.",src:"ಮೂಲ",loc:"📍 ಕರ್ನಾಟಕ ಮಾರುಕಟ್ಟೆಗಳು",agri:"ಕೃಷಿ APMC",gold:"ಚಿನ್ನ",silver:"ಬೆಳ್ಳಿ",oil:"ಕಚ್ಚಾ ತೈಲ",copper:"ತಾಮ್ರ",ng:"ನೈಸರ್ಗಿಕ ಅನಿಲ",upd:"ನವೀಕರಿಸಲಾಗಿದೆ",viewAll:"ಎಲ್ಲಾ ದರಗಳು",dir:"ಮಾರ್ಗ",useLoc:"ನನ್ನ ಸ್ಥಳ",national:"ರಾಷ್ಟ್ರೀಯ/ಜಾಗತಿಕ ದರ",apmc:"ಕರ್ನಾಟಕ APMC ದರ",cat:"ವರ್ಗ",mkt:"ಮಾರುಕಟ್ಟೆ",unit:"ಘಟಕ",price:"ಬೆಲೆ",date:"ದಿನಾಂಕ"}};

function RR(e,k,g){return g==="en"?e:g==="kn"?k:e+" | "+k}

function fetchMkt(dist,comm){var u=B+"?api-key="+AK+"&format=json&limit=50&filters%5Bstate%5D=Karnataka";if(dist)u+="&filters%5Bdistrict%5D="+encodeURIComponent(dist);if(comm)u+="&filters%5Bcommodity%5D="+encodeURIComponent(comm);return fetch(u).then(function(r){return r.json()}).then(function(d){return d.records||[]})}

var CATS=[
{id:"agri",en:"Agriculture APMC",kn:"ಕೃಷಿ APMC",em:"🌾",desc:"Karnataka APMC mandi prices · Agmarknet"},
{id:"gold",en:"Gold",kn:"ಚಿನ್ನ",em:"🥇",desc:"Gold spot price · COMEX · USD/INR"},
{id:"silver",en:"Silver",kn:"ಬೆಳ್ಳಿ",em:"🥈",desc:"Silver spot price · COMEX · USD/INR"},
{id:"oil",en:"Crude Oil",kn:"ಕಚ್ಚಾ ತೈಲ",em:"⛽",desc:"WTI Crude Oil · NYMEX · USD"},
{id:"copper",en:"Copper",kn:"ತಾಮ್ರ",em:"🔩",desc:"Copper spot · COMEX · USD"},
{id:"natgas",en:"Natural Gas",kn:"ನೈಸರ್ಗಿಕ ಅನಿಲ",em:"🔥",desc:"Natural Gas · NYMEX · USD"}
];

var COMEX_SYMBOLS={gold:"GC=F",silver:"SI=F",oil:"CL=F",copper:"HG=F",natgas:"NG=F"};
var COMEX_NAMES={gold:"Gold / ಚಿನ್ನ",silver:"Silver / ಬೆಳ್ಳಿ",oil:"Crude Oil WTI",copper:"Copper / ತಾಮ್ರ",natgas:"Natural Gas"};

export default function MarketPrices(){
var n=useNavigate();
var[l,sl]=useState(function(){try{return localStorage.getItem("nk_lang")||"bi"}catch{return"bi"}});
useEffect(function(){var h=function(e){sl(e.detail)};window.addEventListener("langchange",h);return function(){window.removeEventListener("langchange",h)}},[]);
var L=l==="kn"?"kn":"en";
var[cat,scat]=useState("agri");
var[mkData,smkData]=useState([]);
var[mkLoad,smkLoad]=useState(false);
var[mkErr,smkErr]=useState(null);
var[mkDist,smkDist]=useState("");
var[mkComm,smkComm]=useState("");
var[q,sq]=useState("");
var[userLoc,su]=useState(null);
var[comex,scx]=useState({});

useEffect(function(){smkLoad(true);fetchMkt("","").then(function(d){smkData(d);smkLoad(false)}).catch(function(e){smkErr(e.message);smkLoad(false)})},[]);

useEffect(function(){if(cat!=="agri"){scx(function(p){return{...p}});fetch("https://aurumrates.com/api/chart?symbol="+(COMEX_SYMBOLS[cat]||"GC=F")+"&range=1d&interval=15m").then(function(r){return r.json()}).then(function(d){var m=d.chart.result[0].meta;scx(function(p){var nu={...p};nu[cat]={price:m.regularMarketPrice,name:COMEX_NAMES[cat]||cat,currency:m.currency||"USD",updated:new Date().toISOString(),source:"COMEX via AURUM/Yahoo Finance"};return nu})}).catch(function(e){scx(function(p){var nu={...p};nu[cat]=null;return nu})})}},[]);

function loadAgri(){smkLoad(true);smkErr(null);fetchMkt(mkDist,mkComm).then(function(d){smkData(d);smkLoad(false)}).catch(function(e){smkErr(e.message);smkLoad(false)})}

var filtered=mkData;
if(q)filtered=filtered.filter(function(r){return(r.commodity||"").toLowerCase().includes(q.toLowerCase())||(r.market||"").toLowerCase().includes(q.toLowerCase())||(r.district||"").toLowerCase().includes(q.toLowerCase())});
if(mkDist)filtered=filtered.filter(function(r){return r.district===mkDist});
if(mkComm)filtered=filtered.filter(function(r){return(r.commodity||"").toLowerCase().includes(mkComm.toLowerCase())});

function PriceCard(r){return(<div key={r.commodity+r.market+r.arrival_date} className="bg-white dark:bg-gray-800 rounded-xl p-3.5 shadow-sm border mb-2"><div className="flex items-center justify-between"><p className="text-sm font-bold text-gray-800 dark:text-gray-100">{r.commodity}{r.variety&&r.variety!=="Other"?" · "+r.variety:""}</p><p className="text-[10px] text-gray-400">{r.arrival_date}</p></div><div className="flex gap-2 mt-2 text-xs"><div className="flex-1 bg-green-50 rounded-lg p-2 text-center"><p className="text-[10px] text-gray-400">{RR(T.en.min,T.kn.min,L)}</p><p className="font-bold text-green-700">₹{r.min_price}</p></div><div className="flex-1 bg-amber-50 rounded-lg p-2 text-center"><p className="text-[10px] text-gray-400">{RR(T.en.mod,T.kn.mod,L)}</p><p className="font-bold text-amber-700">₹{r.modal_price}</p></div><div className="flex-1 bg-red-50 rounded-lg p-2 text-center"><p className="text-[10px] text-gray-400">{RR(T.en.max,T.kn.max,L)}</p><p className="font-bold text-red-700">₹{r.max_price}</p></div></div><div className="mt-1.5"><p className="text-[10px] text-gray-400">🏪 {r.market}, {r.district}</p></div></div>)}

function AgriContent(){
if(mkLoad)return(<div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-3 border-green-600 border-t-transparent rounded-full"/></div>);
if(mkErr)return(<div className="bg-red-50 rounded-xl p-8 text-center"><p className="text-red-600 text-sm mb-3">{RR(T.en.err,T.kn.err,L)}</p><button onClick={loadAgri} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">{RR(T.en.re,T.kn.re,L)}</button></div>);
if(filtered.length===0)return(<div className="bg-white rounded-xl p-12 text-center shadow-sm border"><p className="text-sm text-gray-500">{RR(T.en.no,T.kn.no,L)}</p></div>);
return(<div>{filtered.map(function(r){return PriceCard(r)})}</div>)
}

function ComexCard(id,data){
var name=data?data.name:"";
var price=data?data.price:null;
var currency=data?data.currency:"USD";
var updated=data?(data.updated||"").substring(0,19):"";
var src=data?data.source:"";
if(!data)return(<div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border text-center"><p>{RR("Live data unavailable from free public source.","ಉಚಿತ ಸಾರ್ವಜನಿಕ ಮೂಲದಿಂದ ನೇರ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ.",L)}</p></div>);
return(<div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg"><div className="flex items-center justify-between"><div><p className="text-sm text-orange-100">{RR(T.en.national,T.kn.national,L)}</p><p className="text-3xl font-bold mt-1">{currency==="USD"?"$":"₹"}{price}</p><p className="text-orange-100 text-xs mt-1">{name} · {currency}</p></div><span className="text-5xl">{id==="gold"?"🥇":id==="silver"?"🥈":id==="oil"?"⛽":id==="copper"?"🔩":"🔥"}</span></div><div className="mt-3 text-orange-100 text-[10px] flex items-center justify-between"><span>{RR(T.en.upd,T.kn.upd,L)}: {updated}</span><span>{RR(T.en.src,T.kn.src,L)}: {src}</span></div></div>)
}

return(<div className="max-w-4xl mx-auto px-4 py-4">
<div className="flex items-center gap-3 mb-3"><button onClick={function(){n(-1)}} className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 flex items-center justify-center text-gray-500"><HiArrowLeft size={18}/></button><div className="flex-1"><h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">💰 {RR(T.en.t,T.kn.t,L)}</h1><p className="text-[10px] text-gray-400">{RR(T.en.s,T.kn.s,L)}</p></div></div>

<div className="flex gap-1 mb-3 overflow-x-auto pb-1">{CATS.map(function(c){return(<button key={c.id} onClick={function(){scat(c.id)}} className={"flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium "+(cat===c.id?"bg-green-600 text-white shadow":"bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border dark:border-gray-700")}>{c.em} {RR(c.en,c.kn,L)}</button>)})}</div>

{cat==="agri"&&(<div>
<div className="relative mb-3"><HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/><input type="text" value={q} onChange={function(e){sq(e.target.value)}} placeholder={RR(T.en.sr,T.kn.sr,L)} className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"/>{q&&<button onClick={function(){sq("")}} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><HiX size={16}/></button>}</div>
<div className="flex gap-2 mb-3">
<select value={mkDist} onChange={function(e){smkDist(e.target.value)}} className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 text-xs text-gray-700"><option value="">{RR(T.en.all,T.kn.all,L)}</option>{["Bagalkot","Ballari","Belagavi","Bengaluru Urban","Bengaluru Rural","Bidar","Chamarajanagara","Chikkaballapura","Chikkamagaluru","Chitradurga","Dakshina Kannada","Davanagere","Dharwad","Gadag","Hassan","Haveri","Kalaburagi","Kodagu","Kolar","Koppal","Mandya","Mysuru","Raichur","Ramanagara","Shivamogga","Tumakuru","Udupi","Uttara Kannada","Vijayapura","Yadagiri"].map(function(d){return(<option key={d} value={d}>{d}</option>)})}</select>
<input type="text" value={mkComm} onChange={function(e){smkComm(e.target.value)}} placeholder={RR(T.en.sr,T.kn.sr,L)} className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 text-xs text-gray-700 placeholder-gray-400"/>
</div>
<button onClick={loadAgri} className="w-full py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium mb-4">💰 {RR(T.en.fet,T.kn.fet,L)}</button>
<AgriContent/>
<div className="bg-blue-50 rounded-xl p-3 mt-4 border border-blue-200"><p className="text-[10px] text-blue-700">📊 {RR("Source: AGMARKNET via data.gov.in. Real government APMC prices.","ಮೂಲ: AGMARKNET, data.gov.in. ನೈಜ ಸರ್ಕಾರಿ APMC ದರಗಳು.",L)} · {mkData.length} {RR("records","ದಾಖಲೆಗಳು",L)}</p></div>
</div>)}

{cat!=="agri"&&(<div className="space-y-3">
{ComexCard(cat,comex[cat])}
<div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border"><p className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">{RR("About","ಬಗ್ಗೆ",L)}</p><p className="text-xs text-gray-500">{CATS.find(function(c){return c.id===cat}).desc}</p><div className="mt-3 text-[10px] text-gray-400"><span>{RR("Data: AURUM rates (Yahoo Finance). Free public API, CORS enabled, no API key required. Updates throughout trading hours.","ಡೇಟಾ: AURUM rates (Yahoo Finance). ಉಚಿತ ಸಾರ್ವಜನಿಕ API, CORS ಸಕ್ರಿಯ. API ಕೀ ಅಗತ್ಯವಿಲ್ಲ.",L)}</span></div></div>
<div className="bg-blue-50 rounded-xl p-3 mt-4 border border-blue-200"><p className="text-[10px] text-blue-700">📊 {RR("COMEX/NYMEX futures prices via AURUM free API. For India-specific retail gold/silver rates, check local jewellers or IBJA.","COMEX/NYMEX ಫ್ಯೂಚರ್ಸ್ ದರಗಳು. ಭಾರತದ ಚಿಲ್ಲರೆ ದರಗಳಿಗೆ ಸ್ಥಳೀಯ ಆಭರಣ ವ್ಯಾಪಾರಿ ಅಥವಾ IBJA ಪರಿಶೀಲಿಸಿ.",L)}</p></div>
</div>)}

<div className="flex gap-2 mt-4"><a href="/apmc-map" onClick={function(e){e.preventDefault();n("/apmc-map")}} className="flex-1 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border text-center text-sm font-medium text-gray-700 dark:text-gray-200">📍 {RR(T.en.loc,T.kn.loc,L)}</a></div>
</div>)}
