const GOLD = "#B68A35";

/**
 * Google Maps embed from `growth_map_section.map.center` (lat, lng, zoom).
 * Optional badge labels overlay the bottom corners.
 */
const GrowthMap = ({ map }) => {
  const activeLabel = map?.active_zones_label ?? "Active Zones";
  const corridorsLabel = map?.corridors_label ?? "3 Corridors";

  const lat = map?.center?.lat ?? 25.2048;
  const lng = map?.center?.lng ?? 55.2708;
  const zoom = map?.center?.zoom ?? 10;

  const src =
    map?.embed_url ??
    `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=${zoom}&output=embed`;

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{
        border: "1px solid rgba(182,138,53,0.18)",
        minHeight: 260,
      }}
    >
      <iframe
        title={map?.iframe_title ?? "Growth corridors map"}
        src={src}
        className="block h-[260px] w-full border-0 lg:h-[320px]"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-3 pb-3 lg:px-4 lg:pb-4">
        <span
          className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold sm:text-xs"
          style={{
            background: "rgba(255,255,255,0.92)",
            color: "#4b5563",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: GOLD }} />
          {activeLabel}
        </span>
        <span
          className="rounded-lg px-2.5 py-1.5 text-[10px] font-semibold sm:text-xs"
          style={{
            background: "rgba(255,255,255,0.92)",
            color: "#4b5563",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          {corridorsLabel}
        </span>
      </div>
    </div>
  );
};

export default GrowthMap;
