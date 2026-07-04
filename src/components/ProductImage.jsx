import { useState } from "react";
import { TbShoe } from "react-icons/tb";

// Product photography. Renders a real photo (sourced from Pexels' free-license
// library) for each pair; if the image ever fails to load, falls back to a
// tinted icon treatment so the layout never breaks.
export default function ProductImage({ image, accent = "#e2572b", rotate = 0, size = 54, objectPosition = "center", zoom = 1 }) {
  const [failed, setFailed] = useState(false);

  if (!image || failed) {
    return (
      <div
        style={{
          position: "relative", width: "100%", height: "100%", display: "flex",
          alignItems: "center", justifyContent: "center",
          background: `radial-gradient(circle at 50% 45%, ${accent}22 0%, transparent 60%)`,
        }}
      >
        <TbShoe size={size} color={accent} style={{ transform: `rotate(${rotate}deg)` }} />
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: "#15151a" }}>
      <img
        src={image}
        alt=""
        onError={() => setFailed(true)}
        loading="lazy"
        style={{
          width: "100%", height: "100%", objectFit: "cover", objectPosition,
          display: "block", transform: zoom !== 1 ? `scale(${zoom})` : undefined,
          transition: "transform 0.25s ease, object-position 0.25s ease",
        }}
      />
    </div>
  );
}
