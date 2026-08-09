import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiArrowLeft, HiAcademicCap, HiExternalLink, HiRefresh,
  HiSearch, HiX, HiLocationMarker, HiOfficeBuilding,
  HiBookOpen, HiGlobe, HiFilter, HiChevronDown,
  HiExclamation, HiClipboardList, HiSparkles
} from "react-icons/hi";

// ====================================================================
// KARNATAKA EDUCATION DIRECTORY — NAMMA KARNATAKA
// 15,000+ real schools from Karnataka DISE (schooleducation.kar.nic.in)
// Data via OpenCity.in — verified public dataset
// ====================================================================

const T = {
  en: {
    title: "Education", subtitle: "Karnataka School Directory",
    loading: "Loading school data...", error: "Could not load data.",
    retry: "Retry", empty: "No schools found.", emptySearch: "No schools match.",
    search: "Search by school name, block, village or PIN...",
    filterDistrict: "Filter", allDistricts: "All Districts", allBlocks: "All Blocks",
    district: "District", block: "Block / Taluk", village: "Village", pincode: "PIN",
    showing: "Showing", schools: "schools", of: "in",
    sourceLabel: "Data Sources", sourcesInfo: "Karnataka DISE 2017-18 via schooleducation.kar.nic.in & OpenCity.in. For live data & GIS coordinates visit the UDISE+ portal.",
    openUdise: "UDISE+", noDistrict: "Select a district to browse schools.",
    portals: "Education Portals", news: "Education News",
    read: "Read more", mapTitle: "School Map",
    mapInfo: "Use the official UDISE+ School GIS portal for verified coordinates and interactive maps of all registered schools.",
    openMap: "Open School GIS Map", updated: "Updated",
    showMore: "more districts",
  },
  kn: {
    title: "ಶಿಕ್ಷಣ", subtitle: "ಕರ್ನಾಟಕ ಶಾಲಾ ಡೈರೆಕ್ಟರಿ",
    loading: "ಶಾಲಾ ಡೇಟಾ ಲೋಡ್ ಆಗುತ್ತಿದೆ...", error: "ಡೇಟಾ ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
    retry: "ಮರುಪ್ರಯತ್ನ", empty: "ಯಾವುದೇ ಶಾಲೆಗಳಿಲ್ಲ.", emptySearch: "ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗಲಿಲ್ಲ.",
    search: "ಶಾಲೆ, ಬ್ಲಾಕ್, ಗ್ರಾಮ ಅಥವಾ ಪಿನ್‌ಕೋಡ್‌ನಿಂದ ಹುಡುಕಿ...",
    filterDistrict: "ಫಿಲ್ಟರ್", allDistricts: "ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು", allBlocks: "ಎಲ್ಲಾ ಬ್ಲಾಕ್‌ಗಳು",
    district: "ಜಿಲ್ಲೆ", block: "ಬ್ಲಾಕ್ / ತಾಲ್ಲೂಕು", village: "ಗ್ರಾಮ", pincode: "ಪಿನ್‌ಕೋಡ್",
    showing: "ತೋರಿಸಲಾಗುತ್ತಿದೆ", schools: "ಶಾಲೆಗಳು", of: "ರಲ್ಲಿ",
    sourceLabel: "ಡೇಟಾ ಮೂಲಗಳು", sourcesInfo: "ಕರ್ನಾಟಕ DISE 2017-18, schooleducation.kar.nic.in & OpenCity.in. ನೇರ ಡೇಟಾ ಮತ್ತು GIS ನಿರ್ದೇಶಾಂಕಗಳಿಗಾಗಿ UDISE+ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ.",
    openUdise: "UDISE+", noDistrict: "ಶಾಲೆಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ.",
    portals: "ಶಿಕ್ಷಣ ಪೋರ್ಟಲ್‌ಗಳು", news: "ಶಿಕ್ಷಣ ಸುದ್ದಿ",
    read: "ಇನ್ನಷ್ಟು", mapTitle: "ಶಾಲಾ ನಕ್ಷೆ",
    mapInfo: "ಎಲ್ಲಾ ನೋಂದಾಯಿತ ಶಾಲೆಗಳ ಪರಿಶೀಲಿತ ನಿರ್ದೇಶಾಂಕಗಳು ಮತ್ತು ಸಂವಾದಾತ್ಮಕ ನಕ್ಷೆಗಾಗಿ ಅಧಿಕೃತ UDISE+ ಶಾಲಾ GIS ಪೋರ್ಟಲ್ ಬಳಸಿ.",
    openMap: "ಶಾಲಾ GIS ನಕ್ಷೆ", updated: "ನವೀಕರಿಸಲಾಗಿದೆ",
    showMore: "ಇನ್ನಷ್ಟು ಜಿಲ್ಲೆಗಳು",
  },
};

const PORTALS = [
  { en: "NSP Scholarship Portal", kn: "NSP ಸ್ಕಾಲರ್‌ಶಿಪ್", url: "https://scholarships.gov.in", d: "Apply for scholarships", dk: "ಸ್ಕಾಲರ್‌ಶಿಪ್‌ಗೆ ಅರ್ಜಿ" },
  { en: "DigiLocker", kn: "ಡಿಜಿಲಾಕರ್", url: "https://digilocker.gov.in", d: "Digital documents", dk: "ಡಿಜಿಟಲ್ ದಸ್ತಾವೇಜು" },
  { en: "Karnataka School Education", kn: "ಕರ್ನಾಟಕ ಶಾಲಾ ಶಿಕ್ಷಣ", url: "https://schooleducation.karnataka.gov.in", d: "Official portal", dk: "ಅಧಿಕೃತ ಪೋರ್ಟಲ್" },
  { en: "UDISE+ Know Your School", kn: "UDISE+ ಶಾಲೆ ತಿಳಿಯಿರಿ", url: "https://kys.udiseplus.gov.in", d: "School details + GIS", dk: "ಶಾಲಾ ವಿವರ + GIS" },
  { en: "School GIS Map", kn: "ಶಾಲಾ GIS ನಕ್ಷೆ", url: "http://schoolgis.nic.in", d: "Interactive school map", dk: "ಸಂವಾದಾತ್ಮಕ ಶಾಲಾ ನಕ್ಷೆ" },
  { en: "UGC Higher Education", kn: "UGC ಉನ್ನತ ಶಿಕ್ಷಣ", url: "https://www.ugc.ac.in", d: "University Grants Commission", dk: "ವಿಶ್ವವಿದ್ಯಾಲಯ ಅನುದಾನ ಆಯೋಗ" },
  { en: "NCERT e-Pathshala", kn: "NCERT ಇ-ಪಾಠಶಾಲಾ", url: "https://epathshala.nic.in", d: "Free digital textbooks", dk: "ಉಚಿತ ಡಿಜಿಟಲ್ ಪಠ್ಯಪುಸ್ತಕ" },
  { en: "SWAYAM", kn: "ಸ್ವಯಂ", url: "https://swayam.gov.in", d: "Free online courses", dk: "ಉಚಿತ ಆನ್‌ಲೈನ್ ಕೋರ್ಸ್‌ಗಳು" },
];

const FEEDS = [
  { id: "toi", en: "TOI Education", kn: "TOI ಶಿಕ್ಷಣ", url: "https://timesofindia.indiatimes.com/rssfeeds/913168846.cms" },
  { id: "hindu", en: "The Hindu Education", kn: "ದಿ ಹಿಂದೂ ಶಿಕ್ಷಣ", url: "https://www.thehindu.com/education/feeder/default.rss" },
];

function timeAgo(d, lg) {
  if (!d) return ""; const ms = Date.now() - new Date(d).getTime();
  const m = Math.floor(ms / 60000); if (m < 1) return lg === "kn" ? "ಈಗ" : "now";
  const h = Math.floor(m / 60); const da = Math.floor(h / 24);
  if (da > 0) return da + (lg === "kn" ? "ದಿ" : "d");
  if (h > 0) return h + (lg === "kn" ? "ಗಂ" : "h");
  return m + (lg === "kn" ? "ನಿ" : "m");
}

async function fetchNews(url) {
  const r = await fetch("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(url));
  const d = await r.json(); if (d.status !== "ok") throw Error("fail");
  return d.items.map(i => ({ title: i.title || "", desc: (i.description || "").replace(/<[^>]*>/g, "").substring(0, 200), link: i.link || "", date: i.pubDate || "", img: i.thumbnail || (i.enclosure ? i.enclosure.link : null) })).slice(0, 8);
}

export default function Education() {
  const nav = useNavigate();
  const [lang, setLang] = useState(() => { try { return localStorage.getItem("nk_lang") || "bi"; } catch { return "bi"; } });
  const R = useCallback((en, kn) => { if (lang === "en") return en; if (lang === "kn") return kn; return en + " | " + kn; }, [lang]);
  useEffect(() => { const h = e => setLang(e.detail); window.addEventListener("langchange", h); return () => window.removeEventListener("langchange", h); }, []);

  const [schools, setSchools] = useState([]);
  const [sLoading, setSLoading] = useState(true);
  const [sError, setSError] = useState(null);
  const [selDist, setSelDist] = useState("");
  const [selBlock, setSelBlock] = useState("");
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const [feed, setFeed] = useState(FEEDS[0]);
  const [articles, setArticles] = useState([]);
  const [nLoading, setNLoading] = useState(true);
  const [nError, setNError] = useState(null);

  useEffect(() => {
    let c = false;
    (async () => {
      try {
        setSLoading(true);
        let rows = [];
        if (window.__nexusData && window.__nexusData.educationSchools) {
          rows = window.__nexusData.educationSchools;
        } else {
          const resp = await fetch("/src/data/education.table");
          const json = await resp.json();
          rows = json.data || [];
        }
        if (!c) { setSchools(rows); setSLoading(false); }
      } catch (e) {
        if (!c) { setSError(e.message); setSLoading(false); }
      }
    })();
    return () => { c = true; };
  }, []);

  useEffect(() => {
    let c = false;
    (async () => {
      setNLoading(true); setNError(null);
      try { const a = await fetchNews(feed.url); if (!c) { setArticles(a); setNLoading(false); } }
      catch { if (!c) { setNError("feed"); setNLoading(false); } }
    })();
    return () => { c = true; };
  }, [feed]);

  const districts = useMemo(() => {
    const m = new Map();
    for (const s of schools) {
      if (!m.has(s.district)) m.set(s.district, { en: s.district, kn: s.districtKn || s.district, count: 0 });
      m.get(s.district).count++;
    }
    return [...m.values()].sort((a, b) => b.count - a.count);
  }, [schools]);

  const blocks = useMemo(() => {
    if (!selDist) return [];
    const m = new Map();
    for (const s of schools) {
      if (s.district === selDist) {
        if (!m.has(s.block)) m.set(s.block, { en: s.block, count: 0 });
        m.get(s.block).count++;
      }
    }
    return [...m.values()].sort((a, b) => b.count - a.count);
  }, [schools, selDist]);

  const filtered = useMemo(() => {
    let r = schools;
    if (selDist) r = r.filter(s => s.district === selDist);
    if (selBlock) r = r.filter(s => s.block === selBlock);
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      r = r.filter(s => (s.schoolName || "").toLowerCase().includes(q) || (s.block || "").toLowerCase().includes(q) || (s.village || "").toLowerCase().includes(q) || (s.pincode || "").includes(q));
    }
    return r;
  }, [schools, selDist, selBlock, search]);

  const txt = lang === "kn" ? T.kn : T.en;
  const filteredCount = filtered.length;
  const totalCount = schools.length;
  const displayLimit = 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => nav("/")} className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 flex items-center justify-center text-gray-500"><HiArrowLeft size={18} /></button>
          <div>
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2"><HiAcademicCap className="text-cyan-600" size={22} />{R(T.en.title, T.kn.title)}</h1>
            <p className="text-[10px] text-gray-400">{totalCount.toLocaleString()} {R(T.en.schools, T.kn.schools)} {lang === "kn" ? "ಲಭ್ಯವಿದೆ" : "available"}</p>
          </div>
        </div>
        <button onClick={() => { setSelDist(""); setSelBlock(""); setSearch(""); }} className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 flex items-center justify-center text-cyan-600" title={R(T.en.retry, T.kn.retry)}><HiRefresh size={18} /></button>
      </div>

      <div className="relative">
        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={R(T.en.search, T.kn.search)} className="w-full pl-10 pr-10 py-3 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm" />
        {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><HiX size={16} /></button>}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <button onClick={() => setShowFilter(!showFilter)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border ${showFilter ? "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 border-cyan-300" : "bg-white dark:bg-gray-800 text-gray-600 border dark:border-gray-700"}`}><HiFilter size={14} />{R(T.en.filterDistrict, T.kn.filterDistrict)} <HiChevronDown size={14} className={showFilter ? "rotate-180" : ""} /></button>
        {selDist && <span className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 text-[11px] font-medium"><HiLocationMarker size={12} />{lang === "kn" ? (districts.find(d => d.en === selDist)?.kn || selDist) : selDist}<button onClick={() => { setSelDist(""); setSelBlock(""); }}><HiX size={12} className="ml-0.5" /></button></span>}
        {selBlock && <span className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 text-[11px] font-medium"><HiOfficeBuilding size={12} />{selBlock}<button onClick={() => setSelBlock("")}><HiX size={12} className="ml-0.5" /></button></span>}
      </div>

      {showFilter && (<div className="space-y-3"><div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border dark:border-gray-700"><p className="text-[11px] font-semibold text-gray-400 uppercase mb-2">{R(T.en.district, T.kn.district)}</p><div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">{districts.map(d => (<button key={d.en} onClick={() => { setSelDist(d.en); setSelBlock(""); }} className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${selDist === d.en ? "bg-cyan-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 hover:bg-gray-200"}`}>{lang === "kn" ? d.kn : d.en} ({d.count})</button>))}</div></div>{selDist && blocks.length > 0 && (<div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border dark:border-gray-700"><p className="text-[11px] font-semibold text-gray-400 uppercase mb-2">{R(T.en.block, T.kn.block)}</p><div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto"><button onClick={() => setSelBlock("")} className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${!selBlock ? "bg-cyan-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600"}`}>{R(T.en.allBlocks, T.kn.allBlocks)}</button>{blocks.map(b => (<button key={b.en} onClick={() => setSelBlock(b.en)} className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${selBlock === b.en ? "bg-teal-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 hover:bg-gray-200"}`}>{b.en} ({b.count})</button>))}</div></div>)}</div>)}

      {sLoading ? (<div className="bg-white dark:bg-gray-800 rounded-xl p-10 shadow-sm border text-center"><div className="animate-spin w-8 h-8 border-2 border-cyan-600 border-t-transparent rounded-full mx-auto mb-3" /><p className="text-sm text-gray-500">{R(T.en.loading, T.kn.loading)}</p></div>) : sError ? (<div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8 text-center border border-red-200"><HiExclamation className="mx-auto text-red-400 mb-2" size={28} /><p className="text-red-600 text-sm mb-3">{R(T.en.error, T.kn.error)}</p><button onClick={() => window.location.reload()} className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm">{R(T.en.retry, T.kn.retry)}</button></div>) : !selDist && !search ? (<div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border"><p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">{R(T.en.noDistrict, T.kn.noDistrict)}</p><div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{districts.slice(0, 15).map(d => (<button key={d.en} onClick={() => { setSelDist(d.en); setShowFilter(false); }} className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-3 text-left hover:bg-cyan-100 transition-colors"><p className="text-xs font-medium text-cyan-700 dark:text-cyan-300">{lang === "kn" ? d.kn : d.en}</p><p className="text-[10px] text-cyan-500">{d.count} {R(T.en.schools, T.kn.schools)}</p></button>))}</div>{districts.length > 15 && (<button onClick={() => setShowFilter(true)} className="mt-3 text-xs text-cyan-600 font-medium">+{districts.length - 15} {R(T.en.showMore, T.kn.showMore)}</button>)}</div>) : filteredCount === 0 ? (<div className="bg-white dark:bg-gray-800 rounded-xl p-10 shadow-sm border text-center"><HiBookOpen className="mx-auto text-gray-300 dark:text-gray-600 mb-3" size={36} /><p className="text-sm text-gray-500">{search ? R(T.en.emptySearch, T.kn.emptySearch) : R(T.en.empty, T.kn.empty)}</p></div>) : (<div><div className="flex items-center justify-between mb-2 px-1"><p className="text-[10px] text-gray-400">{R(T.en.showing, T.kn.showing)} {Math.min(filteredCount, displayLimit)} {R(T.en.of, T.kn.of)} {filteredCount} {R(T.en.schools, T.kn.schools)}{selDist ? ` ${R(T.en.of, T.kn.of)} ${lang === "kn" ? (districts.find(d => d.en === selDist)?.kn || selDist) : selDist}` : ""}</p><p className="text-[10px] text-gray-400">{R(T.en.updated, T.kn.updated)}: {new Date().toLocaleTimeString(lang === "kn" ? "kn-IN" : "en-IN", { hour: "2-digit", minute: "2-digit" })}</p></div><div className="space-y-2">{filtered.slice(0, displayLimit).map((s, i) => (<div key={s.id || i} className="bg-white dark:bg-gray-800 rounded-xl p-3.5 shadow-sm border hover:shadow-md transition-shadow"><div className="flex items-start justify-between gap-2"><div className="flex-1 min-w-0"><h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{s.schoolName}</h3><div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">{s.block && <span className="text-[11px] text-gray-500 flex items-center gap-1"><HiOfficeBuilding size={11} className="text-gray-400" />{s.block}</span>}{s.village && <span className="text-[11px] text-gray-500 flex items-center gap-1"><HiLocationMarker size={11} className="text-gray-400" />{s.village}</span>}{s.pincode && <span className="text-[11px] text-gray-400">{s.pincode}</span>}</div></div><a href={`https://kys.udiseplus.gov.in/#/schoolDetail/${s.id}`} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-[10px] text-cyan-600 flex items-center gap-0.5 hover:underline"><HiExternalLink size={10} />{R(T.en.openUdise, T.kn.openUdise)}</a></div></div>))}</div>{filteredCount > displayLimit && (<p className="text-center text-[10px] text-gray-400 py-3">{lang === "kn" ? `ಮೊದಲ ${displayLimit} ಶಾಲೆಗಳು (ಒಟ್ಟು ${filteredCount}). ಹೆಚ್ಚಿನ ಫಲಿತಾಂಶಗಳಿಗಾಗಿ ಹುಡುಕಾಟ ಅಥವಾ ಫಿಲ್ಟರ್ ಬಳಸಿ.` : `Showing first ${displayLimit} of ${filteredCount} schools. Use search or filters for more specific results.`}</p>)}</div>)}

      <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-4 border border-cyan-200 dark:border-cyan-800"><p className="text-[11px] font-semibold text-cyan-700 dark:text-cyan-300 uppercase mb-1">{R(T.en.sourceLabel, T.kn.sourceLabel)}</p><p className="text-xs text-cyan-600 dark:text-cyan-400">{R(T.en.sourcesInfo, T.kn.sourcesInfo)}</p></div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border"><div className="flex items-center justify-between"><div><h3 className="text-sm font-bold text-gray-500 uppercase mb-1">{R(T.en.mapTitle, T.kn.mapTitle)}</h3><p className="text-xs text-gray-500">{R(T.en.mapInfo, T.kn.mapInfo)}</p></div><a href="http://schoolgis.nic.in" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 ml-3 px-3 py-2 bg-cyan-600 text-white rounded-lg text-xs font-medium hover:bg-cyan-700 transition-colors">{R(T.en.openMap, T.kn.openMap)}</a></div></div>

      <div><h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mb-3">{R(T.en.portals, T.kn.portals)}</h3><div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{PORTALS.map((p, i) => (<a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="block bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border hover:shadow-md transition-shadow"><p className="text-xs font-semibold text-gray-800 dark:text-gray-100">{R(p.en, p.kn)}</p><p className="text-[10px] text-gray-400 mt-0.5">{R(p.d, p.dk)}</p></a>))}</div></div>

      <div><h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mb-3">{R(T.en.news, T.kn.news)}</h3><div className="flex gap-1.5 mb-3 overflow-x-auto scrollbar-none pb-1">{FEEDS.map(f => (<button key={f.id} onClick={() => setFeed(f)} className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${feed.id === f.id ? "bg-cyan-600 text-white" : "bg-white dark:bg-gray-800 text-gray-600 border"}`}>{R(f.en, f.kn)}</button>))}</div>{nLoading ? (<div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border text-center"><div className="animate-spin w-6 h-6 border-2 border-cyan-600 border-t-transparent rounded-full mx-auto mb-2" /><p className="text-xs text-gray-500">Loading...</p></div>) : nError ? (<div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 text-center"><p className="text-amber-700 text-xs">Could not load education news.</p></div>) : articles.length === 0 ? (<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border text-center"><p className="text-xs text-gray-500">No articles available.</p></div>) : (<div className="space-y-2">{articles.map((a, i) => (<a key={i} href={a.link} target="_blank" rel="noopener noreferrer" className="flex gap-3 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border hover:shadow-md transition-shadow group">{a.img && <img src={a.img} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-gray-100" loading="lazy" onError={e => e.target.style.display = "none"} />}<div className="flex-1 min-w-0"><h4 className="text-xs font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-cyan-600">{a.title}</h4><p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">{a.desc}</p><div className="flex items-center gap-2 mt-1"><span className="text-[10px] text-gray-400">{timeAgo(a.date, lang)}</span><span className="text-[10px] text-cyan-500 flex items-center gap-0.5"><HiExternalLink size={9} />{R(T.en.read, T.kn.read)}</span></div></div></a>))}</div>)}</div>
    </div>
  );
}