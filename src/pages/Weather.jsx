import{useState,useEffect,useRef,useCallback}from"react";import{useNavigate}from"react-router-dom";import{HiArrowLeft,HiLocationMarker,HiRefresh,HiSearch,HiX,HiGlobe}from"react-icons/hi";

var WC={"0":"☀️ Clear","1":"🌤️ Mainly Clear","2":"⛅ Partly Cloudy","3":"☁️ Overcast","45":"🌫️ Fog","48":"🌫️ Fog","51":"🌧️ Drizzle","53":"🌧️ Drizzle","55":"🌧️ Drizzle","61":"🌧️ Light Rain","63":"🌧️ Rain","65":"🌧️ Heavy Rain","71":"❄️ Light Snow","73":"❄️ Snow","75":"❄️ Heavy Snow","80":"🌧️ Showers","81":"🌧️ Heavy Showers","82":"🌧️ Violent Showers","95":"⚡ Thunderstorm","96":"⚡ Hail Storm","99":"⚡ Severe Storm"};
var WCK={"0":"ಸ್ಪಷ್ಟ ಆಕಾಶ","1":"ಬಹುತೇಕ ಸ್ಪಷ್ಟ","2":"ಭಾಗಶಃ ಮೋಡ","3":"ಮೋಡ ಕವಿದ","45":"ಮಂಜು","48":"ಮಂಜು","51":"ತುಂತುರು","53":"ತುಂತುರು","55":"ಜೋರು ತುಂತುರು","61":"ಲಘು ಮಳೆ","63":"ಮಳೆ","65":"ಭಾರಿ ಮಳೆ","71":"ಲಘು ಹಿಮ","73":"ಹಿಮಪಾತ","75":"ಭಾರಿ ಹಿಮ","80":"ಮಳೆ ಸುರಿಮಳೆ","81":"ಭಾರಿ ಸುರಿಮಳೆ","82":"ಅತಿ ಭಾರಿ ಸುರಿಮಳೆ","95":"ಗುಡುಗು ಸಿಡಿಲು","96":"ಆಲಿಕಲ್ಲು","99":"ತೀವ್ರ ಗುಡುಗು"};

var TR={en:{title:"Weather",searchPlaceholder:"Search any village, town, or city in Karnataka...",searching:"Searching...",noResults:"No locations found in Karnataka. Try a different spelling.",fetchError:"Unable to load weather data. Try again.",loading:"Loading weather data...",locationDenied:"Location access denied. Please search above.",refresh:"Refresh",feelsLike:"Feels like",humidity:"Humidity",wind:"Wind",forecast:"7-Day Forecast",recent:"Recent Searches",powered:"Locations via OpenStreetMap · Weather via Open-Meteo"},kn:{title:"ಹವಾಮಾನ",searchPlaceholder:"ಕರ್ನಾಟಕದ ಯಾವುದೇ ಗ್ರಾಮ, ಪಟ್ಟಣ ಅಥವಾ ನಗರ ಹುಡುಕಿ...",searching:"ಹುಡುಕಲಾಗುತ್ತಿದೆ...",noResults:"ಕರ್ನಾಟಕದಲ್ಲಿ ಯಾವುದೇ ಸ್ಥಳ ಕಂಡುಬಂದಿಲ್ಲ. ಬೇರೆ ಕಾಗುಣಿತ ಪ್ರಯತ್ನಿಸಿ.",fetchError:"ಹವಾಮಾನ ಡೇಟಾ ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",loading:"ಹವಾಮಾನ ಡೇಟಾ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",locationDenied:"ಸ್ಥಳ ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ. ಮೇಲೆ ಹುಡುಕಿ.",refresh:"ರಿಫ್ರೆಶ್",feelsLike:"ಅನುಭವಿಸುವ ತಾಪಮಾನ",humidity:"ಆರ್ದ್ರತೆ",wind:"ಗಾಳಿ",forecast:"7-ದಿನ ಮುನ್ಸೂಚನೆ",recent:"ಇತ್ತೀಚಿನ ಹುಡುಕಾಟಗಳು",powered:"OpenStreetMap ಮೂಲಕ ಸ್ಥಳಗಳು · Open-Meteo ಮೂಲಕ ಹವಾಮಾನ"}};

var CK="nk_wx_cache";
function lc(){try{return JSON.parse(localStorage.getItem(CK)||"{}")}catch(e){return{}}}
function sc(o){try{localStorage.setItem(CK,JSON.stringify(o))}catch(e){}}
var RK="nk_wx_recent";
function lr(){try{return JSON.parse(localStorage.getItem(RK)||"[]")}catch(e){return[]}}
function sr(a){try{localStorage.setItem(RK,JSON.stringify(a.slice(0,8)))}catch(e){}}

var lrq=0;
async function geoSearch(q){
  var lo=q.trim().toLowerCase();
  if(lo.length<2)return[];
  var ca=lc();
  if(ca[lo])return ca[lo];
  var n=Date.now(),e=n-lrq;
  if(e<1100)await new Promise(function(r){setTimeout(r,1100-e)});
  lrq=Date.now();
  try{
    var u="https://nominatim.openstreetmap.org/search?format=json&limit=8&countrycodes=in&addressdetails=1&namedetails=1&q="+encodeURIComponent(q+" Karnataka India");
    var rs=await fetch(u,{headers:{"User-Agent":"NAMMA-KARNATAKA/1.0 (bhimsangannavar@gmail.com)"}});
    if(!rs.ok)throw new Error("HTTP "+rs.status);
    var d=await rs.json();
    var re=d.filter(function(it){
      var ad=it.address||{};
      return(ad.state||"").toLowerCase().includes("karnataka");
    }).map(function(it){
      var ad=it.address||{};
      var nm=ad.village||ad.town||ad.city||ad.hamlet||ad.suburb||ad.municipality||ad.county||it.name||"";
      var ho=ad.hobli||"";
      var tk=(ad.taluk||ad.county||ad.state_district||"").replace(" District","");
      var di=ad.state_district||ad.district||"";
      var la=[];
      if(nm)la.push(nm);
      if(ho)la.push(ho+" Hobli");
      if(tk)la.push(tk+" Taluk");
      if(di){di=di.replace(" District","");la.push(di+" Dist.")}
      return{lat:parseFloat(it.lat),lon:parseFloat(it.lon),name:nm,hobli:ho,taluk:tk,district:di,label:la.join(", ")+", Karnataka"};
    });
    ca[lo]=re;sc(ca);return re;
  }catch(e){console.warn("Nominatim:",e);return[]}
}

async function fw(lat,lon){
  var u="https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+lon+"&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Asia/Kolkata&forecast_days=7";
  var rs=await fetch(u);
  if(!rs.ok)throw new Error("API error "+rs.status);
  return rs.json();
}

export default function Weather(){
  var nav=useNavigate();
  var _l=useState(function(){try{return localStorage.getItem("nk_lang")||"bi"}catch(e){return"bi"}});
  var lg=_l[0],slg=_l[1];
  var R=function(e,k){if(lg==="en")return e;if(lg==="kn")return k;return e+" | "+k};

  var _w=useState(null);var wx=_w[0],swx=_w[1];
  var _ld=useState(true);var ld=_ld[0],sld=_ld[1];
  var _er=useState(null);var er=_er[0],ser=_er[1];
  var _lo=useState(null);var lo=_lo[0],slo=_lo[1];
  var _sr=useState("");var sr=_sr[0],ssr=_sr[1];
  var _fc=useState([]);var fc=_fc[0],sfc=_fc[1];
  var _dd=useState(false);var dd=_dd[0],sdd=_dd[1];
  var _su=useState([]);var su=_su[0],ssu=_su[1];
  var _sL=useState(false);var sL=_sL[0],ssL=_sL[1];
  var _rc=useState(lr());var rc=_rc[0],src=_rc[1];
  var _si=useState(-1);var si=_si[0],ssi=_si[1];

  var ir=useRef(null);
  var dr=useRef(null);

  useEffect(function(){
    var h=function(e){slg(e.detail)};
    window.addEventListener("langchange",h);
    return function(){window.removeEventListener("langchange",h)};
  },[]);

  useEffect(function(){detectLocation()},[]);

  useEffect(function(){
    if(dr.current)clearTimeout(dr.current);
    if(sr.trim().length<2){ssu([]);sdd(false);ssi(-1);return}
    ssL(true);
    dr.current=setTimeout(function(){
      geoSearch(sr).then(function(r){ssu(r);ssL(false);sdd(true);ssi(-1)});
    },400);
    return function(){if(dr.current)clearTimeout(dr.current)};
  },[sr]);

  var detectLocation=useCallback(async function(){
    sld(true);ser(null);
    if(!navigator.geolocation){ser("unavailable");sld(false);return}
    try{
      var p=await new Promise(function(res,rej){
        navigator.geolocation.getCurrentPosition(res,rej,{timeout:10000,maximumAge:600000,enableHighAccuracy:false});
      });
      await lwx(p.coords.latitude,p.coords.longitude,"My Location");
      slo({lat:p.coords.latitude,lon:p.coords.longitude,name:"My Location",label:"GPS Location"});
    }catch(e){ser("denied");sld(false)}
  },[]);

  var lwx=async function(lat,lon,dn){
    sld(true);ser(null);
    try{
      var d=await fw(lat,lon);
      swx(d.current);
      sfc(d.daily.time.map(function(t,i){return{date:t,hi:d.daily.temperature_2m_max[i],lo:d.daily.temperature_2m_min[i],code:String(d.daily.weather_code[i])}}));
      sld(false);
    }catch(e){ser("fetch");sld(false)}
  };

  var sel=async function(loc){
    slo(loc);ssr("");sdd(false);ssu([]);ssi(-1);
    var nr=[loc].concat(rc.filter(function(r){return r.lat!==loc.lat||r.lon!==loc.lon}));
    src(nr);sr(nr);
    await lwx(loc.lat,loc.lon,loc.name);
  };

  var srec=function(re){slo(re);ssr("");sdd(false);lwx(re.lat,re.lon,re.name)};

  var hkd=function(e){
    if(!dd||su.length===0)return;
    if(e.key==="ArrowDown"){e.preventDefault();ssi(function(i){return Math.min(i+1,su.length-1)})}
    else if(e.key==="ArrowUp"){e.preventDefault();ssi(function(i){return Math.max(i-1,-1)})}
    else if(e.key==="Enter"){e.preventDefault();if(si>=0&&si<su.length)sel(su[si])}
    else if(e.key==="Escape"){sdd(false);ssi(-1)}
  };

  var clr=function(){src([]);sr([])};

  return<div className="max-w-2xl mx-auto px-4 py-4">

    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <button onClick={function(){nav("/")}} className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 flex items-center justify-center text-gray-500"><HiArrowLeft size={18}/></button>
        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">{R(TR.en.title,TR.kn.title)}</h1>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={function(){if(lo)lwx(lo.lat,lo.lon,lo.name);else detectLocation()}} className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 flex items-center justify-center text-primary-600" title={R(TR.en.refresh,TR.kn.refresh)}><HiRefresh size={18}/></button>
        <button onClick={detectLocation} className="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600" title="Use my location"><HiLocationMarker size={18}/></button>
      </div>
    </div>

    <div className="relative mb-4">
      <HiSearch className="absolute left-3 top-3 text-gray-400" size={18}/>
      <input ref={ir} value={sr}
        onChange={function(e){ssr(e.target.value);sdd(true)}}
        onFocus={function(){if(sr.trim().length>=2)sdd(true)}}
        onKeyDown={hkd}
        placeholder={R(TR.en.searchPlaceholder,TR.kn.searchPlaceholder)}
        className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-base text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20"/>
      {sr?<button onClick={function(){ssr("");ssu([]);sdd(false)}} className="absolute right-2 top-3 text-gray-400"><HiX size={16}/></button>:null}

      {dd&&(su.length>0||sL)?<div className="absolute top-full mt-1 left-0 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 max-h-80 overflow-y-auto z-50">
        {sL?<div className="flex items-center gap-2 px-4 py-3 text-sm text-gray-400"><div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"/>{R(TR.en.searching,TR.kn.searching)}</div>
        :su.map(function(l,i){return<button key={i} onClick={function(){sel(l)}} className={"w-full text-left px-4 py-3 text-sm transition-colors flex items-start gap-3 "+(i===si?"bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300":"hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300")}><HiLocationMarker size={16} className={"flex-shrink-0 mt-0.5 "+(i===si?"text-primary-500":"text-gray-400")}/><div className="min-w-0"><p className="font-medium truncate">{l.name}</p><p className="text-xs text-gray-400 dark:text-gray-500 truncate">{l.label}</p></div></button>})}
      </div>:null}
      {dd&&!sL&&su.length===0&&sr.trim().length>=2?<div className="absolute top-full mt-1 left-0 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 p-4 text-center z-50"><p className="text-sm text-gray-400">{R(TR.en.noResults,TR.kn.noResults)}</p></div>:null}
    </div>

    {ld?<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700 flex flex-col items-center justify-center" style={{minHeight:"200px"}}><div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mb-3"/><p className="text-sm text-gray-500 dark:text-gray-400">{R(TR.en.loading,TR.kn.loading)}</p></div>
    :er==="denied"?<div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-5 border border-amber-200 dark:border-amber-800"><p className="text-amber-800 dark:text-amber-200 text-sm">{R(TR.en.locationDenied,TR.kn.locationDenied)}</p></div>
    :er==="fetch"?<div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-5 border border-red-200 dark:border-red-800 text-center"><p className="text-red-700 dark:text-red-300 text-sm mb-3">{R(TR.en.fetchError,TR.kn.fetchError)}</p><button onClick={function(){if(lo)lwx(lo.lat,lo.lon,lo.name);else detectLocation()}} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm">{R(TR.en.refresh,TR.kn.refresh)}</button></div>
    :wx?<div className="space-y-3">

      <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1 mr-2">
            <p className="text-sky-100 text-sm font-medium truncate">{lo?lo.name:"..."}</p>
            {lo&&lo.label?<p className="text-sky-200/70 text-xs truncate mt-0.5">{lo.label}</p>:null}
            <p className="text-5xl font-bold mt-2">{Math.round(wx.temperature_2m)}<span className="text-xl font-normal">°C</span></p>
            <p className="text-sky-100 text-sm mt-1">{R(WC[String(wx.weather_code)]||"🌡️ Unknown",WCK[String(wx.weather_code)]||"ಗೊತ್ತಿಲ್ಲ")}</p>
            <p className="text-sky-200 text-xs mt-0.5">{R(TR.en.feelsLike,TR.kn.feelsLike)}: {Math.round(wx.apparent_temperature)}°C</p>
          </div>
          <div className="text-5xl flex-shrink-0">{WC[String(wx.weather_code)]?WC[String(wx.weather_code)].split(" ")[0]:"🌡️"}</div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm"><p className="text-xs text-sky-100">{R(TR.en.humidity,TR.kn.humidity)}</p><p className="text-xl font-bold">{wx.relative_humidity_2m}%</p></div>
          <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm"><p className="text-xs text-sky-100">{R(TR.en.wind,TR.kn.wind)}</p><p className="text-xl font-bold">{Math.round(wx.wind_speed_10m)} km/h</p></div>
        </div>
      </div>

      {fc.length>0?<div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border dark:border-gray-700">
        <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3">{R(TR.en.forecast,TR.kn.forecast)}</h3>
        <div className="space-y-1">
          {fc.map(function(d,i){return<div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"><span className="text-2xl w-9 text-center">{WC[d.code]?WC[d.code].split(" ")[0]:"☀️"}</span><span className="flex-1 ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">{new Date(d.date).toLocaleDateString(lg==="kn"?"kn-IN":"en-IN",{weekday:"long",day:"numeric",month:"short"})}</span><div className="flex gap-3 text-sm"><span className="text-gray-800 dark:text-gray-200 font-medium">{Math.round(d.hi)}°</span><span className="text-gray-400 dark:text-gray-500">{Math.round(d.lo)}°</span></div></div>})}
        </div>
      </div>:null}

      {lo?<div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-gray-500 dark:text-gray-400">
          <HiGlobe size={14}/><span className="font-medium">{lo.name}</span>
          {lo.hobli?<span className="text-gray-300 dark:text-gray-600">|</span>:null}
          {lo.hobli?<span>{lo.hobli} Hobli</span>:null}
          {lo.taluk?<span className="text-gray-300 dark:text-gray-600">|</span>:null}
          {lo.taluk?<span>{lo.taluk} Taluk</span>:null}
          {lo.district?<span className="text-gray-300 dark:text-gray-600">|</span>:null}
          {lo.district?<span>{lo.district}</span>:null}
        </div>
      </div>:null}

    </div>
    :<div className="space-y-4">
      {rc.length>0?<div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400">{R(TR.en.recent,TR.kn.recent)}</h3>
          <button onClick={clr} className="text-xs text-gray-400 hover:text-red-500 transition-colors">{R("Clear","ಅಳಿಸಿ")}</button>
        </div>
        <div className="flex flex-wrap gap-2">{rc.map(function(re,i){return<button key={i} onClick={function(){srec(re)}} className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs text-gray-600 dark:text-gray-300 hover:border-primary-300 transition-colors"><HiLocationMarker size={12} className="text-primary-500"/>{re.name}</button>})}</div>
      </div>:null}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700 text-center">
        <div className="text-4xl mb-3">🔍</div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{R("Search any location in Karnataka to get started","ಕರ್ನಾಟಕದ ಯಾವುದೇ ಸ್ಥಳ ಹುಡುಕಿ ಪ್ರಾರಂಭಿಸಿ")}</p>
        <p className="text-xs text-gray-400 mt-1">{R("Villages, towns, taluks, districts — all supported","ಗ್ರಾಮಗಳು, ಪಟ್ಟಣಗಳು, ತಾಲೂಕುಗಳು, ಜಿಲ್ಲೆಗಳು — ಎಲ್ಲಾ ಬೆಂಬಲಿತ")}</p>
      </div>
    </div>}

    <p className="text-center text-[10px] text-gray-400 dark:text-gray-500 mt-4">{R(TR.en.powered,TR.kn.powered)}</p>
  </div>;
}