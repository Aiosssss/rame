import type { CSSProperties } from "react";

const desktop = [
  { x: 103, y: 14, width: 451, height: 102, rx: 51 },
  { x: 95, y: 113, width: 424, height: 103, rx: 51 },
  { x: 139, y: 169, width: 375, height: 171, rx: 80 },
];
const mobile = [
  { x: 20, y: 20, width: 335, height: 80, rx: 40 },
  { x: 12, y: 99, width: 338, height: 88, rx: 44 },
  { x: 45, y: 153, width: 280, height: 111, rx: 45 },
];

/** Separate outer SVG layers let the browser composite the original sweeps. */
export function HeroCapsules({ compact = false }: { compact?: boolean }) {
  const [width, height] = compact ? [400, 270] : [899, 365];
  return (compact ? mobile : desktop).map((rectangle, index) => (
    <svg
      key={index}
      className={compact ? "hero-shape-mobile" : "hero-shape"}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      style={
        {
          "--sweep-delay": `${index === 1 ? 0.16 : index === 2 ? 0.3 : 0}s`,
          transformOrigin: `${(rectangle.x / width) * 100}% ${((rectangle.y + rectangle.height / 2) / height) * 100}%`,
        } as CSSProperties
      }
    >
      <rect {...rectangle} />
    </svg>
  ));
}
