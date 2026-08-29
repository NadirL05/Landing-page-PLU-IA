import { JsonLd } from "@/components/JsonLd";
import { BRAND_NAME } from "@/config/brand";
import { PLAN_LIST } from "@/config/plans";

export interface FaqItem {
  readonly q: string;
  readonly a: string;
}

function faqPlanPrice(plan: (typeof PLAN_LIST)[number]): string {
  if (plan.id === "FREE") return "0 €";
  if (plan.id === "ENTERPRISE") return "sur mesure";
  return plan.priceLabel.replace(/\s*\/\s*/g, "/");
}

/** Dérivé de config/plans.ts : la FAQ visible et le JSON-LD FAQPage ne peuvent
 *  pas diverger de la grille tarifaire affichée dans la section Tarifs. */
const pricingAnswer = `Les quatre offres actuelles sont : ${PLAN_LIST.map((plan) => `${plan.name} : ${faqPlanPrice(plan)}`).join(" ; ")}. Découverte est sans carte bancaire, avec un quota d'analyses sur une fenêtre glissante.`;

export const HOME_FAQS: readonly FaqItem[] = [
  {
    q: `Qu'est-ce que ${BRAND_NAME} ?`,
    a: `${BRAND_NAME} croise le cadastre IGN, le Géoportail de l'Urbanisme, les transactions DVF et les risques Géorisques pour produire, à la parcelle, une enveloppe constructible maximale théorique et un bilan promoteur ajustable. Chaque résultat indique la source dont il provient.`,
  },
  {
    q: "Est-ce un acte d'instruction officiel ?",
    a: `Non. ${BRAND_NAME} ne délivre ni certificat d'urbanisme ni autorisation administrative. C'est un outil d'aide à la décision : les vérifications en mairie restent indispensables, notamment sur les servitudes d'utilité publique, non couvertes par les sources branchées à ce jour.`,
  },
  {
    q: "Combien ça coûte ?",
    a: pricingAnswer,
  },
  {
    q: "Sur quelles communes ça fonctionne ?",
    a: "France métropolitaine et DOM, dans la limite des communes qui publient leur document d'urbanisme sur le Géoportail de l'Urbanisme. Si une commune n'y publie pas son PLU, le zonage n'est pas garanti par l'outil.",
  },
];

function buildFaqSchema(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

interface FaqSectionProps {
  /** FAQ propre à l'intention de la page. Par défaut : la FAQ produit générale. */
  items?: readonly FaqItem[];
  title?: string;
  eyebrow?: string;
  id?: string;
}

/**
 * FAQ accordéon.
 *
 * `<details>/<summary>` natifs plutôt qu'un accordéon piloté par useState :
 * les réponses restent dépliables sans JavaScript, l'état ouvert/fermé et la
 * sémantique clavier sont fournis par le navigateur (pas d'aria-expanded à
 * synchroniser à la main), et la section redevient un composant serveur —
 * zéro JS envoyé au client pour cette partie de page.
 *
 * La question est portée par un h3 englobant le <summary> : elle était
 * auparavant un simple <span>, invisible pour les extracteurs GEO alors que
 * le FAQPage JSON-LD s'appuie sur ces mêmes questions.
 */
export function FaqSection({
  items = HOME_FAQS,
  title = "Questions fréquentes",
  eyebrow = "PL.07 — FAQ",
  id = "faq",
}: FaqSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="border-t py-28" style={{ borderColor: "var(--line-strong)" }}>
      <JsonLd schema={buildFaqSchema(items)} />
      <div className="mx-auto max-w-3xl px-6">
        <div className="kicker mb-4">{eyebrow}</div>
        <h2 id={`${id}-heading`} className="font-display mb-14 text-4xl font-normal leading-[1.05] tracking-tight md:text-5xl" style={{ color: "var(--ink)" }}>
          {title}
        </h2>

        <div className="spec-card overflow-hidden">
          {items.map((faq, i) => (
            <details key={faq.q} className={`faq-item${i < items.length - 1 ? " border-b" : ""}`} style={{ borderColor: "var(--line)" }}>
              {/* Contenu du <summary> : un seul élément de titre, comme
                  l'autorise le modèle de contenu de summary (phrasing
                  content OU un élément de heading content). Le « + » est
                  posé en ::after par la feuille de style — l'ajouter en
                  <span> ici rendrait le summary invalide. */}
              <summary className="faq-summary px-6 py-5">
                <h3 className="font-display m-0 text-[15px] font-medium" style={{ color: "var(--ink)" }}>{faq.q}</h3>
              </summary>
              <div className="px-6 pb-5 text-[13.5px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
