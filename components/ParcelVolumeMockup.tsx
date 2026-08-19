/**
 * Mockup isométrique parcelle + volume constructible extrudé, habillé
 * comme un véritable extrait de plan technique plutôt qu'une capture
 * produit "app SaaS" : quadrillage de coordonnées en fond, repères
 * d'angle, flèche du nord, barre d'échelle et annotations à ligne de
 * rappel — le vocabulaire d'un plan de géomètre, pas d'un dashboard.
 * Encadré dans un chrome de fiche technique (cartouche + coordonnée),
 * pas une fenêtre d'app générique à trois pastilles.
 */
export function ParcelVolumeMockup({ className = "max-w-xl" }: { className?: string }) {
  return (
    <div className={`reg-marks relative w-full select-none ${className}`} aria-hidden="true">
      <div className="spec-card overflow-hidden" style={{ boxShadow: "0 30px 70px -20px color-mix(in oklch, var(--ink) 30%, transparent), var(--shadow-card)" }}>
        <div className="flex items-center justify-between gap-2 border-b px-5 py-3.5" style={{ borderColor: "var(--line-strong)" }}>
          <span className="font-mono text-[11px]" style={{ color: "var(--ink-soft)" }}>
            PARCELLE AB0142 — app-plu-ia.agentimpact.fr
          </span>
          <span className="font-mono text-[10px] font-bold tracking-[0.1em]" style={{ color: "var(--brand)" }}>
            ÉCH. 1:500
          </span>
        </div>
        <div className="grid-paper p-6" style={{ height: 360 }}>
      <svg viewBox="0 0 640 340" className="h-full w-full">
        <g opacity="0.3" stroke="var(--ink-soft)" strokeWidth="0.8" fill="none">
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
        <g opacity="0.22" fill="var(--terracotta)">
          <polygon points="160,200 240,160 320,200 240,240" />
          <polygon points="320,120 400,80 480,120 400,160" />
        </g>
        <polygon points="240,160 320,120 400,160 320,200" fill="var(--terracotta)" opacity="0.5" stroke="var(--terracotta)" strokeWidth="1.5" />
        <g>
          <polygon points="240,160 320,120 320,60 240,100" fill="var(--brand)" opacity="0.65" />
          <polygon points="320,120 400,160 400,100 320,60" fill="var(--brand)" opacity="0.85" />
          <polygon points="240,100 320,60 400,100 320,140" fill="var(--brand)" />
          <polygon points="240,100 320,60 400,100 320,140" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
        </g>
        <line x1="410" y1="100" x2="470" y2="80" stroke="var(--ink-soft)" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
        <rect x="472" y="66" width="100" height="28" fill="var(--paper-raised)" stroke="var(--line-strong)" />
        <text x="522" y="84" textAnchor="middle" fill="var(--ink)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="500">
          H max : 25 m
        </text>
        <line x1="320" y1="200" x2="320" y2="260" stroke="var(--ink-soft)" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
        <rect x="255" y="262" width="130" height="28" fill="var(--paper-raised)" stroke="var(--line-strong)" />
        <text x="320" y="280" textAnchor="middle" fill="var(--ink)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="500">
          Zone UAa · Emprise 0,60
        </text>
        <rect x="255" y="130" width="130" height="26" fill="var(--brand)" />
        <text x="320" y="147" textAnchor="middle" fill="white" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
          Parcelle AB0142
        </text>

        {/* Flèche du nord — vocabulaire de plan de géomètre */}
        <g transform="translate(50,40)">
          <line x1="0" y1="26" x2="0" y2="0" stroke="var(--ink)" strokeWidth="1.5" />
          <polygon points="0,0 -5,10 5,10" fill="var(--ink)" />
          <text x="0" y="40" textAnchor="middle" fill="var(--ink-soft)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="700">N</text>
        </g>

        {/* Barre d'échelle graphique */}
        <g transform="translate(490,300)">
          <line x1="0" y1="0" x2="60" y2="0" stroke="var(--ink)" strokeWidth="1.5" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="var(--ink)" strokeWidth="1.5" />
          <line x1="60" y1="-4" x2="60" y2="4" stroke="var(--ink)" strokeWidth="1.5" />
          <text x="30" y="16" textAnchor="middle" fill="var(--ink-soft)" fontSize="9" fontFamily="var(--font-mono)">10 m</text>
        </g>
      </svg>
        </div>
      </div>

      {/* Carte d'annotation flottante, ligne de rappel implicite via
          le chevauchement du cadre : lecture de mesure, pas widget
          décoratif. */}
      <div
        className="spec-card absolute -right-6 -bottom-8 hidden w-60 p-4 sm:block"
        style={{ boxShadow: "0 20px 44px -12px color-mix(in oklch, var(--ink) 30%, transparent)" }}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--ink-soft)" }}>Bilan promoteur</span>
          <span className="coord-tag" style={{ padding: "1px 6px", fontSize: 9 }}>68%</span>
        </div>
        <div className="font-display mt-1.5 text-lg font-semibold" style={{ color: "var(--ink)" }}>SDP ≈ 1 240 m²</div>
        <div className="mt-2 h-1.5 w-full overflow-hidden" style={{ background: "var(--brand-soft)" }}>
          <div className="h-full" style={{ width: "68%", background: "var(--terracotta)" }} />
        </div>
        <div className="mt-1.5 text-[11px]" style={{ color: "var(--ink-soft)" }}>Emprise au sol utilisée · 68 %</div>
      </div>
    </div>
  );
}
