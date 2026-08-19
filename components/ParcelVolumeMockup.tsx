import { ParcelVolumeCanvas } from "@/components/ParcelVolumeCanvas";

/**
 * Étude de masse 3D en fil de fer, habillée comme un véritable extrait
 * de plan technique plutôt qu'une capture produit "app SaaS" : grille
 * de coordonnées coplanaire au volume, repères d'angle, flèche du
 * nord, barre d'échelle et annotations à ligne de rappel — le
 * vocabulaire d'un plan de géomètre porté en 3D plutôt qu'un rendu
 * architecte. Encadré dans un chrome de fiche technique (cartouche +
 * coordonnée), pas une fenêtre d'app générique à trois pastilles.
 * Le canvas three.js ne monte que dans le viewport (voir
 * ParcelVolumeCanvas) : à défaut de WebGL, la grille de fond du
 * conteneur reste seule visible, sans casser la mise en page.
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

        <div className="grid-paper relative" style={{ height: 360 }}>
          <ParcelVolumeCanvas />

          {/* Furniture de plan superposée au canvas : flèche du nord et
              barre d'échelle restent en overlay 2D fixe à l'écran —
              net à tout angle de caméra, sans géométrie de texte 3D. */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 640 340">
            <g transform="translate(50,40)">
              <line x1="0" y1="26" x2="0" y2="0" stroke="var(--ink)" strokeWidth="1.5" />
              <polygon points="0,0 -5,10 5,10" fill="var(--ink)" />
              <text x="0" y="40" textAnchor="middle" fill="var(--ink-soft)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="700">N</text>
            </g>
            <g transform="translate(490,300)">
              <line x1="0" y1="0" x2="60" y2="0" stroke="var(--ink)" strokeWidth="1.5" />
              <line x1="0" y1="-4" x2="0" y2="4" stroke="var(--ink)" strokeWidth="1.5" />
              <line x1="60" y1="-4" x2="60" y2="4" stroke="var(--ink)" strokeWidth="1.5" />
              <text x="30" y="16" textAnchor="middle" fill="var(--ink-soft)" fontSize="9" fontFamily="var(--font-mono)">10 m</text>
            </g>
          </svg>
        </div>

        <div className="flex items-center justify-between gap-2 border-t px-5 py-2.5" style={{ borderColor: "var(--line-strong)" }}>
          <span className="font-mono text-[10px]" style={{ color: "var(--ink-soft)" }}>
            Étude de masse — volume constructible extrudé
          </span>
          <span className="font-mono text-[10px]" style={{ color: "var(--ink-soft)" }}>
            Glisser pour faire pivoter
          </span>
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
