"use client";

import { useState } from "react";
import { BRAND_NAME } from "@/config/brand";

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
    a: "Le plan Découverte est gratuit, sans carte bancaire, avec un quota d'analyses sur une fenêtre glissante. Les plans payants et leurs quotas exacts sont détaillés dans la section Tarifs — les mêmes chiffres que ceux appliqués réellement par le produit.",
  },
  {
    q: "Sur quelles communes ça fonctionne ?",
    a: "France métropolitaine et DOM, dans la limite des communes qui publient leur document d'urbanisme sur le Géoportail de l'Urbanisme. Si une commune n'y publie pas son PLU, le zonage n'est pas garanti par l'outil.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="border-t py-28" style={{ borderColor: "var(--line)" }}>
      <script type="application/ld+json">{JSON.stringify(FAQ_JSON_LD)}</script>
      <div className="mx-auto max-w-3xl px-6">
        <div className="chip mb-4">FAQ</div>
        <h2 className="font-display mb-14 text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl" style={{ color: "var(--ink)" }}>
          Questions fréquentes
        </h2>

        <div className="glass-card overflow-hidden rounded-[28px]">
          {FAQS.map((faq, i) => (
            <div key={faq.q} className={i < FAQS.length - 1 ? "border-b" : ""} style={{ borderColor: "var(--line)" }}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:opacity-80"
              >
                <span className="font-display text-[15px] font-medium" style={{ color: "var(--ink)" }}>{faq.q}</span>
                <span
                  className="font-mono shrink-0 text-lg transition-transform"
                  style={{ color: "var(--brand)", transform: open === i ? "rotate(45deg)" : "none" }}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden px-6 text-[13.5px] leading-relaxed transition-[max-height]"
                style={{ maxHeight: open === i ? 240 : 0, paddingBottom: open === i ? 20 : 0, color: "var(--ink-soft)" }}
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
