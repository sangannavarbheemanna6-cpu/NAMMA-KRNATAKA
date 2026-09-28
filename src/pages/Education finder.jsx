
import React, { useEffect, useState } from "react";

const DISTRICTS = [
  "All Districts",
  "Bagalkot",
  "Ballari",
  "Belagavi",
  "Bengaluru Rural",
  "Bengaluru Urban",
  "Bidar",
  "Chamarajanagar",
  "Chikkaballapur",
  "Chikkamagaluru",
  "Chitradurga",
  "Dakshina Kannada",
  "Davanagere",
  "Dharwad",
  "Gadag",
  "Hassan",
  "Haveri",
  "Kalaburagi",
  "Kodagu",
  "Kolar",
  "Koppal",
  "Mandya",
  "Mysuru",
  "Raichur",
  "Ramanagara",
  "Shivamogga",
  "Tumakuru",
  "Udupi",
  "Uttara Kannada",
  "Vijayanagara",
  "Vijayapura",
  "Yadgir",
];

const TEXT = {
  en: {
    title: "Education Finder",
    subtitle: "Find schools in Karnataka",
    district: "Select District",
    all: "All Districts",
    search: "Search school name...",
    loading: "Searching schools...",
    button: "Search Schools",
    location: "View Location",
    results: "Schools Found",
    empty: "No schools found. Try another district or search.",
    error: "Unable to load school data. Please try again.",
    map: "Open Map",
    source: "School information from OpenStreetMap",
    nearby: "Use My Location",
    locating: "Finding nearby schools...",
    noLocation: "Location permission denied or unavailable.",
    nearbyTitle: "Nearby Schools",
    distance: "Distance",
    allSchools: "All Schools",
  },
  kn: {
    title: "ಶಿಕ್ಷಣ ಮಾಹಿತಿ ಕೇಂದ್ರ",
    subtitle: "ಕರ್ನಾಟಕದ ಶಾಲೆಗಳನ್ನು ಹುಡುಕಿ",
    district: "ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ",
    all: "ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು",
    search: "ಶಾಲೆಯ ಹೆಸರನ್ನು ಹುಡುಕಿ...",
    loading: "ಶಾಲೆಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
    button: "ಶಾಲೆಗಳನ್ನು ಹುಡುಕಿ",
    location: "ಶಾಲೆಯ ಸ್ಥಳ ನೋಡಿ",
    results: "ದೊರೆತ ಶಾಲೆಗಳು",
    empty: "ಶಾಲೆಗಳು ದೊರೆತಿಲ್ಲ. ಬೇರೆ ಜಿಲ್ಲೆ ಅಥವಾ ಹೆಸರನ್ನು ಪ್ರಯತ್ನಿಸಿ.",
    error: "ಶಾಲೆಗಳ ಮಾಹಿತಿ ಲೋಡ್ ಆಗಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    map: "ನಕ್ಷೆ ತೆರೆಯಿರಿ",
    source: "ಶಾಲೆಗಳ ಮಾಹಿತಿ OpenStreetMap ನಿಂದ",
    nearby: "ನನ್ನ ಹತ್ತಿರದ ಶಾಲೆಗಳು",
    locating: "ಹತ್ತಿರದ ಶಾಲೆಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
    noLocation: "Location permission ಸಿಗಲಿಲ್ಲ.",
    nearbyTitle: "ಹತ್ತಿರದ ಶಾಲೆಗಳು",
    distance: "ದೂರ",
    allSchools: "ಎಲ್ಲಾ ಶಾಲೆಗಳು",
  },
};

// OpenStreetMap Overpass API
async function fetchSchools(district) {
  const districtFilter =
    district === "All Districts"
      ? ""
      : `area["name"="${district}"]["boundary"="administrative"](area.state)->.district;`;

  const areaSelector =
    district === "All Districts" ? ".state" : ".district";

  const query = `
    [out:json][timeout:60];
    area["name"="Karnataka"]["admin_level"="4"]->.state;
    ${districtFilter}
    (
      node["amenity"="school"](area${areaSelector});
      way["amenity"="school"](area${areaSelector});
      relation["amenity"="school"](area${areaSelector});
    );
    out center tags;
  `;

  const response = await fetch(
    "https://overpass-api.de/api/interpreter",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "data=" + encodeURIComponent(query),
    }
  );

  if (!response.ok) {
    throw new Error("OpenStreetMap request failed");
  }

  const data = await response.json();

  return (data.elements || [])
    .filter((item) => item.tags?.name)
    .map((item) => ({
      id: `${item.type}-${item.id}`,
      name: item.tags.name,
      lat: item.lat ?? item.center?.lat,
      lng: item.lon ?? item.center?.lon,
      district:
        item.tags["addr:district"] ||
        item.tags["addr:city"] ||
        district,
      address:
        [
          item.tags["addr:street"],
          item.tags["addr:suburb"],
          item.tags["addr:village"],
        ]
          .filter(Boolean)
          .join(", ") || district,
      type: item.tags["school"] || "School",
      source: "OpenStreetMap",
    }))
    .filter((school) => school.lat && school.lng);
}

export default function EducationFinder() {
  const [language, setLanguage] = useState("en");
  const [district, setDistrict] = useState("All Districts");
  const [search, setSearch] = useState("");
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyMode, setNearbyMode] = useState(false);

  const t = TEXT[language];

  async function searchSchools(selectedDistrict = district) {
    setLoading(true);
    setError("");
    setSearched(true);
    setNearbyMode(false);

    try {
      const results = await fetchSchools(selectedDistrict);
      setSchools(results);
    } catch (err) {
      console.error("Education Finder:", err);
      setSchools([]);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searchSchools("All Districts");
    // Initial school data load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDistrictChange(value) {
    setDistrict(value);
    setSearch("");
    searchSchools(value);
  }

  function openSchoolMap(school) {
    const url = `https://www.openstreetmap.org/?mlat=${school.lat}&mlon=${school.lng}#map=17/${school.lat}/${school.lng}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function openDirections(school) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${school.lat},${school.lng}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function findNearbySchools() {
    setError("");
    setLoading(true);
    setNearbyMode(true);

    if (!navigator.geolocation) {
      setError(t.noLocation);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setUserLocation({ lat, lng });

        try {
          const query = `
            [out:json][timeout:40];
            (
              node["amenity"="school"](around:15000,${lat},${lng});
              way["amenity"="school"](around:15000,${lat},${lng});
              relation["amenity"="school"](around:15000,${lat},${lng});
            );
            out center tags;
          `;

          const response = await fetch(
            "https://overpass-api.de/api/interpreter",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded",
              },
              body: "data=" + encodeURIComponent(query),
            }
          );

          if (!response.ok) {
            throw new Error("Nearby search failed");
          }

          const data = await response.json();

          const results = (data.elements || [])
            .filter((item) => item.tags?.name)
            .map((item) => {
              const schoolLat =
                item.lat ?? item.center?.lat;
              const schoolLng =
                item.lon ?? item.center?.lon;

              return {
                id: `${item.type}-${item.id}`,
                name: item.tags.name,
                lat: schoolLat,
                lng: schoolLng,
                district:
                  item.tags["addr:district"] ||
                  item.tags["addr:city"] ||
                  "",
                address:
                  item.tags["addr:street"] ||
                  item.tags["addr:village"] ||
                  "",
                distance: getDistance(
                  lat,
                  lng,
                  schoolLat,
                  schoolLng
                ),
              };
            })
            .filter((school) => school.lat && school.lng)
            .sort((a, b) => a.distance - b.distance);

          setSchools(results);
          setSearched(true);
        } catch (err) {
          console.error(err);
          setError(t.error);
          setSchools([]);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError(t.noLocation);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
      }
    );
  }

  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    return (
      R *
      2 *
      Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    );
  }

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "16px",
        fontFamily: "Arial, sans-serif",
        color: "#172033",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg,#075e35,#159447)",
            color: "#fff",
            padding: "24px 20px",
            borderRadius: "18px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "26px",
                  margin: "0 0 8px",
                }}
              >
                🎓 {t.title}
              </h1>

              <p style={{ margin: 0, opacity: 0.9 }}>
                {t.subtitle}
              </p>
            </div>

            <button
              onClick={() =>
                setLanguage(language === "en" ? "kn" : "en")
              }
              style={{
                border: "1px solid white",
                color: "white",
                background: "transparent",
                borderRadius: "20px",
                padding: "9px 14px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {language === "en" ? "ಕನ್ನಡ" : "English"}
            </button>
          </div>
        </div>

        {/* Search controls */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0 3px 15px #0000000c",
          }}
        >
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            {t.district}
          </label>

          <select
            value={district}
            onChange={(e) =>
              handleDistrictChange(e.target.value)
            }
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: "10px",
              border: "1px solid #d0d7de",
              background: "white",
              fontSize: "16px",
              marginBottom: "14px",
            }}
          >
            {DISTRICTS.map((item) => (
              <option key={item} value={item}>
                {item === "All Districts" ? t.all : item}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.search}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px",
              borderRadius: "10px",
              border: "1px solid #d0d7de",
              fontSize: "16px",
              marginBottom: "14px",
            }}
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <button
              onClick={() => searchSchools(district)}
              disabled={loading}
              style={{
                flex: "1",
                minWidth: "140px",
                padding: "13px",
                background: "#087b40",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {t.button}
            </button>

            <button
              onClick={findNearbySchools}
              disabled={loading}
              style={{
                flex: "1",
                minWidth: "140px",
                padding: "13px",
                background: "#e9f4ff",
                color: "#075ca8",
                border: "1px solid #b5d9ff",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              📍 {t.nearby}
            </button>
          </div>
        </div>

        {/* Status */}
        {loading && (
          <div
            style={{
              background: "white",
              padding: "22px",
              borderRadius: "12px",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            ⏳ {nearbyMode ? t.locating : t.loading}
          </div>
        )}

        {error && (
          <div
            style={{
              background: "#fff0f0",
              color: "#a30000",
              padding: "16px",
              borderRadius: "12px",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}

        {/* Results */}
        {!loading && searched && !error && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                marginBottom: "15px",
              }}
            >
              <h2 style={{ fontSize: "19px", margin: 0 }}>
                🏫 {nearbyMode ? t.nearbyTitle : t.results}
              </h2>

              <span
                style={{
                  background: "#dcfce7",
                  color: "#166534",
                  borderRadius: "20px",
                  padding: "7px 12px",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {filteredSchools.length}
              </span>
            </div>

            {filteredSchools.length === 0 && (
              <div
                style={{
                  background: "white",
                  padding: "25px",
                  borderRadius: "14px",
                  textAlign: "center",
                }}
              >
                {t.empty}
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(260px,1fr))",
                gap: "14px",
              }}
            >
              {filteredSchools.map((school) => (
                <div
                  key={school.id}
                  style={{
                    background: "white",
                    borderRadius: "15px",
                    padding: "18px",
                    boxShadow: "0 3px 12px #0000000b",
                    border: "1px solid #e6eaf0",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 12px",
                      fontSize: "18px",
                      lineHeight: 1.4,
                      color: "#125b36",
                    }}
                  >
                    🏫 {school.name}
                  </h3>

                  <p
                    style={{
                      margin: "6px 0",
                      fontSize: "14px",
                      color: "#526071",
                    }}
                  >
                    📍 {school.address || school.district}
                  </p>

                  {school.distance != null && (
                    <p
                      style={{
                        margin: "6px 0 12px",
                        color: "#526071",
                        fontSize: "14px",
                      }}
                    >
                      {t.distance}:{" "}
                      {school.distance.toFixed(1)} km
                    </p>
                  )}

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginTop: "16px",
                    }}
                  >
                    <button
                      onClick={() => openSchoolMap(school)}
                      style={{
                        flex: "1",
                        padding: "11px 8px",
                        border: "none",
                        borderRadius: "9px",
                        background: "#087b40",
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      🗺️ {t.location}
                    </button>

                    <button
                      onClick={() => openDirections(school)}
                      style={{
                        flex: "1",
                        padding: "11px 8px",
                        border: "1px solid #b5d9ff",
                        borderRadius: "9px",
                        background: "#e9f4ff",
                        color: "#075ca8",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      ➜ {t.map}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p
              style={{
                textAlign: "center",
                fontSize: "12px",
                color: "#77808e",
                margin: "24px 0",
              }}
            >
              {t.source}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
