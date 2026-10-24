/** "B-BBEE Level 1 Certified" seal: a scalloped dark disc with a red ribbon. Drawn as vector so it stays sharp at any size. */
const CX = 155;
const CY = 128;
const R = 104;
const SCALLOPS = 30;

// Scalloped edge: a series of small outward arcs around the circle.
const edge = Array.from({ length: SCALLOPS + 1 }, (_, k) => {
  const a = (2 * Math.PI * k) / SCALLOPS - Math.PI / 2;
  return [CX + R * Math.cos(a), CY + R * Math.sin(a)] as const;
});
const chord = 2 * R * Math.sin(Math.PI / SCALLOPS);
const scallopPath =
  `M${edge[0][0].toFixed(2)} ${edge[0][1].toFixed(2)}` +
  edge
    .slice(1)
    .map(([x, y]) => `A${(chord * 0.62).toFixed(2)} ${(chord * 0.62).toFixed(2)} 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)}`)
    .join("") +
  "Z";

export function BbbeeBadge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 310 260"
      role="img"
      aria-label="B-BBEE Level 1 Certified"
      className={className}
      fontFamily="Arial, Helvetica, sans-serif"
      fontWeight={700}
    >
      <path d={scallopPath} fill="#3d3d3d" />
      <circle cx={CX} cy={CY} r="84" fill="none" stroke="#fff" strokeWidth="1.5" />
      <text x={CX} y="68" textAnchor="middle" fontSize="31" letterSpacing="2" fill="#fff">
        B-BBEE
      </text>
      {/* Ribbon: folded tails behind, body in front */}
      <polygon points="6,106 40,106 40,160 6,160 20,133" fill="#a8141a" />
      <polygon points="304,106 270,106 270,160 304,160 290,133" fill="#a8141a" />
      <rect x="22" y="98" width="266" height="62" fill="#e1262d" />
      <text x={CX} y="147" textAnchor="middle" fontSize="48" letterSpacing="1" fill="#fff">
        LEVEL 1
      </text>
      <text x={CX} y="200" textAnchor="middle" fontSize="17" letterSpacing="3" fill="#fff">
        CERTIFIED
      </text>
    </svg>
  );
}
