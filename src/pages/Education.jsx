
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiArrowLeft,
  HiAcademicCap,
  HiExternalLink,
  HiRefresh
} from "react-icons/hi";

const FEEDS = [
  {
    id: "toi",
    en: "TOI Education",
    kn: "TOI ಶಿಕ್ಷಣ",
    url: "https://timesofindia.indiatimes.com/rssfeeds/913168846.cms"
  },
  {
    id: "hindu",
    en: "The Hindu",
    kn: "ದಿ ಹಿಂದೂ",
    url: "https://www.thehindu.com/education/feeder/default.rss"
  }
];

const LINKS = [
  {
    en: "NSP Scholarship Portal",
    kn: "NSP ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್",
    url: "https://scholarships.gov.in/",
    d: "Apply for national scholarships",
    dk: "ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ"
  },
  {
    en: "SSP Scholarship Portal",
    kn: "SSP ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್",
    url: "https://ssp.karnataka.gov.in/",
    d: "Karnataka State Scholarship Portal",
    dk: "ಕರ್ನಾಟಕ ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್"
  },
  {
    en: "DigiLocker",
    kn: "ಡಿಜಿಲಾಕರ್",
    url: "https://digilocker.gov.in/",
    d: "Access digital documents",
    dk: "ಡಿಜಿಟಲ್ ದಾಖಲೆಗಳನ್ನು ಪಡೆಯಿರಿ"
  },
  {
    en: "Karnataka School Education",
    kn: "ಕರ್ನಾಟಕ ಶಾಲಾ ಶಿಕ್ಷಣ",
    url: "https://schooleducation.karnataka.gov.in/",
    d: "Official state education portal",
    dk: "ರಾಜ್ಯ ಶಿಕ್ಷಣ ಇಲಾಖೆಯ ಅಧಿಕೃತ ಪೋರ್ಟಲ್"
  },
  {
    en: "UGC - Higher Education",
    kn: "UGC - ಉನ್ನತ ಶಿಕ್ಷಣ",
    url: "https://www.ugc.ac.in/",
    d: "University Grants Commission",
    dk: "ವಿಶ್ವವಿದ್ಯಾಲಯ ಅನುದಾನ ಆಯೋಗ"
  },
  {
    en: "NCERT e-Pathshala",
    kn: "NCERT ಇ-ಪಾಠಶಾಲಾ",
    url: "https://epathshala.nic.in/",
    d: "Free digital textbooks & resources",
    dk: "ಉಚಿತ ಡಿಜಿಟಲ್ ಪಠ್ಯಪುಸ್ತಕಗಳು"
  },
  {
    en: "SWAYAM Online Courses",
    kn: "ಸ್ವಯಂ ಆನ್‌ಲೈನ್ ಕೋರ್ಸ್‌ಗಳು",
    url: "https://swayam.gov.in/",
    d: "Free online courses from top institutions",
    dk: "ಪ್ರಮುಖ ಸಂಸ್ಥೆಗಳ ಉಚಿತ ಆನ್‌ಲೈನ್ ಕೋರ್ಸ್‌ಗಳು"
  },
  {
    en: "UDISE+ Know Your School",
    kn: "UDISE+ ಶಾಲೆ ತಿಳಿಯಿರಿ",
    url: "https://kys.udiseplus.gov.in/",
    d: "Find schools by UDISE code",
    dk: "UDISE ಕೋಡ್ ಮೂಲಕ ಶಾಲೆ ಹುಡುಕಿ"
  },
  {
    en: "School GIS Map",
    kn: "ಶಾಲಾ GIS ನಕ್ಷೆ",
    url: "https://schoolgis.nic.in/",
    d: "Interactive school map",
    dk: "ಶಾಲೆಗಳ ಸಂವಾದಾತ್ಮಕ ನಕ್ಷೆ"
  }
];

const T = {
  en: {
    t: "Education",
    news: "Education News",
    ld: "Loading articles...",
    err: "Could not load articles.",
    rf: "Refresh",
    portals: "Education Portals",
    read: "Read more",
    n: "No articles available",
    source: "Source"
  },
  kn: {
    t: "ಶಿಕ್ಷಣ",
    news: "ಶಿಕ್ಷಣ ಸುದ್ದಿ",
    ld: "ಲೇಖನಗಳು ಲೋಡ್ ಆಗುತ್ತಿವೆ...",
    err: "ಲೇಖನಗಳು ಲೋಡ್ ಆಗಲಿಲ್ಲ.",
    rf: "ಮತ್ತೆ ಲೋಡ್ ಮಾಡಿ",
    portals: "ಶಿಕ್ಷಣ ಪೋರ್ಟಲ್‌ಗಳು",
    read: "ಇನ್ನಷ್ಟು ಓದಿ",
    n: "ಯಾವುದೇ ಲೇಖನಗಳು ಲಭ್ಯವಿಲ್ಲ",
    source: "ಮೂಲ"
  }
};

async function FF(url) {
  const r = await fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=" +
      encodeURIComponent(url)
  );

  const d = await r.json();

  if (d.status !== "ok") {
    throw Error("Failed to load news");
  }

  return d.items.map(function (i) {
    const desc = (i.description || "")
      .replace(/<[^>]*>/g, "")
      .substring(0, 200);

    return {
      title: i.title,
      desc: desc,
      link: i.link,
      date: i.pubDate,
      img:
        i.thumbnail ||
        (i.enclosure ? i.enclosure.link : null)
    };
  }).slice(0, 10);
}

function timeAgo(d, lg) {
  const ms = Date.now() - new Date(d).getTime();
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
  const [er, ser] = useState(null);

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

  useEffect(function () {
    let active = true;

    async function load() {
      sld(true);
      ser(null);

      try {
        const a = await FF(feed.url);

        if (active) {
          sa(a);
          sld(false);
        }
      } catch (e) {
        if (active) {
          ser("fetch");
          sld(false);
        }
      }
    }

    load();

    return function () {
      active = false;
    };
  }, [feed]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-4">

      {/* Header */}

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
          onClick={function () {
            sf({ ...feed });
          }}
          className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 flex items-center justify-center text-cyan-600"
        >
          <HiRefresh size={20} />
        </button>
      </div>

      {/* Education Portals */}

      <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mb-3">
        {R(T.en.portals, T.kn.portals)}
      </h3>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {LINKS.map(function (li, i) {
          return (
            <a
              key={i}
              href={li.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-1">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {R(li.en, li.kn)}
                </p>

                <HiExternalLink
                  size={15}
                  className="text-cyan-600 flex-shrink-0"
                />
              </div>

              <p className="text-xs text-gray-400 mt-2 leading-5">
                {R(li.d, li.dk)}
              </p>
            </a>
          );
        })}
      </div>

      {/* Education News */}

      <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mb-3">
        {R(T.en.news, T.kn.news)}
      </h3>

      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-none pb-1">
        {FEEDS.map(function (f) {
          return (
            <button
              key={f.id}
              onClick={function () {
                sf(f);
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

      {/* Loading */}

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
            onClick={function () {
              sf({ ...feed });
            }}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium"
          >
            {R(T.en.rf, T.kn.rf)}
          </button>
        </div>
      ) : arts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500">
            {R(T.en.n, T.kn.n)}
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
                        e.target.style.display = "none";
                      }}
                    />
                  ) : null}

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-cyan-600 transition-colors">
                      {a.title}
                    </h3>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {a.desc}
                    </p>

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
