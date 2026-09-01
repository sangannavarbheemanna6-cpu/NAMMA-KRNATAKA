export type BilingualText = {
  en: string;
  kn: string;
};

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Market = {
  id: string;
  name: string;
  kn: string;
  city: string;
  district: string;
  coordinates?: Coordinates;
  locationType?: "district-center" | "city-center" | "verified-yard";
  mapQuery: string;
};

export type District = {
  id: string;
  name: string;
  kn: string;
  coordinates: Coordinates;
  markets: Market[];
};

export type PriceItem = {
  id: string;
  name: string;
  kn: string;
};

export type PriceCategory = {
  id: string;
  name: string;
  kn: string;
  items: PriceItem[];
};

export type Scheme = {
  n: string;
  kn: string;
  b: string;
  e: string;
  h: string;
  u: string;
};

export const OFFICIAL_UPDATE =
  "Live prices are shown only when received from an official/verified source. No hard-coded current price is used.";

const districtSeed: Array<Omit<District, "markets">> = [
  ["bagalkot","Bagalkot","ಬಾಗಲಕೋಟೆ",16.1850,75.6960],
  ["ballari","Ballari","ಬಳ್ಳಾರಿ",15.1394,76.9214],
  ["belagavi","Belagavi","ಬೆಳಗಾವಿ",15.8497,74.4977],
  ["bengaluru-rural","Bengaluru Rural","ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ",13.1986,77.7066],
  ["bengaluru-urban","Bengaluru Urban","ಬೆಂಗಳೂರು ನಗರ",12.9716,77.5946],
  ["bidar","Bidar","ಬೀದರ್",17.9104,77.5199],
  ["chamarajanagar","Chamarajanagar","ಚಾಮರಾಜನಗರ",11.9261,76.9437],
  ["chikkaballapur","Chikkaballapur","ಚಿಕ್ಕಬಳ್ಳಾಪುರ",13.4355,77.7315],
  ["chikkamagaluru","Chikkamagaluru","ಚಿಕ್ಕಮಗಳೂರು",13.3153,75.7754],
  ["chitradurga","Chitradurga","ಚಿತ್ರದುರ್ಗ",14.2306,76.3980],
  ["dakshina-kannada","Dakshina Kannada","ದಕ್ಷಿಣ ಕನ್ನಡ",12.8438,75.2479],
  ["davanagere","Davanagere","ದಾವಣಗೆರೆ",14.4644,75.9218],
  ["dharwad","Dharwad","ಧಾರವಾಡ",15.4589,75.0078],
  ["gadag","Gadag","ಗದಗ",15.4315,75.6355],
  ["hassan","Hassan","ಹಾಸನ",13.0068,76.1000],
  ["haveri","Haveri","ಹಾವೇರಿ",14.7951,75.3991],
  ["kalaburagi","Kalaburagi","ಕಲಬುರಗಿ",17.3297,76.8343],
  ["kodagu","Kodagu","ಕೊಡಗು",12.3375,75.8069],
  ["kolar","Kolar","ಕೋಲಾರ",13.1367,78.1290],
  ["koppal","Koppal","ಕೊಪ್ಪಳ",15.3477,76.1548],
  ["mandya","Mandya","ಮಂಡ್ಯ",12.5218,76.8951],
  ["mysuru","Mysuru","ಮೈಸೂರು",12.2958,76.6394],
  ["raichur","Raichur","ರಾಯಚೂರು",16.2120,77.3439],
  ["ramanagara","Ramanagara","ರಾಮನಗರ",12.7150,77.2810],
  ["shivamogga","Shivamogga","ಶಿವಮೊಗ್ಗ",13.9299,75.5681],
  ["tumakuru","Tumakuru","ತುಮಕೂರು",13.3392,77.1010],
  ["udupi","Udupi","ಉಡುಪಿ",13.3409,74.7421],
  ["uttara-kannada","Uttara Kannada","ಉತ್ತರ ಕನ್ನಡ",14.8185,74.1416],
  ["vijayapura","Vijayapura","ವಿಜಯಪುರ",16.8302,75.7100],
  ["vijayanagara","Vijayanagara","ವಿಜಯನಗರ",15.2695,76.3900],
  ["yadgir","Yadgir","ಯಾದಗಿರಿ",16.7700,77.1370],
].map(([id,name,kn,lat,lng]) => ({
  id: id as string,
  name: name as string,
  kn: kn as string,
  coordinates: {
    lat: lat as number,
    lng: lng as number
  }
}));

const marketSeed: Market[] = [
  ["chitradurga","Chitradurga APMC","ಚಿತ್ರದುರ್ಗ ಎಪಿಎಂಸಿ","Chitradurga","Chitradurga"],
  ["challakere","Challakere APMC","ಚಳ್ಳಕೆರೆ ಎಪಿಎಂಸಿ","Challakere","Chitradurga"],
  ["hiriyur","Hiriyur APMC","ಹಿರಿಯೂರು ಎಪಿಎಂಸಿ","Hiriyur","Chitradurga"],
  ["hosadurga","Hosadurga APMC","ಹೊಸದುರ್ಗ ಎಪಿಎಂಸಿ","Hosadurga","Chitradurga"],
  ["holalkere","Holalkere APMC","ಹೊಳಲ್ಕೆರೆ ಎಪಿಎಂಸಿ","Holalkere","Chitradurga"],
  ["rampura","Rampura APMC","ರಾಮಪುರ ಎಪಿಎಂಸಿ","Rampura","Chitradurga"],

  ["mysuru","Mysuru APMC","ಮೈಸೂರು ಎಪಿಎಂಸಿ","Mysuru","Mysuru"],
  ["nanjangud","Nanjangud APMC","ನಂಜನಗೂಡು ಎಪಿಎಂಸಿ","Nanjangud","Mysuru"],
  ["santesaraguru","Santesaraguru APMC","ಸಂತೆಸರಗುರು ಎಪಿಎಂಸಿ","Santesaraguru","Mysuru"],
  ["krnagar","K.R. Nagar APMC","ಕೆ.ಆರ್. ನಗರ ಎಪಿಎಂಸಿ","K.R. Nagar","Mysuru"],
  ["periyapatna","Periyapatna APMC","ಪಿರಿಯಾಪಟ್ಟಣ ಎಪಿಎಂಸಿ","Periyapatna","Mysuru"],
  ["hunsuru","Hunsuru APMC","ಹುಣಸೂರು ಎಪಿಎಂಸಿ","Hunsuru","Mysuru"],
  ["tnarasipura","T. Narasipur APMC","ಟಿ. ನರಸೀಪುರ ಎಪಿಎಂಸಿ","T. Narasipur","Mysuru"],

  ["kolar","Kolar APMC","ಕೋಲಾರ ಎಪಿಎಂಸಿ","Kolar","Kolar"],
  ["bangarpet","Bangarpet APMC","ಬಂಗಾರಪೇಟೆ ಎಪಿಎಂಸಿ","Bangarpet","Kolar"],
  ["malur","Malur APMC","ಮಾಲೂರು ಎಪಿಎಂಸಿ","Malur","Kolar"],
  ["mulbagal","Mulbagal APMC","ಮುಳಬಾಗಿಲು ಎಪಿಎಂಸಿ","Mulbagal","Kolar"],
  ["srinivasapura","Srinivasapura APMC","ಶ್ರೀನಿವಾಸಪುರ ಎಪಿಎಂಸಿ","Srinivasapura","Kolar"],

  ["chikkaballapur","Chikkaballapur APMC","ಚಿಕ್ಕಬಳ್ಳಾಪುರ ಎಪಿಎಂಸಿ","Chikkaballapur","Chikkaballapur"],
  ["chintamani","Chintamani APMC","ಚಿಂತಾಮಣಿ ಎಪಿಎಂಸಿ","Chintamani","Chikkaballapur"],
  ["bagepalli","Bagepalli APMC","ಬಾಗೇಪಲ್ಲಿ ಎಪಿಎಂಸಿ","Bagepalli","Chikkaballapur"],
  ["gowribidanur","Gowribidanur APMC","ಗೌರಿಬಿದನೂರು ಎಪಿಎಂಸಿ","Gowribidanur","Chikkaballapur"],

  ["dharwad","Dharwad APMC","ಧಾರವಾಡ ಎಪಿಎಂಸಿ","Dharwad","Dharwad"],
  ["hubli","Hubli APMC","ಹುಬ್ಬಳ್ಳಿ ಎಪಿಎಂಸಿ","Hubli","Dharwad"],
  ["annigeri","Annigeri APMC","ಅಣ್ಣಿಗೇರಿ ಎಪಿಎಂಸಿ","Annigeri","Dharwad"],
  ["kundagol","Kundagol APMC","ಕುಂದಗೋಳ ಎಪಿಎಂಸಿ","Kundagol","Dharwad"],
  ["kalghatagi","Kalghatagi APMC","ಕಲಘಟಗಿ ಎಪಿಎಂಸಿ","Kalghatagi","Dharwad"],

  ["gangavati","Gangavati APMC","ಗಂಗಾವತಿ ಎಪಿಎಂಸಿ","Gangavati","Koppal"],
  ["koppal","Koppal APMC","ಕೊಪ್ಪಳ ಎಪಿಎಂಸಿ","Koppal","Koppal"],
  ["raichur","Raichur APMC","ರಾಯಚೂರು ಎಪಿಎಂಸಿ","Raichur","Raichur"],

  ["kalaburagi","Kalaburagi APMC","ಕಲಬುರಗಿ ಎಪಿಎಂಸಿ","Kalaburagi","Kalaburagi"],
  ["sedam","Sedam APMC","ಸೇಡಂ ಎಪಿಎಂಸಿ","Sedam","Kalaburagi"],
  ["chittapura","Chittapura APMC","ಚಿತ್ತಾಪುರ ಎಪಿಎಂಸಿ","Chittapura","Kalaburagi"],

  ["bidar","Bidar APMC","ಬೀದರ್ ಎಪಿಎಂಸಿ","Bidar","Bidar"],
  ["humnabad","Humnabad APMC","ಹುಮನಾಬಾದ್ ಎಪಿಎಂಸಿ","Humnabad","Bidar"],
  ["basavakalyana","Basavakalyana APMC","ಬಸವಕಲ್ಯಾಣ ಎಪಿಎಂಸಿ","Basavakalyana","Bidar"],

  ["bailhongal","Bailhongal APMC","ಬೈಲಹೊಂಗಲ ಎಪಿಎಂಸಿ","Bailhongal","Belagavi"],
  ["savadatti","Savadatti APMC","ಸವದತ್ತಿ ಎಪಿಎಂಸಿ","Savadatti","Belagavi"],
  ["belagavi","Belagavi APMC","ಬೆಳಗಾವಿ ಎಪಿಎಂಸಿ","Belagavi","Belagavi"],
  ["gokak","Gokak APMC","ಗೋಕಾಕ ಎಪಿಎಂಸಿ","Gokak","Belagavi"],

  ["mahalingapura","Mahalingapura APMC","ಮಹಾಲಿಂಗಪುರ ಎಪಿಎಂಸಿ","Mahalingapura","Bagalkot"],

  ["mandya","Mandya APMC","ಮಂಡ್ಯ ಎಪಿಎಂಸಿ","Mandya","Mandya"],
  ["maddur","Maddur APMC","ಮದ್ದೂರು ಎಪಿಎಂಸಿ","Maddur","Mandya"],

  ["hassan","Hassan APMC","ಹಾಸನ ಎಪಿಎಂಸಿ","Hassan","Hassan"],

  ["shivamogga","Shivamogga APMC","ಶಿವಮೊಗ್ಗ ಎಪಿಎಂಸಿ","Shivamogga","Shivamogga"],
  ["sagar","Sagar APMC","ಸಾಗರ ಎಪಿಎಂಸಿ","Sagar","Shivamogga"],
  ["thirthahalli","Thirthahalli APMC","ತೀರ್ಥಹಳ್ಳಿ ಎಪಿಎಂಸಿ","Thirthahalli","Shivamogga"],

  ["sirsi","Sirsi APMC","ಶಿರಸಿ ಎಪಿಎಂಸಿ","Sirsi","Uttara Kannada"],
  ["siddapura","Siddapura APMC","ಸಿದ್ದಾಪುರ ಎಪಿಎಂಸಿ","Siddapura","Uttara Kannada"],
  ["yellapura","Yellapura APMC","ಯಲ್ಲಾಪುರ ಎಪಿಎಂಸಿ","Yellapura","Uttara Kannada"],

  ["udupi","Udupi APMC","ಉಡುಪಿ ಎಪಿಎಂಸಿ","Udupi","Udupi"],
  ["mangaluru","Mangaluru APMC","ಮಂಗಳೂರು ಎಪಿಎಂಸಿ","Mangaluru","Dakshina Kannada"],

  ["tumakuru","Tumakuru APMC","ತುಮಕೂರು ಎಪಿಎಂಸಿ","Tumakuru","Tumakuru"],
  ["tiptur","Tiptur APMC","ತಿಪಟೂರು ಎಪಿಎಂಸಿ","Tiptur","Tumakuru"],
  ["turvekere","Turuvekere APMC","ತುರವೇಕೆರೆ ಎಪಿಎಂಸಿ","Turuvekere","Tumakuru"],
  ["chikkanayakanahalli","Chikkanayakanahalli APMC","ಚಿಕ್ಕನಾಯಕನಹಳ್ಳಿ ಎಪಿಎಂಸಿ","Chikkanayakanahalli","Tumakuru"],

  ["nippani","Nippani APMC","ನಿಪ್ಪಾಣಿ ಎಪಿಎಂಸಿ","Nippani","Belagavi"],
  ["sankeshwara","Sankeshwara APMC","ಸಂಕೇಶ್ವರ ಎಪಿಎಂಸಿ","Sankeshwara","Belagavi"]
].map(([id,name,kn,city,district]) => ({
  id: id as string,
  name: name as string,
  kn: kn as string,
  city: city as string,
  district: district as string,
  mapQuery: `${name}, ${city}, Karnataka`
}));

export const DISTRICTS: District[] = districtSeed.map(d => ({
  ...d,
  markets: marketSeed.filter(
    m => m.district.toLowerCase() === d.name.toLowerCase()
  )
}));

const toItem = (x: string): PriceItem => {
  const [name, kn] = x.split("|");

  return {
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name,
    kn
  };
};

export const AGRICULTURE_PRICE_CATEGORIES: PriceCategory[] = [
  {
    id: "cereals",
    name: "Cereals",
    kn: "ಧಾನ್ಯಗಳು",
    items: [
      "Paddy|ಭತ್ತ",
      "Maize|ಮೆಕ್ಕೆಜೋಳ",
      "Wheat|ಗೋಧಿ",
      "Jowar|ಜೋಳ",
      "Bajra|ಸಜ್ಜೆ",
      "Ragi|ರಾಗಿ"
    ].map(toItem)
  },

  {
    id: "pulses",
    name: "Pulses",
    kn: "ಬೇಳೆಕಾಳುಗಳು",
    items: [
      "Tur / Arhar|ತೊಗರಿ",
      "Bengal Gram / Chana|ಕಡಲೆ",
      "Green Gram|ಹೆಸರು",
      "Black Gram|ಉದ್ದು",
      "Horse Gram|ಹುರಳಿ",
      "Cowpea|ಅಲಸಂದೆ"
    ].map(toItem)
  },

  {
    id: "oilseeds",
    name: "Oilseeds",
    kn: "ಎಣ್ಣೆಕಾಳುಗಳು",
    items: [
      "Groundnut|ಕಡಲೆಕಾಯಿ",
      "Sunflower|ಸೂರ್ಯಕಾಂತಿ",
      "Soybean|ಸೋಯಾಬೀನ್",
      "Sesame|ಎಳ್ಳು",
      "Castor|ಹರಳು",
      "Safflower|ಕುಸುಬೆ",
      "Mustard|ಸಾಸಿವೆ"
    ].map(toItem)
  },

  {
    id: "commercial",
    name: "Commercial Crops",
    kn: "ವಾಣಿಜ್ಯ ಬೆಳೆಗಳು",
    items: [
      "Cotton|ಹತ್ತಿ",
      "Sugarcane|ಕಬ್ಬು",
      "Tobacco|ತಂಬಾಕು"
    ].map(toItem)
  },

  {
    id: "vegetables",
    name: "Vegetables",
    kn: "ತರಕಾರಿಗಳು",
    items: [
      "Onion|ಈರುಳ್ಳಿ",
      "Tomato|ಟೊಮೆಟೊ",
      "Potato|ಆಲೂಗಡ್ಡೆ",
      "Chilli|ಮೆಣಸಿನಕಾಯಿ",
      "Brinjal|ಬದನೆಕಾಯಿ",
      "Cabbage|ಎಲೆಕೋಸು",
      "Cauliflower|ಹೂಕೋಸು",
      "Beans|ಬೀನ್ಸ್",
      "Carrot|ಕ್ಯಾರೆಟ್",
      "Drumstick|ನುಗ್ಗೆಕಾಯಿ",
      "Green Peas|ಹಸಿರು ಬಟಾಣಿ"
    ].map(toItem)
  },

  {
    id: "fruits",
    name: "Fruits",
    kn: "ಹಣ್ಣುಗಳು",
    items: [
      "Banana|ಬಾಳೆಹಣ್ಣು",
      "Mango|ಮಾವು",
      "Grapes|ದ್ರಾಕ್ಷಿ",
      "Pomegranate|ದಾಳಿಂಬೆ",
      "Orange|ಕಿತ್ತಳೆ",
      "Papaya|ಪಪ್ಪಾಯಿ",
      "Watermelon|ಕಲ್ಲಂಗಡಿ",
      "Guava|ಪೇರಳೆ"
    ].map(toItem)
  },

  {
    id: "spices",
    name: "Spices",
    kn: "ಮಸಾಲೆ ಬೆಳೆಗಳು",
    items: [
      "Dry Chilli|ಒಣ ಮೆಣಸಿನಕಾಯಿ",
      "Turmeric|ಅರಿಶಿನ",
      "Coriander|ಕೊತ್ತಂಬರಿ",
      "Cumin|ಜೀರಿಗೆ",
      "Ginger|ಶುಂಠಿ",
      "Garlic|ಬೆಳ್ಳುಳ್ಳಿ",
      "Tamarind|ಹುಣಸೆ"
    ].map(toItem)
  },

  {
    id: "plantation",
    name: "Plantation / Farm Produce",
    kn: "ತೋಟದ ಉತ್ಪನ್ನಗಳು",
    items: [
      "Arecanut|ಅಡಿಕೆ",
      "Coconut|ತೆಂಗಿನಕಾಯಿ",
      "Copra|ಕೊಬ್ಬರಿ",
      "Coffee|ಕಾಫಿ",
      "Cardamom|ಏಲಕ್ಕಿ",
      "Pepper|ಕರಿಮೆಣಸು"
    ].map(toItem)
  },

  {
    id: "inputs",
    name: "Seeds & Fertilizers",
    kn: "ಬೀಜ ಮತ್ತು ರಸಗೊಬ್ಬರ",
    items: [
      "Hybrid Maize Seed|ಹೈಬ್ರಿಡ್ ಮೆಕ್ಕೆಜೋಳ ಬೀಜ",
      "Hybrid Castor Seed|ಹೈಬ್ರಿಡ್ ಹರಳು ಬೀಜ",
      "Hybrid Cotton Seed|ಹೈಬ್ರಿಡ್ ಹತ್ತಿ ಬೀಜ",
      "Paddy Seed|ಭತ್ತದ ಬೀಜ",
      "Ragi Seed|ರಾಗಿ ಬೀಜ",
      "Groundnut Seed|ಕಡಲೆಕಾಯಿ ಬೀಜ",
      "Tur Seed|ತೊಗರಿ ಬೀಜ",
      "Urea|ಯೂರಿಯಾ",
      "DAP|ಡಿಎಪಿ",
      "MOP|ಎಂಒಪಿ",
      "NPK|ಎನ್‌ಪಿಕೆ",
      "SSP|ಎಸ್‌ಎಸ್‌ಪಿ"
    ].map(toItem)
  },

  {
    id: "pesticides",
    name: "Pesticides / Crop Protection",
    kn: "ಕೀಟನಾಶಕ / ಬೆಳೆ ರಕ್ಷಣೆ",
    items: [
      "Neem-based products|ಬೇವಿನ ಆಧಾರಿತ ಉತ್ಪನ್ನಗಳು",
      "Insecticides|ಕೀಟನಾಶಕಗಳು",
      "Fungicides|ಶಿಲೀಂಧ್ರನಾಶಕಗಳು",
      "Herbicides|ಕಳೆನಾಶಕಗಳು",
      "Biopesticides|ಜೈವಿಕ ಕೀಟನಾಶಕಗಳು"
    ].map(toItem)
  }
];

export const OTHER_PRICE_CATEGORIES: PriceCategory[] = [
  {
    id: "fuel",
    name: "Fuel",
    kn: "ಇಂಧನ",
    items: [
      "Petrol|ಪೆಟ್ರೋಲ್",
      "Diesel|ಡೀಸೆಲ್",
      "LPG|ಎಲ್‌ಪಿಜಿ"
    ].map(toItem)
  },

  {
    id: "metals",
    name: "Precious Metals",
    kn: "ಬೆಲೆಬಾಳುವ ಲೋಹಗಳು",
    items: [
      "Gold|ಚಿನ್ನ",
      "Silver|ಬೆಳ್ಳಿ"
    ].map(toItem)
  },

  {
    id: "general",
    name: "General Market",
    kn: "ಸಾಮಾನ್ಯ ಮಾರುಕಟ್ಟೆ",
    items: [
      "Cement|ಸಿಮೆಂಟ್",
      "Steel|ಉಕ್ಕು",
      "Cattle Feed|ಜಾನುವಾರು ಆಹಾರ",
      "Milk|ಹಾಲು"
    ].map(toItem)
  }
];

export const FARMER_SCHEMES: Scheme[] = [
  {
    n: "PM Kisan",
    kn: "ಪಿಎಂ ಕಿಸಾನ್",
    b: "₹6,000/year",
    e: "Eligible landholding farmers",
    h: "Apply/check status through official portal.",
    u: "https://pmkisan.gov.in"
  },
  {
    n: "PM Fasal Bima Yojana",
    kn: "ಪಿಎಂ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ",
    b: "Crop insurance",
    e: "Farmers growing notified crops",
    h: "Apply through notified channel before the crop deadline.",
    u: "https://pmfby.gov.in"
  },
  {
    n: "Kisan Credit Card",
    kn: "ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್",
    b: "Farm credit",
    e: "Eligible farmers",
    h: "Contact your bank with required documents.",
    u: "https://www.rbi.org.in"
  },
  {
    n: "Soil Health Card",
    kn: "ಮಣ್ಣು ಆರೋಗ್ಯ ಕಾರ್ಡ್",
    b: "Soil testing & nutrient advice",
    e: "Farmers",
    h: "Use the official Soil Health Card system / local agriculture office.",
    u: "https://soilhealth.dac.gov.in"
  },
  {
    n: "Raitha Mitra / Karnataka Agriculture",
    kn: "ರೈತ ಮಿತ್ರ / ಕರ್ನಾಟಕ ಕೃಷಿ",
    b: "Agriculture services & schemes",
    e: "Karnataka farmers",
    h: "Contact Agriculture Department / Raitha Samparka Kendra.",
    u: "https://raitamitra.karnataka.gov.in"
  }
];

export const PRICE_SOURCES = {
  market: "https://krishimaratavahini.karnataka.gov.in/en",
  sujala: "https://sujala3lri.karnataka.gov.in/Dashboard/Index",
  agmarknet: "https://agmarknet.gov.in/"
};

export const WEATHER_ALERT_TYPES = [
  "Heavy Rain|ಭಾರಿ ಮಳೆ",
  "Strong Wind|ಬಲವಾದ ಗಾಳಿ",
  "Heat Wave|ಬಿಸಿಗಾಳಿ",
  "Cold Wave|ಚಳಿಗಾಳಿ",
  "Thunderstorm|ಗುಡುಗು ಸಹಿತ ಮಳೆ",
  "Crop Advisory|ಬೆಳೆ ಸಲಹೆ"
].map(x => {
  const [en, kn] = x.split("|");
  return { en, kn };
});
