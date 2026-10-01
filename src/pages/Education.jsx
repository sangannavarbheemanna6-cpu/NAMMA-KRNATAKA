import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiArrowLeft,
  HiAcademicCap,
  HiExternalLink,
  HiRefresh,
} from "react-icons/hi";

const PORTALS = [
  {
    id: "nsp",
    en: "National Scholarship Portal (NSP)",
    kn: "ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್ (NSP)",
    url: "https://scholarships.gov.in/",
  },
  {
    id: "ssp",
    en: "State Scholarship Portal (SSP)",
    kn: "ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್ (SSP)",
    url: "https://ssp.postmatric.karnataka.gov.in/",
  },
  {
    id: "digilocker",
    en: "DigiLocker",
    kn: "ಡಿಜಿಲಾಕರ್",
    url: "https://www.digilocker.gov.in/",
  },
  {
    id: "school",
    en: "Karnataka School Education",
    kn: "ಕರ್ನಾಟಕ ಶಾಲಾ ಶಿಕ್ಷಣ",
    url: "https://schooleducation.karnataka.gov.in/",
  },
  {
    id: "ugc",
    en: "UGC",
    kn: "UGC",
    url: "https://ugc.gov.in/",
  },
  {
    id: "epathshala",
    en: "NCERT e-Pathshala",
    kn: "NCERT ಇ-ಪಾಠಶಾಲೆ",
    url: "https://epathshala.ncert.gov.in/",
  },
  {
    id: "swayam",
    en: "SWAYAM",
    kn: "SWAYAM ಆನ್‌ಲೈನ್ ಕೋರ್ಸ್‌ಗಳು",
    url: "https://www.swayam.gov.in/",
  },
  {
    id: "udise",
    en: "UDISE+ Know Your School",
    kn: "UDISE+ ನಿಮ್ಮ ಶಾಲೆಯನ್ನು ಹುಡುಕಿ",
    url: "https://kys.udiseplus.gov.in/",
  },
  {
    id: "ncert",
    en: "NCERT Syllabus & Exam Question Papers",
    kn: "NCERT ಪಠ್ಯಕ್ರಮ ಮತ್ತು ಪರೀಕ್ಷಾ ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳು",
    url: "https://aglasem.com/",
  },
];

const SOURCES = [
  {
    id: "toi",
    en: "TOI Education",
    kn: "TOI ಶಿಕ್ಷಣ",
    url: "https://timesofindia.indiatimes.com/rssfeeds/913168846.cms",
  },
  {
    id: "hindu",
    en: "The Hindu Education",
    kn: "ದಿ ಹಿಂದೂ ಶಿಕ್ಷಣ",
    url: "https://www.thehindu.com/education/feeder/default.rss",
  },
];

export default function Education() {
  const navigate = useNavigate();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSource, setActiveSource] = useState("toi");

  const fetchNews = async (sourceId) => {
    setLoading(true);

    const source = SOURCES.find((item) => item.id === sourceId);

    if (!source) {
      setLoading(false);
      return;
    }

    try {
      const api =
        "https://api.rss2json.com/v1/api.json?rss_url=" +
        encodeURIComponent(source.url);

      const response = await fetch(api);
      const data = await response.json();

      if (data?.items?.length) {
        setNews(data.items.slice(0, 8));
      } else {
        setNews([]);
      }
    } catch (error) {
      console.error("Education news error:", error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews("toi");
  }, []);

  const changeSource = (id) => {
    setActiveSource(id);
    fetchNews(id);
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .education-page {
          min-height: 100vh;
          background: #f5f7fb;
          color: #111827;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Arial,
            sans-serif;
        }

        /* HEADER */

        .education-header {
          position: sticky;
          top: 0;
          z-index: 20;
          height: 105px;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          padding: 0 30px;
          gap: 20px;
        }

        .education-back {
          width: 62px;
          height: 62px;
          border-radius: 18px;
          border: 1px solid #dce2ea;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #111827;
          cursor: pointer;
          flex-shrink: 0;
        }

        .education-header-text {
          flex: 1;
        }

        .education-app-name {
          font-size: 27px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .education-header-subtitle {
          font-size: 19px;
          color: #6b7280;
          margin-top: 3px;
        }

        .education-header-icon {
          color: #1557d6;
          display: flex;
        }

        /* CONTENT */

        .education-content {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 35px 30px 70px;
        }

        .education-hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 35px;
        }

        .education-title {
          margin: 0;
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .education-description {
          margin: 8px 0 0;
          font-size: 18px;
          color: #6b7280;
        }

        .education-hero-icon {
          color: #1557d6;
        }

        /* SECTION */

        .education-section-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
          color: #1557d6;
        }

        .education-section-title {
          margin: 0;
          color: #111827;
          font-size: 24px;
          font-weight: 800;
        }

        /* =========================
           PORTAL GRID
           3 COLUMNS EVERYWHERE
           ========================= */

        .education-portal-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          width: 100%;
        }

        .education-portal-link {
          display: block;
          width: 100%;
          text-decoration: none;
          color: inherit;
        }

        /* PERFECT SQUARE */

        .education-portal-card {
          width: 100%;
          aspect-ratio: 1 / 1;
          background: #ffffff;
          border: 1.5px solid #dfe4ec;
          border-radius: 20px;
          box-shadow: 0 5px 16px rgba(15, 23, 42, 0.08);

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          text-align: center;
          padding: 15px;
          overflow: hidden;

          transition:
            transform 0.15s ease,
            box-shadow 0.15s ease;
        }

        .education-portal-card:active {
          transform: scale(0.96);
        }

        .education-card-icon {
          width: 58px;
          height: 58px;
          border-radius: 17px;
          background: #edf3ff;
          color: #1557d6;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 11px;
          flex-shrink: 0;
        }

        .education-card-en {
          width: 100%;
          font-size: 17px;
          line-height: 1.18;
          font-weight: 800;
          color: #111827;
        }

        .education-card-kn {
          width: 100%;
          font-size: 14px;
          line-height: 1.3;
          font-weight: 600;
          color: #6b7280;
          margin-top: 7px;
        }

        .education-card-external {
          color: #1557d6;
          margin-top: 11px;
          display: flex;
        }

        /* NEWS */

        .education-news-section {
          margin-top: 48px;
        }

        .education-news-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 18px;
        }

        .education-news-title-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .education-news-symbol {
          color: #1557d6;
          font-size: 30px;
          font-weight: 800;
        }

        .education-news-title {
          margin: 0;
          font-size: 30px;
          font-weight: 800;
        }

        .education-refresh {
          border: 1px solid #d7e0ef;
          background: #ffffff;
          color: #1557d6;
          border-radius: 15px;
          padding: 11px 17px;

          display: flex;
          align-items: center;
          gap: 7px;

          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }

        .education-source-row {
          display: flex;
          gap: 12px;
          margin-bottom: 18px;
        }

        .education-source {
          flex: 1;
          border: 1px solid #d7e0ef;
          background: #ffffff;
          color: #1557d6;
          border-radius: 14px;
          padding: 11px 12px;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;

          font-size: 15px;
          font-weight: 750;
          cursor: pointer;
        }

        .education-source.active {
          background: #1557d6;
          color: #ffffff;
          border-color: #1557d6;
        }

        .education-news-list {
          display: grid;
          gap: 12px;
        }

        .education-news-card {
          text-decoration: none;
          color: inherit;

          background: #ffffff;
          border: 1px solid #e0e5ed;
          border-radius: 18px;
          padding: 18px;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;

          box-shadow: 0 3px 12px rgba(15, 23, 42, 0.05);
        }

        .education-news-headline {
          margin: 0;
          font-size: 18px;
          line-height: 1.35;
          font-weight: 750;
        }

        .education-news-meta {
          margin-top: 8px;
          color: #6b7280;
          font-size: 14px;
        }

        .education-news-external {
          color: #1557d6;
          flex-shrink: 0;
        }

        .education-message {
          background: #ffffff;
          border: 1px solid #e0e5ed;
          border-radius: 18px;
          padding: 25px;
          text-align: center;
          color: #6b7280;
        }

        /* =========================
           MOBILE
           STILL 3 COLUMNS
           ========================= */

        @media (max-width: 650px) {

          .education-header {
            height: 100px;
            padding: 0 14px;
            gap: 10px;
          }

          .education-back {
            width: 55px;
            height: 55px;
            border-radius: 16px;
          }

          .education-app-name {
            font-size: 23px;
          }

          .education-header-subtitle {
            font-size: 16px;
          }

          .education-header-icon svg {
            width: 36px;
            height: 36px;
          }

          .education-content {
            padding: 24px 10px 55px;
          }

          .education-hero {
            margin-bottom: 25px;
          }

          .education-title {
            font-size: 30px;
          }

          .education-description {
            font-size: 14px;
          }

          .education-hero-icon {
            width: 48px;
            height: 48px;
          }

          .education-section-title-row {
            margin-bottom: 14px;
          }

          .education-section-title {
            font-size: 20px;
          }

          /* 3 SQUARE BOXES */
          .education-portal-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 9px;
          }

          .education-portal-card {
            aspect-ratio: 1 / 1;
            border-radius: 15px;
            padding: 7px;
          }

          .education-card-icon {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            margin-bottom: 7px;
          }

          .education-card-icon svg {
            width: 24px;
            height: 24px;
          }

          .education-card-en {
            font-size: 11.5px;
            line-height: 1.15;
          }

          .education-card-kn {
            font-size: 9.5px;
            line-height: 1.2;
            margin-top: 4px;
          }

          .education-card-external {
            margin-top: 6px;
          }

          .education-card-external svg {
            width: 17px;
            height: 17px;
          }

          /* NEWS */

          .education-news-section {
            margin-top: 35px;
          }

          .education-news-title {
            font-size: 24px;
          }

          .education-refresh {
            padding: 9px 11px;
            font-size: 14px;
          }

          .education-source-row {
            gap: 8px;
          }

          .education-source {
            font
