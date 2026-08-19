import Link from "next/link";
import { HeaderAuthActions } from "@/components/HeaderAuthActions";
import { MobileNav } from "@/components/MobileNav";
import { FaqSection } from "@/components/FaqSection";
import { ParcelVolumeMockup } from "@/components/ParcelVolumeMockup";
import { BRAND_NAME, BRAND_URL, APP_URL } from "@/config/brand";
import { PLAN_LIST, PRICE_TAX_NOTICE } from "@/config/plans";

// Direction Luma : fond crème chaud, gradients corail/brand, cards très
// arrondies en glass, typo display XXL (Instrument Sans). Contenu inchangé
// depuis sas-plu-3d/app/page.tsx (source de vérité produit) — seule la
// peau visuelle change.

const STRIPE_LINK_PRO = "https://buy.stripe.com/test_dRm8wQ4pg0H55gXfZN48000";
const CALENDLY_URL = "https://calendly.com/nadir-lahyani-agentimpact/30min";

const SOFTWARE_APPLICATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: BRAND_NAME,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: BRAND_URL,
  description:
    "Analyse foncière et urbanisme assistées par IA : zonage, enveloppe constructible, comparables DVF et bilan promoteur.",
  offers: {
    "@type": "Offer",
    url: BRAND_URL,
    priceCurrency: "EUR",
    price: "99",
    availability: "https://schema.org/InStock",
  },
};

const DISCLAIMER_SHORT =
  "Estimations d'aide à la décision issues de sources publiques — ni certificat d'urbanisme, ni conseil juridique ou financier. Vérifications en mairie indispensables.";

const DATA_ATTRIBUTION =
  "Données : © les contributeurs OpenStreetMap (ODbL) · IGN / Géoplateforme · DVF – Etalab (Licence Ouverte 2.0) · Géorisques – MTE · GPU · INSEE · ADEME.";

function IconArrow() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
function IconCheck({ color = "var(--brand)" }: { color?: string }) {
  return (
    <svg className="h-4 w-4 shrink-0" style={{ color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function IconX() {
  return (
    <svg className="h-4 w-4 shrink-0" style={{ color: "var(--ink-soft)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
function IconPlay() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}
function IconMapPin() { return <svg className="h-5 w-5" style={{ color: "var(--brand)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>; }
function IconBuilding() { return <svg className="h-5 w-5" style={{ color: "var(--brand)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 21V8l9-6 9 6v13M9 21V12h6v9" /></svg>; }
function IconShield() { return <svg className="h-5 w-5" style={{ color: "var(--brand)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></svg>; }
function IconDollar() { return <svg className="h-5 w-5" style={{ color: "var(--brand)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>; }
function IconChart() { return <svg className="h-5 w-5" style={{ color: "var(--brand)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 3v18h18M7 14l4-4 4 4 6-6" /></svg>; }
function IconFile() { return <svg className="h-5 w-5" style={{ color: "var(--brand)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>; }

const features = [
  { icon: <IconMapPin />, title: "Adresse ou parcelle cadastrale", body: "Saisissez une adresse (Base Adresse Nationale), une référence cadastrale ou pointez la carte : la parcelle et son contour sont récupérés via l'API Carto Cadastre de l'IGN." },
  { icon: <IconBuilding />, title: "Zonage et règles d'urbanisme", body: "Le zonage est lu dans le Géoportail de l'Urbanisme (GPU) quand la commune y publie son document. Le règlement PDF de la zone est analysé pour en extraire emprise au sol, retraits et espaces verts." },
  { icon: <IconShield />, title: "Risques recensés", body: "Risques déclarés sur la commune (Géorisques / GASPAR) et aléa retrait-gonflement des argiles à la coordonnée. Les servitudes d'utilité publique restent à vérifier en mairie." },
  { icon: <IconDollar />, title: "Bilan promoteur", body: "Surface de plancher potentielle, chiffre d'affaires, coûts de construction, frais et marge. Vous ajustez les hypothèses et le bilan est recalculé." },
  { icon: <IconChart />, title: "Comparables DVF", body: "Mutations issues des Demandes de Valeurs Foncières autour de la parcelle (rayon de 500 m par défaut), avec prix au m² de référence." },
  { icon: <IconFile />, title: "Export PDF et partage", body: "Le rapport d'analyse s'exporte en PDF et peut être partagé via un lien public que vous activez ou désactivez." },
];

const dataSources = [
  "Base Adresse Nationale", "Cadastre — API Carto IGN", "Géoportail de l'Urbanisme", "DVF — Etalab",
  "Géorisques — GASPAR & argiles", "RGE Alti — IGN", "Zonage A / B / C — data.gouv", "OpenStreetMap", "Base Carbone — ADEME",
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json">{JSON.stringify(SOFTWARE_APPLICATION_JSON_LD)}</script>

      {/* ===== NAV ===== */}
      <header className="glass-card sticky top-3 z-50 mx-3 rounded-full sm:mx-6">
        <div className="relative mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-7">
          <div className="flex min-w-0 items-center gap-10">
            <Link href="/" className="flex shrink-0 items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: "linear-gradient(135deg, var(--brand), var(--coral))" }}>
                <span className="font-mono text-[11px] font-bold">PLU</span>
              </div>
              <span className="font-display whitespace-nowrap text-[15px] font-semibold tracking-tight" style={{ color: "var(--ink)" }}>{BRAND_NAME}</span>
            </Link>
            <nav className="hidden items-center gap-7 text-[13px] font-medium md:flex" style={{ color: "var(--ink-soft)" }}>
              {[
                { label: "Produit", href: "#produit" },
                { label: "Fonctionnalités", href: "#fonctionnalites" },
                { label: "Sources", href: "#sources" },
                { label: "Tarifs", href: "#tarifs" },
                { label: "FAQ", href: "#faq" },
              ].map((item) => (
                <a key={item.label} href={item.href} className="transition hover:opacity-70">{item.label}</a>
              ))}
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <HeaderAuthActions />
            <MobileNav />
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="hero-gradient relative overflow-hidden pt-8">
        <div className="relative z-10 mx-auto max-w-[1180px] px-6 pb-32 pt-20">
          <div className="max-w-3xl">
            <div className="chip mb-7" style={{ background: "var(--paper-raised)" }}>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--coral)" }} />
              Sources publiques officielles : cadastre IGN, GPU, DVF, Géorisques
            </div>

            <h1 className="font-display text-[58px] font-semibold leading-[0.98] tracking-[-0.03em] md:text-[76px]" style={{ color: "var(--ink)" }}>
              Le potentiel d&apos;une parcelle,<br />
              <span style={{ background: "linear-gradient(135deg, var(--brand), var(--coral))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                sources à l&apos;appui.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-[17px] leading-relaxed md:text-[19px]" style={{ color: "var(--ink-soft)" }}>
              {BRAND_NAME} croise le cadastre IGN, le Géoportail de l&apos;Urbanisme, les transactions DVF et les risques Géorisques, puis en tire une enveloppe constructible maximale théorique et un bilan promoteur. Chaque résultat indique la source dont il provient.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={`${APP_URL}/dashboard`} className="btn-brand inline-flex h-13 items-center gap-2 rounded-full px-7 text-sm font-semibold" style={{ height: 52 }}>
                Lancer une analyse gratuite
                <IconArrow />
              </a>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 text-sm font-medium" style={{ height: 52 }}>
                <IconPlay />
                Voir la démo
              </a>
              <span className="text-xs" style={{ color: "var(--ink-soft)" }}>Sans carte bancaire · 5 analyses / 30 jours</span>
            </div>

            <div className="mt-14 flex justify-center lg:justify-start">
              <ParcelVolumeMockup />
            </div>

            <div className="mt-16 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3">
              {[
                { title: "Sources croisées", body: "Cadastre IGN, GPU, DVF, Géorisques, zonage A/B/C, OpenStreetMap, RGE Alti." },
                { title: "Périmètre", body: "France métropolitaine et DOM, dans la limite des communes publiant leur document d'urbanisme sur le GPU." },
                { title: "Livrable", body: "Analyse en ligne, visualisation 3D, bilan promoteur, export PDF et lien de partage." },
              ].map((s) => (
                <div key={s.title}>
                  <div className="font-display text-[13px] font-semibold" style={{ color: "var(--ink)" }}>{s.title}</div>
                  <div className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{s.body}</div>
                </div>
              ))}
            </div>

            <p className="mt-10 max-w-2xl text-[12px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{DISCLAIMER_SHORT}</p>
          </div>
        </div>
      </section>

      {/* ===== SOURCES ===== */}
      <section id="sources" className="border-y py-10" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-[1180px] px-6">
          <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--ink-soft)" }}>
            Les sources publiques interrogées par {BRAND_NAME}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {dataSources.map((source) => (
              <span key={source} className="chip">{source}</span>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-[11px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            {DATA_ATTRIBUTION}{" "}
            <a href={`${APP_URL}/sources`} className="underline transition hover:opacity-70">Détail des sources et licences</a>.
          </p>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="fonctionnalites" className="py-28">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="mb-14 max-w-3xl">
            <div className="chip mb-4">Capacités</div>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl" style={{ color: "var(--ink)" }}>
              De l&apos;adresse au bilan promoteur,<br />sans changer d&apos;onglet.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Seules les capacités effectivement disponibles dans le produit sont listées ci-dessous.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="glass-card rounded-[24px] p-6 transition hover:-translate-y-0.5">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-2xl" style={{ background: "var(--brand-soft)" }}>{f.icon}</div>
                <h3 className="font-display mb-2 text-[15px] font-semibold" style={{ color: "var(--ink)" }}>{f.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section id="produit" className="relative overflow-hidden border-t py-28" style={{ borderColor: "var(--line)" }}>
        <div className="relative mx-auto max-w-[1180px] px-6">
          <div className="mx-auto mb-20 max-w-2xl text-center">
            <div className="chip mx-auto mb-4">Comment ça marche</div>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl" style={{ color: "var(--ink)" }}>
              Trois étapes. Zéro friction.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { n: "01", title: "Saisissez une adresse", body: "Adresse via la Base Adresse Nationale, référence cadastrale ou clic sur la carte : la parcelle et son contour sont récupérés auprès de l'API Carto Cadastre de l'IGN." },
              { n: "02", title: "Les sources sont croisées", body: "Zonage GPU, règlement PDF de la zone analysé automatiquement, mutations DVF alentour, risques Géorisques, zonage fiscal A/B/C, bâti OpenStreetMap et altimétrie IGN." },
              { n: "03", title: "Verdict et bilan", body: "Enveloppe constructible en maximum théorique, visualisation 3D, comparables de marché et bilan promoteur ajustable. Export PDF et lien de partage activable." },
            ].map((step) => (
              <div key={step.n} className="glass-card rounded-[24px] p-7">
                <div className="font-mono mb-5 text-2xl font-bold" style={{ color: "var(--coral)" }}>{step.n}</div>
                <h3 className="font-display mb-2 text-lg font-semibold" style={{ color: "var(--ink)" }}>{step.title}</h3>
                <p className="text-[13.5px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PÉRIMÈTRE & LIMITES ===== */}
      <section id="perimetre" className="border-t py-28" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="mb-14 max-w-3xl">
            <div className="chip mb-4">Périmètre & limites</div>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl" style={{ color: "var(--ink)" }}>
              Ce que l&apos;outil fait,<br />et ce qu&apos;il ne fait pas.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Nous préférons annoncer un périmètre exact plutôt qu&apos;une promesse invendable en comité d&apos;investissement.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="glass-card rounded-[24px] p-7">
              <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--brand)" }}>Inclus</div>
              <ul className="space-y-3 text-[13.5px] leading-relaxed" style={{ color: "var(--ink)" }}>
                {[
                  "Identification de la parcelle et de son contour (cadastre IGN).",
                  "Zonage d'urbanisme lu dans le Géoportail de l'Urbanisme quand la commune y publie son document.",
                  "Analyse automatisée du règlement de zone : emprise au sol, retraits, espaces verts.",
                  "Risques recensés sur la commune et aléa retrait-gonflement des argiles (Géorisques).",
                  "Mutations DVF autour de la parcelle, rayon de 500 m par défaut.",
                  "Enveloppe constructible : maximum théorique, hors retraits, prospects et gabarit.",
                  "Visualisation 3D du terrain et de son environnement bâti.",
                  "Bilan promoteur paramétrable, export PDF et lien de partage.",
                  "Détection des contraintes bloquantes vérifiée à chaque déploiement sur un jeu de cas de référence.",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5"><IconCheck />{item}</li>
                ))}
              </ul>
            </div>
            <div className="glass-card rounded-[24px] p-7">
              <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--ink-soft)" }}>Non inclus à ce jour</div>
              <ul className="space-y-3 text-[13.5px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                {[
                  "Les servitudes d'utilité publique parcelle par parcelle : aucune source de servitudes n'est branchée à ce jour, vérification en mairie indispensable.",
                  "Les communes dont le document d'urbanisme n'est pas publié sur le GPU : le zonage n'y est pas garanti.",
                  "Toute valeur d'instruction officielle : l'outil ne délivre ni certificat d'urbanisme, ni autorisation.",
                  "Une API publique, le SSO ou la marque blanche : non disponibles à ce jour.",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5"><IconX />{item}</li>
                ))}
              </ul>
              <p className="mt-6 border-t pt-5 text-[12px] leading-relaxed" style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}>
                {DISCLAIMER_SHORT}{" "}
                <a href={`${APP_URL}/cgv`} className="underline transition hover:opacity-70">Conditions générales</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="tarifs" className="border-t py-28" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="chip mx-auto mb-4">Tarifs</div>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl" style={{ color: "var(--ink)" }}>
              Un quota d&apos;analyses.<br />Pas de surprise.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Commencez gratuitement, sans carte bancaire. Les quotas sont comptés sur une fenêtre glissante de 30 jours et sont exactement ceux appliqués par le produit.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
            {PLAN_LIST.map((plan) => {
              const featured = plan.id === "PRO";
              return (
                <div
                  key={plan.id}
                  className="relative flex flex-col rounded-[28px] p-7"
                  style={featured
                    ? { background: "linear-gradient(180deg, color-mix(in oklch, var(--brand) 12%, var(--paper-raised)), var(--paper-raised))", border: "1.5px solid var(--brand)", boxShadow: "var(--shadow-card)" }
                    : { background: "var(--paper-raised)", border: "1px solid var(--line)" }}
                >
                  {featured ? (
                    <span className="absolute -top-3 left-7 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white" style={{ background: "linear-gradient(135deg, var(--brand), var(--coral))" }}>
                      Le plus choisi
                    </span>
                  ) : null}
                  <div className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: featured ? "var(--brand)" : "var(--ink-soft)" }}>{plan.name}</div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-semibold" style={{ color: "var(--ink)" }}>{plan.priceLabel}</span>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-snug" style={{ color: "var(--ink-soft)" }}>{PRICE_TAX_NOTICE}</p>
                  <p className="mt-2 text-[13px]" style={{ color: "var(--ink-soft)" }}>{plan.tagline}</p>
                  <div className="mt-4 rounded-2xl px-3 py-2 text-[13px]" style={{ background: "var(--brand-soft)", color: "var(--ink)" }}>
                    {plan.quotaLabel}
                  </div>
                  <ul className="mt-6 flex-1 space-y-2.5 text-[13px]" style={{ color: "var(--ink)" }}>
                    {plan.features.map((feature) => (
                      <li key={feature.label} className="flex gap-2" style={!feature.included ? { color: "var(--ink-soft)" } : undefined}>
                        {feature.included ? <IconCheck /> : <IconX />}
                        <span>
                          {feature.label}
                          {feature.note ? <span style={{ color: "var(--ink-soft)" }}> · {feature.note}</span> : null}
                        </span>
                      </li>
                    ))}
                    <li className="flex gap-2">
                      <IconCheck />
                      <span>{plan.retentionLabel}</span>
                    </li>
                  </ul>
                  {plan.id === "ENTERPRISE" ? (
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-7 flex h-11 w-full items-center justify-center rounded-full text-sm font-medium">
                      Nous contacter
                    </a>
                  ) : (
                    <a
                      href={plan.id === "PRO" ? STRIPE_LINK_PRO : `${APP_URL}/dashboard`}
                      className={featured ? "btn-brand mt-7 flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold" : "btn-ghost mt-7 flex h-11 w-full items-center justify-center rounded-full text-sm font-medium"}
                    >
                      {plan.id === "FREE" ? "Commencer gratuitement" : `Passer au plan ${plan.name}`}
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-[12px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            Les capacités listées sont celles réellement disponibles à ce jour ; celles marquées « sur demande » font l&apos;objet d&apos;un accord au cas par cas et ne constituent pas un engagement contractuel.{" "}
            <a href={`${APP_URL}/cgv`} className="underline transition hover:opacity-70">Conditions générales</a>.
          </p>
        </div>
      </section>

      <FaqSection />

      {/* ===== CTA ===== */}
      <section className="border-t py-24" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="hero-gradient relative overflow-hidden rounded-[32px] p-12 md:p-16" style={{ border: "1px solid var(--line)" }}>
            <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl" style={{ color: "var(--ink)" }}>
                  Testez sur une parcelle<br />que vous connaissez déjà.
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  Le plan Découverte inclut 5 analyses / 30 jours, sans carte bancaire. Le meilleur moyen de juger la qualité d&apos;une analyse est de la confronter à un terrain dont vous connaissez l&apos;issue.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <a href={`${APP_URL}/dashboard`} className="btn-brand inline-flex items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold" style={{ height: 52 }}>
                  Analyser une parcelle
                  <IconArrow />
                </a>
                <span className="text-center text-[11px]" style={{ color: "var(--ink-soft)" }}>Sans carte bancaire · sans engagement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t py-12" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-5">
            <div className="col-span-2">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl text-white" style={{ background: "linear-gradient(135deg, var(--brand), var(--coral))" }}>
                  <span className="font-mono text-[11px] font-bold">PLU</span>
                </div>
                <span className="font-display text-[15px] font-semibold" style={{ color: "var(--ink)" }}>{BRAND_NAME}</span>
              </div>
              <p className="max-w-xs text-[13px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                L&apos;analyse d&apos;urbanisme et de faisabilité foncière à partir des données publiques françaises.
              </p>
              <p className="mt-4 max-w-sm text-[11px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{DATA_ATTRIBUTION}</p>
            </div>
            {[
              { title: "Produit", links: [{ label: "Fonctionnalités", href: "#fonctionnalites" }, { label: "Périmètre & limites", href: "#perimetre" }, { label: "Tarifs", href: "#tarifs" }, { label: "Démo", href: CALENDLY_URL }] },
              { title: "Données", links: [{ label: "Sources & attributions", href: `${APP_URL}/sources` }, { label: "Sources interrogées", href: "#sources" }] },
              { title: "Légal", links: [{ label: "Mentions légales", href: `${APP_URL}/mentions-legales` }, { label: "CGV / CGU", href: `${APP_URL}/cgv` }, { label: "Confidentialité (RGPD)", href: `${APP_URL}/confidentialite` }, { label: "Contact", href: CALENDLY_URL }] },
            ].map((col) => (
              <div key={col.title}>
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--ink-soft)" }}>{col.title}</div>
                <ul className="space-y-2 text-[13px]" style={{ color: "var(--ink-soft)" }}>
                  {col.links.map((link) => (
                    <li key={link.label}><a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} className="transition hover:opacity-70">{link.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mb-6 border-t pt-6 text-[11px] leading-relaxed" style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}>{DISCLAIMER_SHORT}</p>
          <div className="flex items-center justify-between border-t pt-6 text-[11px]" style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}>
            <span>© {new Date().getFullYear()} {BRAND_NAME}</span>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="transition hover:opacity-70">Nous contacter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
