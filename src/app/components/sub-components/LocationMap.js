import { useTheme } from "../context/ThemeContext";

const LocationMap = () => {
  const { t } = useTheme();

  const center = { lat: 24.8895, lng: 55.2686 };

  const buildMapUrl = () => {
    const base = "https://www.google.com/maps/embed/v1/place";
    const key = "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8";
    const q = `${center.lat},${center.lng}`;
    return `${base}?key=${key}&q=${q}&zoom=13&maptype=roadmap`;
  };

  return (
    <div
      style={{
        border: `1px solid ${t.cardBorder}`,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <iframe
        src={buildMapUrl()}
        width="100%"
        height="400"
        style={{ border: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Serro at The Heights location map showing connectivity to schools, parks, and construction zones in Dubai South"
      />
    </div>
  );
};

export default LocationMap;
