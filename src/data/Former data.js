
import { useCallback, useEffect, useMemo, useState } from "react";

type PriceRow = {
  commodity: string;
  market: string;
  min?: string;
  max?: string;
  modal?: string;
  unit: string;
  date: string;
};

type Category = {
  id: string;
  kn: string;
  en: string;
  group: string;
  descriptionKn: string;
  descriptionEn: string;
  source: string;
  url: string;
};

const API = "https://api.agmarknet.gov.in/v1";

const categories: Category[] = [
  {
    id: "crops", kn: "ಕೃಷಿ ಬೆಳೆಗಳು", en: "Crop Market Prices",
    group: "crop",
    descriptionKn: "ಹತ್ತಿ, ಮೆಕ್ಕೆಜೋಳ, ತೊಗರಿ, ಶೇಂಗಾ, ರಾಗಿ ಮತ್ತು ಇತರ ಬೆಳೆಗಳು.",
    descriptionEn: "Cotton, maize, tur, groundnut, ragi and other crops.",
    source: "AGMARKNET",
    url: "https://agmarknet.gov.in/home",
  },
  {
    id: "food", kn: "ದಿನಸಿ ಮತ್ತು ಅಗತ್ಯ ಆಹಾರ", en: "Groceries & Essentials",
    group: "daily",
    descriptionKn: "ಅಕ್ಕಿ, ಬೇಳೆ, ಗೋಧಿ, ರಾಗಿ, ಸಕ್ಕರೆ ಮತ್ತು ಅಡುಗೆ ಎಣ್ಣೆ.",
    descriptionEn: "Rice, pulses, wheat, ragi, sugar and cooking oil.",
    source: "Department of Consumer Affairs",
    url: "https://consumeraffairs.gov.in/",
  },
  {
    id: "vegetables", kn: "ತರಕಾರಿ ಮತ್ತು ಹಣ್ಣು", en: "Vegetables & Fruits",
    group: "daily",
    descriptionKn: "ಈರುಳ್ಳಿ, ಟೊಮೇಟೊ, ಆಲೂಗಡ್ಡೆ ಮತ್ತು ಇತರ ಉತ್ಪನ್ನಗಳು.",
    descriptionEn: "Onion, tomato, potato and other produce.",
    source: "AGMARKNET / Consumer Affairs",
    url: "https://agmarknet.gov.in/home",
  },
  {
    id: "fuel", kn: "ಪೆಟ್ರೋಲ್ ಮತ್ತು ಡೀಸೆಲ್", en: "Petrol & Diesel",
    group: "fuel",
    descriptionKn: "ಅಧಿಕೃತ ಇಂಧನ ಬೆಲೆ ಮೂಲ.",
    descriptionEn: "Official fuel-price information.",
    source: "Indian Oil",
    url: "https://iocl.com/petrol-diesel-price",
  },
  {
    id: "lpg", kn: "LPG ಮತ್ತು ಅನಿಲ", en: "LPG & Gas",
    group: "fuel",
    descriptionKn: "ಗೃಹಬಳಕೆಯ LPG ದರವನ್ನು ಅಧಿಕೃತವಾಗಿ ಪರಿಶೀಲಿಸಿ.",
    descriptionEn: "Check the official domestic LPG price.",
    source: "Indian Oil",
    url: "https://iocl.com/",
  },
  {
    id: "gold", kn: "ಚಿನ್ನ ಮತ್ತು ಬೆಳ್ಳಿ", en: "Gold & Silver",
    group: "metals",
    descriptionKn: "ಪ್ರಕಟಿತ bullion ದರ; ಸ್ಥಳೀಯ ಅಂಗಡಿ ದರ ಬೇರೆಯಾಗಿರಬಹುದು.",
    descriptionEn: "Published bullion rates; local shop prices may differ.",
    source: "IBJA",
    url: "https://ibjarates.com/",
  },
  {
    id: "steel", kn: "ಸ್ಟೀಲ್ ಮತ್ತು ಕಬ್ಬಿಣದ ರಾಡ್", en: "Steel & TMT Rods",
    group: "building",
    descriptionKn: "TMT ರಾಡ್, ಸ್ಟೀಲ್, ಕಬ್ಬಿಣದ ಪೈಪ್ ಮತ್ತು ಇತರ ಲೋಹಗಳು.",
    descriptionEn: "TMT rods, steel, iron pipes and other metal products.",
    source: "Local dealer quotation required",
    url: "https://www.bis.gov.in/",
  },
  {
    id: "cement", kn: "ಸಿಮೆಂಟ್", en: "Cement",
    group: "building",
    descriptionKn: "ಬ್ರ್ಯಾಂಡ್, ಚೀಲದ ತೂಕ ಮತ್ತು ಸ್ಥಳದ ಪ್ರಕಾರ ದರ ಬದಲಾಗುತ್ತದೆ.",
    descriptionEn: "Prices vary by brand, bag weight and location.",
    source: "Local dealer quotation required",
    url: "https://www.bis.gov.in/",
  },
  {
    id: "building", kn: "ಮರಳು, ಜಲ್ಲಿ, ಇಟ್ಟಿಗೆ ಮತ್ತು ಬ್ಲಾಕ್", en: "Sand, Aggregate, Bricks & Blocks",
    group: "building",
    descriptionKn: "ಸಾಗಣೆ ವೆಚ್ಚ ಸೇರಿದಂತೆ ಸ್ಥಳೀಯ ದರ ಪರಿಶೀಲಿಸಿ.",
    descriptionEn: "Check local rates including transport charges.",
    source: "Local supplier quotation required",
    url: "https://www.bis.gov.in/",
  },
  {
    id: "hardware", kn: "ಪೈಪ್, ಬಣ್ಣ, ಟೈಲ್ಸ್ ಮತ್ತು ಹಾರ್ಡ್‌ವೇರ್", en: "Pipes, Paint, Tiles & Hardware",
    group: "home",
    descriptionKn: "ಪೈಪ್, ವಿದ್ಯುತ್ ತಂತಿ, ಸ್ವಿಚ್, ಬಣ್ಣ, ಟೈಲ್ಸ್ ಮತ್ತು ಮರ.",
    descriptionEn: "Pipes, electrical wire, switches, paint, tiles and timber.",
    source: "Manufacturer / dealer price",
    url: "https://www.bis.gov.in/",
  },
  {
    id: "fertilizer", kn: "ಗೊಬ್ಬರ", en: "Fertilizers",
    group: "farm",
    descriptionKn: "ಯೂರಿಯಾ, DAP, NPK ಮತ್ತು ಇತರ ಗೊಬ್ಬರಗಳು.",
    descriptionEn: "Urea, DAP, NPK and other fertilizers.",
    source: "Department of Fertilizers",
    url: "https://fert.gov.in/",
  },
  {
    id: "seeds", kn: "ಬೀಜಗಳು", en: "Seeds",
    group: "farm",
    descriptionKn: "ತಳಿ, ಬ್ರ್ಯಾಂಡ್ ಮತ್ತು ಪ್ಯಾಕ್ ಗಾತ್ರದ ಪ್ರಕಾರ ಬೆಲೆ ಬದಲಾಗುತ್ತದೆ.",
    descriptionEn: "Prices vary by variety, brand and pack size.",
    source: "Karnataka Raita Mitra",
    url: "https://raitamitra.karnataka.gov.in/",
  },
  {
    id: "pesticides", kn: "ಕೀಟನಾಶಕ ಮತ್ತು ಶಿಲೀಂಧ್ರನಾಶಕ", en: "Pesticides & Fungicides",
    group: "farm",
    descriptionKn: "ಉತ್ಪನ್ನದ ಲೇಬಲ್, ಪ್ರಮಾಣ ಮತ್ತು MRP ಪರಿಶೀಲಿಸಿ.",
    descriptionEn: "Check the product label, quantity and MRP.",
    source: "PPQS",
    url: "https://ppqs.gov.in/",
  },
  {
    id: "animal", kn: "ಪಶು ಆಹಾರ ಮತ್ತು ಮೇವು", en: "Animal Feed & Fodder",
    group: "farm",
    descriptionKn: "ಪಶು ಆಹಾರ, ಒಣಮೇವು ಮತ್ತು ಹಸಿರು ಮೇವು.",
    descriptionEn: "Cattle feed, dry fodder and green fodder.",
    source: "Local supplier quotation required",
    url: "https://dahd.gov.in/",
  },
  {
    id: "machinery", kn: "ಕೃಷಿ ಯಂತ್ರಗಳು ಮತ್ತು ಬಾಡಿಗೆ", en: "Farm Machinery & Rental",
    group: "farm",
    descriptionKn: "ಟ್ರ್ಯಾಕ್ಟರ್, ಹಾರ್ವೆಸ್ಟರ್, ರೋಟಾವೇಟರ್ ಮತ್ತು ಬಾಡಿಗೆ.",
    descriptionEn: "Tractors, harvesters, rotavators and rental rates.",
    source: "Agricultural Mechanization",
    url: "https://agrimachinery.nic.in/",
  },
  {
    id: "medicine", kn: "ಔಷಧಿಗಳ MRP", en: "Medicine MRP",
    group: "daily",
    descriptionKn: "ಪ್ರತಿ ಔಷಧಿಯ ಪ್ಯಾಕ್ ಮೇಲಿನ MRP ಪರಿಶೀಲಿಸಿ.",
    descriptionEn: "Check the MRP printed on each medicine pack.",
    source: "National Pharmaceutical Pricing Authority",
    url: "https://nppa.gov.in/",
  },
  {
    id: "clothing", kn: "ಬಟ್ಟೆ ಮತ್ತು ಪಾದರಕ್ಷೆ", en: "Clothing & Footwear",
    group: "home",
    descriptionKn: "ಬ್ರ್ಯಾಂಡ್ ಮತ್ತು ಗುಣಮಟ್ಟದ ಪ್ರಕಾರ ಮಾರಾಟ ಬೆಲೆ ಬದಲಾಗುತ್ತದೆ.",
    descriptionEn: "Retail prices vary by brand and quality.",
    source: "Retailer price required",
    url: "https://consumeraffairs.gov.in/",
  },
];

const filterOptions = [
  { id: "all", kn: "ಎಲ್ಲವೂ", en: "All" },
  { id: "crop", kn: "ಬೆಳೆಗಳು", en: "Crops" },
  { id: "daily", kn: "ದಿನನಿತ್ಯದ ವಸ್ತುಗಳು", en: "Daily essentials" },
  { id: "fuel", kn: "ಇಂಧನ", en: "Fuel" },
  { id: "building", kn: "ನಿರ್ಮಾಣ ಸಾಮಗ್ರಿ", en: "Building materials" },
  { id: "farm", kn: "ಕೃಷಿ ಸಾಮಗ್ರಿ", en: "Farm supplies" },
  { id: "metals", kn: "ಲೋಹಗಳು", en: "Metals" },
  { id: "home", kn: "ಮನೆ ಬಳಕೆ", en: "Home essentials" },
];

function findPriceRows(data: unknown): PriceRow[] {
  const found: PriceRow[] = [];
  const visited = new Set<object>();

  const getValue = (obj: Record<string, unknown>, keys: string[]) => {
    const entry = Object.entries(obj).find(([key, value]) =>
      keys.includes(key.toLowerCase().replace(/[^a-z]/g, "")) &&
      value !== null && value !== undefined && String(value).trim() !== ""
    );
    return entry ? String(entry[1]) : undefined;
  };

  function walk(value: unknown) {
    if (!value || typeof value !== "object") return;
    if (visited.has(value)) return;
    visited.add(value);

    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }

    const obj = value as Record<string, unknown>;
    const commodity = getValue(obj, ["commodity", "commodityname", "crop", "cropname"]);
    const market = getValue(obj, ["market", "marketname", "mandi", "mandiname"]);
    const min = getValue(obj, ["minprice", "minimumprice", "minpricequintal"]);
    const max = getValue(obj, ["maxprice", "maximumprice", "maxpricequintal"]);
    const modal = getValue(obj, ["modalprice", "modal", "modalpricequintal"]);
    const date = getValue(obj, ["date", "pricedate", "arrivaldate", "reportdate"]);

    if (commodity && (min || max || modal)) {
      found.push({
        commodity,
        market: market || "Market not specified",
        min,
        max,
        modal,
        unit: "₹/quintal",
        date: date || "Source date not supplied",
      });
    }

    Object.values(obj).forEach(walk);
  }

  walk(data);
  return found;
}

export default function FarmerData() {
  const [lang, setLang] = useState<"kn" | "en">("kn");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [saved, setSaved] = useState<string[]>([]);
  const [prices, setPrices] = useState<PriceRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState("");
  const [feedStatus, setFeedStatus] = useState<"idle" | "ok" | "error">("idle");

  const kn = lang === "kn";

  useEffect(() => {
    try {
      const raw = localStorage.getItem("nk_farmer_data_saved");
      if (raw) setSaved(JSON.parse(raw));
    } catch {
      setSaved([]);
    }
  }, []);

  const loadPrices = useCallback(async () => {
    setLoading(true);

    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 12000);

      try {
        // Karnataka's state ID is obtained from the public state list,
        // rather than assuming an ID or inserting sample prices.
        const stateResponse = await fetch(
          `${API}/location/state?page=1&search=Karnataka`,
          { signal: controller.signal, headers: { Accept: "application/json" } }
        );

        if (!stateResponse.ok) throw new Error("State lookup failed");

        const stateJson = await stateResponse.json();
        const stateObjects: Record<string, unknown>[] = [];

        function collectStates(value: unknown) {
          if (!value || typeof value !== "object") return;
          if (Array.isArray(value)) {
            value.forEach(collectStates);
            return;
          }
          const obj = value as Record<string, unknown>;
          const name = String(obj.name ?? obj.state ?? obj.state_name ?? "").toLowerCase();
          if (name.includes("karnataka")) stateObjects.push(obj);
          Object.values(obj).forEach(collectStates);
        }

        collectStates(stateJson);

        const stateId = stateObjects
          .map((obj) => obj.id ?? obj.stateId ?? obj.state_id ?? obj.stateCode)
          .find((value) => value !== undefined && value !== null);

        if (stateId === undefined) throw new Error("Karnataka state ID not found");

        const date = new Date();
        const localDate = [
          date.getFullYear(),
          String(date.getMonth() + 1).padStart(2, "0"),
          String(date.getDate()).padStart(2, "0"),
        ].join("-");

        const priceUrl =
          `${API}/prices-and-arrivals/commodity-wise/daily-report-state` +
          `?date=${encodeURIComponent(localDate)}` +
          `&stateIds=${encodeURIComponent(String(stateId))}`;

        const priceResponse = await fetch(priceUrl, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });

        if (!priceResponse.ok) throw new Error("Price request failed");

        const priceJson = await priceResponse.json();
        const rows = findPriceRows(priceJson);

        if (!rows.length) throw new Error("No usable price rows returned");

        setPrices(rows);
        setUpdatedAt(new Date().toLocaleString());
        setFeedStatus("ok");
      } finally {
        window.clearTimeout(timeout);
      }
    } catch {
      setFeedStatus("error");
      // Do not replace a failed request with invented or stale "live" prices.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPrices();
    const timer = window.setInterval(() => void loadPrices(), 15 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, [loadPrices]);

  const visibleCategories = useMemo(() => {
    const q = search.trim().toLowerCase();
    return categories.filter((item) => {
      const matchGroup = filter === "all" || item.group === filter;
      const matchSearch =
        !q ||
        [item.kn, item.en, item.descriptionKn, item.descriptionEn, item.source]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchGroup && matchSearch;
    });
  }, [search, filter]);

  const visiblePrices = useMemo(() => {
    const q = search.trim().toLowerCase();
    return prices.filter((row) =>
      [row.commodity, row.market, row.date].join(" ").toLowerCase().includes(q)
    );
  }, [prices, search]);

  function toggleSaved(id: string) {
    const next = saved.includes(id)
      ? saved.filter((item) => item !== id)
      : [...saved, id];

    setSaved(next);
    try {
      localStorage.setItem("nk_farmer_data_saved", JSON.stringify(next));
    } catch {
      // The page remains usable if local storage is unavailable.
    }
  }

  return (
    <main className="farmer-data-page">
      <style>{`
        .farmer-data-page{max-width:1100px;margin:auto;padding:16px;color:var(--text,inherit)}
        .fd-hero{padding:22px 18px;border-radius:20px;background:var(--card,#eef5e9);border:1px solid var(--border,#dce5d7)}
        .fd-hero h1{font-size:28px;margin:8px 0}
        .fd-hero p{line-height:1.65;margin-bottom:0}
        .fd-search{box-sizing:border-box;width:100%;margin:16px 0 12px;padding:13px;border-radius:12px;border:1px solid var(--border,#d2d9cf);background:var(--background,#fff);color:inherit;font-size:16px}
        .fd-filters{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px}
        .fd-button{padding:9px 12px;border:1px solid var(--border,#d2d9cf);border-radius:999px;background:transparent;color:inherit;cursor:pointer}
        .fd-button.active,.fd-open{background:#236b3b;color:white;border-color:#236b3b}
        .fd-panel{padding:15px;border:1px solid var(--border,#dce2d9);border-radius:16px;margin:16px 0}
        .fd-price-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
        .fd-price{border:1px solid var(--border,#dce2d9);padding:12px;border-radius:12px;min-width:0}
        .fd-price h3{margin:0 0 8px;font-size:15px}
        .fd-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
        .fd-card{display:flex;flex-direction:column;align-items:flex-start;gap:10px;min-width:0;padding:15px;border:1px solid var(--border,#dce2d9);border-radius:16px}
        .fd-card h2{font-size:17px;line-height:1.45;margin:0}
        .fd-card p{font-size:13px;line-height:1.6;margin:0}
        .fd-status{font-size:12px;padding:6px 9px;border-radius:8px;background:var(--card,#f1f3ef)}
        .fd-open{display:inline-block;margin-top:auto;padding:10px 12px;border-radius:10px;text-decoration:none;font-size:13px}
        .fd-note{margin-top:18px;padding:14px;border:1px solid var(--border,#dce2d9);border-radius:12px;font-size:13px;line-height:1.65}
        @media(max-width:520px){.fd-grid,.fd-price-list{grid-template-columns:1fr}.fd-hero h1{font-size:24px}}
      `}</style>

      <header className="fd-hero">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontSize: 13 }}>🌾 NAMMA KARNATAKA</div>
            <h1>{kn ? "ರೈತರ ಮತ್ತು ಜನರ ಬೆಲೆ ಮಾಹಿತಿ" : "Farmer & Public Data"}</h1>
          </div>
          <button className="fd-button" onClick={() => setLang(kn ? "en" : "kn")}>
            {kn ? "English" : "ಕನ್ನಡ"}
          </button>
        </div>
        <p>
          {kn
            ? "ಕೃಷಿ, ದಿನಸಿ, ಇಂಧನ, ನಿರ್ಮಾಣ ಸಾಮಗ್ರಿ ಮತ್ತು ದಿನನಿತ್ಯದ ವಸ್ತುಗಳ ಬೆಲೆ ಮೂಲಗಳು."
            : "Price sources for agriculture, groceries, fuel, construction and daily essentials."}
        </p>
      </header>

      <input
        className="fd-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={kn ? "ಹತ್ತಿ, ರಾಡ್, ಸಿಮೆಂಟ್, ಅಕ್ಕಿ ಎಂದು ಹುಡುಕಿ..." : "Search cotton, rods, cement, rice..."}
        aria-label={kn ? "ಬೆಲೆ ವಿಭಾಗ ಹುಡುಕಿ" : "Search categories"}
      />

      <div className="fd-filters">
        {filterOptions.map((item) => (
          <button
            key={item.id}
            className={`fd-button ${filter === item.id ? "active" : ""}`}
            onClick={() => setFilter(item.id)}
          >
            {kn ? item.kn : item.en}
          </button>
        ))}
      </div>

      <section className="fd-panel">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ margin: "0 0 8px" }}>
              {kn ? "🌱 ಕರ್ನಾಟಕದ ಕೃಷಿ ಮಾರುಕಟ್ಟೆ ದರ" : "🌱 Karnataka Crop Market Prices"}
            </h2>
            <div style={{ fontSize: 13 }}>
              {feedStatus === "ok"
                ? kn ? `ಮೂಲದಿಂದ ದರ ಪಡೆದ ಸಮಯ: ${updatedAt}` : `Fetched from source: ${updatedAt}`
                : feedStatus === "error"
                  ? kn ? "ಈ ಬಾರಿ ನೇರ ಡೇಟಾ ಪಡೆಯಲಾಗಲಿಲ್ಲ." : "Could not fetch live data this time."
                  : kn ? "ಡೇಟಾ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ..." : "Checking data..."}
            </div>
          </div>
          <button className="fd-button" onClick={() => void loadPrices()} disabled={loading}>
            {loading ? (kn ? "ಲೋಡ್ ಆಗುತ್ತಿದೆ..." : "Loading...") : (kn ? "↻ ಮರುಲೋಡ್" : "↻ Refresh")}
          </button>
        </div>

        {feedStatus === "ok" && (
          <div className="fd-price-list" style={{ marginTop: 14 }}>
            {visiblePrices.slice(0, 80).map((row, index) => (
              <article className="fd-price" key={`${row.commodity}-${row.market}-${index}`}>
                <h3>{row.commodity}</h3>
                <div>{row.market}</div>
                <div style={{ marginTop: 8, lineHeight: 1.7 }}>
                  {row.min && <div>{kn ? "ಕನಿಷ್ಠ" : "Min"}: ₹{row.min}</div>}
                  {row.max && <div>{kn ? "ಗರಿಷ್ಠ" : "Max"}: ₹{row.max}</div>}
                  {row.modal && <div><strong>{kn ? "ಮೋಡಲ್" : "Modal"}: ₹{row.modal}</strong></div>}
                  <small>{row.unit} · {row.date}</small>
                </div>
              </article>
            ))}
          </div>
        )}

        {feedStatus !== "ok" && (
          <p style={{ lineHeight: 1.65, fontSize: 13 }}>
            {kn
              ? "AGMARKNET ಸಂಪರ್ಕ, browser access ಅಥವಾ ಇಂದಿನ ಡೇಟಾ ಲಭ್ಯತೆಯ ಸಮಸ್ಯೆಯಿಂದ ದರಗಳು ಬರಲಿಲ್ಲ. ಯಾವುದೇ ಅಂದಾಜು ದರ ತೋರಿಸಿಲ್ಲ. ಅಧಿಕೃತ ಮೂಲವನ್ನು ತೆರೆಯಬಹುದು."
              : "Prices were not returned because of a connection, browser-access or data-availability issue. No estimated prices are shown. Open the official source instead."}
          </p>
        )}

        <a className="fd-open" href="https://agmarknet.gov.in/home" target="_blank" rel="noopener noreferrer">
          {kn ? "AGMARKNET ಅಧಿಕೃತ ಮೂಲ ↗" : "Official AGMARKNET source ↗"}
        </a>
      </section>

      <section className="fd-grid">
        {visibleCategories.map((item) => (
          <article className="fd-card" key={item.id}>
            <h2>{kn ? item.kn : item.en}</h2>
            <p>{kn ? item.descriptionKn : item.descriptionEn}</p>
            <span className="fd-status">
              {kn ? "ಮೂಲದ ದರ ಪರಿಶೀಲಿಸಿ" : "Check source for price"}
            </span>
            <div style={{ fontSize: 12, overflowWrap: "anywhere" }}>
              {kn ? "ಮೂಲ: " : "Source: "}{item.source}
            </div>
            <button className="fd-button" onClick={() => toggleSaved(item.id)}>
              {saved.includes(item.id)
                ? kn ? "★ ಉಳಿಸಲಾಗಿದೆ" : "★ Saved"
                : kn ? "☆ ಉಳಿಸಿಕೊಳ್ಳಿ" : "☆ Save"}
            </button>
            <a className="fd-open" href={item.url} target="_blank" rel="noopener noreferrer">
              {kn ? "ಮೂಲ ತೆರೆಯಿರಿ ↗" : "Open source ↗"}
            </a>
          </article>
        ))}
      </section>

      <aside className="fd-note">
        <strong>{kn ? "ನೈಜ ಡೇಟಾ ಸೂಚನೆ" : "Real-data notice"}</strong>
        <p>
          {kn
            ? "ಕೃಷಿ ಬೆಲೆ API ನೇರವಾಗಿ ಕೆಲಸ ಮಾಡಿದಾಗ ಮಾತ್ರ ಇಲ್ಲಿ ದರಗಳನ್ನು ತೋರಿಸಲಾಗುತ್ತದೆ. ಉಳಿದ ವಿಭಾಗಗಳಲ್ಲಿ ಅಧಿಕೃತ ಮೂಲ ಅಥವಾ ಮಾರಾಟಗಾರರ ಮಾಹಿತಿ ಪರಿಶೀಲಿಸಿ. ಎಲ್ಲ ವಸ್ತುಗಳಿಗೂ ಉಚಿತ ಸಾರ್ವಜನಿಕ live feed ಲಭ್ಯವಿಲ್ಲ. ದಿನಾಂಕ, ಘಟಕ, ಬ್ರ್ಯಾಂಡ್ ಮತ್ತು ಸ್ಥಳದ ವ್ಯತ್ಯಾಸ ಗಮನಿಸಿ."
            : "Crop prices appear here only if the live API returns usable data. For other categories, check the official source or supplier. Not every item has a free public live feed. Check date, unit, brand and location."}
        </p>
      </aside>
    </main>
  );
}
