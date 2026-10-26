import { BRAND_URL, COMPANY_NAME, COMPANY_URL } from "@/config/brand";

/**
 * Constructeurs de données structurées pour les pages métier.
 *
 * Les @id sont alignés sur ceux déjà posés à l'accueil
 * (public/schema/organization.json, public/schema/website.json et le
 * SoftwareApplication inline de app/page.tsx) : une page métier ne redéclare
 * ni l'organisation ni le site, elle les référence. Redéclarer un
 * Organization complet par page ferait apparaître plusieurs entités
 * concurrentes pour la même marque.
 *
 * Aucun Review, AggregateRating ni témoignage n'est émis : aucun avis client
 * n'est publié sur ce site, en inventer un serait une donnée fabriquée.
 */

export const ORGANIZATION_ID = `${BRAND_URL}/#organization`;
export const WEBSITE_ID = `${BRAND_URL}/#website`;
export const SOFTWARE_ID = `${BRAND_URL}/#software`;

/**
 * Éditeur du site et du produit : AgentImpact. Posé en `publisher` sur
 * WebSite, SoftwareApplication et chaque WebPage. Volontairement réduit au
 * nom et à l'URL : aucune adresse ni SIRET n'est publié ici.
 */
export const PUBLISHER_ORGANIZATION = {
  "@type": "Organization",
  name: COMPANY_NAME,
  url: COMPANY_URL,
} as const;

export interface BreadcrumbStep {
  readonly name: string;
  /** Chemin absolu sur la landing (« / », « /bilan-promoteur »). */
  readonly path: string;
}

export function buildBreadcrumbSchema(steps: readonly BreadcrumbStep[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: steps.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: `${BRAND_URL}${step.path === "/" ? "/" : step.path}`,
    })),
  };
}

export interface WebPageSchemaInput {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  /** Date de dernière modification éditoriale substantielle (ISO). */
  readonly dateModified: string;
}

export function buildWebPageSchema({ slug, name, description, dateModified }: WebPageSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BRAND_URL}${slug}#webpage`,
    url: `${BRAND_URL}${slug}`,
    name,
    description,
    inLanguage: "fr",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": SOFTWARE_ID },
    publisher: PUBLISHER_ORGANIZATION,
    dateModified,
  };
}

export interface ArticleSchemaInput {
  readonly slug: string;
  /** Titre éditorial visible (H1). */
  readonly headline: string;
  readonly description: string;
  readonly datePublished: string;
  readonly dateModified: string;
}

/**
 * Article de fond. Auteur et éditeur = l'organisation éditrice : aucun
 * auteur nominatif n'est déclaré tant qu'aucune personne réelle n'a relu et
 * signé le texte (pas de faux expert).
 */
export function buildArticleSchema({ slug, headline, description, datePublished, dateModified }: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${BRAND_URL}${slug}#article`,
    headline,
    description,
    inLanguage: "fr",
    datePublished,
    dateModified,
    mainEntityOfPage: { "@id": `${BRAND_URL}${slug}#webpage` },
    isPartOf: { "@id": WEBSITE_ID },
    author: PUBLISHER_ORGANIZATION,
    publisher: PUBLISHER_ORGANIZATION,
  };
}
