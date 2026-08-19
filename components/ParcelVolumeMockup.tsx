/**
 * Mockup isométrique parcelle + volume constructible extrudé, recoloré
 * pour la direction Luma (fond clair chaud, accents brand + corail).
 * Encadré dans un chrome d'app + une carte de détail flottante pour lire
 * comme une vraie capture produit (profondeur), pas une illustration plate.
 * Poussé volontairement en centre de page (grand format + ombre marquée) :
 * ce n'est plus une illustration d'appoint sous le titre, c'est la pièce
 * maîtresse visuelle du hero.
 */
export function ParcelVolumeMockup({ className = "max-w-xl" }: { className?: string }) {
  return (
    <div className={`relative w-full select-none ${className}`} aria-hidden="true">
      <div className="glass-card overflow-hidden rounded-[28px]" style={{ boxShadow: "0 40px 90px -24px color-mix(in oklch, var(--ink) 38%, transparent), var(--shadow-card)" }}>
        <div className="flex items-center gap-2 border-b px-5 py-3.5" style={{ borderColor: "var(--line)" }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--coral)" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--brand)", opacity: 0.6 }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--ink-soft)", opacity: 0.3 }} />
          <span className="font-mono ml-3 text-[11px]" style={{ color: "var(--ink-soft)" }}>
            app-plu-ia.agentimpact.fr/dashboard/AB0142
          </span>
        </div>
        <div className="p-6" style={{ height: 360 }}>
      <svg viewBox="0 0 640 340" className="h-full w-full">
        <g opacity="0.25" stroke="var(--ink-soft)" strokeWidth="0.8" fill="none">
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
        <g opacity="0.18" fill="var(--coral)">
          <polygon points="160,200 240,160 320,200 240,240" />
          <polygon points="320,120 400,80 480,120 400,160" />
        </g>
        <polygon points="240,160 320,120 400,160 320,200" fill="var(--coral)" opacity="0.55" stroke="var(--coral)" strokeWidth="1.5" />
        <g>
          <polygon points="240,160 320,120 320,60 240,100" fill="var(--brand)" opacity="0.65" />
          <polygon points="320,120 400,160 400,100 320,60" fill="var(--brand)" opacity="0.85" />
          <polygon points="240,100 320,60 400,100 320,140" fill="var(--brand)" />
          <polygon points="240,100 320,60 400,100 320,140" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
        </g>
        <line x1="410" y1="100" x2="470" y2="80" stroke="var(--ink-soft)" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
        <rect x="472" y="66" width="100" height="28" rx="14" fill="var(--paper-raised)" stroke="var(--line)" />
        <text x="522" y="84" textAnchor="middle" fill="var(--ink)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="500">
          H max : 25 m
        </text>
        <line x1="320" y1="200" x2="320" y2="260" stroke="var(--ink-soft)" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
        <rect x="255" y="262" width="130" height="28" rx="14" fill="var(--paper-raised)" stroke="var(--line)" />
        <text x="320" y="280" textAnchor="middle" fill="var(--ink)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="500">
          Zone UAa · Emprise 0,60
        </text>
        <rect x="255" y="130" width="130" height="26" rx="13" fill="var(--brand)" />
        <text x="320" y="147" textAnchor="middle" fill="white" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
          Parcelle AB0142
        </text>
      </svg>
        </div>
      </div>

      {/* Carte de détail flottante en surplomb : donne la profondeur d'une
          vraie capture produit plutôt qu'un unique bloc plat. */}
      <div
        className="glass-card absolute -right-6 -bottom-8 hidden w-60 rounded-2xl p-4 sm:block"
        style={{ boxShadow: "0 22px 48px -12px color-mix(in oklch, var(--ink) 34%, transparent)" }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--ink-soft)" }}>Bilan promoteur</span>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--coral)" }} />
        </div>
        <div className="font-display mt-1.5 text-lg font-semibold" style={{ color: "var(--ink)" }}>SDP ≈ 1 240 m²</div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--brand-soft)" }}>
          <div className="h-full rounded-full" style={{ width: "68%", background: "linear-gradient(90deg, var(--brand), var(--coral))" }} />
        </div>
        <div className="mt-1.5 text-[11px]" style={{ color: "var(--ink-soft)" }}>Emprise au sol utilisée · 68 %</div>
      </div>
    </div>
  );
}
