import Link from "next/link";
import { HeaderAuthActions } from "@/components/HeaderAuthActions";
import { MobileNav } from "@/components/MobileNav";
import { FaqSection } from "@/components/FaqSection";
import { ParcelVolumeMockup } from "@/components/ParcelVolumeMockup";
import { Reveal } from "@/components/Reveal";
import { BRAND_NAME, APP_URL } from "@/config/brand";
import { PLAN_LIST, PRICE_TAX_NOTICE } from "@/config/plans";

// Direction "Plan cadastral" : papier froid, encre bleu-cadastre,
// accent terre-cuite réservé aux annotations/mesures — vocabulaire
// emprunté aux extraits cadastraux et aux feuilles de plan technique
// (cartouche, grille de coordonnées, repères d'angle, numérotation
// de planche) plutôt qu'au SaaS chaleureux générique. Contenu
// inchangé depuis sas-plu-3d/app/page.tsx (source de vérité produit)
// — seule la peau visuelle change.

const STRIPE_LINK_PRO = "https://buy.stripe.com/test_dRm8wQ4pg0H55gXfZN48000";
const CALENDLY_URL = "https://calendly.com/nadir-lahyani-agentimpact/30min";

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
function IconCrosshair() { return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="7" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" /></svg>; }

const features = [
  { ref: "FIG.01", icon: <IconMapPin />, title: "Adresse ou parcelle cadastrale", body: "Saisissez une adresse (Base Adresse Nationale), une référence cadastrale ou pointez la carte : la parcelle et son contour sont récupérés via l'API Carto Cadastre de l'IGN." },
  { ref: "FIG.02", icon: <IconBuilding />, title: "Zonage et règles d'urbanisme", body: "Le zonage est lu dans le Géoportail de l'Urbanisme (GPU) quand la commune y publie son document. Le règlement PDF de la zone est analysé pour en extraire emprise au sol, retraits et espaces verts." },
  { ref: "FIG.03", icon: <IconShield />, title: "Risques recensés", body: "Risques déclarés sur la commune (Géorisques / GASPAR) et aléa retrait-gonflement des argiles à la coordonnée. Les servitudes d'utilité publique restent à vérifier en mairie." },
  { ref: "FIG.04", icon: <IconDollar />, title: "Bilan promoteur", body: "Surface de plancher potentielle, chiffre d'affaires, coûts de construction, frais et marge. Vous ajustez les hypothèses et le bilan est recalculé." },
  { ref: "FIG.05", icon: <IconChart />, title: "Comparables DVF", body: "Mutations issues des Demandes de Valeurs Foncières autour de la parcelle (rayon de 500 m par défaut), avec prix au m² de référence." },
  { ref: "FIG.06", icon: <IconFile />, title: "Export PDF et partage", body: "Le rapport d'analyse s'exporte en PDF et peut être partagé via un lien public que vous activez ou désactivez." },
];

const dataSources = [
  "Base Adresse Nationale", "Cadastre — API Carto IGN", "Géoportail de l'Urbanisme", "DVF — Etalab",
  "Géorisques — GASPAR & argiles", "RGE Alti — IGN", "Zonage A / B / C — data.gouv", "OpenStreetMap", "Base Carbone — ADEME",
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" src="/schema/software-application.json" async />

      {/* ===== NAV — bandeau rectangulaire, pas de pill flottante ===== */}
      <header className="sticky top-0 z-50 border-b" style={{ background: "color-mix(in oklch, var(--paper) 92%, transparent)", borderColor: "var(--line-strong)", backdropFilter: "blur(8px)" }}>
        <div className="relative mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-7">
          <div className="flex min-w-0 items-center gap-10">
            <Link href="/" className="flex shrink-0 items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center border" style={{ borderColor: "var(--brand)", color: "var(--brand)" }}>
                <IconCrosshair />
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

      {/* ===== HERO — feuille de plan : grille de coordonnées, cartouche, repères d'angle ===== */}
      <section className="grid-paper relative overflow-hidden pt-8">
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 pb-24 pt-14 lg:pb-32 lg:pt-16">
          <Reveal>
            <div className="cartouche mb-8">
              <div>
                <span className="cartouche-label">Projet</span>
                <span className="cartouche-value">Analyse parcellaire</span>
              </div>
              <div>
                <span className="cartouche-label">Sources</span>
                <span className="cartouche-value">Cadastre IGN · GPU · DVF</span>
              </div>
              <div>
                <span className="cartouche-label">Statut</span>
                <span className="cartouche-value" style={{ color: "var(--terracotta)" }}>Sources vérifiées</span>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-7">
              <h1 className="font-display text-[length:var(--text-hero)] font-semibold leading-[0.98] tracking-[-0.03em]" style={{ color: "var(--ink)" }}>
                Le potentiel d&apos;une parcelle,<br />
                <span style={{ borderBottom: "4px solid var(--terracotta)" }}>sources à l&apos;appui.</span>
              </h1>

              <p className="mt-8 max-w-xl text-[17px] leading-relaxed md:text-[19px]" style={{ color: "var(--ink-soft)" }}>
                {BRAND_NAME} croise le cadastre IGN, le Géoportail de l&apos;Urbanisme, les transactions DVF et les risques Géorisques, puis en tire une enveloppe constructible maximale théorique et un bilan promoteur. Chaque résultat indique la source dont il provient.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href={`${APP_URL}/dashboard`} className="btn-brand inline-flex h-13 items-center gap-2 px-7 text-sm font-semibold" style={{ height: 52 }}>
                  Lancer une analyse gratuite
                  <IconArrow />
                </a>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost inline-flex items-center gap-2 px-6 text-sm font-medium" style={{ height: 52 }}>
                  <IconPlay />
                  Voir la démo
                </a>
              </div>
              <span className="mono-label mt-4 inline-block" style={{ color: "var(--ink-soft)" }}>Sans carte bancaire · 5 analyses / 30 jours</span>
            </div>

            <div className="relative lg:col-span-5">
              <Reveal variant="scale" delay={120} className="flex justify-center lg:block">
                <ParcelVolumeMockup className="max-w-xl lg:max-w-none" />
              </Reveal>
            </div>
          </div>

          <div className="mt-20 flex flex-wrap gap-x-12 gap-y-7 border-t pt-9 lg:mt-24" style={{ borderColor: "var(--line-strong)" }}>
            {[
              { title: "Sources croisées", body: "Cadastre IGN, GPU, DVF, Géorisques, zonage A/B/C, OpenStreetMap, RGE Alti." },
              { title: "Périmètre", body: "France métropolitaine et DOM, dans la limite des communes publiant leur document d'urbanisme sur le GPU." },
              { title: "Livrable", body: "Analyse en ligne, visualisation 3D, bilan promoteur, export PDF et lien de partage." },
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 90} className="max-w-[240px]">
                <div className="mono-label" style={{ color: "var(--terracotta)" }}>{s.title}</div>
                <div className="mt-2 text-[13px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{s.body}</div>
              </Reveal>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-[12px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{DISCLAIMER_SHORT}</p>
        </div>
      </section>

      {/* ===== SOURCES ===== */}
      <section id="sources" className="border-y py-10" style={{ borderColor: "var(--line-strong)" }}>
        <div className="mx-auto max-w-[1180px] px-6">
          <p className="mono-label mb-8 text-center" style={{ color: "var(--ink-soft)" }}>
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

      {/* ===== FEATURES — grille "fiches techniques", numérotation FIG.0x ===== */}
      <section id="fonctionnalites" className="py-28">
        <div className="mx-auto max-w-[1180px] px-6">
          <Reveal className="mb-14 max-w-3xl">
            <div className="kicker mb-4">PL.02 — Capacités</div>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl" style={{ color: "var(--ink)" }}>
              De l&apos;adresse au bilan promoteur,<br />sans changer d&apos;onglet.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Seules les capacités effectivement disponibles dans le produit sont listées ci-dessous.
            </p>
          </Reveal>

          <div className="spec-grid">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 60} className="col-span-6 sm:col-span-3 md:col-span-2">
                <div className="card-lift flex h-full flex-col p-6" style={{ borderTop: "2px solid transparent" }}>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center" style={{ background: "var(--brand-soft)" }}>{f.icon}</div>
                    <span className="font-mono text-[10px] font-bold tracking-[0.1em]" style={{ color: "var(--terracotta)" }}>{f.ref}</span>
                  </div>
                  <h3 className="font-display mb-2 text-[15px] font-semibold" style={{ color: "var(--ink)" }}>{f.title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Annotation de mesure façon plan — remplace la tuile "hero" du bento :
              une lecture de donnée avec repère de coordonnée, pas une carte de plus. */}
          <Reveal delay={360} className="mt-4">
            <div className="spec-card flex flex-wrap items-center justify-between gap-6 p-6">
              <div className="flex items-center gap-4">
                <span className="coord-tag">Parcelle AB0142</span>
                <div>
                  <div className="mono-label" style={{ color: "var(--ink-soft)" }}>SDP potentielle</div>
                  <div className="font-display text-lg font-semibold" style={{ color: "var(--ink)" }}>≈ 1 240 m² · emprise 68 %</div>
                </div>
              </div>
              <div className="h-1.5 w-full max-w-xs overflow-hidden" style={{ background: "var(--line)" }}>
                <div className="h-full" style={{ width: "68%", background: "var(--terracotta)" }} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== PROCESS — numérotation de planche (PL.0x) ===== */}
      <section id="produit" className="relative overflow-hidden border-t py-28" style={{ borderColor: "var(--line-strong)" }}>
        <div className="relative mx-auto max-w-[1180px] px-6">
          <Reveal className="mx-auto mb-16 max-w-2xl text-center">
            <div className="kicker mx-auto mb-4">PL.03 — Méthode</div>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl" style={{ color: "var(--ink)" }}>
              Trois étapes. Zéro friction.
            </h2>
          </Reveal>
          <div>
            {[
              { n: "01", title: "Saisissez une adresse", body: "Adresse via la Base Adresse Nationale, référence cadastrale ou clic sur la carte : la parcelle et son contour sont récupérés auprès de l'API Carto Cadastre de l'IGN.", color: "var(--terracotta)" },
              { n: "02", title: "Les sources sont croisées", body: "Zonage GPU, règlement PDF de la zone analysé automatiquement, mutations DVF alentour, risques Géorisques, zonage fiscal A/B/C, bâti OpenStreetMap et altimétrie IGN.", color: "var(--brand)" },
              { n: "03", title: "Verdict et bilan", body: "Enveloppe constructible en maximum théorique, visualisation 3D, comparables de marché et bilan promoteur ajustable. Export PDF et lien de partage activable.", color: "var(--terracotta)" },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 110} className="process-row">
                <div className="process-num" style={{ color: step.color }}>{step.n}</div>
                <div className="pt-1.5 md:pt-3">
                  <h3 className="font-display mb-2.5 text-xl font-semibold md:text-2xl" style={{ color: "var(--ink)" }}>{step.title}</h3>
                  <p className="max-w-2xl text-[14.5px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PÉRIMÈTRE & LIMITES ===== */}
      <section id="perimetre" className="border-t py-28" style={{ borderColor: "var(--line-strong)" }}>
        <div className="mx-auto max-w-[1180px] px-6">
          <Reveal className="mb-14 max-w-3xl">
            <div className="kicker mb-4">PL.04 — Périmètre</div>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl" style={{ color: "var(--ink)" }}>
              Ce que l&apos;outil fait,<br />et ce qu&apos;il ne fait pas.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Nous préférons annoncer un périmètre exact plutôt qu&apos;une promesse invendable en comité d&apos;investissement.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-px lg:grid-cols-2" style={{ background: "var(--line-strong)", border: "1px solid var(--line-strong)" }}>
            <Reveal delay={0}>
              <div className="h-full p-7" style={{ background: "var(--paper-raised)" }}>
                <div className="mono-label mb-5" style={{ color: "var(--brand)" }}>Inclus</div>
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
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full p-7" style={{ background: "var(--paper-raised)" }}>
                <div className="mono-label mb-5" style={{ color: "var(--ink-soft)" }}>Non inclus à ce jour</div>
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="tarifs" className="border-t py-28" style={{ borderColor: "var(--line-strong)" }}>
        <div className="mx-auto max-w-[1180px] px-6">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <div className="kicker mx-auto mb-4">PL.05 — Tarifs</div>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl" style={{ color: "var(--ink)" }}>
              Un quota d&apos;analyses.<br />Pas de surprise.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Commencez gratuitement, sans carte bancaire. Les quotas sont comptés sur une fenêtre glissante de 30 jours et sont exactement ceux appliqués par le produit.
            </p>
          </Reveal>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-px md:grid-cols-3" style={{ background: "var(--line-strong)", border: "1px solid var(--line-strong)" }}>
            {PLAN_LIST.map((plan, i) => {
              const featured = plan.id === "PRO";
              return (
                <Reveal key={plan.id} delay={i * 100} variant={featured ? "scale" : "up"}>
                <div
                  className="relative flex h-full flex-col"
                  style={{ background: "var(--paper-raised)" }}
                >
                  {featured ? (
                    <span
                      className="font-mono absolute right-0 top-0 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white"
                      style={{ background: "var(--terracotta)" }}
                    >
                      Le plus choisi
                    </span>
                  ) : null}
                  <div className="flex flex-1 flex-col p-7">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: featured ? "var(--brand)" : "var(--ink-soft)" }}>{plan.name}</div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-semibold" style={{ color: "var(--ink)" }}>{plan.priceLabel}</span>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-snug" style={{ color: "var(--ink-soft)" }}>{PRICE_TAX_NOTICE}</p>
                  <p className="mt-2 text-[13px]" style={{ color: "var(--ink-soft)" }}>{plan.tagline}</p>
                  <div className="mt-4 px-3 py-2 text-[13px]" style={{ background: "var(--brand-soft)", color: "var(--ink)" }}>
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
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-7 flex h-11 w-full items-center justify-center text-sm font-medium">
                      Nous contacter
                    </a>
                  ) : (
                    <a
                      href={plan.id === "PRO" ? STRIPE_LINK_PRO : `${APP_URL}/dashboard`}
                      className={featured ? "btn-brand mt-7 flex h-11 w-full items-center justify-center text-sm font-semibold" : "btn-ghost mt-7 flex h-11 w-full items-center justify-center text-sm font-medium"}
                    >
                      {plan.id === "FREE" ? "Commencer gratuitement" : `Passer au plan ${plan.name}`}
                    </a>
                  )}
                  </div>
                </div>
                </Reveal>
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

      {/* ===== CTA — feuille de plan encadrée, repères d'angle ===== */}
      <section className="border-t py-24" style={{ borderColor: "var(--line-strong)" }}>
        <div className="mx-auto max-w-[1180px] px-6">
          <Reveal variant="scale">
          <div className="reg-marks grid-paper relative overflow-hidden p-12 md:p-16" style={{ border: "1px solid var(--brand)" }}>
            <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <div className="kicker mb-4">PL.06 — Vérification</div>
                <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl" style={{ color: "var(--ink)" }}>
                  Testez sur une parcelle<br />que vous connaissez déjà.
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  Le plan Découverte inclut 5 analyses / 30 jours, sans carte bancaire. Le meilleur moyen de juger la qualité d&apos;une analyse est de la confronter à un terrain dont vous connaissez l&apos;issue.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <a href={`${APP_URL}/dashboard`} className="btn-brand inline-flex items-center justify-center gap-2 px-6 text-sm font-semibold" style={{ height: 52 }}>
                  Analyser une parcelle
                  <IconArrow />
                </a>
                <span className="text-center text-[11px]" style={{ color: "var(--ink-soft)" }}>Sans carte bancaire · sans engagement</span>
              </div>
            </div>
          </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t py-12" style={{ borderColor: "var(--line-strong)" }}>
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-5">
            <div className="col-span-2">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center border" style={{ borderColor: "var(--brand)", color: "var(--brand)" }}>
                  <IconCrosshair />
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
