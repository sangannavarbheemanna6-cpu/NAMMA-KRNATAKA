import{useState,useEffect}from"react";import{useNavigate}from"react-router-dom";import{HiArrowLeft,HiPhone}from"react-icons/hi";

const CATS=[
{id:"national",en:"National Emergency",kn:"ರಾಷ್ಟ್ರೀಯ ತುರ್ತು",nums:[
{n:"112",d:"Emergency Response Support System",dk:"ತುರ್ತು ಪ್ರತಿಕ್ರಿಯೆ ಬೆಂಬಲ ವ್ಯವಸ್ಥೆ",tel:"112"},
{n:"100",d:"Police",dk:"ಪೊಲೀಸ್",tel:"100"},
{n:"101",d:"Fire Service",dk:"ಅಗ್ನಿಶಾಮಕ ಸೇವೆ",tel:"101"},
{n:"108",d:"Ambulance",dk:"ಆಂಬುಲೆನ್ಸ್",tel:"108"},
{n:"1075",d:"National Health Helpline",dk:"ರಾಷ್ಟ್ರೀಯ ಆರೋಗ್ಯ ಸಹಾಯವಾಣಿ",tel:"1075"}
]},
{id:"women",en:"Women & Children",kn:"ಮಹಿಳೆಯರು & ಮಕ್ಕಳು",nums:[
{n:"1091",d:"Women Helpline",dk:"ಮಹಿಳಾ ಸಹಾಯವಾಣಿ",tel:"1091"},
{n:"1098",d:"Childline India",dk:"ಚೈಲ್ಡ್‌ಲೈನ್ ಇಂಡಿಯಾ",tel:"1098"},
{n:"181",d:"National Women Helpline",dk:"ರಾಷ್ಟ್ರೀಯ ಮಹಿಳಾ ಸಹಾಯವಾಣಿ",tel:"181"},
{n:"10921",d:"Crime Against Women & Children",dk:"ಮಹಿಳೆಯರು ಮತ್ತು ಮಕ್ಕಳ ಮೇಲಿನ ಅಪರಾಧ",tel:"10921"}
]},
{id:"transport",en:"Transport & Utilities",kn:"ಸಾರಿಗೆ & ಉಪಯುಕ್ತತೆಗಳು",nums:[
{n:"139",d:"Railway Enquiry",dk:"ರೈಲ್ವೇ ವಿಚಾರಣೆ",tel:"139"},
{n:"1912",d:"Electricity Complaints",dk:"ವಿದ್ಯುತ್ ದೂರುಗಳು",tel:"1912"},
{n:"1906",d:"LPG Gas Leak / Emergency",dk:"ಎಲ್‌ಪಿಜಿ ಗ್ಯಾಸ್ ಸೋರಿಕೆ / ತುರ್ತು",tel:"1906"},
{n:"1955",d:"BSNL Customer Care",dk:"ಬಿಎಸ್‌ಎನ್‌ಎಲ್ ಗ್ರಾಹಕ ಸೇವೆ",tel:"1955"}
]},
{id:"karnataka",en:"Karnataka Specific",kn:"ಕರ್ನಾಟಕ ನಿರ್ದಿಷ್ಟ",nums:[
{n:"0821-2417117",d:"Mysuru City Police",dk:"ಮೈಸೂರು ನಗರ ಪೊಲೀಸ್",tel:"08212417117"},
{n:"1916",d:"BESCOM (Bengaluru Electricity)",dk:"ಬೆಸ್ಕಾಂ",tel:"1916"},
{n:"1800-425-00199",d:"Karnataka Health Helpline",dk:"ಕರ್ನಾಟಕ ಆರೋಗ್ಯ ಸಹಾಯವಾಣಿ",tel:"180042500199"},
{n:"1902",d:"Blood Bank Information",dk:"ರಕ್ತ ನಿಧಿ ಮಾಹಿತಿ",tel:"1902"},
{n:"1512",d:"Disaster Management / NDMA",dk:"ವಿಪತ್ತು ನಿರ್ವಹಣೆ",tel:"1512"}
]}
];
const T={en:{t:"Emergency Services",dial:"Tap to call",cat:"Categories",sos:"SOS - One Tap Emergency",sosDesc:"Tap the button below to dial 112 - National Emergency Number",sosBtn:"📞 SOS - Call 112"},kn:{t:"ತುರ್ತು ಸೇವೆಗಳು",dial:"ಕರೆ ಮಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ",cat:"ವರ್ಗಗಳು",sos:"SOS - ತಕ್ಷಣದ ತುರ್ತು",sosDesc:"ರಾಷ್ಟ್ರೀಯ ತುರ್ತು ಸಂಖ್ಯೆ 112 ಗೆ ಕರೆ ಮಾಡಲು ಕೆಳಗಿನ ಬಟನ್ ಟ್ಯಾಪ್ ಮಾಡಿ",sosBtn:"📞 SOS - 112 ಕರೆ ಮಾಡಿ"}};

export default function EmergencyServices(){const n=useNavigate();const[l,sl]=useState(()=>{try{return localStorage.getItem("nk_lang")||"bi"}catch{return"bi"}});const R=(en,kn)=>{if(l==="en")return en;if(l==="kn")return kn;return en+" | "+kn};const[ac,sa]=useState("national");useEffect(()=>{const h=e=>sl(e.detail);window.addEventListener("langchange",h);return()=>window.removeEventListener("langchange",h)},[]);

return<div className="max-w-2xl mx-auto px-4 py-4"><div className="flex items-center gap-3 mb-4"><button onClick={()=>n("/")} className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 flex items-center justify-center text-gray-500"><HiArrowLeft size={18}/></button><h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">{R(T.en.t,T.kn.t)}</h1></div>

<a href="tel:112" className="block bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-6 text-white shadow-lg mb-4 hover:shadow-xl transition-shadow"><div className="flex items-center justify-between"><div><h2 className="text-lg font-bold">{R(T.en.sos,T.kn.sos)}</h2><p className="text-red-100 text-xs mt-1">{R(T.en.sosDesc,T.kn.sosDesc)}</p></div><div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm text-center"><div className="text-2xl">📞</div><p className="text-xs font-bold mt-1">112</p></div></div></a>

<div className="flex gap-1.5 mb-4 overflow-x-auto scrollbar-none pb-1">{CATS.map(c=><button key={c.id} onClick={()=>sa(c.id)} className={"flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all "+(ac===c.id?"bg-red-600 text-white shadow":"bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border dark:border-gray-700")}>{R(c.en,c.kn)}</button>)}</div>

<div className="space-y-2">{(CATS.find(c=>c.id===ac)?.nums||[]).map((nu,i)=><a key={i} href={"tel:"+nu.tel} className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700 hover:shadow-md transition-shadow group"><div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0"><HiPhone size={18} className="text-red-600 dark:text-red-400"/></div><div className="flex-1 min-w-0"><p className="text-lg font-bold text-gray-900 dark:text-gray-100">{nu.n}</p><p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{R(nu.d,nu.dk)}</p></div><div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"><HiPhone size={16} className="text-white"/></div></a>)}</div></div>}