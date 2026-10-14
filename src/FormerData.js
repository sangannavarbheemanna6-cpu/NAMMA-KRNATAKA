
const API_BASE = "https://api.agmarknet.gov.in/v1";

export const AGMARKNET_SOURCE_URL =
  "https://agmarknet.gov.in/home";

export const GROUPS = [
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

export const MARKET_CROP_FILTERS = [
  { id: "all", kn: "ಎಲ್ಲ ಬೆಳೆಗಳು", en: "All crops" },
  { id: "cotton", kn: "ಹತ್ತಿ", en: "Cotton" },
  { id: "maize", kn: "ಮೆಕ್ಕೆಜೋಳ", en: "Maize" },
  { id: "paddy", kn: "ಭತ್ತ", en: "Paddy" },
  { id: "tur", kn: "ತೊಗರಿ", en: "Tur / Pigeon pea" },
  { id: "groundnut", kn: "ಕಡಲೆಕಾಯಿ", en: "Groundnut" },
  { id: "soybean", kn: "ಸೋಯಾಬೀನ್", en: "Soybean" },
  { id: "onion", kn: "ಈರುಳ್ಳಿ", en: "Onion" },
  { id: "tomato", kn: "ಟೊಮೇಟೊ", en: "Tomato" },
  { id: "chilli", kn: "ಮೆಣಸಿನಕಾಯಿ", en: "Chilli" },
];

export const MARKET_CROP_WORDS = {
  cotton: ["cotton", "ಹತ್ತಿ"],
  maize: ["maize", "corn", "ಮೆಕ್ಕೆಜೋಳ"],
  paddy: ["paddy", "rice", "ಭತ್ತ", "ಅಕ್ಕಿ"],
  tur: ["tur", "arhar", "pigeon pea", "red gram", "ತೊಗರಿ"],
  groundnut: ["groundnut", "peanut", "ಕಡಲೆಕಾಯಿ", "ಶೇಂಗಾ"],
  soybean: ["soybean", "soya", "ಸೋಯಾಬೀನ್"],
  onion: ["onion", "ಈರುಳ್ಳಿ"],
  tomato: ["tomato", "ಟೊಮೇಟೊ", "ಟೊಮಾಟೊ"],
  chilli: ["chilli", "chili", "ಮೆಣಸಿನಕಾಯಿ"],
};

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function getDateString(daysAgo = 0) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function findArrays(value, depth = 0) {
  if (depth > 7 || value == null) return [];

  if (Array.isArray(value)) {
    return value.some((item) => item && typeof item === "object")
      ? [value]
      : [];
  }

  if (typeof value !== "object") return [];

  const result = [];

  for (const [key, child] of Object.entries(value)) {
    if (
      ["data", "result", "results", "records", "items", "rows"].includes(
        key.toLowerCase()
      )
    ) {
      result.push(...findArrays(child, depth + 1));
    }
  }

  if (result.length) return result;

  for (const child of Object.values(value)) {
    if (child && typeof child === "object") {
      result.push(...findArrays(child, depth + 1));
    }
  }

  return result;
}

function collectObjects(value, depth = 0, result = []) {
  if (depth > 7 || value == null || typeof value !== "object") {
    return result;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectObjects(item, depth + 1, result));
    return result;
  }

  result.push(value);

  Object.values(value).forEach((child) =>
    collectObjects(child, depth + 1, result)
  );

  return result;
}

function firstValue(object, keys) {
  for (const key of keys) {
    const value = object?.[key];

    if (value !== undefined && value !== null && String(value).trim()) {
      return value;
    }
  }

  return "";
}

function getKarnatakaStateId(payload) {
  const state = collectObjects(payload).find((item) => {
    const name = normalize(
      firstValue(item, ["stateName", "state_name", "name", "state"])
    );

    return name === "karnataka";
  });

  return firstValue(state, [
    "stateId",
    "state_id",
    "id",
    "value",
    "stateCode",
    "state_code",
  ]);
}

function toPriceRow(item, fallbackDate) {
  const crop = firstValue(item, [
    "commodity",
    "commodityName",
    "commodity_name",
    "crop",
    "commodityname",
  ]);

  const market = firstValue(item, [
    "market",
    "marketName",
    "market_name",
    "apmc",
    "mandi",
  ]);

  const district = firstValue(item, [
    "district",
    "districtName",
    "district_name",
  ]);

  const state = firstValue(item, [
    "state",
    "stateName",
    "state_name",
  ]);

  const min = firstValue(item, [
    "min_price",
    "minPrice",
    "minimumPrice",
    "minprice",
  ]);

  const max = firstValue(item, [
    "max_price",
    "maxPrice",
    "maximumPrice",
    "maxprice",
  ]);

  const modal = firstValue(item, [
    "modal_price",
    "modalPrice",
    "modalprice",
    "modal_price_rs",
  ]);

  const date = firstValue(item, [
    "date",
    "arrival_date",
    "price_date",
    "reportedDate",
  ]);

  const validPrice = (value) =>
    value !== "" && Number.isFinite(Number(value)) && Number(value) > 0;

  if (!crop || ![min, max, modal].some(validPrice)) return null;

  return {
    id: [
      crop,
      market,
      district,
      date || fallbackDate,
      modal,
    ].join("-"),
    crop: String(crop),
    market: String(market || district || "Market not specified"),
    district: String(district || ""),
    state: String(state || ""),
    min: validPrice(min) ? Number(min) : null,
    max: validPrice(max) ? Number(max) : null,
    modal: validPrice(modal) ? Number(modal) : null,
    date: String(date || fallbackDate),
    unit: "₹/quintal",
  };
}

export async function fetchKarnatakaMarketPrices({
  signal,
  daysToCheck = 3,
} = {}) {
  const headers = {
    Accept: "application/json, text/plain, */*",
  };

  const stateResponse = await fetch(
    `${API_BASE}/location/state?page=1&search=Karnataka`,
    { signal, headers }
  );

  if (!stateResponse.ok) {
    throw new Error(`AGMARKNET state request failed (${stateResponse.status})`);
  }

  const statePayload = await stateResponse.json();
  const stateId = getKarnatakaStateId(statePayload);

  if (stateId === "" || stateId == null) {
    throw new Error("Karnataka state ID was not found in the API response.");
  }

  const numberOfDays = Math.max(1, Math.min(Number(daysToCheck) || 3, 7));

  for (let daysAgo = 0; daysAgo < numberOfDays; daysAgo += 1) {
    const date = getDateString(daysAgo);

    const url =
      `${API_BASE}/prices-and-arrivals/commodity-wise/daily-report-state` +
      `?date=${encodeURIComponent(date)}` +
      `&stateIds=${encodeURIComponent(String(stateId))}` +
      `&includeExcel=false`;

    const response = await fetch(url, { signal, headers });

    if (!response.ok) {
      throw new Error(`AGMARKNET price request failed (${response.status})`);
    }

    const payload = await response.json();
    const rows = findArrays(payload)
      .flatMap((array) =>
        array.map((item) => toPriceRow(item, date)).filter(Boolean)
      );

    const uniqueRows = new Map();

    for (const row of rows) {
      if (row.state && normalize(row.state) !== "karnataka") continue;

      const key = [
        row.crop,
        row.market,
        row.district,
        row.date,
        row.min,
        row.max,
        row.modal,
      ].join("|");

      if (!uniqueRows.has(key)) uniqueRows.set(key, row);
    }

    if (uniqueRows.size > 0) return [...uniqueRows.values()];
  }

  return [];
}
