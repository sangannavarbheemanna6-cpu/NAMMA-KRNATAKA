var T={en:{t:"Government Services",st:"Official Karnataka Government Services",search:"Search services...",cat:"Categories",all:"All",recent:"Recently Used",favorites:"Favorites",favAdd:"Added to favorites",favRem:"Removed from favorites",noMatch:"No services found"},kn:{t:"ಸರ್ಕಾರಿ ಸೇವೆಗಳು",st:"ಕರ್ನಾಟಕ ಸರ್ಕಾರಿ ಸೇವೆಗಳು",search:"ಸೇವೆಗಳನ್ನು ಹುಡುಕಿ...",cat:"ವರ್ಗಗಳು",all:"ಎಲ್ಲಾ",recent:"ಇತ್ತೀಚೆಗೆ ಬಳಸಿದ",favorites:"ಮೆಚ್ಚಿನವು",favAdd:"ಮೆಚ್ಚಿನವುಗಳಿಗೆ ಸೇರಿಸಲಾಗಿದೆ",favRem:"ಮೆಚ್ಚಿನವುಗಳಿಂದ ತೆಗೆಯಲಾಗಿದೆ",noMatch:"ಯಾವುದೇ ಸೇವೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ"}};
var services=[
{id:"sevasindhu",en:"Seva Sindhu",kn:"ಸೇವಾ ಸಿಂಧು",url:"https://sevasindhu.karnataka.gov.in",cat:"citizen",desc:"One-stop portal for government services. Caste, Income, Ration card, Domicile."},
{id:"sakala",en:"Sakala Services",kn:"ಸಕಾಲ ಸೇವೆಗಳು",url:"https://sakala.karnataka.gov.in",cat:"citizen",desc:"Guaranteed delivery of services within stipulated time. Track application."},
{id:"bhoomi",en:"Bhoomi",kn:"ಭೂಮಿ",url:"https://bhoomi.karnataka.gov.in",cat:"land",desc:"Online land records. View RTC, mutation status, land documents."},
{id:"kaveri",en:"Kaveri Online",kn:"ಕಾವೇರಿ ಆನ್ಲೈನ್",url:"https://kaverionline.karnataka.gov.in",cat:"land",desc:"Property registration, stamp duty, encumbrance certificate."},
{id:"nadakacheri",en:"Nadakacheri",kn:"ನಡಕಚೇರಿ",url:"https://nadakacheri.karnataka.gov.in",cat:"citizen",desc:"Caste, income, residence certificates online. Atalji Janasnehi Kendragalu."},
{id:"parihara",en:"Parihara",kn:"ಪರಿಹಾರ",url:"https://parihara.karnataka.gov.in",cat:"citizen",desc:"Online grievance redressal system for citizens of Karnataka."},
{id:"grulakshmi",en:"Gruha Lakshmi",kn:"ಗೃಹ ಲಕ್ಷ್ಮೀ",url:"https://gruhalakshmi.karnataka.gov.in",cat:"citizen",desc:"Monthly Rs 2,000 assistance for women heads of households."},
{id:"gruhajyothi",en:"Gruha Jyothi",kn:"ಗೃಹ ಜ್ಯೋತಿ",url:"https://gruhajyothi.karnataka.gov.in",cat:"power",desc:"Free electricity up to 200 units per month for households."},
{id:"annabhagya",en:"Anna Bhagya",kn:"ಅನ್ನ ಭಾಗ್ಯ",url:"https://ahara.karnataka.gov.in",cat:"citizen",desc:"Free rice distribution for BPL families. 5kg per person per month."},
{id:"yuvanidhi",en:"Yuva Nidhi",kn:"ಯುವ ನಿಧಿ",url:"https://yuvanidhi.karnataka.gov.in",cat:"citizen",desc:"Monthly unemployment allowance for graduates and diploma holders."},
{id:"pmkisan",en:"PM Kisan",kn:"ಪಿಎಂ ಕಿಸಾನ್",url:"https://pmkisan.gov.in",cat:"other",desc:"Rs 6,000/year income support to farmer families. Central scheme."},
{id:"aadhaar",en:"Aadhaar",kn:"ಆಧಾರ್",url:"https://uidai.gov.in",cat:"other",desc:"Update, download Aadhaar. Book appointment at enrolment center."},
{id:"pan",en:"PAN Card",kn:"ಪ್ಯಾನ್ ಕಾರ್ಡ್",url:"https://www.incometax.gov.in/iec/foportal/",cat:"other",desc:"Apply for new PAN, correction, or reprint. Income Tax Department."},
{id:"passport",en:"Passport Seva",kn:"ಪಾಸ್ಪೋರ್ಟ್ ಸೇವಾ",url:"https://www.passportindia.gov.in",cat:"other",desc:"Apply for passport, renewal, police verification. Online appointment."},
{id:"voter",en:"Voter Services",kn:"ಮತದಾರ ಸೇವೆಗಳು",url:"https://voters.eci.gov.in",cat:"other",desc:"Register to vote, check EPIC status, correction. Election Commission."},
{id:"driving",en:"Driving Licence",kn:"ಚಾಲನಾ ಪರವಾನಗಿ",url:"https://parivahan.gov.in",cat:"cert",desc:"Apply for DL, learner licence, renewal. Online slot booking."},
{id:"vehicle",en:"Vehicle Services",kn:"ವಾಹನ ಸೇವೆಗಳು",url:"https://parivahan.gov.in",cat:"cert",desc:"Vehicle registration, transfer, fitness, tax payment. Vahan portal."},
{id:"bescom",en:"BESCOM",kn:"ಬೆಸ್ಕಾಂ",url:"https://bescom.karnataka.gov.in",cat:"power",desc:"Bangalore Electricity Supply. Bill payment, new connection."},
{id:"hescom",en:"HESCOM",kn:"ಹೆಸ್ಕಾಂ",url:"https://hescom.karnataka.gov.in",cat:"power",desc:"Hubli Electricity Supply. Bill payment, new connection."},
{id:"gescom",en:"GESCOM",kn:"ಗೆಸ್ಕಾಂ",url:"https://gescom.karnataka.gov.in",cat:"power",desc:"Gulbarga Electricity Supply. Bill payment, new connection."},
{id:"cescom",en:"CESCOM",kn:"ಸೆಸ್ಕಾಂ",url:"https://cescom.karnataka.gov.in",cat:"power",desc:"Mysore Electricity Supply. Bill payment, new connection."},
{id:"mescom",en:"MESCOM",kn:"ಮೆಸ್ಕಾಂ",url:"https://mescom.karnataka.gov.in",cat:"power",desc:"Mangalore Electricity Supply. Bill payment, new connection."},
{id:"kpolice",en:"Karnataka Police",kn:"ಕರ್ನಾಟಕ ಪೊಲೀಸ್",url:"https://ksp.karnataka.gov.in",cat:"police",desc:"Online FIR, complaint status, character certificate, lost report."},
{id:"traffic",en:"Traffic Alert",kn:"ಟ್ರಾಫಿಕ್ ಎಚ್ಚರಿಕೆ",url:"/traffic",cat:"police",desc:"Real-time traffic updates, road alerts, and congestion information."}
];
var cats=[
{id:"all",en:"All",kn:"ಎಲ್ಲಾ"},
{id:"citizen",en:"Citizen Services",kn:"ನಾಗರಿಕ ಸೇವೆಗಳು",icon:"🏛️"},
{id:"land",en:"Land & Revenue",kn:"ಭೂಮಿ ಮತ್ತು ಆದಾಯ",icon:"🏠"},
{id:"power",en:"Electricity",kn:"ವಿದ್ಯುತ್",icon:"⚡"},
{id:"police",en:"Police & Law",kn:"ಪೊಲೀಸ್ ಮತ್ತು ಕಾನೂನು",icon:"👮"},
{id:"cert",en:"Documents",kn:"ದಾಖಲೆಗಳು",icon:"📄"},
{id:"other",en:"Central Govt",kn:"ಕೇಂದ್ರ ಸರ್ಕಾರ",icon:"🏢"}
];
export{T,services,cats};