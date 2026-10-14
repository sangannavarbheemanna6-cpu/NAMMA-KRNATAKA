import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
const GROUPS = [
  {
    id: "fuel",
    icon: "⛽",
    kn: "ಪೆಟ್ರೋಲ್ ಮತ್ತು ಇಂಧನ",
    en: "Fuel & Energy",
    items: [
      ["Petrol", "ಪೆಟ್ರೋಲ್", "₹/ಲೀಟರ್"],
      ["Diesel", "ಡೀಸೆಲ್", "₹/ಲೀಟರ್"],
      ["CNG", "CNG", "₹/ಕೆ.ಜಿ."],
      ["LPG cylinder", "ಅಡುಗೆ ಅನಿಲ ಸಿಲಿಂಡರ್", "₹/ಸಿಲಿಂಡರ್"],
      ["Electricity", "ವಿದ್ಯುತ್ ದರ", "ದರದ ಸ್ಲ್ಯಾಬ್ ಪ್ರಕಾರ"],
    ],
    source: "https://ppac.gov.in/prices/petroleum-prices-and-under-recoveries",
    sourceName: "PPAC — Government of India",
  },
  {
    id: "metals",
    icon: "🪙",
    kn: "ಚಿನ್ನ ಮತ್ತು ಬೆಳ್ಳಿ",
    en: "Gold & Silver",
    items: [
      ["24K Gold", "24 ಕ್ಯಾರೆಟ್ ಚಿನ್ನ", "₹/ಗ್ರಾಂ"],
      ["22K Gold", "22 ಕ್ಯಾರೆಟ್ ಚಿನ್ನ", "₹/ಗ್ರಾಂ"],
      ["18K Gold", "18 ಕ್ಯಾರೆಟ್ ಚಿನ್ನ", "₹/ಗ್ರಾಂ"],
      ["Silver", "ಬೆಳ್ಳಿ", "₹/ಗ್ರಾಂ ಅಥವಾ ₹/ಕೆ.ಜಿ."],
      ["Platinum", "ಪ್ಲಾಟಿನಂ", "₹/ಗ್ರಾಂ"],
    ],
    source: "https://www.ibja.co/",
    sourceName: "India Bullion and Jewellers Association",
  },
  {
    id: "vegetables",
    icon: "🥦",
    kn: "ತರಕಾರಿಗಳು",
    en: "Vegetables",
    items: [
      ["Tomato", "ಟೊಮೇಟೊ", "₹/ಕೆ.ಜಿ."],
      ["Onion", "ಈರುಳ್ಳಿ", "₹/ಕೆ.ಜಿ."],
      ["Potato", "ಆಲೂಗಡ್ಡೆ", "₹/ಕೆ.ಜಿ."],
      ["Green chilli", "ಹಸಿಮೆಣಸಿನಕಾಯಿ", "₹/ಕೆ.ಜಿ."],
      ["Beans", "ಬೀನ್ಸ್", "₹/ಕೆ.ಜಿ."],
      ["Carrot", "ಕ್ಯಾರೆಟ್", "₹/ಕೆ.ಜಿ."],
      ["Cabbage", "ಎಲೆಕೋಸು", "₹/ಕೆ.ಜಿ."],
      ["Cauliflower", "ಹೂಕೋಸು", "₹/ಕೆ.ಜಿ."],
      ["Brinjal", "ಬದನೆಕಾಯಿ", "₹/ಕೆ.ಜಿ."],
      ["Okra", "ಬೆಂಡೆಕಾಯಿ", "₹/ಕೆ.ಜಿ."],
      ["Cucumber", "ಸೌತೆಕಾಯಿ", "₹/ಕೆ.ಜಿ."],
      ["Garlic", "ಬೆಳ್ಳುಳ್ಳಿ", "₹/ಕೆ.ಜಿ."],
      ["Ginger", "ಶುಂಠಿ", "₹/ಕೆ.ಜಿ."],
      ["Drumstick", "ನುಗ್ಗೆಕಾಯಿ", "₹/ಕೆ.ಜಿ."],
      ["Pumpkin", "ಕುಂಬಳಕಾಯಿ", "₹/ಕೆ.ಜಿ."],
      ["Leafy vegetables", "ಸೊಪ್ಪುಗಳು", "ಮಾರುಕಟ್ಟೆಯ ಪ್ರಕಾರ"],
    ],
    source: "https://fcainfoweb.nic.in/",
    sourceName: "Department of Consumer Affairs",
  },
  {
    id: "fruits",
    icon: "🍎",
    kn: "ಹಣ್ಣುಗಳು",
    en: "Fruits",
    items: [
      ["Banana", "ಬಾಳೆಹಣ್ಣು", "₹/ಕೆ.ಜಿ."],
      ["Apple", "ಸೇಬು", "₹/ಕೆ.ಜಿ."],
      ["Mango", "ಮಾವಿನಹಣ್ಣು", "₹/ಕೆ.ಜಿ."],
      ["Orange", "ಕಿತ್ತಳೆ", "₹/ಕೆ.ಜಿ."],
      ["Grapes", "ದ್ರಾಕ್ಷಿ", "₹/ಕೆ.ಜಿ."],
      ["Pomegranate", "ದಾಳಿಂಬೆ", "₹/ಕೆ.ಜಿ."],
      ["Papaya", "ಪಪ್ಪಾಯಿ", "₹/ಕೆ.ಜಿ."],
      ["Watermelon", "ಕಲ್ಲಂಗಡಿ", "₹/ಕೆ.ಜಿ."],
      ["Guava", "ಪೇರಲಹಣ್ಣು", "₹/ಕೆ.ಜಿ."],
      ["Lemon", "ನಿಂಬೆಹಣ್ಣು", "₹/ಕೆ.ಜಿ."],
    ],
    source: "https://fcainfoweb.nic.in/",
    sourceName: "Department of Consumer Affairs",
  },
  {
    id: "farm",
    icon: "🌾",
    kn: "ಕೃಷಿ ಬೆಳೆಗಳು ಮತ್ತು APMC",
    en: "Farm Produce & APMC",
    items: [
      ["Cotton", "ಹತ್ತಿ", "₹/ಕ್ವಿಂಟಾಲ್"],
      ["Maize", "ಮೆಕ್ಕೆಜೋಳ", "₹/ಕ್ವಿಂಟಾಲ್"],
      ["Paddy", "ಭತ್ತ", "₹/ಕ್ವಿಂಟಾಲ್"],
      ["Ragi", "ರಾಗಿ", "₹/ಕ್ವಿಂಟಾಲ್"],
      ["Jowar", "ಜೋಳ", "₹/ಕ್ವಿಂಟಾಲ್"],
      ["Tur / Pigeon pea", "ತೊಗರಿ", "₹/ಕ್ವಿಂಟಾಲ್"],
      ["Groundnut", "ಕಡಲೆಕಾಯಿ", "₹/ಕ್ವಿಂಟಾಲ್"],
      ["Soybean", "ಸೋಯಾಬೀನ್", "₹/ಕ್ವಿಂಟಾಲ್"],
      ["Chickpea", "ಕಡಲೆ", "₹/ಕ್ವಿಂಟಾಲ್"],
      ["Green gram", "ಹೆಸರುಕಾಳು", "₹/ಕ್ವಿಂಟಾಲ್"],
      ["Black gram", "ಉದ್ದು", "₹/ಕ್ವಿಂಟಾಲ್"],
      ["Sunflower", "ಸೂರ್ಯಕಾಂತಿ", "₹/ಕ್ವಿಂಟಾಲ್"],
      ["Sugarcane", "ಕಬ್ಬು", "ದರದ ಪ್ರಕಾರ"],
      ["Chilli", "ಮೆಣಸಿನಕಾಯಿ", "₹/ಕ್ವಿಂಟಾಲ್"],
      ["Coconut", "ತೆಂಗಿನಕಾಯಿ", "ಮಾರುಕಟ್ಟೆಯ ಪ್ರಕಾರ"],
      ["Arecanut", "ಅಡಿಕೆ", "₹/ಕ್ವಿಂಟಾಲ್"],
      ["Onion", "ಈರುಳ್ಳಿ", "₹/ಕ್ವಿಂಟಾಲ್"],
      ["Tomato", "ಟೊಮೇಟೊ", "₹/ಕ್ವಿಂಟಾಲ್"],
    ],
    source: "https://www.enam.gov.in/web/dashboard/agmarknet",
    sourceName: "AGMARKNET / e-NAM",
  },
  {
    id: "groceries",
    icon: "🛒",
    kn: "ದಿನಸಿ ಮತ್ತು ಆಹಾರ ವಸ್ತುಗಳು",
    en: "Groceries & Food",
    items: [
      ["Rice", "ಅಕ್ಕಿ", "₹/ಕೆ.ಜಿ."],
      ["Wheat", "ಗೋಧಿ", "₹/ಕೆ.ಜಿ."],
      ["Ragi flour", "ರಾಗಿ ಹಿಟ್ಟು", "₹/ಕೆ.ಜಿ."],
      ["Toor dal", "ತೊಗರಿಬೇಳೆ", "₹/ಕೆ.ಜಿ."],
      ["Urad dal", "ಉದ್ದಿನಬೇಳೆ", "₹/ಕೆ.ಜಿ."],
      ["Moong dal", "ಹೆಸರುಬೇಳೆ", "₹/ಕೆ.ಜಿ."],
      ["Chana dal", "ಕಡಲೆಬೇಳೆ", "₹/ಕೆ.ಜಿ."],
      ["Sugar", "ಸಕ್ಕರೆ", "₹/ಕೆ.ಜಿ."],
      ["Jaggery", "ಬೆಲ್ಲ", "₹/ಕೆ.ಜಿ."],
      ["Salt", "ಉಪ್ಪು", "₹/ಕೆ.ಜಿ."],
      ["Milk", "ಹಾಲು", "₹/ಲೀಟರ್"],
      ["Eggs", "ಮೊಟ್ಟೆ", "₹/ಮೊಟ್ಟೆ ಅಥವಾ ಡಜನ್"],
      ["Groundnut oil", "ಕಡಲೆಕಾಯಿ ಎಣ್ಣೆ", "₹/ಲೀಟರ್"],
      ["Sunflower oil", "ಸೂರ್ಯಕಾಂತಿ ಎಣ್ಣೆ", "₹/ಲೀಟರ್"],
      ["Palm oil", "ಪಾಮ್ ಎಣ್ಣೆ", "₹/ಲೀಟರ್"],
      ["Tea", "ಚಹಾ ಪುಡಿ", "₹/ಕೆ.ಜಿ."],
      ["Coffee", "ಕಾಫಿ ಪುಡಿ", "₹/ಕೆ.ಜಿ."],
      ["Turmeric", "ಅರಿಶಿನ", "₹/ಕೆ.ಜಿ."],
      ["Coriander", "ಕೊತ್ತಂಬರಿ ಬೀಜ", "₹/ಕೆ.ಜಿ."],
      ["Black pepper", "ಕಾಳುಮೆಣಸು", "₹/ಕೆ.ಜಿ."],
    ],
    source: "https://fcainfoweb.nic.in/",
    sourceName: "Department of Consumer Affairs",
  },
  {
    id: "farm-inputs",
    icon: "🌱",
    kn: "ಬೀಜ, ಗೊಬ್ಬರ ಮತ್ತು ಕೃಷಿ ಸಾಮಗ್ರಿ",
    en: "Seeds, Fertilizers & Farm Inputs",
    items: [
      ["Urea", "ಯೂರಿಯಾ", "₹/ಚೀಲ"],
      ["DAP", "DAP ಗೊಬ್ಬರ", "₹/ಚೀಲ"],
      ["MOP", "MOP ಗೊಬ್ಬರ", "₹/ಚೀಲ"],
      ["NPK fertilizers", "NPK ಗೊಬ್ಬರ", "₹/ಚೀಲ"],
      ["Cotton seeds", "ಹತ್ತಿ ಬೀಜ", "ಪ್ಯಾಕ್ ಪ್ರಕಾರ"],
      ["Maize seeds", "ಮೆಕ್ಕೆಜೋಳ ಬೀಜ", "ಪ್ಯಾಕ್ ಪ್ರಕಾರ"],
      ["Paddy seeds", "ಭತ್ತದ ಬೀಜ", "₹/ಕೆ.ಜಿ. ಅಥವಾ ಪ್ಯಾಕ್"],
      ["Pesticides", "ಕೀಟನಾಶಕ", "ಉತ್ಪನ್ನದ ಪ್ರಕಾರ"],
      ["Herbicides", "ಕಳೆನಾಶಕ", "ಉತ್ಪನ್ನದ ಪ್ರಕಾರ"],
      ["Fungicides", "ಶಿಲೀಂಧ್ರನಾಶಕ", "ಉತ್ಪನ್ನದ ಪ್ರಕಾರ"],
    ],
    source: "https://agmarknet.gov.in/",
    sourceName: "Government agricultural market portal",
  },
  {
    id: "construction",
    icon: "🏗️",
    kn: "ನಿರ್ಮಾಣ ಸಾಮಗ್ರಿಗಳು",
    en: "Construction Materials",
    items: [
      ["Cement", "ಸಿಮೆಂಟ್", "₹/ಚೀಲ"],
      ["Steel / TMT bars", "ಕಬ್ಬಿಣದ ಸರಳು", "₹/ಟನ್"],
      ["Sand", "ಮರಳು", "ಸ್ಥಳೀಯ ಘಟಕದ ಪ್ರಕಾರ"],
      ["Bricks", "ಇಟ್ಟಿಗೆ", "₹/ಸಾವಿರ ಅಥವಾ ಸಂಖ್ಯೆ"],
      ["Stone aggregate", "ಜಲ್ಲಿ", "₹/ಟನ್ ಅಥವಾ ಲೋಡ್"],
      ["Ready-mix concrete", "ರೆಡಿ ಮಿಕ್ಸ್ ಕಾಂಕ್ರೀಟ್", "ಗ್ರೇಡ್ ಪ್ರಕಾರ"],
    ],
    source: "https://www.mospi.gov.in/",
    sourceName: "MoSPI — price statistics",
  },
  {
    id: "currency",
    icon: "💱",
    kn: "ಕರೆನ್ಸಿ ವಿನಿಮಯ",
    en: "Currency Exchange",
    items: [
      ["USD / INR", "ಅಮೆರಿಕನ್ ಡಾಲರ್ / ರೂಪಾಯಿ", "₹/USD"],
      ["EUR / INR", "ಯೂರೋ / ರೂಪಾಯಿ", "₹/EUR"],
      ["GBP / INR", "ಬ್ರಿಟಿಷ್ ಪೌಂಡ್ / ರೂಪಾಯಿ", "₹/GBP"],
      ["AED / INR", "UAE ದಿರ್ಹಮ್ / ರೂಪಾಯಿ", "₹/AED"],
      ["SAR / INR", "ಸೌದಿ ರಿಯಾಲ್ / ರೂಪಾಯಿ", "₹/SAR"],
      ["JPY / INR", "ಜಪಾನೀಸ್ ಯೆನ್ / ರೂಪಾಯಿ", "₹/JPY"],
    ],
    source: "https://www.rbi.org.in/",
    sourceName: "Reserve Bank of India",
  },
  {
    id: "markets",
    icon: "📈",
    kn: "ಷೇರು ಮತ್ತು ಇತರ ಮಾರುಕಟ್ಟೆಗಳು",
    en: "Stocks & Other Markets",
    items: [
      ["NIFTY 50", "ನಿಫ್ಟಿ 50", "ಸೂಚ್ಯಂಕ ಅಂಕಗಳು"],
      ["SENSEX", "ಸೆನ್ಸೆಕ್ಸ್", "ಸೂಚ್ಯಂಕ ಅಂಕಗಳು"],
      ["NSE shares", "NSE ಷೇರುಗಳು", "₹/ಷೇರು"],
      ["BSE shares", "BSE ಷೇರುಗಳು", "₹/ಷೇರು"],
      ["Crude oil", "ಕಚ್ಚಾ ತೈಲ", "ಒಪ್ಪಂದದ ಘಟಕದ ಪ್ರಕಾರ"],
      ["Natural gas", "ನೈಸರ್ಗಿಕ ಅನಿಲ", "ಒಪ್ಪಂದದ ಘಟಕದ ಪ್ರಕಾರ"],
    ],
    source: "https://www.nseindia.com/",
    sourceName: "National Stock Exchange",
  },
];
export default function MarketPrices() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("kn");
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const t = (kn, en) => (lang === "kn" ? kn : en);
  const visibleGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GROUPS
      .filter((group) => active === "all" || group.id === active)
      .map((group) => ({
        ...group,
        items: group.items.filter(([en, kn]) =>
          !q ||
          en.toLowerCase().includes(q) ||
          kn.toLowerCase().includes(q)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [active, query]);
  return (
    <main className="mp-page">
      <style>{`
        .mp-page{min-height:100vh;background:#f4f7fb;color:#182235;padding:16px;padding-bottom:40px;font-family:system-ui,-apple-system,sans-serif}
        .mp-top{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:16px}
        .mp-btn{border:1px solid #d9e1eb;border-radius:12px;background:#fff;color:#182235;padding:10px 14px;font-weight:700;cursor:pointer}
        .mp-hero{background:linear-gradient(135deg,#075e46,#12815d);border-radius:20px;padding:22px;color:#fff;margin-bottom:18px}
        .mp-hero h1{font-size:26px;margin:8px 0}
        .mp-hero p{margin:5px 0;line-height:1.5}
        .mp-search{width:100%;box-sizing:border-box;border:1px solid #d9e1eb;border-radius:13px;padding:14px;background:white;color:#182235;font-size:16px;margin-bottom:14px}
        .mp-tabs{display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;margin-bottom:8px}
        .mp-tabs button{white-space:nowrap;border:1px solid #d9e1eb;border-radius:999px;padding:10px 13px;background:white;color:#263449;cursor:pointer}
        .mp-tabs button.active{background:#075e46;color:white;border-color:#075e46}
        .mp-info{background:#fff8e7;border:1px solid #f0dfb0;border-radius:12px;padding:12px;margin:8px 0 18px;font-size:13px;line-height:1.6}
        .mp-section{margin:22px 0}
        .mp-section h2{font-size:19px;margin:0 0 12px}
        .mp-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
        .mp-card{background:white;border:1px solid #e0e6ef;border-radius:15px;padding:15px;min-width:0}
        .mp-card h3{font-size:16px;margin:0 0 6px}
        .mp-card p{font-size:13px;color:#667085;line-height:1.5;margin:5px 0}
        .mp-unit{font-size:12px;color:#667085;margin-top:8px}
        .mp-link{display:inline-block;color:#08704e;font-weight:700;text-decoration:none;margin-top:12px}
        .mp-footer{font-size:12px;color:#667085;line-height:1.6;margin-top:22px}
        @media(prefers-color-scheme:dark){.mp-page{background:#111827;color:#f3f4f6}.mp-btn,.mp-search,.mp-tabs button,.mp-card{background:#1f2937;color:#f3f4f6;border-color:#374151}.mp-tabs button.active{background:#087653}.mp-card p,.mp-unit,.mp-footer{color:#c1c9d6}.mp-info{background:#382f1b;border-color:#655020}}
      `}</style>
      <div className="mp-top">
        <button className="mp-btn" onClick={() => navigate(-1)} type="button">
          ← {t("ಹಿಂದಕ್ಕೆ", "Back")}
        </button>
        <button
          className="mp-btn"
          onClick={() => setLang((v) => v === "kn" ? "en" : "kn")}
          type="button"
        >
          {lang === "kn" ? "English" : "ಕನ್ನಡ"}
        </button>
      </div>
      <header className="mp-hero">
        <p>NAMMA KARNATAKA · ನಮ್ಮ ಕರ್ನಾಟಕ</p>
        <h1>{t("ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು", "Market Prices")}</h1>
        <p>
          {t(
            "ಇಂಧನದಿಂದ ಕೃಷಿ ಬೆಳೆಗಳವರೆಗೆ — ವಿವಿಧ ಬೆಲೆ ವಿಭಾಗಗಳನ್ನು ಒಂದೇ ಕಡೆ ನೋಡಿ.",
            "Explore available price categories, from fuel to farm produce, in one place."
          )}
        </p>
      </header>
      <input
        className="mp-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("ಬೆಲೆ ಅಥವಾ ವಸ್ತುವನ್ನು ಹುಡುಕಿ…", "Search any item or price…")}
        aria-label={t("ಬೆಲೆ ಹುಡುಕಿ", "Search prices")}
      />
      <nav className="mp-tabs" aria-label="Price categories">
        <button
          type="button"
          className={active === "all" ? "active" : ""}
          onClick={() => setActive("all")}
        >
          📊 {t("ಎಲ್ಲಾ", "All")}
        </button>
        {GROUPS.map((group) => (
          <button
            type="button"
            key={group.id}
            className={active === group.id ? "active" : ""}
            onClick={() => setActive(group.id)}
          >
            {group.icon} {t(group.kn, group.en)}
          </button>
        ))}
      </nav>
      <div className="mp-info">
        {t(
          "ಮುಖ್ಯ ಸೂಚನೆ: ಇದು ಬೆಲೆ ವಿಭಾಗಗಳ ಸಮಗ್ರ ಪಟ್ಟಿ. ಪ್ರತಿಯೊಂದು ವಸ್ತುವಿಗೂ ನಗರವಾರು ನೈಜ ದರ ಪಡೆಯಲು ಪ್ರತ್ಯೇಕ ವಿಶ್ವಾಸಾರ್ಹ ಡೇಟಾ ಮೂಲ ಅಗತ್ಯ. API ಸಂಪರ್ಕವಿಲ್ಲದ ಕಾರಣ ಇಲ್ಲಿ ಕಲ್ಪಿತ ಬೆಲೆಗಳನ್ನು ತೋರಿಸಲಾಗುವುದಿಲ್ಲ. ಮೂಲದ ಲಿಂಕ್ ತೆರೆಯಿರಿ.",
          "Important: This is a broad price-category directory. Live local rates require a reliable data feed for each category. No sample prices are invented here; use the source link for verified data."
        )}
      </div>
      {visibleGroups.map((group) => (
        <section className="mp-section" key={group.id}>
          <h2>{group.icon} {t(group.kn, group.en)}</h2>
          <div className="mp-grid">
            {group.items.map(([en, kn, unit]) => (
              <article className="mp-card" key={en}>
                <h3>{t(kn, en)}</h3>
                <p>{t("ದರದ ಘಟಕ", "Price unit")}: {unit}</p>
                <p>
                  {t(
                    "ನೈಜ ದರಕ್ಕಾಗಿ ಸಂಬಂಧಿಸಿದ ಮೂಲವನ್ನು ಪರಿಶೀಲಿಸಿ.",
                    "Check the linked source for verified prices."
                  )}
                </p>
                <a
                  className="mp-link"
                  href={group.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("ಮೂಲ ತೆರೆಯಿರಿ ↗", "Open source ↗")}
                </a>
              </article>
            ))}
          </div>
          <p className="mp-footer">
            {t("ಮೂಲ:", "Source:")} {group.sourceName}
          </p>
        </section>
      ))}
      {visibleGroups.length === 0 && (
        <p>{t("ಹೊಂದುವ ವಸ್ತು ಸಿಗಲಿಲ್ಲ.", "No matching items found.")}</p>
      )}
      <button
        className="mp-btn"
        type="button"
        onClick={() => {
          setQuery("");
          setActive("all");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        ↑ {t("ಮೇಲಕ್ಕೆ ಹೋಗಿ", "Back to top")}
      </button>
      <p className="mp-footer">
        {t(
          "ದರಗಳು ಸ್ಥಳ, ಗುಣಮಟ್ಟ, ಮಾರುಕಟ್ಟೆ ಮತ್ತು ದಿನಾಂಕದಂತೆ ಬದಲಾಗುತ್ತವೆ. ನೈಜ ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲದಿದ್ದರೆ ಅದನ್ನು ಪರಿಶೀಲಿಸದೆ ಬಳಸಬೇಡಿ.",
          "Prices vary by location, quality, market and date. Verify current data before making financial or purchasing decisions."
        )}
      </p>
    </main>
  );
}
