
import { useCallback, useEffect, useMemo, useState } from "react";

type PriceRow = {
  commodity: string;
  market: string;
  district: string;
  min?: string;
  max?: string;
  modal?: string;
  unit: string;
  date: string;
};

type CropFilter = "all" | "cereals" | "pulses" | "oilseeds" | "commercial" | "vegetables" | "fruits";

const API = "https://api.agmarknet.gov.in/v1";
const SOURCE_URL = "https://agmarknet.gov.in/home";

const filters: { id: CropFilter; kn: string; en: string }[] = [
  { id: "all", kn: "ಎಲ್ಲಾ ಬೆಳೆಗಳು", en: "All crops" },
  { id: "cereals", kn: "ಧಾನ್ಯಗಳು", en: "Cereals" },
  { id: "pulses", kn: "ಬೇಳೆಕಾಳುಗಳು", en: "Pulses" },
  { id: "oilseeds", kn: "ಎಣ್ಣೆಕಾಳುಗಳು", en: "Oilseeds" },
  { id: "commercial", kn: "ವಾಣಿಜ್ಯ ಬೆಳೆಗಳು", en: "Commercial crops" },
  { id: "vegetables", kn: "ತರಕಾರಿಗಳು", en: "Vegetables" },
  { id: "fruits", kn: "ಹಣ್ಣುಗಳು", en: "Fruits" },
];

const cropKeywords: Record<Exclude<CropFilter, "all">, string[]> = {
  cereals: [
    "rice", "paddy", "maize", "jowar", "sorghum", "ragi", "finger millet",
    "wheat", "bajra", "millet", "ಭತ್ತ", "ಅಕ್ಕಿ", "ಮೆಕ್ಕೆಜೋಳ", "ಜೋಳ", "ರಾಗಿ",
  ],
  pulses: [
    "tur", "arhar", "red gram", "pigeon pea", "chana", "gram", "chickpea",
    "green gram", "moong", "black gram", "urad", "horse gram", "ಹೆಸರು",
    "ಉದ್ದು", "ತೊಗರಿ", "ಕಡಲೆ", "ಹುರಳಿ",
  ],
  oilseeds: [
    "groundnut", "peanut", "sunflower", "soyabean", "soybean", "sesamum",
    "sesame", "castor", "mustard", "niger", "ಶೇಂಗಾ", "ಸೂರ್ಯಕಾಂತಿ",
  ],
  commercial: [
    "cotton", "sugarcane", "copra", "coconut", "tobacco", "arecanut",
    "betel nut", "jute", "ಹತ್ತಿ", "ಅಡಿಕೆ", "ತೆಂಗು",
  ],
  vegetables: [
    "onion", "tomato", "potato", "brinjal", "okra", "bhindi", "beans",
    "chilli", "chili", "cabbage", "cauliflower", "carrot", "ಈರುಳ್ಳಿ",
    "ಟೊಮೇಟೊ", "ಆಲೂಗಡ್ಡೆ",
  ],
  fruits: [
    "banana", "mango", "grapes", "papaya", "orange", "apple", "pomegranate",
    "watermelon", "lemon", "guava", "ಬಾಳೆ", "ಮಾವು",
  ],
};

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z]/g, "");
}

function readValue(
  obj: Record<string, unknown>,
  keys: string[],
): string | undefined {
  const wanted = keys.map(normalizeKey);

  for (const [key, value] of Object.entries(obj)) {
    if (
      wanted.includes(normalizeKey(key)) &&
      value !== null &&
      value !== undefined &&
      String(value).trim() !== ""
    ) {
      return String(value).trim();
    }
  }

  return undefined;
}

function findPriceRows(data: unknown): PriceRow[] {
  const found: PriceRow[] = [];
  const visited = new Set<object>();

  function walk(value: unknown) {
    if (!value || typeof value !== "object") return;
    if (visited.has(value)) return;
    visited.add(value);

    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }

    const obj = value as Record<string, unknown>;

    const commodity = readValue(obj, [
      "commodity", "commodityName", "commodity_name",
      "crop", "cropName", "crop_name",
    ]);

    const market = readValue(obj, [
      "market", "marketName", "market_name",
      "mandi", "mandiName", "apmc",
    ]);

    const district = readValue(obj, [
      "district", "districtName", "district_name",
    ]);

    const min = readValue(obj, [
      "minPrice", "min_price", "minimumPrice", "minPriceQuintal",
    ]);

    const max = readValue(obj, [
      "maxPrice", "max_price", "maximumPrice", "maxPriceQuintal",
    ]);

    const modal = readValue(obj, [
      "modalPrice", "modal_price", "modal", "modalPriceQuintal",
    ]);

    const date = readValue(obj, [
      "date", "priceDate", "price_date", "arrivalDate",
      "arrival_date", "reportDate",
    ]);

    if (commodity && (min || max || modal)) {
      found.push({
        commodity,
        market: market || "—",
        district: district || "—",
        min,
        max,
        modal,
        unit: "₹/quintal",
        date: date || "—",
      });
    }

    Object.values(obj).forEach(walk);
  }

  walk(data);

  const unique = new Map<string, PriceRow>();
  for (const row of found) {
    const key = [
      row.commodity,
      row.market,
      row.district,
      row.date,
      row.min,
      row.max,
      row.modal,
    ].join("|");

    if (!unique.has(key)) unique.set(key, row);
  }

  return [...unique.values()];
}

function matchesCropFilter(row: PriceRow, filter: CropFilter) {
  if (filter === "all") return true;

  const name = row.commodity.toLowerCase();
  return cropKeywords[filter].some((word) => name.includes(word.toLowerCase()));
}

function localDateOffset(daysAgo: number) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

export default function MarketPrices() {
  const [lang, setLang] = useState<"kn" | "en">("kn");
  const [search, setSearch] = useState("");
  const [cropFilter, setCropFilter] = useState<CropFilter>("all");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [marketFilter, setMarketFilter] = useState("all");
  const [prices, setPrices] = useState<PriceRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [feedStatus, setFeedStatus] = useState<"idle" | "ok" | "error">("idle");
  const [dataDate, setDataDate] = useState("");
  const [fetchedAt, setFetchedAt] = useState("");

  const kn = lang === "kn";

  const loadPrices = useCallback(async () => {
    setLoading(true);

    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 15000);

      try {
        const stateResponse = await fetch(
          `${API}/location/state?page=1&search=Karnataka`,
          {
            signal: controller.signal,
            headers: { Accept: "application/json, text/plain, */*" },
          },
        );

        if (!stateResponse.ok) {
          throw new Error(`State request failed: ${stateResponse.status}`);
        }

        const stateJson: unknown = await stateResponse.json();
        const stateMatches: Record<string, unknown>[] = [];
        const visited = new Set<object>();

        function findKarnataka(value: unknown) {
          if (!value || typeof value !== "object") return;
          if (visited.has(value)) return;
          visited.add(value);

          if (Array.isArray(value)) {
            value.forEach(findKarnataka);
            return;
          }

          const obj = value as Record<string, unknown>;
          const name = String(
            obj.name ?? obj.state ?? obj.state_name ?? obj.stateName ?? "",
          ).toLowerCase();

          if (name.includes("karnataka")) stateMatches.push(obj);
          Object.values(obj).forEach(findKarnataka);
        }

        findKarnataka(stateJson);

        const stateId = stateMatches
          .map((obj) =>
            obj.id ?? obj.stateId ?? obj.state_id ?? obj.stateCode ?? obj.state_code,
          )
          .find((value) => value !== undefined && value !== null);

        if (stateId === undefined) {
          throw new Error("Karnataka state ID was not found in the response");
        }

        let resultRows: PriceRow[] = [];
        let successfulDate = "";

        // Mandi data may not be published on the same day.
        // Try today and the previous two dates; never invent prices.
        for (let offset = 0; offset < 3; offset++) {
          const date = localDateOffset(offset);
          const url =
            `${API}/prices-and-arrivals/commodity-wise/daily-report-state` +
            `?date=${encodeURIComponent(date)}` +
            `&stateIds=${encodeURIComponent(String(stateId))}`;

          const response = await fetch(url, {
            signal: controller.signal,
            headers: { Accept: "application/json, text/plain, */*" },
          });

          if (!response.ok) continue;

          const json: unknown = await response.json();
          const rows = findPriceRows(json);

          if (rows.length) {
            resultRows = rows;
            successfulDate = date;
            break;
          }
        }

        if (!resultRows.length) {
          throw new Error("No usable mandi prices returned");
        }

        setPrices(resultRows);
        setDataDate(successfulDate);
        setFetchedAt(new Date().toLocaleString());
        setFeedStatus("ok");
      } finally {
        window.clearTimeout(timeout);
      }
    } catch (error) {
      console.error("Market price feed error:", error);
      setFeedStatus("error");
      // Do not replace missing data with sample or fabricated prices.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPrices();

    const timer = window.setInterval(() => {
      void loadPrices();
    }, 15 * 60 * 1000);

    return () => window.clearInterval(timer);
  }, [loadPrices]);

  const districts = useMemo(
    () =>
      [...new Set(
        prices
          .map((row) => row.district)
          .filter((value) => value && value !== "—"),
      )].sort(),
    [prices],
  );

  const markets = useMemo(
    () =>
      [...new Set(
        prices
          .filter(
            (row) =>
              districtFilter === "all" || row.district === districtFilter,
          )
          .map((row) => row.market)
          .filter((value) => value && value !== "—"),
      )].sort(),
    [prices, districtFilter],
  );

  const visiblePrices = useMemo(() => {
    const q = search.trim().toLowerCase();

    return prices.filter((row) => {
      const matchesSearch =
        !q ||
        [
          row.commodity,
          row.market,
          row.district,
          row.date,
        ].join(" ").toLowerCase().includes(q);

      return (
        matchesSearch &&
        matchesCropFilter(row, cropFilter) &&
        (districtFilter === "all" || row.district === districtFilter) &&
        (marketFilter === "all" || row.market === marketFilter)
      );
    });
  }, [prices, search, cropFilter, districtFilter, marketFilter]);

  return (
    <main className="farmer-data-page">
      <style>{`
        .farmer-data-page{max-width:1100px;margin:auto;padding:16px;color:var(--text,inherit)}
        .fd-hero{padding:22px 18px;border-radius:20px;background:var(--card,#eef5e9);border:1px solid var(--border,#dce5d7)}
        .fd-hero h1{font-size:28px;margin:8px 0}
        .fd-hero p{line-height:1.65;margin-bottom:0}
        .fd-search{box-sizing:border-box;width:100%;margin:16px 0 12px;padding:13px;border-radius:12px;border:1px solid var(--border,#d2d9cf);background:var(--background,#fff);color:inherit;font-size:16px}
        .fd-filters{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 18px}
        .fd-button{padding:9px 12px;border:1px solid var(--border,#d2d9cf);border-radius:999px;background:transparent;color:inherit;cursor:pointer}
        .fd-button:disabled{opacity:.55;cursor:wait}
        .fd-button.active,.fd-open{background:#236b3b;color:white;border-color:#236b3b}
        .fd-panel{padding:15px;border:1px solid var(--border,#dce2d9);border-radius:16px;margin:16px 0}
        .fd-select{box-sizing:border-box;max-width:100%;padding:10px;border-radius:10px;border:1px solid var(--border,#d2d9cf);background:var(--background,#fff);color:inherit}
        .fd-toolbar{display:flex;gap:9px;flex-wrap:wrap;margin:14px 0}
        .fd-price-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:14px}
        .fd-price{border:1px solid var(--border,#dce2d9);padding:13px;border-radius:12px;min-width:0}
        .fd-price h3{margin:0 0 8px;font-size:17px}
        .fd-muted{font-size:12px;line-height:1.65;overflow-wrap:anywhere}
        .fd-status{display:inline-block;font-size:12px;padding:6px 9px;border-radius:8px;background:var(--card,#f1f3ef)}
        .fd-open{display:inline-block;margin-top:12px;padding:10px 12px;border-radius:10px;text-decoration:none;font-size:13px}
        .fd-note{margin-top:18px;padding:14px;border:1px solid var(--border,#dce2d9);border-radius:12px;font-size:13px;line-height:1.65}
        .fd-empty{padding:20px 10px;text-align:center;line-height:1.7}
        @media(max-width:520px){.fd-price-list{grid-template-columns:1fr}.fd-hero h1{font-size:24px}}
      `}</style>

      <header className="fd-hero">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontSize: 13 }}>🌾 NAMMA KARNATAKA</div>
            <h1>{kn ? "ಕೃಷಿ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು" : "Crop Market Prices"}</h1>
          </div>
          <button
            className="fd-button"
            onClick={() => setLang(kn ? "en" : "kn")}
          >
            {kn ? "English" : "ಕನ್ನಡ"}
          </button>
        </div>
        <p>
          {kn
            ? "ಕರ್ನಾಟಕದ ಕೃಷಿ ಮಾರುಕಟ್ಟೆಗಳಲ್ಲಿ ಪ್ರಕಟವಾದ ಬೆಳೆಗಳ ಕನಿಷ್ಠ, ಗರಿಷ್ಠ ಮತ್ತು Modal ಬೆಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ."
            : "Check published minimum, maximum and modal crop prices from Karnataka agricultural markets."}
        </p>
      </header>

      <input
        className="fd-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={
          kn
            ? "ಹತ್ತಿ, ಭತ್ತ, ತೊಗರಿ, ಶೇಂಗಾ ಅಥವಾ ಮಾರುಕಟ್ಟೆ ಹುಡುಕಿ..."
            : "Search cotton, paddy, tur, groundnut or market..."
        }
        aria-label={kn ? "ಬೆಳೆ ಅಥವಾ ಮಾರುಕಟ್ಟೆ ಹುಡುಕಿ" : "Search crop or market"}
      />

      <div className="fd-filters">
        {filters.map((item) => (
          <button
            key={item.id}
            className={`fd-button ${cropFilter === item.id ? "active" : ""}`}
            onClick={() => setCropFilter(item.id)}
          >
            {kn ? item.kn : item.en}
          </button>
        ))}
      </div>

      <section className="fd-panel">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2 style={{ margin: "0 0 8px" }}>
              {kn ? "🌱 ಕರ್ನಾಟಕದ ಮಂಡಿ ದರಗಳು" : "🌱 Karnataka Mandi Rates"}
            </h2>
            <div className="fd-muted">
              {feedStatus === "ok"
                ? kn
                  ? `ಡೇಟಾ ದಿನಾಂಕ: ${dataDate} · ಪರಿಶೀಲಿಸಿದ ಸಮಯ: ${fetchedAt}`
                  : `Data date: ${dataDate} · Checked: ${fetchedAt}`
                : feedStatus === "error"
                  ? kn
                    ? "ನೇರ ಡೇಟಾ ಲಭ್ಯವಾಗಲಿಲ್ಲ."
                    : "Live data could not be retrieved."
                  : kn
                    ? "ಮೂಲದಿಂದ ಡೇಟಾ ಪಡೆಯಲಾಗುತ್ತಿದೆ..."
                    : "Retrieving source data..."}
            </div>
          </div>

          <button
            className="fd-button"
            onClick={() => void loadPrices()}
            disabled={loading}
          >
            {loading
              ? kn
                ? "ಲೋಡ್ ಆಗುತ್ತಿದೆ..."
                : "Loading..."
              : kn
                ? "↻ ಮರುಲೋಡ್"
                : "↻ Refresh"}
          </button>
        </div>

        <div className="fd-toolbar">
          <select
            className="fd-select"
            value={districtFilter}
            onChange={(e) => {
              setDistrictFilter(e.target.value);
              setMarketFilter("all");
            }}
            aria-label={kn ? "ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ" : "Select district"}
          >
            <option value="all">{kn ? "ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು" : "All districts"}</option>
            {districts.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>

          <select
            className="fd-select"
            value={marketFilter}
            onChange={(e) => setMarketFilter(e.target.value)}
            aria-label={kn ? "ಮಾರುಕಟ್ಟೆ ಆಯ್ಕೆಮಾಡಿ" : "Select market"}
          >
            <option value="all">{kn ? "ಎಲ್ಲಾ ಮಾರುಕಟ್ಟೆಗಳು" : "All markets"}</option>
            {markets.map((market) => (
              <option key={market} value={market}>{market}</option>
            ))}
          </select>
        </div>

        {feedStatus === "ok" && (
          <div className="fd-muted">
            {kn
              ? `ಒಟ್ಟು ${visiblePrices.length} ಬೆಲೆ ದಾಖಲೆಗಳು`
              : `${visiblePrices.length} price records`}
          </div>
        )}

        {feedStatus === "ok" && visiblePrices.length > 0 && (
          <div className="fd-price-list">
            {visiblePrices.slice(0, 200).map((row, index) => (
              <article
                className="fd-price"
                key={`${row.commodity}-${row.market}-${row.date}-${index}`}
              >
                <h3>{row.commodity}</h3>

                <div>
                  <strong>{row.market}</strong>
                  {row.district !== "—" && <span> · {row.district}</span>}
                </div>

                <div style={{ marginTop: 10, lineHeight: 1.8 }}>
                  {row.min && (
                    <div>
                      {kn ? "ಕನಿಷ್ಠ ಬೆಲೆ" : "Minimum"}: ₹{row.min}
                    </div>
                  )}
                  {row.max && (
                    <div>
                      {kn ? "ಗರಿಷ್ಠ ಬೆಲೆ" : "Maximum"}: ₹{row.max}
                    </div>
                  )}
                  {row.modal && (
                    <div>
                      <strong>
                        {kn ? "Modal ಬೆಲೆ" : "Modal price"}: ₹{row.modal}
                      </strong>
                    </div>
                  )}
                </div>

                <div className="fd-muted" style={{ marginTop: 8 }}>
                  {row.unit} · {kn ? "ದಿನಾಂಕ" : "Date"}: {row.date}
                </div>
              </article>
            ))}
          </div>
        )}

        {feedStatus === "ok" && visiblePrices.length === 0 && (
          <div className="fd-empty">
            {kn
              ? "ಈ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದುವ ಬೆಲೆ ದಾಖಲೆಗಳು ಸಿಗಲಿಲ್ಲ. ಬೇರೆ ಬೆಳೆ ಅಥವಾ ಫಿಲ್ಟರ್ ಪ್ರಯತ್ನಿಸಿ."
              : "No price records match this search. Try another crop or filter."}
          </div>
        )}

        {feedStatus !== "ok" && (
          <div className="fd-empty">
            <p>
              {kn
                ? "API ಸಂಪರ್ಕ, browser access ಅಥವಾ ಮಾರುಕಟ್ಟை ಡೇಟಾ ಲಭ್ಯತೆಯ ಸಮಸ್ಯೆಯಿಂದ ಬೆಲೆಗಳನ್ನು ಪಡೆಯಲಾಗಲಿಲ್ಲ. ಅಂದಾಜು ಬೆಲೆಗಳನ್ನು ತೋರಿಸಿಲ್ಲ."
                : "Prices could not be retrieved because of an API, browser-access or data-availability issue. No estimated prices are shown."}
            </p>
          </div>
        )}

        <a
          className="fd-open"
          href={SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {kn ? "AGMARKNET ಅಧಿಕೃತ ಮೂಲ ↗" : "Official AGMARKNET source ↗"}
        </a>
      </section>

      <aside className="fd-note">
        <strong>{kn ? "ನೈಜ ಡೇಟಾ ಸೂಚನೆ" : "Real-data notice"}</strong>
        <p>
          {kn
            ? "ಇವು ಮಂಡಿಯಲ್ಲಿ ವರದಿಯಾದ ಸಗಟು ಬೆಲೆಗಳು; ನಿಮ್ಮ ಊರಿನ ಖರೀದಿ ಬೆಲೆ ಅಥವಾ ರೈತನಿಗೆ ಸಿಗುವ ಅಂತಿಮ ಬೆಲೆ ಬೇರೆ ಇರಬಹುದು. ಎಲ್ಲ ಮಾರುಕಟ್ಟೆಗಳೂ ಪ್ರತಿದಿನ ವರದಿ ಮಾಡುವುದಿಲ್ಲ. ಬೆಲೆಗಳು ಮೂಲದಿಂದ ಯಶಸ್ವಿಯಾಗಿ ಬಂದಾಗ ಮಾತ್ರ ಇಲ್ಲಿ ತೋರಿಸಲಾಗುತ್ತದೆ."
            : "These are reported wholesale mandi prices; the price offered in your village or the final amount received by a farmer may differ. Not every market reports prices every day. Prices are displayed only when successfully returned by the source."}
        </p>
      </aside>
    </main>
  );
}
