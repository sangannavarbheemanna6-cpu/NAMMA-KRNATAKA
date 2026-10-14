import { useCallback, useEffect, useMemo, useState } from "react";
const API = "https://api.agmarknet.gov.in/v1";
const SOURCE_URL = "https://agmarknet.gov.in/home";
const FILTERS = [
  { id: "all", kn: "ಎಲ್ಲ ಬೆಳೆಗಳು", en: "All crops" },
  { id: "cotton", kn: "ಹತ್ತಿ", en: "Cotton" },
  { id: "maize", kn: "ಮೆಕ್ಕೆಜೋಳ", en: "Maize" },
  { id: "paddy", kn: "ಭತ್ತ", en: "Paddy" },
  { id: "tur", kn: "ತೊಗರಿ", en: "Tur / Pigeon pea" },
  { id: "groundnut", kn: "ಕಡಲೆಕಾಯಿ", en: "Groundnut" },
  { id: "soybean", kn: "ಸೋಯಾಬೀನ್", en: "Soybean" },
  { id: "onion", kn: "ಈರುಳ್ಳಿ", en: "Onion" },
  { id: "tomato", kn: "ಟೊಮೇಟೊ", en: "Tomato" },
  { id: "chilli", kn: "ಮೆಣಸಿನಕಾಯಿ", en: "Chilli" },
];
const CROP_WORDS = {
  cotton: ["cotton", "ಕಾಟನ್", "ಹತ್ತಿ"],
  maize: ["maize", "corn", "ಮೆಕ್ಕೆಜೋಳ"],
  paddy: ["paddy", "rice", "ಭತ್ತ", "ಅಕ್ಕಿ"],
  tur: ["tur", "arhar", "pigeon pea", "red gram", "ತೊಗರಿ"],
  groundnut: ["groundnut", "peanut", "ಕಡಲೆಕಾಯಿ"],
  soybean: ["soybean", "soya", "ಸೋಯಾಬೀನ್"],
  onion: ["onion", "ಈರುಳ್ಳಿ"],
  tomato: ["tomato", "ಟೊಮೇಟೊ", "ಟೊಮಾಟೊ"],
  chilli: ["chilli", "chili", "dry chilli", "ಮೆಣಸಿನಕಾಯಿ"],
};
function normalize(value) {
  return String(value ?? "").toLowerCase().trim();
}
function firstValue(obj, keys) {
  if (!obj || typeof obj !== "object") return "";
  for (const key of keys) {
    const value = obj[key];
    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      return value;
    }
  }
  return "";
}
function findArrays(value, depth = 0) {
  if (depth > 6 || value == null) return [];
  if (Array.isArray(value)) {
    if (value.some((item) => item && typeof item === "object")) {
      return [value];
    }
    return [];
  }
  if (typeof value !== "object") return [];
  const results = [];
  for (const [key, child] of Object.entries(value)) {
    if (
      ["data", "result", "results", "records", "items", "rows"].includes(
        key.toLowerCase()
      )
    ) {
      results.push(...findArrays(child, depth + 1));
    }
  }
  if (results.length) return results;
  for (const child of Object.values(value)) {
    if (child && typeof child === "object") {
      results.push(...findArrays(child, depth + 1));
    }
  }
  return results;
}
function toPriceRow(item) {
  if (!item || typeof item !== "object") return null;
  const crop = firstValue(item, [
    "commodity",
    "commodityName",
    "commodity_name",
    "crop",
    "commodityname",
  ]);
  const market = firstValue(item, [
    "market",
    "marketName",
    "market_name",
    "apmc",
    "marketname",
  ]);
  const district = firstValue(item, [
    "district",
    "districtName",
    "district_name",
  ]);
  const state = firstValue(item, ["state", "stateName", "state_name"]);
  const min = firstValue(item, [
    "min_price",
    "minPrice",
    "minimumPrice",
    "min_price_rs",
  ]);
  const max = firstValue(item, [
    "max_price",
    "maxPrice",
    "maximumPrice",
    "max_price_rs",
  ]);
  const modal = firstValue(item, [
    "modal_price",
    "modalPrice",
    "modalprice",
    "price",
    "modal_price_rs",
  ]);
  const date = firstValue(item, [
    "date",
    "arrival_date",
    "price_date",
    "reportedDate",
  ]);
  const unit = firstValue(item, ["unit", "priceUnit"]);
  const hasPrice = [min, max, modal].some(
    (value) =>
      value !== "" &&
      Number.isFinite(Number(value)) &&
      Number(value) > 0
  );
  if (!crop || !hasPrice) return null;
  return {
    id: [
      crop,
      market,
      district,
      date,
      modal,
    ].join("-"),
    crop: String(crop),
    market: String(market || district || "Market not specified"),
    district: String(district || ""),
    state: String(state || ""),
    min: min !== "" && Number(min) > 0 ? Number(min) : null,
    max: max !== "" && Number(max) > 0 ? Number(max) : null,
    modal: modal !== "" && Number(modal) > 0 ? Number(modal) : null,
    date: String(date || ""),
    unit: String(unit || "₹/quintal"),
  };
}
function collectRows(data) {
  const arrays = findArrays(data);
  const rows = arrays.flatMap((array) =>
    array.map(toPriceRow).filter(Boolean)
  );
  const unique = new Map();
  for (const row of rows) {
    const key = [
      row.crop,
      row.market,
      row.district,
      row.date,
      row.modal,
      row.min,
      row.max,
    ].join("|");
    if (!unique.has(key)) unique.set(key, row);
  }
  return [...unique.values()];
}
function getDateString(daysAgo = 0) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function formatPrice(value) {
  if (value == null || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
  }).format(value);
}
export default function MarketPrices() {
  const [lang, setLang] = useState("kn");
  const [prices, setPrices] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("all");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("loading");
  const [lastUpdated, setLastUpdated] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const t = (kn, en) => (lang === "kn" ? kn : en);
  const loadPrices = useCallback(async () => {
    setStatus("loading");
    setErrorMessage("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const stateResponse = await fetch(
        `${API}/location/state?page=1&search=Karnataka`,
        {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        }
      );
      if (!stateResponse.ok) {
        throw new Error(`State request failed (${stateResponse.status})`);
      }
      const stateData = await stateResponse.json();
      const stateObjects = findArrays(stateData).flat();
      const karnataka = stateObjects.find((item) => {
        const name = normalize(
          firstValue(item, ["stateName", "state_name", "name", "state"])
        );
        return name === "karnataka";
      });
      const stateId = firstValue(karnataka, [
        "stateId",
        "state_id",
        "id",
        "value",
      ]);
      if (!stateId) {
        throw new Error("Karnataka state ID was not found in the official response.");
      }
      let officialRows = [];
      let successfulResponse = false;
      // Try recent dates because official market reports may be delayed.
      for (let daysAgo = 0; daysAgo < 3; daysAgo += 1) {
        const date = getDateString(daysAgo);
        const url =
          `${API}/prices-and-arrivals/commodity-wise/daily-report-state` +
          `?date=${encodeURIComponent(date)}` +
          `&stateIds=${encodeURIComponent(String(stateId))}` +
          `&includeExcel=false`;
        const response = await fetch(url, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (!response.ok) {
          throw new Error(`Official market data request failed (${response.status})`);
        }
        const data = await response.json();
        successfulResponse = true;
        const rows = collectRows(data);
        if (rows.length > 0) {
          officialRows = rows.map((row) => ({
            ...row,
            date: row.date || date,
          }));
          break;
        }
      }
      if (!successfulResponse || officialRows.length === 0) {
        setPrices([]);
        setStatus("empty");
        setLastUpdated("");
        return;
      }
      // Do not show records explicitly belonging to another state.
      const karnatakaRows = officialRows.filter((row) => {
        return (
          !row.state ||
          normalize(row.state) === "karnataka"
        );
      });
      setPrices(karnatakaRows);
      setLastUpdated(new Date().toLocaleString());
      setStatus(karnatakaRows.length ? "ok" : "empty");
    } catch (error) {
      setPrices([]);
      setStatus("error");
      setErrorMessage(
        error?.name === "AbortError"
          ? t(
              "ಡೇಟಾ ಲೋಡ್ ಆಗಲು ಹೆಚ್ಚು ಸಮಯ ತೆಗೆದುಕೊಂಡಿತು.",
              "The data request timed out."
            )
          : t(
              "ಅಧಿಕೃತ ಮಾರುಕಟ್ಟೆ ಡೇಟಾ ಪಡೆಯಲಾಗಲಿಲ್ಲ. ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
              "Could not load official market data. Please try again later."
            )
      );
    } finally {
      window.clearTimeout(timeout);
    }
  }, [lang]);
  useEffect(() => {
    loadPrices();
    const interval = window.setInterval(loadPrices, 15 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, [loadPrices]);
  const visiblePrices = useMemo(() => {
    const query = normalize(search);
    return prices.filter((row) => {
      const matchesCrop =
        selectedCrop === "all" ||
        (CROP_WORDS[selectedCrop] || []).some((word) =>
          normalize(row.crop).includes(normalize(word))
        );
      const matchesSearch =
        !query ||
        normalize(row.crop).includes(query) ||
        normalize(row.market).includes(query) ||
        normalize(row.district).includes(query);
      return matchesCrop && matchesSearch;
    });
  }, [prices, selectedCrop, search]);
  return (
    <main className="market-prices-page">
      <header className="market-prices-header">
        <div>
          <p>{t("ನಮ್ಮ ಕರ್ನಾಟಕ", "NAMMA KARNATAKA")}</p>
          <h1>{t("ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು", "Market Prices")}</h1>
          <p>
            {t(
              "ಕರ್ನಾಟಕದ ಅಧಿಕೃತ ಮಾರುಕಟ್ಟೆ ವರದಿಗಳು",
              "Official Karnataka market reports"
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setLang((current) => (current === "kn" ? "en" : "kn"))}
          aria-label="Change language"
        >
          {lang === "kn" ? "English" : "ಕನ್ನಡ"}
        </button>
      </header>
      <section className="market-prices-controls">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t("ಬೆಳೆ, ಮಾರುಕಟ್ಟೆ ಅಥವಾ ಜಿಲ್ಲೆ ಹುಡುಕಿ", "Search crop, market or district")}
          aria-label={t("ಹುಡುಕಿ", "Search")}
        />
        <div className="market-prices-filters">
          {FILTERS.map((filter) => (
            <button
              type="button"
              key={filter.id}
              className={selectedCrop === filter.id ? "active" : ""}
              onClick={() => setSelectedCrop(filter.id)}
            >
              {t(filter.kn, filter.en)}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={loadPrices}
          disabled={status === "loading"}
        >
          {status === "loading"
            ? t("ಲೋಡ್ ಆಗುತ್ತಿದೆ…", "Loading…")
            : t("ಮತ್ತೆ ಲೋಡ್ ಮಾಡಿ", "Refresh data")}
        </button>
      </section>
      <section className="market-prices-results" aria-live="polite">
        {status === "loading" && (
          <p>{t("ಅಧಿಕೃತ ಡೇಟಾ ಪಡೆಯಲಾಗುತ್ತಿದೆ…", "Fetching official data…")}</p>
        )}
        {status === "error" && (
          <div role="alert">
            <p>{errorMessage}</p>
            <p>
              {t("ಮೂಲ:", "Source:")}{" "}
              <a href={SOURCE_URL} target="_blank" rel="noreferrer">
                Agmarknet official website
              </a>
            </p>
          </div>
        )}
        {status === "empty" && (
          <div>
            <p>
              {t(
                "ಈ ದಿನಗಳಿಗೆ ಅಧಿಕೃತ ಬೆಲೆ ದಾಖಲೆಗಳು ಲಭ್ಯವಿಲ್ಲ. ಯಾವುದೇ ನಕಲಿ ಬೆಲೆ ತೋರಿಸಲಾಗುವುದಿಲ್ಲ.",
                "No official price records were found for the checked dates. No sample prices are shown."
              )}
            </p>
            <a href={SOURCE_URL} target="_blank" rel="noreferrer">
              {t("Agmarknet ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ", "Check Agmarknet")}
            </a>
          </div>
        )}
        {status === "ok" && (
          <>
            <p>
              {t("ದಾಖಲೆಗಳು:", "Records:")} {visiblePrices.length}
            </p>
            <div className="market-prices-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>{t("ಬೆಳೆ", "Commodity")}</th>
                    <th>{t("ಮಾರುಕಟ್ಟೆ", "Market")}</th>
                    <th>{t("ಕನಿಷ್ಠ", "Minimum")}</th>
                    <th>{t("ಗರಿಷ್ಠ", "Maximum")}</th>
                    <th>{t("ಮಾದರಿ ಬೆಲೆ", "Modal price")}</th>
                    <th>{t("ದಿನಾಂಕ", "Date")}</th>
                  </tr>
                </thead>
                <tbody>
                  {visiblePrices.map((row) => (
                    <tr key={row.id}>
                      <td>{row.crop}</td>
                      <td>
                        {row.market}
                        {row.district ? `, ${row.district}` : ""}
                      </td>
                      <td>{formatPrice(row.min)}</td>
                      <td>{formatPrice(row.max)}</td>
                      <td>{formatPrice(row.modal)}</td>
                      <td>{row.date || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {visiblePrices.length === 0 && (
              <p>{t("ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದುವ ದಾಖಲೆಗಳಿಲ್ಲ.", "No matching records found.")}</p>
            )}
            <p>
              {t("ಕೊನೆಯ ಲೋಡ್:", "Last loaded:")} {lastUpdated}
            </p>
            <p>
              {t("ಮೂಲ:", "Source:")}{" "}
              <a href={SOURCE_URL} target="_blank" rel="noreferrer">
                Agmarknet official website
              </a>
            </p>
          </>
        )}
      </section>
    </main>
  );
}
