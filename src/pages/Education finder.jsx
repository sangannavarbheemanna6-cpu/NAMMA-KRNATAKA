
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiArrowLeft,
  HiAcademicCap,
  HiExternalLink,
  HiRefresh,
  HiSearch,
  HiX,
  HiLocationMarker,
  HiOfficeBuilding,
  HiBookOpen,
  HiFilter,
  HiChevronDown,
  HiExclamation,
  HiGlobe,
  HiMap,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

const DISTRICTS = [
  { en: "Bagalkot", kn: "ಬಾಗಲಕೋಟೆ", lat: 16.18, lng: 75.69 },
  { en: "Ballari", kn: "ಬಳ್ಳಾರಿ", lat: 15.14, lng: 76.92 },
  { en: "Belagavi", kn: "ಬೆಳಗಾವಿ", lat: 15.85, lng: 74.50 },
  { en: "Bengaluru Rural", kn: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ", lat: 13.22, lng: 77.70 },
  { en: "Bengaluru Urban", kn: "ಬೆಂಗಳೂರು ನಗರ", lat: 12.97, lng: 77.59 },
  { en: "Bidar", kn: "ಬೀದರ್", lat: 17.91, lng: 77.52 },
  { en: "Chamarajanagar", kn: "ಚಾಮರಾಜನಗರ", lat: 11.92, lng: 76.94 },
  { en: "Chikkaballapur", kn: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ", lat: 13.43, lng: 77.73 },
  { en: "Chikkamagaluru", kn: "ಚಿಕ್ಕಮಗಳೂರು", lat: 13.32, lng: 75.77 },
  { en: "Chitradurga", kn: "ಚಿತ್ರದುರ್ಗ", lat: 14.23, lng: 76.40 },
  { en: "Dakshina Kannada", kn: "ದಕ್ಷಿಣ ಕನ್ನಡ", lat: 12.87, lng: 74.88 },
  { en: "Davanagere", kn: "ದಾವಣಗೆರೆ", lat: 14.47, lng: 75.92 },
  { en: "Dharwad", kn: "ಧಾರವಾಡ", lat: 15.46, lng: 75.01 },
  { en: "Gadag", kn: "ಗದಗ", lat: 15.43, lng: 75.63 },
  { en: "Hassan", kn: "ಹಾಸನ", lat: 13.00, lng: 76.10 },
  { en: "Haveri", kn: "ಹಾವೇರಿ", lat: 14.80, lng: 75.40 },
  { en: "Kalaburagi", kn: "ಕಲಬುರಗಿ", lat: 17.33, lng: 76.83 },
  { en: "Kodagu", kn: "ಕೊಡಗು", lat: 12.42, lng: 75.74 },
  { en: "Kolar", kn: "ಕೋಲಾರ", lat: 13.14, lng: 78.13 },
  { en: "Koppal", kn: "ಕೊಪ್ಪಳ", lat: 15.35, lng: 76.15 },
  { en: "Mandya", kn: "ಮಂಡ್ಯ", lat: 12.52, lng: 76.90 },
  { en: "Mysuru", kn: "ಮೈಸೂರು", lat: 12.30, lng: 76.64 },
  { en: "Raichur", kn: "ರಾಯಚೂರು", lat: 16.21, lng: 77.35 },
  { en: "Ramanagara", kn: "ರಾಮನಗರ", lat: 12.72, lng: 77.28 },
  { en: "Shivamogga", kn: "ಶಿವಮೊಗ್ಗ", lat: 13.93, lng: 75.57 },
  { en: "Tumakuru", kn: "ತುಮಕೂರು", lat: 13.34, lng: 77.10 },
  { en: "Udupi", kn: "ಉಡುಪಿ", lat: 13.34, lng: 74.74 },
  { en: "Uttara Kannada", kn: "ಉತ್ತರ ಕನ್ನಡ", lat: 14.80, lng: 74.13 },
  { en: "Vijayanagara", kn: "ವಿಜಯನಗರ", lat: 15.27, lng: 76.39 },
  { en: "Vijayapura", kn: "ವಿಜಯಪುರ", lat: 16.83, lng: 75.71 },
  { en: "Yadgir", kn: "ಯಾದಗಿರಿ", lat: 16.77, lng: 77.14 },
];

const T = {
  en: {
    title: "Education Finder",
    subtitle: "Find schools across Karnataka",
    search: "Search school, block, village or PIN code...",
    district: "Select District",
    allDistricts: "All Districts",
    selectDistrict: "Choose a district to find schools",
    block: "Select Block / Taluk",
    allBlocks: "All Blocks",
    schoolsFound: "schools found",
    school: "School",
    village: "Village",
    blockLabel: "Block / Taluk",
    districtLabel: "District",
    pincode: "PIN Code",
    list: "List",
    map: "Map",
    results: "Results",
    noResults: "No schools found",
    noResultsDesc: "Try another search or change the filters.",
    loading: "Loading school data...",
    error: "Unable to load school data",
    retry: "Try Again",
    source: "Data source",
    sourceDesc: "School information is loaded from the education-data.json file included with this app. Verify school details with official records.",
    openMap: "View on OpenStreetMap",
    showing: "Showing",
    of: "of",
    previous: "Previous",
    next: "Next",
    page: "Page",
    clear: "Clear filters",
    mapNote: "OpenStreetMap district map. School markers appear only when verified coordinates are available.",
    selectDistrictFirst: "Select a district to view its map.",
    osm: "OpenStreetMap",
    locationUnavailable: "Exact school coordinates are not available. OpenStreetMap will search using the school's address.",
  },
  kn: {
    title: "ಶಿಕ್ಷಣ ಮಾಹಿತಿ",
    subtitle: "ಕರ್ನಾಟಕದ ಶಾಲೆಗಳನ್ನು ಹುಡುಕಿ",
    search: "ಶಾಲೆ, ಬ್ಲಾಕ್, ಗ್ರಾಮ ಅಥವಾ ಪಿನ್ ಕೋಡ್ ಹುಡುಕಿ...",
    district: "ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ",
    allDistricts: "ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು",
    selectDistrict: "ಶಾಲೆಗಳನ್ನು ಹುಡುಕಲು ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    block: "ಬ್ಲಾಕ್ / ತಾಲ್ಲೂಕು ಆಯ್ಕೆ",
    allBlocks: "ಎಲ್ಲಾ ಬ್ಲಾಕ್‌ಗಳು",
    schoolsFound: "ಶಾಲೆಗಳು ಕಂಡುಬಂದಿವೆ",
    school: "ಶಾಲೆ",
    village: "ಗ್ರಾಮ",
    blockLabel: "ಬ್ಲಾಕ್ / ತಾಲ್ಲೂಕು",
    districtLabel: "ಜಿಲ್ಲೆ",
    pincode: "ಪಿನ್ ಕೋಡ್",
    list: "ಪಟ್ಟಿ",
    map: "ನಕ್ಷೆ",
    results: "ಫಲಿತಾಂಶಗಳು",
    noResults: "ಶಾಲೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
    noResultsDesc: "ಬೇರೆ ಪದ ಬಳಸಿ ಹುಡುಕಿ ಅಥವಾ ಫಿಲ್ಟರ್ ಬದಲಾಯಿಸಿ.",
    loading: "ಶಾಲೆಗಳ ಮಾಹಿತಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    error: "ಶಾಲೆಗಳ ಮಾಹಿತಿ ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ",
    retry: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    source: "ಮಾಹಿತಿ ಮೂಲ",
    sourceDesc: "ಶಾಲೆಗಳ ಮಾಹಿತಿ ಈ ಆಪ್‌ನ education-data.json ಫೈಲ್‌ನಿಂದ ಲೋಡ್ ಆಗುತ್ತದೆ. ಅಧಿಕೃತ ದಾಖಲೆಗಳೊಂದಿಗೆ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    openMap: "OpenStreetMap ನಲ್ಲಿ ನೋಡಿ",
    showing: "ತೋರಿಸಲಾಗುತ್ತಿದೆ",
    of: "ಒಟ್ಟು",
    previous: "ಹಿಂದಿನ",
    next: "ಮುಂದಿನ",
    page: "ಪುಟ",
    clear: "ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ",
    mapNote: "OpenStreetMap ಜಿಲ್ಲೆಯ ನಕ್ಷೆ. ಪರಿಶೀಲಿಸಿದ ಶಾಲೆಯ coordinates ಲಭ್ಯವಿದ್ದಾಗ ಮಾತ್ರ school marker ಕಾಣಿಸುತ್ತದೆ.",
    selectDistrictFirst: "ನಕ್ಷೆ ನೋಡಲು ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    osm: "OpenStreetMap",
    locationUnavailable: "ಶಾಲೆಯ ನಿಖರ coordinates ಲಭ್ಯವಿಲ್ಲ. ಶಾಲೆಯ ವಿಳಾಸದ ಆಧಾರದಲ್ಲಿ OpenStreetMap ಹುಡುಕುತ್ತದೆ.",
  },
};

export default function EducationFinder() {
  const nav = useNavigate();

  const [lang, setLang] = useState(
    () => localStorage.getItem("nk_lang") || "en"
  );

  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("");
  const [block, setBlock] = useState("");
  const [showDistricts, setShowDistricts] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 50;
  const t = T[lang] || T.en;

  useEffect(() => {
    const updateLang = () => {
      setLang(localStorage.getItem("nk_lang") || "en");
    };

    window.addEventListener("langchange", updateLang);
    return () => window.removeEventListener("langchange", updateLang);
  }, []);

  const loadSchools = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("./education-data.json");

      if (!response.ok) {
        throw new Error("Failed to load education data");
      }

      const data = await response.json();

      const records = Array.isArray(data)
        ? data
        : Array.isArray(data.schools)
        ? data.schools
        : [];

      setSchools(records);
    } catch (err) {
      console.error("Education data error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSchools();
  }, [loadSchools]);

  const selectedDistrict = DISTRICTS.find(
    (d) => d.en.toLowerCase() === district.toLowerCase()
  );

  const blocks = useMemo(() => {
    if (!district) return [];

    return [
      ...new Set(
        schools
          .filter(
            (s) =>
              String(s.district || "").toLowerCase() ===
              district.toLowerCase()
          )
          .map((s) => s.block)
          .filter(Boolean)
      ),
    ].sort((a, b) => String(a).localeCompare(String(b)));
  }, [schools, district]);

  const filteredSchools = useMemo(() => {
    const q = search.trim().toLowerCase();

    return schools.filter((s) => {
      const districtMatch =
        !district ||
        String(s.district || "").toLowerCase() ===
          district.toLowerCase();

      const blockMatch =
        !block ||
        String(s.block || "").toLowerCase() ===
          block.toLowerCase();

      const searchMatch =
        !q ||
        [
          s.schoolName,
          s.district,
          s.districtKn,
          s.block,
          s.village,
          s.pincode,
          s.id,
        ].some((value) =>
          String(value || "").toLowerCase().includes(q)
        );

      return districtMatch && blockMatch && searchMatch;
    });
  }, [schools, district, block, search]);

  useEffect(() => {
    setPage(1);
  }, [district, block, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSchools.length / PAGE_SIZE)
  );

  const paginatedSchools = filteredSchools.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const selectDistrict = (name) => {
    setDistrict(name);
    setBlock("");
    setPage(1);
    setShowDistricts(false);
    setShowMap(false);
  };

  const clearFilters = () => {
    setDistrict("");
    setBlock("");
    setSearch("");
    setPage(1);
    setShowMap(false);
  };

  const districtLabel = (d) =>
    lang === "kn" ? d.kn : d.en;

  // OpenStreetMap search URL for a school.
  // This searches by address; it does not claim an exact school location.
  const getSchoolOSMUrl = (school) => {
    const query = [
      school.schoolName,
      school.village,
      school.block,
      school.district,
      "Karnataka",
      "India",
    ]
      .filter(Boolean)
      .join(", ");

    return `https://www.openstreetmap.org/search?query=${encodeURIComponent(query)}`;
  };

  // District-level OSM map.
  // Do not place a fake school marker using district coordinates.
  const getDistrictOSMUrl = () => {
    if (!selectedDistrict) return "";

    const d = selectedDistrict;

    const bbox = [
      d.lng - 0.25,
      d.lat - 0.25,
      d.lng + 0.25,
      d.lat + 0.25,
    ].join(",");

    return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik`;
  };

  const getDistrictOSMPage = () => {
    if (!selectedDistrict) return "";

    const d = selectedDistrict;

    return `https://www.openstreetmap.org/#map=10/${d.lat}/${d.lng}`;
  };

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-950 pb-10">
      <div className="max-w-5xl mx-auto px-4 py-4">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => nav("/education")}
            className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl bg-white dark:bg-gray-900 border border-pink-100 dark:border-gray-800 text-pink-600 shadow-sm active:scale-95"
            aria-label="Go back"
          >
            <HiArrowLeft size={22} />
          </button>

          <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-2xl bg-pink-100 dark:bg-pink-950 text-pink-600">
            <HiAcademicCap size={28} />
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {t.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* SEARCH */}
        <div className="relative mb-4">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500 text-xl" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.search}
            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white dark:bg-gray-900 border border-pink-100 dark:border-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-600"
              aria-label="Clear search"
            >
              <HiX size={21} />
            </button>
          )}
        </div>

        {/* DISTRICT SELECTOR */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-pink-100 dark:border-gray-800 shadow-sm mb-4 overflow-hidden">
          <button
            onClick={() => setShowDistricts(!showDistricts)}
            className="w-full flex items-center justify-between gap-3 p-4 text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950 flex items-center justify-center text-pink-600 shrink-0">
                <HiLocationMarker size={22} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t.district}
                </p>
                <p className="font-semibold text-gray-900 dark:text-white truncate">
                  {selectedDistrict
                    ? districtLabel(selectedDistrict)
                    : t.allDistricts}
                </p>
              </div>
            </div>

            <HiChevronDown
              size={22}
              className={`text-pink-500 transition-transform ${
                showDistricts ? "rotate-180" : ""
              }`}
            />
          </button>

          {showDistricts && (
            <div className="border-t border-pink-100 dark:border-gray-800 p-3">
              <button
                onClick={() => selectDistrict("")}
                className={`w-full text-left px-4 py-3 rounded-xl mb-2 text-sm font-semibold ${
                  !district
                    ? "bg-pink-600 text-white"
                    : "bg-pink-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                }`}
              >
                {t.allDistricts}
              </button>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-72 overflow-y-auto">
                {DISTRICTS.map((d) => (
                  <button
                    key={d.en}
                    onClick={() => selectDistrict(d.en)}
                    className={`px-3 py-3 rounded-xl text-sm text-left font-medium transition ${
                      district === d.en
                        ? "bg-pink-600 text-white"
                        : "bg-pink-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {districtLabel(d)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* BLOCK FILTER */}
        {district && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-pink-100 dark:border-gray-800 p-4 mb-4 shadow-sm">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              <HiOfficeBuilding className="text-pink-500" size={19} />
              {t.block}
            </label>

            <select
              value={block}
              onChange={(e) => setBlock(e.target.value)}
              className="w-full p-3 rounded-xl bg-pink-50 dark:bg-gray-800 border border-pink-100 dark:border-gray-700 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">{t.allBlocks}</option>
              {blocks.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* RESULTS + VIEW TOGGLE */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t.results}
            </p>
            <p className="text-xl font-bold text-pink-600">
              {filteredSchools.length.toLocaleString()}{" "}
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {t.schoolsFound}
              </span>
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowMap(false)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold ${
                !showMap
                  ? "bg-pink-600 text-white"
                  : "bg-white dark:bg-gray-900 border border-pink-100 dark:border-gray-800 text-gray-600 dark:text-gray-300"
              }`}
            >
              <HiBookOpen size={18} />
              {t.list}
            </button>

            <button
              onClick={() => setShowMap(true)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold ${
                showMap
                  ? "bg-pink-600 text-white"
                  : "bg-white dark:bg-gray-900 border border-pink-100 dark:border-gray-800 text-gray-600 dark:text-gray-300"
              }`}
            >
              <HiMap size={18} />
              {t.map}
            </button>
          </div>
        </div>

        {/* CLEAR FILTERS */}
        {(district || block || search) && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-sm font-semibold text-pink-600 mb-4 hover:text-pink-700"
          >
            <HiRefresh size={18} />
            {t.clear}
          </button>
        )}

        {/* OPENSTREETMAP DISTRICT MAP */}
        {showMap && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-pink-100 dark:border-gray-800 overflow-hidden shadow-sm mb-5">
            <div className="p-4">
              <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <HiMap className="text-pink-600" size={21} />
                {selectedDistrict
                  ? districtLabel(selectedDistrict)
                  : t.allDistricts}
              </h2>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t.mapNote}
              </p>
            </div>

            {selectedDistrict ? (
              <>
                <iframe
                  title="OpenStreetMap District Map"
                  src={getDistrictOSMUrl()}
                  className="w-full h-80 border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                <div className="p-4">
                  <a
                    href={getDistrictOSMPage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-pink-600 text-white px-4 py-3 rounded-xl text-sm font-semibold"
                  >
                    <HiExternalLink size={18} />
                    {t.openMap}
                  </a>
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <HiLocationMarker
                  size={32}
                  className="mx-auto mb-2 text-pink-500"
                />
                {t.selectDistrictFirst}
              </div>
            )}
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-pink-100 dark:border-gray-800 p-10 text-center">
            <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              {t.loading}
            </p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-red-200 dark:border-red-900 p-8 text-center">
            <HiExclamation
              size={38}
              className="mx-auto text-red-500 mb-3"
            />
            <p className="font-bold text-gray-900 dark:text-white mb-4">
              {t.error}
            </p>
            <button
              onClick={loadSchools}
              className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-3 rounded-xl font-semibold"
            >
              <HiRefresh size={18} />
              {t.retry}
            </button>
          </div>
        )}

        {/* SCHOOL LIST */}
        {!loading && !error && !showMap && (
          <>
            {!district && !search ? (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-pink-100 dark:border-gray-800 p-8 text-center shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-pink-100 dark:bg-pink-950 text-pink-600 flex items-center justify-center mx-auto mb-4">
                  <HiAcademicCap size={34} />
                </div>

                <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  {t.selectDistrict}
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t.subtitle}
                </p>

                <button
                  onClick={() => setShowDistricts(true)}
                  className="mt-5 bg-pink-600 text-white px-5 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
                >
                  <HiLocationMarker size={19} />
                  {t.district}
                </button>
              </div>
            ) : filteredSchools.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-pink-100 dark:border-gray-800 p-8 text-center">
                <HiSearch
                  size={36}
                  className="mx-auto text-pink-400 mb-3"
                />
                <h2 className="font-bold text-lg text-gray-900 dark:text-white">
                  {t.noResults}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {t.noResultsDesc}
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-pink-600 font-semibold"
                >
                  {t.clear}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {paginatedSchools.map((school, index) => (
                  <div
                    key={school.id || `${school.schoolName}-${index}`}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-pink-100 dark:border-gray-800 p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 shrink-0 rounded-xl bg-pink-100 dark:bg-pink-950 text-pink-600 flex items-center justify-center">
                        <HiAcademicCap size={23} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 dark:text-white leading-snug break-words">
                          {school.schoolName || "School name unavailable"}
                        </h3>

                        {school.id && (
                          <p className="text-xs text-gray-400 mt-1">
                            ID: {school.id}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      {school.district && (
                        <div className="flex items-start gap-2 text-sm">
                          <HiLocationMarker className="text-pink-500 shrink-0 mt-0.5" size={18} />
                          <div>
                            <p className="text-xs text-gray-400">
                              {t.districtLabel}
                            </p>
                            <p className="text-gray-700 dark:text-gray-200 font-medium">
                              {lang === "kn" && school.districtKn
                                ? school.districtKn
                                : school.district}
                            </p>
                          </div>
                        </div>
                      )}

                      {school.block && (
                        <div className="flex items-start gap-2 text-sm">
                          <HiOfficeBuilding className="text-pink-500 shrink-0 mt-0.5" size={18} />
                          <div>
                            <p className="text-xs text-gray-400">
                              {t.blockLabel}
                            </p>
                            <p className="text-gray-700 dark:text-gray-200 font-medium">
                              {school.block}
                            </p>
                          </div>
                        </div>
                      )}

                      {school.village && (
                        <div className="flex items-start gap-2 text-sm">
                          <HiGlobe className="text-pink-500 shrink-0 mt-0.5" size={18} />
                          <div>
                            <p className="text-xs text-gray-400">
                              {t.village}
                            </p>
                            <p className="text-gray-700 dark:text-gray-200 font-medium">
                              {school.village}
                            </p>
                          </div>
                        </div>
                      )}

                      {school.pincode && (
                        <div className="flex items-start gap-2 text-sm">
                          <HiLocationMarker className="text-pink-500 shrink-0 mt-0.5" size={18} />
                          <div>
                            <p className="text-xs text-gray-400">
                              {t.pincode}
                            </p>
                            <p className="text-gray-700 dark:text-gray-200 font-medium">
                              {school.pincode}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* OPENSTREETMAP SCHOOL SEARCH */}
                    <div className="mt-4 pt-3 border-t border-pink-50 dark:border-gray-800">
                      <a
                        href={getSchoolOSMUrl(school)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold"
                      >
                        <HiMap size={19} />
                        {t.openMap}
                        <HiExternalLink size={16} />
                      </a>

                      <p className="text-xs text-gray-400 mt-2">
                        {t.locationUnavailable}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PAGINATION */}
            {filteredSchools.length > PAGE_SIZE && (
              <div className="flex flex-wrap items-center justify-between gap-3 mt-5 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-pink-100 dark:border-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t.showing}{" "}
                  {(page - 1) * PAGE_SIZE + 1}-
                  {Math.min(page * PAGE_SIZE, filteredSchools.length)}{" "}
                  {t.of} {filteredSchools.length}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="w-10 h-10 rounded-xl border border-pink-100 dark:border-gray-700 flex items-center justify-center text-pink-600 disabled:opacity-30"
                    aria-label="Previous page"
                  >
                    <HiChevronLeft size={22} />
                  </button>

                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 px-2">
                    {t.page} {page} / {totalPages}
                  </span>

                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="w-10 h-10 rounded-xl border border-pink-100 dark:border-gray-700 flex items-center justify-center text-pink-600 disabled:opacity-30"
                    aria-label="Next page"
                  >
                    <HiChevronRight size={22} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* DATA SOURCE */}
        <div className="mt-6 p-4 rounded-2xl bg-pink-100 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-900">
          <div className="flex items-start gap-3">
            <HiFilter size={22} className="text-pink-600 shrink-0 mt-0.5" />

            <div>
              <h3 className="font-bold text-pink-800 dark:text-pink-300 text-sm">
                {t.source}
              </h3>
              <p className="text-xs leading-relaxed text-pink-700 dark:text-pink-200 mt-1">
                {t.sourceDesc}
              </p>
              <p className="text-xs font-semibold text-pink-700 dark:text-pink-300 mt-2">
                © OpenStreetMap contributors
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
