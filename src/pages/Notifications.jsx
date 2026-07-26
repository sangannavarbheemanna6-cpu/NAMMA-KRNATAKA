import{useState,useEffect}from"react";import{useNavigate}from"react-router-dom";import{HiArrowLeft,HiBell,HiTrash,HiBadgeCheck}from"react-icons/hi";

function getHistory(){try{return JSON.parse(localStorage.getItem("nk_notif")||"[]")}catch(e){return[]}}
function saveHistory(h){localStorage.setItem("nk_notif",JSON.stringify(h.slice(0,50)))}

const T={en:{t:"Notifications",enable:"Enable Notifications",enabled:"Notifications Enabled",disabled:"Notifications Disabled",enableDesc:"Allow browser notifications for important updates",noNotif:"No notifications yet",clear:"Clear History",test:"Send Test Notification",testTitle:"Test Notification",testBody:"NAMMA KARNATAKA is working! You will receive alerts here.",sent:"Notification sent!",unsupported:"Notifications not supported in this browser."},kn:{t:"ಅಧಿಸೂಚನೆಗಳು",enable:"ಅಧಿಸೂಚನೆ ಸಕ್ರಿಯಗೊಳಿಸಿ",enabled:"ಅಧಿಸೂಚನೆ ಸಕ್ರಿಯ",disabled:"ಅಧಿಸೂಚನೆ ನಿಷ್ಕ್ರಿಯ",enableDesc:"ಪ್ರಮುಖ ನವೀಕರಣಗಳಿಗಾಗಿ ಬ್ರೌಸರ್ ಅಧಿಸೂಚನೆಗಳನ್ನು ಅನುಮತಿಸಿ",noNotif:"ಯಾವುದೇ ಅಧಿಸೂಚನೆಗಳಿಲ್ಲ",clear:"ಇತಿಹಾಸ ಅಳಿಸಿ",test:"ಪರೀಕ್ಷಾ ಅಧಿಸೂಚನೆ ಕಳುಹಿಸಿ",testTitle:"ಪರೀಕ್ಷಾ ಅಧಿಸೂಚನೆ",testBody:"ನಮ್ಮ ಕರ್ನಾಟಕ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆ!",sent:"ಕಳುಹಿಸಲಾಗಿದೆ!",unsupported:"ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಅಧಿಸೂಚನೆ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ."}};

export default function Notifications(){var n=useNavigate();var s=useState(function(){try{return localStorage.getItem("nk_lang")||"bi"}catch(e){return"bi"}});var l=s[0],sl=s[1];var R=function(en,kn){if(l==="en")return en;if(l==="kn")return kn;return en+" | "+kn};var _en=useState(function(){return Notification&&Notification.permission==="granted"});var enabled=_en[0],sen=_en[1];var _hist=useState(getHistory);var hist=_hist[0],shist=_hist[1];var _sent=useState(false);var sent=_sent[0],ssent=_sent[1];useEffect(function(){var h=function(e){sl(e.detail)};window.addEventListener("langchange",h);return function(){window.removeEventListener("langchange",h)}},[]);

var requestPerm=async function(){if(!("Notification"in window)){alert(R(T.en.unsupported,T.kn.unsupported));return}var perm=await Notification.requestPermission();sen(perm==="granted");if(perm==="granted"){addToHistory(R(T.en.enabled,T.kn.enabled),"success")}};

var addToHistory=function(msg,type){var entry={msg:msg,type:type||"info",time:new Date().toISOString()};var updated=[entry].concat(hist);shist(updated);saveHistory(updated)};

var sendTest=function(){if(!("Notification"in window)||Notification.permission!=="granted"){alert(R(T.en.enableDesc,T.kn.enableDesc));return}var notif=new Notification(R(T.en.testTitle,T.kn.testTitle),{body:R(T.en.testBody,T.kn.testBody),icon:"/icon-192.png"});ssent(true);addToHistory(R(T.en.testBody,T.kn.testBody),"test");setTimeout(function(){ssent(false)},2000)};

var clearHistory=function(){shist([]);saveHistory([])};

return<div className="max-w-2xl mx-auto px-4 py-4"><div className="flex items-center gap-3 mb-4"><button onClick={function(){n("/")}} className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 flex items-center justify-center text-gray-500"><HiArrowLeft size={18}/></button><h1 className="text-lg font-bold text-gray-800 dark:text-gray-100"><HiBell className="inline text-blue-500 mr-1" size={20}/>{R(T.en.t,T.kn.t)}</h1></div>

{enabled?<div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 mb-4 flex items-center gap-3"><HiBadgeCheck className="text-green-600 dark:text-green-400" size={20}/><p className="text-sm font-medium text-green-700 dark:text-green-300">{R(T.en.enabled,T.kn.enabled)}</p></div>:<div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 mb-4"><p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{R(T.en.enableDesc,T.kn.enableDesc)}</p><button onClick={requestPerm} className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><HiBell size={16}/>{R(T.en.enable,T.kn.enable)}</button></div>}

{enabled?<div className="mb-4"><button onClick={sendTest} className="px-4 py-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50">{sent?R(T.en.sent,T.kn.sent):R(T.en.test,T.kn.test)}</button></div>:null}

<div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold text-gray-500 dark:text-gray-400">{R("History","ಇತಿಹಾಸ")}</h3>{hist.length>0?<button onClick={clearHistory} className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1"><HiTrash size={12}/>{R(T.en.clear,T.kn.clear)}</button>:null}</div>

{hist.length===0?<div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border dark:border-gray-700 text-center"><p className="text-sm text-gray-400">{R(T.en.noNotif,T.kn.noNotif)}</p></div>:<div className="space-y-2">{hist.map(function(h,i){return<div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700"><p className="text-sm text-gray-800 dark:text-gray-200">{h.msg}</p><p className="text-[10px] text-gray-400 mt-1">{new Date(h.time).toLocaleString()}</p></div>})}</div>}</div>}
