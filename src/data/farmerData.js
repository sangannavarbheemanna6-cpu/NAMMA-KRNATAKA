## `frontend/src/lib/farmerHubData.ts`

```ts
export interface BilingualText {
  en: string;
  kn: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Market {
  id: string;
  name: BilingualText;
  city: BilingualText;
  address: string;
  coordinates: Coordinates;
  locationNote: string;
}

export interface District {
  id: string;
  name: BilingualText;
  region: BilingualText;
  coordinates: Coordinates;
  markets: Market[];
}

export interface PriceItem {
  id: string;
  name: BilingualText;
  unit: string;
  note?: BilingualText;
}

export interface PriceCategory {
  id: string;
  name: BilingualText;
  description: BilingualText;
  items: PriceItem[];
}

export interface Scheme {
  id: string;
  level: BilingualText;
  name: BilingualText;
  eligibility: BilingualText;
  benefits: BilingualText;
  documents: BilingualText[];
  procedure: BilingualText[];
  officialUrl?: string;
  status: BilingualText;
}

export const OFFICIAL_UPDATE: BilingualText = {
  en: "Official update required",
  kn: "ಅಧಿಕೃತ ನವೀಕರಣ ಅಗತ್ಯ",
};

const districtSeed: Array<{
  id: string;
  en: string;
  kn: string;
  regionEn: string;
  regionKn: string;
  lat: number;
  lng: number;
}> = [
  { id: "bagalkot", en: "Bagalkot", kn: "ಬಾಗಲಕೋಟೆ", regionEn: "North Karnataka", regionKn: "ಉತ್ತರ ಕರ್ನಾಟಕ", lat: 16.1691, lng: 75.6615 },
  { id: "ballari", en: "Ballari", kn: "ಬಳ್ಳಾರಿ", regionEn: "Hyderabad Karnataka", regionKn: "ಹೈದರಾಬಾದ್ ಕರ್ನಾಟಕ", lat: 15.1394, lng: 76.9214 },
  { id: "belagavi", en: "Belagavi", kn: "ಬೆಳಗಾವಿ", regionEn: "North Karnataka", regionKn: "ಉತ್ತರ ಕರ್ನಾಟಕ", lat: 15.8497, lng: 74.4977 },
  { id: "bengaluru-rural", en: "Bengaluru Rural", kn: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ", regionEn: "Bengaluru region", regionKn: "ಬೆಂಗಳೂರು ಪ್ರದೇಶ", lat: 13.2847, lng: 77.6039 },
  { id: "bengaluru-urban", en: "Bengaluru Urban", kn: "ಬೆಂಗಳೂರು ನಗರ", regionEn: "Bengaluru region", regionKn: "ಬೆಂಗಳೂರು ಪ್ರದೇಶ", lat: 12.9716, lng: 77.5946 },
  { id: "bidar", en: "Bidar", kn: "ಬೀದರ್", regionEn: "Hyderabad Karnataka", regionKn: "ಹೈದರಾಬಾದ್ ಕರ್ನಾಟಕ", lat: 17.9133, lng: 77.5301 },
  { id: "chamarajanagar", en: "Chamarajanagar", kn: "ಚಾಮರಾಜನಗರ", regionEn: "Old Mysuru", regionKn: "ಹಳೆ ಮೈಸೂರು", lat: 11.9261, lng: 76.9437 },
  { id: "chikkaballapur", en: "Chikkaballapur", kn: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ", regionEn: "Bengaluru region", regionKn: "ಬೆಂಗಳೂರು ಪ್ರದೇಶ", lat: 13.4355, lng: 77.7315 },
  { id: "chikkamagaluru", en: "Chikkamagaluru", kn: "ಚಿಕ್ಕಮಗಳೂರು", regionEn: "Malnad", regionKn: "ಮಲೆನಾಡು", lat: 13.3161, lng: 75.772 },
  { id: "chitradurga", en: "Chitradurga", kn: "ಚಿತ್ರದುರ್ಗ", regionEn: "Central Karnataka", regionKn: "ಮಧ್ಯ ಕರ್ನಾಟಕ", lat: 14.2306, lng: 76.398 },
  { id: "dakshina-kannada", en: "Dakshina Kannada", kn: "ದಕ್ಷಿಣ ಕನ್ನಡ", regionEn: "Coastal Karnataka", regionKn: "ಕರಾವಳಿ ಕರ್ನಾಟಕ", lat: 12.9141, lng: 74.856 },
  { id: "davanagere", en: "Davanagere", kn: "ದಾವಣಗೆರೆ", regionEn: "Central Karnataka", regionKn: "ಮಧ್ಯ ಕರ್ನಾಟಕ", lat: 14.4644, lng: 75.9218 },
  { id: "dharwad", en: "Dharwad", kn: "ಧಾರವಾಡ", regionEn: "North Karnataka", regionKn: "ಉತ್ತರ ಕರ್ನಾಟಕ", lat: 15.4589, lng: 75.0078 },
  { id: "gadag", en: "Gadag", kn: "ಗದಗ", regionEn: "North Karnataka", regionKn: "ಉತ್ತರ ಕರ್ನಾಟಕ", lat: 15.4298, lng: 75.6297 },
  { id: "hassan", en: "Hassan", kn: "ಹಾಸನ", regionEn: "Old Mysuru", regionKn: "ಹಳೆ ಮೈಸೂರು", lat: 13.0068, lng: 76.0996 },
  { id: "haveri", en: "Haveri", kn: "ಹಾವೇರಿ", regionEn: "North Karnataka", regionKn: "ಉತ್ತರ ಕರ್ನಾಟಕ", lat: 14.7951, lng: 75.3991 },
  { id: "kalaburagi", en: "Kalaburagi", kn: "ಕಲಬುರಗಿ", regionEn: "Hyderabad Karnataka", regionKn: "ಹೈದರಾಬಾದ್ ಕರ್ನಾಟಕ", lat: 17.3297, lng: 76.8343 },
  { id: "kodagu", en: "Kodagu", kn: "ಕೊಡಗು", regionEn: "Malnad", regionKn: "ಮಲೆನಾಡು", lat: 12.4244, lng: 75.7382 },
  { id: "kolar", en: "Kolar", kn: "ಕೋಲಾರ", regionEn: "Bengaluru region", regionKn: "ಬೆಂಗಳೂರು ಪ್ರದೇಶ", lat: 13.136, lng: 78.129 },
  { id: "koppal", en: "Koppal", kn: "ಕೊಪ್ಪಳ", regionEn: "Hyderabad Karnataka", regionKn: "ಹೈದರಾಬಾದ್ ಕರ್ನಾಟಕ", lat: 15.3505, lng: 76.1548 },
  { id: "mandya", en: "Mandya", kn: "ಮಂಡ್ಯ", regionEn: "Old Mysuru", regionKn: "ಹಳೆ ಮೈಸೂರು", lat: 12.5218, lng: 76.8951 },
  { id: "mysuru", en: "Mysuru", kn: "ಮೈಸೂರು", regionEn: "Old Mysuru", regionKn: "ಹಳೆ ಮೈಸೂರು", lat: 12.2958, lng: 76.6394 },
  { id: "raichur", en: "Raichur", kn: "ರಾಯಚೂರು", regionEn: "Hyderabad Karnataka", regionKn: "ಹೈದರಾಬಾದ್ ಕರ್ನಾಟಕ", lat: 16.212, lng: 77.3439 },
  { id: "ramanagara", en: "Ramanagara", kn: "ರಾಮನಗರ", regionEn: "Bengaluru region", regionKn: "ಬೆಂಗಳೂರು ಪ್ರದೇಶ", lat: 12.72, lng: 77.28 },
  { id: "shivamogga", en: "Shivamogga", kn: "ಶಿವಮೊಗ್ಗ", regionEn: "Malnad", regionKn: "ಮಲೆನಾಡು", lat: 13.9299, lng: 75.5681 },
  { id: "tumakuru", en: "Tumakuru", kn: "ತುಮಕೂರು", regionEn: "Bengaluru region", regionKn: "ಬೆಂಗಳೂರು ಪ್ರದೇಶ", lat: 13.3392, lng: 77.1017 },
  { id: "udupi", en: "Udupi", kn: "ಉಡುಪಿ", regionEn: "Coastal Karnataka", regionKn: "ಕರಾವಳಿ ಕರ್ನಾಟಕ", lat: 13.3409, lng: 74.7421 },
  { id: "uttara-kannada", en: "Uttara Kannada", kn: "ಉತ್ತರ ಕನ್ನಡ", regionEn: "Coastal Karnataka", regionKn: "ಕರಾವಳಿ ಕರ್ನಾಟಕ", lat: 14.7937, lng: 74.6869 },
  { id: "vijayanagara", en: "Vijayanagara", kn: "ವಿಜಯನಗರ", regionEn: "Central Karnataka", regionKn: "ಮಧ್ಯ ಕರ್ನಾಟಕ", lat: 15.2695, lng: 76.3909 },
  { id: "vijayapura", en: "Vijayapura", kn: "ವಿಜಯಪುರ", regionEn: "North Karnataka", regionKn: "ಉತ್ತರ ಕರ್ನಾಟಕ", lat: 16.8302, lng: 75.71 },
  { id: "yadgir", en: "Yadgir", kn: "ಯಾದಗಿರಿ", regionEn: "Hyderabad Karnataka", regionKn: "ಹೈದರಾಬಾದ್ ಕರ್ನಾಟಕ", lat: 16.77, lng: 77.137 },
];

const marketSeed: Array<{
  districtId: string;
  id: string;
  en: string;
  kn: string;
  cityEn: string;
  cityKn: string;
  lat: number;
  lng: number;
}> = [
  { districtId: "bagalkot", id: "bagalkot-apmc", en: "Bagalkot APMC", kn: "ಬಾಗಲಕೋಟೆ ಎಪಿಎಂಸಿ", cityEn: "Bagalkot", cityKn: "ಬಾಗಲಕೋಟೆ", lat: 16.1691, lng: 75.6615 },
  { districtId: "ballari", id: "ballari-apmc", en: "Ballari APMC", kn: "ಬಳ್ಳಾರಿ ಎಪಿಎಂಸಿ", cityEn: "Ballari", cityKn: "ಬಳ್ಳಾರಿ", lat: 15.1394, lng: 76.9214 },
  { districtId: "belagavi", id: "belagavi-apmc", en: "Belagavi APMC", kn: "ಬೆಳಗಾವಿ ಎಪಿಎಂಸಿ", cityEn: "Belagavi", cityKn: "ಬೆಳಗಾವಿ", lat: 15.8497, lng: 74.4977 },
  { districtId: "belagavi", id: "gokak-apmc", en: "Gokak APMC", kn: "ಗೋಕಾಕ ಎಪಿಎಂಸಿ", cityEn: "Gokak", cityKn: "ಗೋಕಾಕ", lat: 16.169, lng: 74.8238 },
  { districtId: "bengaluru-rural", id: "devanahalli-apmc", en: "Devanahalli APMC", kn: "ದೇವನಹಳ್ಳಿ ಎಪಿಎಂಸಿ", cityEn: "Devanahalli", cityKn: "ದೇವನಹಳ್ಳಿ", lat: 13.2445, lng: 77.7112 },
  { districtId: "bengaluru-urban", id: "yeshwanthpur-apmc", en: "Yeshwanthpur APMC", kn: "ಯಶವಂತಪುರ ಎಪಿಎಂಸಿ", cityEn: "Bengaluru", cityKn: "ಬೆಂಗಳೂರು", lat: 13.0284, lng: 77.5401 },
  { districtId: "bidar", id: "bidar-apmc", en: "Bidar APMC", kn: "ಬೀದರ್ ಎಪಿಎಂಸಿ", cityEn: "Bidar", cityKn: "ಬೀದರ್", lat: 17.9133, lng: 77.5301 },
  { districtId: "chamarajanagar", id: "chamarajanagar-apmc", en: "Chamarajanagar APMC", kn: "ಚಾಮರಾಜನಗರ ಎಪಿಎಂಸಿ", cityEn: "Chamarajanagar", cityKn: "ಚಾಮರಾಜನಗರ", lat: 11.9261, lng: 76.9437 },
  { districtId: "chikkaballapur", id: "chikkaballapur-apmc", en: "Chikkaballapur APMC", kn: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ ಎಪಿಎಂಸಿ", cityEn: "Chikkaballapur", cityKn: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ", lat: 13.4355, lng: 77.7315 },
  { districtId: "chikkamagaluru", id: "chikkamagaluru-apmc", en: "Chikkamagaluru APMC", kn: "ಚಿಕ್ಕಮಗಳೂರು ಎಪಿಎಂಸಿ", cityEn: "Chikkamagaluru", cityKn: "ಚಿಕ್ಕಮಗಳೂರು", lat: 13.3161, lng: 75.772 },
  { districtId: "chitradurga", id: "chitradurga-apmc", en: "Chitradurga APMC", kn: "ಚಿತ್ರದುರ್ಗ ಎಪಿಎಂಸಿ", cityEn: "Chitradurga", cityKn: "ಚಿತ್ರದುರ್ಗ", lat: 14.2306, lng: 76.398 },
  { districtId: "dakshina-kannada", id: "mangaluru-apmc", en: "Mangaluru APMC", kn: "ಮಂಗಳೂರು ಎಪಿಎಂಸಿ", cityEn: "Mangaluru", cityKn: "ಮಂಗಳೂರು", lat: 12.9141, lng: 74.856 },
  { districtId: "davanagere", id: "davanagere-apmc", en: "Davanagere APMC", kn: "ದಾವಣಗೆರೆ ಎಪಿಎಂಸಿ", cityEn: "Davanagere", cityKn: "ದಾವಣಗೆರೆ", lat: 14.4644, lng: 75.9218 },
  { districtId: "dharwad", id: "hubballi-apmc", en: "Hubballi APMC", kn: "ಹುಬ್ಬಳ್ಳಿ ಎಪಿಎಂಸಿ", cityEn: "Hubballi", cityKn: "ಹುಬ್ಬಳ್ಳಿ", lat: 15.3647, lng: 75.124 },
  { districtId: "gadag", id: "gadag-apmc", en: "Gadag APMC", kn: "ಗದಗ ಎಪಿಎಂಸಿ", cityEn: "Gadag", cityKn: "ಗದಗ", lat: 15.4298, lng: 75.6297 },
  { districtId: "hassan", id: "hassan-apmc", en: "Hassan APMC", kn: "ಹಾಸನ ಎಪಿಎಂಸಿ", cityEn: "Hassan", cityKn: "ಹಾಸನ", lat: 13.0068, lng: 76.0996 },
  { districtId: "haveri", id: "Haveri APMC", en: "Haveri APMC", kn: "ಹಾವೇರಿ ಎಪಿಎಂಸಿ", cityEn: "Haveri", cityKn: "ಹಾವೇರಿ", lat: 14.7951, lng: 75.3991 },
  { districtId: "kalaburagi", id: "kalaburagi-apmc", en: "Kalaburagi APMC", kn: "ಕಲಬುರಗಿ ಎಪಿಎಂಸಿ", cityEn: "Kalaburagi", cityKn: "ಕಲಬುರಗಿ", lat: 17.3297, lng: 76.8343 },
  { districtId: "kodagu", id: "madikeri-apmc", en: "Madikeri APMC", kn: "ಮಡಿಕೇರಿ ಎಪಿಎಂಸಿ", cityEn: "Madikeri", cityKn: "ಮಡಿಕೇರಿ", lat: 12.4244, lng: 75.7382 },
  { districtId: "kolar", id: "kolar-apmc", en: "Kolar APMC", kn: "ಕೋಲಾರ ಎಪಿಎಂಸಿ", cityEn: "Kolar", cityKn: "ಕೋಲಾರ", lat: 13.136, lng: 78.129 },
  { districtId: "koppal", id: "koppal-apmc", en: "Koppal APMC", kn: "ಕೊಪ್ಪಳ ಎಪಿಎಂಸಿ", cityEn: "Koppal", cityKn: "ಕೊಪ್ಪಳ", lat: 15.3505, lng: 76.1548 },
  { districtId: "mandya", id: "mandya-apmc", en: "Mandya APMC", kn: "ಮಂಡ್ಯ ಎಪಿಎಂಸಿ", cityEn: "Mandya", cityKn: "ಮಂಡ್ಯ", lat: 12.5218, lng: 76.8951 },
  { districtId: "mysuru", id: "mysuru-apmc", en: "Mysuru APMC", kn: "ಮೈಸೂರು ಎಪಿಎಂಸಿ", cityEn: "Mysuru", cityKn: "ಮೈಸೂರು", lat: 12.2958, lng: 76.6394 },
  { districtId: "mysuru", id: "nanjangud-apmc", en: "Nanjangud APMC", kn: "ನಂಜನಗೂಡು ಎಪಿಎಂಸಿ", cityEn: "Nanjangud", cityKn: "ನಂಜನಗೂಡು", lat: 12.1198, lng: 76.6838 },
  { districtId: "raichur", id: "raichur-apmc", en: "Raichur APMC", kn: "ರಾಯಚೂರು ಎಪಿಎಂಸಿ", cityEn: "Raichur", cityKn: "ರಾಯಚೂರು", lat: 16.212, lng: 77.3439 },
  { districtId: "ramanagara", id: "ramanagara-apmc", en: "Ramanagara APMC", kn: "ರಾಮನಗರ ಎಪಿಎಂಸಿ", cityEn: "Ramanagara", cityKn: "ರಾಮನಗರ", lat: 12.72, lng: 77.28 },
  { districtId: "shivamogga", id: "shivamogga-apmc", en: "Shivamogga APMC", kn: "ಶಿವಮೊಗ್ಗ ಎಪಿಎಂಸಿ", cityEn: "Shivamogga", cityKn: "ಶಿವಮೊಗ್ಗ", lat: 13.9299, lng: 75.5681 },
  { districtId: "tumakuru", id: "tumakuru-apmc", en: "Tumakuru APMC", kn: "ತುಮಕೂರು ಎಪಿಎಂಸಿ", cityEn: "Tumakuru", cityKn: "ತುಮಕೂರು", lat: 13.3392, lng: 77.1017 },
  { districtId: "udupi", id: "udupi-apmc", en: "Udupi APMC", kn: "ಉಡುಪಿ ಎಪಿಎಂಸಿ", cityEn: "Udupi", cityKn: "ಉಡುಪಿ", lat: 13.3409, lng: 74.7421 },
  { districtId: "uttara-kannada", id: "sirsi-apmc", en: "Sirsi APMC", kn: "ಸಿರ್ಸಿ ಎಪಿಎಂಸಿ", cityEn: "Sirsi", cityKn: "ಸಿರ್ಸಿ", lat: 14.6197, lng: 74.8354 },
  { districtId: "vijayanagara", id: "hosapete-apmc", en: "Hosapete APMC", kn: "ಹೊಸಪೇಟೆ ಎಪಿಎಂಸಿ", cityEn: "Hosapete", cityKn: "ಹೊಸಪೇಟೆ", lat: 15.2695, lng: 76.3909 },
  { districtId: "vijayapura", id: "vijayapura-apmc", en: "Vijayapura APMC", kn: "ವಿಜಯಪುರ ಎಪಿಎಂಸಿ", cityEn: "Vijayapura", cityKn: "ವಿಜಯಪುರ", lat: 16.8302, lng: 75.71 },
  { districtId: "yadgir", id: "yadgir-apmc", en: "Yadgir APMC", kn: "ಯಾದಗಿರಿ ಎಪಿಎಂಸಿ", cityEn: "Yadgir", cityKn: "ಯಾದಗಿರಿ", lat: 16.77, lng: 77.137 },
];

export const DISTRICTS: District[] = districtSeed.map((district) => ({
  id: district.id,
  name: {
    en: district.en,
    kn: district.kn,
  },
  region: {
    en: district.regionEn,
    kn: district.regionKn,
  },
  coordinates: {
    lat: district.lat,
    lng: district.lng,
  },
  markets: marketSeed
    .filter((market) => market.districtId === district.id)
    .map((market) => ({
      id: market.id,
      name: {
        en: market.en,
        kn: market.kn,
      },
      city: {
        en: market.cityEn,
        kn: market.cityKn,
      },
      address: `APMC yard, ${market.cityEn}, Karnataka`,
      coordinates: {
        lat: market.lat,
        lng: market.lng,
      },
      locationNote:
        "Static local directory entry. Confirm the market gate/location before travel.",
    })),
}));

const localPriceItem = (
  id: string,
  en: string,
  kn: string,
  unit: string,
): PriceItem => ({
  id,
  name: {
    en,
    kn,
  },
  unit,
});

export const AGRICULTURE_PRICE_CATEGORIES: PriceCategory[] = [
  {
    id: "cereals",
    name: {
      en: "Cereals",
      kn: "ಧಾನ್ಯಗಳು",
    },
    description: {
      en: "Staple grains and millets",
      kn: "ಮುಖ್ಯ ಧಾನ್ಯಗಳು ಮತ್ತು ಸಿರಿಧಾನ್ಯಗಳು",
    },
    items: [
      localPriceItem("rice", "Rice", "ಅಕ್ಕಿ", "₹ / quintal"),
      localPriceItem("wheat", "Wheat", "ಗೋಧಿ", "₹ / quintal"),
      localPriceItem("maize", "Maize", "ಮೆಕ್ಕೆಜೋಳ", "₹ / quintal"),
      localPriceItem("ragi", "Ragi", "ರಾಗಿ", "₹ / quintal"),
      localPriceItem("jowar", "Jowar", "ಜೋಳ", "₹ / quintal"),
      localPriceItem("bajra", "Bajra", "ಸಜ್ಜೆ", "₹ / quintal"),
    ],
  },
  {
    id: "pulses",
    name: {
      en: "Pulses",
      kn: "ಬೇಳೆಕಾಳುಗಳು",
    },
    description: {
      en: "Protein-rich pulse crops",
      kn: "ಪ್ರೋಟೀನ್ ಸಮೃದ್ಧ ಬೇಳೆ ಬೆಳೆಗಳು",
    },
    items: [
      localPriceItem("tur", "Tur / Pigeon pea", "ತೊಗರಿ", "₹ / quintal"),
      localPriceItem("bengal-gram", "Bengal gram", "ಕಡಲೆಕಾಳು", "₹ / quintal"),
      localPriceItem("black-gram", "Black gram", "ಉದ್ದಿನ ಬೇಳೆ", "₹ / quintal"),
      localPriceItem("green-gram", "Green gram", "ಹೆಸರುಕಾಳು", "₹ / quintal"),
      localPriceItem("horse-gram", "Horse gram", "ಹುರಳಿ", "₹ / quintal"),
    ],
  },
  {
    id: "oilseeds",
    name: {
      en: "Oilseeds",
      kn: "ಎಣ್ಣೆಕಾಳುಗಳು",
    },
    description: {
      en: "Oil-bearing farm produce",
      kn: "ಎಣ್ಣೆ ನೀಡುವ ಕೃಷಿ ಉತ್ಪನ್ನಗಳು",
    },
    items: [
      localPriceItem("groundnut", "Groundnut", "ಕಡಲೆಕಾಯಿ", "₹ / quintal"),
      localPriceItem(
        "sunflower",
        "Sunflower seed",
        "ಸೂರ್ಯಕಾಂತಿ ಬೀಜ",
        "₹ / quintal",
      ),
      localPriceItem("sesame", "Sesame", "ಎಳ್ಳು", "₹ / quintal"),
      localPriceItem("soybean", "Soybean", "ಸೋಯಾಬೀನ್", "₹ / quintal"),
    ],
  },
  {
    id: "vegetables",
    name: {
      en: "Vegetables",
      kn: "ತರಕಾರಿಗಳು",
    },
    description: {
      en: "Daily mandi vegetables",
      kn: "ದೈನಂದಿನ ಮಾರುಕಟ್ಟೆ ತರಕಾರಿಗಳು",
    },
    items: [
      localPriceItem("tomato", "Tomato", "ಟೊಮ್ಯಾಟೊ", "₹ / quintal"),
      localPriceItem("onion", "Onion", "ಈರುಳ್ಳಿ", "₹ / quintal"),
      localPriceItem("potato", "Potato", "ಆಲೂಗಡ್ಡೆ", "₹ / quintal"),
      localPriceItem(
        "green-chilli",
        "Green chilli",
        "ಹಸಿಮೆಣಸಿನಕಾಯಿ",
        "₹ / quintal",
      ),
      localPriceItem("brinjal", "Brinjal", "ಬದನೆಕಾಯಿ", "₹ / quintal"),
      localPriceItem("cabbage", "Cabbage", "ಎಲೆಕೋಸು", "₹ / quintal"),
    ],
  },
  {
    id: "fruits",
    name: {
      en: "Fruits",
      kn: "ಹಣ್ಣುಗಳು",
    },
    description: {
      en: "Fresh fruit market items",
      kn: "ತಾಜಾ ಹಣ್ಣು ಮಾರುಕಟ್ಟೆ ಉತ್ಪನ್ನಗಳು",
    },
    items: [
      localPriceItem("banana", "Banana", "ಬಾಳೆಹಣ್ಣು", "₹ / quintal"),
      localPriceItem("mango", "Mango", "ಮಾವು", "₹ / quintal"),
      localPriceItem("grapes", "Grapes", "ದ್ರಾಕ್ಷಿ", "₹ / quintal"),
      localPriceItem("pomegranate", "Pomegranate", "ದಾಳಿಂಬೆ", "₹ / quintal"),
      localPriceItem("papaya", "Papaya", "ಪಪ್ಪಾಯಿ", "₹ / quintal"),
    ],
  },
  {
    id: "spices",
    name: {
      en: "Spices",
      kn: "ಮಸಾಲೆ ಪದಾರ್ಥಗಳು",
    },
    description: {
      en: "Spices and condiments",
      kn: "ಮಸಾಲೆ ಮತ್ತು ಸುವಾಸನೆ ಪದಾರ್ಥಗಳು",
    },
    items: [
      localPriceItem("turmeric", "Turmeric", "ಅರಿಶಿನ", "₹ / quintal"),
      localPriceItem(
        "red-chilli",
        "Red chilli",
        "ಒಣಮೆಣಸಿನಕಾಯಿ",
        "₹ / quintal",
      ),
      localPriceItem(
        "coriander",
        "Coriander seed",
        "ಕೊತ್ತಂಬರಿ ಬೀಜ",
        "₹ / quintal",
      ),
      localPriceItem("cumin", "Cumin", "ಜೀರಿಗೆ", "₹ / quintal"),
    ],
  },
  {
    id: "commercial",
    name: {
      en: "Commercial crops",
      kn: "ವಾಣಿಜ್ಯ ಬೆಳೆಗಳು",
    },
    description: {
      en: "Large-scale commercial crops",
      kn: "ವಾಣಿಜ್ಯ ಕೃಷಿ ಬೆಳೆಗಳು",
    },
    items: [
      localPriceItem("cotton", "Cotton", "ಹತ್ತಿ", "₹ / quintal"),
      localPriceItem("sugarcane", "Sugarcane", "ಕಬ್ಬು", "₹ / tonne"),
      localPriceItem("arecanut", "Arecanut", "ಅಡಿಕೆ", "₹ / quintal"),
      localPriceItem("coffee", "Coffee", "ಕಾಫಿ", "₹ / quintal"),
    ],
  },
  {
    id: "horticulture",
    name: {
      en: "Horticultural crops",
      kn: "ತೋಟಗಾರಿಕಾ ಬೆಳೆಗಳು",
    },
    description: {
      en: "Plantation and garden produce",
      kn: "ತೋಟ ಮತ್ತು ತೋಟಗಾರಿಕಾ ಉತ್ಪನ್ನಗಳು",
    },
    items: [
      localPriceItem("coconut", "Coconut", "ತೆಂಗಿನಕಾಯಿ", "₹ / 100 nuts"),
      localPriceItem("rose", "Rose", "ಗುಲಾಬಿ", "₹ / kg"),
      localPriceItem("marigold", "Marigold", "ಚೆಂಡು ಹೂವು", "₹ / kg"),
      localPriceItem("banana-plant", "Banana plant", "ಬಾಳೆ ಸಸಿ", "₹ / plant"),
    ],
  },
  {
    id: "seeds",
    name: {
      en: "Seeds",
      kn: "ಬೀಜಗಳು",
    },
    description: {
      en: "Farm-ready seed inputs",
      kn: "ಕೃಷಿಗೆ ಬೇಕಾದ ಬೀಜ ಒಳಹರಿವು",
    },
    items: [
      localPriceItem("paddy-seed", "Paddy seed", "ಭತ್ತದ ಬೀಜ", "₹ / kg"),
      localPriceItem("ragi-seed", "Ragi seed", "ರಾಗಿ ಬೀಜ", "₹ / kg"),
      localPriceItem("cotton-seed", "Cotton seed", "ಹತ್ತಿ ಬೀಜ", "₹ / packet"),
      localPriceItem(
        "vegetable-seed",
        "Vegetable seed",
        "ತರಕಾರಿ ಬೀಜ",
        "₹ / packet",
      ),
    ],
  },
  {
    id: "fertilizers",
    name: {
      en: "Fertilizers",
      kn: "ರಸಗೊಬ್ಬರಗಳು",
    },
    description: {
      en: "Nutrients and soil inputs",
      kn: "ಪೋಷಕಾಂಶ ಮತ್ತು ಮಣ್ಣಿನ ಒಳಹರಿವು",
    },
    items: [
      localPriceItem("urea", "Urea", "ಯೂರಿಯಾ", "₹ / bag"),
      localPriceItem("dap", "DAP", "ಡಿಎಪಿ", "₹ / bag"),
      localPriceItem("mop", "MOP", "ಎಂಒಪಿ", "₹ / bag"),
      localPriceItem("npk", "NPK", "ಎನ್‌ಪಿಕೆ", "₹ / bag"),
    ],
  },
  {
    id: "crop-protection",
    name: {
      en: "Pesticides & crop protection",
      kn: "ಕೀಟನಾಶಕ ಮತ್ತು ಬೆಳೆ ರಕ್ಷಣೆ",
    },
    description: {
      en: "Pesticides, herbicides, fungicides and insecticides",
      kn: "ಕೀಟನಾಶಕ, ಕಳೆನಾಶಕ, ಶಿಲೀಂಧ್ರನಾಶಕ ಮತ್ತು ಕೀಟ ನಿಯಂತ್ರಣ",
    },
    items: [
      localPriceItem("pesticide", "Pesticide", "ಕೀಟನಾಶಕ", "₹ / litre"),
      localPriceItem("herbicide", "Herbicide", "ಕಳೆನಾಶಕ", "₹ / litre"),
      localPriceItem("fungicide", "Fungicide", "ಶಿಲೀಂಧ್ರನಾಶಕ", "₹ / litre"),
      localPriceItem(
        "insecticide",
        "Insecticide",
        "ಕೀಟನಾಶಕ ದ್ರಾವಣ",
        "₹ / litre",
      ),
    ],
  },
  {
    id: "equipment",
    name: {
      en: "Farm equipment",
      kn: "ಕೃಷಿ ಉಪಕರಣಗಳು",
    },
    description: {
      en: "Implements and machinery",
      kn: "ಕೃಷಿ ಉಪಕರಣಗಳು ಮತ್ತು ಯಂತ್ರೋಪಕರಣಗಳು",
    },
    items: [
      localPriceItem("tractor", "Tractor", "ಟ್ರ್ಯಾಕ್ಟರ್", "₹ / unit"),
      localPriceItem("power-tiller", "Power tiller", "ಪವರ್ ಟಿಲ್ಲರ್", "₹ / unit"),
      localPriceItem("sprayer", "Knapsack sprayer", "ಸ್ಪ್ರೇಯರ್", "₹ / unit"),
      localPriceItem(
        "drip-kit",
        "Drip irrigation kit",
        "ಹನಿ ನೀರಾವರಿ ಕಿಟ್",
        "₹ / kit",
      ),
    ],
  },
  {
    id: "other-inputs",
    name: {
      en: "Other farm inputs",
      kn: "ಇತರೆ ಕೃಷಿ ಒಳಹರಿವುಗಳು",
    },
    description: {
      en: "Useful supporting farm supplies",
      kn: "ಉಪಯುಕ್ತ ಕೃಷಿ ಸಹಾಯಕ ಸಾಮಗ್ರಿಗಳು",
    },
    items: [
      localPriceItem("tarpaulin", "Tarpaulin", "ಟಾರ್ಪಾಲಿನ್", "₹ / sheet"),
      localPriceItem("gunny-bag", "Gunny bag", "ಗೋಣಿ ಚೀಲ", "₹ / bag"),
      localPriceItem(
        "vermicompost",
        "Vermicompost",
        "ಎರೆಹುಳು ಗೊಬ್ಬರ",
        "₹ / kg",
      ),
      localPriceItem("mulch-film", "Mulch film", "ಮಲ್ಚ್ ಫಿಲ್ಮ್", "₹ / roll"),
    ],
  },
];

export const OTHER_PRICE_CATEGORIES: PriceCategory[] = [
  {
    id: "fuel",
    name: {
      en: "Fuel",
      kn: "ಇಂಧನ",
    },
    description: {
      en: "Everyday transport and cooking fuel",
      kn: "ದೈನಂದಿನ ಸಾರಿಗೆ ಮತ್ತು ಅಡುಗೆ ಇಂಧನ",
    },
    items: [
      localPriceItem("petrol", "Petrol", "ಪೆಟ್ರೋಲ್", "₹ / litre"),
      localPriceItem("diesel", "Diesel", "ಡೀಸೆಲ್", "₹ / litre"),
      localPriceItem("cng", "CNG", "ಸಿಎನ್‌ಜಿ", "₹ / kg"),
      localPriceItem("lpg", "LPG cylinder", "ಎಲ್‌ಪಿಜಿ ಸಿಲಿಂಡರ್", "₹ / cylinder"),
    ],
  },
  {
    id: "precious-metals",
    name: {
      en: "Gold & silver",
      kn: "ಚಿನ್ನ ಮತ್ತು ಬೆಳ್ಳಿ",
    },
    description: {
      en: "Precious metals",
      kn: "ಅಮೂಲ್ಯ ಲೋಹಗಳು",
    },
    items: [
      localPriceItem("gold-24k", "Gold 24K", "ಚಿನ್ನ 24K", "₹ / 10 g"),
      localPriceItem("gold-22k", "Gold 22K", "ಚಿನ್ನ 22K", "₹ / 10 g"),
      localPriceItem("silver", "Silver", "ಬೆಳ್ಳಿ", "₹ / kg"),
    ],
  },
  {
    id: "grocery",
    name: {
      en: "Food & grocery",
      kn: "ಆಹಾರ ಮತ್ತು ದಿನಸಿ",
    },
    description: {
      en: "Common household groceries",
      kn: "ಸಾಮಾನ್ಯ ಮನೆಯ ದಿನಸಿ ವಸ್ತುಗಳು",
    },
    items: [
      localPriceItem("grocery-rice", "Rice", "ಅಕ್ಕಿ", "₹ / kg"),
      localPriceItem("grocery-wheat", "Wheat", "ಗೋಧಿ", "₹ / kg"),
      localPriceItem("sugar", "Sugar", "ಸಕ್ಕರೆ", "₹ / kg"),
      localPriceItem("salt", "Salt", "ಉಪ್ಪು", "₹ / kg"),
      localPriceItem("cooking-oil", "Cooking oil", "ಅಡುಗೆ ಎಣ್ಣೆ", "₹ / litre"),
      localPriceItem("milk", "Milk", "ಹಾಲು", "₹ / litre"),
      localPriceItem("curd", "Curd", "ಮೊಸರು", "₹ / kg"),
      localPriceItem("eggs", "Eggs", "ಮೊಟ್ಟೆ", "₹ / dozen"),
    ],
  },
  {
    id: "construction",
    name: {
      en: "Construction materials",
      kn: "ನಿರ್ಮಾಣ ಸಾಮಗ್ರಿಗಳು",
    },
    description: {
      en: "Common building and household materials",
      kn: "ಸಾಮಾನ್ಯ ಕಟ್ಟಡ ಮತ್ತು ಮನೆಯ ಸಾಮಗ್ರಿಗಳು",
    },
    items: [
      localPriceItem("cement", "Cement", "ಸಿಮೆಂಟ್", "₹ / bag"),
      localPriceItem("steel", "Steel", "ಉಕ್ಕು", "₹ / tonne"),
      localPriceItem("sand", "Sand", "ಮರಳು", "₹ / load"),
      localPriceItem("bricks", "Bricks", "ಇಟ್ಟಿಗೆ", "₹ / 1,000"),
    ],
  },
  {
    id: "daily-use",
    name: {
      en: "Household essentials",
      kn: "ಮನೆಯ ಅಗತ್ಯ ವಸ್ತುಗಳು",
    },
    description: {
      en: "Daily-use consumer items",
      kn: "ದೈನಂದಿನ ಬಳಕೆಯ ಗ್ರಾಹಕ ವಸ್ತುಗಳು",
    },
    items: [
      localPriceItem("soap", "Bathing soap", "ಸ್ನಾನದ ಸಾಬೂನು", "₹ / bar"),
      localPriceItem("detergent", "Detergent", "ಬಟ್ಟೆ ತೊಳೆಯುವ ಪುಡಿ", "₹ / kg"),
      localPriceItem("notebook", "Notebook", "ನೋಟ್ ಪುಸ್ತಕ", "₹ / book"),
      localPriceItem("matchbox", "Matchbox", "ಬೆಂಕಿಪೆಟ್ಟಿಗೆ", "₹ / box"),
    ],
  },
];

export const FARMER_SCHEMES: Scheme[] = [
  {
    id: "pm-kisan",
    level: {
      en: "Central Government",
      kn: "ಕೇಂದ್ರ ಸರ್ಕಾರ",
    },
    name: {
      en: "PM-KISAN",
      kn: "ಪಿಎಂ-ಕಿಸಾನ್",
    },
    eligibility: {
      en: "Eligible landholding farmer families as defined by the official guidelines.",
      kn: "ಅಧಿಕೃತ ಮಾರ್ಗಸೂಚಿಯ ಪ್ರಕಾರ ಅರ್ಹ ಭೂಹಿಡುವಳಿ ರೈತ ಕುಟುಂಬಗಳು.",
    },
    benefits: {
      en: "Income support as notified by the Government of India.",
      kn: "ಭಾರತ ಸರ್ಕಾರದ ಅಧಿಸೂಚನೆಯಂತೆ ಆದಾಯ ಬೆಂಬಲ.",
    },
    documents: [
      {
        en: "Aadhaar / official identity proof",
        kn: "ಆಧಾರ್ / ಅಧಿಕೃತ ಗುರುತಿನ ದಾಖಲೆ",
      },
      {
        en: "Land record details",
        kn: "ಭೂ ದಾಖಲೆ ವಿವರಗಳು",
      },
      {
        en: "Bank account details",
        kn: "ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರಗಳು",
      },
    ],
    procedure: [
      {
        en: "Open the official PM-KISAN portal.",
        kn: "ಅಧಿಕೃತ ಪಿಎಂ-ಕಿಸಾನ್ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ.",
      },
      {
        en: "Use the official registration or status option.",
        kn: "ಅಧಿಕೃತ ನೋಂದಣಿ ಅಥವಾ ಸ್ಥಿತಿ ಆಯ್ಕೆಯನ್ನು ಬಳಸಿ.",
      },
      {
        en: "Confirm details with the concerned agriculture office.",
        kn: "ಸಂಬಂಧಿತ ಕೃಷಿ ಕಚೇರಿಯಲ್ಲಿ ವಿವರಗಳನ್ನು ದೃಢಪಡಿಸಿ.",
      },
    ],
    officialUrl: "https://pmkisan.gov.in/",
    status: OFFICIAL_UPDATE,
  },
  {
    id: "pmfby",
    level: {
      en: "Central Government",
      kn: "ಕೇಂದ್ರ ಸರ್ಕಾರ",
    },
    name: {
      en: "Pradhan Mantri Fasal Bima Yojana",
      kn: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ",
    },
    eligibility: {
      en: "Farmers and notified crops/areas covered in the applicable season notification.",
      kn: "ಅನ್ವಯಿಸುವ ಋತು ಅಧಿಸೂಚನೆಯಲ್ಲಿ ಒಳಗೊಂಡ ರೈತರು ಮತ್ತು ಬೆಳೆಗಳು/ಪ್ರದೇಶಗಳು.",
    },
    benefits: {
      en: "Crop insurance support as per the notified policy and season.",
      kn: "ಅಧಿಸೂಚಿತ ಪಾಲಿಸಿ ಮತ್ತು ಋತುವಿನ ಪ್ರಕಾರ ಬೆಳೆ ವಿಮಾ ಬೆಂಬಲ.",
    },
    documents: [
      {
        en: "Land / cultivation record",
        kn: "ಭೂಮಿ / ಬೆಳೆ ದಾಖಲೆ",
      },
      {
        en: "Bank account and identity proof",
        kn: "ಬ್ಯಾಂಕ್ ಖಾತೆ ಮತ್ತು ಗುರುತಿನ ದಾಖಲೆ",
      },
      {
        en: "Season and crop details",
        kn: "ಋತು ಮತ್ತು ಬೆಳೆ ವಿವರಗಳು",
      },
    ],
    procedure: [
      {
        en: "Check the official season notification.",
        kn: "ಅಧಿಕೃತ ಋತು ಅಧಿಸೂಚನೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
      },
      {
        en: "Contact the authorised bank, insurer or agriculture office.",
        kn: "ಅಧಿಕೃತ ಬ್ಯಾಂಕ್, ವಿಮಾ ಸಂಸ್ಥೆ ಅಥವಾ ಕೃಷಿ ಕಚೇರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      },
      {
        en: "Keep the acknowledgement for claim/status follow-up.",
        kn: "ಕ್ಲೇಮ್/ಸ್ಥಿತಿ ಪರಿಶೀಲನೆಗಾಗಿ ಸ್ವೀಕೃತಿ ಉಳಿಸಿಕೊಳ್ಳಿ.",
      },
    ],
    officialUrl: "https://pmfby.gov.in/",
    status: OFFICIAL_UPDATE,
  },
  {
    id: "kisan-credit-card",
    level: {
      en: "Central Government",
      kn: "ಕೇಂದ್ರ ಸರ್ಕಾರ",
    },
    name: {
      en: "Kisan Credit Card",
      kn: "ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್",
    },
    eligibility: {
      en: "Farmers and eligible agricultural borrowers as assessed by the lending institution.",
      kn: "ಸಾಲ ನೀಡುವ ಸಂಸ್ಥೆಯ ಮೌಲ್ಯಮಾಪನದ ಪ್ರಕಾರ ರೈತರು ಮತ್ತು ಅರ್ಹ ಕೃಷಿ ಸಾಲಗಾರರು.",
    },
    benefits: {
      en: "Agriculture working-capital credit through participating institutions.",
      kn: "ಭಾಗವಹಿಸುವ ಸಂಸ್ಥೆಗಳ ಮೂಲಕ ಕೃಷಿ ಕಾರ್ಯಾಚರಣೆ ಬಂಡವಾಳ ಸಾಲ.",
    },
    documents: [
      {
        en: "Identity and address proof",
        kn: "ಗುರುತು ಮತ್ತು ವಿಳಾಸದ ದಾಖಲೆ",
      },
      {
        en: "Land / crop details",
        kn: "ಭೂಮಿ / ಬೆಳೆ ವಿವರಗಳು",
      },
      {
        en: "Bank-required documents",
        kn: "ಬ್ಯಾಂಕ್ ಕೇಳುವ ದಾಖಲೆಗಳು",
      },
    ],
    procedure: [
      {
        en: "Approach a participating bank or financial institution.",
        kn: "ಭಾಗವಹಿಸುವ ಬ್ಯಾಂಕ್ ಅಥವಾ ಹಣಕಾಸು ಸಂಸ್ಥೆಯನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      },
      {
        en: "Submit the official application and farm details.",
        kn: "ಅಧಿಕೃತ ಅರ್ಜಿ ಮತ್ತು ಕೃಷಿ ವಿವರಗಳನ್ನು ಸಲ್ಲಿಸಿ.",
      },
      {
        en: "Ask the institution for application status.",
        kn: "ಅರ್ಜಿಯ ಸ್ಥಿತಿಯನ್ನು ಸಂಸ್ಥೆಯಲ್ಲಿ ಕೇಳಿ.",
      },
    ],
    officialUrl: "https://www.myscheme.gov.in/schemes/kcc",
    status: OFFICIAL_UPDATE,
  },
  {
    id: "soil-health-card",
    level: {
      en: "Central Government",
      kn: "ಕೇಂದ್ರ ಸರ್ಕಾರ",
    },
    name: {
      en: "Soil Health Card",
      kn: "ಮಣ್ಣು ಆರೋಗ್ಯ ಕಾರ್ಡ್",
    },
    eligibility: {
      en: "Farmers can use the programme to understand soil nutrient status for their fields.",
      kn: "ತಮ್ಮ ಜಮೀನಿನ ಮಣ್ಣಿನ ಪೋಷಕಾಂಶ ಸ್ಥಿತಿ ತಿಳಿಯಲು ರೈತರು ಈ ಕಾರ್ಯಕ್ರಮ ಬಳಸಬಹುದು.",
    },
    benefits: {
      en: "Soil test information and nutrient management guidance.",
      kn: "ಮಣ್ಣು ಪರೀಕ್ಷಾ ಮಾಹಿತಿ ಮತ್ತು ಪೋಷಕಾಂಶ ನಿರ್ವಹಣಾ ಮಾರ್ಗದರ್ಶನ.",
    },
    documents: [
      {
        en: "Farmer identity details",
        kn: "ರೈತರ ಗುರುತಿನ ವಿವರಗಳು",
      },
      {
        en: "Field / survey details",
        kn: "ಜಮೀನು / ಸರ್ವೇ ವಿವರಗಳು",
      },
    ],
    procedure: [
      {
        en: "Use the official Soil Health Card portal or local agriculture office.",
        kn: "ಅಧಿಕೃತ ಮಣ್ಣು ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಪೋರ್ಟಲ್ ಅಥವಾ ಸ್ಥಳೀಯ ಕೃಷಿ ಕಚೇರಿಯನ್ನು ಬಳಸಿ.",
      },
      {
        en: "Submit field details for soil testing.",
        kn: "ಮಣ್ಣು ಪರೀಕ್ಷೆಗೆ ಜಮೀನು ವಿವರಗಳನ್ನು ಸಲ್ಲಿಸಿ.",
      },
      {
        en: "Review the official card recommendations.",
        kn: "ಅಧಿಕೃತ ಕಾರ್ಡ್ ಶಿಫಾರಸುಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
      },
    ],
    officialUrl: "https://soilhealth.dac.gov.in/",
    status: OFFICIAL_UPDATE,
  },
  {
    id: "pm-kusum",
    level: {
      en: "Central Government",
      kn: "ಕೇಂದ್ರ ಸರ್ಕಾರ",
    },
    name: {
      en: "PM-KUSUM",
      kn: "ಪಿಎಂ-ಕುಸುಮ್",
    },
    eligibility: {
      en: "Eligibility depends on the applicable component, state implementation and official notification.",
      kn: "ಅನ್ವಯಿಸುವ ಘಟಕ, ರಾಜ್ಯ ಅನುಷ್ಠಾನ ಮತ್ತು ಅಧಿಕೃತ ಅಧಿಸೂಚನೆಯ ಮೇಲೆ ಅರ್ಹತೆ ಅವಲಂಬಿತವಾಗಿದೆ.",
    },
    benefits: {
      en: "Support for eligible solar energy and irrigation components under notified guidelines.",
      kn: "ಅಧಿಸೂಚಿತ ಮಾರ್ಗಸೂಚಿಯಡಿ ಅರ್ಹ ಸೌರಶಕ್ತಿ ಮತ್ತು ನೀರಾವರಿ ಘಟಕಗಳಿಗೆ ಬೆಂಬಲ.",
    },
    documents: [
      {
        en: "Identity and land details",
        kn: "ಗುರುತು ಮತ್ತು ಭೂಮಿ ವಿವರಗಳು",
      },
      {
        en: "Bank and electricity connection details where applicable",
        kn: "ಅನ್ವಯಿಸಿದಲ್ಲಿ ಬ್ಯಾಂಕ್ ಮತ್ತು ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ವಿವರಗಳು",
      },
    ],
    procedure: [
      {
        en: "Check the official component and state notification.",
        kn: "ಅಧಿಕೃತ ಘಟಕ ಮತ್ತು ರಾಜ್ಯ ಅಧಿಸೂಚನೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
      },
      {
        en: "Apply only through the notified official channel.",
        kn: "ಅಧಿಸೂಚಿತ ಅಧಿಕೃತ ಮಾರ್ಗದ ಮೂಲಕ ಮಾತ್ರ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.",
      },
      {
        en: "Keep the acknowledgement for status tracking.",
        kn: "ಸ್ಥಿತಿ ಪರಿಶೀಲನೆಗಾಗಿ ಸ್ವೀಕೃತಿ ಉಳಿಸಿಕೊಳ್ಳಿ.",
      },
    ],
    officialUrl: "https://pmkusum.mnre.gov.in/",
    status: OFFICIAL_UPDATE,
  },
  {
    id: "karnataka-agriculture-services",
    level: {
      en: "Karnataka Government services",
      kn: "ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಸೇವೆಗಳು",
    },
    name: {
      en: "Karnataka Agriculture Department services",
      kn: "ಕರ್ನಾಟಕ ಕೃಷಿ ಇಲಾಖೆಯ ಸೇವೆಗಳು",
    },
    eligibility: {
      en: "Eligibility differs by scheme, crop, landholding and the current Karnataka notification.",
      kn: "ಪ್ರಸ್ತುತ ಕರ್ನಾಟಕ ಅಧಿಸೂಚನೆಯ ಪ್ರಕಾರ ಯೋಜನೆ, ಬೆಳೆ ಮತ್ತು ಭೂಹಿಡುವಳಿಗೆ ಅನುಗುಣವಾಗಿ ಅರ್ಹತೆ ಬದಲಾಗುತ್ತದೆ.",
    },
    benefits: {
      en: "Access to state agriculture schemes, advisories and department services.",
      kn: "ರಾಜ್ಯ ಕೃಷಿ ಯೋಜನೆಗಳು, ಸಲಹೆಗಳು ಮತ್ತು ಇಲಾಖಾ ಸೇವೆಗಳಿಗೆ ಪ್ರವೇಶ.",
    },
    documents: [
      {
        en: "Identity proof",
        kn: "ಗುರುತಿನ ದಾಖಲೆ",
      },
      {
        en: "RTC / land and crop details where applicable",
        kn: "ಅನ್ವಯಿಸಿದಲ್ಲಿ ಆರ್‌ಟಿಸಿ / ಭೂಮಿ ಮತ್ತು ಬೆಳೆ ವಿವರಗಳು",
      },
    ],
    procedure: [
      {
        en: "Check the current official Karnataka Agriculture Department notice.",
        kn: "ಪ್ರಸ್ತುತ ಅಧಿಕೃತ ಕರ್ನಾಟಕ ಕೃಷಿ ಇಲಾಖೆಯ ಸೂಚನೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
      },
      {
        en: "Visit the nearest Raitha Samparka Kendra for local guidance.",
        kn: "ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಹತ್ತಿರದ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ.",
      },
      {
        en: "Use only the department’s published application channel.",
        kn: "ಇಲಾಖೆ ಪ್ರಕಟಿಸಿದ ಅರ್ಜಿ ಮಾರ್ಗವನ್ನೇ ಬಳಸಿ.",
      },
    ],
    officialUrl: "https://agriculture.karnataka.gov.in/",
    status: OFFICIAL_UPDATE,
  },
];

export const WEATHER_ALERT_TYPES: BilingualText[] = [
  {
    en: "Rain",
    kn: "ಮಳೆ",
  },
  {
    en: "Heavy rain",
    kn: "ಭಾರಿ ಮಳೆ",
  },
  {
    en: "Storm",
    kn: "ಬಿರುಗಾಳಿ",
  },
  {
    en: "Wind",
    kn: "ಗಾಳಿ",
  },
  {
    en: "Heat",
    kn: "ಬಿಸಿಲು",
  },
  {
    en: "Cold",
    kn: "ಚಳಿ",
  },
];
```
