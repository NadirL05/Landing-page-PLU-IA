# TRD — Landing Fonciable

> Rédigé le 2026-10-20 à partir du code. **[Lu]** = constaté · **[Déduit]** = interprétation · **[À CONFIRMER]** = à trancher par Nadir. Dépend de `PRD.md`.

## 1. Stack et justification

| Choix | Version (`package.json`) | Raison |
|---|---|---|
| Next.js App Router | `next` 16.3.1 | Pages pré-rendues (SSG) indexables, `metadata` API pour SEO, routes `sitemap.ts` / `opengraph-image.tsx` / route handlers statiques ; hébergement natif Vercel. [Lu : `x-nextjs-prerender: 1` en prod] |
| React | 19.2.8 | Imposé par Next 16. |
| TypeScript | ^5 | Contrats typés pour le contenu éditorial (`MetierPageContent`) et les plans. |
| Tailwind CSS v4 | ^4 (`@tailwindcss/postcss`) | Styles utilitaires sans runtime ; tokens dans `app/globals.css`. |
| three + @react-three/fiber | ^0.185.1 / ^9.7.0 | Scène 3D parcelle → maison au scroll (`components/PageScene.tsx`, `ParcelMassingScene.tsx`). |
| framer-motion | ^14.1.0 | Animations d'apparition. [Déduit : composants `Reveal`, `MobileNav`] |
| @sentry/nextjs | ^10.71.0 | Suivi d'erreurs client/serveur/edge + replays. |
| ESLint 9 + eslint-config-next | 16.3.1 | Seul contrôle qualité automatisé aujourd'hui. |
| Polices | `next/font/google` (Instrument Serif, Plus Jakarta Sans, Space Mono) | Auto-hébergées au build → `font-src 'self'` suffit. |

Attention [Lu : `AGENTS.md`] : Next 16 a des changements cassants ; lire `node_modules/next/dist/docs/` avant d'écrire du code.

## 2. Architecture

```
Visiteur ──HTTPS──> Vercel (fonciable.fr, région cdg1 observée)
                     │  next.config.ts : headers (CSP, HSTS…), redirects
                     ├─ /                       app/page.tsx (SSG)
                     ├─ /bilan-promoteur        app/<slug>/page.tsx ─> MetierPage + content/<slug>.ts
                     ├─ /faisabilite-fonciere   idem
                     ├─ /prospection-fonciere   idem
                     ├─ /mentions-legales, /confidentialite  (LegalPage)
                     ├─ /sitemap.xml, /opengraph-image, /.well-known/*  (statique)
                     ├─ /monitoring             tunnel Sentry (withSentryConfig.tunnelRoute)
                     └─ /public/*               llms.txt, robots.txt, rsl.xml, schema/*.json, demonstration.html
CTA ──lien <a>──> calendly.com/nadir-lahyani-agentimpact/30min
CTA ──lien <a>──> app.fonciable.fr/dashboard | /checkout/{starter,pro} | /cgv | /sources | /confidentialite
```

- **Landing statique** : aucune donnée dynamique, aucun appel serveur à l'exécution hormis le tunnel Sentry. [Lu]
- **Pages métier** : une page = un fichier `content/<slug>.ts` typé `MetierPageContent` (`components/metier/types.ts`) + un `app/<slug>/page.tsx` de 10 lignes qui appelle `MetierPage` et `buildMetierMetadata` (`lib/metier-metadata.ts`, canonical obligatoire). Le référentiel `config/solutions.ts` alimente navigation, pied de page, bloc « Solutions », maillage interne et sitemap. [Lu]
- **JSON-LD** : unique sérialiseur `components/JsonLd.tsx` (échappe `<`, `>`, `&` en `\uXXXX`). Accueil : SoftwareApplication (offers générées depuis `PUBLIC_PLAN_LIST`), Organization et WebSite (`public/schema/*.json`), FAQPage. Pages métier : WebPage + BreadcrumbList (`lib/page-schema.ts`) + FAQPage ; `@id` partagés, aucun Review/AggregateRating. [Lu]
- **Analytics et consentement** : script CMP consentmanager (mode semi-automatique, `data-cmp-cdid="a9d3fcbcd2398"`) dans `<head>` ; `ConsentGate` lit Google Consent Mode v2 dans `dataLayer` (fail closed) et ne monte `GoogleTag` (analytics_storage) et `MetaPixel` (ad_storage + ad_user_data) qu'après accord. `TrackedCta` émet `book_demo` / `start_paid_checkout` vers gtag et fbq. [Lu : `app/layout.tsx`, `components/analytics/*`, `lib/analytics.ts`]
- **Sentry** : `instrumentation.ts` (serveur/edge), `instrumentation-client.ts` (client, Replay 10 % sessions / 100 % erreurs, `tracesSampleRate: 1`, `sendDefaultPii: true`), `app/global-error.tsx` capture l'exception. Sentry **n'est pas** soumis au consentement. [Lu]
- **Scène 3D** : détection WebGL (`lib/webgl.ts`) et `prefers-reduced-motion` (`hooks/useSceneCapabilities.ts`) ; en mode réduit la maison est affichée « livrée ». [Lu]

## 3. Modèle de données

Pas de base de données. Les « entités » sont des constantes versionnées. [Lu]

| Entité | Fichier | Champs clés | Relations |
|---|---|---|---|
| Marque | `config/brand.ts` | `BRAND_NAME`, `FORMER_BRAND_NAME`, `BRAND_URL`, `APP_URL`, `COMPANY_NAME`, `CONTACT_EMAIL` | utilisée partout (métadonnées, liens, légal) |
| Plan | `config/plans.ts` | `id` (FREE/STARTER/PRO/ENTERPRISE), `name`, `priceLabel`, `quotaLabel`, `features[]` | copie de `sas-plu-3d/src/config/plans.ts` ; `PUBLIC_PLAN_LIST` exclut FREE ; alimente bloc tarifs + JSON-LD offers |
| Contenu transverse | `config/site-content.ts` | `CALENDLY_URL`, `DISCLAIMER_SHORT`, `DATA_ATTRIBUTION`, `APP_ENTRY_PATH` | accueil, pages métier, pied de page |
| Page solution | `config/solutions.ts` | `slug`, `navLabel`, `linkLabel`, `summary` | 1-1 avec un `content/<slug>.ts` ; sitemap, nav, maillage |
| Contenu métier | `content/<slug>.ts` | `MetierPageContent` : méta, hero, problem, capabilities (+ `contextLink` optionnel), steps, sources, proof (exemple fictif étiqueté, ou réel vérifié à la source avec preuves dans `docs/PREUVES-*.md`), limits, faq, finalCta | rendu par `MetierPage` |
| Schémas statiques | `public/schema/{organization,website,software-application,faq}.json` | `@id` `https://fonciable.fr/#…` | référencés par `lib/page-schema.ts` |
| Fichiers de découverte | `public/llms.txt`, `robots.txt`, `rsl.xml` | texte | doivent rester alignés sur `config/plans.ts` (copie manuelle) |

Écart constaté : le commentaire au-dessus de `CALENDLY_URL` dans `config/site-content.ts` parle d'un « Stripe Payment Link mode LIVE » alors que la valeur est l'URL Calendly → commentaire obsolète, à corriger (signalé, non modifié).

## 4. Auth et rôles

**N/A** — la landing n'a ni compte, ni session, ni zone privée, ni middleware. Tous les visiteurs ont les mêmes droits (lecture). L'authentification (Clerk) et les rôles relèvent de `sas-plu-3d`. [Lu : `CLAUDE.md` « Pas de Clerk ici », absence de `middleware.ts`/`proxy.ts`]

## 5. Intégrations

| Intégration | Mode | Fichier | Données échangées |
|---|---|---|---|
| Calendly | Lien sortant `<a target="_blank">` | `config/site-content.ts` | aucune côté landing |
| app.fonciable.fr | Liens sortants (`/dashboard`, `/checkout/{starter,pro}`, `/cgv`, `/sources`, `/confidentialite`) | `config/brand.ts`, `app/page.tsx` | aucune (attribution `utm_*`/`gclid`/`fbclid` possible via `withCurrentQuery`, non activée) |
| Google Analytics 4 / Google Ads | `gtag.js` après consentement analytics | `components/analytics/google-tag.tsx` | pages vues, événements CTA |
| Meta Pixel | `fbevents.js` après consentement marketing | `components/analytics/meta-pixel.tsx` | PageView, événements custom |
| consentmanager.net | script CMP semi-automatique | `app/layout.tsx` | preuve et état du consentement |
| Sentry (org `agentimpact`, projet `landing-plu-ia`, région `de`) | SDK + tunnel `/monitoring` | `instrumentation*.ts`, `sentry.*.config.ts`, `next.config.ts` | erreurs, traces, replays, PII par défaut |
| Vercel | hébergement, build, Cron Monitors auto (`automaticVercelMonitors`) | `.vercel/project.json` (non versionné), `next.config.ts` | — |
| Stripe | **aucune intégration ici** ; liens vers le checkout de l'app | — | — |
| Webhooks entrants | **aucun** | — | — |

## 6. Variables d'environnement (noms seulement)

Relevées par `grep -rn "process\.env"` le 2026-10-20 :

| Nom | Usage | Exposée au client |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ID GA4 (`.trim()` obligatoire) | oui (publique par nature) |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | ID Google Ads | oui |
| `NEXT_PUBLIC_META_PIXEL_ID` | ID Meta Pixel | oui |
| `CI` | rend le plugin Sentry verbeux en CI | non |
| `NEXT_RUNTIME` | fourni par Next (nodejs/edge) | non |
| `SENTRY_AUTH_TOKEN` | upload des source maps au build [Déduit : requis par `withSentryConfig` ; présence sur Vercel **[À CONFIRMER]**] | non |

Le DSN Sentry est écrit en dur dans 3 fichiers (valeur publique par conception, pas un secret). `.mcp.json` (non suivi par git) référence `API_KEY_21ST` via variable, sans valeur.

## 7. Exigences non fonctionnelles

- **SEO** : chaque page publique a `title`, `description`, `canonical` auto-référent, OpenGraph/Twitter avec image, et figure dans `app/sitemap.ts` (`lastModified` figé, mis à jour à la main). [Lu]
- **GEO** : `llms.txt` et JSON-LD cohérents avec le HTML visible (prix, offres, ancien nom). [Lu : commit `f0a1656`]
- **Accessibilité / mouvement** : respect de `prefers-reduced-motion`, contenu visible sans JS (`<noscript>` force `.reveal` visible). [Lu]
- **Performance** : CMP chargé en `async` (ne doit plus être l'élément LCP). Core Web Vitals cibles : **[À CONFIRMER]** (non mesurés).
- **Sécurité** : en-têtes CSP, HSTS preload, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy sur toutes les routes. [Lu : `next.config.ts`, vérifié en prod par `curl -sI`]
- **Vérité du contenu** : aucun chiffre, avis, témoignage ou intégration inventés ; exemples chiffrés étiquetés « fictifs ». [Lu : `lib/page-schema.ts`, `MetierPageContent.proof`]
- **Langue** : français (`lang="fr"`, `fr_FR`).

## 8. Contraintes

- Prix/quotas : toute modification doit être répercutée dans `sas-plu-3d/src/config/plans.ts`, `config/plans.ts`, `public/llms.txt` et `public/schema/*.json`.
- Pas de nonce CSP possible sans middleware → `script-src 'unsafe-inline'` assumé. [Lu : commentaire `next.config.ts`]
- Le CMP consentmanager est partagé avec 2 autres dépôts (hostia, hector) : toute modification de CSP/CMP doit être propagée. [Lu : `CLAUDE.md`]
- Valeurs d'env Vercel à coller sans retour à la ligne (incident du 21/08). [Lu : `CLAUDE.md`]
- Pas de CI GitHub (`.github/` absent) : seules les vérifications Vercel au build s'appliquent. [Lu]
- `next` 16.3.1 est dans la plage vulnérable signalée par `npm audit` (voir `SECURITY.md`).
