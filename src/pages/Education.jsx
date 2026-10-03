import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiArrowLeft,
  HiAcademicCap,
  HiExternalLink,
  HiRefresh,
} from "react-icons/hi";

const FEEDS = [
  {
    id: "toi",
    en: "TOI Education",
    kn: "TOI ಶಿಕ್ಷಣ",
    url: "https://timesofindia.indiatimes.com/rssfeeds/913168846.cms",
  },
  {
    id: "hindu",
    en: "The Hindu",
    kn: "ದಿ ಹಿಂದೂ",
    url: "https://www.thehindu.com/education/feeder/default.rss",
  },
];

const LINKS = [
  {
    en: "NSP Scholarship Portal",
    kn: "NSP ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್",
    url: "https://scholarships.gov.in/",
    d: "Apply for national scholarships",
    dk: "ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
  },
  {
    en: "SSP Scholarship Portal",
    kn: "SSP ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್",
    url: "https://ssp.karnataka.gov.in/",
    d: "Karnataka State Scholarship Portal",
    dk: "ಕರ್ನಾಟಕ ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್",
  },
  {
    en: "NCERT Syllabus & Question Papers",
    kn: "NCERT ಪಠ್ಯಕ್ರಮ ಮತ್ತು ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳು",
    url: "https://aglasem.com/",
    d: "NCERT syllabus, study material & question papers",
    dk: "NCERT ಪಠ್ಯಕ್ರಮ, ಅಧ್ಯಯನ ಸಾಮಗ್ರಿ ಮತ್ತು ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳು",
  },
  {
    en: "DigiLocker",
    kn: "ಡಿಜಿಲಾಕರ್",
    url: "https://digilocker.gov.in/",
    d: "Access digital documents",
    dk: "ಡಿಜಿಟಲ್ ದಾಖಲೆಗಳನ್ನು ಪಡೆಯಿರಿ",
  },
  {
    en: "Karnataka School Education",
    kn: "ಕರ್ನಾಟಕ ಶಾಲಾ ಶಿಕ್ಷಣ",
    url: "https://schooleducation.karnataka.gov.in/",
    d: "Official state education portal",
    dk: "ರಾಜ್ಯ ಶಿಕ್ಷಣ ಇಲಾಖೆಯ ಅಧಿಕೃತ ಪೋರ್ಟಲ್",
  },
  {
    en: "UGC - Higher Education",
    kn: "UGC - ಉನ್ನತ ಶಿಕ್ಷಣ",
    url: "https://www.ugc.ac.in/",
    d: "University Grants Commission",
    dk: "ವಿಶ್ವವಿದ್ಯಾಲಯ ಅನುದಾನ ಆಯೋಗ",
  },
  {
    en: "NCERT e-Pathshala",
    kn: "NCERT ಇ-ಪಾಠಶಾಲಾ",
    url: "https://epathshala.nic.in/",
    d: "Digital textbooks & learning resources",
    dk: "ಡಿಜಿಟಲ್ ಪಠ್ಯಪುಸ್ತಕ ಮತ್ತು ಕಲಿಕಾ ಸಂಪನ್ಮೂಲಗಳು",
  },
  {
    en: "SWAYAM Online Courses",
    kn: "ಸ್ವಯಂ ಆನ್‌ಲೈನ್ ಕೋರ್ಸ್‌ಗಳು",
    url: "https://swayam.gov.in/",
    d: "Online courses from top institutions",
    dk: "ಪ್ರಮುಖ ಸಂಸ್ಥೆಗಳ ಆನ್‌ಲೈನ್ ಕೋರ್ಸ್‌ಗಳು",
  },
  {
    en: "UDISE+ Know Your School",
    kn: "UDISE+ ಶಾಲೆ ತಿಳಿಯಿರಿ",
    url: "https://kys.udiseplus.gov.in/",
    d: "Find schools by UDISE code",
    dk: "UDISE ಕೋಡ್ ಮೂಲಕ ಶಾಲೆ ಹುಡುಕಿ",
  },
];

const T = {
  en: {
    t: "Education",
    portals: "Education Portals",
    news: "Education News",
    ld: "Loading articles...",
    err: "Could not load articles.",
    rf: "Refresh",
    read: "Read more",
    no: "No articles available",
  },
  kn: {
    t: "ಶಿಕ್ಷಣ",
    portals: "ಶಿಕ್ಷಣ ಪೋರ್ಟಲ್‌ಗಳು",
    news: "ಶಿಕ್ಷಣ ಸುದ್ದಿ",
    ld: "ಲೇಖನಗಳು ಲೋಡ್ ಆಗುತ್ತಿವೆ...",
    err: "ಲೇಖನಗಳು ಲೋಡ್ ಆಗಲಿಲ್ಲ.",
    rf: "ಮತ್ತೆ ಲೋಡ್ ಮಾಡಿ",
    read: "ಇನ್ನಷ್ಟು ಓದಿ",
    no: "ಯಾವುದೇ ಲೇಖನಗಳು ಲಭ್ಯವಿಲ್ಲ",
  },
};

async function FF(url) {
  const api =
    "https://api.rss2json.com/v1/api.json?rss_url=" +
    encodeURIComponent(url);

  const controller = new AbortController();

  const timeout = setTimeout(function () {
    controller.abort();
  }, 15000);

  try {
    const r = await fetch(api, {
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeout);

    if (!r.ok) {
      throw new Error("RSS request failed");
    }

    const d = await r.json();

    if (
      !d ||
      d.status !== "ok" ||
      !Array.isArray(d.items) ||
      d.items.length === 0
    ) {
      throw new Error("No RSS articles");
    }

    return d.items
      .map(function (i) {
        const desc = (i.description || i.content || "")
          .replace(/<[^>]*>/g, "")
          .replace(/\s+/g, " ")
          .trim()
          .substring(0, 220);

        return {
          title: i.title || "Education News",
          desc: desc,
          link: i.link || "",
          date: i.pubDate || new Date().toISOString(),
          img:
            i.thumbnail ||
            (i.enclosure && i.enclosure.link
              ? i.enclosure.link
              : null),
        };
      })
      .filter(function (item) {
        return item.title && item.link;
      })
      .slice(0, 10);
  } catch (e) {
    clearTimeout(timeout);
    throw e;
  }
}

function timeAgo(d, lg) {
  const ms = Date.now() - new Date(d).getTime();

  if (isNaN(ms)) {
    return "";
  }

  const m = Math.floor(ms / 60000);
  const h = Math.floor(m / 60);
  const da = Math.floor(h / 24);

  if (da > 0) {
    return da + (lg === "kn" ? " ದಿನ" : "d");
  }

  if (h > 0) {
    return h + (lg === "kn" ? " ಗಂಟೆ" : "h");
  }

  if (m > 0) {
    return m + (lg === "kn" ? " ನಿಮಿಷ" : "m");
  }

  return lg === "kn" ? "ಈಗ" : "Just now";
}

export default function Education() {
  const n = useNavigate();

  const [l, sl] = useState(function () {
    try {
      return localStorage.getItem("nk_lang") || "bi";
    } catch (e) {
      return "bi";
    }
  });

  const [feed, sf] = useState(FEEDS[0]);
  const [arts, sa] = useState([]);
  const [ld, sld] = useState(true);
  const [er, ser] = useState(false);

  const R = function (en, kn) {
    if (l === "en") return en;
    if (l === "kn") return kn;
    return en + " | " + kn;
  };

  useEffect(function () {
    const h = function (e) {
      sl(e.detail);
    };

    window.addEventListener("langchange", h);

    return function () {
      window.removeEventListener("langchange", h);
    };
  }, []);

  const loadNews = async function () {
    sld(true);
    ser(false);

    try {
      const a = await FF(feed.url);
      sa(a);
    } catch (e) {
      console.error("Education news error:", e);
      sa([]);
      ser(true);
    } finally {
      sld(false);
    }
  };

  useEffect(
    function () {
      loadNews();
    },
    [feed]
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-4">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">

          <button
            onClick={function () {
              n("/");
            }}
            className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 flex items-center justify-center text-gray-500"
          >
            <HiArrowLeft size={20} />
          </button>

          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            <HiAcademicCap
              className="inline text-cyan-600 mr-1"
              size={23}
            />
            {R(T.en.t, T.kn.t)}
          </h1>

        </div>

        <button
          onClick={loadNews}
          className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 flex items-center justify-center text-cyan-600"
        >
          <HiRefresh size={20} />
        </button>

      </div>

      {/* EDUCATION PORTALS */}

      <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mb-3">
        {R(T.en.portals, T.kn.portals)}
      </h3>

      <div className="grid grid-cols-3 gap-2 mb-6">

        {LINKS.map(function (li, i) {
          return (
            <a
              key={i}
              href={li.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >

              <div className="flex items-start justify-between gap-1">

                <p className="text-[11px] font-semibold leading-4 text-gray-800 dark:text-gray-100">
                  {R(li.en, li.kn)}
                </p>

                <HiExternalLink
                  size={12}
                  className="text-cyan-600 flex-shrink-0"
                />

              </div>

              <p className="text-[9px] leading-3.5 text-gray-400 mt-1.5">
                {R(li.d, li.dk)}
              </p>

            </a>
          );
        })}

      </div>

      {/* EDUCATION NEWS */}

      <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mb-3">
        {R(T.en.news, T.kn.news)}
      </h3>

      {/* NEWS SOURCES */}

      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-none pb-1">

        {FEEDS.map(function (f) {
          return (
            <button
              key={f.id}
              onClick={function () {
                if (feed.id !== f.id) {
                  sf(f);
                } else {
                  loadNews();
                }
              }}
              className={
                "flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all " +
                (feed.id === f.id
                  ? "bg-cyan-600 text-white shadow"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border dark:border-gray-700")
              }
            >
              {R(f.en, f.kn)}
            </button>
          );
        })}

      </div>

      {/* LOADING */}

      {ld ? (

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border dark:border-gray-700 text-center">

          <div className="animate-spin w-8 h-8 border-2 border-cyan-600 border-t-transparent rounded-full mx-auto mb-3" />

          <p className="text-sm text-gray-500">
            {R(T.en.ld, T.kn.ld)}
          </p>

        </div>

      ) : er ? (

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-8 text-center">

          <p className="text-amber-700 dark:text-amber-300 text-sm mb-4">
            {R(T.en.err, T.kn.err)}
          </p>

          <button
            onClick={loadNews}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium"
          >
            {R(T.en.rf, T.kn.rf)}
          </button>

        </div>

      ) : arts.length === 0 ? (

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border dark:border-gray-700 text-center">

          <p className="text-sm text-gray-500">
            {R(T.en.no, T.kn.no)}
          </p>

        </div>

      ) : (

        <div className="space-y-3">

          {arts.map(function (a, i) {

            return (
              <a
                key={i}
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700 hover:shadow-md transition-shadow group"
              >

                <div className="flex gap-3">

                  {a.img ? (
                    <img
                      src={a.img}
                      alt=""
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                      loading="lazy"
                      onError={function (e) {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : null}

                  <div className="flex-1 min-w-0">

                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-cyan-600 transition-colors">
                      {a.title}
                    </h3>

                    {a.desc ? (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {a.desc}
                      </p>
                    ) : null}

                    <div className="flex items-center gap-3 mt-2">

                      <span className="text-[10px] text-gray-400">
                        {timeAgo(a.date, l)}
                      </span>

                      <span className="text-[10px] text-cyan-500 flex items-center gap-1">
                        <HiExternalLink size={11} />
                        {R(T.en.read, T.kn.read)}
                      </span>

                    </div>

                  </div>

                </div>

              </a>
            );

          })}

        </div>

      )}

    </div>
  );
}
