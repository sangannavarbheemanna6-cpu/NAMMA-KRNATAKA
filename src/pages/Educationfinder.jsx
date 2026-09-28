
import React, { useEffect, useMemo, useState } from "react";

const DISTRICTS = [
  "All Districts", "Bagalkot", "Ballari", "Belagavi",
  "Bengaluru Rural", "Bengaluru Urban", "Bidar",
  "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru",
  "Chitradurga", "Dakshina Kannada", "Davanagere",
  "Dharwad", "Gadag", "Hassan", "Haveri",
  "Kalaburagi", "Kodagu", "Kolar", "Koppal",
  "Mandya", "Mysuru", "Raichur", "Ramanagara",
  "Shivamogga", "Tumakuru", "Udupi",
  "Uttara Kannada", "Vijayanagara", "Vijayapura",
  "Yadgir",
];

const LANG = {
  en: {
    title: "Education Finder",
    subtitle: "Find schools across Karnataka",
    district: "Select District",
    all: "All Districts",
    search: "Search school name...",
    find: "Find Schools",
    location: "Use My Location",
    loading: "Loading school data...",
    locating: "Finding nearby schools...",
    count: "Schools Found",
    noData: "No schools found. Try another district.",
    noFile: "School data file could not be loaded.",
    noLocation: "Location permission denied. Please enable location.",
    view: "View Location",
    directions: "Get Directions",
    source: "School data from local verified dataset",
    distance: "Distance",
  },
  kn: {
    title: "ಶಿಕ್ಷಣ ಮಾಹಿತಿ ಕೇಂದ್ರ",
    subtitle: "ಕರ್ನಾಟಕದ ಶಾಲೆಗಳನ್ನು ಹುಡುಕಿ",
    district: "ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ",
    all: "ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು",
    search: "ಶಾಲೆಯ ಹೆಸರನ್ನು ಹುಡುಕಿ...",
    find: "ಶಾಲೆಗಳನ್ನು ಹುಡುಕಿ",
    location: "ನನ್ನ ಸ್ಥಳ ಬಳಸಿ",
    loading: "ಶಾಲೆಗಳ ಮಾಹಿತಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    locating: "ಹತ್ತಿರದ ಶಾಲೆಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
    count: "ದೊರೆತ ಶಾಲೆಗಳು",
    noData: "ಶಾಲೆಗಳು ಸಿಗಲಿಲ್ಲ. ಬೇರೆ ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ.",
    noFile: "ಶಾಲೆಗಳ data file ಲೋಡ್ ಆಗಲಿಲ್ಲ.",
    noLocation: "Location permission ನೀಡಿ.",
    view: "ಸ್ಥಳ ನೋಡಿ",
    directions: "ದಾರಿ ತೋರಿಸಿ",
    source: "ಸ್ಥಳೀಯ verified school dataset",
    distance: "ದೂರ",
  },
};

function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function EducationFinder() {
  const [language, setLanguage] = useState("en");
  const [district, setDistrict] = useState("All Districts");
  const [search, setSearch] = useState("");
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nearby, setNearby] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState("");

  const t = LANG[language];

  // Read local JSON file. No external school API.
  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.BASE_URL}education-data.json`
        );

        if (!response.ok) {
          throw new Error("Local education data not found");
        }

        const data = await response.json();

        if (active) {
          const list = Array.isArray(data)
            ? data
            : data.schools || [];

          setSchools(
            list.filter(
              (s) =>
                s.name &&
                Number.isFinite(Number(s.lat)) &&
                Number.isFinite(Number(s.lng))
            ).map((s, index) => ({
              ...s,
              id: s.id || `${s.name}-${index}`,
              lat: Number(s.lat),
              lng: Number(s.lng),
            }))
          );
        }
      } catch (err) {
        console.error("Education data:", err);
        if (active) setError(t.noFile);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, []);

  const filteredSchools = useMemo(() => {
    let result = schools;

    if (district !== "All Districts" && !nearby) {
      result = result.filter(
        (school) =>
          (school.district || "").toLowerCase() ===
          district.toLowerCase()
      );
    }

    if (nearby && userLocation) {
      result = result
        .map((school) => ({
          ...school,
          distance: distanceKm(
            userLocation.lat,
            userLocation.lng,
            school.lat,
            school.lng
          ),
        }))
        .filter((school) => school.distance <= 50)
        .sort((a, b) => a.distance - b.distance);
    }

    const term = search.trim().toLowerCase();

    if (term) {
      result = result.filter((school) =>
        school.name.toLowerCase().includes(term)
      );
    }

    return result;
  }, [schools, district, search, nearby, userLocation]);

  function useMyLocation() {
    setError("");

    if (!navigator.geolocation) {
      setError(t.noLocation);
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setNearby(true);
        setLoading(false);
      },
      () => {
        setError(t.noLocation);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000,
      }
    );
  }

  function openMap(school) {
    window.open(
      `https://www.openstreetmap.org/?mlat=${school.lat}&mlon=${school.lng}#map=17/${school.lat}/${school.lng}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function getDirections(school) {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${school.lat},${school.lng}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f4f7fb",
      padding: 16,
      fontFamily: "Arial, sans-serif",
      color: "#172033"
    }}>
      <div style={{ maxWidth: 900, margin: "auto" }}>

        <header style={{
          background: "linear-gradient(135deg,#075e35,#159447)",
          color: "white",
          padding: 24,
          borderRadius: 18,
          marginBottom: 20
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12
          }}>
            <div>
              <h1 style={{ margin: "0 0 8px", fontSize: 26 }}>
                🎓 {t.title}
              </h1>
              <p style={{ margin: 0 }}>{t.subtitle}</p>
            </div>

            <button
              onClick={() =>
                setLanguage(language === "en" ? "kn" : "en")
              }
              style={{
                padding: "10px 14px",
                borderRadius: 20,
                border: "1px solid white",
                color: "white",
                background: "transparent",
                fontWeight: "bold"
              }}
            >
              {language === "en" ? "ಕನ್ನಡ" : "English"}
            </button>
          </div>
        </header>

        <section style={{
          background: "white",
          padding: 20,
          borderRadius: 16,
          marginBottom: 20,
          boxShadow: "0 3px 15px #0000000c"
        }}>
          <label style={{
            display: "block",
            fontWeight: "bold",
            marginBottom: 8
          }}>
            {t.district}
          </label>

          <select
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              setNearby(false);
              setSearch("");
            }}
            style={{
              width: "100%",
              padding: 13,
              borderRadius: 10,
              border: "1px solid #d0d7de",
              fontSize: 16,
              marginBottom: 14,
              background: "white"
            }}
          >
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d === "All Districts" ? t.all : d}
              </option>
            ))}
          </select>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.search}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: 13,
              borderRadius: 10,
              border: "1px solid #d0d7de",
              fontSize: 16,
              marginBottom: 14
            }}
          />

          <div style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap"
          }}>
            <button
              onClick={() => {
                setNearby(false);
                setUserLocation(null);
              }}
              style={{
                flex: 1,
                padding: 13,
                background: "#087b40",
                color: "white",
                border: 0,
                borderRadius: 10,
                fontWeight: "bold"
              }}
            >
              {t.find}
            </button>

            <button
              onClick={useMyLocation}
              style={{
                flex: 1,
                padding: 13,
                background: "#e9f4ff",
                color: "#075ca8",
                border: "1px solid #b5d9ff",
                borderRadius: 10,
                fontWeight: "bold"
              }}
            >
              📍 {t.location}
            </button>
          </div>
        </section>

        {loading && (
          <div style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            textAlign: "center"
          }}>
            {nearby ? t.locating : t.loading}
          </div>
        )}

        {error && (
          <div style={{
            padding: 16,
            background: "#fff0f0",
            color: "#a30000",
            borderRadius: 12,
            marginBottom: 16
          }}>
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 15
            }}>
              <h2 style={{ fontSize: 19 }}>
                🏫 {t.count}
              </h2>

              <span style={{
                background: "#dcfce7",
                color: "#166534",
                borderRadius: 20,
                padding: "7px 12px",
                fontWeight: "bold"
              }}>
                {filteredSchools.length}
              </span>
            </div>

            {filteredSchools.length === 0 && (
              <div style={{
                background: "white",
                padding: 24,
                borderRadius: 14,
                textAlign: "center"
              }}>
                {t.noData}
              </div>
            )}

            <div style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(min(100%,260px),1fr))",
              gap: 14
            }}>
              {filteredSchools.map((school) => (
                <article
                  key={school.id}
                  style={{
                    background: "white",
                    padding: 18,
                    borderRadius: 15,
                    border: "1px solid #e6eaf0",
                    boxShadow: "0 3px 12px #0000000b"
                  }}
                >
                  <h3 style={{
                    margin: "0 0 12px",
                    color: "#125b36",
                    fontSize: 18,
                    lineHeight: 1.4
                  }}>
                    🏫 {school.name}
                  </h3>

                  {school.district && (
                    <p style={{ color: "#526071" }}>
                      📍 {school.district}
                    </p>
                  )}

                  {school.address && (
                    <p style={{ color: "#526071" }}>
                      {school.address}
                    </p>
                  )}

                  {Number.isFinite(school.distance) && (
                    <p style={{ color: "#526071" }}>
                      {t.distance}: {school.distance.toFixed(1)} km
                    </p>
                  )}

                  <div style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 16,
                    flexWrap: "wrap"
                  }}>
                    <button
                      onClick={() => openMap(school)}
                      style={{
                        flex: 1,
                        padding: 11,
                        background: "#087b40",
                        color: "white",
                        border: 0,
                        borderRadius: 9,
                        fontWeight: "bold"
                      }}
                    >
                      🗺️ {t.view}
                    </button>

                    <button
                      onClick={() => getDirections(school)}
                      style={{
                        flex: 1,
                        padding: 11,
                        background: "#e9f4ff",
                        color: "#075ca8",
                        border: "1px solid #b5d9ff",
                        borderRadius: 9,
                        fontWeight: "bold"
                      }}
                    >
                      ➜ {t.directions}
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <p style={{
              textAlign: "center",
              color: "#77808e",
              fontSize: 12,
              margin: "24px 0"
            }}>
              {t.source}
            </p>
          </>
        )}
      </div>
    </main>
  );
}
