import React,{useState,useEffect,useCallback,useMemo}from"react";
import{CATMAP,T,KA_DISTRICTS,KA_CITIES,catIcon,DATA_GOV_KEY,COMMODITY_API,FUEL_API}from"../data/marketData.js";
import{HiSearch,HiRefresh,HiStar,HiBell,HiLocationMarker,HiCalendar,HiX}from"react-icons/hi";

export default function MarketPrices(){
var _0=useState("market"),tab=_0[0],st=_0[1],
_1=useState(""),search=_1[0],ss=_1[1],
_2=useState("All"),cat=_2[0],sc=_2[1],
_3=useState([]),mdata=_3[0],sm=_3[1],
_4=useState(null),fdata=_4[0],sf=_4[1],
_5=useState(!1),ml=_5[0],sml=_5[1],
_6=useState(!1),fl=_6[0],sfl=_6[1],
_7=useState(""),me=_7[0],sme=_7[1],
_8=useState(""),fe=_8[0],sfe=_8[1],
_9=useState(function(){try{return JSON.parse(localStorage.getItem("mp_favs")||"[]")}catch(e){return[]}}),favs=_9[0],sfv=_9[1],
_10=useState(function(){try{return JSON.parse(localStorage.getItem("mp_alerts")||"[]")}catch(e){return[]}}),alerts=_10[0],sal=_10[1],
_11=useState(function(){try{return localStorage.getItem("nk_lang")||"bi"}catch(e){return"bi"}}),lg=_11[0],slg=_11[1],
_12=useState(null),ac=_12[0],sac=_12[1],
_13=useState(""),ap=_13[0],sap=_13[1],
_14=useState(""),fc=_14[0],sfc=_14[1];
var R=function(e,k){if(lg==="en")return e;if(lg==="kn")return k;return e+" | "+k};
useEffect(function(){var h=function(e){slg(e.detail)};window.addEventListener("langchange",h);return function(){window.removeEventListener("langchange",h)}},[]);
var fm=useCallback(function(t){sml(!0);sme("");if(!DATA_GOV_KEY){sme("nokey");sml(!1);return}
fetch(COMMODITY_API+"?api-key="+DATA_GOV_KEY+"&format=json&limit=200&filters[state]=Karnataka")
.then(function(r){if(!r.ok)throw Error("HTTP "+r.status);return r.json()})
.then(function(d){sm((d.records||[]).map(function(r){return{crop:r.commodity||"",variety:r.variety||"",district:r.district||"",market:r.market||"",min:parseFloat(r.min_price)||0,max:parseFloat(r.max_price)||0,modal:parseFloat(r.modal_price)||0,arrivals:parseFloat(r.arrival_in_tonnes)||0,unit:"₹/quintal",date:r.arrival_date||"",category:CATMAP[r.commodity]||"Other"}}))})
.catch(function(e){sme(e.message);sm([])}).finally(function(){sml(!1)})},[]);
var ff=useCallback(function(){sfl(!0);sfe("");fetch(FUEL_API).then(function(r){if(!r.ok)throw Error("HTTP "+r.status);return r.json()})
.then(function(d){var kp=[],kd=[];(d.petrol||[]).forEach(function(p){if(p.city==="Karnataka"||p.city==="Bangalore"||KA_CITIES.some(function(c){return p.city.toLowerCase()===c.toLowerCase()}))kp.push(p)});
(d.diesel||[]).forEach(function(p){if(p.city==="Karnataka"||p.city==="Bangalore"||KA_CITIES.some(function(c){return p.city.toLowerCase()===c.toLowerCase()}))kd.push(p)});
if(!kp.length)kp=(d.petrol||[]).filter(function(p){return p.city==="Karnataka"||p.city==="Bangalore"});
if(!kd.length)kd=(d.diesel||[]).filter(function(p){return p.city==="Karnataka"||p.city==="Bangalore"});
sf({petrol:kp,diesel:kd,updated:d.last_updated_ist||""})}).catch(function(e){sfe(e.message);sf(null)}).finally(function(){sfl(!1)})},[]);
useEffect(function(){fm()},[fm]);useEffect(function(){ff()},[ff]);
var cats=useMemo(function(){return["All","Cereals","Millets","Pulses","Oil Seeds","Vegetables","Fruits","Spices","Flowers","Plantation","Commercial"]},[]);
var filtered=useMemo(function(){return mdata.filter(function(d){var ms=search.toLowerCase();var m=!ms||(d.crop||"").toLowerCase().includes(ms)||(d.variety||"").toLowerCase().includes(ms)||(d.district||"").toLowerCase().includes(ms)||(d.market||"").toLowerCase().includes(ms)||(d.category||"").toLowerCase().includes(ms);return m&&(cat==="All"||d.category===cat)})},[mdata,search,cat]);
var tf=function(c){var n=favs.includes(c)?favs.filter(function(f){return f!==c}):favs.concat([c]);sfv(n);localStorage.setItem("mp_favs",JSON.stringify(n))};
var aa=function(){if(!ac||!ap)return;var n=alerts.concat([{crop:ac,price:parseFloat(ap)}]);sal(n);localStorage.setItem("mp_alerts",JSON.stringify(n));sac(null);sap("")};
var ra=function(i){var n=alerts.filter(function(_,j){return j!==i});sal(n);localStorage.setItem("mp_alerts",JSON.stringify(n))};
var ffu=useMemo(function(){if(!fdata)return null;var fs=fc.toLowerCase();return{petrol:fdata.petrol.filter(function(p){return!fs||p.city.toLowerCase().includes(fs)}),diesel:fdata.diesel.filter(function(d){return!fs||d.city.toLowerCase().includes(fs)}),updated:fdata.updated}},[fdata,fc]);
var dists=useMemo(function(){var d={};mdata.forEach(function(m){if(m.district&&m.market){if(!d[m.district])d[m.district]=[];if(!d[m.district].includes(m.market))d[m.district].push(m.market)}});return d},[mdata]);
var gn=function(d){if(!d||!dists[d])return[];return Object.keys(dists).filter(function(x){return x!==d}).slice(0,3).map(function(x){return{name:x,markets:dists[x].slice(0,2)}})};

return<div className="max-w-5xl mx-auto px-4 py-4">
<div className="mb-4">
<h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{R(T.en.title,T.kn.title)}</h2>
<div className="flex gap-1 mt-3 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
{[{v:"market",en:"🌾 "+T.en.marketTab,kn:"🌾 "+T.kn.marketTab},{v:"fuel",en:"⛽ "+T.en.fuel,kn:"⛽ "+T.kn.fuel}].map(function(tb){return<button key={tb.v} onClick={function(){st(tb.v)}} className={"flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all "+(tab===tb.v?"bg-white dark:bg-gray-700 text-primary-700 dark:text-primary-300 shadow-sm":"text-gray-500 dark:text-gray-400")}>{R(tb.en,tb.kn)}</button>})}
</div></div>

{tab==="market"&&<div>
<div className="mb-3"><div className="relative">
<HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
<input type="text" placeholder={R(T.en.search,T.kn.search)} value={search} onChange={function(e){ss(e.target.value)}} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"/>
</div></div>
<div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-hide">
{cats.map(function(c){return<button key={c} onClick={function(){sc(c)}} className={"px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all "+(cat===c?"bg-primary-600 text-white shadow-sm":"bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600")}>{c==="All"?R(T.en.all,T.kn.all):catIcon(c)+" "+R(T.en[c.toLowerCase().replace(" ","")]||c,T.kn[c.toLowerCase().replace(" ","")]||c)}</button>})}
</div>

{(!DATA_GOV_KEY||me==="nokey")?<div className="text-center py-12"><div className="text-4xl mb-3">📊</div><p className="text-gray-500 dark:text-gray-400 mb-2">{R(T.en.noData,T.kn.noData)}</p><p className="text-xs text-gray-400 dark:text-gray-500">{R(T.en.noDataHint,T.kn.noDataHint)}</p></div>
:ml?<div className="text-center py-12"><div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-3"/><p className="text-gray-500 dark:text-gray-400">🌾 {R(T.en.loading,T.kn.loading)}</p></div>
:me?<div className="text-center py-12"><p className="text-red-500 mb-2">{R(T.en.error,T.kn.error)}: {me}</p><button onClick={function(){fm("popular")}} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm">{R(T.en.retry,T.kn.retry)}</button></div>
:<div>
<div className="flex items-center justify-between mb-2"><p className="text-xs text-gray-500 dark:text-gray-400">{filtered.length} {lg==="kn"?"ಫಲಿತಾಂಶಗಳು":"results"}</p><button onClick={function(){fm("popular")}} className="flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 hover:underline"><HiRefresh size={14}/>{R(T.en.refresh,T.kn.refresh)}</button></div>
{filtered.length===0?<div className="text-center py-8"><p className="text-gray-500 dark:text-gray-400">{R(T.en.noData,T.kn.noData)}</p></div>
:<div className="space-y-2">{filtered.map(function(d,i){var fid=favs.includes(d.crop),aid=alerts.findIndex(function(a){return a.crop===d.crop}),nearby=gn(d.district);
return<div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-3 shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-start justify-between mb-2"><div>
<div className="flex items-center gap-2"><span className="text-lg">{catIcon(d.category)}</span><h3 className="font-semibold text-gray-900 dark:text-gray-100">🌾 {d.crop}</h3>{d.variety&&<span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded">{d.variety}</span>}</div>
<div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400"><HiLocationMarker size={12}/>{d.district} · {d.market}</div></div>
<div className="flex gap-1"><button onClick={function(){tf(d.crop)}} title={fid?R(T.en.removeFav,T.kn.removeFav):R(T.en.addFav,T.kn.addFav)} className={"p-1 rounded "+(fid?"text-yellow-500":"text-gray-400 hover:text-yellow-500")}><HiStar size={16}/></button>
<button onClick={function(){sac(d.crop);sap(String(d.modal))}} title={R(T.en.setAlert,T.kn.setAlert)} className="p-1 rounded text-gray-400 hover:text-primary-500"><HiBell size={16}/></button></div></div>
<div className="grid grid-cols-4 gap-2 mb-2">
<div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg"><p className="text-[10px] text-gray-500 dark:text-gray-400">{R(T.en.min,T.kn.min)}</p><p className="text-sm font-bold text-red-600 dark:text-red-400">₹{d.min.toFixed(0)}</p></div>
<div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg"><p className="text-[10px] text-gray-500 dark:text-gray-400">{R(T.en.max,T.kn.max)}</p><p className="text-sm font-bold text-green-600 dark:text-green-400">₹{d.max.toFixed(0)}</p></div>
<div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><p className="text-[10px] text-gray-500 dark:text-gray-400">{R(T.en.modal,T.kn.modal)}</p><p className="text-sm font-bold text-blue-600 dark:text-blue-400">₹{d.modal.toFixed(0)}</p></div>
<div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg"><p className="text-[10px] text-gray-500 dark:text-gray-400">{R(T.en.arrivals,T.kn.arrivals)}</p><p className="text-sm font-bold text-purple-600 dark:text-purple-400">{d.arrivals>0?d.arrivals.toFixed(1)+" T":"—"}</p></div></div>
<div className="flex items-center justify-between text-[10px] text-gray-400 dark:text-gray-500"><span><HiCalendar size={10} className="inline mr-1"/>{d.date||"—"}</span><span>{d.unit}</span></div>
{nearby.length>0&&<div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 text-[10px] text-gray-400 dark:text-gray-500"><span className="mr-1">📍</span>{R(T.en.nearby,T.kn.nearby)}: {nearby.map(function(n){return n.name}).join(", ")}</div>}
{aid>=0&&<div className="mt-1 text-[10px] text-orange-500 dark:text-orange-400">🔔 {R(T.en.alertSet,T.kn.alertSet)}: ₹{alerts[aid].price}</div>}
</div>})}</div>}
</div>}

{ac&&<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-white dark:bg-gray-800 rounded-xl p-5 max-w-sm w-full shadow-xl"><div className="flex justify-between items-center mb-3"><h3 className="font-semibold text-gray-900 dark:text-gray-100">{R(T.en.setAlert,T.kn.setAlert)}</h3><button onClick={function(){sac(null)}} className="text-gray-400 hover:text-gray-600"><HiX size={20}/></button></div><p className="text-sm text-gray-600 dark:text-gray-300 mb-3">🌾 {ac}</p><input type="number" value={ap} onChange={function(e){sap(e.target.value)}} placeholder="₹ / quintal" className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm mb-3"/><button onClick={aa} className="w-full py-2 bg-primary-600 text-white rounded-lg text-sm font-medium">{R(T.en.setAlert,T.kn.setAlert)}</button></div></div>}
</div>}

{tab==="fuel"&&<div>
<div className="mb-3"><div className="relative"><HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/><input type="text" placeholder={R(T.en.fuelCity,T.kn.fuelCity)} value={fc} onChange={function(e){sfc(e.target.value)}} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"/></div></div>
{fl?<div className="text-center py-12"><div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-3"/><p className="text-gray-500 dark:text-gray-400">{R(T.en.loading,T.kn.loading)}</p></div>
:fe?<div className="text-center py-12"><p className="text-red-500 mb-2">{R(T.en.error,T.kn.error)}: {fe}</p><button onClick={ff} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm">{R(T.en.retry,T.kn.retry)}</button></div>
:!ffu||ffu.petrol.length===0?<div className="text-center py-12"><div className="text-4xl mb-3">⛽</div><p className="text-gray-500 dark:text-gray-400">{R(T.en.fuelNoData,T.kn.fuelNoData)}</p></div>
:<div>
<div className="flex items-center justify-between mb-3"><p className="text-xs text-gray-500 dark:text-gray-400">{ffu.petrol.length} {lg==="kn"?"ನಗರಗಳು":"cities"}</p><button onClick={ff} className="flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 hover:underline"><HiRefresh size={14}/>{R(T.en.refresh,T.kn.refresh)}</button></div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">{ffu.petrol.map(function(p,i){var dp=ffu.diesel.find(function(d){return d.city===p.city})||{};
return<div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
<div className="flex items-center justify-between mb-3"><div className="flex items-center gap-2"><span className="text-lg">⛽</span><span className="font-medium text-gray-900 dark:text-gray-100">{p.city}</span></div></div>
<div className="grid grid-cols-2 gap-2">
<div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center"><p className="text-[10px] text-gray-500 dark:text-gray-400">{R(T.en.petrol,T.kn.petrol)}</p><p className="text-lg font-bold text-orange-600 dark:text-orange-400">₹{p.price.toFixed(2)}</p></div>
<div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center"><p className="text-[10px] text-gray-500 dark:text-gray-400">{R(T.en.diesel,T.kn.diesel)}</p><p className="text-lg font-bold text-blue-600 dark:text-blue-400">₹{(dp.price||p.price).toFixed(2)}</p></div></div></div>})}</div>
{ffu.updated&&<p className="text-center text-[10px] text-gray-400 dark:text-gray-500">{R(T.en.fuelUpdated,T.kn.fuelUpdated)}: {new Date(ffu.updated).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</p>}
</div>}
</div>}

{favs.length>0&&<div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl border border-yellow-100 dark:border-yellow-900/30"><p className="text-xs font-medium text-yellow-700 dark:text-yellow-400 mb-2">⭐ {R(T.en.favorites,T.kn.favorites)}</p><div className="flex flex-wrap gap-1">{favs.map(function(f,i){return<span key={i} className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-xs cursor-pointer hover:bg-yellow-200 dark:hover:bg-yellow-900/50" onClick={function(){ss(f);st("market")}}>🌾 {f}</span>})}</div></div>}

{alerts.length>0&&<div className="mt-3 p-3 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/30"><p className="text-xs font-medium text-orange-700 dark:text-orange-400 mb-2">🔔 {R(T.en.setAlert,T.kn.setAlert)}s</p>{alerts.map(function(a,i){return<div key={i} className="flex items-center justify-between text-xs text-orange-600 dark:text-orange-300 py-0.5"><span>🌾 {a.crop} — ₹{a.price}</span><button onClick={function(){ra(i)}} className="text-gray-400 hover:text-red-500"><HiX size={14}/></button></div>})}</div>}

<div className="mt-4 text-center text-[10px] text-gray-400 dark:text-gray-500">Data: data.gov.in | OpenFuel · {R(T.en.updated,T.kn.updated)}: {new Date().toLocaleDateString("en-IN")}</div>
</div>}
