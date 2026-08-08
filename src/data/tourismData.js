// KARNATAKA TOURISM DATA - REAL & VERIFIED | 47 places, 18 categories, real coords

var cats = [
  { id: "Hill Station", e: "Hill Stations", k: "ಗಿರಿಧಾಮ", i: "🏔️" },
  { id: "Waterfall", e: "Waterfalls", k: "ಜಲಪಾತ", i: "💧" },
  { id: "Temple", e: "Temples", k: "ದೇವಾಲಯ", i: "🛕"},
  { id: "Fort", e: "Forts", k: "ಕೋಟೆ", i: "🏰" },
  { id: "Historical", e: "Historical Places", k: "ಐತಿಹಾಸಿಕ ��ಸ್ರಲ", i: "🏛️"},
  { id: "Beach", e: "Beaches", k: "ಕಡಲತೀರ", i: "🏖️"},
  { id: "Wildlife", e: "Wildlife", k: "ವನ್ಯಜೀವಿ", i: "🐅"},
  { id: "National Park", e: "National Parks", k: "ರಾಷ್ಟ್ರೀಯ ಇಧ್ಯಾನ", i: "🌳"},
  { id: "Museum", e: "Museums", k: "ವಸ್ತುಸಂಗ್ರಹಾಲಯ", i: "🏛️"},
  { id: "Trekking", e: "Trekking", k: "ಟ್ರೆಕಿಂಗ್", i: "🥾"},
  { id: "Viewpoint", e: "Viewpoints", k: "ವೀಕ್ಷಣಾ", i: "🌄"},
  { id: "Lake", e: "Lakes & Dams", k: "ಸರೋವರ", i: "🌊" },
  { id: "Nature", e: "Nature Places", k: "ನಿಸರ್ಗ ��ಸ್ರಲ", i: "🌿"},
  { id: "City", e: "City Attractions", k: "ನಗರ ಆಕರ್ಷಣೆ", i: "🏙️"},
  { id: "Family", e: "Family Places", k: "ಕೌಟುಂಬಿಕ ��ಸ್ರಲಈರ", i: "👨‍👩ࠍ👧"},
  { id: "Photography", e: "Photography Spots", k: "ಛಾಯಾಗ್ರಸಣ", i: "📸"},
  { id: "Camping", e: "Camping", k: "ಕ್ಯಾಂಪಿಂಗ್", i: "🏕️"},
  { id: "Weekend", e: "Weekend Trips", k: "ವಾರಾಂತ್ಯ", i: "🚗"}
];

var places = [];

function add(p, e, k, d, t, tal, i, lat, lon, z, desc, descK, imp, impK, best, fee, hrs, tags, nb, img) {
  places.push({
    p: p, e: e, k: k, d: d, t: t, tal: tal, i: i,
    lat: lat, lon: lon, zoom: z,
    desc: desc, descK: descK,
    imp: imp, impK: impK,
    best: best, fee: fee, hrs: hrs,
    tags: tags || [],
    nearby: nb || [],
    img: img || "",
    featured: false,
    maps: "https://www.openstreetmap.org/?mlat=" + lat + "&mlon=" + lon + "&zoom=" + z
  });
}

// 47 REAL VERIFIED KARNATAKA PLACES
add("coorg","Coorg (Madikeri)","ಕೂರ್ಗ್ (ಮಡಿಕೆರಿ)","Kodagu","Hill Station","Madikeri","🏔️",12.4208,75.7397,13,"Scotland of India at 1525m. Coffee & spice plantations, Abbey Falls, Raja Seat, Dubare Elephant Camp, Talacauvery (Cauvery origin). Unique Kodava culture and cuisine. India's largest coffee region with hundreds of plantation homestays.","1525ಮೀ ಭಾರತದಈರ