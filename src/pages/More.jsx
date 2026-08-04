import{useState,useEffect}from"react";import{useNavigate}from"react-router-dom";import{HiArrowLeft,HiBell,HiShieldCheck,HiInformationCircle,HiStar,HiChip,HiLink}from"react-icons/hi";

const T={en:{t:"More",all:"All Services",quick:"Quick Links",info:"Information",notifications:"Notifications",privacy:"Privacy Policy",terms:"Terms & Conditions",rate:"Rate this App",version:"Version 1.0.0",built:"Built with real data APIs for Karnataka",data:"Data Sources: Open-Meteo, rss2json, data.gov.in, OpenStreetMap, ICAR"},kn:{t:"ಇನ್ನಷ್ಟು",all:"ಎಲ್ಲಾ ಸೇವೆಗಳು",quick:"ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು",info:"ಮಾಹಿತಿ",notifications:"ಅಧಿಸೂಚನೆಗಳು",privacy:"ಗೌಪ್ಯತಾ ನೀತಿ",terms:"ನಿಯಮಗಳು",rate:"ಅಪ್ಲಿಕೇಶನ್ ರೇಟ್ ಮಾಡಿ",version:"ಆವೃತ್ತಿ ೧.೦.೦",built:"ಕರ್ನಾಟಕಕ್ಕಾಗಿ ನೈಜ ಡೇಟಾ APIಗಳೊಂದಿಗೆ ನಿರ್ಮಿಸಲಾಗಿದೆ",data:"ಡೇಟಾ ಮೂಲಗಳು: Open-Meteo, rss2json, data.gov.in, OpenStreetMap, ICAR"}};

var services=[{t:"Weather",k:"ಹವಾಮಾನ",p:"/weather",e:"🌤️"},{t:"Market Prices",k:"ಮಾರುಕಟ್ಟೆ",p:"/market-prices",e:"💰"},{t:"News",k:"ಸುದ್ದಿ",p:"/news",e:"📰"},{t:"Emergency",k:"ತುರ್ತು",p:"/emergency-services",e:"🆘"},{t:"Entertainment",k:"ಮನರಂಜನೆ",p:"/entertainment",e:"🎭"},{t:"Health",k:"ಆರೋಗ್ಯ",p:"/health",e:"❤️"},{t:"Education",k:"ಶಿಕ್ಷಣ",p:"/education",e:"🎓"},{t:"Youth Hub",k:"ಯುವ ಕೇಂದ್ರ",p:"/youth-hub",e:"💡"},{t:"Farmer Hub",k:"ರೈತ ಕೇಂದ್ರ",p:"/farmer-hub",e:"🌾"}];

export default function More(){var n=useNavigate();var s=useState(function(){try{return localStorage.getItem("nk_lang")||"bi"}catch(e){return"bi"}});var l=s[0],sl=s[1];var R=function(en,kn){if(l==="en")return en;if(l==="kn")return kn;return en+" | "+kn};useEffect(function(){var h=function(e){sl(e.detail)};window.addEventListener("langchange",h);return function(){window.removeEventListener("langchange",h)}},[]);

var linkGroups=[{title:R(T.en.all,T.kn.all),items:services},{title:R(T.en.quick,T.kn.quick),items:[{t:"Notifications",k:"ಅಧಿಸೂಚನೆಗಳು",p:"/notifications",e:"🔔"},{t:"Search",k:"ಹುಡುಕಿ",p:"/search",e:"🔍"},{t:"Settings",k:"ಸೆಟ್ಟಿಂಗ್‌ಗಳು",p:"/settings",e:"⚙️"}]},{title:R(T.en.info,T.kn.info),items:[{t:"Privacy Policy",k:"ಗೌಪ್ಯತಾ ನೀತಿ",p:"/privacy",e:"🛡️"},{t:"Terms",k:"ನಿಯಮಗಳು",p:"/terms",e:"📄"}]}];

return{R(T.en.t,T.kn.t)}

{linkGroups.map(function(group,gi){return{group.title}

{group.items.map(function(item,i){return{item.e}{R(item.t,item.k)}})}

})}

{R(T.en.version,T.kn.version)}

{R(T.en.built,T.kn.built)}

{R(T.en.data,T.kn.data)}

}
