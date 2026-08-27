// Abstract brand-colored graphic standing in for real product photography
// until it's available. Represents reference electrodes + a monitored signal.
export default function ElectrodeGraphic({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 480 480" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="240" cy="240" r="230" fill="#b7c6dc" fillOpacity="0.18" />
      <circle cx="240" cy="240" r="170" fill="#b7c6dc" fillOpacity="0.22" />

      {/* signal arcs */}
      <path d="M120 170a170 170 0 0 1 240 0" stroke="#f0b429" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 14" />

      {/* three electrode rods */}
      <g>
        <rect x="150" y="150" width="34" height="200" rx="17" fill="#14284c" />
        <rect x="158" y="130" width="18" height="30" rx="6" fill="#14284c" />
        <rect x="223" y="110" width="34" height="240" rx="17" fill="#64749a" />
        <rect x="231" y="90" width="18" height="30" rx="6" fill="#64749a" />
        <rect x="296" y="170" width="34" height="180" rx="17" fill="#14284c" />
        <rect x="304" y="150" width="18" height="30" rx="6" fill="#14284c" />
      </g>

      {/* base line */}
      <rect x="110" y="350" width="260" height="6" rx="3" fill="#14284c" />
    </svg>
  );
}
