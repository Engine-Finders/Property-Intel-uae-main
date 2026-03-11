/**
 * Reusable star rating — golden stars by default.
 * Pass rating (e.g. 5 = all filled, 1 = one filled). Supports decimals (e.g. 4.5 = 4 full + 1 half).
 * Control size with the size prop (number in px or CSS string).
 */
const StarRating = ({
  rating = 0,
  max = 5,
  size = 16,
  filledColor = "#B68A35",
  emptyColor = "#d1d5db",
  className = "",
}) => {
  const sizeVal = typeof size === "number" ? `${size}px` : size;
  const clamped = Math.min(max, Math.max(0, Number(rating)));
  const fullStars = Math.floor(clamped);
  const partial = clamped % 1; // e.g. 0.5 for 4.5, 0.7 for 3.7
  const hasPartial = partial > 0;
  const emptyStars = max - fullStars - (hasPartial ? 1 : 0);

  return (
    <span
      className={`inline-flex items-center gap-px ${className}`}
      style={{ fontSize: sizeVal, lineHeight: 1 }}
      role="img"
      aria-label={`${rating} out of ${max} stars`}
    >
      {Array.from({ length: fullStars }, (_, i) => (
        <span key={`f-${i}`} style={{ color: filledColor }}>★</span>
      ))}
      {hasPartial && (
        <span
          style={{
            position: "relative",
            display: "inline-block",
            width: sizeVal,
            height: sizeVal,
            fontSize: sizeVal,
            lineHeight: 1,
            verticalAlign: "middle",
          }}
        >
          <span style={{ color: emptyColor }}>★</span>
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: `${partial * 100}%`,
              overflow: "hidden",
              color: filledColor,
              fontSize: "inherit",
              lineHeight: "inherit",
            }}
          >
            ★
          </span>
        </span>
      )}
      {Array.from({ length: emptyStars }, (_, i) => (
        <span key={`e-${i}`} style={{ color: emptyColor }}>★</span>
      ))}
    </span>
  );
};

export default StarRating;
