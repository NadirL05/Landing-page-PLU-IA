/**
 * Mockup isométrique parcelle + volume constructible extrudé — visuel hero.
 * Palette reprise telle quelle du reste de la landing (#3c3cf6 brand,
 * #0a0a1a fond) : aucune nouvelle couleur introduite.
 */
export function ParcelVolumeMockup() {
  return (
    <div className="relative w-full max-w-xl select-none" style={{ height: 300 }} aria-hidden="true">
      <svg viewBox="0 0 640 340" className="h-full w-full">
        <g opacity="0.18" stroke="#a0a0d0" strokeWidth="0.8" fill="none">
          <polygon points="80,200 160,160 240,200 160,240" />
          <polygon points="160,160 240,120 320,160 240,200" />
          <polygon points="240,120 320,80 400,120 320,160" />
          <polygon points="320,80 400,40 480,80 400,120" />
          <polygon points="80,240 160,200 240,240 160,280" />
          <polygon points="160,200 240,160 320,200 240,240" />
          <polygon points="240,160 320,120 400,160 320,200" />
          <polygon points="320,120 400,80 480,120 400,160" />
          <polygon points="400,80 480,40 560,80 480,120" />
          <polygon points="80,280 160,240 240,280 160,320" />
          <polygon points="160,240 240,200 320,240 240,280" />
          <polygon points="320,200 400,160 480,200 400,240" />
          <polygon points="400,160 480,120 560,160 480,200" />
          <polygon points="160,280 240,240 320,280 240,320" />
          <polygon points="400,200 480,160 560,200 480,240" />
        </g>
        <g opacity="0.12" fill="#3c3cf6">
          <polygon points="160,200 240,160 320,200 240,240" />
          <polygon points="320,120 400,80 480,120 400,160" />
        </g>
        <polygon
          points="240,160 320,120 400,160 320,200"
          fill="#3c3cf6"
          opacity="0.85"
          stroke="#6060ff"
          strokeWidth="1.5"
        />
        <g>
          <polygon points="240,160 320,120 320,60 240,100" fill="#3c3cf6" opacity="0.55" />
          <polygon points="320,120 400,160 400,100 320,60" fill="#1a1aaa" opacity="0.7" />
          <polygon points="240,100 320,60 400,100 320,140" fill="#5050ff" opacity="0.9" />
          <polygon points="240,100 320,60 400,100 320,140" fill="none" stroke="#8080ff" strokeWidth="1" opacity="0.8" />
        </g>
        <line x1="410" y1="100" x2="470" y2="80" stroke="#3c3cf6" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
        <rect x="472" y="66" width="100" height="28" rx="4" fill="#0a0a1a" opacity="0.9" />
        <text x="522" y="84" textAnchor="middle" fill="#a3a3ff" fontSize="11" fontFamily="Geist Mono, monospace" fontWeight="500">
          H max : 25 m
        </text>
        <line x1="320" y1="200" x2="320" y2="260" stroke="#3c3cf6" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
        <rect x="255" y="262" width="130" height="28" rx="4" fill="#0a0a1a" opacity="0.9" />
        <text x="320" y="280" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="Geist Mono, monospace" fontWeight="500">
          Zone UAa · Emprise 0,60
        </text>
        <rect x="255" y="130" width="130" height="24" rx="12" fill="#3c3cf6" opacity="0.95" />
        <text x="320" y="146" textAnchor="middle" fill="white" fontSize="11" fontFamily="Geist Mono, monospace" fontWeight="500">
          Parcelle AB0142
        </text>
      </svg>
    </div>
  );
}
