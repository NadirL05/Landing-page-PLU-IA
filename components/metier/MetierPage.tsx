import Link from "next/link";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { IconArrow, IconCheck, IconPlay } from "@/components/icons";
import { TrackedCta } from "@/components/analytics/tracked-cta";
import { APP_URL, BRAND_NAME } from "@/config/brand";
import { APP_ENTRY_PATH, CALENDLY_URL, DISCLAIMER_SHORT } from "@/config/site-content";
import { otherSolutionPages } from "@/config/solutions";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/page-schema";
import type { MetierPageContent } from "@/components/metier/types";

/**
 * Gabarit unique des pages métier publiques.
 *
 * Ces pages sont des surfaces d'acquisition : elles expliquent une pratique
 * (bilan promoteur, faisabilité, prospection), disent ce que l'outil fait
 * réellement, ce qu'il ne fait pas, puis renvoient vers l'application privée.
 * Aucun calcul n'est exécuté ici — pas de moteur, pas de base, pas de
 * formulaire, aucune donnée personnelle collectée.
 *
 * Composant serveur : le seul JS embarqué vient de <Reveal> (animation
 * d'apparition) et de <TrackedCta> (événement analytics au clic). Le contenu
 * complet est présent dans le HTML rendu, sans JavaScript.
 */
export function MetierPage({ content }: { content: MetierPageContent }) {
  const others = otherSolutionPages(content.slug);
  const appHref = `${APP_URL}${APP_ENTRY_PATH}`;
  /** Identifie la page dans GA4/Meta sans créer d'événement supplémentaire :
   *  on réutilise les noms d'événements déjà en place. */
  const pageParam = content.slug.replace("/", "");

  return (
    <div className="min-h-screen">
      <JsonLd
        schema={buildWebPageSchema({
          slug: content.slug,
          name: content.metaTitle,
          description: content.metaDescription,
          dateModified: content.dateModified,
        })}
      />
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: content.navLabel, path: content.slug },
        ])}
      />

      <SiteHeader />

      <main>
        {/* ===== 1. Fil d'Ariane ===== */}
        <nav aria-label="Fil d'Ariane" className="mx-auto max-w-[1180px] px-6 pt-6">
          <ol className="breadcrumb">
            <li><Link href="/">Accueil</Link></li>
            <li aria-current="page">{content.navLabel}</li>
          </ol>
        </nav>

        {/* ===== 2. Hero ===== */}
        <section className="hero-surface relative overflow-hidden" aria-labelledby="page-title">
          <div className="relative z-10 mx-auto max-w-[1180px] px-6 pb-20 pt-10 lg:pb-24">
            <Reveal>
              <span className="hero-pill mb-7">{content.eyebrow}</span>
            </Reveal>
            <Reveal delay={60}>
              <h1
                id="page-title"
                className="font-display max-w-4xl text-[length:var(--text-hero-sub)] font-normal leading-[1.02] tracking-[-0.025em] md:text-[length:var(--text-hero)]"
                style={{ color: "var(--ink)" }}
              >
                {content.h1}
              </h1>
              <p className="mt-7 max-w-2xl text-[17px] leading-relaxed md:text-[19px]" style={{ color: "var(--ink-soft)" }}>
                {content.lede}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <TrackedCta
                  href={appHref}
                  eventName="start_free_analysis"
                  eventParams={{ cta_location: "hero", page: pageParam }}
                  preserveQuery
                  className="btn-brand inline-flex items-center gap-2 px-7 text-sm font-semibold"
                  style={{ height: 52 }}
                >
                  {content.ctaPrimaryLabel}
                  <IconArrow />
                </TrackedCta>
                {content.ctaSecondaryLabel ? (
                  <TrackedCta
                    href={CALENDLY_URL}
                    eventName="book_demo"
                    eventParams={{ cta_location: "hero", page: pageParam }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost inline-flex items-center gap-2 px-6 text-sm font-medium"
                    style={{ height: 52 }}
                  >
                    <IconPlay />
                    {content.ctaSecondaryLabel}
                  </TrackedCta>
                ) : null}
              </div>
              <span className="mt-4 inline-block text-[13px]" style={{ color: "var(--ink-soft)" }}>{content.ctaNote}</span>
            </Reveal>
            <p className="mt-10 max-w-2xl text-[12px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{DISCLAIMER_SHORT}</p>
          </div>
        </section>

        {/* ===== 3. Problème métier ===== */}
        <section className="border-t py-24" style={{ borderColor: "var(--line-strong)" }} aria-labelledby="probleme-heading">
          <div className="mx-auto max-w-[1180px] px-6">
            <Reveal className="mb-12 max-w-3xl">
              <div className="kicker mb-4">Le problème</div>
              <h2 id="probleme-heading" className="font-display text-3xl font-normal leading-[1.08] tracking-tight md:text-4xl" style={{ color: "var(--ink)" }}>
                {content.problem.title}
              </h2>
              {content.problem.body.map((paragraph) => (
                <p key={paragraph} className="mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  {paragraph}
                </p>
              ))}
            </Reveal>
            <div className="metier-grid">
              {content.problem.points.map((point, i) => (
                <Reveal key={point.title} delay={i * 70}>
                  <div className="h-full p-7">
                    <h3 className="font-display mb-2 text-[15px] font-normal" style={{ color: "var(--ink)" }}>{point.title}</h3>
                    <p className="text-[13.5px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{point.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 4. Ce que fait réellement l'outil ===== */}
        <section className="border-t py-24" style={{ borderColor: "var(--line-strong)" }} aria-labelledby="capacites-heading">
          <div className="mx-auto max-w-[1180px] px-6">
            <Reveal className="mb-12 max-w-3xl">
              <div className="kicker mb-4">Ce que fait {BRAND_NAME}</div>
              <h2 id="capacites-heading" className="font-display text-3xl font-normal leading-[1.08] tracking-tight md:text-4xl" style={{ color: "var(--ink)" }}>
                {content.capabilities.title}
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                {content.capabilities.intro}
              </p>
            </Reveal>
            <div className="metier-grid">
              {content.capabilities.items.map((item, i) => (
                <Reveal key={item.title} delay={i * 60}>
                  <div className="card-lift flex h-full flex-col p-7">
                    <span className="font-mono mb-4 text-[10px] font-bold tracking-[0.1em]" style={{ color: "var(--terracotta)" }}>{item.ref}</span>
                    <h3 className="font-display mb-2 text-[15px] font-normal" style={{ color: "var(--ink)" }}>{item.title}</h3>
                    <p className="text-[13.5px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 5. Parcours ===== */}
        <section className="border-t py-24" style={{ borderColor: "var(--line-strong)" }} aria-labelledby="parcours-heading">
          <div className="mx-auto max-w-[1180px] px-6">
            <Reveal className="mb-8 max-w-2xl">
              <div className="kicker mb-4">Déroulé</div>
              <h2 id="parcours-heading" className="font-display text-3xl font-normal leading-[1.08] tracking-tight md:text-4xl" style={{ color: "var(--ink)" }}>
                {content.steps.title}
              </h2>
            </Reveal>
            {/* Même gabarit « planche » que l'accueil (.process-row) : des
                <div> et non une <ol>, parce que <Reveal> insère un conteneur
                autour de chaque étape — un <div> entre <ol> et <li> serait du
                HTML invalide. L'ordre est porté par la numérotation visible
                et par le titre de chaque étape. */}
            <div>
              {content.steps.items.map((step, i) => (
                <Reveal key={step.n} delay={i * 90} className="process-row">
                  <div className="process-num" style={{ color: i % 2 === 0 ? "var(--terracotta)" : "var(--brand)" }}>{step.n}</div>
                  <div className="pt-1.5 md:pt-3">
                    <h3 className="font-display mb-2.5 text-xl font-normal md:text-2xl" style={{ color: "var(--ink)" }}>{step.title}</h3>
                    <p className="max-w-2xl text-[14.5px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 6. Données et sources réellement utilisées ===== */}
        <section className="border-t py-24" style={{ borderColor: "var(--line-strong)" }} aria-labelledby="sources-heading">
          <div className="mx-auto max-w-[1180px] px-6">
            <Reveal className="mb-10 max-w-3xl">
              <div className="kicker mb-4">Données</div>
              <h2 id="sources-heading" className="font-display text-3xl font-normal leading-[1.08] tracking-tight md:text-4xl" style={{ color: "var(--ink)" }}>
                {content.sources.title}
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                {content.sources.intro}
              </p>
            </Reveal>
            <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-2">
              {content.sources.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-[13.5px] leading-relaxed" style={{ color: "var(--ink)" }}>
                  <IconCheck />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-3xl text-[12px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              {content.sources.note}{" "}
              <a href={`${APP_URL}/sources`} className="underline transition hover:opacity-70">Détail des sources et licences</a>.
            </p>
          </div>
        </section>

        {/* ===== 7. Preuve — exemple explicitement fictif ===== */}
        <section className="border-t py-24" style={{ borderColor: "var(--line-strong)" }} aria-labelledby="exemple-heading">
          <div className="mx-auto max-w-[1180px] px-6">
            <Reveal className="mb-10 max-w-3xl">
              <div className="kicker mb-4">Exemple</div>
              <h2 id="exemple-heading" className="font-display text-3xl font-normal leading-[1.08] tracking-tight md:text-4xl" style={{ color: "var(--ink)" }}>
                {content.proof.title}
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                {content.proof.intro}
              </p>
            </Reveal>
            <Reveal delay={80}>
              {/* Représentation statique de la lecture proposée par l'outil,
                  construite en HTML/CSS : pas une capture d'écran (aucune
                  n'existe encore dans public/), et surtout pas un faux
                  résultat client. Les valeurs sont inventées et annoncées
                  comme telles dans la légende ci-dessous. */}
              <figure className="spec-card m-0 p-7 md:p-9">
                <span className="coord-tag">{content.proof.tag}</span>
                <div className="mt-6">
                  {content.proof.rows.map((row) => (
                    <div key={row.label} className="figure-row">
                      <span className="text-[13.5px]" style={{ color: "var(--ink-soft)" }}>{row.label}</span>
                      <span className="figure-value">{row.value}</span>
                    </div>
                  ))}
                </div>
                {content.proof.bar ? (
                  <div className="mt-7">
                    <div className="mono-label mb-2" style={{ color: "var(--ink-soft)" }}>{content.proof.bar.label}</div>
                    <div className="h-1.5 w-full overflow-hidden" style={{ background: "var(--line)" }}>
                      <div className="h-full" style={{ width: `${content.proof.bar.pct}%`, background: "var(--terracotta)" }} />
                    </div>
                  </div>
                ) : null}
                <figcaption className="mt-7 border-t pt-5 text-[12px] leading-relaxed" style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}>
                  {content.proof.caption}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* ===== 8. Limites et vérifications ===== */}
        <section className="border-t py-24" style={{ borderColor: "var(--line-strong)" }} aria-labelledby="limites-heading">
          <div className="mx-auto max-w-[1180px] px-6">
            <Reveal className="mb-10 max-w-3xl">
              <div className="kicker mb-4">Limites</div>
              <h2 id="limites-heading" className="font-display text-3xl font-normal leading-[1.08] tracking-tight md:text-4xl" style={{ color: "var(--ink)" }}>
                {content.limits.title}
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                {content.limits.intro}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div className="spec-card p-7 md:p-9">
                <ul className="m-0 list-none space-y-4 p-0 text-[13.5px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  {content.limits.items.map((item) => (
                    <li key={item} className="border-l-2 pl-4" style={{ borderColor: "var(--terracotta)" }}>{item}</li>
                  ))}
                </ul>
                <p className="mt-7 border-t pt-5 text-[12px] leading-relaxed" style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}>
                  {DISCLAIMER_SHORT}{" "}
                  <a href={`${APP_URL}/cgv`} className="underline transition hover:opacity-70">Conditions générales</a>.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== 9. FAQ propre à l'intention de la page ===== */}
        <FaqSection items={content.faq} eyebrow="FAQ" title="Questions fréquentes" id="faq" />

        {/* ===== 10. CTA final ===== */}
        <section className="border-t py-24" style={{ borderColor: "var(--line-strong)" }} aria-labelledby="cta-heading">
          <div className="mx-auto max-w-[1180px] px-6">
            <Reveal variant="scale">
              <div className="reg-marks grid-paper relative overflow-hidden p-10 md:p-14" style={{ border: "1px solid var(--brand)" }}>
                <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto]">
                  <div>
                    <div className="kicker mb-4">Passer à l&apos;outil</div>
                    <h2 id="cta-heading" className="font-display text-3xl font-normal leading-tight tracking-tight md:text-4xl" style={{ color: "var(--ink)" }}>
                      {content.finalCta.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                      {content.finalCta.body}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <TrackedCta
                      href={appHref}
                      eventName="start_free_analysis"
                      eventParams={{ cta_location: "final_cta", page: pageParam }}
                      preserveQuery
                      className="btn-brand inline-flex items-center justify-center gap-2 px-6 text-sm font-semibold"
                      style={{ height: 52 }}
                    >
                      {content.finalCta.label}
                      <IconArrow />
                    </TrackedCta>
                    <span className="text-center text-[11px]" style={{ color: "var(--ink-soft)" }}>Sans carte bancaire · sans engagement</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== 11. Maillage interne ===== */}
        <section className="border-t py-20" style={{ borderColor: "var(--line-strong)" }} aria-labelledby="ailleurs-heading">
          <div className="mx-auto max-w-[1180px] px-6">
            <h2 id="ailleurs-heading" className="font-display mb-8 text-2xl font-normal tracking-tight" style={{ color: "var(--ink)" }}>
              À lire aussi
            </h2>
            <div className="metier-grid">
              {others.map((page) => (
                <Link key={page.slug} href={page.slug} className="card-lift block h-full p-7">
                  <span className="mono-label" style={{ color: "var(--terracotta)" }}>{page.navLabel}</span>
                  <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{page.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium" style={{ color: "var(--brand)" }}>
                    {page.linkLabel}
                    <IconArrow />
                  </span>
                </Link>
              ))}
              <Link href="/" className="card-lift block h-full p-7">
                <span className="mono-label" style={{ color: "var(--terracotta)" }}>Accueil</span>
                <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  Vue d&apos;ensemble de {BRAND_NAME} : fonctionnalités, sources interrogées, périmètre, limites et tarifs.
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium" style={{ color: "var(--brand)" }}>
                  Présentation complète de {BRAND_NAME}
                  <IconArrow />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
