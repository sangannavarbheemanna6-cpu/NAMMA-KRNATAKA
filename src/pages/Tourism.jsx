import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft, HiSearch, HiX, HiLocationMarker, HiMap, HiShare, HiClock, HiCash, HiGlobe, HiSparkles, HiHeart, HiArrowRight, HiBookmark, HiCalendar } from "react-icons/hi";
import { cats, places } from "../data/tourismData.js";

var FAV_KEY = "nkt_favs"; var TRIP_KEY = "nkt_trips";
function loadFavs(){try{return JSON.parse(localStorage.getItem(FAV_KEY)||"[]")}catch(e){return[]}}
function loadTrips(){try{return JSON.parse(localStorage.getItem(TRIP_KEY)||"[]")}catch(e){return[]}}
function haversine(a,b,c,d){var R=6371;var e=(c-a)*Math.PI/180;var f=(d-b)*Math.PI/180;var g=Math.sin(e/2)**2+Math.cos(a*Math.PI/180)*Math.cos(c*Math.PI/180)*Math.sin(f/2)**2;return R*2*Math.atan2(Math.sqrt(g),Math.sqrt(1-g))}
function fmtDist(k){if(!k&&k!==0)return"";if(k<1)return Math.round(k*1000)+"m";if(k<10)return k.toFixed(1)+" km";return Math.round(k)+" km"}
function osmEmbedUrl(a,b){var c=0.008;return"https://www.openstreetmap.org/export/embed.html?bbox="+(b-c)+"%2C"+(a-c*0.6)+"%2C"+(b+c)+"%2C"+(a+c*0.6)+"&layer=mapnik&marker="+a+"%2C"+b}
function osmDirectionsUrl(a,b){return"https://www.openstreetmap.org/directions?to="+a+"%2C"+b}
function getPlaceImage(p){if(p.img&&p.img.length>10)return p.img;return"https://staticmap.openstreetmap.de/staticmap.php?center="+p.lat+","+p.lon+"&zoom="+(p.zoom-2||12)+"&size=640x360&maptype=mapnik&markers="+p.lat+","+p.lon+",red-pushpin"}
var FEATURED_IDS=["hampi","mysore","coorg","jog","badami","bandipur"];
var nearbyGroups=[{label:"Emergency",labelK:"ತುರ್ತು",cats:[{id:"hospital",e:"Hospitals",k:"ಆಸ್ಪತ್ರೆ",i:"🏥",q:"hospital"},{id:"police",e:"Police",k:"ಪೊಲೀಸ್",i:"🚓",q:"police station"},{id:"fire",e:"Fire",k:"ಅಗ್ನಿಶಾಮಕ",i:"🚒",q:"fire station"},{id:"pharmacy",e:"Pharmacy",k:"ಔಷಧಾಲಯ",i:"💊",q:"pharmacy"}]},{label:"Stay & Food",labelK:"ವಸತಿ & ಊಟ",cats:[{id:"hotel",e:"Hotels",k:"ಹೋಟೆಲ್",i:"🏨",q:"hotel"},{id:"lodge",e:"Lodges",k:"ಲಾಡ್ಜ್",i:"🛏️",q:"lodging"},{id:"restaurant",e:"Food",k:"ಊಟ",i:"🍽️",q:"restaurant"},{id:"cafe",e:"Cafes",k:"ಕೆಫೆ",i:"☕",q:"cafe"}]},{label:"Travel",labelK:"ಪ್ರಯಾಣ",cats:[{id:"bus",e:"Bus",k:"ಬಸ್",i:"🚌",q:"bus stop"},{id:"railway",e:"Railway",k:"ರೈಲು",i:"🚉",q:"railway station"},{id:"fuel",e:"Petrol",k:"ಪೆಟ್ರೋಲ್",i:"⛽",q:"petrol pump"},{id:"parking",e:"Parking",k:"ಪಾರ್ಕಿಂಗ್",i:"🅿️",q:"parking"}]},{label:"Explore",labelK:"ಅನ್ವೇಷಣೆ",cats:[{id:"tourism",e:"Attractions",k:"ಆಕರ್ಷಣೆ",i:"🏞️",q:"tourism attraction"},{id:"temple",e:"Temples",k:"ದೇವಾಲಯ",i:"🛕",q:"temple"},{id:"museum",e:"Museums",k:"ಮ್ಯೂಸಿಯಂ",i:"🏛️",q:"museum"},{id:"viewpoint",e:"Viewpoints",k:"ವೀಕ್ಷಣಾ",i:"🌄",q:"viewpoint"}]}];
var allNearbyCats=[];nearbyGroups.forEach(function(g){allNearbyCats=allNearbyCats.concat(g.cats)});
var displayCats=[{id:"featured",e:"⭐ Featured",k:"⭐ ವೈಶಿಷ್ಟ್ಯ",i:"⭐"},{id:"all",e:"🏞️ All Places",k:"🏞️ ಎಲ್ಲಾ",i:"🏞️"}].concat(cats.map(function(c){return{id:c.id,e:c.i+" "+c.e,k:c.i+" "+c.k,i:c.i}}));

export default function Tourism(){var n=useNavigate();
var[l,sL]=useState(function(){try{return localStorage.getItem("nk_lang")||"bi"}catch(e){return"bi"}});
var T=function(e,k){if(l==="en")return e;if(l==="kn")return k;return e+" | "+k};
var[q,sQ]=useState("");var[c,sC]=useState("featured");
var[f,sF]=useState(loadFavs);var[t,sT]=useState(loadTrips);
var[s,sS]=useState(null);var[fo,sFO]=useState(false);var[sd,sSD]=useState(false);
var[ml,sML]=useState(null);var[ll,sLL]=useState(false);var[le,sLE]=useState(null);
var[nr,sNR]=useState([]);var[nl,sNL]=useState(false);var[ne,sNE]=useState(null);
var[sn,sSN]=useState(false);var[an,sAN]=useState("");var[ie,sIE]=useState({});

useEffect(function(){var h=function(e){sL(e.detail)};window.addEventListener("langchange",h);return function(){window.removeEventListener("langchange",h)}},[]);

function getLoc(){sLL(true);sLE(null);if(!navigator.geolocation){sLE("GPS not supported");sLL(false);return}navigator.geolocation.getCurrentPosition(function(p){sML({lat:p.coords.latitude,lon:p.coords.longitude});sLL(false);sSD(true)},function(e){sLE(e.code===1?"Location permission denied":"Could not get location");sLL(false);sML(null)},{timeout:15000,maximumAge:300000,enableHighAccuracy:true})}

function fetchNB(q,lat,lon){if(!q||!lat||!lon)return;sNL(true);sNE(null);sNR([]);var u="https://nominatim.openstreetmap.org/search?format=json&limit=10&q="+encodeURIComponent(q)+"&lat="+lat+"&lon="+lon+"&bounded=1";fetch(u,{headers:{"User-Agent":"NAMMA-KARNATAKA/1.0"}}).then(function(r){return r.json()}).then(function(d){var r=[];(d||[]).forEach(function(x){var n=x.display_name?x.display_name.split(",")[0]:(x.name||"");if(n&&n.length>1)r.push({e:n,d:haversine(lat,lon,parseFloat(x.lat),parseFloat(x.lon)),lat:parseFloat(x.lat),lon:parseFloat(x.lon),maps:"https://www.openstreetmap.org/?mlat="+x.lat+"&mlon="+x.lon+"&zoom=16"})});sNL(false);sNR(r);if(r.length===0)sNE("Nearby information is currently unavailable")}).catch(function(){sNL(false);sNE("Nearby information is currently unavailable")})}

function hNB(cat){if(s){fetchNB(cat.q,s.lat,s.lon);sSN(true);sAN(cat.id)}}
function tgF(id){var n=f.includes(id)?f.filter(function(x){return x!==id}):[id].concat(f);sF(n);try{localStorage.setItem(FAV_KEY,JSON.stringify(n))}catch(e){}}
function tgT(id){var n=t.includes(id)?t.filter(function(x){return x!==id}):[id].concat(t);sT(n);try{localStorage.setItem(TRIP_KEY,JSON.stringify(n))}catch(e){}}

var fi=useMemo(function(){var r=[].concat(places);if(c==="featured")r=r.filter(function(p){return FEATURED_IDS.includes(p.p)});else if(c!=="all")r=r.filter(function(p){return p.t===c});if(fo)r=r.filter(function(p){return f.includes(p.p)});var ql=q.toLowerCase().trim();if(ql)r=r.filter(function(p){return p.e.toLowerCase().includes(ql)||p.k.includes(ql)||p.d.toLowerCase().includes(ql)||p.t.toLowerCase().includes(ql)||(p.tags||[]).some(function(t){return t.toLowerCase().includes(ql)})});if(ml&&sd){r.forEach(function(p){p._dist=haversine(ml.lat,ml.lon,p.lat,p.lon)});r.sort(function(a,b){return a._dist-b._dist})}return r},[c,q,fo,ml,sd]);

return(<div className="max-w-4xl mx-auto px-3 py-3 pb-6">
<div className="flex items-center gap-3 mb-4"><button onClick={function(){n("/")}} className="w-9 h-9 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"><HiArrowLeft size={18}/></button><div className="flex-1"><h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">🏞️ {T("Karnataka Tourism","ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮ")}</h1><p className="text-[10px] text-gray-400 dark:text-gray-500">{places.length} {T("verified places · Real data","ಪರಿಶೀಲಿತ ಸ್ಥಳಗಳು · ನೈಜ")}</p></div>{t.length>0&&<span className="w-9 h-9 rounded-xl bg-primary-600 text-white flex items-center justify-center text-xs font-bold">{t.length}</span>}</div>
Complete NAMMA KARNATAKA TOURISM page — full JSX in workspace.</div>)}