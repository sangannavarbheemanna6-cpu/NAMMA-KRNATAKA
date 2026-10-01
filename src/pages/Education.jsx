import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiArrowLeft,
  HiAcademicCap,
  HiExternalLink,
  HiRefresh
} from "react-icons/hi";

const PORTALS = [
  {
    id: "nsp",
    en: "National Scholarship Portal (NSP)",
    kn: "ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್ (NSP)",
    url: "https://scholarships.gov.in/"
  },
  {
    id: "ssp",
    en: "State Scholarship Portal (SSP)",
    kn: "ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್ (SSP)",
    url: "https://ssp.postmatric.karnataka.gov.in/"
  },
  {
    id: "digilocker",
    en: "DigiLocker",
    kn: "ಡಿಜಿಲಾಕರ್",
    url: "https://www.digilocker.gov.in/"
  },
  {
    id: "school",
    en: "Karnataka School Education",
    kn: "ಕರ್ನಾಟಕ ಶಾಲಾ ಶಿಕ್ಷಣ",
    url: "https://schooleducation.karnataka.gov.in/"
  },
  {
    id: "ugc",
    en: "UGC",
    kn: "UGC",
    url: "https://www.ugc.gov.in/"
  },
  {
    id: "epathshala",
    en: "NCERT e-Pathshala",
    kn: "NCERT ಇ-ಪಾಠಶಾಲೆ",
    url: "https://epathshala.nic.in/"
  },
  {
    id: "swayam",
    en: "SWAYAM",
    kn: "SWAYAM ಆನ್‌ಲೈನ್ ಕೋರ್ಸ್‌ಗಳು",
    url: "https://swayam.gov.in/"
  },
  {
    id: "udise",
    en: "UDISE+ Know Your School",
    kn: "UDISE+ ನಿಮ್ಮ ಶಾಲೆಯನ್ನು ಹುಡುಕಿ",
    url: "https://kys.udiseplus.gov.in/"
  },
  {
    id: "ncert-papers",
    en: "NCERT Syllabus & Exam Question Papers",
    kn: "NCERT ಪಠ್ಯಕ್ರಮ ಮತ್ತು ಪರೀಕ್ಷಾ ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳು",
    url: "https://aglasem.com/"
  }
];

const SOURCES = [
  {
    id: "toi",
    en: "TOI Education",
    kn: "TOI ಶಿಕ್ಷಣ",
    url: "https://timesofindia.indiatimes.com/rssfeeds/913168846.cms"
  },
  {
    id: "hindu",
    en: "The Hindu Education",
    kn: "ದಿ ಹಿಂದೂ ಶಿಕ್ಷಣ",
    url: "https://www.thehindu.com/education/feeder/default.rss"
  }
];

const TEXT = {
  en: {
    title: "Education",
    subtitle: "Education services, portals and latest updates",
    portals: "Education Portals",
    news: "Education News",
    refresh: "Refresh",
    loading: "Loading latest education news...",
    error: "Unable to load news right now.",
    retry: "Try Again",
    noNews: "No news available right now.",
    back: "Back",
    justNow: "Just now",
    latest: "Latest"
  },
  kn: {
    title: "ಶಿಕ್ಷಣ",
    subtitle: "ಶಿಕ್ಷಣ ಸೇವೆಗಳು, ಪೋರ್ಟಲ್‌ಗಳು ಮತ್ತು ಇತ್ತೀಚಿನ ಮಾಹಿತಿಗಳು",
    portals: "ಶಿಕ್ಷಣ ಪೋರ್ಟಲ್‌ಗಳು",
    news: "ಶಿಕ್ಷಣ ಸುದ್ದಿ",
    refresh: "ರಿಫ್ರೆಶ್",
    loading: "ಇತ್ತೀಚಿನ ಶಿಕ್ಷಣ ಸುದ್ದಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    error: "ಈಗ ಸುದ್ದಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ.",
    retry: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    noNews: "ಈಗ ಯಾವುದೇ ಸುದ್ದಿ ಲಭ್ಯವಿಲ್ಲ.",
    back: "ಹಿಂದೆ",
    justNow: "ಈಗಷ್ಟೇ",
    latest: "ಇತ್ತೀಚಿನ"
  }
};

function getTimeAgo(date, lang) {
  const time = new Date(date).getTime();

  if (!Number.isFinite(time)) {
    return TEXT[lang].latest;
  }

  const seconds = Math.floor((Date.now() - time) / 1000);

  if (seconds < 60) {
    return TEXT[lang].justNow;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return lang === "kn"
      ? `${minutes} ನಿಮಿಷಗಳ ಹಿಂದೆ`
      : `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return lang === "kn"
      ? `${hours} ಗಂಟೆಗಳ ಹಿಂದೆ`
      : `${hours} hr ago`;
  }

  const days = Math.floor(hours / 24);

  return lang === "kn"
    ? `${days} ದಿನಗಳ ಹಿಂದೆ`
    : `${days} days ago`;
}

export default function Education() {
  const navigate = useNavigate();

  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("nk_lang") || "en";
    return TEXT[saved] ? saved : "en";
  });

  const [source, setSource] = useState("toi");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const t = TEXT[lang];

  useEffect(() => {
    const updateLanguage = () => {
      const saved = localStorage.getItem("nk_lang") || "en";
      setLang(TEXT[saved] ? saved : "en");
    };

    window.addEventListener("languagechange", updateLanguage);

    return () => {
      window.removeEventListener("languagechange", updateLanguage);
    };
  }, []);

  const loadNews = async () => {
    setLoading(true);
    setFailed(false);

    try {
      const selected =
        SOURCES.find((item) => item.id === source) || SOURCES[0];

      const endpoint =
        "https://api.rss2json.com/v1/api.json?rss_url=" +
        encodeURIComponent(selected.url);

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error("News request failed");
      }

      const data = await response.json();

      if (!data || data.status !== "ok") {
        throw new Error("News feed failed");
      }

      const items = Array.isArray(data.items)
        ? data.items
            .filter(
              (item) =>
                item &&
                typeof item === "object" &&
                typeof item.title === "string" &&
                item.title.trim()
            )
            .slice(0, 20)
        : [];

      setNews(items);

      if (items.length === 0) {
        setFailed(true);
      }
    } catch (error) {
      console.error("Education news error:", error);
      setNews([]);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, [source]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        color: "#111827"
      }}
    >
      {/* HEADER */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          padding: "12px 14px"
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 10
          }}
        >
          <button
            onClick={() => navigate(-1)}
            aria-label={t.back}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <HiArrowLeft size={21} />
          </button>

          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 900
              }}
            >
              NAMMA KARNATAKA
            </div>

            <div
              style={{
                fontSize: 12,
                color: "#6b7280",
                marginTop: 2
              }}
            >
              {t.title}
            </div>
          </div>

          <HiAcademicCap
            size={28}
            style={{ color: "#1647b6" }}
          />
        </div>
      </header>

      {/* PAGE */}
      <main
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "20px 14px 45px"
        }}
      >
        {/* TITLE */}
        <div style={{ marginBottom: 22 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 900
            }}
          >
            {t.title}
          </h1>

          <p
            style={{
              margin: "7px 0 0",
              color: "#6b7280",
              fontSize: 14,
              lineHeight: 1.5
            }}
          >
            {t.subtitle}
          </p>
        </div>

        {/* PORTALS */}
        <section>
          <h2
            style={{
              margin: "0 0 13px",
              fontSize: 19,
              fontWeight: 900
            }}
          >
            {t.portals}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 12
            }}
          >
            {PORTALS.map((portal) => (
              <a
                key={portal.id}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#111827",
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 16,
                  padding: 15,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  minHeight: 78,
                  boxShadow:
                    "0 2px 8px rgba(0,0,0,0.04)"
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    minWidth: 44,
                    borderRadius: 13,
                    background: "#eef4ff",
                    color: "#1647b6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <HiAcademicCap size={23} />
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 800,
                      lineHeight: 1.35
                    }}
                  >
                    {portal.en}
                  </div>

                  <div
                    style={{
                      marginTop: 3,
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#6b7280",
                      lineHeight: 1.35
                    }}
                  >
                    {portal.kn}
                  </div>
                </div>

                <HiExternalLink
                  size={18}
                  style={{
                    color: "#6b7280",
                    flexShrink: 0
                  }}
                />
              </a>
            ))}
          </div>
        </section>

        {/* NEWS */}
        <section style={{ marginTop: 30 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 13
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 19,
                fontWeight: 900
              }}
            >
              {t.news}
            </h2>

            <button
              onClick={loadNews}
              disabled={loading}
              style={{
                border: "1px solid #dbe3f0",
                background: "#ffffff",
                color: "#1647b6",
                borderRadius: 10,
                padding: "8px 11px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 800
              }}
            >
              <HiRefresh
                size={17}
                style={{
                  animation: loading
                    ? "nk-spin 1s linear infinite"
                    : "none"
                }}
              />
              {t.refresh}
            </button>
          </div>

          {/* NEWS SOURCES */}
          <div
            style={{
              display: "flex",
              gap: 8,
              overflowX: "auto",
              paddingBottom: 5,
              marginBottom: 14
            }}
          >
            {SOURCES.map((item) => {
              const active = source === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setSource(item.id)}
                  style={{
                    flexShrink: 0,
                    border: active
                      ? "1px solid #1647b6"
                      : "1px solid #dbe3f0",
                    background: active
                      ? "#1647b6"
                      : "#ffffff",
                    color: active
                      ? "#ffffff"
                      : "#111827",
                    borderRadius: 11,
                    padding: "9px 13px",
                    fontSize: 13,
                    fontWeight: 800
                  }}
                >
                  <div>{item.en}</div>

                  <div
                    style={{
                      fontSize: 11,
                      marginTop: 2,
                      opacity: 0.75
                    }}
                  >
                    {item.kn}
                  </div>
                </button>
              );
            })}
          </div>

          {/* LOADING */}
          {loading && (
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 16,
                padding: 22,
                textAlign: "center",
                color: "#6b7280",
                fontSize: 14
              }}
            >
              {t.loading}
            </div>
          )}

          {/* ERROR */}
          {!loading && failed && (
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 16,
                padding: 22,
                textAlign: "center"
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  marginBottom: 11
                }}
              >
                {t.error}
              </div>

              <button
                onClick={loadNews}
                style={{
                  border: 0,
                  background: "#1647b6",
                  color: "#ffffff",
                  borderRadius: 10,
                  padding: "9px 17px",
                  fontWeight: 800
                }}
              >
                {t.retry}
              </button>
            </div>
          )}

          {/* NEWS ITEMS */}
          {!loading && !failed && news.length > 0 && (
            <div
              style={{
                display: "grid",
                gap: 10
              }}
            >
              {news.map((item, index) => {
                const link =
                  typeof item.link === "string" &&
                  item.link.trim()
                    ? item.link.trim()
                    : "#";

                return (
                  <a
                    key={
                      item.guid ||
                      item.link ||
                      `news-${index}`
                    }
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#111827",
                      background: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: 15,
                      padding: 15,
                      display: "block"
                    }}
                  >
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 800,
                        lineHeight: 1.45
                      }}
                    >
                      {item.title}
                    </div>

                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 12,
                        color: "#6b7280",
                        fontWeight: 600
                      }}
                    >
                      {item.pubDate
                        ? getTimeAgo(
                            item.pubDate,
                            lang
                          )
                        : t.latest}
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {!loading && !failed && news.length === 0 && (
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 16,
                padding: 20,
                textAlign: "center",
                color: "#6b7280"
              }}
            >
              {t.noNews}
            </div>
          )}
        </section>
      </main>

      <style>
        {`
          @keyframes nk-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
