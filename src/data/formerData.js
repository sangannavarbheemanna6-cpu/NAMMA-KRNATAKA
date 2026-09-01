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
  name: BilingualText;
  city: BilingualText;
  district: string;
  coordinates?: Coordinates;
  locationType?: "district-center" | "city-center" | "verified-yard";
  mapQuery: string;
};

export type District = {
  id: string;
  name: BilingualText;
  coordinates: Coordinates;
  markets: Market[];
};

export type PriceItem = {
  id: string;
  name: BilingualText;
};

export type PriceCategory = {
  id: string;
  name: BilingualText;
  items: PriceItem[];
};

export type Scheme = {
  id: string;
  name: BilingualText;
  benefit: BilingualText;
  eligibility: BilingualText;
  description: BilingualText;
  url: string;
};

export const OFFICIAL_UPDATE =
  "Live prices are shown only when received from an official/verified source. No hard-coded current price is used.";

/* =========================================================
   KARNATAKA DISTRICTS
========================================================= */

const districtSeed: Array<{
  id: string;
  name: BilingualText;
  coordinates: Coordinates;
}> = [
  {
    id: "bagalkot",
    name: { en: "Bagalkot", kn: "ಬಾಗಲಕೋಟೆ" },
    coordinates: { lat: 16.185, lng: 75.696 }
  },
  {
    id: "ballari",
    name: { en: "Ballari", kn: "ಬಳ್ಳಾರಿ" },
    coordinates: { lat: 15.1394, lng: 76.9214 }
  },
  {
    id: "belagavi",
    name: { en: "Belagavi", kn: "ಬೆಳಗಾವಿ" },
    coordinates: { lat: 15.8497, lng: 74.4977 }
  },
  {
    id: "bengaluru-rural",
    name: { en: "Bengaluru Rural", kn: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ" },
    coordinates: { lat: 13.1986, lng: 77.7066 }
  },
  {
    id: "bengaluru-urban",
    name: { en: "Bengaluru Urban", kn: "ಬೆಂಗಳೂರು ನಗರ" },
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  {
    id: "bidar",
    name: { en: "Bidar", kn: "ಬೀದರ್" },
    coordinates: { lat: 17.9104, lng: 77.5199 }
  },
  {
    id: "chamarajanagar",
    name: { en: "Chamarajanagar", kn: "ಚಾಮರಾಜನಗರ" },
    coordinates: { lat: 11.9261, lng: 76.9437 }
  },
  {
    id: "chikkaballapur",
    name: { en: "Chikkaballapur", kn: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ" },
    coordinates: { lat: 13.4355, lng: 77.7315 }
  },
  {
    id: "chikkamagaluru",
    name: { en: "Chikkamagaluru", kn: "ಚಿಕ್ಕಮಗಳೂರು" },
    coordinates: { lat: 13.3153, lng: 75.7754 }
  },
  {
    id: "chitradurga",
    name: { en: "Chitradurga", kn: "ಚಿತ್ರದುರ್ಗ" },
    coordinates: { lat: 14.2306, lng: 76.398 }
  },
  {
    id: "dakshina-kannada",
    name: { en: "Dakshina Kannada", kn: "ದಕ್ಷಿಣ ಕನ್ನಡ" },
    coordinates: { lat: 12.8438, lng: 75.2479 }
  },
  {
    id: "davanagere",
    name: { en: "Davanagere", kn: "ದಾವಣಗೆರೆ" },
    coordinates: { lat: 14.4644, lng: 75.9218 }
  },
  {
    id: "dharwad",
    name: { en: "Dharwad", kn: "ಧಾರವಾಡ" },
    coordinates: { lat: 15.4589, lng: 75.0078 }
  },
  {
    id: "gadag",
    name: { en: "Gadag", kn: "ಗದಗ" },
    coordinates: { lat: 15.4315, lng: 75.6355 }
  },
  {
    id: "hassan",
    name: { en: "Hassan", kn: "ಹಾಸನ" },
    coordinates: { lat: 13.0068, lng: 76.1 }
  },
  {
    id: "haveri",
    name: { en: "Haveri", kn: "ಹಾವೇರಿ" },
    coordinates: { lat: 14.7951, lng: 75.3991 }
  },
  {
    id: "kalaburagi",
    name: { en: "Kalaburagi", kn: "ಕಲಬುರಗಿ" },
    coordinates: { lat: 17.3297, lng: 76.8343 }
  },
  {
    id: "kodagu",
    name: { en: "Kodagu", kn: "ಕೊಡಗು" },
    coordinates: { lat: 12.3375, lng: 75.8069 }
  },
  {
    id: "kolar",
    name: { en: "Kolar", kn: "ಕೋಲಾರ" },
    coordinates: { lat: 13.1367, lng: 78.129 }
  },
  {
    id: "koppal",
    name: { en: "Koppal", kn: "ಕೊಪ್ಪಳ" },
    coordinates: { lat: 15.3477, lng: 76.1548 }
  },
  {
    id: "mandya",
    name: { en: "Mandya", kn: "ಮಂಡ್ಯ" },
    coordinates: { lat: 12.5218, lng: 76.8951 }
  },
  {
    id: "mysuru",
    name: { en: "Mysuru", kn: "ಮೈಸೂರು" },
    coordinates: { lat: 12.2958, lng: 76.6394 }
  },
  {
    id: "raichur",
    name: { en: "Raichur", kn: "ರಾಯಚೂರು" },
    coordinates: { lat: 16.212, lng: 77.3439 }
  },
  {
    id: "ramanagara",
    name: { en: "Ramanagara", kn: "ರಾಮನಗರ" },
    coordinates: { lat: 12.715, lng: 77.281 }
  },
  {
    id: "shivamogga",
    name: { en: "Shivamogga", kn: "ಶಿವಮೊಗ್ಗ" },
    coordinates: { lat: 13.9299, lng: 75.5681 }
  },
  {
    id: "tumakuru",
    name: { en: "Tumakuru", kn: "ತುಮಕೂರು" },
    coordinates: { lat: 13.3392, lng: 77.101 }
  },
  {
    id: "udupi",
    name: { en: "Udupi", kn: "ಉಡುಪಿ" },
    coordinates: { lat: 13.3409, lng: 74.7421 }
  },
  {
    id: "uttara-kannada",
    name: { en: "Uttara Kannada", kn: "ಉತ್ತರ ಕನ್ನಡ" },
    coordinates: { lat: 14.8185, lng: 74.1416 }
  },
  {
    id: "vijayapura",
    name: { en: "Vijayapura", kn: "ವಿಜಯಪುರ" },
    coordinates: { lat: 16.8302, lng: 75.71 }
  },
  {
    id: "vijayanagara",
    name: { en: "Vijayanagara", kn: "ವಿಜಯನಗರ" },
    coordinates: { lat: 15.2695, lng: 76.39 }
  },
  {
    id: "yadgir",
    name: { en: "Yadgir", kn: "ಯಾದಗಿರಿ" },
    coordinates: { lat: 16.77, lng: 77.137 }
  }
];

/* =========================================================
   APMC / MARKET DIRECTORY
========================================================= */

const marketSeed: Market[] = [
  {
    id: "chitradurga",
    name: { en: "Chitradurga APMC", kn: "ಚಿತ್ರದುರ್ಗ ಎಪಿಎಂಸಿ" },
    city: { en: "Chitradurga", kn: "ಚಿತ್ರದುರ್ಗ" },
    district: "Chitradurga",
    mapQuery: "Chitradurga APMC, Chitradurga, Karnataka"
  },
  {
    id: "challakere",
    name: { en: "Challakere APMC", kn: "ಚಳ್ಳಕೆರೆ ಎಪಿಎಂಸಿ" },
    city: { en: "Challakere", kn: "ಚಳ್ಳಕೆರೆ" },
    district: "Chitradurga",
    mapQuery: "Challakere APMC, Challakere, Karnataka"
  },
  {
    id: "hiriyur",
    name: { en: "Hiriyur APMC", kn: "ಹಿರಿಯೂರು ಎಪಿಎಂಸಿ" },
    city: { en: "Hiriyur", kn: "ಹಿರಿಯೂರು" },
    district: "Chitradurga",
    mapQuery: "Hiriyur APMC, Hiriyur, Karnataka"
  },
  {
    id: "hosadurga",
    name: { en: "Hosadurga APMC", kn: "ಹೊಸದುರ್ಗ ಎಪಿಎಂಸಿ" },
    city: { en: "Hosadurga", kn: "ಹೊಸದುರ್ಗ" },
    district: "Chitradurga",
    mapQuery: "Hosadurga APMC, Hosadurga, Karnataka"
  },
  {
    id: "holalkere",
    name: { en: "Holalkere APMC", kn: "ಹೊಳಲ್ಕೆರೆ ಎಪಿಎಂಸಿ" },
    city: { en: "Holalkere", kn: "ಹೊಳಲ್ಕೆರೆ" },
    district: "Chitradurga",
    mapQuery: "Holalkere APMC, Holalkere, Karnataka"
  },
  {
    id: "rampura",
    name: { en: "Rampura APMC", kn: "ರಾಮಪುರ ಎಪಿಎಂಸಿ" },
    city: { en: "Rampura", kn: "ರಾಮಪುರ" },
    district: "Chitradurga",
    mapQuery: "Rampura APMC, Rampura, Karnataka"
  },

  {
    id: "mysuru",
    name: { en: "Mysuru APMC", kn: "ಮೈಸೂರು ಎಪಿಎಂಸಿ" },
    city: { en: "Mysuru", kn: "ಮೈಸೂರು" },
    district: "Mysuru",
    mapQuery: "Mysuru APMC, Mysuru, Karnataka"
  },
  {
    id: "nanjangud",
    name: { en: "Nanjangud APMC", kn: "ನಂಜನಗೂಡು ಎಪಿಎಂಸಿ" },
    city: { en: "Nanjangud", kn: "ನಂಜನಗೂಡು" },
    district: "Mysuru",
    mapQuery: "Nanjangud APMC, Nanjangud, Karnataka"
  },
  {
    id: "santesaraguru",
    name: { en: "Santesaraguru APMC", kn: "ಸಂತೆಸರಗುರು ಎಪಿಎಂಸಿ" },
    city: { en: "Santesaraguru", kn: "ಸಂತೆಸರಗುರು" },
    district: "Mysuru",
    mapQuery: "Santesaraguru APMC, Mysuru, Karnataka"
  },
  {
    id: "krnagar",
    name: { en: "K.R. Nagar APMC", kn: "ಕೆ.ಆರ್. ನಗರ ಎಪಿಎಂಸಿ" },
    city: { en: "K.R. Nagar", kn: "ಕೆ.ಆರ್. ನಗರ" },
    district: "Mysuru",
    mapQuery: "K.R. Nagar APMC, Karnataka"
  },
  {
    id: "periyapatna",
    name: { en: "Periyapatna APMC", kn: "ಪಿರಿಯಾಪಟ್ಟಣ ಎಪಿಎಂಸಿ" },
    city: { en: "Periyapatna", kn: "ಪಿರಿಯಾಪಟ್ಟಣ" },
    district: "Mysuru",
    mapQuery: "Periyapatna APMC, Karnataka"
  },
  {
    id: "hunsuru",
    name: { en: "Hunsuru APMC", kn: "ಹುಣಸೂರು ಎಪಿಎಂಸಿ" },
    city: { en: "Hunsuru", kn: "ಹುಣಸೂರು" },
    district: "Mysuru",
    mapQuery: "Hunsuru APMC, Karnataka"
  },
  {
    id: "tnarasipura",
    name: { en: "T. Narasipur APMC", kn: "ಟಿ. ನರಸೀಪುರ ಎಪಿಎಂಸಿ" },
    city: { en: "T. Narasipur", kn: "ಟಿ. ನರಸೀಪುರ" },
    district: "Mysuru",
    mapQuery: "T. Narasipur APMC, Karnataka"
  },

  {
    id: "kolar",
    name: { en: "Kolar APMC", kn: "ಕೋಲಾರ ಎಪಿಎಂಸಿ" },
    city: { en: "Kolar", kn: "ಕೋಲಾರ" },
    district: "Kolar",
    mapQuery: "Kolar APMC, Kolar, Karnataka"
  },
  {
    id: "bangarpet",
    name: { en: "Bangarpet APMC", kn: "ಬಂಗಾರಪೇಟೆ ಎಪಿಎಂಸಿ" },
    city: { en: "Bangarpet", kn: "ಬಂಗಾರಪೇಟೆ" },
    district: "Kolar",
    mapQuery: "Bangarpet APMC, Karnataka"
  },
  {
    id: "malur",
    name: { en: "Malur APMC", kn: "ಮಾಲೂರು ಎಪಿಎಂಸಿ" },
    city: { en: "Malur", kn: "ಮಾಲೂರು" },
    district: "Kolar",
    mapQuery: "Malur APMC, Karnataka"
  },
  {
    id: "mulbagal",
    name: { en: "Mulbagal APMC", kn: "ಮುಳಬಾಗಿಲು ಎಪಿಎಂಸಿ" },
    city: { en: "Mulbagal", kn: "ಮುಳಬಾಗಿಲು" },
    district: "Kolar",
    mapQuery: "Mulbagal APMC, Karnataka"
  },
  {
    id: "srinivasapura",
    name: { en: "Srinivasapura APMC", kn: "ಶ್ರೀನಿವಾಸಪುರ ಎಪಿಎಂಸಿ" },
    city: { en: "Srinivasapura", kn: "ಶ್ರೀನಿವಾಸಪುರ" },
    district: "Kolar",
    mapQuery: "Srinivasapura APMC, Karnataka"
  },

  {
    id: "chikkaballapur",
    name: { en: "Chikkaballapur APMC", kn: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ ಎಪಿಎಂಸಿ" },
    city: { en: "Chikkaballapur", kn: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ" },
    district: "Chikkaballapur",
    mapQuery: "Chikkaballapur APMC, Karnataka"
  },
  {
    id: "chintamani",
    name: { en: "Chintamani APMC", kn: "ಚಿಂತಾಮಣಿ ಎಪಿಎಂಸಿ" },
    city: { en: "Chintamani", kn: "ಚಿಂತಾಮಣಿ" },
    district: "Chikkaballapur",
    mapQuery: "Chintamani APMC, Karnataka"
  },
  {
    id: "bagepalli",
    name: { en: "Bagepalli APMC", kn: "ಬಾಗೇಪಲ್ಲಿ ಎಪಿಎಂಸಿ" },
    city: { en: "Bagepalli", kn: "ಬಾಗೇಪಲ್ಲಿ" },
    district: "Chikkaballapur",
    mapQuery: "Bagepalli APMC, Karnataka"
  },
  {
    id: "gowribidanur",
    name: { en: "Gowribidanur APMC", kn: "ಗೌರಿಬಿದನೂರು ಎಪಿಎಂಸಿ" },
    city: { en: "Gowribidanur", kn: "ಗೌರಿಬಿದನೂರು" },
    district: "Chikkaballapur",
    mapQuery: "Gowribidanur APMC, Karnataka"
  },

  {
    id: "dharwad",
    name: { en: "Dharwad APMC", kn: "ಧಾರವಾಡ ಎಪಿಎಂಸಿ" },
    city: { en: "Dharwad", kn: "ಧಾರವಾಡ" },
    district: "Dharwad",
    mapQuery: "Dharwad APMC, Karnataka"
  },
  {
    id: "hubli",
    name: { en: "Hubli APMC", kn: "ಹುಬ್ಬಳ್ಳಿ ಎಪಿಎಂಸಿ" },
    city: { en: "Hubli", kn: "ಹುಬ್ಬಳ್ಳಿ" },
    district: "Dharwad",
    mapQuery: "Hubli APMC, Karnataka"
  },
  {
    id: "annigeri",
    name: { en: "Annigeri APMC", kn: "ಅಣ್ಣಿಗೇರಿ ಎಪಿಎಂಸಿ" },
    city: { en: "Annigeri", kn: "ಅಣ್ಣಿಗೇರಿ" },
    district: "Dharwad",
    mapQuery: "Annigeri APMC, Karnataka"
  },
  {
    id: "kundagol",
    name: { en: "Kundagol APMC", kn: "ಕುಂದಗೋಳ ಎಪಿಎಂಸಿ" },
    city: { en: "Kundagol", kn: "ಕುಂದಗೋಳ" },
    district: "Dharwad",
    mapQuery: "Kundagol APMC, Karnataka"
  },
  {
    id: "kalghatagi",
    name: { en: "Kalghatagi APMC", kn: "ಕಲಘಟಗಿ ಎಪಿಎಂಸಿ" },
    city: { en: "Kalghatagi", kn: "ಕಲಘಟಗಿ" },
    district: "Dharwad",
    mapQuery: "Kalghatagi APMC, Karnataka"
  },

  {
    id: "gangavati",
    name: { en: "Gangavati APMC", kn: "ಗಂಗಾವತಿ ಎಪಿಎಂಸಿ" },
    city: { en: "Gangavati", kn: "ಗಂಗಾವತಿ" },
    district: "Koppal",
    mapQuery: "Gangavati APMC, Karnataka"
  },
  {
    id: "koppal",
    name: { en: "Koppal APMC", kn: "ಕೊಪ್ಪಳ ಎಪಿಎಂಸಿ" },
    city: { en: "Koppal", kn: "ಕೊಪ್ಪಳ" },
    district: "Koppal",
    mapQuery: "Koppal APMC, Karnataka"
  },

  {
    id: "raichur",
    name: { en: "Raichur APMC", kn: "ರಾಯಚೂರು ಎಪಿಎಂಸಿ" },
    city: { en: "Raichur", kn: "ರಾಯಚೂರು" },
    district: "Raichur",
    mapQuery: "Raichur APMC, Karnataka"
  },

  {
    id: "kalaburagi",
    name: { en: "Kalaburagi APMC", kn: "ಕಲಬುರಗಿ ಎಪಿಎಂಸಿ" },
    city: { en: "Kalaburagi", kn: "ಕಲಬುರಗಿ" },
    district: "Kalaburagi",
    mapQuery: "Kalaburagi APMC, Karnataka"
  },
  {
    id: "sedam",
    name: { en: "Sedam APMC", kn: "ಸೇಡಂ ಎಪಿಎಂಸಿ" },
    city: { en: "Sedam", kn: "ಸೇಡಂ" },
    district: "Kalaburagi",
    mapQuery: "Sedam APMC, Karnataka"
  },
  {
    id: "chittapura",
    name: { en: "Chittapura APMC", kn: "ಚಿತ್ತಾಪುರ ಎಪಿಎಂಸಿ" },
    city: { en: "Chittapura", kn: "ಚಿತ್ತಾಪುರ" },
    district: "Kalaburagi",
    mapQuery: "Chittapura APMC, Karnataka"
  },

  {
    id: "bidar",
    name: { en: "Bidar APMC", kn: "ಬೀದರ್ ಎಪಿಎಂಸಿ" },
    city: { en: "Bidar", kn: "ಬೀದರ್" },
    district: "Bidar",
    mapQuery: "Bidar APMC, Karnataka"
  },
  {
    id: "humnabad",
    name: { en: "Humnabad APMC", kn: "ಹುಮನಾಬಾದ್ ಎಪಿಎಂಸಿ" },
    city: { en: "Humnabad", kn: "ಹುಮನಾಬಾದ್" },
    district: "Bidar",
    mapQuery: "Humnabad APMC, Karnataka"
  },
  {
    id: "basavakalyana",
    name: { en: "Basavakalyana APMC", kn: "ಬಸವಕಲ್ಯಾಣ ಎಪಿಎಂಸಿ" },
    city: { en: "Basavakalyana", kn: "ಬಸವಕಲ್ಯಾಣ" },
    district: "Bidar",
    mapQuery: "Basavakalyana APMC, Karnataka"
  },

  {
    id: "bailhongal",
    name: { en: "Bailhongal APMC", kn: "ಬೈಲಹೊಂಗಲ ಎಪಿಎಂಸಿ" },
    city: { en: "Bailhongal", kn: "ಬೈಲಹೊಂಗಲ" },
    district: "Belagavi",
    mapQuery: "Bailhongal APMC, Karnataka"
  },
  {
    id: "savadatti",
    name: { en: "Savadatti APMC", kn: "ಸವದತ್ತಿ ಎಪಿಎಂಸಿ" },
    city: { en: "Savadatti", kn: "ಸವದತ್ತಿ" },
    district: "Belagavi",
    mapQuery: "Savadatti APMC, Karnataka"
  },
  {
    id: "belagavi",
    name: { en: "Belagavi APMC", kn: "ಬೆಳಗಾವಿ ಎಪಿಎಂಸಿ" },
    city: { en: "Belagavi", kn: "ಬೆಳಗಾವಿ" },
    district: "Belagavi",
    mapQuery: "Belagavi APMC, Karnataka"
  },
  {
    id: "gokak",
    name: { en: "Gokak APMC", kn: "ಗೋಕಾಕ ಎಪಿಎಂಸಿ" },
    city: { en: "Gokak", kn: "ಗೋಕಾಕ" },
    district: "Belagavi",
    mapQuery: "Gokak APMC, Karnataka"
  },
  {
    id: "nippani",
    name: { en: "Nippani APMC", kn: "ನಿಪ್ಪಾಣಿ ಎಪಿಎಂಸಿ" },
    city: { en: "Nippani", kn: "ನಿಪ್ಪಾಣಿ" },
    district: "Belagavi",
    mapQuery: "Nippani APMC, Karnataka"
  },
  {
    id: "sankeshwara",
    name: { en: "Sankeshwara APMC", kn: "ಸಂಕೇಶ್ವರ ಎಪಿಎಂಸಿ" },
    city: { en: "Sankeshwara", kn: "ಸಂಕೇಶ್ವರ" },
    district: "Belagavi",
    mapQuery: "Sankeshwara APMC, Karnataka"
  },

  {
    id: "mahalingapura",
    name: { en: "Mahalingapura APMC", kn: "ಮಹಾಲಿಂಗಪುರ ಎಪಿಎಂಸಿ" },
    city: { en: "Mahalingapura", kn: "ಮಹಾಲಿಂಗಪುರ" },
    district: "Bagalkot",
    mapQuery: "Mahalingapura APMC, Karnataka"
  },

  {
    id: "mandya",
    name: { en: "Mandya APMC", kn: "ಮಂಡ್ಯ ಎಪಿಎಂಸಿ" },
    city: { en: "Mandya", kn: "ಮಂಡ್ಯ" },
    district: "Mandya",
    mapQuery: "Mandya APMC, Karnataka"
  },
  {
    id: "maddur",
    name: { en: "Maddur APMC", kn: "ಮದ್ದೂರು ಎಪಿಎಂಸಿ" },
    city: { en: "Maddur", kn: "ಮದ್ದೂರು" },
    district: "Mandya",
    mapQuery: "Maddur APMC, Karnataka"
  },

  {
    id: "hassan",
    name: { en: "Hassan APMC", kn: "ಹಾಸನ ಎಪಿಎಂಸಿ" },
    city: { en: "Hassan", kn: "ಹಾಸನ" },
    district: "Hassan",
    mapQuery: "Hassan APMC, Karnataka"
  },

  {
    id: "shivamogga",
    name: { en: "Shivamogga APMC", kn: "ಶಿವಮೊಗ್ಗ ಎಪಿಎಂಸಿ" },
    city: { en: "Shivamogga", kn: "ಶಿವಮೊಗ್ಗ" },
    district: "Shivamogga",
    mapQuery: "Shivamogga APMC, Karnataka"
  },
  {
    id: "sagar",
    name: { en: "Sagar APMC", kn: "ಸಾಗರ ಎಪಿಎಂಸಿ" },
    city: { en: "Sagar", kn: "ಸಾಗರ" },
    district: "Shivamogga",
    mapQuery: "Sagar APMC, Karnataka"
  },
  {
    id: "thirthahalli",
    name: { en: "Thirthahalli APMC", kn: "ತೀರ್ಥಹಳ್ಳಿ ಎಪಿಎಂಸಿ" },
    city: { en: "Thirthahalli", kn: "ತೀರ್ಥಹಳ್ಳಿ" },
    district: "Shivamogga",
    mapQuery: "Thirthahalli APMC, Karnataka"
  },

  {
    id: "sirsi",
    name: { en: "Sirsi APMC", kn: "ಶಿರಸಿ ಎಪಿಎಂಸಿ" },
    city: { en: "Sirsi", kn: "ಶಿರಸಿ" },
    district: "Uttara Kannada",
    mapQuery: "Sirsi APMC, Karnataka"
  },
  {
    id: "siddapura",
    name: { en: "Siddapura APMC", kn: "ಸಿದ್ದಾಪುರ ಎಪಿಎಂಸಿ" },
    city: { en: "Siddapura", kn: "ಸಿದ್ದಾಪುರ" },
    district: "Uttara Kannada",
    mapQuery: "Siddapura APMC, Karnataka"
  },
  {
    id: "yellapura",
    name: { en: "Yellapura APMC", kn: "ಯಲ್ಲಾಪುರ ಎಪಿಎಂಸಿ" },
    city: { en: "Yellapura", kn: "ಯಲ್ಲಾಪುರ" },
    district: "Uttara Kannada",
    mapQuery: "Yellapura APMC, Karnataka"
  },

  {
    id: "udupi",
    name: { en: "Udupi APMC", kn: "ಉಡುಪಿ ಎಪಿಎಂಸಿ" },
    city: { en: "Udupi", kn: "ಉಡುಪಿ" },
    district: "Udupi",
    mapQuery: "Udupi APMC, Karnataka"
  },

  {
    id: "mangaluru",
    name: { en: "Mangaluru APMC", kn: "ಮಂಗಳೂರು ಎಪಿಎಂಸಿ" },
    city: { en: "Mangaluru", kn: "ಮಂಗಳೂರು" },
    district: "Dakshina Kannada",
    mapQuery: "Mangaluru APMC, Karnataka"
  },

  {
    id: "tumakuru",
    name: { en: "Tumakuru APMC", kn: "ತುಮಕೂರು ಎಪಿಎಂಸಿ" },
    city: { en: "Tumakuru", kn: "ತುಮಕೂರು" },
    district: "Tumakuru",
    mapQuery: "Tumakuru APMC, Karnataka"
  },
  {
    id: "tiptur",
    name: { en: "Tiptur APMC", kn: "ತಿಪಟೂರು ಎಪಿಎಂಸಿ" },
    city: { en: "Tiptur", kn: "ತಿಪಟೂರು" },
    district: "Tumakuru",
    mapQuery: "Tiptur APMC, Karnataka"
  },
  {
    id: "turvekere",
    name: { en: "Turuvekere APMC", kn: "ತುರವೇಕೆರೆ ಎಪಿಎಂಸಿ" },
    city: { en: "Turuvekere", kn: "ತುರವೇಕೆರೆ" },
    district: "Tumakuru",
    mapQuery: "Turuvekere APMC, Karnataka"
  },
  {
    id: "chikkanayakanahalli",
    name: {
      en: "Chikkanayakanahalli APMC",
      kn: "ಚಿಕ್ಕನಾಯಕನಹಳ್ಳಿ ಎಪಿಎಂಸಿ"
    },
    city: {
      en: "Chikkanayakanahalli",
      kn: "ಚಿಕ್ಕನಾಯಕನಹಳ್ಳಿ"
    },
    district: "Tumakuru",
    mapQuery: "Chikkanayakanahalli APMC, Karnataka"
  }
];

/* =========================================================
   DISTRICTS WITH MARKETS
========================================================= */

export const DISTRICTS: District[] = districtSeed.map(district => ({
  ...district,
  markets: marketSeed.filter(
    market =>
      market.district.toLowerCase() === district.name.en.toLowerCase()
  )
}));

/* =========================================================
   PRICE HELPERS
========================================================= */

const toItem = (value: string): PriceItem => {
  const [name, kn] = value.split("|");

  return {
    id: name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
    name: {
      en: name,
      kn: kn || name
    }
  };
};

const toCategory = (
  id: string,
  en: string,
  kn: string,
  items: string[]
): PriceCategory => ({
  id,
  name: { en, kn },
  items: items.map(toItem)
});

/* =========================================================
   AGRICULTURE PRICES
========================================================= */

export const AGRICULTURE_PRICE_CATEGORIES: PriceCategory[] = [
  toCategory(
    "cereals",
    "Cereals",
    "ಧಾನ್ಯಗಳು",
    [
      "Paddy|ಭತ್ತ",
      "Maize|ಮೆಕ್ಕೆಜೋಳ",
      "Wheat|ಗೋಧಿ",
      "Jowar|ಜೋಳ",
      "Bajra|ಸಜ್ಜೆ",
      "Ragi|ರಾಗಿ"
    ]
  ),

  toCategory(
    "pulses",
    "Pulses",
    "ಬೇಳೆಕಾಳುಗಳು",
    [
      "Tur / Arhar|ತೊಗರಿ",
      "Bengal Gram / Chana|ಕಡಲೆ",
      "Green Gram|ಹೆಸರು",
      "Black Gram|ಉದ್ದು",
      "Horse Gram|ಹುರಳಿ",
      "Cowpea|ಅಲಸಂದೆ"
    ]
  ),

  toCategory(
    "oilseeds",
    "Oilseeds",
    "ಎಣ್ಣೆಕಾಳುಗಳು",
    [
      "Groundnut|ಕಡಲೆಕಾಯಿ",
      "Sunflower|ಸೂರ್ಯಕಾಂತಿ",
      "Soybean|ಸೋಯಾಬೀನ್",
      "Sesame|ಎಳ್ಳು",
      "Castor|ಹರಳು",
      "Safflower|ಕುಸುಬೆ",
      "Mustard|ಸಾಸಿವೆ"
    ]
  ),

  toCategory(
    "commercial",
    "Commercial Crops",
    "ವಾಣಿಜ್ಯ ಬೆಳೆಗಳು",
    [
      "Cotton|ಹತ್ತಿ",
      "Sugarcane|ಕಬ್ಬು",
      "Tobacco|ತಂಬಾಕು"
    ]
  ),

  toCategory(
    "vegetables",
    "Vegetables",
    "ತರಕಾರಿಗಳು",
    [
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
    ]
  ),

  toCategory(
    "fruits",
    "Fruits",
    "ಹಣ್ಣುಗಳು",
    [
      "Banana|ಬಾಳೆಹಣ್ಣು",
      "Mango|ಮಾವು",
      "Grapes|ದ್ರಾಕ್ಷಿ",
      "Pomegranate|ದಾಳಿಂಬೆ",
      "Orange|ಕಿತ್ತಳೆ",
      "Papaya|ಪಪ್ಪಾಯಿ",
      "Watermelon|ಕಲ್ಲಂಗಡಿ",
      "Guava|ಪೇರಳೆ"
    ]
  ),

  toCategory(
    "spices",
    "Spices",
    "ಮಸಾಲೆ ಬೆಳೆಗಳು",
    [
      "Dry Chilli|ಒಣ ಮೆಣಸಿನಕಾಯಿ",
      "Turmeric|ಅರಿಶಿನ",
      "Coriander|ಕೊತ್ತಂಬರಿ",
      "Cumin|ಜೀರಿಗೆ",
      "Ginger|ಶುಂಠಿ",
      "Garlic|ಬೆಳ್ಳುಳ್ಳಿ",
      "Tamarind|ಹುಣಸೆ"
    ]
  ),

  toCategory(
    "plantation",
    "Plantation / Farm Produce",
    "ತೋಟದ ಉತ್ಪನ್ನಗಳು",
    [
      "Arecanut|ಅಡಿಕೆ",
      "Coconut|ತೆಂಗಿನಕಾಯಿ",
      "Copra|ಕೊಬ್ಬರಿ",
      "Coffee|ಕಾಫಿ",
      "Cardamom|ಏಲಕ್ಕಿ",
      "Pepper|ಕರಿಮೆಣಸು"
    ]
  ),

  toCategory(
    "inputs",
    "Seeds & Fertilizers",
    "ಬೀಜ ಮತ್ತು ರಸಗೊಬ್ಬರ",
    [
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
    ]
  ),

  toCategory(
    "pesticides",
    "Pesticides / Crop Protection",
    "ಕೀಟನಾಶಕ / ಬೆಳೆ ರಕ್ಷಣೆ",
    [
      "Neem-based products|ಬೇವಿನ ಆಧಾರಿತ ಉತ್ಪನ್ನಗಳು",
      "Insecticides|ಕೀಟನಾಶಕಗಳು",
      "Fungicides|ಶಿಲೀಂಧ್ರನಾಶಕಗಳು",
      "Herbicides|ಕಳೆನಾಶಕಗಳು",
      "Biopesticides|ಜೈವಿಕ ಕೀಟನಾಶಕಗಳು"
    ]
  )
];

/* =========================================================
   OTHER MARKET PRICES
========================================================= */

export const OTHER_PRICE_CATEGORIES: PriceCategory[] = [
  toCategory(
    "fuel",
    "Fuel",
    "ಇಂಧನ",
    [
      "Petrol|ಪೆಟ್ರೋಲ್",
      "Diesel|ಡೀಸೆಲ್",
      "LPG|ಎಲ್‌ಪಿಜಿ"
    ]
  ),

  toCategory(
    "metals",
    "Precious Metals",
    "ಬೆಲೆಬಾಳುವ ಲೋಹಗಳು",
    [
      "Gold|ಚಿನ್ನ",
      "Silver|ಬೆಳ್ಳಿ"
    ]
  ),

  toCategory(
    "general",
    "General Market",
    "ಸಾಮಾನ್ಯ ಮಾರುಕಟ್ಟೆ",
    [
      "Cement|ಸಿಮೆಂಟ್",
      "Steel|ಉಕ್ಕು",
      "Cattle Feed|ಜಾನುವಾರು ಆಹಾರ",
      "Milk|ಹಾಲು"
    ]
  )
];

/* =========================================================
   FARMER SCHEMES
========================================================= */

export const FARMER_SCHEMES: Scheme[] = [
  {
    id: "pm-kisan",
    name: {
      en: "PM Kisan",
      kn: "ಪಿಎಂ ಕಿಸಾನ್"
    },
    benefit: {
      en: "₹6,000/year",
      kn: "ವರ್ಷಕ್ಕೆ ₹6,000"
    },
    eligibility: {
      en: "Eligible landholding farmers",
      kn: "ಅರ್ಹ ಜಮೀನು ಹೊಂದಿರುವ ರೈತರು"
    },
    description: {
      en: "Apply or check status through the official portal.",
      kn: "ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ಮೂಲಕ ಅರ್ಜಿ ಅಥವಾ ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ."
    },
    url: "https://pmkisan.gov.in"
  },

  {
    id: "pmfby",
    name: {
      en: "PM Fasal Bima Yojana",
      kn: "ಪಿಎಂ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ"
    },
    benefit: {
      en: "Crop insurance",
      kn: "ಬೆಳೆ ವಿಮೆ"
    },
    eligibility: {
      en: "Farmers growing notified crops",
      kn: "ಅಧಿಸೂಚಿತ ಬೆಳೆ ಬೆಳೆಯುವ ರೈತರು"
    },
    description: {
      en: "Apply through the notified channel before the crop deadline.",
      kn: "ಬೆಳೆ ಗಡುವಿನ ಮೊದಲು ಅಧಿಸೂಚಿತ ಮಾರ್ಗದ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ."
    },
    url: "https://pmfby.gov.in"
  },

  {
    id: "kcc",
    name: {
      en: "Kisan Credit Card",
      kn: "ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್"
    },
    benefit: {
      en: "Farm credit",
      kn: "ಕೃಷಿ ಸಾಲ ಸೌಲಭ್ಯ"
    },
    eligibility: {
      en: "Eligible farmers",
      kn: "ಅರ್ಹ ರೈತರು"
    },
    description: {
      en: "Contact your bank with the required documents.",
      kn: "ಅಗತ್ಯ ದಾಖಲೆಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಅನ್ನು ಸಂಪರ್ಕಿಸಿ."
    },
    url: "https://www.rbi.org.in"
  },

  {
    id: "soil-health-card",
    name: {
      en: "Soil Health Card",
      kn: "ಮಣ್ಣು ಆರೋಗ್ಯ ಕಾರ್ಡ್"
    },
    benefit: {
      en: "Soil testing & nutrient advice",
      kn: "ಮಣ್ಣು ಪರೀಕ್ಷೆ ಮತ್ತು ಪೋಷಕಾಂಶ ಸಲಹೆ"
    },
    eligibility: {
      en: "Farmers",
      kn: "ರೈತರು"
    },
    description: {
      en: "Use the official Soil Health Card system or local agriculture office.",
      kn: "ಅಧಿಕೃತ ಮಣ್ಣು ಆರೋಗ್ಯ ಕಾರ್ಡ್ ವ್ಯವಸ್ಥೆ ಅಥವಾ ಸ್ಥಳೀಯ ಕೃಷಿ ಕಚೇರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ."
    },
    url: "https://soilhealth.dac.gov.in"
  },

  {
    id: "raitha-mitra",
    name: {
      en: "Raitha Mitra / Karnataka Agriculture",
      kn: "ರೈತ ಮಿತ್ರ / ಕರ್ನಾಟಕ ಕೃಷಿ"
    },
    benefit: {
      en: "Agriculture services & schemes",
      kn: "ಕೃಷಿ ಸೇವೆಗಳು ಮತ್ತು ಯೋಜನೆಗಳು"
    },
    eligibility: {
      en: "Karnataka farmers",
      kn: "ಕರ್ನಾಟಕದ ರೈತರು"
    },
    description: {
      en: "Contact Agriculture Department or Raitha Samparka Kendra.",
      kn: "ಕೃಷಿ ಇಲಾಖೆ ಅಥವಾ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರವನ್ನು ಸಂಪರ್ಕಿಸಿ."
    },
    url: "https://raitamitra.karnataka.gov.in"
  }
];

/* =========================================================
   OFFICIAL PRICE SOURCES
========================================================= */

export const PRICE_SOURCES = {
  market:
    "https://krishimaratavahini.karnataka.gov.in/en",

  sujala:
    "https://sujala3lri.karnataka.gov.in/Dashboard/Index",

  
    
agmarknet:                                
"https//agmarknet.gov.in/"
};   
