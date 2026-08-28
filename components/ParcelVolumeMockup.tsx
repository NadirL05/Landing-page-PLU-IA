import { ParcelVolumeCanvas } from "@/components/ParcelVolumeCanvas";

/**
 * Étude de masse 3D en fil de fer, habillée comme un véritable extrait
 * de plan technique plutôt qu'une capture produit "app SaaS" : grille
 * de coordonnées coplanaire au volume, repères d'angle, flèche du
 * nord, barre d'échelle et annotations à ligne de rappel — le
 * vocabulaire d'un plan de géomètre porté en 3D plutôt qu'un rendu
 * architecte. Encadré dans un chrome de fiche technique (cartouche +
 * coordonnée), pas une fenêtre d'app générique à trois pastilles.
 *
 * L'appareillage d'annotation (coordonnée Lambert-93, graduations
 * d'axe, mention d'échelle) est disposé HORS du cadre, sur le modèle
 * d'un tirage de plan où la graduation borde la feuille : le rendu 3D
 * garde sa surface propre, et la lecture technique est portée par le
 * bord. Poser ces repères par-dessus le volume les rendrait illisibles
 * dès que la scène tourne.
 *
 * Le canvas three.js ne monte que pendant l'idle post-LCP (voir
 * ParcelVolumeCanvas) : à défaut de WebGL, la grille de fond du
 * conteneur reste seule visible, sans casser la mise en page.
 */
export function ParcelVolumeMockup({
  className = "max-w-xl",
  /* La planche est l'ancre visuelle du hero : elle doit tenir l'écran
     large sans devenir une bande sur mobile — d'où une hauteur fluide
     plutôt que les 360px fixes de la version précédente. */
  height = "clamp(340px, 34vw, 520px)",
}: {
  className?: string;
  height?: string;
}) {
  return (
    <div className={`relative w-full select-none ${className}`} aria-hidden="true">
      {/* Bandeau d'annotation supérieur : coordonnée du point d'appui et
          système de projection — ce qu'on lit en tête d'un extrait
          cadastral, pas un badge marketing. */}
      <div className="mb-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <span className="coord-tag">X 643 210 · Y 6 279 480</span>
        <span className="mono-label" style={{ color: "var(--ink-soft)" }}>
          Lambert-93 · RGF93
        </span>
      </div>

      <div className="flex items-stretch gap-3">
        <div className="axis-ruler-y hidden shrink-0 sm:block" />

        <div className="min-w-0 flex-1">
          <div
            className="reg-marks spec-card overflow-hidden"
            style={{ boxShadow: "0 30px 70px -20px color-mix(in oklch, var(--ink) 30%, transparent), var(--shadow-card)" }}
          >
            <div className="flex items-center justify-between gap-2 border-b px-5 py-3.5" style={{ borderColor: "var(--line-strong)" }}>
              <span className="font-mono text-[11px]" style={{ color: "var(--ink-soft)" }}>
                PARCELLE AB0142 — app-plu-ia.agentimpact.fr
              </span>
              <span className="font-mono text-[10px] font-bold tracking-[0.1em]" style={{ color: "var(--brand)" }}>
                AXONOMÉTRIE
              </span>
            </div>

            <div className="grid-paper relative" style={{ height }}>
              <ParcelVolumeCanvas />

              {/* Furniture de plan superposée au canvas : flèche du nord et
                  barre d'échelle restent en overlay 2D fixe à l'écran —
                  net à tout angle de caméra, sans géométrie de texte 3D.
                  Chaque repère est positionné en CSS par rapport au cadre
                  plutôt que dans un viewBox commun : la hauteur de la
                  planche étant devenue fluide, un viewBox figé aurait
                  décollé les repères de leurs coins au fil des
                  breakpoints. */}
              <svg className="pointer-events-none absolute left-5 top-5 h-14 w-8" viewBox="0 0 24 44" aria-hidden="true">
                <line x1="12" y1="28" x2="12" y2="2" stroke="var(--ink)" strokeWidth="1.5" />
                <polygon points="12,0 7,11 17,11" fill="var(--ink)" />
                <text x="12" y="42" textAnchor="middle" fill="var(--ink-soft)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="700">N</text>
              </svg>
              <svg className="pointer-events-none absolute bottom-5 right-5 h-6 w-[70px]" viewBox="0 0 70 24" aria-hidden="true">
                <line x1="4" y1="6" x2="64" y2="6" stroke="var(--ink)" strokeWidth="1.5" />
                <line x1="4" y1="2" x2="4" y2="10" stroke="var(--ink)" strokeWidth="1.5" />
                <line x1="64" y1="2" x2="64" y2="10" stroke="var(--ink)" strokeWidth="1.5" />
                <text x="34" y="21" textAnchor="middle" fill="var(--ink-soft)" fontSize="9" fontFamily="var(--font-mono)">10 m</text>
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

          {/* Graduation de pied de planche + mention d'échelle. */}
          <div className="mt-3 flex items-center gap-3">
            <div className="axis-ruler-x min-w-0 flex-1" />
            <span className="mono-label shrink-0" style={{ color: "var(--ink-soft)" }}>
              Éch. 1:500
            </span>
          </div>
        </div>
      </div>

      {/* Carte d'annotation en chevauchement du bord bas : la
          superposition crée la profondeur et signale une lecture de
          mesure prélevée sur la planche, plutôt qu'un widget posé à
          côté. */}
      <div
        className="spec-card absolute -bottom-4 left-6 z-10 hidden w-60 p-4 sm:block sm:left-10"
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
