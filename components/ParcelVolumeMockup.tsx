import { ParcelVolumeCanvas } from "@/components/ParcelVolumeCanvas";

/**
 * Écrin de la maquette 3D : une surface claire à grand rayon et ombre
 * douce, dans laquelle l'objet satiné est le seul point de contraste.
 * Tout l'appareillage "extrait cadastral" de la version précédente
 * (grille de coordonnées, cartouche, flèche du nord, barre d'échelle,
 * graduations d'axe, repères d'angle) a été retiré : l'objet porte
 * seul la lecture, sans annotation posée par-dessus.
 *
 * La hauteur du conteneur est fixée en style inline dès le rendu
 * serveur : le canvas three.js ne monte qu'à l'idle post-LCP (voir
 * ParcelVolumeCanvas) et ne doit provoquer aucun décalage de mise en
 * page en arrivant.
 */
export function ParcelVolumeMockup({
  className = "max-w-xl",
  height = "clamp(340px, 34vw, 520px)",
}: {
  className?: string;
  height?: string;
}) {
  return (
    <div className={`relative w-full select-none ${className}`} aria-hidden="true">
      <div className="soft-panel relative overflow-hidden" style={{ height }}>
        {/* Halo très léger derrière l'objet : donne une assise au
            volume sans introduire de motif ni de bordure. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 62% 32%, color-mix(in oklch, var(--brand) 9%, transparent) 0%, transparent 62%)",
          }}
        />
        <ParcelVolumeCanvas />
      </div>

      {/* Annotation de zonage posée sur la maquette : la plus petite des
          deux surfaces de verre, entièrement au-dessus du volume 3D —
          c'est là que le flou et la saturation se lisent le mieux.
          Retrait droit exprimé en pourcentage, pas en pixels : à partir de
          lg, la page fait déborder la maquette hors du conteneur
          (lg:-mr-[6vw], xl:-mr-[9vw]) et jusqu'à ~13 % de sa largeur sort
          du viewport à 1280 px. Un `right-6` serait rogné à cette largeur ;
          18 % garde la pastille dans la zone visible à 1024, 1280, 1440 et
          1920 px. La carte du bas est ancrée à gauche pour la même raison. */}
      <div
        className="glass glass-panel glass-pill absolute right-[18%] top-6 z-10 hidden items-center gap-2 px-3.5 py-2 text-[11.5px] font-semibold sm:inline-flex"
        style={{ color: "var(--ink)" }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--terracotta)" }} />
        Zone UB · GPU
      </div>

      {/* Carte de lecture en chevauchement : la superposition crée la
          profondeur, comme les cartes flottantes du reste de la page.
          Traitement verre plutôt qu'aplat — elle chevauche la maquette,
          donc il y a réellement quelque chose à flouter dessous. */}
      <div className="glass glass-panel absolute -bottom-5 left-6 z-10 hidden w-56 p-4 sm:block sm:left-10">
        <div className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: "var(--ink-soft)" }}>
          Surface de plancher
        </div>
        <div className="font-display mt-1 text-xl font-normal" style={{ color: "var(--ink)" }}>
          ≈ 1 240 m²
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--brand-soft)" }}>
          <div className="h-full rounded-full" style={{ width: "68%", background: "var(--terracotta)" }} />
        </div>
        <div className="mt-2 text-[11.5px]" style={{ color: "var(--ink-soft)" }}>
          Emprise au sol utilisée · 68 %
        </div>
      </div>
    </div>
  );
}
