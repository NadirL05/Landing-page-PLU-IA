import type { FaqItem } from "@/components/FaqSection";

/**
 * Contrat éditorial d'une page métier.
 *
 * Les trois pages publiques (/bilan-promoteur, /faisabilite-fonciere,
 * /prospection-fonciere) partagent une seule et même mise en page
 * (components/metier/MetierPage.tsx) : ce type est la seule chose qui change
 * d'une page à l'autre. Trois gabarits recopiés auraient divergé dès la
 * première correction de disclaimer.
 *
 * Contenu strictement éditorial : aucun moteur de calcul, aucune donnée
 * personnelle, aucun formulaire. Les calculs restent dans l'application.
 */
export interface MetierPageContent {
  /** Chemin de la page, ex. « /bilan-promoteur ». */
  readonly slug: string;
  /** Libellé du fil d'Ariane et de la navigation. */
  readonly navLabel: string;

  /* ---- Métadonnées ---- */
  readonly metaTitle: string;
  /** ~150-160 caractères. */
  readonly metaDescription: string;
  /** Date de dernière modification éditoriale substantielle (ISO, AAAA-MM-JJ). */
  readonly dateModified: string;

  /* ---- Hero ---- */
  readonly eyebrow: string;
  readonly h1: string;
  readonly lede: string;
  readonly ctaPrimaryLabel: string;
  /** CTA secondaire optionnel vers la démonstration (Calendly). */
  readonly ctaSecondaryLabel?: string;
  /** Mention sous les CTA (essai, absence d'engagement…). */
  readonly ctaNote: string;

  /* ---- 3. Problème métier ---- */
  readonly problem: {
    readonly title: string;
    readonly body: readonly string[];
    readonly points: readonly { readonly title: string; readonly body: string }[];
  };

  /* ---- 4. Ce que fait réellement l'outil ---- */
  readonly capabilities: {
    readonly title: string;
    readonly intro: string;
    readonly items: readonly { readonly ref: string; readonly title: string; readonly body: string }[];
  };

  /* ---- 5. Parcours ---- */
  readonly steps: {
    readonly title: string;
    readonly items: readonly { readonly n: string; readonly title: string; readonly body: string }[];
  };

  /* ---- 6. Données et sources ---- */
  readonly sources: {
    readonly title: string;
    readonly intro: string;
    readonly items: readonly string[];
    readonly note: string;
  };

  /* ---- 7. Preuve (exemple explicitement fictif) ---- */
  readonly proof: {
    readonly title: string;
    readonly intro: string;
    readonly tag: string;
    readonly rows: readonly { readonly label: string; readonly value: string }[];
    readonly bar?: { readonly label: string; readonly pct: number };
    readonly caption: string;
  };

  /* ---- 8. Limites et vérifications ---- */
  readonly limits: {
    readonly title: string;
    readonly intro: string;
    readonly items: readonly string[];
  };

  /* ---- 9. FAQ propre à l'intention de la page ---- */
  readonly faq: readonly FaqItem[];

  /* ---- 10. CTA final ---- */
  readonly finalCta: {
    readonly title: string;
    readonly body: string;
    readonly label: string;
  };
}
