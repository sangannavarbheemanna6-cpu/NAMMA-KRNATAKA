import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiArrowLeft,
  HiAcademicCap,
  HiExternalLink,
  HiRefresh
} from "react-icons/hi";

const LINKS = [
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
    id: "kseab",
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
    id: "ncert",
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
    id: "aglasem",
    en: "NCERT Syllabus & Exam Question Papers",
    kn: "NCERT ಪಠ್ಯಕ್ರಮ ಮತ್ತು ಪರೀಕ್ಷಾ ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳು",
    url: "https://aglasem.com/"
  }
];

const FEEDS = [
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

const T = {
  en: {
    title: "Education",
    subtitle:
      "Education services, portals, courses and latest updates",
    portals: "Education Portals",
    news: "Education News",
    latest: "Latest",
    refresh: "Refresh",
    loading: "Loading latest education news...",
    error: "Unable to load news right now.",
    retry: "Try Again",
    noNews: "No news available right now.",
    back: "Back"
  },

  kn: {
    title: "ಶಿಕ್ಷಣ",
    subtitle:
      "ಶಿಕ್ಷಣ ಸೇವೆಗಳು, ಪೋರ್ಟಲ್‌ಗಳು, ಕೋರ್ಸ್‌ಗಳು ಮತ್ತು ಇತ್ತೀಚಿನ ಮಾಹಿತಿಗಳು",
    portals: "ಶಿಕ್ಷಣ ಪೋರ್ಟಲ್‌ಗಳು",
    news: "ಶಿಕ್ಷಣ ಸುದ್ದಿ",
    latest: "ಇತ್ತೀಚಿನ",
    refresh: "ರಿಫ್ರೆಶ್",
    loading: "ಇತ್ತೀಚಿನ ಶಿಕ್ಷಣ ಸುದ್ದಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    error: "ಈಗ ಸುದ್ದಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ.",
    retry: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    noNews: "ಈಗ ಯಾವುದೇ ಸುದ್ದಿ ಲಭ್ಯವಿಲ್ಲ.",
    back: "ಹಿಂದೆ"
  }
};

const timeAgo = (date, lang) => {
  const time = new Date(date).getTime();

  if (!Number.isFinite(time)) {
    return lang === "kn" ? "ಇತ್ತೀಚಿನ" : "Latest";
  }

  const diff = Math.floor((Date.now() - time) / 1000);

  if (diff < 60) {
    return lang === "kn" ? "ಈಗಷ್ಟೇ" : "Just now";
  }

  const mins = Math.floor(diff / 60);

  if (mins < 60) {
    return lang === "kn"
      ? `${mins} ನಿಮಿಷಗಳ ಹಿಂದೆ`
      : `${mins} min ago`;
  }

  const hours = Math.floor(mins / 60);

  if (hours < 24) {
    return lang === "kn"
      ? `${hours} ಗಂಟೆಗಳ ಹಿಂದೆ`
      : `${hours} hr ago`;
  }

  const days = Math.floor(hours / 24);

  return lang === "kn"
    ? `${days} ದಿನಗಳ ಹಿಂದೆ`
    : `${days} days ago`;
};

export default function Education() {
  const navigate = useNavigate();

  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("nk_lang") || "en";
    return T[saved] ? saved : "en";
  });

  const [feed, setFeed] = useState("toi");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const t = T[lang];

  useEffect(() => {
    const change = () => {
      const saved = localStorage.getItem("nk_lang") || "en";
      setLang(T[saved] ? saved : "en");
    };

    window.addEventListener("languagechange", change);

    return () => {
      window.removeEventListener("languagechange", change);
    };
  }, []);

  const loadNews = async () => {
    setLoading(true);
    setError(false);

    try {
      const selected =
        FEEDS.find((item) => item.id === feed) || FEEDS[0];

      const api =
        "https://api.rss2json.com/v1/api.json?rss_url=" +
        encodeURIComponent(selected.url);

      const res = await fetch(api);

      if (!res.ok) {
        throw new Error("Failed to fetch news");
      }

      const data = await res.json();

      if (!data || data.status !== "ok") {
        throw new Error("RSS feed error");
      }

      const safeArticles = Array.isArray(data.items)
        ? data.items
            .filter(
              (item) =>
                item &&
                typeof item === "object" &&
                (item.title || item.link)
            )
            .slice(0, 20)
        : [];

      setArticles(safeArticles);

      if (safeArticles.length === 0) {
        setError(true);
      }
    } catch (err) {
      console.error("Education news error:", err);
      setArticles([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, [feed]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        color: "#111827"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          padding: "12px 14px"
        }}
      >
        <div
          style={{
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
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <HiArrowLeft size={22} />
          </button>

          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 900,
                lineHeight: 1.2
              }}
            >
              NAMMA KARNATAKA
            </div>

            <div
              style={{
                fontSize: 13,
                color: "#6b7280",
                marginTop: 2
              }}
            >
              {t.title}
            </div>
          </div>

          <HiAcademicCap
            size={28}
            style={{
              color: "#1647b6"
            }}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "18px 14px 40px"
        }}
      >
        {/* TITLE */}
        <div
          style={{
            marginBottom: 18
          }}
        >
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
              margin: "6px 0 0",
              fontSize: 14,
              color: "#6b7280",
              lineHeight: 1.5
            }}
          >
            {t.subtitle}
          </p>
        </div>

        {/* EDUCATION PORTALS */}
        <section>
          <div
            style={{
              fontSize: 18,
              fontWeight: 900,
              marginBottom: 12
            }}
          >
            {t.portals}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",
              gap: 12
            }}
          >
            {LINKS.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 16,
                  padding: 15,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
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

                <div
                  style={{
                    flex: 1,
                    minWidth: 0
                  }}
                >
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 800,
                      lineHeight: 1.35
                    }}
                  >
                    {item.en}
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#6b7280",
                      marginTop: 3,
                      lineHeight: 1.35
                    }}
                  >
                    {item.kn}
                  </div>
                </div>

                <HiExternalLink
                  size={19}
                  style={{
                    color: "#6b7280",
                    flexShrink: 0
                  }}
                />
              </a>
            ))}
          </div>
        </section>

        {/* EDUCATION NEWS */}
        <section
          style={{
            marginTop: 28
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              marginBottom: 12
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 900
              }}
            >
              {t.news}
            </div>

            <button
              onClick={loadNews}
              disabled={loading}
              style={{
                border: "1px solid #dbe3f0",
                background: "#ffffff",
                borderRadius: 10,
                padding: "8px 10px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 700,
                cursor: loading
                  ? "default"
                  : "pointer",
                color: "#1647b6"
              }}
            >
              <HiRefresh
                size={17}
                style={{
                  animation: loading
                    ? "spin 1s linear infinite"
                    : "none"
                }}
              />

              <span>{t.refresh}</span>
            </button>
          </div>

          {/* SOURCE BUTTONS */}
          <div
            style={{
              display: "flex",
              gap: 8,
              overflowX: "auto",
              paddingBottom: 5,
              marginBottom: 14
            }}
          >
            {FEEDS.map((item) => {
              const active = feed === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setFeed(item.id)}
                  style={{
                    whiteSpace: "nowrap",
                    border: active
                      ? "1px solid #1647b6"
                      : "1px solid #dbe3f0",
                    background: active
                      ? "#1647b6"
                      : "#ffffff",
                    color: active
                      ? "#ffffff"
                      : "#111827",
                    borderRadius: 10,
                    padding: "9px 13px",
                    fontSize: 13,
                    fontWeight: 800,
                    cursor: "pointer"
                  }}
                >
                  <div>{item.en}</div>

                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      marginTop: 2,
                      opacity: active ? 0.9 : 0.65
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
                padding: 20,
                textAlign: "center",
                color: "#6b7280",
                fontSize: 14
              }}
            >
              {t.loading}
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
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
                  fontSize: 15,
                  fontWeight: 800,
                  marginBottom: 10
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
                  padding: "9px 16px",
                  fontWeight: 800,
                  cursor: "pointer"
                }}
              >
                {t.retry}
              </button>
            </div>
          )}

          {/* NEWS LIST */}
          {!loading && !error && articles.length > 0 && (
            <div
              style={{
                display: "grid",
                gap: 10
              }}
            >
              {articles.map((article, index) => {
                if (!article) return null;

                const title =
                  typeof article.title === "string" &&
                  article.title.trim()
                    ? article.title.trim()
                    : t.latest;

                const link =
                  typeof article.link === "string" &&
                  article.link.trim()
                    ? article.link.trim()
                    : "#";

                return (
                  <a
                    key={
                      article.guid ||
                      article.link ||
                      `education-news-${index}`
                    }
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      background: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: 15,
                      padding: 15,
                      display: "block",
                      boxShadow:
                        "0 2px 7px rgba(0,0,0,0.035)"
                    }}
                  >
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 800,
                        lineHeight: 1.45
                      }}
                    >
                      {title}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginTop: 8,
                        color: "#6b7280",
                        fontSize: 12,
                        fontWeight: 600
                      }}
                    >
                      <span>
                        {article.pubDate
                          ? timeAgo(
                              article.pubDate,
                              lang
                            )
                          : t.latest}
                      </span>

                      <span>•</span>

                      <span>
                        {FEEDS.find(
                          (item) => item.id === feed
                        )?.en || ""}
                      </span>

                      <HiExternalLink size={14} />
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {/* NO NEWS */}
          {!loading &&
            !error &&
            articles.length === 0 && (
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
      </div>

      {/* SPIN ANIMATION */}
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}
