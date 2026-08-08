import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiArrowLeft,
  HiExternalLink,
  HiRefresh,
  HiNewspaper,
  HiGlobe,
  HiAcademicCap,
  HiHeart,
  HiLightBulb,
  HiBriefcase,
  HiOfficeBuilding,
  HiSun,
  HiCode,
  HiLocationMarker,
  HiSparkles,
  HiExclamation,
  HiSearch,
  HiX,
  HiFilter,
} from "react-icons/hi";

// ─── VERIFIED RSS FEED CATEGORIES ──────────────────────────────

const CATEGORIES = [
  {
    id: "karnataka",
    en: "🏛️ Karnataka",
    kn: "🏛️ ಕರ್ನಾಟಕ",
    icon: HiLocationMarker,
    feeds: [
      "https://www.thehindu.com/news/national/karnataka/feeder/default.rss",
      "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms",
      "https://www.deccanherald.com/feed",
    ],
  },
  {
    id: "india",
    en: "🇮🇳 India",
    kn: "🇮🇳 ಭಾರತ",
    icon: HiGlobe,
    feeds: [
      "https://www.thehindu.com/news/national/feeder/default.rss",
      "https://timesofindia.indiatimes.com/rssfeeds/296589292.cms",
      "https://www.deccanherald.com/feed",
    ],
  },
  {
    id: "bengaluru",
    en: "📍 Bengaluru",
    kn: "📍 ಬೆಂಗಳೂರು",
    icon: HiOfficeBuilding,
    feeds: [
      "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms",
      "https://www.thehindu.com/news/national/karnataka/feeder/default.rss",
    ],
  },
  {
    id: "agriculture",
    en: "🌾 Agriculture",
    kn: "🌾 ಕೃಷಿ",
    icon: HiSparkles,
    feeds: [
      "https://www.thehindu.com/sci-tech/agriculture/feeder/default.rss",
    ],
  },
  {
    id: "business",
    en: "💼 Business",
    kn: "💼 ವ್ಯಾಪಾರ",
    icon: HiBriefcase,
    feeds: [
      "https://www.thehindubusinessline.com/feeder/default.rss",
      "https://economictimes.indiatimes.com/rssfeedstopstories.cms",
      "https://timesofindia.indiatimes.com/rssfeeds/1898055.cms",
    ],
  },
  {
    id: "education",
    en: "🎓 Education",
    kn: "🎓 ಶಿಕ್ಷಣ",
    icon: HiAcademicCap,
    feeds: [
      "https://www.thehindu.com/education/feeder/default.rss",
      "https://timesofindia.indiatimes.com/rssfeeds/913168846.cms",
    ],
  },
  {
    id: "sports",
    en: "⚽ Sports",
    kn: "⚽ ಕ್ರೀಡೆ",
    icon: HiLightBulb,
    feeds: [
      "https://www.thehindu.com/sport/feeder/default.rss",
      "https://timesofindia.indiatimes.com/rssfeeds/4719148.cms",
    ],
  },
  {
    id: "technology",
    en: "💻 Technology",
    kn: "💻 ತಂತ್ರಜ್ಞಾನ",
    icon: HiCode,
    feeds: [
      "https://www.thehindu.com/sci-tech/technology/feeder/default.rss",
      "https://timesofindia.indiatimes.com/rssfeeds/66949542.cms",
      "https://economictimes.indiatimes.com/tech/rssfeeds/13357270.cms",
    ],
  },
  {
    id: "health",
    en: "❤️ Health",
    kn: "❤️ ಆರೋಗ್ಯ",
    icon: HiHeart,
    feeds: [
      "https://www.thehindu.com/sci-tech/health/feeder/default.rss",
      "https://timesofindia.indiatimes.com/rssfeeds/3908999.cms",
    ],
  },
  {
    id: "environment",
    en: "🌦️ Environment",
    kn: "🌦️ ಪರಿಸರ",
    icon: HiSun,
    feeds: [
      "https://www.thehindu.com/sci-tech/energy-and-environment/feeder/default.rss",
      "https://timesofindia.indiatimes.com/rssfeeds/2647163.cms",
    ],
  },
];

// ─── BILINGUAL TRANSLATIONS ────────────────────────────────────

const T = {
  en: {
    // Header
    title: "News",
    refreshTitle: "Refresh all",
    backTitle: "Back to Home",

    // Search
    searchPlaceholder: "Search news...",
    searchEmpty: "No articles match your search.",
    clearSearch: "Clear search",

    // Filter
    filterAll: "All",
    filterTitle: "Filter by source",

    // Loading & Error
    loading: "Loading news...",
    loadingCat: "Loading category...",
    errorGlobal: "All sources temporarily unavailable. Please try again later.",
    errorCat: "Could not load this category. Tap to retry.",
    retry: "Retry",

    // Empty
    noNewsCat: "No articles available in this category right now.",
    noNewsGlobal: "No news available. Pull to refresh.",

    // Source names
    sourceTheHindu: "The Hindu",
    sourceTOI: "Times of India",
    sourceDeccanHerald: "Deccan Herald",
    sourceEconomicTimes: "Economic Times",
    sourceHinduBizLine: "Hindu BusinessLine",
    sourceLabel: "Source",

    // Article card
    readArticle: "Read full article",

    // Time
    ago: "ago",
    min: "min",
    hr: "hr",
    d: "d",
    justNow: "just now",

    // Footer
    updated: "Updated",
    showing: "Showing",
    articles: "articles",
    from: "from",
  },
  kn: {
    // Header
    title: "ಸುದ್ದಿ",
    refreshTitle: "ಎಲ್ಲಾ ರಿಫ್ರೆಶ್",
    backTitle: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",

    // Search
    searchPlaceholder: "ಸುದ್ದಿ ಹುಡುಕಿ...",
    searchEmpty: "ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಯಾವುದೇ ಲೇಖನಗಳಿಲ್ಲ.",
    clearSearch: "ಹುಡುಕಾಟ ಅಳಿಸಿ",

    // Filter
    filterAll: "ಎಲ್ಲಾ",
    filterTitle: "ಮೂಲದಿಂದ ಫಿಲ್ಟರ್",

    // Loading & Error
    loading: "ಸುದ್ದಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    loadingCat: "ವರ್ಗ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    errorGlobal: "ಎಲ್ಲಾ ಮೂಲಗಳು ತಾತ್ಕಾಲಿಕವಾಗಿ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ನಂತರ ಪ್ರಯತ್ನಿಸಿ.",
    errorCat: "ಈ ವರ್ಗ ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ಮರುಪ್ರಯತ್ನಿಸಲು ಟ್ಯಾಪ್ ಮಾಡಿ.",
    retry: "ಮರುಪ್ರಯತ್ನ",

    // Empty
    noNewsCat: "ಈ ವರ್ಗದಲ್ಲಿ ಇದೀಗ ಯಾವುದೇ ಲೇಖನಗಳಿಲ್ಲ.",
    noNewsGlobal: "ಯಾವುದೇ ಸುದ್ದಿ ಲಭ್ಯವಿಲ್ಲ. ರಿಫ್ರೆಶ್ ಮಾಡಿ.",

    // Source names (Kannada)
    sourceTheHindu: "ದಿ ಹಿಂದೂ",
    sourceTOI: "ಟೈಮ್ಸ್ ಆಫ್ ಇಂಡಿಯಾ",
    sourceDeccanHerald: "ಡೆಕ್ಕನ್ ಹೆರಾಲ್ಡ್",
    sourceEconomicTimes: "ಎಕನಾಮಿಕ್ ಟೈಮ್ಸ್",
    sourceHinduBizLine: "ಹಿಂದೂ ಬಿಸಿನೆಸ್‌ಲೈನ್",
    sourceLabel: "ಮೂಲ",

    // Article card
    readArticle: "ಪೂರ್ಣ ಲೇಖನ ಓದಿ",

    // Time
    ago: "ಹಿಂದೆ",
    min: "ನಿ",
    hr: "ಗಂ",
    d: "ದಿನ",
    justNow: "ಈಗಷ್ಟೇ",

    // Footer
    updated: "ನವೀಕರಿಸಲಾಗಿದೆ",
    showing: "ತೋರಿಸಲಾಗುತ್ತಿದೆ",
    articles: "ಲೇಖನಗಳು",
    from: "ನಿಂದ",
  },
};

// ─── HELPERS ────────────────────────────────────────────────────

function timeAgo(dateStr, lang) {
  if (!dateStr) return "";
  const ms = Date.now() - new Date(dateStr).getTime();
  if (ms < 0) return lang === "kn" ? T.kn.justNow : T.en.justNow;
  const m = Math.floor(ms / 60000);
  if (m < 1) return lang === "kn" ? T.kn.justNow : T.en.justNow;
  const h = Math.floor(m / 60);
  const da = Math.floor(h / 24);
  const txt = lang === "kn" ? T.kn : T.en;
  if (da > 0) return da + " " + txt.d + " " + txt.ago;
  if (h > 0) return h + " " + txt.hr + " " + txt.ago;
  return m + " " + txt.min + " " + txt.ago;
}

function formatDate(dateStr, lang) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    const opts = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    // For Kannada, use Indian locale which is close enough
    const locale = lang === "kn" ? "kn-IN" : "en-IN";
    return d.toLocaleDateString(locale, opts);
  } catch {
    return dateStr;
  }
}

function cleanDesc(raw) {
  if (!raw) return "";
  return raw
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 300);
}

function extractSource(link, lang) {
  if (!link) return "";
  try {
    const host = new URL(link).hostname.replace("www.", "");
    const txt = lang === "kn" ? T.kn : T.en;
    if (host.includes("thehindu") || host.includes("hindubusinessline")) {
      if (host.includes("hindubusinessline")) return txt.sourceHinduBizLine;
      return txt.sourceTheHindu;
    }
    if (host.includes("timesofindia") || host.includes("indiatimes"))
      return txt.sourceTOI;
    if (host.includes("deccanherald")) return txt.sourceDeccanHerald;
    if (host.includes("economictimes")) return txt.sourceEconomicTimes;
    return host.split(".")[0];
  } catch {
    return "";
  }
}

function extractImage(item) {
  if (item.thumbnail) return item.thumbnail;
  if (item.enclosure && item.enclosure.link) return item.enclosure.link;
  if (item["media:content"] && item["media:content"].url)
    return item["media:content"].url;
  if (item.description) {
    const m = item.description.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (m) return m[1];
  }
  return null;
}

// ─── FETCH RSS VIA rss2json PROXY ──────────────────────────────

async function fetchFeed(url) {
  const proxyUrl =
    "https://api.rss2json.com/v1/api.json?rss_url=" +
    encodeURIComponent(url);
  const resp = await fetch(proxyUrl);
  if (!resp.ok) throw new Error("HTTP " + resp.status);
  const data = await resp.json();
  if (data.status !== "ok") throw new Error("rss2json: " + data.status);
  return (data.items || []).map((item) => ({
    title: item.title || "",
    desc: cleanDesc(item.description),
    link: item.link || "",
    date: item.pubDate || "",
    img: extractImage(item),
    sourceUrl: item.link || "",
  }));
}

// ─── FETCH ALL FEEDS FOR A CATEGORY ────────────────────────────

async function fetchCategory(feeds) {
  const results = await Promise.allSettled(
    feeds.map((url) => fetchFeed(url))
  );
  const seen = new Set();
  const articles = [];
  for (const r of results) {
    if (r.status === "fulfilled") {
      for (const a of r.value) {
        if (a.link && !seen.has(a.link)) {
          seen.add(a.link);
          articles.push(a);
        }
      }
    }
  }
  // Sort by date descending
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return articles.slice(0, 40);
}

// ─── COMPONENT ─────────────────────────────────────────────────

export default function News() {
  const nav = useNavigate();
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("nk_lang") || "bi";
    } catch {
      return "bi";
    }
  });

  // Bilingual render helper (matches the app's standard R() pattern)
  const R = useCallback(
    (en, kn) => {
      if (lang === "en") return en;
      if (lang === "kn") return kn;
      return en + " | " + kn;
    },
    [lang]
  );

  // Listen for global language changes from the app
  useEffect(() => {
    const handler = (e) => setLang(e.detail);
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  // ─── State ──────────────────────────────────────────────────
  const [catState, setCatState] = useState({});
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [sourceFilter, setSourceFilter] = useState(null); // null = all, or source hostname
  const [showSourceFilter, setShowSourceFilter] = useState(false);
  const fetchRef = useRef(false);
  const searchInputRef = useRef(null);

  // ─── Fetch all categories ───────────────────────────────────
  const loadAll = useCallback(async () => {
    const init = {};
    for (const c of CATEGORIES) {
      init[c.id] = { loading: true, error: null, articles: [] };
    }
    setCatState(init);

    const promises = CATEGORIES.map(async (c) => {
      try {
        const articles = await fetchCategory(c.feeds);
        return { id: c.id, loading: false, error: null, articles };
      } catch (err) {
        return {
          id: c.id,
          loading: false,
          error: err.message,
          articles: [],
        };
      }
    });

    const results = await Promise.all(promises);
    const newState = {};
    for (const r of results) {
      newState[r.id] = {
        loading: r.loading,
        error: r.error,
        articles: r.articles,
      };
    }
    setCatState(newState);
  }, []);

  useEffect(() => {
    if (!fetchRef.current) {
      fetchRef.current = true;
      loadAll();
    }
  }, [loadAll]);

  // ─── Retry single category ──────────────────────────────────
  const retryCategory = useCallback(async (catId, feeds) => {
    setCatState((prev) => ({
      ...prev,
      [catId]: { loading: true, error: null, articles: [] },
    }));
    try {
      const articles = await fetchCategory(feeds);
      setCatState((prev) => ({
        ...prev,
        [catId]: { loading: false, error: null, articles },
      }));
    } catch (err) {
      setCatState((prev) => ({
        ...prev,
        [catId]: { loading: false, error: err.message, articles: [] },
      }));
    }
  }, []);

  // ─── Collect available sources for filtering ────────────────
  const availableSources = useMemo(() => {
    const allArts = catState[activeCat]?.articles || [];
    const srcSet = new Set();
    for (const a of allArts) {
      const s = extractSource(a.sourceUrl, lang);
      if (s) srcSet.add(s);
    }
    return Array.from(srcSet).sort();
  }, [catState, activeCat, lang]);

  // ─── Filter & search articles ───────────────────────────────
  const activeArticles = useMemo(() => {
    let arts = catState[activeCat]?.articles || [];

    // Source filter
    if (sourceFilter) {
      arts = arts.filter((a) => {
        const s = extractSource(a.sourceUrl, lang);
        return s === sourceFilter;
      });
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      arts = arts.filter(
        (a) =>
          (a.title || "").toLowerCase().includes(q) ||
          (a.desc || "").toLowerCase().includes(q)
      );
    }

    return arts;
  }, [catState, activeCat, sourceFilter, searchQuery, lang]);

  const activeLoading = catState[activeCat]?.loading || false;
  const activeError = catState[activeCat]?.error || null;
  const activeTotal = catState[activeCat]?.articles?.length || 0;

  // ─── Overall state ──────────────────────────────────────────
  const allIds = CATEGORIES.map((c) => c.id);
  const anyLoading = allIds.some((id) => catState[id]?.loading);
  const allFailed =
    allIds.length > 0 &&
    allIds.every(
      (id) => catState[id] && !catState[id].loading && catState[id].error
    );
  const allEmpty =
    !anyLoading &&
    !allFailed &&
    allIds.length > 0 &&
    allIds.every(
      (id) =>
        catState[id] &&
        !catState[id].loading &&
        !catState[id].error &&
        catState[id].articles.length === 0
    );

  // ─── Helpers for component ──────────────────────────────────
  const txt = lang === "kn" ? T.kn : T.en;

  const handleOpenSearch = () => {
    setShowSearch(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowSearch(false);
  };

  const handleCategoryChange = (catId) => {
    setActiveCat(catId);
    setSourceFilter(null);
    setSearchQuery("");
    setShowSearch(false);
  };

  const currentCategory = CATEGORIES.find((c) => c.id === activeCat);

  // ─── RENDER ─────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => nav("/")}
            className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            title={R(T.en.backTitle, T.kn.backTitle)}
          >
            <HiArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {R(T.en.title, T.kn.title)}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Search toggle */}
          <button
            onClick={showSearch ? handleClearSearch : handleOpenSearch}
            className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            title={
              showSearch
                ? R(T.en.clearSearch, T.kn.clearSearch)
                : R(T.en.searchPlaceholder, T.kn.searchPlaceholder)
            }
          >
            {showSearch ? <HiX size={16} /> : <HiSearch size={17} />}
          </button>

          {/* Source filter toggle */}
          {!activeLoading && !activeError && activeTotal > 0 && (
            <button
              onClick={() => setShowSourceFilter(!showSourceFilter)}
              className={`w-9 h-9 rounded-lg shadow-sm border flex items-center justify-center transition-colors ${
                sourceFilter
                  ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 border-primary-300 dark:border-primary-700"
                  : "bg-white dark:bg-gray-800 text-gray-500 border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              title={R(T.en.filterTitle, T.kn.filterTitle)}
            >
              <HiFilter size={17} />
            </button>
          )}

          {/* Refresh */}
          <button
            onClick={loadAll}
            disabled={anyLoading}
            className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 flex items-center justify-center text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            title={R(T.en.refreshTitle, T.kn.refreshTitle)}
          >
            <HiRefresh
              size={18}
              className={anyLoading ? "animate-spin" : ""}
            />
          </button>
        </div>
      </div>

      {/* ── Search bar ── */}
      {showSearch && (
        <div className="mb-3 animate-fadeIn">
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={R(T.en.searchPlaceholder, T.kn.searchPlaceholder)}
              className="w-full pl-9 pr-9 py-2.5 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                title={R(T.en.clearSearch, T.kn.clearSearch)}
              >
                <HiX size={15} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Source filter chips ── */}
      {showSourceFilter && availableSources.length > 0 && (
        <div className="flex gap-1.5 mb-3 overflow-x-auto scrollbar-none pb-1 animate-fadeIn">
          <button
            onClick={() => setSourceFilter(null)}
            className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
              sourceFilter === null
                ? "bg-primary-600 text-white shadow"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border dark:border-gray-700"
            }`}
          >
            {R(T.en.filterAll, T.kn.filterAll)}
          </button>
          {availableSources.map((src) => (
            <button
              key={src}
              onClick={() =>
                setSourceFilter(sourceFilter === src ? null : src)
              }
              className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
                sourceFilter === src
                  ? "bg-primary-600 text-white shadow"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border dark:border-gray-700"
              }`}
            >
              {src}
            </button>
          ))}
        </div>
      )}

      {/* ── Category tabs ── */}
      <div className="flex gap-1.5 mb-4 overflow-x-auto scrollbar-none pb-1">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const count = catState[cat.id]?.articles?.length || 0;
          const isLoading = catState[cat.id]?.loading;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={
                "flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all " +
                (activeCat === cat.id
                  ? "bg-primary-600 text-white shadow"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700")
              }
            >
              <Icon size={14} />
              <span className="whitespace-nowrap">{R(cat.en, cat.kn)}</span>
              {!isLoading && count > 0 && (
                <span
                  className={`ml-0.5 text-[10px] ${
                    activeCat === cat.id ? "opacity-80" : "opacity-60"
                  }`}
                >
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Content area ── */}
      {/* Global first-load spinner */}
      {anyLoading &&
      allIds.every((id) => !catState[id] || catState[id].loading) ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-sm border dark:border-gray-700 text-center">
          <div className="animate-spin w-9 h-9 border-3 border-primary-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-sm text-gray-500">{R(T.en.loading, T.kn.loading)}</p>
        </div>
      ) : allFailed ? (
        /* All sources failed */
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-10 text-center border border-amber-200 dark:border-amber-800">
          <HiExclamation
            className="mx-auto text-amber-500 mb-3"
            size={36}
          />
          <p className="text-amber-700 dark:text-amber-300 text-sm mb-4">
            {R(T.en.errorGlobal, T.kn.errorGlobal)}
          </p>
          <button
            onClick={loadAll}
            className="px-5 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            {R(T.en.retry, T.kn.retry)}
          </button>
        </div>
      ) : allEmpty ? (
        /* All loaded but no articles at all */
        <div className="bg-white dark:bg-gray-800 rounded-xl p-10 shadow-sm border dark:border-gray-700 text-center">
          <HiNewspaper
            className="mx-auto text-gray-300 dark:text-gray-600 mb-3"
            size={36}
          />
          <p className="text-sm text-gray-500">
            {R(T.en.noNewsGlobal, T.kn.noNewsGlobal)}
          </p>
        </div>
      ) : (
        /* Per-category content */
        <div>
          {/* Per-category loading spinner */}
          {activeLoading && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-10 shadow-sm border dark:border-gray-700 text-center">
              <div className="animate-spin w-7 h-7 border-2 border-primary-600 border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-sm text-gray-500">
                {R(T.en.loadingCat, T.kn.loadingCat)}
              </p>
            </div>
          )}

          {/* Per-category error with tap-to-retry */}
          {!activeLoading && activeError && (
            <div
              className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8 text-center border border-red-200 dark:border-red-800 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              onClick={() => {
                if (currentCategory) retryCategory(activeCat, currentCategory.feeds);
              }}
            >
              <HiExclamation
                className="mx-auto text-red-400 mb-2"
                size={28}
              />
              <p className="text-red-600 dark:text-red-400 text-sm mb-1">
                {R(T.en.errorCat, T.kn.errorCat)}
              </p>
              <p className="text-xs text-red-400 dark:text-red-500">
                {activeError}
              </p>
            </div>
          )}

          {/* Per-category empty */}
          {!activeLoading && !activeError && activeArticles.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-10 shadow-sm border dark:border-gray-700 text-center">
              <HiNewspaper
                className="mx-auto text-gray-300 dark:text-gray-600 mb-3"
                size={36}
              />
              <p className="text-sm text-gray-500">
                {searchQuery
                  ? R(T.en.searchEmpty, T.kn.searchEmpty)
                  : R(T.en.noNewsCat, T.kn.noNewsCat)}
              </p>
            </div>
          )}

          {/* Articles list */}
          {!activeLoading && !activeError && activeArticles.length > 0 && (
            <>
              {/* Article count + filter info */}
              <div className="flex items-center justify-between mb-2 px-1">
                <p className="text-[10px] text-gray-400 dark:text-gray-500">
                  {R(T.en.showing, T.kn.showing)}{" "}
                  {activeArticles.length}{" "}
                  {activeArticles.length !== activeTotal && activeTotal > 0
                    ? "/ " + activeTotal
                    : ""}{" "}
                  {R(T.en.articles, T.kn.articles)}
                  {sourceFilter
                    ? " " +
                      R(T.en.from, T.kn.from) +
                      " " +
                      sourceFilter
                    : ""}
                </p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500">
                  {R(T.en.updated, T.kn.updated)}:{" "}
                  {new Date().toLocaleTimeString(
                    lang === "kn" ? "kn-IN" : "en-IN",
                    { hour: "2-digit", minute: "2-digit" }
                  )}
                </p>
              </div>

              <div className="space-y-3">
                {activeArticles.map((a, i) => {
                  const sourceName = extractSource(a.sourceUrl, lang);
                  return (
                    <a
                      key={a.link + i}
                      href={a.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700 hover:shadow-md transition-shadow group"
                    >
                      <div className="flex gap-3">
                        {a.img && (
                          <img
                            src={a.img}
                            alt=""
                            className="w-20 h-20 rounded-lg object-cover flex-shrink-0 bg-gray-100 dark:bg-gray-700"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {a.title}
                          </h3>
                          {a.desc && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                              {a.desc}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            {sourceName && (
                              <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                                {sourceName}
                              </span>
                            )}
                            {a.date && (
                              <span
                                className="text-[10px] text-gray-400"
                                title={formatDate(a.date, lang)}
                              >
                                {timeAgo(a.date, lang)}
                              </span>
                            )}
                            <span className="text-[10px] text-primary-500 flex items-center gap-0.5 ml-auto">
                              <HiExternalLink size={10} />
                              {R(T.en.readArticle, T.kn.readArticle)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
