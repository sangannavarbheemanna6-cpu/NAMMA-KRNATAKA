import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiArrowLeft, HiSearch, HiX, HiLocationMarker, HiMap,
  HiShare, HiClock, HiCash, HiGlobe, HiSparkles, HiHeart,
  HiArrowRight, HiBookmark, HiCalendar
} from "react-icons/hi";
import { cats, places } from "../data/tourismData.js";

// ============================================================
// KARNATAKA TOURISM PAGE — NAMMA KARNATAKA
// ============================================================

var FAV_KEY = "nkt_favs";

function loadFavs() {
  try { return JSON.parse(localStorage.getItem(FAV_KEY) || "[]"); }
  catch (e) { return []; }
}

function haversine(lat1, lon1, lat2, lon2) {
  var R = 6371;
  var dLat = (lat2 - lat1) * Math.PI / 180;
  var dLon = (lon2 - lon1) * Math.PI / 180;
  var a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function fmtDist(km) {
  if (!km && km !== 0) return "";
  if (km < 1) return Math.round(km * 1000) + "m";
  if (km < 10) return km.toFixed(1) + " km";
  return Math.round(km) + " km";
}

function osmEmbedUrl(lat, lon) {
  var b = 0.008;
  return "https://www.openstreetmap.org/export/embed.html?bbox=" +
    (lon - b) + "%2C" + (lat - b * 0.6) + "%2C" + (lon + b) + "%2C" + (lat + b * 0.6) +
    "&layer=mapnik&marker=" + lat + "%2C" + lon;
}

function osmDirectionsUrl(lat, lon, flat, flon) {
  var base = "https://www.openstreetmap.org/directions?to=" + lat + "%2C" + lon;
  if (flat && flon) base += "&from=" + flat + "%2C" + flon;
  return base;
}

// Featured places (hand-picked)
function osmMapUrl(lat, lon, zoom) {
  return "https://www.openstreetmap.org/?mlat=" + lat + "&mlon=" + lon + "&zoom=" + (zoom || 15);
}

function getPlaceImage(p) {
  if (p.img && p.img.length > 10) return p.img;
  return "https://staticmap.openstreetmap.de/staticmap.php?center=" + p.lat + "," + p.lon + "&zoom=" + (p.zoom - 2 || 12) + "&size=640x360&maptype=mapnik&markers=" + p.lat + "," + p.lon + ",red-pushpin";
}

var FEATURED_IDS = ["hampi", "mysore", "coorg", "jog", "badami", "bandipur"];

// Nearby search categories
var nearbyGroups = [
  { label: "Emergency", labelK: "ತುರ್ತು", cats: [
    { id: "hospital", e: "Hospitals", k: "ಆಸ್ಪತ್ರೆ", i: "🏥", q: "hospital" },
    { id: "police", e: "Police", k: "ಪೊಲೀಸ್", i: "🚓", q: "police station" },
    { id: "fire", e: "Fire", k: "ಅಗ್ನಿಶಾಮಕ", i: "🚒", q: "fire station" },
    { id: "pharmacy", e: "Pharmacy", k: "ಔಷಧಾಲಯ", i: "💊", q: "pharmacy" }
  ]},
  { label: "Stay & Food", labelK: "ವಸತಿ & ಊಟ", cats: [
    { id: "hotel", e: "Hotels", k: "ಹೋಟೆಲ್", i: "🏨", q: "hotel" },
    { id: "lodge", e: "Lodges", k: "ಲಾಡ್ಜ್", i: "🛏️", q: "lodging" },
    { id: "restaurant", e: "Food", k: "ಊಟ", i: "🍽️", q: "restaurant" },
    { id: "cafe", e: "Cafes", k: "ಕೆಫೆ", i: "☕", q: "cafe" }
  ]},
  { label: "Travel", labelK: "ಪ್ರಯಾಣ", cats: [
    { id: "bus", e: "Bus", k: "ಬಸ್", i: "🚌", q: "bus stop" },
    { id: "railway", e: "Railway", k: "ರೈಲು", i: "🚉", q: "railway station" },
    { id: "fuel", e: "Petrol", k: "ಪೆಟ್ರೋಲ್", i: "⛽", q: "petrol pump" },
    { id: "parking", e: "Parking", k: "ಪಾರ್ಕಿಂಗ್", i: "🅿️", q: "parking" }
  ]},
  { label: "Explore", labelK: "ಅನ್ವೇಷಣೆ", cats: [
    { id: "tourism", e: "Attractions", k: "ಆಕರ್ಷಣೆ", i: "🏞️", q: "tourism attraction" },
    { id: "temple", e: "Temples", k: "ದೇವಾಲಯ", i: "🛕", q: "temple" },
    { id: "museum", e: "Museums", k: "ಮ್ಯೂಸಿಯಂ", i: "🏛️", q: "museum" },
    { id: "viewpoint", e: "Viewpoints", k: "ವೀಕ್ಷಣಾ", i: "🌄", q: "viewpoint" }
  ]}
];

var allNearbyCats = [];
nearbyGroups.forEach(function(g) { allNearbyCats = allNearbyCats.concat(g.cats); });

// Category display list
var displayCats = [
  { id: "featured", e: "⭐ Featured", k: "⭐ ವೈಶಿಷ್ಟ್ಯ", i: "⭐" },
  { id: "all", e: "🏞️ All 47 Places", k: "🏞️ ಎಲ್ಲಾ 47 ಸ್ಥಳ", i: "🏞️" }
].concat(cats.map(function (c) {
  return { id: c.id, e: c.i + " " + c.e, k: c.i + " " + c.k, i: c.i };
}));

export default function Tourism() {
  var nav = useNavigate();

  // Language support
  var [lg, setLg] = useState(function () {
    try { return localStorage.getItem("nk_lang") || "bi"; }
    catch (e) { return "bi"; }
  });
  var T = function (e, k) {
    if (lg === "en") return e;
    if (lg === "kn") return k;
    return e + " | " + k;
  };

  // State
  var [query, setQuery] = useState("");
  var [activeCat, setActiveCat] = useState("featured");
  var [favorites, setFavorites] = useState(loadFavs);
  var [trips, setTrips] = useState(function () {
    try { return JSON.parse(localStorage.getItem("nkt_trips") || "[]"); }
    catch (e) { return []; }
  });
  var [imgErrors, setImgErrors] = useState({});
  var [selected, setSelected] = useState(null);
  var [showFavsOnly, setShowFavsOnly] = useState(false);
  var [sortByDist, setSortByDist] = useState(false);

  // Location — with reverse geocode and manual search
  var [myLoc, setMyLoc] = useState(null);
  var [locLoading, setLocLoading] = useState(false);
  var [locError, setLocError] = useState(null);
  var [locName, setLocName] = useState("");
  var [manualLocQuery, setManualLocQuery] = useState("");
  var [manualLocLoading, setManualLocLoading] = useState(false);
  var [showNearbyFromMe, setShowNearbyFromMe] = useState(false);

  // OSM Broad Search — real-time Nominatim search across Karnataka
  var [osmResults, setOsmResults] = useState([]);
  var [osmLoading, setOsmLoading] = useState(false);
  var [osmError, setOsmError] = useState(null);
  var [searchMode, setSearchMode] = useState("builtin"); // "builtin" | "osm" | "both"
  var [osmSearchQuery, setOsmSearchQuery] = useState("");
  var debounceRef = useRef(null);

  // Nearby search
  var [nearbyResults, setNearbyResults] = useState([]);
  var [nearbyLoading, setNearbyLoading] = useState(false);
  var [nearbyError, setNearbyError] = useState(null);
  var [showNearby, setShowNearby] = useState(false);
  var [activeNearby, setActiveNearby] = useState("");

  // Dark mode detection
  var [dark, setDark] = useState(function () {
    return document.documentElement.classList.contains("dark");
  });

  useEffect(function () {
    var h = function (e) { setLg(e.detail); };
    window.addEventListener("langchange", h);
    return function () { window.removeEventListener("langchange", h); };
  }, []);

  // Geolocation — request GPS with clear permission flow and reverse geocode
  function getLocation() {
    setLocLoading(true);
    setLocError(null);
    setLocName("");
    if (!navigator.geolocation) {
      setLocError({ type: "unsupported", msg: T("GPS not supported. Try searching your city below. This works without GPS.","GPS ಬೆಂಬಲವಿಲ್ಲ. ಕೆಳಗೆ ನಿಮ್ಮ ನಗರವನ್ನು ಹುಡುಕಿ.") });
      setLocLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        var lat = pos.coords.latitude;
        var lon = pos.coords.longitude;
        setMyLoc({ lat: lat, lon: lon });
        setLocLoading(false);
        setSortByDist(true);
        // Reverse geocode to get location name
        fetch("https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat + "&lon=" + lon + "&zoom=12", { headers: { "User-Agent": "NAMMA-KARNATAKA/1.0" } })
          .then(function (r) { return r.json(); })
          .then(function (d) { if (d && d.display_name) setLocName(d.display_name.split(",")[0]); })
          .catch(function () {});
      },
      function (err) {
        if (err.code === 1) {
          setLocError({ type: "denied", msg: T("📍 Location access was denied.\n• Mobile: Settings → Site Settings → Location → Allow\n• Or search your city/town below — no GPS needed","📍 ಸ್ಥಳ ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ.\n• ಮೊಬೈಲ್: ಸೆಟ್ಟಿಂಗ್ಸ್ → ಸೈಟ್ ಸೆಟ್ಟಿಂಗ್ಸ್ → ಸ್ಥಳ → ಅನುಮತಿಸಿ\n• ಅಥವಾ ಕೆಳಗೆ ನಿಮ್ಮ ನಗರ ಹುಡುಕಿ — GPS ಅಗತ್ಯವಿಲ್ಲ") });
        } else if (err.code === 2) {
          setLocError({ type: "unavailable", msg: T("Location unavailable. Check GPS is enabled and try again.","ಸ್ಥಳ ಲಭ್ಯವಿಲ್ಲ. GPS ಸಕ್ರಿಯವಾಗಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ.") });
        } else {
          setLocError({ type: "timeout", msg: T("Request timed out. Please try again or search manually below.","ವಿನಂತಿಯ ಕಾಲಾವಧಿ ಮೀರಿದೆ. ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.") });
        }
        setLocLoading(false);
        setMyLoc(null);
      },
      { timeout: 15000, maximumAge: 300000, enableHighAccuracy: true }
    );
  }

  // Manual location search via Nominatim — works without GPS
  function searchManualLocation() {
    var q = manualLocQuery.trim();
    if (!q || q.length < 2) return;
    setManualLocLoading(true);
    setLocError(null);
    var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + encodeURIComponent(q + ", Karnataka, India");
    fetch(url, { headers: { "User-Agent": "NAMMA-KARNATAKA/1.0" } })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        setManualLocLoading(false);
        if (!data || data.length === 0) {
          setLocError({ type: "notfound", msg: T("Location not found. Try a nearby town or district.","ಸ್ಥಳ ಕಂಡುಬಂದಿಲ್ಲ. ಹತ್ತಿರದ ಪಟ್ಟಣ/ಜಿಲ್ಲೆ ಪ್ರಯತ್ನಿಸಿ.") });
          return;
        }
        var r = data[0];
        var lat = parseFloat(r.lat);
        var lon = parseFloat(r.lon);
        setMyLoc({ lat: lat, lon: lon });
        setLocName(r.display_name ? r.display_name.split(",")[0] : q);
        setSortByDist(true);
        setManualLocQuery("");
      })
      .catch(function () {
        setManualLocLoading(false);
        setLocError({ type: "network", msg: T("Could not search. Check your internet connection.","ಹುಡುಕಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.") });
      });
  }

  function clearLocation() {
    setMyLoc(null); setSortByDist(false); setLocName("");
    setShowNearbyFromMe(false); setLocError(null);
    setNearbyResults([]);
  }

  function fetchNearbyFromMe(cat) {
    if (!myLoc) return;
    setShowNearby(true);
    setShowNearbyFromMe(true);
    fetchNearby(cat.q, myLoc.lat, myLoc.lon);
    setActiveNearby(cat.id);
  }

  // Fetch nearby services via Nominatim
  function fetchNearby(query, lat, lon) {
    if (!query || !lat || !lon) return;
    setNearbyLoading(true);
    setNearbyError(null);
    setNearbyResults([]);

    var url = "https://nominatim.openstreetmap.org/search?format=json&limit=12&q=" +
      encodeURIComponent(query) + "&lat=" + lat + "&lon=" + lon + "&bounded=1";
    fetch(url, { headers: { "User-Agent": "NAMMA-KARNATAKA/1.0" } })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var results = [];
        (data || []).forEach(function (item) {
          var name = item.display_name ? item.display_name.split(",")[0] : (item.name || "");
          if (name && name.length > 1) {
            results.push({
              e: name,
              type: item.type || "",
              d: haversine(lat, lon, parseFloat(item.lat), parseFloat(item.lon)),
              lat: parseFloat(item.lat),
              lon: parseFloat(item.lon),
              maps: "https://www.openstreetmap.org/?mlat=" + item.lat + "&mlon=" + item.lon + "&zoom=16"
            });
          }
        });
        setNearbyLoading(false);
        setNearbyResults(results);
        if (results.length === 0) setNearbyError("Nearby information is currently unavailable");
      })
      .catch(function () {
        setNearbyLoading(false);
        setNearbyError("Nearby information is currently unavailable");
      });
  }

  function handleNearbyClick(cat) {
    if (selected) {
      fetchNearby(cat.q, selected.lat, selected.lon);
      setShowNearby(true);
      setActiveNearby(cat.id);
    }
  }

  // OSM Broad Search — search all Karnataka tourism via Nominatim
  // Uses curated tourism-specific queries for high-quality results
  function searchAllKarnataka(q) {
    var term = (q || "").trim();
    if (!term || term.length < 2) {
      setOsmResults([]);
      setOsmError(null);
      setSearchMode("builtin");
      return;
    }
    setSearchMode("both");
    setOsmSearchQuery(term);
    setOsmLoading(true);
    setOsmError(null);

    // Detect Kannada input — use broader tourism search
    var isKannada = /[\u0C80-\u0CFF]/.test(term);

    // Build OSM tourism queries — try multiple to get best coverage
    var queries = isKannada
      ? [encodeURIComponent(term + " Karnataka")]
      : [
          encodeURIComponent(term + " Karnataka"),
          encodeURIComponent(term)
        ];

    // Try bounded search first (within KA), then unbounded fallback
    var baseParams = "&format=json&limit=20&bounded=1&viewbox=73.8,11.5,78.5,18.5";
    var baseParamsOpen = "&format=json&limit=20";
    var qIdx = 0;

    function tryNextUrl() {
      if (qIdx >= queries.length) {
        return Promise.resolve([]);
      }
      var params = baseParams;
      var url = "https://nominatim.openstreetmap.org/search?q=" + queries[qIdx] + params;
      return fetch(url, { headers: { "User-Agent": "NAMMA-KARNATAKA/1.0" } })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (!data || data.length === 0) {
            qIdx++;
            // Try unbounded on second attempt
            if (qIdx === 1 && data && data.length === 0) params = baseParamsOpen;
            return tryNextUrl();
          }
          return data;
        });
    }

    tryNextUrl()
      .then(function (data) {
        if (!data || data.length === 0) {
          setOsmLoading(false);
          setOsmError("No verified tourism place found");
          setOsmResults([]);
          return;
        }
        var results = [];
        data.forEach(function (item) {
          var name = item.display_name ? item.display_name.split(",")[0].trim() : (item.name || "");
          var fullAddr = item.display_name || "";
          // Skip non-tourism or too generic results
          if (!name || name.length < 2) return;
          // Extract district from address
          var parts = fullAddr.split(",");
          var district = "";
          for (var i = 0; i < parts.length; i++) {
            var p = parts[i].trim();
            if (p.toLowerCase().indexOf("district") >= 0 || p.toLowerCase().indexOf("taluk") >= 0) {
              district = p;
              break;
            }
          }
          var lat = parseFloat(item.lat);
          var lon = parseFloat(item.lon);
          results.push({
            p: "osm_" + (item.osm_id || Math.random()),
            e: name,
            k: "",
            d: district || "Karnataka",
            t: (item.type || "attraction").replace(/_/g, " "),
            tal: "",
            i: item.type === "waterfall" ? "💧" : item.type === "temple" ? "🛕" : item.type === "fort" ? "🏰" : item.type === "beach" ? "🏖️" : item.class === "tourism" ? "🏞️" : "📍",
            lat: lat,
            lon: lon,
            zoom: 15,
            desc: fullAddr.split(",").slice(0, 3).join(", "),
            descK: "",
            imp: "",
            impK: "",
            best: "",
            fee: "",
            hrs: "",
            tags: [],
            nearby: [],
            featured: false,
            img: "",
            maps: "https://www.openstreetmap.org/?mlat=" + lat + "&mlon=" + lon + "&zoom=15",
            isOSM: true
          });
        });
        setOsmLoading(false);
        setOsmResults(results);
        if (results.length === 0) {
          setOsmError("No verified tourism place found");
        }
      })
      .catch(function () {
        setOsmLoading(false);
        setOsmError("Search unavailable. Please try again.");
      });
  }

  // Debounced OSM search — triggers when user types
  useEffect(function () {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    var q = query.trim();
    if (q && q.length >= 2) {
      debounceRef.current = setTimeout(function () {
        searchAllKarnataka(q);
      }, 600);
    } else {
      setOsmResults([]);
      setOsmError(null);
      setSearchMode("builtin");
    }
    return function () {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // Favorites
  function toggleFav(id) {
    var next = favorites.includes(id)
      ? favorites.filter(function (f) { return f !== id; })
      : [id].concat(favorites);
    setFavorites(next);
    try { localStorage.setItem(FAV_KEY, JSON.stringify(next)); } catch (e) { }
  }

  // Trip Planning
  function toggleTrip(id) {
    var next = trips.includes(id)
      ? trips.filter(function (f) { return f !== id; })
      : [id].concat(trips);
    setTrips(next);
    try { localStorage.setItem(TRIP_KEY, JSON.stringify(next)); } catch (e) { }
  }

  // Filter & sort — with OSM broad search merging
  var filtered = useMemo(function () {
    var result = [].concat(places);

    // Featured / Category filter — only for builtin mode
    if (activeCat === "featured") {
      result = result.filter(function (p) { return FEATURED_IDS.includes(p.p); });
    } else if (activeCat !== "all" && activeCat !== "search") {
      result = result.filter(function (p) { return p.t === activeCat; });
    }

    // Favorites only
    if (showFavsOnly) {
      result = result.filter(function (p) { return favorites.includes(p.p); });
    }

    // Search built-in places
    var q = query.toLowerCase().trim();
    if (q) {
      result = result.filter(function (p) {
        return p.e.toLowerCase().includes(q) ||
          p.k.includes(q) ||
          p.d.toLowerCase().includes(q) ||
          p.t.toLowerCase().includes(q) ||
          (p.tags || []).some(function (t) { return t.toLowerCase().includes(q); });
      });
    }

    // Merge OSM search results when in "both" or "osm" mode and no specific category
    if ((searchMode === "both" || searchMode === "osm") && q && q.length >= 2 && (activeCat === "all" || activeCat === "featured")) {
      // Add OSM results that aren't duplicates of built-in
      var existingNames = {};
      result.forEach(function (p) { existingNames[p.e.toLowerCase()] = true; });
      osmResults.forEach(function (p) {
        if (!existingNames[p.e.toLowerCase()]) {
          result.push(p);
        }
      });
    }

    // Sort by distance
    if (myLoc && sortByDist) {
      result.forEach(function (p) {
        if (p._dist === undefined) p._dist = haversine(myLoc.lat, myLoc.lon, p.lat, p.lon);
      });
      result.sort(function (a, b) { return (a._dist || 0) - (b._dist || 0); });
    }

    return result;
  }, [activeCat, query, showFavsOnly, myLoc, sortByDist, osmResults, searchMode]);

  return (
    <div className="max-w-4xl mx-auto px-3 py-3 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={function () { nav("/"); }}
          className="w-9 h-9 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <HiArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            🏞️ {T("Karnataka Tourism", "ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮ")}
          </h1>
          <p className="text-[10px] text-gray-400 dark:text-gray-500">
            {places.length} {T("verified places · Search all KA via OSM", "ಪರಿಶೀಲಿತ ಸ್ಥಳಗಳು · OSM ಮೂಲಕ ಹುಡುಕಿ")}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-3">
        <HiSearch className="absolute left-3.5 top-3 text-gray-400" size={16} />
        <input
          value={query}
          onChange={function (e) { setQuery(e.target.value); if (activeCat !== "all" && activeCat !== "featured") setActiveCat("all"); }}
          placeholder={T("🔎 Search across Karnataka — name, district, category...","🔎 ಕರ್ನಾಟಕದಾದ್ಯಂತ ಹುಡುಕಿ — ಹೆಸರು, ಜಿಲ್ಲೆ, ವರ್ಗ...")}
          className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
        />
        <div className="absolute right-1.5 top-1.5 flex items-center gap-1">
          {osmLoading && query.length >= 2 ? (
            <span className="px-2 py-1 text-[10px] text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </span>
          ) : query.length >= 2 && osmResults.length > 0 && searchMode === "both" ? (
            <span className="px-2 py-1 text-[10px] text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 rounded-lg">
              +{osmResults.length} {T("found","ಸಿಕ್ಕಿದೆ")}
            </span>
          ) : null}
          {query && (
            <button onClick={function(){setQuery("");setOsmResults([]);setSearchMode("builtin")}} className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <HiX size={14} />
            </button>
          )}
        </div>
      </div>

      {/* OSM Search info banner */}
      {query.length >= 2 && osmResults.length > 0 && searchMode === "both" && (
        <div className="mb-2 flex items-center gap-2 text-[10px] bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg px-3 py-1.5">
          <span>🌐</span>
          <span className="text-blue-600 dark:text-blue-400">
            {T("Searching all Karnataka via OpenStreetMap","OpenStreetMap ಮೂಲಕ ಕರ್ನಾಟಕದಾದ್ಯಂತ ಹುಡುಕಲಾಗುತ್ತಿದೆ")}
            {osmResults.length > 0 ? " · +" + osmResults.length + T(" results"," ಫಲಿತಾಂಶಗಳು") : ""}
          </span>
        </div>
      )}

      {/* OSM search error */}
      {osmError && query.length >= 2 && (
        <div className="mb-2 text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/10 rounded-lg px-3 py-1.5">
          {T(osmError, "ಹುಡುಕಾಟ ಫಲಿತಾಂಶ ಲಭ್ಯವಿಲ್ಲ")}
        </div>
      )}

      {/* Location + Controls Bar */}
      <div className="flex gap-2 mb-3">
        {myLoc ? (
          <div className="flex-1 flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-3 py-2 overflow-hidden">
            <span className="text-lg flex-shrink-0">📍</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-green-700 dark:text-green-300 truncate">{locName || T("Your Location","ನಿಮ್ಮ ಸ್ಥಳ")}</p>
              <p className="text-[10px] text-green-600 dark:text-green-400">{myLoc.lat.toFixed(4)}, {myLoc.lon.toFixed(4)}</p>
            </div>
            <button onClick={clearLocation} className="text-green-600 hover:text-green-800 flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
              <HiX size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={getLocation}
            disabled={locLoading}
            className={
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all " +
              (locLoading
                ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-wait"
                : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 active:scale-95 shadow-md shadow-blue-500/20")
            }
          >
            {locLoading ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> {T("Finding...","ಹುಡುಕಲಾಗುತ್ತಿದೆ...")}</>
            ) : (
              <><span className="text-lg">📍</span> {T("Use My Location","ನನ್ನ ಸ್ಥಳ ಬಳಸಿ")}</>
            )}
          </button>
        )}
        <button
          onClick={function () { setShowFavsOnly(!showFavsOnly); }}
          className={
            "px-3 rounded-xl text-sm font-medium transition-all " +
            (showFavsOnly
              ? "bg-yellow-500 text-white shadow-sm"
              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600")
          }
          title={T("Show favorites only", "ಮೆಚ್ಚಿನವುಗಳು ಮಾತ್ರ")}
        >
          {showFavsOnly ? "⭐" : "☆"}
        </button>
        <button
          onClick={function () { setSortByDist(!sortByDist); }}
          disabled={!myLoc}
          className={
            "px-2.5 rounded-xl text-xs font-medium transition-all " +
            (sortByDist && myLoc
              ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
              : "bg-gray-100 dark:bg-gray-700 text-gray-400")
          }
          title={T("Sort by distance", "ದೂರದ ಪ್ರಕಾರ")}
        >
          {T("Near","ಹತ್ತಿರ")}
        </button>
      </div>

      {/* Location Error with action tips */}
      {locError && (
        <div className="mb-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-3 py-2.5">
          <div className="flex items-start gap-2">
            <span className="text-amber-500 text-sm mt-0.5">⚠️</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-amber-700 dark:text-amber-300 whitespace-pre-line leading-relaxed">{typeof locError === "object" ? locError.msg : locError}</p>
              {locError && locError.type === "denied" && (
                <button onClick={getLocation} className="mt-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 underline">
                  {T("↻ Try GPS again","↻ GPS ಪುನಃ ಪ್ರಯತ್ನಿಸಿ")}
                </button>
              )}
            </div>
            <button onClick={function(){setLocError(null)}} className="text-amber-400 hover:text-amber-600 flex-shrink-0"><HiX size={14}/></button>
          </div>
        </div>
      )}

      {/* Manual Location Search — visible when no GPS location */}
      {!myLoc && (
        <div className="relative mb-3">
          <HiSearch className="absolute left-3.5 top-3 text-gray-400" size={15} />
          <input
            value={manualLocQuery}
            onChange={function (e) { setManualLocQuery(e.target.value); }}
            onKeyDown={function (e) { if (e.key === "Enter") searchManualLocation(); }}
            placeholder={T("🔎 Search your city, town or district...","🔎 ನಿಮ್ಮ ನಗರ, ಪಟ್ಟಣ ಅಥವಾ ಜಿಲ್ಲೆ ಹುಡುಕಿ...")}
            className="w-full pl-10 pr-20 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            onClick={searchManualLocation}
            disabled={manualLocLoading || manualLocQuery.trim().length < 2}
            className={
              "absolute right-1.5 top-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all " +
              (manualLocLoading || manualLocQuery.trim().length < 2
                ? "bg-gray-100 dark:bg-gray-700 text-gray-400"
                : "bg-primary-600 text-white hover:bg-primary-700")
            }
          >
            {manualLocLoading ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              T("Search","ಹುಡುಕಿ")
            )}
          </button>
        </div>
      )}

      {/* Distance sort indicator + Near Me quick actions */}
      {myLoc && sortByDist && filtered.length > 0 && (
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-primary-600 dark:text-primary-400">
            <HiLocationMarker size={10} />
            <span>{T("Sorted: Nearest first","ಹತ್ತಿರದಿಂದ")} · {filtered.length} {T("places","ಸ್ಥಳ")}</span>
          </div>
          <div className="flex gap-1">
            <button onClick={function(){fetchNearbyFromMe({id:"tourism",q:"tourism attraction"})}} className="text-[9px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
              🏞️ {T("Near me","ಹತ್ತಿರ")}
            </button>
            <button onClick={function(){fetchNearbyFromMe({id:"hospital",q:"hospital"})}} className="text-[9px] bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-1 rounded-full font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
              🏥 {T("Near me","ಹತ್ತಿರ")}
            </button>
          </div>
        </div>
      )}

      {/* Nearby From My Location Results Panel */}
      {showNearbyFromMe && myLoc && (
        <div className="mb-3 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-3 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-700 dark:text-gray-200">
              📍 {T("Near: ","ಹತ್ತಿರ: ")}{locName || T("My Location","ನನ್ನ ಸ್ಥಳ")}
            </p>
            <button onClick={function(){setShowNearbyFromMe(false);setNearbyResults([])}} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><HiX size={14}/></button>
          </div>
          {nearbyLoading ? (
            <div className="text-center py-3"><div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"/><p className="text-[10px] text-gray-400 mt-1">{T("Searching nearby...","ಹುಡುಕಲಾಗುತ್ತಿದೆ...")}</p></div>
          ) : nearbyError ? (
            <p className="text-[10px] text-amber-600 dark:text-amber-400 text-center py-2">{T("Nearby information is currently unavailable","ಹತ್ತಿರದ ಮಾಹಿತಿ ಪ್ರಸ್ತುತ ಲಭ್ಯವಿಲ್ಲ")}</p>
          ) : nearbyResults.length > 0 ? (
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {nearbyResults.map(function (r, i) {
                return <a key={i} href={r.maps} target="_blank" rel="noopener" className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 text-xs text-gray-700 dark:text-gray-300 transition-colors"><HiLocationMarker size={11} className="text-blue-500 flex-shrink-0"/><span className="flex-1 truncate">{r.e}</span><span className="text-[10px] text-gray-400 flex-shrink-0">{fmtDist(r.d)}</span></a>;
              })}
            </div>
          ) : null}
        </div>
      )}

      {/* Category Chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-3 mb-1 scrollbar-none">
        {displayCats.map(function (c) {
          var isActive = activeCat === c.id;
          return (
            <button
              key={c.id}
              onClick={function () { setActiveCat(c.id); }}
              className={
                "flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all " +
                (isActive
                  ? "bg-primary-600 text-white shadow-sm"
                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500")
              }
            >
              {c.e}
            </button>
          );
        })}
      </div>

      {/* CONTENT: Detail View or List View */}
      {selected ? (
        /* ============================== */
        /* DETAIL VIEW                     */
        /* ============================== */
        <div className="space-y-4">
          {/* HERO IMAGE */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm bg-gray-200 dark:bg-gray-700" style={{paddingBottom:"50%"}}>
            {(function(){var ie=imgErrors[selected.p];return !ie?<img src={getPlaceImage(selected)} alt={selected.e} onError={function(){var n={};for(var k in imgErrors)n[k]=imgErrors[k];n[selected.p]=true;setImgErrors(n)}} className="absolute inset-0 w-full h-full object-cover" loading="eager"/>:<div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-800 dark:to-gray-700"><span className="text-5xl">{selected.i}</span></div>})()}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h2 className="text-xl font-bold text-white">{selected.i} {T(selected.e, selected.k)}</h2>
              <div className="flex items-center gap-2 mt-1 text-white/80 text-xs"><HiLocationMarker size={12}/>{selected.d} · {selected.tal}{myLoc?<span className="text-yellow-300"> · {fmtDist(haversine(myLoc.lat,myLoc.lon,selected.lat,selected.lon))} {T("from you","ನಿಮ್ಮಿಂದ")}</span>:null}</div>
            </div>
            <button onClick={function(){setSelected(null);window.scrollTo({top:0,behavior:"smooth"})}} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50"><HiX size={18}/></button>
            <div className="absolute top-3 left-3 flex gap-1.5">
              <button onClick={function(e){e.stopPropagation();toggleFav(selected.p)}} className={"w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center "+(favorites.includes(selected.p)?"bg-yellow-500 text-white":"bg-black/30 text-white")}>{favorites.includes(selected.p)?"⭐":"☆"}</button>
              <button onClick={function(e){e.stopPropagation();toggleTrip(selected.p)}} className={"w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center "+(trips.includes(selected.p)?"bg-green-600 text-white":"bg-black/30 text-white")}>{trips.includes(selected.p)?"✈️":"📌"}</button>
            </div>
          </div>

          {/* INTERACTIVE OSM MAP */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 overflow-hidden shadow-sm">
            {/* Map Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <HiMap size={14} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-700 dark:text-gray-200">{T("Exact Location", "ನಿಖರ ಸ್ಥಳ")}</p>
                  <p className="text-[10px] text-gray-400">{selected.lat.toFixed(4)}, {selected.lon.toFixed(4)}</p>
                </div>
              </div>
              <a
                href={"geo:" + selected.lat + "," + selected.lon}
                className="text-[10px] font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors flex items-center gap-1"
              >
                <HiLocationMarker size={11} /> {T("GPS", "GPS")}
              </a>
            </div>
            {/* Embedded OSM Map with Marker */}
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={osmEmbedUrl(selected.lat, selected.lon)}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                title={"Map: " + selected.e}
                loading="lazy"
              />
              {/* Center Pin Visual */}
              <div className="absolute top-1/2 left-1/2 pointer-events-none" style={{ transform: "translate(-50%, -120%)" }}>
                <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <HiLocationMarker size={12} className="text-white" />
                </div>
                <div className="w-1 h-2.5 bg-red-500/60 rounded-full mx-auto -mt-0.5" />
              </div>
              {/* Overlay Buttons */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex gap-1.5">
                <a
                  href={selected.maps}
                  target="_blank"
                  rel="noopener"
                  className="flex-1 bg-blue-600 text-white px-2.5 py-2 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1.5 shadow hover:bg-blue-700 transition-colors"
                >
                  <HiMap size={13} /> {T("View on Map", "ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ")}
                </a>
                <a
                  href={osmDirectionsUrl(selected.lat, selected.lon, myLoc ? myLoc.lat : null, myLoc ? myLoc.lon : null)}
                  target="_blank"
                  rel="noopener"
                  className="flex-1 bg-green-600 text-white px-2.5 py-2 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1.5 shadow hover:bg-green-700 transition-colors"
                >
                  <HiArrowRight size={13} /> {T("Get Directions", "ದಾರಿ ಪಡೆಯಿರಿ")}
                </a>
              </div>
            </div>
            {/* Map Quick Actions */}
            <div className="grid grid-cols-4 gap-1 px-3 py-2.5 border-t border-gray-100 dark:border-gray-700">
              <a
                href={selected.maps}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center gap-1 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-[10px] font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
              >
                <HiMap size={11} /> {T("Open Map", "ನಕ್ಷೆ")}
              </a>
              <a
                href={osmDirectionsUrl(selected.lat, selected.lon, myLoc ? myLoc.lat : null, myLoc ? myLoc.lon : null)}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center gap-1 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg text-[10px] font-medium hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
              >
                <HiArrowRight size={11} /> {T("Directions", "ದಾರಿ")}
              </a>
              <a
                href={"geo:" + selected.lat + "," + selected.lon + "?q=" + encodeURIComponent(selected.e)}
                className="flex items-center justify-center gap-1 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg text-[10px] font-medium hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
              >
                <HiLocationMarker size={11} /> {T("GPS App", "GPS")}
              </a>
              <button
                onClick={function () {
                  var text = selected.lat.toFixed(6) + "," + selected.lon.toFixed(6);
                  navigator.clipboard.writeText(text).then(function () {
                    var el = document.activeElement;
                    if (el && el.textContent) { var t = el.textContent; el.textContent = "✓"; setTimeout(function () { el.textContent = t; }, 1200); }
                  });
                }}
                className="flex items-center justify-center gap-1 py-1.5 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-[10px] font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <HiShare size={11} /> {T("Copy", "ನಕಲಿಸಿ")}
              </button>
            </div>
          </div>

          {/* Place Info Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  {selected.i} {T(selected.e, selected.k)}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-400 dark:text-gray-500">
                  <span className="flex items-center gap-1"><HiLocationMarker size={11} />{selected.d} · {selected.tal} Taluk</span>
                  <span className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-[10px]">{selected.t}</span>
                  {myLoc && (
                    <span className="text-blue-500 font-medium">
                      {fmtDist(haversine(myLoc.lat, myLoc.lon, selected.lat, selected.lon))} {T("from you", "ನಿಮ್ಮಿಂದ")}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={function () { setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
              >
                <HiX size={20} />
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
              {T(selected.desc, selected.descK)}
            </p>

            {/* Highlight box */}
            {selected.imp && (
              <div className="mt-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 border border-amber-200 dark:border-amber-800">
                <div className="flex items-start gap-2">
                  <HiSparkles size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">
                    {T(selected.imp, selected.impK)}
                  </p>
                </div>
              </div>
            )}

            {/* Tags */}
            {(selected.tags || []).length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {(selected.tags || []).map(function (tag) {
                  return (
                    <span key={tag} className="text-[10px] bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
                <HiClock size={14} className="text-blue-500 mb-1" />
                <p className="text-[10px] text-gray-400 dark:text-gray-500">{T("Best Time", "ಉತ್ತಮ ಸಮಯ")}</p>
                <p className="text-xs font-bold text-gray-700 dark:text-gray-200">{selected.best}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3">
                <HiCash size={14} className="text-green-500 mb-1" />
                <p className="text-[10px] text-gray-400 dark:text-gray-500">{T("Entry Fee", "ಪ್ರವೇಶ ಶುಲ್ಕ")}</p>
                <p className="text-xs font-bold text-gray-700 dark:text-gray-200">{selected.fee}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3">
                <HiClock size={14} className="text-purple-500 mb-1" />
                <p className="text-[10px] text-gray-400 dark:text-gray-500">{T("Timings", "ಸಮಯ")}</p>
                <p className="text-xs font-bold text-gray-700 dark:text-gray-200">{selected.hrs}</p>
              </div>
              <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-3">
                <HiGlobe size={14} className="text-rose-500 mb-1" />
                <p className="text-[10px] text-gray-400 dark:text-gray-500">{T("Coordinates", "ನಿರ್ದೇಶಾಂಕ")}</p>
                <p className="text-xs font-bold text-gray-700 dark:text-gray-200">{selected.lat.toFixed(4)}, {selected.lon.toFixed(4)}</p>
              </div>
            </div>

            {/* Nearby Attractions */}
            {(selected.nearby || []).length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  {T("🏞️ Nearby Attractions", "🏞️ ಹತ್ತಿರದ ಆಕರ್ಷಣೆಗಳು")}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(selected.nearby || []).map(function (nb, i) {
                    return (
                      <span key={i} className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full flex items-center gap-1">
                        <HiLocationMarker size={10} className="text-primary-500" />
                        {nb}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Nearby Services Search */}
            <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-3">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                {T("🔍 Find Nearby Services", "🔍 ಹತ್ತಿರದ ಸೇವೆಗಳು")}
              </p>
              <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-none">
                {allNearbyCats.map(function (cat) {
                  return (
                    <button
                      key={cat.id}
                      onClick={function () { handleNearbyClick(cat); }}
                      className={
                        "flex-shrink-0 px-2.5 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap transition-colors " +
                        (activeNearby === cat.id && showNearby
                          ? "bg-primary-600 text-white shadow-sm"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600")
                      }
                    >
                      {cat.i} {T(cat.e, cat.k)}
                    </button>
                  );
                })}
              </div>

              {/* Nearby Results */}
              {showNearby && nearbyLoading && (
                <div className="text-center py-4">
                  <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-[10px] text-gray-400 mt-1">{T("Searching nearby...", "ಹುಡುಕಲಾಗುತ್ತಿದೆ...")}</p>
                </div>
              )}

              {showNearby && !nearbyLoading && nearbyError && (
                <p className="text-[10px] text-amber-600 dark:text-amber-400 text-center py-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg">
                  {T("Nearby information is currently unavailable", "ಹತ್ತಿರದ ಮಾಹಿತಿ ಪ್ರಸ್ತುತ ಲಭ್ಯವಿಲ್ಲ")}
                </p>
              )}

              {showNearby && !nearbyLoading && nearbyResults.length > 0 && (
                <div className="space-y-1 max-h-52 overflow-y-auto mt-1">
                  {nearbyResults.map(function (r, i) {
                    return (
                      <a
                        key={i}
                        href={r.maps}
                        target="_blank"
                        rel="noopener"
                        className="flex items-center gap-2.5 py-2 px-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 text-xs text-gray-700 dark:text-gray-300 transition-colors"
                      >
                        <HiLocationMarker size={12} className="text-blue-500 flex-shrink-0" />
                        <span className="flex-1 truncate">{r.e}</span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 flex-shrink-0">{fmtDist(r.d)}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <a
                href={selected.maps}
                target="_blank"
                rel="noopener"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
              >
                <HiMap size={16} /> {T("OpenStreetMap", "ಓಪನ್ ಸ್ಟ್ರೀಟ್ ಮ್ಯಾಪ್")}
              </a>
              <button
                onClick={function () {
                  if (navigator.share) {
                    navigator.share({ title: selected.e, text: selected.desc, url: selected.maps });
                  } else {
                    window.open("https://www.openstreetmap.org/directions?from=&to=" + selected.lat + "%2C" + selected.lon, "_blank");
                  }
                }}
                className="px-3.5 bg-green-600 text-white rounded-xl text-sm hover:bg-green-700 active:scale-95 transition-all shadow-sm flex items-center"
              >
                <HiShare size={16} />
              </button>
              <button
                onClick={function () { toggleFav(selected.p); }}
                className={
                  "px-3.5 rounded-xl text-lg transition-all active:scale-95 shadow-sm " +
                  (favorites.includes(selected.p)
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500")
                }
              >
                {favorites.includes(selected.p) ? "⭐" : "☆"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ============================== */
        /* LIST VIEW                       */
        /* ============================== */
        <>
          {filtered.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 text-center border border-gray-200 dark:border-gray-700">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                {T("No places found. Try another category or search across Karnataka.", "ಯಾವುದೇ ಸ್ಥಳ ಕಂಡುಬಂದಿಲ್ಲ. ಬೇರೆ ವರ್ಗ ಅಥವಾ ಕರ್ನಾಟಕದಾದ್ಯಂತ ಹುಡುಕಿ.")}
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filtered.map(function (p) {
                var isFav = favorites.includes(p.p);
                var dist = p._dist;
                var isFeatured = FEATURED_IDS.includes(p.p);
                var isOSM = p.isOSM;
                return (
                  <div
                    key={p.p}
                    onClick={function () { setSelected(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-md active:scale-[0.98] transition-all cursor-pointer p-4"
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20 flex items-center justify-center text-2xl flex-shrink-0">
                        {p.i}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              {isOSM && <span className="text-[8px] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1 py-0.5 rounded-full font-medium">🌐 OSM</span>}
                              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">
                                {T(p.e, p.k)}
                              </h3>
                              {isFeatured && (
                                <span className="text-[10px] bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-1.5 py-0.5 rounded-full font-medium">
                                  ⭐ {T("Featured", "ವೈಶಿಷ್ಟ್ಯ")}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                              {p.d} · {p.tal} Taluk
                              {dist !== undefined ? (
                                <span className="ml-1.5 text-blue-500 font-medium">{fmtDist(dist)} {T("away", "ದೂರ")}</span>
                              ) : null}
                            </p>
                          </div>
                          <button
                            onClick={function (e) { e.stopPropagation(); toggleFav(p.p); }}
                            className={
                              "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ml-2 transition-colors " +
                              (isFav
                                ? "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                                : "text-gray-300 dark:text-gray-600 hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/10")
                            }
                          >
                            {isFav ? "⭐" : "☆"}
                          </button>
                        </div>

                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
                          {T(p.desc, p.descK)}
                        </p>

                        <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-400 dark:text-gray-500">
                          <span className="flex items-center gap-1">
                            <HiClock size={10} />{p.best || T("Year-round","ವರ್ಷಪೂರ್ತಿ")}
                          </span>
                          <span className="flex items-center gap-1">
                            <HiCash size={10} />{p.fee || T("Check locally","ಸ್ಥಳೀಯವಾಗಿ")}
                          </span>
                          <span className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 text-blue-500 px-1.5 py-0.5 rounded-full">
                            <HiMap size={10} />{T("Map", "ನಕ್ಷೆ")}
                          </span>
                          <span className="ml-auto px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            {isOSM ? <><span className="text-[8px]">🌐</span> OSM</> : p.t}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <div className="mt-5 text-center">
        <div className="flex items-center justify-center gap-3 text-[9px] text-gray-300 dark:text-gray-600">
          <span>{T("Real coordinates · Verified", "ನೈಜ ನಿರ್ದೇಶಾಂಕ · ಪರಿಶೀಲಿತ")}</span>
          <span>·</span>
          <span>© OpenStreetMap contributors</span>
          <span>·</span>
          <span>{T("No API keys required", "API ಕೀ ಅಗತ್ಯವಿಲ್ಲ")}</span>
        </div>
      </div>
    </div>
  );
}
