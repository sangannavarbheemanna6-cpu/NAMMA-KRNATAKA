import { useState, useEffect, useCallback, useRef } from "react";
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
} from "react-icons/hi";

const CATEGORIES = [
  {
    id: "karnataka",
    en: "🏛️ Karnataka",
    kn: "ಕರ್ನಾಟಕ",
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
    kn: "ಭಾರತ",
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
    kn: "ಬೆಂಗಳೂರು",
    icon: HiOfficeBuilding,
    feeds: [
      "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms",
      "https://www.thehindu.com/news/national/karnataka/feeder/default.rss",
    ],
  },
  {
    id: "agriculture",
    en: "🌾 Agriculture",
    kn: "ಕೃಷಿ",
    icon: HiSparkles,
    feeds: [
      "https://www.thehindu.com/sci-tech/agriculture/feeder/default.rss",
    ],
  },
  {
    id: "business",
    en: "💼 Business",
    kn: "ವ್ಯಾಪಾರ",
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
    kn: "ಶಿಕ್ಷಣ",
    icon: HiAcademicCap,
    feeds: [
      "https://www.thehindu.com/education/feeder/default.rss",
      "https://timesofindia.indiatimes.com/rssfeeds/913168846.cms",
    ],
  },
  {
    id: "sports",
    en: "⚽ Sports",
    kn: "ಕ್ರೀಡೆ",
    icon: HiLightBulb,
    feeds: [
      "https://www.thehindu.com/sport/feeder/default.rss",
      "https://timesofindia.indiatimes.com/rssfeeds/4719148.cms",
    ],
  },
  {
    id: "technology",
    en: "💻 Technology",
    kn: "ತಂತ್ರಜ್ಞಾನ",
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
    kn: "ಆರೋಗ್ಯ",
    icon: HiHeart,
    feeds: [
      "https://www.thehindu.com/sci-tech/health/feeder/default.rss",
      "https://timesofindia.indiatimes.com/rssfeeds/3908999.cms",
    ],
  },
  {
    id: "environment",
    en: "🌦️ Environment",
    kn: "ಪರಿಸರ",
    icon: HiSun,
    feeds: [
      "https://www.thehindu.com/sci-tech/energy-and-environment/feeder/default.rss",
      "https://timesofindia.indiatimes.com/rssfeeds/2647163.cms",
    ],
  },
];

const T = {
  en: {
    t: "News",
    ld: "Loading news...",
    err: "Could not load news. Tap to retry.",
    rf: "Retry",
    src: "Source",
    read: "Read full article",
    ago: "ago",
    min: "min",
    hr: "hr",
    d: "d",
    noNews: "No articles available right now.",
    allEmpty: "No news available. Pull to refresh.",
    allErr: "All sources temporarily unavailable. Please try again later.",
  },
  kn: {
    t: "ಸುದ್ದಿ",
    ld: "ಸುದ್ದಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    err: "ಸುದ್ದಿ ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
    rf: "ಮರುಪ್ರಯತ್ನ",
    src: "ಮೂಲ",
    read: "ಪೂರ್ಣ ಲೇಖನ ಓದಿ",
    ago: "ಹಿಂದೆ",
    min: "ನಿ",
    hr: "ಗಂ",
    d: "ದಿ",
    noNews: "ಈಗ ಯಾವುದೇ ಲೇಖನಗಳಿಲ್ಲ.",
    allEmpty: "ಯಾವುದೇ ಸುದ್ದಿ ಲಭ್ಯವಿಲ್ಲ.",
    allErr: "ಎಲ್ಲಾ ಮೂಲಗಳು ತಾತ್ಕಾಲಿಕವಾಗಿ ಲಭ್ಯವಿಲ್ಲ.",
  },
};

function timeAgo(d, lg) {
  if (!d) return "";
  const ms = Date.now() - new Date(d).getTime();
  const m = Math.floor(ms / 60000);
  const h = Math.floor(m / 60);
  const da = Math.floor(h / 24);
  const suf = lg === "kn" ? T.kn : T.en;
  if (da > 0) return da + suf.d + " " + suf.ago;
  if (h > 0) return h + suf.hr + " " + suf.ago;
  if (m > 0) return m + suf.min + " " + suf.ago;
  return "1" + suf.min + " " + suf.ago;
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
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 250);
}

function extractSource(link) {
  if (!link) return "";
  try {
    const host = new URL(link).hostname.replace("www.", "");
    if (host.includes("thehindu")) return "The Hindu";
    if (host.includes("timesofindia") || host.includes("indiatimes"))
      return "Times of India";
    if (host.includes("deccanherald")) return "Deccan Herald";
    if (host.includes("economictimes")) return "Economic Times";
    if (host.includes("hindubusinessline")) return "Hindu BusinessLine";
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
    source: extractSource(item.link),
  }));
}

async function fetchCategory(categoryId, feeds) {
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
  return articles.slice(0, 30);
}

export default function News() {
  const nav = useNavigate();
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("nk_lang") || "bi";
    } catch {
      return "bi";
    }
  });

  const R = useCallback(
    (en, kn) => {
      if (lang === "en") return en;
      if (lang === "kn") return kn;
      return en + " | " + kn;
    },
    [lang]
  );

  useEffect(() => {
    const handler = (e) => setLang(e.detail);
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  const [catState, setCatState] = useState({});
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].id);
  const fetchRef = useRef(false);

  const loadAll = useCallback(async () => {
    const init = {};
    for (const c of CATEGORIES) {
      init[c.id] = { loading: true, error: null, articles: [] };
    }
    setCatState(init);

    const promises = CATEGORIES.map(async (c) => {
      try {
        const articles = await fetchCategory(c.id, c.feeds);
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
      newState[r.id] = { loading: r.loading, error: r.error, articles: r.articles };
    }
    setCatState(newState);
  }, []);

  useEffect(() => {
    if (!fetchRef.current) {
      fetchRef.current = true;
      loadAll();
    }
  }, [loadAll]);

  const retryCategory = useCallback(async (catId, feeds) => {
    setCatState((prev) => ({
      ...prev,
      [catId]: { loading: true, error: null, articles: [] },
    }));
    try {
      const articles = await fetchCategory(catId, feeds);
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

  const allIds = CATEGORIES.map((c) => c.id);
  const anyLoading = allIds.some((id) => catState[id]?.loading);
  const allFailed =
    allIds.length > 0 &&
    allIds.every((id) => catState[id] && !catState[id].loading && catState[id].error);
  const allEmpty =
    !anyLoading &&
    !allFailed &&
    allIds.length > 0 &&
    allIds.every(
      (id) =>
        catState[id] && !catState[id].loading && !catState[id].error && catState[id].articles.length === 0
    );

  const activeArticles = catState[activeCat]?.articles || [];
  const activeLoading = catState[activeCat]?.loading || false;
  const activeError = catState[activeCat]?.error || null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => nav("/")}
            className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <HiArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {R(T.en.t, T.kn.t)}
          </h1>
        </div>
        <button
          onClick={loadAll}
          disabled={anyLoading}
          className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 flex items-center justify-center text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          title={R("Refresh all", "ಎಲ್ಲಾ ರಿಫ್ರೆಶ್")}
        >
          <HiRefresh size={18} className={anyLoading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="flex gap-1.5 mb-4 overflow-x-auto scrollbar-none pb-1">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const count = catState[cat.id]?.articles?.length || 0;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={
                "flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all " +
                (activeCat === cat.id
                  ? "bg-primary-600 text-white shadow"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700")
              }
            >
              <Icon size={14} />
              <span className="whitespace-nowrap">{R(cat.en, cat.kn)}</span>
              {!catState[cat.id]?.loading && count > 0 && (
                <span className="ml-0.5 text-[10px] opacity-70">({count})</span>
              )}
            </button>
          );
        })}
      </div>

      {anyLoading && allIds.every((id) => !catState[id] || catState[id].loading) ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-sm border dark:border-gray-700 text-center">
          <div className="animate-spin w-9 h-9 border-3 border-primary-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-sm text-gray-500">{R(T.en.ld, T.kn.ld)}</p>
        </div>
      ) : allFailed ? (
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-10 text-center border border-amber-200 dark:border-amber-800">
          <HiExclamation className="mx-auto text-amber-500 mb-3" size={36} />
          <p className="text-amber-700 dark:text-amber-300 text-sm mb-4">
            {R(T.en.allErr, T.kn.allErr)}
          </p>
          <button
            onClick={loadAll}
            className="px-5 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            {R(T.en.rf, T.kn.rf)}
          </button>
        </div>
      ) : allEmpty ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-10 shadow-sm border dark:border-gray-700 text-center">
          <HiNewspaper className="mx-auto text-gray-300 dark:text-gray-600 mb-3" size={36} />
          <p className="text-sm text-gray-500">{R(T.en.allEmpty, T.kn.allEmpty)}</p>
        </div>
      ) : (
        <div>
          {activeLoading && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border dark:border-gray-700 text-center">
              <div className="animate-spin w-7 h-7 border-2 border-primary-600 border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-sm text-gray-500">{R(T.en.ld, T.kn.ld)}</p>
            </div>
          )}

          {!activeLoading && activeError && (
            <div
              className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8 text-center border border-red-200 dark:border-red-800 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              onClick={() => {
                const cat = CATEGORIES.find((c) => c.id === activeCat);
                if (cat) retryCategory(activeCat, cat.feeds);
              }}
            >
              <p className="text-red-600 dark:text-red-400 text-sm mb-2">
                {R(T.en.err, T.kn.err)}
              </p>
              <p className="text-xs text-red-400 dark:text-red-500">{activeError}</p>
            </div>
          )}

          {!activeLoading &&
            !activeError &&
            activeArticles.length === 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-10 shadow-sm border dark:border-gray-700 text-center">
                <HiNewspaper
                  className="mx-auto text-gray-300 dark:text-gray-600 mb-3"
                  size={36}
                />
                <p className="text-sm text-gray-500">
                  {R(T.en.noNews, T.kn.noNews)}
                </p>
              </div>
            )}

          {!activeLoading && !activeError && activeArticles.length > 0 && (
            <div className="space-y-3">
              {activeArticles.map((a, i) => (
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
                        {a.source && (
                          <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                            {a.source}
                          </span>
                        )}
                        {a.date && (
                          <span className="text-[10px] text-gray-400">
                            {timeAgo(a.date, lang)}
                          </span>
                        )}
                        <span className="text-[10px] text-primary-500 flex items-center gap-0.5 ml-auto">
                          <HiExternalLink size={10} />
                          {R(T.en.read, T.kn.read)}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}