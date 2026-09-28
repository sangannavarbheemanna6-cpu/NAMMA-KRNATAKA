
import React, { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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
    noData: "No verified schools found. Try another district.",
    noFile: "School data file could not be loaded.",
    noLocation: "Location unavailable. Enable location permission.",
    view: "View Location",
    directions: "Get Directions",
    source: "School data from local dataset",
    distance: "Distance",
    mapTitle: "OpenStreetMap - Karnataka Schools",
    mapHint: "Select a school marker to view details.",
    noCoords: "School coordinates are not available.",
    reset: "Show All Schools",
    osm: "OpenStreetMap",
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
    noData: "ಪರಿಶೀಲಿಸಿದ ಶಾಲೆಗಳು ಸಿಗಲಿಲ್ಲ. ಬೇರೆ ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ.",
    noFile: "ಶಾಲೆಗಳ data file ಲೋಡ್ ಆಗಲಿಲ್ಲ.",
    noLocation: "Location permission ನೀಡಿ.",
    view: "ಸ್ಥಳ ನೋಡಿ",
    directions: "ದಾರಿ ತೋರಿಸಿ",
    source: "ಸ್ಥಳೀಯ school dataset",
    distance: "ದೂರ",
    mapTitle: "OpenStreetMap - ಕರ್ನಾಟಕದ ಶಾಲೆಗಳು",
    mapHint: "ಶಾಲೆಯ ಮಾಹಿತಿಗಾಗಿ marker ಆಯ್ಕೆಮಾಡಿ.",
    noCoords: "ಶಾಲೆಯ coordinates ಲಭ್ಯವಿಲ್ಲ.",
    reset: "ಎಲ್ಲಾ ಶಾಲೆಗಳನ್ನು ತೋರಿಸಿ",
    osm: "OpenStreetMap",
  },
};

// Distance between two coordinates in kilometres
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

// Simple custom marker icon
const schoolIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width:30px;
      height:30px;
      background:#087b40;
      border:3px solid white;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      box-shadow:0 2px 8px #0005;
      display:flex;
      align-items:center;
      justify-content:center;
    ">
      <div style="
        width:10px;
        height:10px;
        background:white;
        border-radius:50%;
      "></div>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -35],
});

// User location marker
const userIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width:20px;
      height:20px;
      background:#1677ff;
      border:4px solid white;
      border-radius:50%;
      box-shadow:0 2px 10px #0006;
    "></div>
  `,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

// Automatically move map when location or results change
function MapUpdater({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1,
    });
  }, [map, center[0], center[1], zoom]);

  return null;
}

function EducationOSMMap({ schools, userLocation, t }) {
  const defaultCenter = [15.3173, 75.7139];

  const center = userLocation
    ? [userLocation.lat, userLocation.lng]
    : defaultCenter;

  const zoom = userLocation ? 11 : 7;

  return (
    <section
      style={{
        background: "white",
        padding: 16,
        borderRadius: 16,
        marginBottom: 20,
        boxShadow: "0 3px 15px #0000000c",
      }}
    >
      <h2 style={{ fontSize: 20, margin: "0 0 8px" }}>
        🗺️ {t.mapTitle}
      </h2>

      <p style={{
        fontSize: 13,
        color: "#64748b",
        margin: "0 0 14px",
      }}>
        {t.mapHint}
      </p>

      <div
        style={{
          width: "100%",
          height: 430,
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid #dce3eb",
          position: "relative",
          zIndex: 0,
        }}
      >
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={true}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <MapUpdater center={center} zoom={zoom} />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap contributors</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />

          {userLocation && (
            <Marker
              position={[
                userLocation.lat,
                userLocation.lng,
              ]}
              icon={userIcon}
            >
              <Popup>
                <strong>
                  {t.location}
                </strong>
              </Popup>
            </Marker>
          )}

          {schools.map((school) => (
            <Marker
              key={school.id}
              position={[
                school.lat,
                school.lng,
              ]}
              icon={schoolIcon}
            >
              <Popup>
                <div style={{
                  minWidth: 180,
                  lineHeight: 1.6,
                }}>
                  <strong>{school.name}</strong>

                  {school.district && (
                    <div>{school.district}</div>
                  )}

                  {school.address && (
                    <div>{school.address}</div>
                  )}

                  {Number.isFinite(school.distance) && (
                    <div>
                      {t.distance}:{" "}
                      {school.distance.toFixed(1)} km
                    </div>
                  )}

                  <a
                    href={`https://www.openstreetmap.org/?mlat=${school.lat}&mlon=${school.lng}#map=17/${school.lat}/${school.lng}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.view}
                  </a>

                  <br />

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${school.lat},${school.lng}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.directions}
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 12,
        fontSize: 13,
        color: "#526071",
      }}>
        <span>
          🟢 {t.count}: {schools.length}
        </span>

        <a
          href="https://www.openstreetmap.org/"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#087b40",
            fontWeight: "bold",
          }}
        >
          {t.osm} ↗
        </a>
      </div>
    </section>
  );
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

  // Load the local school dataset.
  // No external school-data API is used.
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
          throw new Error("Local school data file not found");
        }

        const data = await response.json();

        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.schools)
            ? data.schools
            : [];

        const validSchools = list
          .filter((s) => {
            const lat = Number(s.lat);
            const lng = Number(s.lng);

            return (
              s.name &&
              Number.isFinite(lat) &&
              Number.isFinite(lng) &&
              lat >= -90 &&
              lat <= 90 &&
              lng >= -180 &&
              lng <= 180
            );
          })
          .map((s, index) => ({
            ...s,
            id: s.id || `${s.name}-${index}`,
            lat: Number(s.lat),
            lng: Number(s.lng),
          }));

        if (active) {
          setSchools(validSchools);
        }
      } catch (err) {
        console.error("Education data error:", err);

        if (active) {
          setError(t.noFile);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, []);

  const filteredSchools = useMemo(() => {
    let result = [...schools];

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
  }, [
    schools,
    district,
    search,
    nearby,
    userLocation,
  ]);

  function useMyLocation() {
    setError("");

    if (!navigator.geolocation) {
      setError(t.noLocation);
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setUserLocation(location);
        setNearby(true);
        setDistrict("All Districts");
        setLoading(false);
      },
      (err) => {
        console.error("Location error:", err);
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

  function resetFilters() {
    setDistrict("All Districts");
    setSearch("");
    setNearby(false);
    setUserLocation(null);
    setError("");
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
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: 16,
        fontFamily: "Arial, sans-serif",
        color: "#172033",
      }}
    >
      <div style={{
        maxWidth: 1100,
        margin: "auto",
      }}>
        <header
          style={{
            background: "linear-gradient(135deg,#075e35,#159447)",
            color: "white",
            padding: 24,
            borderRadius: 18,
            marginBottom: 20,
          }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}>
            <div>
              <h1 style={{
                margin: "0 0 8px",
                fontSize: 26,
              }}>
                🎓 {t.title}
              </h1>

              <p style={{ margin: 0 }}>
                {t.subtitle}
              </p>
            </div>

            <button
              onClick={() =>
                setLanguage((prev) =>
                  prev === "en" ? "kn" : "en"
                )
              }
              style={{
                padding: "10px 14px",
                borderRadius: 20,
                border: "1px solid white",
                color: "white",
                background: "transparent",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {language === "en" ? "ಕನ್ನಡ" : "English"}
            </button>
          </div>
        </header>

        <section
          style={{
            background: "white",
            padding: 20,
            borderRadius: 16,
            marginBottom: 20,
            boxShadow: "0 3px 15px #0000000c",
          }}
        >
          <label style={{
            display: "block",
            fontWeight: "bold",
            marginBottom: 8,
          }}>
            {t.district}
          </label>

          <select
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              setNearby(false);
              setUserLocation(null);
              setSearch("");
            }}
            style={{
              width: "100%",
              padding: 13,
              borderRadius: 10,
              border: "1px solid #d0d7de",
              fontSize: 16,
              marginBottom: 14,
              background: "white",
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
              marginBottom: 14,
            }}
          />

          <div style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}>
            <button
              onClick={resetFilters}
              style={{
                flex: 1,
                padding: 13,
                background: "#087b40",
                color: "white",
                border: 0,
                borderRadius: 10,
                fontWeight: "bold",
                cursor: "pointer",
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
                fontWeight: "bold",
                cursor: "pointer",
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
            textAlign: "center",
            marginBottom: 20,
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
            marginBottom: 16,
          }}>
            {error}
          </div>
        )}

        {/* Embedded OpenStreetMap */}
        <EducationOSMMap
          schools={filteredSchools}
          userLocation={userLocation}
          t={t}
        />

        {!loading && !error && (
          <>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 15,
            }}>
              <h2 style={{ fontSize: 19 }}>
                🏫 {t.count}
              </h2>

              <span style={{
                background: "#dcfce7",
                color: "#166534",
                borderRadius: 20,
                padding: "7px 12px",
                fontWeight: "bold",
              }}>
                {filteredSchools.length}
              </span>
            </div>

            {filteredSchools.length === 0 && (
              <div style={{
                background: "white",
                padding: 24,
                borderRadius: 14,
                textAlign: "center",
              }}>
                {t.noData}
              </div>
            )}

            <div style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(min(100%,260px),1fr))",
              gap: 14,
            }}>
              {filteredSchools.map((school) => (
                <article
                  key={school.id}
                  style={{
                    background: "white",
                    padding: 18,
                    borderRadius: 15,
                    border: "1px solid #e6eaf0",
                    boxShadow: "0 3px 12px #0000000b",
                  }}
                >
                  <h3 style={{
                    margin: "0 0 12px",
                    color: "#125b36",
                    fontSize: 18,
                    lineHeight: 1.4,
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
                    flexWrap: "wrap",
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
                        fontWeight: "bold",
                        cursor: "pointer",
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
                        fontWeight: "bold",
                        cursor: "pointer",
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
              margin: "24px 0",
            }}>
              {t.source}
            </p>
          </>
        )}
      </div>
    </main>
  );
}
