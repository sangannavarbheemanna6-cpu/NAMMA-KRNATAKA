import{useState,useEffect,useMemo}from"react";import{useNavigate}from"react-router-dom";import{HiArrowLeft,HiLocationMarker,HiSearch,HiRefresh}from"react-icons/hi";

var CROPS=[{id:"paddy",n:"Paddy",kn:"ಭತ್ತ",sci:"Oryza sativa",sn:"Kharif, Rabi",sl:"Clay loam",sw:"25 kg/ha transplant",ir:"5-7cm water",nu:"NPK 120:60:40",ps:"Stem borer, BPH",ds:"Blast, Bacterial blight",hv:"80% golden. 4-6 t/ha",src:"ICAR-IIRR"},{id:"ragi",n:"Ragi",kn:"ರಾಗಿ",sci:"E. coracana",sn:"Kharif, Rabi",sl:"Red sandy loam",sw:"5 kg/ha line",ir:"Minimal, 3-4 irrig",nu:"NPK 50:25:25+FYM",ps:"Pink borer",ds:"Blast, Smut",hv:"Ears brown. 2-3 t/ha",src:"UAS Bengaluru"},{id:"maize",n:"Maize",kn:"ಮೆಕ್ಕೆಜೋಳ",sci:"Zea mays",sn:"Kharif, Rabi",sl:"Loam pH 6-7.5",sw:"20 kg/ha",ir:"5-6 irrig",nu:"NPK 120:60:40",ps:"Stem borer, FAW",ds:"Turcicum blight",hv:"Husk dry. 5-8 t/ha",src:"ICAR-IIMR"},{id:"tomato",n:"Tomato",kn:"ಟೊಮೆಟೊ",sci:"S. lycopersicum",sn:"Kharif, Rabi",sl:"Sandy loam",sw:"400g/ha nursery",ir:"Regular",nu:"NPK 120:80:80",ps:"Fruit borer",ds:"Late blight",hv:"40-50 t/ha",src:"IIHR BLR"},{id:"onion",n:"Onion",kn:"ಈರುಳ್ಳಿ",sci:"Allium cepa",sn:"Kharif, Rabi",sl:"Sandy loam",sw:"10 kg/ha",ir:"7-10 day",nu:"NPK 100:50:50",ps:"Thrips",ds:"Purple blotch",hv:"25-30 t/ha",src:"DOGR"},{id:"groundnut",n:"Groundnut",kn:"ಕಡಲೆಕಾಯಿ",sci:"A. hypogaea",sn:"Kharif, Rabi",sl:"Sandy loam",sw:"120 kg/ha",ir:"Critical flowering",nu:"NPK 25:50:25+Gypsum",ps:"Leaf miner",ds:"Tikka leaf",hv:"2-3 t/ha",src:"ICAR-DGR"}];

var PE=[{cid:"paddy",pests:[{n:"Stem Borer",kn:"ಕಾಂಡ ಕೊರಕ",sy:"Dead hearts. White ears.",pr:"Resistant varieties.",or:"Pheromone traps. Neem cake.",ch:"Cartap HCl. Consult KVK."},{n:"Blast",kn:"ಬ್ಲಾಸ್ಟ್",sy:"Diamond spots on leaves.",pr:"Balanced N. Wider spacing.",or:"Pseudomonas seed treatment.",ch:"Tricyclazole 75 WP."}]},{cid:"maize",pests:[{n:"Fall Armyworm",kn:"ಫಾಲ್ ಆರ್ಮಿವರ್ಮ್",sy:"Ragged feeding. Faecal matter.",pr:"Early sowing. Legume intercrop.",or:"Neem oil 5%.",ch:"Spinosad 45 SC."}]},{cid:"tomato",pests:[{n:"Fruit Borer",kn:"ಹಣ್ಣಿನ ಕೊರಕ",sy:"Round holes in fruits.",pr:"Crop rotation. Marigold.",or:"Neem oil 5ml/L.",ch:"Spinosad/Indoxacarb."},{n:"Late Blight",kn:"ತಡವಾದ ರೋಗ",sy:"Water lesions. White underside.",pr:"Clean transplants.",or:"Copper oxychloride 0.3%.",ch:"Mancozeb/Metalaxyl."}]}];

var SC=[{n:"PM Kisan",kn:"ಪಿಎಂ ಕಿಸಾನ್",b:"₹6000/yr.",e:"Landholding farmers.",h:"Register at CSC. pmkisan.gov.in",u:"https://pmkisan.gov.in"},{n:"PM Fasal Bima",kn:"ಪಿಎಂ ಫಸಲ್ ಬಿಮಾ",b:"Crop insurance 2%/1.5%.",e:"Notified crop farmers.",h:"Bank/CSC before deadline.",u:"https://pmfby.gov.in"},{n:"KCC",kn:"ಕಿಸಾನ್ ಕಾರ್ಡ್",b:"Farm credit 4-7%.",e:"All farmers.",h:"Apply at bank with land docs.",u:"https://rbi.org.in"},{n:"Soil Health Card",kn:"ಮಣ್ಣು ಆರೋಗ್ಯ",b:"Free soil test every 3yr.",e:"All farmers.",h:"Register at KVK.",u:"https://soilhealth.dac.gov.in"},{n:"Raitha Mitra",kn:"ರೈತ ಮಿತ್ರ",b:"Seed subsidy, mechanization.",e:"KA farmers.",h:"Raitha Samparka Kendra.",u:"https://raitamitra.karnataka.gov.in"}];

var CA=[{m:0,n:"January",kn:"ಜನವರಿ",a:"Rabi mgmt. Cane harvest."},{m:1,n:"February",kn:"ಫೆಬ್ರವರಿ",a:"Rabi harvest. Summer sowing."},{m:2,n:"March",kn:"ಮಾರ್ಚ್",a:"Summer mgmt. Kharif prep."},{m:3,n:"April",kn:"ಏಪ್ರಿಲ್",a:"Deep ploughing. Mango harvest."},{m:4,n:"May",kn:"ಮೇ",a:"Kharif prep. Seed procurement."},{m:5,n:"June",kn:"ಜೂನ್",a:"Kharif sowing. Paddy transplant."},{m:6,n:"July",kn:"ಜುಲೈ",a:"Weeding. Top dressing."},{m:7,n:"August",kn:"ಆಗಸ್ಟ್",a:"Pest monitoring."},{m:8,n:"September",kn:"ಸೆಪ್ಟೆಂಬರ್",a:"Early harvest. Rabi prep."},{m:9,n:"October",kn:"ಅಕ್ಟೋಬರ್",a:"Kharif harvest. Rabi sow."},{m:10,n:"November",kn:"ನವೆಂಬರ್",a:"Rabi establish."},{m:11,n:"December",kn:"ಡಿಸೆಂಬರ್",a:"Rabi care. Soil test."}];

var HP=[{n:"Kisan Call Centre",kn:"ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್",p:"1800-180-1551",d:"Free helpline 22 languages.",u:"https://dackkms.in"},{n:"KA Agri Dept",kn:"ಕೃಷಿ ಇಲಾಖೆ",p:"080-22210258",d:"Schemes, subsidies.",u:"https://raitamitra.karnataka.gov.in"},{n:"KVK BLR Rural",kn:"ಕೃವಿಕೇ",p:"080-28466391",d:"Training, soil testing.",u:"https://kvk.icar.gov.in"}];

var Fields=[{id:"sn",en:"Season",kn:"ಋತು",e:"📅"},{id:"sl",en:"Soil",kn:"ಮಣ್ಣು",e:"🏞️"},{id:"sw",en:"Sowing",kn:"ಬಿತ್ತನೆ",e:"🌱"},{id:"ir",en:"Irrigation",kn:"ನೀರಾವರಿ",e:"💧"},{id:"nu",en:"Nutrients",kn:"ಪೋಷಕಾಂಶ",e:"🧪"},{id:"ps",en:"Pests",kn:"ಕೀಟಗಳು",e:"🐛"},{id:"ds",en:"Diseases",kn:"ರೋಗಗಳು",e:"🦠"},{id:"hv",en:"Harvest",kn:"ಕೊಯ್ಲು",e:"🌾"}];

var T={en:{t:"Farmer Mitra",s:"Karnataka Farmer Hub",dash:"Dashboard",crops:"Crop Library",pests:"Pest & Disease",schemes:"Govt Schemes",calendar:"Crop Calendar",help:"Help",mkt:"Market Prices",map:"APMC Map",search:"Search crops, pests...",sourceRef:"Agricultural reference data from ICAR, UAS Bengaluru, and Government of India"},kn:{t:"ರೈತ ಮಿತ್ರ",s:"ಕರ್ನಾಟಕ ರೈತ ಕೇಂದ್ರ",dash:"ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",crops:"ಬೆಳೆ ಗ್ರಂಥಾಲಯ",pests:"ಕೀಟ ಮತ್ತು ರೋಗ",schemes:"ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",calendar:"ಬೆಳೆ ಕ್ಯಾಲೆಂಡರ್",help:"ಸಹಾಯ",mkt:"ಮಾರುಕಟ್ಟೆ ದರ",map:"APMC ನಕ್ಷೆ",search:"ಬೆಳೆ, ಕೀಟ ಹುಡುಕಿ...",sourceRef:"ಕೃಷಿ ಉಲ್ಲೇಖ ಮಾಹಿತಿ: ICAR, UAS ಬೆಂಗಳೂರು, ಭಾರತ ಸರ್ಕಾರ"}};

function RR(e,k,g){return g==="en"?e:g==="kn"?k:e+" | "+k}

export default function FarmerHub(){
var n=useNavigate();
var[l,sl]=useState(function(){try{return localStorage.getItem("nk_lang")||"bi"}catch{return"bi"}});
useEffect(function(){var h=function(e){sl(e.detail)};window.addEventListener("langchange",h);return function(){window.removeEventListener("langchange",h)}},[]);
var L=l==="kn"?"kn":"en";
var[tab,st]=useState("dash");
var[selCrop,ssc]=useState(null);

var cm=useMemo(function(){return CA[new Date().getMonth()]},[]);

function CropDetail(p){
var c=p.crop;
return(<div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border"><div className="flex items-center justify-between mb-3"><h2 className="text-lg font-bold">🌱 {RR(c.n,c.kn,L)} <span className="text-xs text-gray-400 italic">({c.sci})</span></h2><button onClick={function(){ssc(null)}} className="text-xs text-gray-400">✕ {RR("Back","ಹಿಂದೆ",L)}</button></div><div className="space-y-2">{Fields.map(function(f){var val=c[f.id];if(!val)return null;return(<div key={f.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3"><p className="text-xs font-semibold text-gray-400 mb-1">{f.e} {RR(f.en,f.kn,L)}</p><p className="text-xs">{RR(val,val,L)}</p></div>)})}</div><p className="text-[10px] text-gray-400 mt-2">Source: {c.src}</p></div>)}

function PestDetail(p){
var c=p.crop;var pr=PE.filter(function(x){return x.cid===c.id});
if(pr.length===0)return(<div className="bg-white rounded-xl p-8 text-center shadow-sm border"><p>{RR("No pest data.","ಕೀಟ ಮಾಹಿತಿ ಇಲ್ಲ.",L)}</p></div>);
return(<div className="space-y-3">{pr.map(function(prr){return prr.pests.map(function(pst,i){return(<div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border"><h3 className="text-sm font-bold mb-3">🐛 {RR(pst.n,pst.kn,L)} <span className="text-[10px] text-gray-400 font-normal">({RR(c.n,c.kn,L)})</span></h3><div className="space-y-2">{[["sy","⚠️ Symptoms","ಲಕ್ಷಣ"],["pr","🛡️ Prevention","ತಡೆ"],["or","🌿 Organic","ಸಾವಯವ"],["ch","🧪 Chemical","ರಾಸಾಯನಿಕ"]].map(function(f){if(!pst[f[0]])return null;return(<div key={f[0]} className="bg-gray-50 rounded-lg p-2.5"><p className="text-[10px] font-semibold text-gray-400 mb-0.5">{f[1]}</p><p className="text-xs">{RR(pst[f[0]],pst[f[0]],L)}</p></div>)})}</div></div>)})})}</div>)}

function SchemesList(){
return(<div className="space-y-2">{SC.map(function(s){return(<details key={s.n} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700"><summary className="p-4 cursor-pointer flex items-center justify-between"><div className="flex-1"><p className="text-sm font-semibold">📋 {RR(s.n,s.kn,L)}</p><p className="text-xs text-green-600 mt-0.5">{RR(s.b,s.b,L)}</p></div><span className="text-gray-400 text-xs">▼</span></summary><div className="px-4 pb-4 space-y-2"><div className="bg-gray-50 rounded-lg p-2.5"><p className="text-[10px] font-semibold text-gray-400 mb-0.5">✅ {RR("Eligibility","ಅರ್ಹತೆ",L)}</p><p className="text-xs">{RR(s.e,s.e,L)}</p></div><div className="bg-gray-50 rounded-lg p-2.5"><p className="text-[10px] font-semibold text-gray-400 mb-0.5">📝 {RR("How to Apply","ಅರ್ಜಿ",L)}</p><p className="text-xs">{RR(s.h,s.h,L)}</p></div><a href={s.u} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-xs text-green-600 mt-2">Official Website</a></div></details>)})}</div>)}

function CalendarList(){
return(<div className="space-y-2">{CA.map(function(c,i){var active=c.m===cm.m;return(<details key={i} className={"rounded-xl shadow-sm border dark:border-gray-700 "+(active?"bg-green-50 dark:bg-green-900/20 border-green-300":"bg-white dark:bg-gray-800")} open={active}><summary className="p-4 cursor-pointer flex items-center justify-between"><div><p className="text-sm font-semibold">{active?"📍 ":""}{RR(c.n,c.kn,L)}</p><p className="text-xs text-gray-500 mt-0.5">{RR(c.a,c.a,L)}</p></div><span className="text-xs ml-2">{active?"✅":"▼"}</span></summary></details>)})}</div>)}

function HelpList(){
return(<div className="space-y-2">{HP.map(function(h,i){return(<div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border"><div className="flex items-start gap-3"><span className="text-xl">📞</span><div className="flex-1"><p className="text-sm font-bold">{RR(h.n,h.kn,L)}</p><p className="text-xs text-gray-500 mt-0.5">{RR(h.d,h.d,L)}</p><div className="flex gap-3 mt-2"><a href={"tel:"+h.p} className="text-xs font-bold text-green-600">📞 {h.p}</a>{h.u&&<a href={h.u} target="_blank" rel="noopener" className="text-xs text-green-600">Web</a>}</div></div></div></div>)})}</div>)}

var tabs=["dash","market","map","crops","pests","schemes","calendar","help"];
var TabIcons={dash:"🏠",market:"💰",map:"📍",crops:"🌱",pests:"🐛",schemes:"📋",calendar:"📅",help:"📞"};

return(<div className="max-w-4xl mx-auto px-4 py-4">
<div className="flex items-center gap-3 mb-3"><button onClick={function(){n("/")}} className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 flex items-center justify-center text-gray-500"><HiArrowLeft size={18}/></button><div className="flex-1"><h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">🌾 {RR(T.en.t,T.kn.t,L)}</h1><p className="text-[10px] text-gray-400">{RR(T.en.s,T.kn.s,L)}</p></div></div>

<div className="flex gap-1 mb-4 overflow-x-auto pb-1">{tabs.filter(function(t){return T.en[t]}).map(function(t){return(<button key={t} onClick={function(){st(t);ssc(null)}} className={"flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium "+(tab===t?"bg-green-600 text-white shadow":"bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border dark:border-gray-700")}>{TabIcons[t]} {RR(T.en[t],T.kn[t],L)}</button>)})}</div>

{tab==="dash"&&(<div className="space-y-4">
<div className="grid grid-cols-2 gap-3">{[{id:"market",title:"💰 Market Prices",sub:"KPrices",desc:"AGMARKNET APMC + COMEX Gold/Silver/Oil",path:"/market-prices",bg:"from-green-500 to-emerald-700",text:"white"},{id:"map",title:"📍 APMC Map",sub:"KMap",desc:"67 verified APMCs across 30 districts with GPS",path:"/apmc-map",bg:"from-blue-500 to-indigo-700",text:"white"},{id:"crops",title:"🌱 Crop Library",sub:"KCrops",desc:"6 Karnataka crops with ICAR-sourced data",path:"",bg:"from-amber-500 to-orange-600",text:"white"},{id:"pests",title:"🐛 Pest Guide",sub:"KPests",desc:"Organic + chemical control recommendations",path:"",bg:"from-red-500 to-rose-600",text:"white"}].map(function(card){return(<button key={card.id} onClick={function(){if(card.path)return n(card.path);st(card.id)}} className={"bg-gradient-to-br "+card.bg+" rounded-2xl p-5 text-"+card.text+" shadow-lg text-left"}><p className="text-2xl mb-1">{card.title.split(" ")[0]}</p><p className="text-sm font-bold">{card.title}</p><p className="text-[10px] opacity-70 mt-1">{card.desc}</p></button>)})}</div>
{cm&&<div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200"><p className="text-sm font-bold text-amber-700">📅 {RR(cm.n,cm.kn,L)}</p><p className="text-xs text-amber-600 mt-1">{RR(cm.a,cm.a,L)}</p></div>}
<div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-200"><p className="text-[10px] text-blue-700">{RR(T.en.sourceRef,T.kn.sourceRef,L)}</p></div>
</div>)}

{tab==="crops"&&(<div className="space-y-3">{selCrop?<CropDetail crop={selCrop}/>:CROPS.map(function(c){return(<button key={c.id} onClick={function(){ssc(c)}} className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700 mb-2 flex items-center gap-3 text-left"><span className="text-2xl">🌱</span><div><p className="text-sm font-bold">{RR(c.n,c.kn,L)}</p><p className="text-[10px] text-gray-400 italic">{c.sci}</p></div></button>)})}</div>)}

{tab==="pests"&&(<div className="space-y-3">{selCrop?<div><PestDetail crop={selCrop}/><button onClick={function(){ssc(null)}} className="w-full py-2 text-xs text-green-600 mt-2">{RR("← Back to crops","← ಬೆಳೆಗಳಿಗೆ",L)}</button></div>:<div><p className="text-xs text-gray-500 mb-3">{RR("Select a crop first.","ಮೊದಲು ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ.",L)}</p>{CROPS.map(function(c){return(<button key={c.id} onClick={function(){ssc(c)}} className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700 mb-2 flex items-center gap-3 text-left"><span className="text-2xl">🌱</span><div><p className="text-sm font-bold">{RR(c.n,c.kn,L)}</p></div></button>)})}</div>}</div>)}

{tab==="schemes"&&<SchemesList/>}
{tab==="calendar"&&<CalendarList/>}
{tab==="help"&&<HelpList/>}
{tab==="market"&&n("/market-prices")}
{tab==="map"&&n("/apmc-map")}
</div>)}
