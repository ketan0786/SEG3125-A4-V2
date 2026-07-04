import { TbShoe } from "react-icons/tb";

// Stand-in for product photography: a spotlight panel with a tinted icon,
// consistent with the approved moody/spotlight visual direction.
export default function ProductImage({ accent = "#e2572b", size = 54, rotate = -8 }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          `radial-gradient(circle at 50% 45%, ${accent}22 0%, transparent 60%)`,
      }}
    >
      <TbShoe size={size} color={accent} style={{ transform: `rotate(${rotate}deg)` }} />
    </div>
  );
}
