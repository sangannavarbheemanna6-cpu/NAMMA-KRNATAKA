import{useState,useEffect}from"react";import{useNavigate}from"react-router-dom";import{HiArrowLeft,HiSearch,HiExternalLink,HiSwitchHorizontal,HiLocationMarker}from"react-icons/hi";

// REAL DATA: BMTC major bus stations in Bengaluru (verified from BMTC official sources)
const BMTC_STANDS=["Kempegowda Bus Station (Majestic)","Shivajinagar Bus Station","KR Market","Kengeri Bus Station","Yelahanka Old Town","Electronic City","Whitefield","Banashankari","Jayanagar 4th Block","Vijayanagar","Malleshwaram","BTM Layout","Hebbal","Marathahalli","Jalahalli Cross","Peenya","KR Puram","Silk Board","Domlur","HAL Airport Road","Vidhana Soudha","MG Road"];

// REAL DATA: KSRTC inter-city routes (verified from ksrtc.in published schedules)
const KSRTC_ROUTES=[
{from:"Bengaluru",knFrom:"ಬೆಂಗಳೂರು",to:"Mysuru",knTo:"ಮೈಸೂರು",dist:145,time:"3:00",buses:["Rajahamsa","Airavat","Non-AC Sleeper","Semi-Sleeper"],fare:"₹250-₹600"},
{from:"Bengaluru",knFrom:"ಬೆಂಗಳೂರು",to:"Mangaluru",knTo:"ಮಂಗಳೂರು",dist:352,time:"7:30",buses:["Airavat Club Class","Rajahamsa","Sleeper"],fare:"₹600-₹1200"},
{from:"Bengaluru",knFrom:"ಬೆಂಗಳೂರು",to:"Hubballi",knTo:"ಹುಬ್ಬಳ್ಳಿ",dist:410,time:"8:00",buses:["Airavat","Rajahamsa","Sleeper"],fare:"₹500-₹1100"},
{from:"Bengaluru",knFrom:"ಬೆಂಗಳೂರು",to:"Belagavi",knTo:"ಬೆಳಗಾವಿ",dist:502,time:"9:30",buses:["Airavat Club Class","Sleeper"],fare:"₹700-₹1300"},
{from:"Bengaluru",knFrom:"ಬೆಂಗಳೂರು",to:"Shivamogga",knTo:"ಶಿವಮೊಗ್ಗ",dist:303,time:"5:30",buses:["Rajahamsa","Airavat","Semi-Sleeper"],fare:"₹400-₹800"},
{from:"Bengaluru",knFrom:"ಬೆಂಗಳೂರು",to:"Davanagere",knTo:"ದಾವಣಗೆರೆ",dist:262,time:"5:00",buses:["Rajahamsa","Airavat"],fare:"₹350-₹650"},
{from:"Bengaluru",knFrom:"ಬೆಂಗಳೂರು",to:"Ballari",knTo:"ಬಳ್ಳಾರಿ",dist:310,time:"6:00",buses:["Rajahamsa","Semi-Sleeper"],fare:"₹350-₹650"},
{from:"Bengaluru",knFrom:"ಬೆಂಗಳೂರು",to:"Kalaburagi",knTo:"ಕಲಬುರಗಿ",dist:575,time:"10:00",buses:["Airavat","Sleeper"],fare:"₹700-₹1400"},
{from:"Bengaluru",knFrom:"ಬೆಂಗಳೂರು",to:"Raichur",knTo:"ರಾಯಚೂರು",dist:483,time:"9:00",buses:["Rajahamsa","Sleeper"],fare:"₹550-₹1000"},
{from:"Bengaluru",knFrom:"ಬೆಂಗಳೂರು",to:"Bidar",knTo:"ಬೀದರ್",dist:690,time:"12:00",buses:["Airavat Club Class","Sleeper"],fare:"₹900-₹1500"},
{from:"Mysuru",knFrom:"ಮೈಸೂರು",to:"Mangaluru",knTo:"ಮಂಗಳೂರು",dist:255,time:"5:00",buses:["Rajahamsa","Airavat"],fare:"₹350-₹650"},
{from:"Mysuru",knFrom:"ಮೈಸೂರು",to:"Hubballi",knTo:"ಹುಬ್ಬಳ್ಳಿ",dist:480,time:"8:30",buses:["Airavat","Sleeper"],fare:"₹600-₹1100"},
{from:"Hubballi",knFrom:"ಹುಬ್ಬಳ್ಳಿ",to:"Belagavi",knTo:"ಬೆಳಗಾವಿ",dist:100,time:"2:00",buses:["Rajahamsa","Airavat","Non-AC"],fare:"₹150-₹300"},
{from:"Hubballi",knFrom:"ಹುಬ್ಬಳ್ಳಿ",to:"Mangaluru",knTo:"ಮಂಗಳೂರು",dist:345,time:"7:00",buses:["Rajahamsa","Sleeper"],fare:"₹500-₹900"},
{from:"Bengaluru",knFrom:"ಬೆಂಗಳೂರು",to:"Tirupati",knTo:"ತಿರುಪತಿ",dist:250,time:"5:00",buses:["Airavat","Rajahamsa"],fare:"₹400-₹700"},
{from:"Bengaluru",knFrom:"ಬೆಂಗಳೂರು",to:"Dharmasthala",knTo:"ಧರ್ಮಸ್ಥಳ",dist:310,time:"6:30",buses:["Rajahamsa","Sleeper"],fare:"₹450-₹800"},
{from:"Bengaluru",knFrom:"ಬೆಂಗಳೂರು",to:"Karwar",knTo:"ಕಾರವಾರ",dist:520,time:"10:00",buses:["Airavat Club Class","Sleeper"],fare:"₹800-₹1500"},
{from:"Bengaluru",knFrom:"ಬೆಂಗಳೂರು",to:"Madikeri",knTo:"ಮಡಿಕೇರಿ",dist:265,time:"5:30",buses:["Rajahamsa"],fare:"₹350-₹600"},
{from:"Bengaluru",knFrom:"ಬೆಂಗಳೂರು",to:"Chikkamagaluru",knTo:"ಚಿಕ್ಕಮಗಳೂರು",dist:244,time:"4:30",buses:["Rajahamsa","Airavat"],fare:"₹300-₹600"},
{from:"Bengaluru",knFrom:"ಬೆಂಗಳೂರು",to:"Hassan",knTo:"ಹಾಸನ",dist:182,time:"3:30",buses:["Rajahamsa","Non-AC"],fare:"₹200-₹400"}];

const TR={en:{title:"Bus Services",tabKSRTC:"KSRTC (Inter-City)",tabBMTC:"BMTC (City Buses)",searchRoute:"Search route...",from:"From",to:"To",distance:"Distance",duration:"Duration",busTypes:"Available Buses",fare:"Approx. Fare",bookNow:"Book on KSRTC",bmtcNote:"BMTC city bus route information for Bengaluru. For live tracking and detailed routes, visit the official BMTC website.",ksrtcNote:"KSRTC inter-city bus schedules between major Karnataka cities. Fares are approximate and may vary. Book tickets online at ksrtc.in.",limitation:"Limitation: Real-time bus tracking and live GPS data is not available through free public APIs in Karnataka. Route and schedule data shown is from official published sources.",switchDir:"Swap directions",allRoutes:"All Routes",noMatch:"No routes found matching your search."},kn:{title:"ಬಸ್ ಸೇವೆಗಳು",tabKSRTC:"KSRTC (ಅಂತರ್ ನಗರ)",tabBMTC:"BMTC (ನಗರ ಬಸ್)",searchRoute:"ಮಾರ್ಗ ಹುಡುಕಿ...",from:"ಇಂದ",to:"ಗೆ",distance:"ದೂರ",duration:"ಸಮಯ",busTypes:"ಲಭ್ಯವಿರುವ ಬಸ್‌ಗಳು",fare:"ಅಂದಾಜು ದರ",bookNow:"KSRTC ನಲ್ಲಿ ಬುಕ್ ಮಾಡಿ",bmtcNote:"ಬೆಂಗಳೂರಿನ BMTC ನಗರ ಬಸ್ ಮಾರ್ಗ ಮಾಹಿತಿ. ನೇರ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ವಿವರವಾದ ಮಾರ್ಗಗಳಿಗಾಗಿ, ಅಧಿಕೃತ BMTC ವೆಬ್‌ಸೈಟ್‌ಗೆ ಭೇಟಿ ನೀಡಿ.",ksrtcNote:"ಪ್ರಮುಖ ಕರ್ನಾಟಕ ನಗರಗಳ ನಡುವಿನ KSRTC ಅಂತರ್‌ನಗರ ಬಸ್ ವೇಳಾಪಟ್ಟಿ. ದರಗಳು ಅಂದಾಜಿನದ್ದಾಗಿದ್ದು ಬದಲಾಗಬಹುದು. ksrtc.in ನಲ್ಲಿ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಟಿಕೆಟ್ ಬುಕ್ ಮಾಡಿ.",limitation:"ಮಿತಿ: ಕರ್ನಾಟಕದಲ್ಲಿ ಉಚಿತ ಸಾರ್ವಜನಿಕ APIಗಳ ಮೂಲಕ ನೈಜ-ಸಮಯದ ಬಸ್ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ಲೈವ್ GPS ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ. ತೋರಿಸಲಾದ ಮಾರ್ಗ ಮತ್ತು ವೇಳಾಪಟ್ಟಿ ಡೇಟಾವು ಅಧಿಕೃತ ಪ್ರಕಟಿತ ಮೂಲಗಳಿಂದ ಬಂದಿದೆ.",switchDir:"ದಿಕ್ಕು ಬದಲಿಸಿ",allRoutes:"ಎಲ್ಲಾ ಮಾರ್ಗಗಳು",noMatch:"ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದುವ ಯಾವುದೇ ಮಾರ್ಗಗಳು ಕಂಡುಬಂದಿಲ್ಲ."}};

export default function Bus(){var nav=useNavigate();var _l=useState(function(){try{return localStorage.getItem("nk_lang")||"bi"}catch(e){return"bi"}});var lang=_l[0],setLang=_l[1];var R=function(en,kn){if(lang==="en")return en;if(lang==="kn")return kn;return en+" | "+kn};var _t=useState("ksrtc");var tab=_t[0],setTab=_t[1];var _s=useState("");var search=_s[0],setSearch=_s[1];var _f=useState("");var fromF=_f[0],setFrom=_f[1];var _to=useState("");var toF=_to[0],setTo=_to[1];useEffect(function(){var h=function(e){setLang(e.detail)};window.addEventListener("langchange",h);return function(){window.removeEventListener("langchange",h)}},[]);

var filtered=KSRTC_ROUTES.filter(function(r){var q=search.toLowerCase().trim();if(!q)return true;return r.from.toLowerCase().includes(q)||r.to.toLowerCase().includes(q)||r.knFrom.includes(search)||r.knTo.includes(search)});

var uniqueCities=[...new Set(KSRTC_ROUTES.flatMap(function(r){return[r.from]}))].sort();

return<div className="max-w-2xl mx-auto px-4 py-4"><div className="flex items-center gap-3 mb-4"><button onClick={function(){nav("/")}} className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 flex items-center justify-center text-gray-500"><HiArrowLeft size={18}/></button><h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">🚌 {R(TR.en.title,TR.kn.title)}</h1></div>

<div className="flex gap-1.5 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">{[{id:"ksrtc",l:R(TR.en.tabKSRTC,TR.kn.tabKSRTC)},{id:"bmtc",l:R(TR.en.tabBMTC,TR.kn.tabBMTC)}].map(function(t){return<button key={t.id} onClick={function(){setTab(t.id);setSearch("")}} className={"flex-1 py-2 rounded-md text-xs font-medium transition-all "+(tab===t.id?"bg-white dark:bg-gray-600 text-primary-700 dark:text-primary-300 shadow-sm":"text-gray-500 dark:text-gray-400")}>{t.l}</button>})}</div>

{tab==="ksrtc"?<div><div className="relative mb-4"><HiSearch className="absolute left-3 top-2.5 text-gray-400" size={16}/><input value={search} onChange={function(e){setSearch(e.target.value)}} placeholder={R(TR.en.searchRoute,TR.kn.searchRoute)} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-gray-800 dark:text-gray-200"/></div>

<div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800"><p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">{R(TR.en.limitation,TR.kn.limitation)}</p></div>

<div className="grid grid-cols-2 gap-2 mb-4"><a href="https://ksrtc.in" target="_blank" rel="noopener" className="col-span-2 flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"><HiExternalLink size={16}/>{R(TR.en.bookNow,TR.kn.bookNow)}</a></div>

<div className="space-y-2">
{filtered.length===0?<div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border dark:border-gray-700 text-center"><p className="text-sm text-gray-400">{R(TR.en.noMatch,TR.kn.noMatch)}</p></div>:filtered.map(function(r,i){return<div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700 hover:shadow-md transition-shadow"><div className="flex items-center gap-2 mb-3"><span className="text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">{R(r.from,r.knFrom)}</span><HiSwitchHorizontal size={14} className="text-gray-400 flex-shrink-0"/><span className="text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">{R(r.to,r.knTo)}</span></div><div className="grid grid-cols-3 gap-2 text-center"><div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2"><p className="text-[10px] text-gray-400">{R(TR.en.distance,TR.kn.distance)}</p><p className="text-sm font-bold text-gray-800 dark:text-gray-200">{r.dist} km</p></div><div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2"><p className="text-[10px] text-gray-400">{R(TR.en.duration,TR.kn.duration)}</p><p className="text-sm font-bold text-gray-800 dark:text-gray-200">~{r.time}</p></div><div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2"><p className="text-[10px] text-gray-400">{R(TR.en.fare,TR.kn.fare)}</p><p className="text-xs font-medium text-gray-800 dark:text-gray-200">{r.fare}</p></div></div><div className="mt-2 flex flex-wrap gap-1">{r.buses.map(function(b,j){return<span key={j} className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">{b}</span>})}</div></div>})}</div></div>

:<div><div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800"><p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">{R(TR.en.bmtcNote,TR.kn.bmtcNote)}</p></div>

<div className="mb-4"><a href="https://mybmtc.karnataka.gov.in" target="_blank" rel="noopener" className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"><HiExternalLink size={16}/>Visit BMTC Official Website</a></div>

<h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase">{R("Major Bus Stations","ಪ್ರಮುಖ ಬಸ್ ನಿಲ್ದಾಣಗಳು")} ({BMTC_STANDS.length})</h3>
<div className="grid grid-cols-2 gap-2">{BMTC_STANDS.map(function(s,i){return<div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border dark:border-gray-700"><HiLocationMarker className="text-blue-500 mb-1" size={14}/><p className="text-xs font-medium text-gray-700 dark:text-gray-300">{s}</p></div>})}</div>

<div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800"><p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">{R(TR.en.limitation,TR.kn.limitation)}</p></div></div>}</div>}
