import React,{useState,useEffect,useCallback,useMemo}from"react";
import{CATMAP,T,KA_DISTRICTS,KA_CITIES,catIcon,FUEL_API}from"../data/marketData.js";
import{HiSearch,HiRefresh}from"react-icons/hi";

export default function MarketPrices(){
var _0=useState("fuel"),tab=_0[0],st=_0[1],
_1=useState(""),search=_1[0],ss=_1[1],
_2=useState("All"),cat=_2[0],sc=_2[1],
_3=useState([]),mdata=_3[0],sm=_3[1],
_4=useState(null),fdata=_4[0],sf=_4[1],
_5=useState(!1),fl=_5[0],sfl=_5[1],
_6=useState(""),fe=_6[0],sfe=_6[1],
_7=useState(""),fc=_7[0],sfc=_7[1],
_8=useState(function(){try{return localStorage.getItem("nk_lang")||"bi"}catch(e){return"bi"}}),lg=_8[0],slg=_8[1];
var R=function(e,k){if(lg==="en")return e;if(lg==="kn")return k;return e+" | "+k};
useEffect(function(){var h=function(e){slg(e.detail)};window.addEventListener("langchange",h);return function(){window.removeEventListener("langchange",h)}},[]);
var ff=useCallback(function(){sfl(!0);sfe("");fetch(FUEL_API).then(function(r){if(!r.ok)throw Error("HTTP "+r.status);return r.json()})
.then(function(d){var kp=[],kd=[];(d.petrol||[]).forEach(function(p){if(p.city==="Karnataka"||p.city==="Bangalore"||KA_CITIES.some(function(c){return p.city.toLowerCase()===c.toLowerCase()}))kp.push(p)});
(d.diesel||[]).forEach(function(p){if(p.city==="Karnataka"||p.city==="Bangalore"||KA_CITIES.some(function(c){return p.city.toLowerCase()===c.toLowerCase()}))kd.push(p)});
if(!kp.length)kp=(d.petrol||[]).filter(function(p){return p.city==="Karnataka"||p.city==="Bangalore"});
if(!kd.length)kd=(d.diesel||[]).filter(function(p){return p.city==="Karnataka"||p.city==="Bangalore"});
sf({petrol:kp,diesel:kd,updated:d.last_updated_ist||""})}).catch(function(e){sfe(e.message);sf(null)}).finally(function(){sfl(!1)})},[]);
useEffect(function(){ff()},[ff]);
var ffu=useMemo(function(){if(!fdata)return null;var fs=fc.toLowerCase();return{petrol:fdata.petrol.filter(function(p){return!fs||p.city.toLowerCase().includes(fs)}),diesel:fdata.diesel.filter(function(d){return!fs||d.city.toLowerCase().includes(fs)}),updated:fdata.updated}},[fdata,fc]);

return<div className="max-w-5xl mx-auto px-4 py-4">
<div className="mb-4">
<h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{R(T.en.title,T.kn.title)}</h2>
<div className="flex gap-1 mt-3 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
{[{v:"fuel",en:"⛽ "+T.en.fuel,kn:"⛽ "+T.kn.fuel},{v:"market",en:"🌾 "+T.en.marketTab,kn:"🌾 "+T.kn.marketTab}].map(function(tb){return<button key={tb.v} onClick={function(){st(tb.v)}} className={"flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all "+(tab===tb.v?"bg-white dark:bg-gray-700 text-primary-700 dark:text-primary-300 shadow-sm":"text-gray-500 dark:text-gray-400")}>{R(tb.en,tb.kn)}</button>})}
</div></div>

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

{tab==="market"&&<div className="text-center py-12">
<div className="text-4xl mb-3">🌾</div>
<p className="text-gray-500 dark:text-gray-400 text-lg mb-2">{R(T.en.noData,T.kn.noData)}</p>
<p className="text-sm text-gray-400 dark:text-gray-500">{R(T.en.noDataHint,T.kn.noDataHint)}</p>
</div>}

<div className="mt-4 text-center text-[10px] text-gray-400 dark:text-gray-500">Data: OpenFuel (public) · {new Date().toLocaleDateString("en-IN")}</div>
</div>}
