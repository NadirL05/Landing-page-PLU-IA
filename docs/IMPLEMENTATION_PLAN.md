# IMPLEMENTATION_PLAN — Landing Fonciable

> Rédigé le 2026-10-20. Les cases `- [x]` décrivent l'existant constaté dans le code (preuve = fichier). Les cases `- [ ]` sont la suite, **bloquée tant que le cadrage n'est pas validé** (`docs/.cadrage-valide` absent).
> Chaque étape : < ½ journée, critère de fini vérifiable, référence TRD / APP_FLOW. Tests associés : `TESTING.md`.

## Existant (constaté)

### Socle
- [x] Next.js 16 App Router + TS + Tailwind v4 — preuve : `package.json`, `tsconfig.json`, `postcss.config.mjs` (TRD §1)
- [x] Layout racine, métadonnées SEO globales, polices auto-hébergées — `app/layout.tsx` (TRD §7)
- [x] En-têtes de sécurité et redirections — `next.config.ts` ; vérifié en prod par `curl -sI https://fonciable.fr` le 2026-10-20 (TRD §7)
- [x] Sentry client/serveur/edge + tunnel `/monitoring` — `instrumentation.ts`, `instrumentation-client.ts`, `sentry.*.config.ts` (TRD §2)

### Modèle de contenu
- [x] Référentiel marque — `config/brand.ts` (TRD §3)
- [x] Copie d'affichage des plans — `config/plans.ts` (TRD §3)
- [x] Référentiel pages métier — `config/solutions.ts` (TRD §3)
- [x] Contrat éditorial typé — `components/metier/types.ts` (TRD §3)

### Parcours principal
- [x] Accueil complet (hero, sources, fonctionnalités, périmètre, tarifs, FAQ, solutions) — `app/page.tsx` (APP_FLOW §2)
- [x] CTA mesurés `book_demo` / `start_paid_checkout` — `components/analytics/tracked-cta.tsx`, `lib/analytics.ts` (APP_FLOW §2 étape 3)
- [x] En-tête, menu mobile, pied de page — `components/SiteHeader.tsx`, `MobileNav.tsx`, `SiteFooter.tsx` (APP_FLOW §3)
- [x] Scène 3D avec replis WebGL / reduced-motion — `components/PageScene.tsx`, `hooks/useSceneCapabilities.ts` (APP_FLOW §4)

### Pages métier
- [x] Gabarit unique — `components/metier/MetierPage.tsx`, `lib/metier-metadata.ts`, `lib/page-schema.ts` (TRD §2)
- [x] `/bilan-promoteur` — `content/bilan-promoteur.ts`
- [x] `/faisabilite-fonciere` — `content/faisabilite-fonciere.ts`
- [x] `/prospection-fonciere` — `content/prospection-fonciere.ts`

### Consentement, légal, SEO/GEO
- [x] CMP consentmanager semi-automatique + `ConsentGate` fail closed — `app/layout.tsx`, `components/analytics/consent-gate.tsx` (TRD §5)
- [x] GA4 / Google Ads / Meta Pixel conditionnels — `components/analytics/google-tag.tsx`, `meta-pixel.tsx`
- [x] Mentions légales, confidentialité — `app/mentions-legales/page.tsx`, `app/confidentialite/page.tsx`
- [x] 404 noindex et erreur globale — `app/not-found.tsx`, `app/global-error.tsx` (APP_FLOW §4)
- [x] Sitemap, robots, llms.txt, rsl.xml, JSON-LD, OpenGraph — `app/sitemap.ts`, `public/*`, `components/JsonLd.tsx`, `app/opengraph-image.tsx`
- [x] Cartes `.well-known` (MCP « none », agent-skills) — `app/.well-known/*`
- [x] Alignement llms.txt / JSON-LD sur l'offre affichée + lien PLU-IA — commit `f0a1656` (PR #24)

### Déploiement
- [x] Projet Vercel `landing-page-plu-ia` servant `fonciable.fr` — `.vercel/project.json` (local), en-tête `server: Vercel` en prod

## Suite

### A. Page métier « Analyse PLU d'une parcelle » (priorité 1 — PRD §4 « Plus tard »)

Prérequis bloquants : validation du cadrage ; slug, H1 et exemple **[À CONFIRMER]** par Nadir. Source : diagnostic SEO/GEO du 20/10/2026 (relais 04 et 08 D3).

- [ ] **A1 — Brief éditorial** (≤ 2 h). Rédiger dans `docs/briefs/analyse-plu-parcelle.md` : slug proposé (`/analyse-plu-parcelle`), intention, requêtes cibles (« analyse PLU parcelle », « constructibilité terrain », « règles PLU d'une parcelle », « surface constructible »), plan des 10 sections de `MetierPageContent`, liste des affirmations produit à vérifier dans `sas-plu-3d`. Fini quand : Nadir valide slug, H1, metaTitle et la liste d'affirmations. Réf. : PRD §4, TRD §2 (pages métier).
- [x] **A2 — Vérification des affirmations dans `sas-plu-3d`** (≤ 3 h). Pour chaque capacité citée (lecture zonage GPU, analyse du règlement PDF, emprise/retraits/hauteur, zones A/N écartées, servitudes SUP), noter le fichier source dans un commentaire d'en-tête comme dans `content/faisabilite-fonciere.ts`. Fini quand : chaque affirmation a un fichier de preuve ou est retirée. Réf. : TRD §7 (vérité du contenu). Fait le 2026-10-20 : 18 affirmations vérifiées (15 prouvées, 3 retirées) au commit `62959d2` de `sas-plu-3d`, voir `docs/briefs/analyse-plu-parcelle.md` §6 ; le commentaire d'en-tête sera recopié dans `content/analyse-plu-parcelle.ts` en A3.
- [ ] **A3 — Fichier de contenu** (≤ 3 h). Créer `content/analyse-plu-parcelle.ts` typé `MetierPageContent` ; exemple de la section `proof` explicitement étiqueté fictif (sauf exemple réel autorisé [À CONFIRMER]) ; disclaimer « ni certificat d'urbanisme ». Fini quand : `npx tsc --noEmit` passe, aucun chiffre non sourcé. Réf. : TRD §3 (Contenu métier).
- [ ] **A4 — Route et métadonnées** (≤ 1 h). Créer `app/analyse-plu-parcelle/page.tsx` (même forme que les 3 pages existantes) avec `buildMetierMetadata`. Fini quand : `npm run build` liste la route en statique (○), canonical = `/analyse-plu-parcelle`. Réf. : TRD §2, APP_FLOW §1.
- [ ] **A5 — Référencement interne** (≤ 1 h). Ajouter l'entrée dans `config/solutions.ts` (→ nav, pied de page, bloc Solutions, sitemap automatiquement) ; ajouter un lien contextuel depuis `content/faisabilite-fonciere.ts`. Fini quand : `/sitemap.xml` contient 7 URLs et la page reçoit un lien depuis `/` et `/faisabilite-fonciere`. Réf. : APP_FLOW §3.
- [ ] **A6 — GEO / découverte** (≤ 1 h). Ajouter la page dans la section « Docs » de `public/llms.txt` ; mettre à jour `SITE_LAST_MODIFIED` de `app/sitemap.ts`. Fini quand : `curl` local de `/llms.txt` montre la ligne, JSON-LD de la page valide (WebPage + BreadcrumbList + FAQPage). Réf. : TRD §7 (GEO).
- [ ] **A7 — Recette et mise en ligne** (≤ 2 h). Lint, build, tests de `TESTING.md` § A ; Rich Results Test ; preview Vercel relue par Nadir ; déploiement production **uniquement après accord explicite de Nadir** (SECURITY porte §8). Fini quand : URL de production en 200, page soumise à l'indexation dans GSC. Réf. : APP_FLOW §2, SECURITY.

### B. Socle qualité (pré-requis à toute autre évolution)
- [x] **B1 — Mettre à jour Next.js** hors plage vulnérable (16.3.1 → ≥ 16.4.2 selon `npm audit`) et `eslint-config-next` ; relire `node_modules/next/dist/docs/`. Fini quand : `npm audit --audit-level=critical` sort en 0, build OK. Réf. : SECURITY. Fait le 2026-10-20 : next 16.4.2, audit critique = 0, lint/tsc/build OK.
- [ ] **B2 — Installer Playwright** et le scénario E2E du parcours principal (`TESTING.md` §3). Fini quand : `npm test` passe en local. Réf. : TESTING.
- [ ] **B3 — Script `test`** unique dans `package.json` (lint + typecheck + build + e2e). Fini quand : une seule commande rejoue tout. Réf. : TESTING §6.

### C. Durcissement et conformité (voir `SECURITY.md`)
- [ ] **C1 — Sentry et RGPD** : décider si Sentry (Replay, `sendDefaultPii: true`) passe sous consentement ou est mentionné dans `/confidentialite` ; réduire `tracesSampleRate`. Fini quand : politique et configuration concordent. [À CONFIRMER : choix de Nadir]
- [ ] **C2 — Durées de conservation chiffrées** dans `/confidentialite` (aujourd'hui génériques). Fini quand : chaque traitement a une durée. [À CONFIRMER : durées]
- [ ] **C3 — Corriger le commentaire obsolète** au-dessus de `CALENDLY_URL` (`config/site-content.ts`). Fini quand : commentaire exact.
- [ ] **C4 — Ajouter `.mcp.json` à `.gitignore`** ou le versionner volontairement [À CONFIRMER].

### D. SEO/GEO hors page PLU (diagnostic 20/10, après A)
- [x] **D1** — Enrichir `/faisabilite-fonciere` avec « constructibilité / surface constructible ». Fini quand : vocabulaire présent dans H2/FAQ, build OK. Fait le 2026-10-20 : 2 H2 et 2 questions FAQ ajoutées, uniquement des affirmations prouvées en A2 ; lint, `tsc --noEmit` et build OK ; E2E Playwright non disponible (B2), remplacé par un contrôle du HTML pré-rendu (2 H2 et 2 `Question` JSON-LD contiennent « constructib »).
- [ ] **D2** — Mot « IA » visible sur l'accueil si conforme au positionnement [À CONFIRMER]. Fini quand : HTML brut de `/` contient « IA » hors scripts.
- [ ] **D3** — `sameAs` LinkedIn Fonciable dans `public/schema/organization.json` [À CONFIRMER URL].
- [ ] **D4** — Activer `preserveQuery` sur les CTA vers l'app [À CONFIRMER]. Fini quand : un clic depuis `/?utm_source=x` mène à `…/checkout/pro?utm_source=x`.
