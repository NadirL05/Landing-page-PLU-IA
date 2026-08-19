import Link from "next/link";
import { HeaderAuthActions } from "@/components/HeaderAuthActions";
import { MobileNav } from "@/components/MobileNav";
import { FaqSection } from "@/components/FaqSection";
import { ParcelVolumeMockup } from "@/components/ParcelVolumeMockup";
import { BRAND_NAME, BRAND_URL, APP_URL } from "@/config/brand";
import { PLAN_LIST, PRICE_TAX_NOTICE } from "@/config/plans";

// Contenu identique à sas-plu-3d/app/page.tsx (source de vérité produit) —
// porté ici pour un repo landing dédié. CTAs /dashboard, /demo, /cgv etc.
// pointent vers l'app (APP_URL) puisque ces routes n'existent pas ici.

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
function IconCheck({ className = "h-4 w-4 text-emerald-400" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function IconX({ className = "h-4 w-4 text-slate-600" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
function IconMapPin() {
  return (
    <svg className="h-5 w-5 text-[#a3a3ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconBuilding() {
  return (
    <svg className="h-5 w-5 text-[#a3a3ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 21V8l9-6 9 6v13M9 21V12h6v9" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg className="h-5 w-5 text-[#a3a3ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </svg>
  );
}
function IconDollar() {
  return (
    <svg className="h-5 w-5 text-[#a3a3ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
function IconChart() {
  return (
    <svg className="h-5 w-5 text-[#a3a3ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 3v18h18M7 14l4-4 4 4 6-6" />
    </svg>
  );
}
function IconFile() {
  return (
    <svg className="h-5 w-5 text-[#a3a3ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
    </svg>
  );
}

function FranceMapSVG() {
  return (
    <svg viewBox="0 0 600 620" className="w-[90%] max-w-[1400px] opacity-40" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="hf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e1e3f" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#0a0a1a" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="hs" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6e6eff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3c3cf6" stopOpacity="0.25" />
        </linearGradient>
        <radialGradient id="hg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6e6eff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#6e6eff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M 243 60 C 260 55, 280 58, 305 72 L 335 85 C 355 90, 380 92, 405 98 L 430 112 C 445 125, 455 145, 460 165 L 465 190 C 468 215, 472 240, 480 265 L 500 305 C 510 330, 515 360, 510 385 L 498 415 C 488 430, 475 445, 458 458 L 440 470 C 415 480, 390 485, 372 500 L 360 520 C 355 540, 345 555, 325 560 L 300 562 C 282 560, 268 548, 260 530 L 245 510 C 235 492, 220 480, 200 475 L 180 472 C 158 465, 140 450, 130 428 L 118 395 C 110 370, 108 345, 115 320 L 125 290 C 130 265, 128 240, 118 218 L 105 190 C 98 170, 100 148, 112 130 L 135 108 C 150 92, 172 78, 195 68 L 215 62 Z" fill="url(#hf)" stroke="url(#hs)" strokeWidth="1.3" />
      <path d="M 500 475 C 506 472, 512 476, 514 484 L 515 498 C 513 508, 510 516, 506 523 L 503 530 C 500 525, 498 518, 497 510 L 496 495 Z" fill="url(#hf)" stroke="url(#hs)" strokeWidth="1" />
      <g stroke="rgba(110,110,255,0.10)" strokeWidth="0.5" fill="none">
        <path d="M 250 200 Q 330 190 400 220" />
        <path d="M 180 280 Q 290 290 410 280" />
        <path d="M 200 380 Q 310 375 420 370" />
        <path d="M 300 100 Q 305 200 310 310" />
        <path d="M 380 120 Q 395 250 410 380" />
      </g>
      <g>
        <circle cx="298" cy="180" r="22" fill="url(#hg)" />
        <circle className="city-dot" cx="298" cy="180" r="3.5" fill="#a3a3ff" />
        <circle cx="385" cy="320" r="16" fill="url(#hg)" />
        <circle className="city-dot" cx="385" cy="320" r="2.8" fill="#a3a3ff" style={{ animationDelay: ".6s" }} />
        <circle cx="405" cy="445" r="16" fill="url(#hg)" />
        <circle className="city-dot" cx="405" cy="445" r="2.8" fill="#a3a3ff" style={{ animationDelay: "1.1s" }} />
        <circle cx="208" cy="365" r="14" fill="url(#hg)" />
        <circle className="city-dot" cx="208" cy="365" r="2.5" fill="#a3a3ff" style={{ animationDelay: "1.5s" }} />
        <circle cx="282" cy="445" r="13" fill="url(#hg)" />
        <circle className="city-dot" cx="282" cy="445" r="2.5" fill="#a3a3ff" style={{ animationDelay: "1.9s" }} />
        <circle cx="185" cy="230" r="13" fill="url(#hg)" />
        <circle className="city-dot" cx="185" cy="230" r="2.5" fill="#a3a3ff" style={{ animationDelay: ".3s" }} />
        <circle cx="450" cy="175" r="13" fill="url(#hg)" />
        <circle className="city-dot" cx="450" cy="175" r="2.5" fill="#a3a3ff" style={{ animationDelay: ".9s" }} />
        <circle cx="320" cy="95" r="12" fill="url(#hg)" />
        <circle className="city-dot" cx="320" cy="95" r="2.3" fill="#a3a3ff" style={{ animationDelay: ".15s" }} />
        <circle cx="465" cy="425" r="12" fill="url(#hg)" />
        <circle className="city-dot" cx="465" cy="425" r="2.3" fill="#a3a3ff" style={{ animationDelay: ".7s" }} />
        <circle cx="180" cy="180" r="11" fill="url(#hg)" />
        <circle className="city-dot" cx="180" cy="180" r="2.1" fill="#a3a3ff" style={{ animationDelay: "1.3s" }} />
      </g>
      <g stroke="rgba(110,110,255,0.20)" strokeWidth="0.7" fill="none" strokeDasharray="2 3">
        <path d="M 298 180 Q 340 250 385 320" />
        <path d="M 298 180 Q 260 270 208 365" />
        <path d="M 385 320 Q 395 385 405 445" />
        <path d="M 298 180 Q 385 135 450 175" />
      </g>
    </svg>
  );
}

const features = [
  { icon: <IconMapPin />, title: "Adresse ou parcelle cadastrale", body: "Saisissez une adresse (Base Adresse Nationale), une référence cadastrale ou pointez la carte : la parcelle et son contour sont récupérés via l'API Carto Cadastre de l'IGN." },
  { icon: <IconBuilding />, title: "Zonage et règles d'urbanisme", body: "Le zonage est lu dans le Géoportail de l'Urbanisme (GPU) quand la commune y publie son document. Le règlement PDF de la zone est analysé pour en extraire emprise au sol, retraits et espaces verts." },
  { icon: <IconShield />, title: "Risques recensés", body: "Risques déclarés sur la commune (Géorisques / GASPAR) et aléa retrait-gonflement des argiles à la coordonnée. Les servitudes d'utilité publique restent à vérifier en mairie." },
  { icon: <IconDollar />, title: "Bilan promoteur", body: "Surface de plancher potentielle, chiffre d'affaires, coûts de construction, frais et marge. Vous ajustez les hypothèses et le bilan est recalculé." },
  { icon: <IconChart />, title: "Comparables DVF", body: "Mutations issues des Demandes de Valeurs Foncières autour de la parcelle (rayon de 500 m par défaut), avec prix au m² de référence." },
  { icon: <IconFile />, title: "Export PDF et partage", body: "Le rapport d'analyse s'exporte en PDF et peut être partagé via un lien public que vous activez ou désactivez." },
];

const dataSources = [
  "Base Adresse Nationale",
  "Cadastre — API Carto IGN",
  "Géoportail de l'Urbanisme",
  "DVF — Etalab",
  "Géorisques — GASPAR & argiles",
  "RGE Alti — IGN",
  "Zonage A / B / C — data.gouv",
  "OpenStreetMap",
  "Base Carbone — ADEME",
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#0a0a1a", color: "#e2e8f0" }}>
      <script type="application/ld+json">{JSON.stringify(SOFTWARE_APPLICATION_JSON_LD)}</script>

      {/* ===== NAV ===== */}
      <header className="sticky top-0 z-50 lp-glass border-b border-white/[0.04]">
        <div className="relative mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-10">
            <Link href="/" className="flex shrink-0 items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#5050ff] to-[#3c3cf6] shadow-[0_0_20px_rgba(60,60,246,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]">
                <span className="text-[11px] font-bold text-white">PLU</span>
              </div>
              <span className="whitespace-nowrap text-[15px] font-semibold tracking-tight text-slate-50">{BRAND_NAME}</span>
            </Link>
            <nav className="hidden items-center gap-7 text-[13px] text-slate-400 md:flex">
              {[
                { label: "Produit", href: "#produit" },
                { label: "Fonctionnalités", href: "#fonctionnalites" },
                { label: "Sources", href: "#sources" },
                { label: "Tarifs", href: "#tarifs" },
                { label: "FAQ", href: "#faq" },
              ].map((item) => (
                <a key={item.label} href={item.href} className="transition hover:text-slate-100">{item.label}</a>
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden" style={{
          background: "radial-gradient(ellipse 70% 60% at 60% 30%, rgba(60,60,246,0.14), transparent 60%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(110,110,255,0.08), transparent 55%)",
        }}>
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
          }} />
        </div>
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <FranceMapSVG />
        </div>

        <div className="relative z-10 mx-auto max-w-[1240px] px-6 pb-32 pt-24">
          <div className="max-w-3xl lp-float">
            <div className="lp-chip mb-6 max-w-full" style={{ whiteSpace: "normal" }}>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              <span className="text-slate-300">Sources publiques officielles : cadastre IGN, GPU, DVF, Géorisques</span>
            </div>

            <h1 className="lp-text-gradient text-[56px] font-semibold leading-[0.95] tracking-[-0.035em] md:text-[72px]">
              Le potentiel<br />d&apos;une parcelle,<br />sources à l&apos;appui.
            </h1>

            <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-slate-400 md:text-[19px]">
              {BRAND_NAME} croise le cadastre IGN, le Géoportail de l&apos;Urbanisme, les transactions DVF et les risques Géorisques, puis en tire une enveloppe constructible maximale théorique et un bilan promoteur. Chaque résultat indique la source dont il provient.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={`${APP_URL}/dashboard`} className="btn-brand inline-flex h-12 items-center gap-2 rounded-xl px-6 text-sm font-semibold">
                Lancer une analyse gratuite
                <IconArrow />
              </a>
              <a href={`${APP_URL}/demo`} className="btn-ghost-lp inline-flex h-12 items-center gap-2 rounded-xl px-5 text-sm font-medium">
                <IconPlay />
                Voir la démo
              </a>
              <span className="text-xs text-slate-500">Sans carte bancaire · 5 analyses / 30 jours</span>
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
                  <div className="text-[13px] font-semibold text-slate-50">{s.title}</div>
                  <div className="mt-1.5 text-[13px] leading-relaxed text-slate-400">{s.body}</div>
                </div>
              ))}
            </div>

            <p className="mt-10 max-w-2xl text-[12px] leading-relaxed text-slate-500">{DISCLAIMER_SHORT}</p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent to-[#0a0a1a]" />
      </section>

      {/* ===== SOURCES ===== */}
      <section id="sources" className="border-y border-white/[0.04] py-10" style={{ background: "#0a0a1a" }}>
        <div className="mx-auto max-w-[1240px] px-6">
          <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Les sources publiques interrogées par {BRAND_NAME}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {dataSources.map((source) => (
              <span key={source} className="lp-chip text-[12px] text-slate-300">{source}</span>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-[11px] leading-relaxed text-slate-500">
            {DATA_ATTRIBUTION}{" "}
            <a href={`${APP_URL}/sources`} className="underline transition hover:text-slate-300">Détail des sources et licences</a>.
          </p>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="fonctionnalites" className="border-t border-white/[0.04] py-28">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="mb-14 max-w-3xl">
            <div className="lp-chip mb-4"><span className="font-semibold text-[#a3a3ff]">Capacités</span></div>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-slate-50 md:text-5xl">
              De l&apos;adresse au bilan promoteur,<br />sans changer d&apos;onglet.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400">
              Seules les capacités effectivement disponibles dans le produit sont listées ci-dessous.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="lp-glass rounded-2xl p-6 transition hover:border-white/[0.12]">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-[#3c3cf6]/25 bg-[#3c3cf6]/15">{f.icon}</div>
                <h3 className="mb-2 text-[15px] font-semibold text-slate-50">{f.title}</h3>
                <p className="text-[13px] leading-relaxed text-slate-400">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section id="produit" className="relative overflow-hidden border-t border-white/[0.04] py-28">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full blur-[120px]" style={{ background: "rgba(60,60,246,0.2)" }} />
          <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full blur-[120px]" style={{ background: "rgba(110,110,255,0.15)" }} />
        </div>
        <div className="relative mx-auto max-w-[1240px] px-6">
          <div className="mx-auto mb-20 max-w-2xl text-center">
            <div className="lp-chip mx-auto mb-4"><span className="font-semibold text-[#a3a3ff]">Comment ça marche</span></div>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-slate-50 md:text-5xl">
              Trois étapes. Zéro friction.
            </h2>
          </div>
          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="absolute hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:left-[16%] md:right-[16%] md:top-8 md:block" />
            {[
              { n: "01", title: "Saisissez une adresse", body: "Adresse via la Base Adresse Nationale, référence cadastrale ou clic sur la carte : la parcelle et son contour sont récupérés auprès de l'API Carto Cadastre de l'IGN." },
              { n: "02", title: "Les sources sont croisées", body: "Zonage GPU, règlement PDF de la zone analysé automatiquement, mutations DVF alentour, risques Géorisques, zonage fiscal A/B/C, bâti OpenStreetMap et altimétrie IGN." },
              { n: "03", title: "Verdict et bilan", body: "Enveloppe constructible en maximum théorique, visualisation 3D, comparables de marché et bilan promoteur ajustable. Export PDF et lien de partage activable." },
            ].map((step) => (
              <div key={step.n} className="relative">
                <div className="glass-strong relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                  <span className="font-mono text-xl font-semibold text-[#a3a3ff]">{step.n}</span>
                  <span className="absolute inset-0 rounded-2xl blur-md" style={{ background: "rgba(60,60,246,0.10)" }} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-50">{step.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-slate-400">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PÉRIMÈTRE & LIMITES ===== */}
      <section id="perimetre" className="border-t border-white/[0.04] py-28">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="mb-14 max-w-3xl">
            <div className="lp-chip mb-4"><span className="font-semibold text-[#a3a3ff]">Périmètre & limites</span></div>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-slate-50 md:text-5xl">
              Ce que l&apos;outil fait,<br />et ce qu&apos;il ne fait pas.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400">
              Nous préférons annoncer un périmètre exact plutôt qu&apos;une promesse invendable en comité d&apos;investissement.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="lp-glass rounded-2xl p-7">
              <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-400">Inclus</div>
              <ul className="space-y-3 text-[13.5px] leading-relaxed text-slate-300">
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
                  <li key={item} className="flex gap-2.5"><IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="lp-glass rounded-2xl p-7">
              <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Non inclus à ce jour</div>
              <ul className="space-y-3 text-[13.5px] leading-relaxed text-slate-400">
                {[
                  "Les servitudes d'utilité publique parcelle par parcelle : aucune source de servitudes n'est branchée à ce jour, vérification en mairie indispensable.",
                  "Les communes dont le document d'urbanisme n'est pas publié sur le GPU : le zonage n'y est pas garanti.",
                  "Toute valeur d'instruction officielle : l'outil ne délivre ni certificat d'urbanisme, ni autorisation.",
                  "Une API publique, le SSO ou la marque blanche : non disponibles à ce jour.",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5"><IconX className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />{item}</li>
                ))}
              </ul>
              <p className="mt-6 border-t border-white/[0.06] pt-5 text-[12px] leading-relaxed text-slate-500">
                {DISCLAIMER_SHORT}{" "}
                <a href={`${APP_URL}/cgv`} className="underline transition hover:text-slate-300">Conditions générales</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="tarifs" className="border-t border-white/[0.04] py-28">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="lp-chip mx-auto mb-4"><span className="font-semibold text-[#a3a3ff]">Tarifs</span></div>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-slate-50 md:text-5xl">
              Un quota d&apos;analyses.<br />Pas de surprise.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-slate-400">
              Commencez gratuitement, sans carte bancaire. Les quotas sont comptés sur une fenêtre glissante de 30 jours et sont exactement ceux appliqués par le produit.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
            {PLAN_LIST.map((plan) => {
              const featured = plan.id === "PRO";
              return (
                <div
                  key={plan.id}
                  className={featured ? "relative flex flex-col rounded-2xl p-7" : "lp-glass flex flex-col rounded-2xl p-7"}
                  style={featured ? { background: "linear-gradient(180deg, rgba(60,60,246,0.18) 0%, rgba(21,21,42,0.78) 60%)", border: "1px solid rgba(110,110,255,0.35)", boxShadow: "0 30px 80px -30px rgba(60,60,246,0.4), inset 0 1px 0 rgba(255,255,255,0.05)" } : undefined}
                >
                  <div className={`text-xs font-semibold uppercase tracking-[0.14em] ${featured ? "text-[#a3a3ff]" : "text-slate-500"}`}>{plan.name}</div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-semibold text-slate-50">{plan.priceLabel}</span>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-snug text-slate-500">{PRICE_TAX_NOTICE}</p>
                  <p className="mt-2 text-[13px] text-slate-400">{plan.tagline}</p>
                  <div className="mt-4 rounded-lg border border-white/[0.06] px-3 py-2 text-[13px] text-slate-200" style={{ background: "rgba(255,255,255,0.02)" }}>
                    {plan.quotaLabel}
                  </div>
                  <ul className={`mt-6 flex-1 space-y-2.5 text-[13px] ${featured ? "text-slate-200" : "text-slate-300"}`}>
                    {plan.features.map((feature) => (
                      <li key={feature.label} className={`flex gap-2 ${feature.included ? "" : "text-slate-600"}`}>
                        {feature.included ? <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> : <IconX className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />}
                        <span>
                          {feature.label}
                          {feature.note ? <span className="text-slate-500"> · {feature.note}</span> : null}
                        </span>
                      </li>
                    ))}
                    <li className="flex gap-2">
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{plan.retentionLabel}</span>
                    </li>
                  </ul>
                  {plan.id === "ENTERPRISE" ? (
                    <a href={`${APP_URL}/contact`} className="btn-ghost-lp mt-7 flex h-11 w-full items-center justify-center rounded-xl text-sm font-medium">
                      Nous contacter
                    </a>
                  ) : (
                    <a
                      href={`${APP_URL}/dashboard`}
                      className={featured
                        ? "btn-brand mt-7 flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold"
                        : "btn-ghost-lp mt-7 flex h-11 w-full items-center justify-center rounded-xl text-sm font-medium"}
                    >
                      {plan.id === "FREE" ? "Commencer gratuitement" : `Passer au plan ${plan.name}`}
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-[12px] leading-relaxed text-slate-500">
            Les capacités listées sont celles réellement disponibles à ce jour ; celles marquées « sur demande » font l&apos;objet d&apos;un accord au cas par cas et ne constituent pas un engagement contractuel.{" "}
            <a href={`${APP_URL}/cgv`} className="underline transition hover:text-slate-300">Conditions générales</a>.
          </p>
        </div>
      </section>

      <FaqSection />

      {/* ===== CTA ===== */}
      <section className="border-t border-white/[0.04] py-24">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="glass-strong relative overflow-hidden rounded-3xl p-12 md:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(60,60,246,0.25)" }} />
            <div className="pointer-events-none absolute -bottom-32 -left-10 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(110,110,255,0.15)" }} />
            <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-50 md:text-4xl">
                  Testez sur une parcelle<br />que vous connaissez déjà.
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-400">
                  Le plan Découverte inclut 5 analyses / 30 jours, sans carte bancaire. Le meilleur moyen de juger la qualité d&apos;une analyse est de la confronter à un terrain dont vous connaissez l&apos;issue.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <a href={`${APP_URL}/dashboard`} className="btn-brand inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold">
                  Analyser une parcelle
                  <IconArrow />
                </a>
                <span className="text-center text-[11px] text-slate-500">Sans carte bancaire · sans engagement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/[0.04] py-12">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-5">
            <div className="col-span-2">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#5050ff] to-[#3c3cf6]">
                  <span className="text-[11px] font-bold text-white">PLU</span>
                </div>
                <span className="text-[15px] font-semibold text-slate-50">{BRAND_NAME}</span>
              </div>
              <p className="max-w-xs text-[13px] leading-relaxed text-slate-500">
                L&apos;analyse d&apos;urbanisme et de faisabilité foncière à partir des données publiques françaises.
              </p>
              <p className="mt-4 max-w-sm text-[11px] leading-relaxed text-slate-600">{DATA_ATTRIBUTION}</p>
            </div>
            {[
              {
                title: "Produit",
                links: [
                  { label: "Fonctionnalités", href: "#fonctionnalites" },
                  { label: "Périmètre & limites", href: "#perimetre" },
                  { label: "Tarifs", href: "#tarifs" },
                  { label: "Démo", href: `${APP_URL}/demo` },
                ],
              },
              {
                title: "Données",
                links: [
                  { label: "Sources & attributions", href: `${APP_URL}/sources` },
                  { label: "Sources interrogées", href: "#sources" },
                ],
              },
              {
                title: "Légal",
                links: [
                  { label: "Mentions légales", href: `${APP_URL}/mentions-legales` },
                  { label: "CGV / CGU", href: `${APP_URL}/cgv` },
                  { label: "Confidentialité (RGPD)", href: `${APP_URL}/confidentialite` },
                  { label: "Contact", href: `${APP_URL}/contact` },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{col.title}</div>
                <ul className="space-y-2 text-[13px] text-slate-400">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="transition hover:text-slate-100">{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mb-6 border-t border-white/[0.04] pt-6 text-[11px] leading-relaxed text-slate-500">{DISCLAIMER_SHORT}</p>
          <div className="flex items-center justify-between border-t border-white/[0.04] pt-6 text-[11px] text-slate-600">
            <span>© {new Date().getFullYear()} {BRAND_NAME}</span>
            <a href={`${APP_URL}/contact`} className="transition hover:text-slate-300">Nous contacter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
