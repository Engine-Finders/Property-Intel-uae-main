const GrowthMap = ({ placeholderText }) => {
  return (
    <div
      style={{
        background: "rgba(182,138,53,0.04)",
        border: "1px solid rgba(182,138,53,0.15)",
        borderRadius: 12,
        minHeight: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 12,
        padding: 32,
      }}
    >
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#B68A35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
      <span style={{ color: "#B68A35", fontSize: 16, fontWeight: 600, textAlign: "center" }}>
        {placeholderText || "Interactive Growth Map Coming Soon"}
      </span>
      <span style={{ color: "#8A8A8A", fontSize: 13, textAlign: "center", maxWidth: 400 }}>
        Hover over growth corridors to explore infrastructure-driven valuation zones across Dubai.
      </span>
    </div>
  );
};

export default GrowthMap;
