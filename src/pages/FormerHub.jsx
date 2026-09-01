import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiArrowLeft,
  HiLocationMarker,
  HiSearch,
  HiRefresh,
} from "react-icons/hi";

import {
  DISTRICTS,
  AGRICULTURE_PRICE_CATEGORIES,
  OTHER_PRICE_CATEGORIES,
  FARMER_SCHEMES,
  PRICE_SOURCES,
  OFFICIAL_UPDATE,
} from "@/lib/farmerHubData";

type Lang = "en" | "kn";

const t = (value: { en: string; kn: string }, lang: Lang) =>
  value?.[lang] || value?.en || "";

const RR = (en: string, kn: string) => ({ en, kn });

const CROPS = [
  ["🌾", "Paddy", "ಭತ್ತ"],
  ["🌽", "Maize", "ಮೆಕ್ಕೆಜೋಳ"],
  ["🌱", "Ragi", "ರಾಗಿ"],
  ["🌿", "Jowar", "ಜೋಳ"],
  ["🥜", "Groundnut", "ಶೇಂಗಾ"],
  ["🫘", "Tur", "ತೊಗರಿ"],
  ["🌻", "Sunflower", "ಸೂರ್ಯಕಾಂತಿ"],
  ["🌱", "Soybean", "ಸೋಯಾಬೀನ್"],
  ["🌿", "Cotton", "ಹತ್ತಿ"],
  ["🎋", "Sugarcane", "ಕಬ್ಬು"],
  ["🌶️", "Chilli", "ಮೆಣಸಿನಕಾಯಿ"],
  ["🧅", "Onion", "ಈರುಳ್ಳಿ"],
  ["🍅", "Tomato", "ಟೊಮೆಟೊ"],
  ["🥔", "Potato", "ಆಲೂಗಡ್ಡೆ"],
];

const PESTS = [
  ["🌾", "Paddy", "Stem Borer", "ಕಾಂಡ ಕೊರೆಯುವ ಹುಳು"],
  ["🌽", "Maize", "Fall Armyworm", "ಫಾಲ್ ಆರ್ಮಿವರ್ಮ್"],
  ["🌿", "Cotton", "Pink Bollworm", "ಗುಲಾಬಿ ಕಾಯಿಕೊರೆಯುವ ಹುಳು"],
  ["🌱", "Ragi", "Aphids", "ಗಿಡಹೇನು"],
  ["🌶️", "Chilli", "Thrips", "ಥ್ರಿಪ್ಸ್"],
  ["🍅", "Tomato", "Fruit Borer", "ಹಣ್ಣು ಕೊರೆಯುವ ಹುಳು"],
];

const CALENDAR = [
  ["🌾", "Paddy", "Nursery / transplanting / crop care", "ನಾಟಿ / ಬೆಳೆ ನಿರ್ವಹಣೆ"],
  ["🌽", "Maize", "Sowing / weed management", "ಬಿತ್ತನೆ / ಕಳೆ ನಿರ್ವಹಣೆ"],
  ["🌱", "Ragi", "Sowing / nutrient management", "ಬಿತ್ತನೆ / ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆ"],
  ["🌿", "Cotton", "Sowing / pest monitoring", "ಬಿತ್ತನೆ / ಕೀಟಗಳ ಮೇಲ್ವಿಚಾರಣೆ"],
  ["🫘", "Tur", "Sowing / pest monitoring", "ಬಿತ್ತನೆ / ಕೀಟಗಳ ಮೇಲ್ವಿಚಾರಣೆ"],
  ["🥜", "Groundnut", "Sowing / disease monitoring", "ಬಿತ್ತನೆ / ರೋಗಗಳ ಮೇಲ್ವಿಚಾರಣೆ"],
];

function SectionTitle({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-4">
      <h2 className="flex items-center gap-2 text-xl font-bold text-green-900">
        <span>{icon}</span>
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
    </div>
  );
}

function FarmerHub() {
  const navigate = useNavigate();

  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem("language") as Lang) || "en";
  });

  const [activeTab, setActiveTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<any | null>(null);
  const [userLocation, setUserLocation] = useState<string>("");
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    const changeLanguage = () => {
      const current = (localStorage.getItem("language") as Lang) || "en";
      setLang(current);
    };

    window.addEventListener("langchange", changeLanguage);
    return () => window.removeEventListener("langchange", changeLanguage);
  }, []);

  const districts = DISTRICTS || [];

  const filteredDistricts = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return districts;

    return districts.filter((district: any) => {
      const districtName =
        district.name?.en?.toLowerCase?.() ||
        district.name?.toLowerCase?.() ||
        "";

      const districtKannada =
        district.name?.kn?.toLowerCase?.() || "";

      const cityMatch = (district.markets || []).some((market: any) =>
        `${market.city || ""} ${market.name?.en || ""} ${
          market.name?.kn || ""
        }`
          .toLowerCase()
          .includes(q)
      );

      return (
        districtName.includes(q) ||
        districtKannada.includes(q) ||
        cityMatch
      );
    });
  }, [districts, search]);

  const currentDistrict = districts.find(
    (d: any) => d.id === selectedDistrict
  );

  const cities = useMemo(() => {
    if (!currentDistrict) return [];

    const unique = Array.from(
      new Set(
        (currentDistrict.markets || [])
          .map((market: any) => market.city)
          .filter(Boolean)
      )
    );

    return unique;
  }, [currentDistrict]);

  const cityMarkets = useMemo(() => {
    if (!currentDistrict) return [];

    if (!selectedCity) return currentDistrict.markets || [];

    return (currentDistrict.markets || []).filter(
      (market: any) => market.city === selectedCity
    );
  }, [currentDistrict, selectedCity]);

  const allPriceCategories = [
    ...(AGRICULTURE_PRICE_CATEGORIES || []),
    ...(OTHER_PRICE_CATEGORIES || []),
  ];

  const selectDistrict = (id: string) => {
    setSelectedDistrict(id);
    setSelectedCity(null);
    setSelectedMarket(null);
    setActiveTab("market");
  };

  const selectCity = (city: string) => {
    setSelectedCity(city);
    setSelectedMarket(null);
  };

  const selectMarket = (market: any) => {
    setSelectedMarket(market);
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      alert(
        lang === "kn"
          ? "ನಿಮ್ಮ device location support ಮಾಡುವುದಿಲ್ಲ."
          : "Location is not supported on this device."
      );
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        let nearest: any = null;
        let nearestDistance = Infinity;

        districts.forEach((district: any) => {
          if (!district.coordinates) return;

          const dLat = district.coordinates.lat - latitude;
          const dLng = district.coordinates.lng - longitude;
          const distance = dLat * dLat + dLng * dLng;

          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearest = district;
          }
        });

        if (nearest) {
          setSelectedDistrict(nearest.id);
          setSelectedCity(null);
          setSelectedMarket(null);
          setUserLocation(
            t(nearest.name, lang)
          );
          setActiveTab("market");
        }

        setLocationLoading(false);
      },
      () => {
        setLocationLoading(false);
        alert(
          lang === "kn"
            ? "Location permission ನೀಡಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
            : "Please allow location permission and try again."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  const openMarketMap = (market: any) => {
    const query = market.mapQuery || `${market.name?.en || ""}, Karnataka`;

    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        query
      )}`,
      "_blank"
    );
  };

  const resetSelection = () => {
    setSelectedDistrict(null);
    setSelectedCity(null);
    setSelectedMarket(null);
    setUserLocation("");
  };

  const PriceCard = ({ category }: { category: any }) => (
    <div className="rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-2xl">{category.icon}</span>
        <h3 className="font-bold text-green-900">
          {t(category.name, lang)}
        </h3>
      </div>

      <div className="space-y-2">
        {(category.items || []).map((item: any) => (
          <div
            key={item.id || item.name?.en}
            className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2"
          >
            <span className="text-sm font-medium text-gray-800">
              {t(item.name, lang)}
            </span>

            <span className="text-xs font-semibold text-orange-600">
              {item.price
                ? item.price
                : lang === "kn"
                ? "ಲೈವ್ ಬೆಲೆ ಲೋಡ್ ಆಗಿಲ್ಲ"
                : "Live price not loaded"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const MarketMap = () => {
    const district = currentDistrict;

    if (!district) {
      return (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <HiLocationMarker className="mx-auto mb-3 text-4xl text-green-600" />
          <p className="font-semibold text-gray-700">
            {lang === "kn"
              ? "ಮೊದಲು ಒಂದು ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ."
              : "Select a district first."}
          </p>
        </div>
      );
    }

    const lat = district.coordinates?.lat;
    const lng = district.coordinates?.lng;

    const mapUrl =
      lat && lng
        ? `https://www.openstreetmap.org/export/embed.html?bbox=${
            lng - 0.25
          }%2C${lat - 0.25}%2C${lng + 0.25}%2C${
            lat + 0.25
          }&layer=mapnik&marker=${lat}%2C${lng}`
        : "";

    return (
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b p-4">
          <div>
            <h3 className="font-bold text-green-900">
              {t(district.name, lang)}
            </h3>
            <p className="text-xs text-gray-500">
              {lang === "kn"
                ? "APMC / Market Locations"
                : "APMC / Market Locations"}
            </p>
          </div>

          <button
            onClick={useMyLocation}
            disabled={locationLoading}
            className="flex items-center gap-2 rounded-xl bg-green-600 px-3 py-2 text-sm font-semibold text-white"
          >
            <HiLocationMarker />
            {locationLoading
              ? "..."
              : lang === "kn"
              ? "ನನ್ನ Location"
              : "Use My Location"}
          </button>
        </div>

        {mapUrl ? (
          <iframe
            title="Karnataka APMC Map"
            src={mapUrl}
            className="h-80 w-full border-0"
            loading="lazy"
          />
        ) : (
          <div className="flex h-80 items-center justify-center bg-gray-100">
            <p className="text-gray-500">Map unavailable</p>
          </div>
        )}

        <div className="space-y-2 p-4">
          {cityMarkets.map((market: any) => (
            <button
              key={market.id}
              onClick={() => {
                selectMarket(market);
                openMarketMap(market);
              }}
              className="flex w-full items-center justify-between rounded-xl border bg-gray-50 p-3 text-left hover:bg-green-50"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {t(market.name, lang)}
                </p>
                <p className="text-xs text-gray-500">
                  {market.city}, Karnataka
                </p>
              </div>

              <HiLocationMarker className="text-green-600" />
            </button>
          ))}
        </div>
      </div>
    );
  };

  const MarketView = () => (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-green-900">
              🌾{" "}
              {lang === "kn"
                ? "ಜಿಲ್ಲೆ → ನಗರ / ಪಟ್ಟಣ → APMC"
                : "District → City / Town → APMC"}
            </h2>
            {userLocation && (
              <p className="mt-1 text-xs text-green-600">
                📍 {userLocation}
              </p>
            )}
          </div>

          <button
            onClick={resetSelection}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <HiRefresh />
          </button>
        </div>

        <div className="relative">
          <HiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              lang === "kn"
                ? "ಜಿಲ್ಲೆ / ನಗರ / APMC ಹುಡುಕಿ..."
                : "Search district / city / APMC..."
            }
            className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-3 outline-none focus:border-green-500"
          />
        </div>
      </div>

      {!selectedDistrict ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filteredDistricts.map((district: any) => (
            <button
              key={district.id}
              onClick={() => selectDistrict(district.id)}
              className="rounded-2xl border border-green-100 bg-white p-4 text-left shadow-sm transition hover:border-green-400 hover:bg-green-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-green-900">
                    {t(district.name, lang)}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {(district.markets || []).length} APMC / Markets
                  </p>
                </div>

                <HiLocationMarker className="text-xl text-green-600" />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <>
          <button
            onClick={resetSelection}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm"
          >
            ← {lang === "kn" ? "ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು" : "All Districts"}
          </button>

          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <h3 className="mb-3 font-bold text-green-900">
              📍 {t(currentDistrict.name, lang)}
            </h3>

            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCity(null)}
                className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold ${
                  !selectedCity
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {lang === "kn" ? "ಎಲ್ಲಾ ನಗರಗಳು" : "All Cities"}
              </button>

              {cities.map((city: string) => (
                <button
                  key={city}
                  onClick={() => selectCity(city)}
                  className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold ${
                    selectedCity === city
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {selectedMarket ? (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <button
                  onClick={() => setSelectedMarket(null)}
                  className="mb-4 text-sm font-semibold text-green-700"
                >
                  ← {lang === "kn" ? "APMC List" : "APMC List"}
                </button>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-green-900">
                      {t(selectedMarket.name, lang)}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      📍 {selectedMarket.city}, Karnataka
                    </p>
                  </div>

                  <button
                    onClick={() => openMarketMap(selectedMarket)}
                    className="rounded-xl bg-green-600 px-3 py-2 text-sm font-semibold text-white"
                  >
                    🗺️ Map
                  </button>
                </div>
              </div>

              <SectionTitle
                icon="💰"
                title={
                  lang === "kn"
                    ? "ಈ APMC ಯ ಎಲ್ಲಾ ಬೆಲೆಗಳು"
                    : "All Prices for this APMC"
                }
                subtitle={
                  lang === "kn"
                    ? "ಲೈವ್ ಬೆಲೆಗಳನ್ನು ಅಧಿಕೃತ ಮೂಲಗಳಿಂದ ಮಾತ್ರ ಪಡೆಯಬೇಕು."
                    : "Live prices should come only from official sources."
                }
              />

              <div className="grid gap-4 md:grid-cols-2">
                {allPriceCategories.map((category: any) => (
                  <PriceCard
                    key={category.id || category.name?.en}
                    category={category}
                  />
                ))}
              </div>

              <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
                ⚠️{" "}
                {lang === "kn"
                  ? "ತಪ್ಪು / ಹಳೆಯ ಬೆಲೆ ತೋರಿಸುವುದಕ್ಕಿಂತ ಲೈವ್ ಅಧಿಕೃತ ಬೆಲೆ ಲಭ್ಯವಿಲ್ಲದಿದ್ದರೆ ಅದನ್ನು ಖಾಲಿ ಇಡಲಾಗಿದೆ."
                  : "Instead of showing fake or outdated prices, live prices are left blank until an official live source is connected."}
              </div>
            </div>
          ) : (
            <div className="grid gap-3">
              {cityMarkets.map((market: any) => (
                <button
                  key={market.id}
                  onClick={() => selectMarket(market)}
                  className="rounded-2xl border border-green-100 bg-white p-4 text-left shadow-sm hover:bg-green-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-green-900">
                        {t(market.name, lang)}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        📍 {market.city}, Karnataka
                      </p>
                    </div>

                    <span className="text-green-600">→</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-5">
      <div className="rounded-3xl bg-gradient-to-br from-green-700 to-green-500 p-6 text-white shadow-lg">
        <p className="text-sm opacity-90">
          {lang === "kn" ? "🌾 ರೈತರಿಗಾಗಿ" : "🌾 For Farmers"}
        </p>

        <h1 className="mt-1 text-3xl font-extrabold">
          {lang === "kn" ? "Farmer Hub" : "Farmer Hub"}
        </h1>

        <p className="mt-2 text-sm opacity-90">
          {lang === "kn"
            ? "ಮಾರುಕಟ್ಟೆ, ಬೆಲೆ, ಬೆಳೆ, ಕೀಟ, ಯೋಜನೆ ಮತ್ತು ಕೃಷಿ ಮಾಹಿತಿ ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ."
            : "Markets, prices, crops, pests, schemes and farming information in one place."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setActiveTab("market")}
          className="rounded-2xl bg-white p-4 text-left shadow-sm"
        >
          <div className="text-3xl">💰</div>
          <p className="mt-2 font-bold text-green-900">
            {lang === "kn" ? "Market Prices" : "Market Prices"}
          </p>
          <p className="text-xs text-gray-500">
            {districts.length} districts
          </p>
        </button>

        <button
          onClick={() => setActiveTab("map")}
          className="rounded-2xl bg-white p-4 text-left shadow-sm"
        >
          <div className="text-3xl">🗺️</div>
          <p className="mt-2 font-bold text-green-900">
            {lang === "kn" ? "APMC Map" : "APMC Map"}
          </p>
          <p className="text-xs text-gray-500">
            {lang === "kn" ? "ಸ್ಥಳ ಹುಡುಕಿ" : "Find locations"}
          </p>
        </button>

        <button
          onClick={() => setActiveTab("crops")}
          className="rounded-2xl bg-white p-4 text-left shadow-sm"
        >
          <div className="text-3xl">🌱</div>
          <p className="mt-2 font-bold text-green-900">
            {lang === "kn" ? "Crops" : "Crops"}
          </p>
          <p className="text-xs text-gray-500">Crop information</p>
        </button>

        <button
          onClick={() => setActiveTab("schemes")}
          className="rounded-2xl bg-white p-4 text-left shadow-sm"
        >
          <div className="text-3xl">🏛️</div>
          <p className="mt-2 font-bold text-green-900">
            {lang === "kn" ? "Schemes" : "Schemes"}
          </p>
          <p className="text-xs text-gray-500">Government schemes</p>
        </button>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h3 className="font-bold text-green-900">
          📢 {lang === "kn" ? "ಅಧಿಕೃತ ಮಾಹಿತಿ" : "Official Information"}
        </h3>

        <p className="mt-2 text-sm text-gray-600">
          {OFFICIAL_UPDATE}
        </p>
      </div>
    </div>
  );

  const CropsView = () => (
    <div>
      <SectionTitle
        icon="🌱"
        title={lang === "kn" ? "ಬೆಳೆ ಮಾಹಿತಿ" : "Crop Information"}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {CROPS.map(([icon, en, kn]) => (
          <div
            key={en}
            className="rounded-2xl bg-white p-4 text-center shadow-sm"
          >
            <div className="text-3xl">{icon}</div>
            <p className="mt-2 font-bold text-green-900">
              {lang === "kn" ? kn : en}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const PestView = () => (
    <div>
      <SectionTitle
        icon="🐛"
        title={lang === "kn" ? "ಕೀಟ ಮತ್ತು ರೋಗ ಮಾಹಿತಿ" : "Pest & Disease Guide"}
      />

      <div className="space-y-3">
        {PESTS.map(([icon, cropEn, pestEn, pestKn]) => (
          <div
            key={`${cropEn}-${pestEn}`}
            className="rounded-2xl bg-white p-4 shadow-sm"
          >
            <div className="flex gap-3">
              <span className="text-3xl">{icon}</span>
              <div>
                <p className="font-bold text-green-900">{cropEn}</p>
                <p className="text-sm text-gray-700">
                  {lang === "kn" ? pestKn : pestEn}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SchemesView = () => (
    <div>
      <SectionTitle
        icon="🏛️"
        title={lang === "kn" ? "ರೈತರ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು" : "Government Farmer Schemes"}
      />

      <div className="space-y-3">
        {(FARMER_SCHEMES || []).map((scheme: any) => (
          <div
            key={scheme.id || scheme.name?.en}
            className="rounded-2xl bg-white p-4 shadow-sm"
          >
            <h3 className="font-bold text-green-900">
              {t(scheme.name, lang)}
            </h3>

            {scheme.description && (
              <p className="mt-1 text-sm text-gray-600">
                {t(scheme.description, lang)}
              </p>
            )}

            {scheme.url && (
              <a
                href={scheme.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white"
              >
                {lang === "kn" ? "ಅಧಿಕೃತ Website" : "Official Website"} →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const CalendarView = () => (
    <div>
      <SectionTitle
        icon="📅"
        title={lang === "kn" ? "ಕೃಷಿ ಕ್ಯಾಲೆಂಡರ್" : "Crop Calendar"}
      />

      <div className="space-y-3">
        {CALENDAR.map(([icon, cropEn, actionEn, actionKn]) => (
          <div
            key={cropEn}
            className="rounded-2xl bg-white p-4 shadow-sm"
          >
            <div className="flex gap-3">
              <span className="text-3xl">{icon}</span>
              <div>
                <h3 className="font-bold text-green-900">{cropEn}</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {lang === "kn" ? actionKn : actionEn}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const HelpView = () => (
    <div className="space-y-4">
      <SectionTitle
        icon="❓"
        title={lang === "kn" ? "ಸಹಾಯ" : "Help"}
      />

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h3 className="font-bold text-green-900">
          {lang === "kn"
            ? "ಲೈವ್ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳ ಬಗ್ಗೆ"
            : "About live market prices"}
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          {lang === "kn"
            ? "ಈ Farmer Hub ನಲ್ಲಿ ತಪ್ಪು ಬೆಲೆ ತೋರಿಸದಂತೆ static/fake prices ಹಾಕಲಾಗಿಲ್ಲ. ಅಧಿಕೃತ ಕೃಷಿ ಮಾರುಕಟ್ಟೆ ಮೂಲಗಳಿಂದ live data ಲಭ್ಯವಾದಾಗ ಮಾತ್ರ ಬೆಲೆ ತೋರಿಸಬೇಕು."
            : "Fake or outdated prices are not hard-coded in Farmer Hub. Prices should be displayed only when live data is available from an official agricultural market source."}
        </p>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h3 className="font-bold text-green-900">
          {lang === "kn" ? "ಅಧಿಕೃತ Price Sources" : "Official Price Sources"}
        </h3>

        <div className="mt-3 space-y-2">
          {(PRICE_SOURCES || []).map((source: any) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-800"
            >
              {t(source.name, lang)} →
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    ["dashboard", "🏠", "Dashboard", "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್"],
    ["market", "💰", "Market", "ಮಾರುಕಟ್ಟೆ"],
    ["map", "🗺️", "Map", "ನಕ್ಷೆ"],
    ["crops", "🌱", "Crops", "ಬೆಳೆಗಳು"],
    ["pests", "🐛", "Pests", "ಕೀಟಗಳು"],
    ["schemes", "🏛️", "Schemes", "ಯೋಜನೆಗಳು"],
    ["calendar", "📅", "Calendar", "ಕ್ಯಾಲೆಂಡರ್"],
    ["help", "❓", "Help", "ಸಹಾಯ"],
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl p-2 hover:bg-gray-100"
          >
            <HiArrowLeft className="text-xl" />
          </button>

          <div className="text-center">
            <h1 className="font-extrabold text-green-800">
              🌾 Farmer Hub
            </h1>
            <p className="text-[10px] text-gray-500">
              NAMMA KARNATAKA
            </p>
          </div>

          <button
            onClick={() => {
              const next: Lang = lang === "en" ? "kn" : "en";
              setLang(next);
              localStorage.setItem("language", next);
              window.dispatchEvent(new Event("langchange"));
            }}
            className="rounded-xl bg-green-50 px-3 py-2 text-xs font-bold text-green-700"
          >
            {lang === "en" ? "ಕನ್ನಡ" : "English"}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-5 pb-28">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "market" && <MarketView />}
        {activeTab === "map" && <MarketMap />}
        {activeTab === "crops" && <CropsView />}
        {activeTab === "pests" && <PestView />}
        {activeTab === "schemes" && <SchemesView />}
        {activeTab === "calendar" && <CalendarView />}
        {activeTab === "help" && <HelpView />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 py-2">
          {tabs.map(([id, icon, en, kn]) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`min-w-[72px] rounded-xl px-2 py-2 text-center ${
                activeTab === id
                  ? "bg-green-100 text-green-800"
                  : "text-gray-500"
              }`}
            >
              <div className="text-lg">{icon}</div>
              <div className="text-[10px] font-semibold">
                {lang === "kn" ? kn : en}
              </div>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default FarmerHub;
