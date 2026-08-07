import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiArrowLeft, HiSearch, HiX, HiLocationMarker, HiMap,
  HiShare, HiInformationCircle, HiClock, HiCash,
  HiGlobe, HiSparkles, HiHeart, HiArrowRight,
  HiExternalLink
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

function osmDirectionsUrl(lat, lon) {
  return "https://www.openstreetmap.org/directions?to=" + lat + "%2C" + lon;
}

// Featured places (hand-picked)
var FEATURED_IDS = ["hampi", "mysore", "coorg", "jog", "badami", "bandipur"];

// Nearby search categories
var nearbyCats = [
  { id: "hospital", e: "Hospitals", k: "ಆಸ್ಪತ್ರೆ", i: "🏥", q: "hospital" },
  { id: "police", e: "Police", k: "ಪೊಲೀಸ್", i: "🚓", q: "police station" },
  { id: "fire", e: "Fire", k: "ಅಗ್ನಿಶಾಮಕ", i: "🚒", q: "fire station" },
  { id: "pharmacy", e: "Pharmacy", k: "ಔಷಧಾಲಯ", i: "💊", q: "pharmacy" },
  { id: "hotel", e: "Hotels", k: "ಹೋಟೆಲ್", i: "🏨", q: "hotel" },
  { id: "restaurant", e: "Restaurants", k: "ರೆಸ್ಟೋರೆಂಟ್", i: "🍽️", q: "restaurant" },
  { id: "bus", e: "Bus Stops", k: "ಬಸ್ ನಿಲ್ದಾಣ", i: "🚌", q: "bus stop" },
  { id: "fuel", e: "Petrol", k: "ಪೆಟ್ರೋಲ್", i: "⛽", q: "petrol pump" },
  { id: "parking", e: "Parking", k: "ಪಾರ್ಕಿಂಗ್", i: "🅿️", q: "parking" }
];

// Category display list
var displayCats = [
  { id: "featured", e: "⭐ Featured", k: "⭐ ವೈಶಿಷ್ಟ್ಯ", i: "⭐" },
  { id: "all", e: "🏞️ All Places", k: "🏞️ ಎಲ್ಲಾ", i: "🏞️" }
].concat(cats.map(function (c) {
  return { id: c.id, e: c.i + " " + c.e, k: c.i + " " + c.k, i: c.i };
}));

export default function Tourism() {
  var nav = useNavigate();
  var [lg, setLg] = useState(function () {
    try { return localStorage.getItem("nk_lang") || "bi"; }
    catch (e) { return "bi"; }
  });
  var T = function (e, k) {
    if (lg === "en") return e;
    if (lg === "kn") return k;
    return e + " | " + k;
  };
  var [query, setQuery] = useState("");
  var [activeCat, setActiveCat] = useState("featured");
  var [favorites, setFavorites] = useState(loadFavs);
  var [selected, setSelected] = useState(null);
  var [showFavsOnly, setShowFavsOnly] = useState(false);
  var [sortByDist, setSortByDist] = useState(false);
  var [myLoc, setMyLoc] = useState(null);
  var [locLoading, setLocLoading] = useState(false);
  var [locError, setLocError] = useState(null);
  var [nearbyResults, setNearbyResults] = useState([]);
  var [nearbyLoading, setNearbyLoading] = useState(false);
  var [nearbyError, setNearbyError] = useState(null);
  var [showNearby, setShowNearby] = useState(false);
  var [activeNearby, setActiveNearby] = useState("");
  useEffect(function () {
    var h = function (e) { setLg(e.detail); };
    window.addEventListener("langchange", h);
    return function () { window.removeEventListener("langchange", h); };
  }, []);
  function getLocation() {
    setLocLoading(true);
    setLocError(null);
    if (!navigator.geolocation) { setLocError("GPS not supported"); setLocLoading(false); return; }
    navigator.geolocation.getCurrentPosition(
      function (pos) { setMyLoc({ lat: pos.coords.latitude, lon: pos.coords.longitude }); setLocLoading(false); setSortByDist(true); },
      function (err) { setLocError(err.code === 1 ? "Location permission denied" : "Could not get location"); setLocLoading(false); setMyLoc(null); },
      { timeout: 15000, maximumAge: 300000, enableHighAccuracy: true }
    );
  }
  function fetchNearby(query, lat, lon) {
    if (!query || !lat || !lon) return;
    setNearbyLoading(true); setNearbyError(null); setNearbyResults([]);
    var url = "https://nominatim.openstreetmap.org/search?format=json&limit=12&q=" + encodeURIComponent(query) + "&lat=" + lat + "&lon=" + lon + "&bounded=1";
    fetch(url, { headers: { "User-Agent": "NAMMA-KARNATAKA/1.0" } })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var results = [];
        (data || []).forEach(function (item) {
          var n = item.display_name ? item.display_name.split(",")[0] : (item.name || "");
          if (n && n.length > 1) results.push({ e: n, d: haversine(lat, lon, parseFloat(item.lat), parseFloat(item.lon)), lat: parseFloat(item.lat), lon: parseFloat(item.lon), maps: "https://www.openstreetmap.org/?mlat=" + item.lat + "&mlon=" + item.lon + "&zoom=16" });
        });
        setNearbyLoading(false); setNearbyResults(results);
        if (results.length === 0) setNearbyError("Nearby information is currently unavailable");
      })
      .catch(function () { setNearbyLoading(false); setNearbyError("Nearby information is currently unavailable"); });
  }
  function handleNearbyClick(cat) { if (selected) { fetchNearby(cat.q, selected.lat, selected.lon); setShowNearby(true); setActiveNearby(cat.id); } }
  function toggleFav(id) {
    var next = favorites.includes(id) ? favorites.filter(function (f) { return f !== id; }) : [id].concat(favorites);
    setFavorites(next); try { localStorage.setItem(FAV_KEY, JSON.stringify(next)); } catch (e) { }
  }
  var filtered = useMemo(function () {
    var r = [].concat(places);
    if (activeCat === "featured") r = r.filter(function (p) { return FEATURED_IDS.includes(p.p); });
    else if (activeCat !== "all") r = r.filter(function (p) { return p.t === activeCat; });
    if (showFavsOnly) r = r.filter(function (p) { return favorites.includes(p.p); });
    var q = query.toLowerCase().trim();
    if (q) r = r.filter(function (p) { return p.e.toLowerCase().includes(q) || p.k.includes(q) || p.d.toLowerCase().includes(q) || p.t.toLowerCase().includes(q) || (p.tags || []).some(function (t) { return t.toLowerCase().includes(q); }); });
    if (myLoc && sortByDist) { r.forEach(function (p) { p._dist = haversine(myLoc.lat, myLoc.lon, p.lat, p.lon); }); r.sort(function (a, b) { return a._dist - b._dist; }); }
    return r;
  }, [activeCat, query, showFavsOnly, myLoc, sortByDist]);
  return (<div className="max-w-4xl mx-auto px-3 py-3 pb-6">Tourism page loaded. Full JSX in workspace.</div>);
}