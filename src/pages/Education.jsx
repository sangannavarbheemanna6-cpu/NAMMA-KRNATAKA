import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiArrowLeft,
  HiOutlineAcademicCap,
  HiOutlineExternalLink,
  HiOutlineRefresh,
  HiOutlineNewspaper,
} from "react-icons/hi";

const FEEDS = {
  toi: {
    name: "Times of India",
    url: "https://timesofindia.indiatimes.com/rssfeeds/913168846.cms",
  },
  hindu: {
    name: "The Hindu",
    url: "https://www.thehindu.com/education/feeder/default.rss",
  },
};

const LINKS = [
  {
    title: "National Scholarship Portal",
    kn: "ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್",
    desc: "Apply and check scholarship services",
    knDesc: "ವಿದ್ಯಾರ್ಥಿವೇತನ ಅರ್ಜಿ ಮತ್ತು ಸೇವೆಗಳು",
    url: "https://scholarships.gov.in/",
  },
  {
    title: "SSP Scholarship",
    kn: "SSP ವಿದ್ಯಾರ್ಥಿವೇತನ",
    desc: "Karnataka State Scholarship services",
    knDesc: "ಕರ್ನಾಟಕ ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಸೇವೆಗಳು",
    url: "https://ssp.karnataka.gov.in/",
  },
  {
    title: "NCERT Syllabus & Question Papers",
    kn: "NCERT ಪಠ್ಯಕ್ರಮ ಮತ್ತು ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳು",
    desc: "Syllabus, previous papers and study resources",
    knDesc: "ಪಠ್ಯಕ್ರಮ, ಹಿಂದಿನ ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳು ಮತ್ತು ಅಧ್ಯಯನ ಸಾಮಗ್ರಿ",
    url: "https://aglasem.com/",
  },
  {
    title: "DigiLocker",
    kn: "ಡಿಜಿಲಾಕರ್",
    desc: "Access your digital education documents",
    knDesc: "ಡಿಜಿಟಲ್ ಶಿಕ್ಷಣ ದಾಖಲೆಗಳನ್ನು ಪಡೆಯಿರಿ",
    url: "https://www.digilocker.gov.in/",
  },
  {
    title: "Karnataka School Education",
    kn: "ಕರ್ನಾಟಕ ಶಾಲಾ ಶಿಕ್ಷಣ",
    desc: "School education department services",
    knDesc: "ಶಾಲಾ ಶಿಕ್ಷಣ ಇಲಾಖೆಯ ಸೇವೆಗಳು",
    url: "https://schooleducation.karnataka.gov.in/",
  },
  {
    title: "UGC",
    kn: "UGC",
    desc: "University and higher education information",
    knDesc: "ವಿಶ್ವವಿದ್ಯಾಲಯ ಮತ್ತು ಉನ್ನತ ಶಿಕ್ಷಣ ಮಾಹಿತಿ",
    url: "https://www.ugc.gov.in/",
  },
  {
    title: "NCERT e-Pathshala",
    kn: "NCERT ಇ-ಪಾಠಶಾಲೆ",
    desc: "Digital textbooks and learning materials",
    knDesc: "ಡಿಜಿಟಲ್ ಪಠ್ಯಪುಸ್ತಕಗಳು ಮತ್ತು ಅಧ್ಯಯನ ಸಾಮಗ್ರಿ",
    url: "https://epathshala.nic.in/",
  },
  {
    title: "SWAYAM",
    kn: "SWAYAM",
    desc: "Online courses from leading institutions",
    knDesc: "ಪ್ರಮುಖ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಗಳ ಆನ್‌ಲೈನ್ ಕೋರ್ಸ್‌ಗಳು",
    url: "https://swayam.gov.in/",
  },
  {
    title: "UDISE+ Know Your School",
    kn: "UDISE+ ನಿಮ್ಮ ಶಾಲೆಯನ್ನು ಹುಡುಕಿ",
    desc: "Find school information across India",
    knDesc: "ಭಾರತದಾದ್ಯಂತ ಶಾಲೆಗಳ ಮಾಹಿತಿಯನ್ನು ಹುಡುಕಿ",
    url: "https://kys.udiseplus.gov.in/",
  },
];

function R(en, kn, lang) {
  if (lang === "kn") return kn;
  if (lang === "en") return en;
  return `${en} / ${kn}`;
}

export default function Education() {
  const navigate = useNavigate();

  const [lang, setLang] = useState(
    localStorage.getItem("nk_lang") || "bi"
  );

  const [feed, setFeed] = useState("toi");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleLanguageChange = () => {
      setLang(localStorage.getItem("nk_lang") || "bi");
    };

    window.addEventListener("langchange", handleLanguageChange);

    return () => {
      window.removeEventListener("langchange", handleLanguageChange);
    };
  }, []);

  async function loadNews(selectedFeed = feed) {
    setLoading(true);
    setError("");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const source = FEEDS[selectedFeed];

      const apiUrl =
        `https://api.rss2json.com/v1/api.json?rss_url=` +
        encodeURIComponent(source.url);

      const response = await fetch(apiUrl, {
        signal: controller.signal,
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Unable to load news");
      }

      const data = await response.json();

      if (data.status !== "ok" || !Array.isArray(data.items)) {
        throw new Error("No news available");
      }

      const articles = data.items
        .filter((item) => item && item.title && item.link)
        .slice(0, 12)
        .map((item) => ({
          title: item.title,
          description: item.description
            ? item.description.replace(/<[^>]*>/g, "").trim()
            : "",
          link: item.link,
          date: item.pubDate || "",
          image:
            item.thumbnail ||
            item.enclosure?.link ||
            "",
        }));

      setNews(articles);

      if (!articles.length) {
        setError(
          R(
            "No education news available right now.",
            "ಈಗ ಶಿಕ್ಷಣ ಸುದ್ದಿಗಳು ಲಭ್ಯವಿಲ್ಲ.",
            lang
          )
        );
      }
    } catch (err) {
      console.error("Education News Error:", err);

      setNews([]);

      setError(
        R(
          "Unable to load education news. Please try again.",
          "ಶಿಕ್ಷಣ ಸುದ್ದಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
          lang
        )
      );
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNews(feed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feed]);

  const changeFeed = (newFeed) => {
    if (newFeed === feed) return;
    setFeed(newFeed);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Back"
          >
            <HiArrowLeft className="text-xl" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <HiOutlineAcademicCap className="text-2xl" />
            </div>

            <div>
              <h1 className="font-bold text-lg leading-tight">
                {R("Education", "ಶಿಕ್ಷಣ", lang)}
              </h1>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {R(
                  "Education services and resources",
                  "ಶಿಕ್ಷಣ ಸೇವೆಗಳು ಮತ್ತು ಅಧ್ಯಯನ ಸಂಪನ್ಮೂಲಗಳು",
                  lang
                )}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-5">
        {/* Education Portals */}
        <section className="mb-7">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-xl font-bold">
                {R(
                  "Education Portals",
                  "ಶಿಕ್ಷಣ ಪೋರ್ಟಲ್‌ಗಳು",
                  lang
                )}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {R(
                  "Important education services",
                  "ಪ್ರಮುಖ ಶಿಕ್ಷಣ ಸೇವೆಗಳು",
                  lang
                )}
              </p>
            </div>
          </div>

          {/* 2 Column Square Cards */}
          <div className="grid grid-cols-2 gap-3">
            {LINKS.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square flex flex-col justify-between bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                    <HiOutlineAcademicCap className="text-xl" />
                  </div>

                  <h3 className="font-semibold text-sm leading-snug">
                    {R(item.title, item.kn, lang)}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                    {R(item.desc, item.knDesc, lang)}
                  </p>
                </div>

                <div className="flex items-center justify-between text-blue-600 dark:text-blue-400">
                  <span className="text-xs font-medium">
                    {R("Open", "ತೆರೆಯಿರಿ", lang)}
                  </span>

                  <HiOutlineExternalLink className="text-lg" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Education News */}
        <section>
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <HiOutlineNewspaper className="text-blue-600" />

                {R(
                  "Education News",
                  "ಶಿಕ್ಷಣ ಸುದ್ದಿ",
                  lang
                )}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {R(
                  "Latest education updates",
                  "ಇತ್ತೀಚಿನ ಶಿಕ್ಷಣ ಮಾಹಿತಿಗಳು",
                  lang
                )}
              </p>
            </div>

            <button
              onClick={() => loadNews(feed)}
              disabled={loading}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
              aria-label="Refresh"
            >
              <HiOutlineRefresh
                className={`text-xl ${
                  loading ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>

          {/* Feed Buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => changeFeed("toi")}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                feed === "toi"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
              }`}
            >
              Times of India
            </button>

            <button
              onClick={() => changeFeed("hindu")}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                feed === "hindu"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
              }`}
            >
              The Hindu
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                >
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mb-3" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900 rounded-xl p-5 text-center">
              <p className="text-sm text-red-600 dark:text-red-400 mb-3">
                {error}
              </p>

              <button
                onClick={() => loadNews(feed)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
              >
                {R("Try Again", "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ", lang)}
              </button>
            </div>
          )}

          {/* News List */}
          {!loading && !error && news.length > 0 && (
            <div className="space-y-3">
              {news.map((article, index) => (
                <a
                  key={`${article.link}-${index}`}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-3 p-4">
                    {article.image && (
                      <img
                        src={article.image}
                        alt=""
                        className="w-24 h-20 object-cover rounded-lg flex-shrink-0 bg-gray-100 dark:bg-gray-700"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm leading-snug line-clamp-3">
                        {article.title}
                      </h3>

                      {article.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                          {article.description}
                        </p>
                      )}

                      {article.date && (
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-2">
                          {article.date}
                        </p>
                      )}
                    </div>

                    <HiOutlineExternalLink className="text-gray-400 flex-shrink-0 mt-1" />
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* No News */}
          {!loading && !error && news.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
              <HiOutlineNewspaper className="mx-auto text-4xl text-gray-400 mb-2" />

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {R(
                  "No education news available.",
                  "ಶಿಕ್ಷಣ ಸುದ್ದಿ ಲಭ್ಯವಿಲ್ಲ.",
                  lang
                )}
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
