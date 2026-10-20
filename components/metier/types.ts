import type { FaqItem } from "@/components/FaqSection";

/**
 * Contrat éditorial d'une page métier.
 *
 * Les pages publiques (/bilan-promoteur, /faisabilite-fonciere,
 * /prospection-fonciere, /analyse-plu-parcelle) partagent une seule et même mise en page
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

  /**
   * Page parente dans le fil d'Ariane (ex. « /zonage-plu » pour
   * « /zonage-plu/zone-u »). Absente : la page est rattachée à l'accueil.
   */
  readonly parent?: { readonly navLabel: string; readonly slug: string };

  /**
   * Pages proposées dans le bloc « À lire aussi » (chemins du référentiel
   * config/solutions.ts). Absent : toutes les autres pages « Solutions ».
   */
  readonly related?: readonly string[];

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
  /** Mention sous le bouton de prise de rendez-vous. */
  readonly ctaNote: string;

  /* ---- 2 bis. Guide (optionnel) : définition, méthode, textes officiels ---- */
  readonly guide?: {
    readonly kicker: string;
    readonly title: string;
    readonly intro?: string;
    readonly blocks: readonly GuideBlock[];
  };

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
    /** Lien contextuel optionnel vers une autre page métier (maillage interne). */
    readonly contextLink?: { readonly text: string; readonly href: string; readonly label: string };
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

  /* ---- 7. Preuve (exemple fictif étiqueté, ou réel vérifié à la source) ---- */
  readonly proof: {
    readonly title: string;
    readonly intro: string;
    readonly tag: string;
    readonly rows: readonly { readonly label: string; readonly value: string }[];
    readonly bar?: { readonly label: string; readonly pct: number };
    readonly caption: string;
  };

  /**
   * Fichier réellement servi depuis public/ (ex. modèle de bilan). Ne jamais
   * annoncer un fichier qui n'existe pas : le test E2E vérifie qu'il répond 200.
   */
  readonly download?: {
    readonly href: string;
    readonly label: string;
    readonly format: string;
    readonly note: string;
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

/** Bloc du guide : un sous-titre, des paragraphes, une liste et une source optionnelles. */
export interface GuideBlock {
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly list?: readonly string[];
  /** Texte officiel ou page de référence (Légifrance, service-public…). */
  readonly sources?: readonly { readonly label: string; readonly href: string }[];
  /** Lien interne contextuel (maillage). */
  readonly link?: { readonly text: string; readonly href: string; readonly label: string };
}
