"use client";

import { useState } from "react";
import { BRAND_NAME } from "@/config/brand";
import faqSchema from "@/public/schema/faq.json";

const FAQS = [
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
    a: "Le plan Découverte est gratuit, sans carte bancaire, avec un quota d'analyses sur une fenêtre glissante. L'offre Entreprise est proposée sur mesure selon vos volumes et vos besoins.",
  },
  {
    q: "Sur quelles communes ça fonctionne ?",
    a: "France métropolitaine et DOM, dans la limite des communes qui publient leur document d'urbanisme sur le Géoportail de l'Urbanisme. Si une commune n'y publie pas son PLU, le zonage n'est pas garanti par l'outil.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="border-t py-28" style={{ borderColor: "var(--line-strong)" }}>
      <script
        type="application/ld+json"
        // Static, developer-controlled JSON imported at build time from public/schema — never user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-3xl px-6">
        <div className="kicker mb-4">PL.07 — FAQ</div>
        <h2 className="font-display mb-14 text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl" style={{ color: "var(--ink)" }}>
          Questions fréquentes
        </h2>

        <div className="spec-card overflow-hidden">
          {FAQS.map((faq, i) => (
            <div key={faq.q} className={i < FAQS.length - 1 ? "border-b" : ""} style={{ borderColor: "var(--line)" }}>
              {/* Audit SEO/GEO 24/08 : la question n'était portée par aucun
                  heading (juste un span dans un button) — invisible pour les
                  extracteurs GEO (trafilatura et similaires), alors que le
                  FAQPage JSON-LD associé s'appuie sur ces mêmes questions. h3
                  enveloppe le button (pas l'inverse — button n'accepte que du
                  contenu de type phrasing, un h3 imbriqué serait invalide). */}
              <h3 className="m-0">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-question-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:opacity-80"
                >
                  <span className="font-display text-[15px] font-medium" style={{ color: "var(--ink)" }}>{faq.q}</span>
                  <span
                    className="font-mono shrink-0 text-lg transition-transform"
                    style={{ color: "var(--terracotta)", transform: open === i ? "rotate(45deg)" : "none" }}
                  >
                    +
                  </span>
                </button>
              </h3>
              {/* Audit sécu/a11y 24/08 : id/aria-controls/aria-labelledby lient
                  bouton et panneau (WCAG 4.1.2/1.3.1) ; aria-hidden retire le
                  panneau fermé de l'arbre d'accessibilité. maxHeight remonté de
                  240 à 2000 : 240 tronquait les réponses longues au zoom 400%
                  (WCAG 1.4.4) sans indice visuel. */}
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                aria-hidden={open !== i}
                className="overflow-hidden px-6 text-[13.5px] leading-relaxed transition-[max-height]"
                style={{ maxHeight: open === i ? 2000 : 0, paddingBottom: open === i ? 20 : 0, color: "var(--ink-soft)" }}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
