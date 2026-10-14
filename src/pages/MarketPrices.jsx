import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GROUPS,
  AGMARKNET_SOURCE_URL,
  fetchKarnatakaMarketPrices,
} from "../data/FormerData";
const LANG_KEY = "nk_lang";
function readLanguage() {
  try {
    return localStorage.getItem(LANG_KEY) || "bi";
  } catch {
    return "bi";
  }
}
function money(value) {
  if (value == null || !Number.isFinite(Number(value))) return "—";
  return `₹${Number(value).toLocaleString("en-IN")}`;
}
function displayDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
export default function MarketPrices() {
  const navigate = useNavigate();
  const [lang, setLang] = useState(readLanguage);
  const [activeGroup, setActiveGroup] = useState("farm");
  const [search, setSearch] = useState("");
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const kn = lang !== "en";
  useEffect(() => {
    const updateLanguage = () => setLang(readLanguage());
    window.addEventListener("storage", updateLanguage);
    window.addEventListener("languagechange", updateLanguage);
    return () => {
      window.removeEventListener("storage", updateLanguage);
      window.removeEventListener("languagechange", updateLanguage);
    };
  }, []);
  useEffect(() => {
    if (activeGroup !== "farm") return;
    const controller = new AbortController();
    async function loadPrices() {
      setLoading(true);
      setError("");
      try {
        const rows = await fetchKarnatakaMarketPrices({
          signal: controller.signal,
          daysToCheck: 3,
        });
        if (controller.signal.aborted) return;
        setPrices(rows);
        setLastUpdated(new Date().toISOString());
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(
          kn
            ? "ಈಗ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳನ್ನು ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ಅಧಿಕೃತ ಮೂಲ ತೆರೆಯಿರಿ."
            : "Could not load market prices. Please retry or open the official source."
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadPrices();
    return () => controller.abort();
  }, [activeGroup, kn]);
  const group = useMemo(
    () => GROUPS.find((item) => item.id === activeGroup) || GROUPS[0],
    [activeGroup]
  );
  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return group.items;
    return group.items.filter(([en, kannada, unit]) =>
      [en, kannada, unit].some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
  }, [group, search]);
  const filteredPrices = useMemo(() => {
    const query = search.trim().toLowerCase();
    return prices.filter((row) => {
      const matchesSearch =
        !query ||
        [
          row.crop,
          row.market,
          row.district,
          row.state,
        ].some((value) => String(value || "").toLowerCase().includes(query));
      return matchesSearch;
    });
  }, [prices, search]);
  const title = kn ? "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು" : "Market Prices";
  const subtitle = kn
    ? "ಕರ್ನಾಟಕದ ಕೃಷಿ ಮಾರುಕಟ್ಟೆ ಮತ್ತು ದಿನನಿತ್ಯದ ಬೆಲೆಗಳ ಮಾಹಿತಿ"
    : "Karnataka agricultural markets and everyday price information";
  return (
    <main className="mp-page">
      <style>{`
        .mp-page {
          --mp-bg: var(--bg, #f5f7f4);
          --mp-card: var(--card, #ffffff);
          --mp-text: var(--text, #17231c);
          --mp-muted: var(--muted, #68766c);
          --mp-border: var(--border, #e0e7df);
          --mp-green: #176b43;
          min-height: 100vh;
          padding: 16px;
          padding-bottom: 40px;
          background: var(--mp-bg);
          color: var(--mp-text);
          font-family: inherit;
        }
        .mp-wrap { max-width: 980px; margin: 0 auto; }
        .mp-top {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 18px;
        }
        .mp-back {
          border: 1px solid var(--mp-border);
          background: var(--mp-card); color: var(--mp-text);
          width: 42px; height: 42px; border-radius: 13px;
          font-size: 20px; cursor: pointer;
        }
        .mp-heading { flex: 1; min-width: 0; }
        .mp-heading h1 { margin: 0; font-size: 25px; line-height: 1.3; }
        .mp-heading p {
          margin: 5px 0 0; color: var(--mp-muted);
          font-size: 13px; line-height: 1.5;
        }
        .mp-hero {
          background: linear-gradient(130deg, #145c3b, #268253);
          color: #fff; border-radius: 22px; padding: 21px;
          margin-bottom: 17px;
        }
        .mp-hero-label { font-size: 12px; opacity: .88; }
        .mp-hero h2 { margin: 7px 0; font-size: 22px; }
        .mp-hero p { margin: 0; font-size: 13px; line-height: 1.65; opacity: .93; }
        .mp-hero-actions { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 16px; }
        .mp-hero a {
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: 11px; padding: 10px 13px; font-size: 12px;
          font-weight: 700; text-decoration: none;
          background: #fff; color: #145c3b;
        }
        .mp-search {
          width: 100%; box-sizing: border-box; padding: 14px 15px;
          border: 1px solid var(--mp-border); border-radius: 14px;
          background: var(--mp-card); color: var(--mp-text);
          outline: none; font-size: 14px; margin-bottom: 15px;
        }
        .mp-search:focus { border-color: #319363; }
        .mp-categories {
          display: flex; gap: 9px; overflow-x: auto;
          padding-bottom: 8px; margin-bottom: 15px;
          scrollbar-width: thin;
        }
        .mp-cat {
          flex: 0 0 auto; border: 1px solid var(--mp-border);
          background: var(--mp-card); color: var(--mp-text);
          border-radius: 13px; padding: 11px 13px;
          text-align: left; cursor: pointer; font-size: 12px;
          font-weight: 700; line-height: 1.45;
        }
        .mp-cat.active {
          background: #176b43; border-color: #176b43; color: #fff;
        }
        .mp-cat-icon { display: block; font-size: 20px; margin-bottom: 5px; }
        .mp-section-head {
          display: flex; align-items: center; justify-content: space-between;
          gap: 10px; margin: 18px 0 12px;
        }
        .mp-section-head h2 { font-size: 17px; margin: 0; }
        .mp-count { color: var(--mp-muted); font-size: 12px; }
        .mp-card {
          background: var(--mp-card); border: 1px solid var(--mp-border);
          border-radius: 16px; padding: 15px; margin-bottom: 11px;
        }
        .mp-item-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 12px;
        }
        .mp-item-name { font-size: 14px; font-weight: 750; }
        .mp-item-sub { font-size: 12px; color: var(--mp-muted); margin-top: 4px; }
        .mp-unit {
          font-size: 11px; color: var(--mp-muted);
          text-align: right; max-width: 42%;
        }
        .mp-price-grid {
          display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px; margin-top: 14px;
        }
        .mp-price-cell {
          background: var(--mp-bg); border-radius: 11px; padding: 10px 8px;
          min-width: 0;
        }
        .mp-price-label { font-size: 10px; color: var(--mp-muted); }
        .mp-price-value {
          margin-top: 5px; font-size: 14px; font-weight: 800;
          overflow-wrap: anywhere;
        }
        .mp-meta {
          display: flex; flex-wrap: wrap; gap: 8px;
          margin-top: 12px; color: var(--mp-muted); font-size: 11px;
        }
        .mp-pill {
          background: var(--mp-bg); padding: 6px 9px; border-radius: 8px;
        }
        .mp-source {
          display: inline-flex; margin-top: 12px; font-size: 12px;
          font-weight: 750; color: var(--mp-green); text-decoration: none;
        }
        .mp-notice {
          border: 1px solid var(--mp-border); background: var(--mp-card);
          border-radius: 14px; padding: 14px; margin: 12px 0;
          color: var(--mp-muted); font-size: 12px; line-height: 1.7;
        }
        .mp-status {
          padding: 15px; background: var(--mp-card);
          border: 1px solid var(--mp-border); border-radius: 14px;
          color: var(--mp-muted); font-size: 13px; line-height: 1.65;
          margin-bottom: 12px;
        }
        .mp-retry {
          margin-top: 10px; padding: 9px 12px;
          background: #176b43; color: white; border: 0;
          border-radius: 9px; font-weight: 700; cursor: pointer;
        }
        .mp-foot { text-align: center; color: var(--mp-muted); font-size: 11px; margin-top: 22px; }
        @media (min-width: 650px) {
          .mp-page { padding: 24px; }
          .mp-item-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 11px; }
          .mp-card { margin-bottom: 0; }
        }
      `}</style>
      <div className="mp-wrap">
        <header className="mp-top">
          <button
            className="mp-back"
            type="button"
            onClick={() => navigate(-1)}
            aria-label={kn ? "ಹಿಂದಕ್ಕೆ" : "Back"}
          >
            ←
          </button>
          <div className="mp-heading">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
        </header>
        <section className="mp-hero">
          <div className="mp-hero-label">
            {kn ? "ಅಧಿಕೃತ ಬೆಲೆ ಮಾಹಿತಿ" : "Official price information"}
          </div>
          <h2>
            🌾 {kn ? "ರೈತರಿಗೆ ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ" : "Market information for farmers"}
          </h2>
          <p>
            {kn
              ? "AGMARKNET ಮೂಲಕ ಲಭ್ಯವಿರುವ ಕರ್ನಾಟಕದ ಕೃಷಿ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳನ್ನು ಪಡೆಯಲು ಪ್ರಯತ್ನಿಸಲಾಗುತ್ತದೆ. ಬೇರೆ ವಸ್ತುಗಳ ಬೆಲೆಗಾಗಿ ಸಂಬಂಧಿತ ಅಧಿಕೃತ ಮೂಲಗಳನ್ನು ನೋಡಿ."
              : "We attempt to retrieve Karnataka agricultural market prices through AGMARKNET. For other items, use their respective official sources."}
          </p>
          <div className="mp-hero-actions">
            <a href={AGMARKNET_SOURCE_URL} target="_blank" rel="noreferrer">
              {kn ? "AGMARKNET ತೆರೆಯಿರಿ ↗" : "Open AGMARKNET ↗"}
            </a>
          </div>
        </section>
        <input
          className="mp-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={
            kn
              ? "ಬೆಳೆ, ವಸ್ತು ಅಥವಾ ಮಾರುಕಟ್ಟೆ ಹುಡುಕಿ..."
              : "Search crop, item or market..."
          }
          aria-label={kn ? "ಹುಡುಕಿ" : "Search"}
        />
        <nav className="mp-categories" aria-label="Price categories">
          {GROUPS.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`mp-cat ${activeGroup === item.id ? "active" : ""}`}
              onClick={() => {
                setActiveGroup(item.id);
                setSearch("");
              }}
            >
              <span className="mp-cat-icon">{item.icon}</span>
              {kn ? item.kn : item.en}
            </button>
          ))}
        </nav>
        <div className="mp-section-head">
          <h2>{kn ? group.kn : group.en}</h2>
          <span className="mp-count">
            {activeGroup === "farm"
              ? `${filteredPrices.length} ${kn ? "ಬೆಲೆ ದಾಖಲೆಗಳು" : "price records"}`
              : `${filteredItems.length} ${kn ? "ವಸ್ತುಗಳು" : "items"}`}
          </span>
        </div>
        {activeGroup === "farm" ? (
          <>
            <div className="mp-notice">
              {kn
                ? "ಕೆಳಗಿನ ಬೆಲೆಗಳು API ಯಿಂದ ಯಶಸ್ವಿಯಾಗಿ ಬಂದರೆ ಮಾತ್ರ ತೋರಿಸಲಾಗುತ್ತವೆ. ಇವು ಸಾಮಾನ್ಯವಾಗಿ ₹/ಕ್ವಿಂಟಾಲ್ ಘಟಕದಲ್ಲಿರುತ್ತವೆ; ಬೆಲೆ ಮತ್ತು ದಿನಾಂಕ ಮಾರುಕಟ್ಟೆಯ ಪ್ರಕಾರ ಬದಲಾಗಬಹುದು."
                : "Prices below are displayed only when successfully returned by the API. They are generally in ₹/quintal; prices and dates vary by market."}
              {lastUpdated && (
                <div style={{ marginTop: 6 }}>
                  {kn ? "ಈ ಪುಟದಲ್ಲಿ ಪಡೆದ ಸಮಯ: " : "Retrieved on this page: "}
                  {displayDate(lastUpdated)}
                </div>
              )}
            </div>
            {loading && (
              <div className="mp-status">
                {kn
                  ? "⏳ ಕರ್ನಾಟಕದ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳನ್ನು ಪಡೆಯಲಾಗುತ್ತಿದೆ..."
                  : "⏳ Loading Karnataka market prices..."}
              </div>
            )}
            {!loading && error && (
              <div className="mp-status" role="status">
                {error}
                <br />
                <button
                  type="button"
                  className="mp-retry"
                  onClick={() => {
                    setActiveGroup("");
                    window.setTimeout(() => setActiveGroup("farm"), 0);
                  }}
                >
                  {kn ? "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ" : "Try again"}
                </button>
                <br />
                <a
                  className="mp-source"
                  href={AGMARKNET_SOURCE_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {kn ? "ಅಧಿಕೃತ AGMARKNET ಮೂಲ ↗" : "Official AGMARKNET source ↗"}
                </a>
              </div>
            )}
            {!loading && !error && filteredPrices.length === 0 && (
              <div className="mp-status">
                {kn
                  ? "ಈ ಬಾರಿ ಹೊಂದುವ ಬೆಲೆ ದಾಖಲೆಗಳು ಸಿಗಲಿಲ್ಲ. API ಯಲ್ಲಿ ದಾಖಲೆಗಳಿಲ್ಲದಿರಬಹುದು ಅಥವಾ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದುವ ಬೆಳೆ ಇರದಿರಬಹುದು. ಅಧಿಕೃತ ಮೂಲವನ್ನು ಪರಿಶೀಲಿಸಿ."
                  : "No matching price records were returned. The API may have no records for this request, or no crops match your search. Check the official source."}
                <br />
                <a
                  className="mp-source"
                  href={AGMARKNET_SOURCE_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {kn ? "AGMARKNET ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ ↗" : "Check AGMARKNET ↗"}
                </a>
              </div>
            )}
            <div className="mp-item-grid">
              {filteredPrices.map((row) => (
                <article className="mp-card" key={row.id}>
                  <div className="mp-item-top">
                    <div>
                      <div className="mp-item-name">{row.crop}</div>
                      <div className="mp-item-sub">
                        📍 {row.market}
                        {row.district ? `, ${row.district}` : ""}
                      </div>
                    </div>
                    <div className="mp-unit">{row.unit}</div>
                  </div>
                  <div className="mp-price-grid">
                    <div className="mp-price-cell">
                      <div className="mp-price-label">
                        {kn ? "ಕನಿಷ್ಠ" : "Minimum"}
                      </div>
                      <div className="mp-price-value">{money(row.min)}</div>
                    </div>
                    <div className="mp-price-cell">
                      <div className="mp-price-label">
                        {kn ? "ಗರಿಷ್ಠ" : "Maximum"}
                      </div>
                      <div className="mp-price-value">{money(row.max)}</div>
                    </div>
                    <div className="mp-price-cell">
                      <div className="mp-price-label">
                        {kn ? "Modal ಬೆಲೆ" : "Modal price"}
                      </div>
                      <div className="mp-price-value">{money(row.modal)}</div>
                    </div>
                  </div>
                  <div className="mp-meta">
                    <span className="mp-pill">
                      📅 {displayDate(row.date)}
                    </span>
                    {row.district && (
                      <span className="mp-pill">{row.district}</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mp-notice">
              {kn
                ? "ಈ ವಿಭಾಗದಲ್ಲಿನ ವಸ್ತುಗಳು ಮತ್ತು ಅವುಗಳ ಘಟಕಗಳನ್ನು FormerData.js ನಿಂದ ಪಡೆಯಲಾಗಿದೆ. ಇಲ್ಲಿ ಪ್ರತಿ ವಸ್ತುವಿನ ಪ್ರಸ್ತುತ ಬೆಲೆ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಲಭ್ಯವಿದೆ ಎಂದು ಅರ್ಥವಲ್ಲ. ಅಧಿಕೃತ ಮೂಲವನ್ನು ತೆರೆಯಿರಿ."
                : "Items and units in this category come from FormerData.js. Their current prices are not automatically available here. Open the official source for current information."}
            </div>
            <div className="mp-item-grid">
              {filteredItems.map(([en, kannada, unit]) => (
                <article className="mp-card" key={`${activeGroup}-${en}`}>
                  <div className="mp-item-top">
                    <div>
                      <div className="mp-item-name">
                        {kn ? kannada : en}
                      </div>
                      <div className="mp-item-sub">
                        {kn ? en : kannada}
                      </div>
                    </div>
                    <div className="mp-unit">{unit}</div>
                  </div>
                  <div className="mp-notice" style={{ marginBottom: 0 }}>
                    {kn
                      ? "ಪ್ರಸ್ತುತ ಬೆಲೆ ದೃಢೀಕರಿಸಲಾಗಿಲ್ಲ"
                      : "Current price not verified"}
                  </div>
                </article>
              ))}
            </div>
            <div className="mp-card" style={{ marginTop: 12 }}>
              <div className="mp-item-name">
                {kn ? "ಅಧಿಕೃತ ಮಾಹಿತಿ ಮೂಲ" : "Official information source"}
              </div>
              <div className="mp-item-sub">
                {group.sourceName}
              </div>
              <a
                className="mp-source"
                href={group.source}
                target="_blank"
                rel="noreferrer"
              >
                {kn ? "ಮೂಲ ತೆರೆಯಿರಿ ↗" : "Open source ↗"}
              </a>
            </div>
          </>
        )}
        <footer className="mp-foot">
          {kn
            ? "NAMMA KARNATAKA · ಅಧಿಕೃತ ಮೂಲಗಳನ್ನೇ ಪರಿಶೀಲಿಸಿ"
            : "NAMMA KARNATAKA · Verify prices with official sources"}
        </footer>
      </div>
    </main>
  );
}
