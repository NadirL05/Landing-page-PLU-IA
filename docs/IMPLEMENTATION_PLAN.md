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

Prérequis bloquants : validation du cadrage ; slug, H1 et exemple tranchés par Nadir le 2026-10-20. Source : diagnostic SEO/GEO du 20/10/2026 (relais 04 et 08 D3).

- [x] **A1 — Brief éditorial** (≤ 2 h). Rédiger dans `docs/briefs/analyse-plu-parcelle.md` : slug proposé (`/analyse-plu-parcelle`), intention, requêtes cibles (« analyse PLU parcelle », « constructibilité terrain », « règles PLU d'une parcelle », « surface constructible »), plan des 10 sections de `MetierPageContent`, liste des affirmations produit à vérifier dans `sas-plu-3d`. Fini quand : Nadir valide slug, H1, metaTitle et la liste d'affirmations. Réf. : PRD §4, TRD §2 (pages métier).
  - Preuve (2026-10-20) : slug, H1 et exemple tranchés par Nadir dans le chat ; brief `docs/briefs/analyse-plu-parcelle.md`.
- [x] **A2 — Vérification des affirmations dans `sas-plu-3d`** (≤ 3 h). Pour chaque capacité citée (lecture zonage GPU, analyse du règlement PDF, emprise/retraits/hauteur, zones A/N écartées, servitudes SUP), noter le fichier source dans un commentaire d'en-tête comme dans `content/faisabilite-fonciere.ts`. Fini quand : chaque affirmation a un fichier de preuve ou est retirée. Réf. : TRD §7 (vérité du contenu).
  - Preuve (2026-10-20) : `docs/PREUVES-page-analyse-plu.md` (API IGN cadastre + GPU, data.nantesmetropole.fr, fichiers `sas-plu-3d` au commit 62959d2) ; en-tête de `content/analyse-plu-parcelle.ts`.
- [x] **A3 — Fichier de contenu** (≤ 3 h). Créer `content/analyse-plu-parcelle.ts` typé `MetierPageContent` ; exemple de la section `proof` explicitement étiqueté fictif (sauf exemple réel autorisé [À CONFIRMER]) ; disclaimer « ni certificat d'urbanisme ». Fini quand : `npx tsc --noEmit` passe, aucun chiffre non sourcé. Réf. : TRD §3 (Contenu métier).
  - Preuve (2026-10-20) : `content/analyse-plu-parcelle.ts`, exemple réel sourcé ; `npx tsc --noEmit -p .` et `npm run lint` sans erreur.
- [x] **A4 — Route et métadonnées** (≤ 1 h). Créer `app/analyse-plu-parcelle/page.tsx` (même forme que les 3 pages existantes) avec `buildMetierMetadata`. Fini quand : `npm run build` liste la route en statique (○), canonical = `/analyse-plu-parcelle`. Réf. : TRD §2, APP_FLOW §1.
  - Preuve (2026-10-20) : `npm run build` → `○ /analyse-plu-parcelle` ; `next start` + curl : 200, H1 exact, canonical `https://fonciable.fr/analyse-plu-parcelle`, robots `index, follow`.
- [x] **A5 — Référencement interne** (≤ 1 h). Ajouter l'entrée dans `config/solutions.ts` (→ nav, pied de page, bloc Solutions, sitemap automatiquement) ; ajouter un lien contextuel depuis `content/faisabilite-fonciere.ts`. Fini quand : `/sitemap.xml` contient 7 URLs et la page reçoit un lien depuis `/` et `/faisabilite-fonciere`. Réf. : APP_FLOW §3.
  - Preuve (2026-10-20) : `/sitemap.xml` = 7 URLs dont `/analyse-plu-parcelle` ; lien présent sur `/` (bloc Solutions, pied de page) et sur `/faisabilite-fonciere` (lien contextuel `capabilities.contextLink` + maillage).
- [x] **A6 — GEO / découverte** (≤ 1 h). Ajouter la page dans la section « Docs » de `public/llms.txt` ; mettre à jour `SITE_LAST_MODIFIED` de `app/sitemap.ts`. Fini quand : `curl` local de `/llms.txt` montre la ligne, JSON-LD de la page valide (WebPage + BreadcrumbList + FAQPage). Réf. : TRD §7 (GEO).
  - Preuve (2026-10-20) : `curl /llms.txt` montre la ligne ; JSON-LD parsé : `WebPage`, `BreadcrumbList`, `FAQPage` ; `SITE_LAST_MODIFIED = 2026-10-20`.
- [x] **A7 — Recette et mise en ligne** (≤ 2 h). Lint, build, tests de `TESTING.md` § A ; Rich Results Test ; preview Vercel relue par Nadir ; déploiement production **uniquement après accord explicite de Nadir** (SECURITY porte §8). Fini quand : URL de production en 200, page soumise à l'indexation dans GSC. Réf. : APP_FLOW §2, SECURITY.
  - Preuve (2026-10-20) : mise en production le 20/10 avec accord de Nadir ; `curl https://fonciable.fr/analyse-plu-parcelle` → 200, canonical exact, « 44109000BZ0070 » présent ; indexation demandée dans la Search Console ; Rich Results Test : fil d'Ariane valide (constats rapportés par Nadir). Recette automatisée rejouable : `npm test` (B2/B3).

### B. Socle qualité (pré-requis à toute autre évolution)
- [x] **B1 — Mettre à jour Next.js** hors plage vulnérable (16.3.1 → ≥ 16.4.2 selon `npm audit`) et `eslint-config-next` ; relire `node_modules/next/dist/docs/`. Fini quand : `npm audit --audit-level=critical` sort en 0, build OK. Réf. : SECURITY. Fait le 2026-10-20 : next 16.4.2, audit critique = 0, lint/tsc/build OK.
- [x] **B2 — Installer Playwright** et le scénario E2E du parcours principal (`TESTING.md` §3). Fini quand : `npm test` passe en local. Réf. : TESTING.
  - Preuve (2026-10-20) : `@playwright/test` 1.64.1 (devDependency), Chromium headless shell seul ; `playwright.config.ts` (build + `next start` sur 127.0.0.1:3107) ; `tests/e2e/parcours-principal.spec.ts` (§3.1-3.10) et `tests/e2e/seo.spec.ts` (sitemap, canonical, H1, `<main>`, JSON-LD, pages métier, page PLU, maillage, 404, redirections). 20 tests verts, stables sur `--repeat-each=3` (60/60). Défaut trouvé et corrigé : l'accueil n'avait pas de repère `<main>` (`app/page.tsx`).
- [x] **B3 — Script `test`** unique dans `package.json` (lint + typecheck + build + e2e). Fini quand : une seule commande rejoue tout. Réf. : TESTING §6.
  - Preuve (2026-10-20) : `npm test` = `eslint` + `tsc --noEmit` + `next build` + `playwright test` → 20 passés, 0 échec, ≈ 12 s sur le Mac mini. `test-results/` et `playwright-report/` ignorés (`.gitignore`, `eslint.config.mjs`). Vitest non ajouté : choix d'outil toujours [À CONFIRMER] (item 13).

### C. Durcissement et conformité (voir `SECURITY.md`)
- [ ] **C1 — Sentry et RGPD** : décider si Sentry (Replay, `sendDefaultPii: true`) passe sous consentement ou est mentionné dans `/confidentialite` ; réduire `tracesSampleRate`. Fini quand : politique et configuration concordent. [À CONFIRMER : choix de Nadir]
- [ ] **C2 — Durées de conservation chiffrées** dans `/confidentialite` (aujourd'hui génériques). Fini quand : chaque traitement a une durée. [À CONFIRMER : durées]
- [x] **C3 — Corriger le commentaire obsolète** au-dessus de `CALENDLY_URL` (`config/site-content.ts`). Fini quand : commentaire exact. Fait le 2026-10-20 : le commentaire décrit le lien Calendly et ses usages ; `git diff` relu, lint, `tsc --noEmit` et build OK.
- [ ] **C4 — Ajouter `.mcp.json` à `.gitignore`** ou le versionner volontairement [À CONFIRMER].

### D. SEO/GEO hors page PLU (diagnostic 20/10, après A)
- [x] **D1** — Enrichir `/faisabilite-fonciere` avec « constructibilité / surface constructible ». Fini quand : vocabulaire présent dans H2/FAQ, build OK. Fait le 2026-10-20 : 2 H2 et 2 questions FAQ ajoutées, uniquement des affirmations prouvées en A2 ; lint, `tsc --noEmit` et build OK ; E2E Playwright non disponible (B2), remplacé par un contrôle du HTML pré-rendu (2 H2 et 2 `Question` JSON-LD contiennent « constructib »).
- [ ] **D2** — Mot « IA » visible sur l'accueil si conforme au positionnement [À CONFIRMER]. Fini quand : HTML brut de `/` contient « IA » hors scripts.
- [ ] **D3** — `sameAs` LinkedIn Fonciable dans `public/schema/organization.json` [À CONFIRMER URL].
- [ ] **D4** — Activer `preserveQuery` sur les CTA vers l'app [À CONFIRMER]. Fini quand : un clic depuis `/?utm_source=x` mène à `…/checkout/pro?utm_source=x`.

### E. Contenus SEO cœur (décision Nadir 20/10/2026)

Objectif et indicateur : PRD §4 « contenus SEO cœur » et §7 (top 10 Google France sur 5 requêtes au 20/01/2027). Règles communes à chaque étape : affirmations produit prouvées dans `sas-plu-3d` (commentaire d'en-tête du `content/*.ts`), aucun chiffre, prix, témoignage ou client inventé, exemples chiffrés étiquetés fictifs, jamais le nom de l'ancienne marque dans le texte visible, disclaimer « estimation, pas un certificat d'urbanisme ». Contrôle de fin d'étape : `npm run lint`, `npm run build`, `npx tsc --noEmit`, puis contrôle du HTML pré-rendu (`.next/server/app/<slug>.html` : H1, title, canonical, JSON-LD). Un commit par étape, doc et code ensemble. Tests : `TESTING.md` § 4 (lignes E0 à E7).

- [x] **E0 — Cadrage de la section E** (≤ 1 h). PRD (fonctionnalités, indicateur, hypothèse) et ce plan mis à jour. Fini quand : commit `docs:` poussé sur la branche. Réf. : PRD §4, §7.
- [x] **E1 — Optimiser `/bilan-promoteur`** pour « bilan promoteur » / « bilan promoteur excel » (≤ ½ j). H1, title, meta, section guide (méthode du compte à rebours, postes du bilan), FAQ, modèle XLSX réel téléchargeable (formules simples, exemple fictif étiqueté) ; retrait des affirmations sans preuve. Fini quand : H1/title/canonical/JSON-LD conformes dans le HTML pré-rendu, fichier XLSX servi en 200 et ouvert sans erreur. Réf. : TRD §2 (pages métier), §3 (contenu métier).
  - Preuve (2026-10-20) : H1 « Bilan promoteur : la méthode, les postes et un modèle Excel », title « Bilan promoteur : méthode, postes et modèle Excel | Fonciable », canonical `https://fonciable.fr/bilan-promoteur`, JSON-LD WebPage + BreadcrumbList + FAQPage (HTML pré-rendu `.next/server/app/bilan-promoteur.html`) ; `public/modeles/bilan-promoteur-exemple-fictif.xlsx` généré par `scripts/modele-bilan-promoteur.py`, recalculé par un lecteur indépendant (bibliothèque Python `formulas`) : charge foncière admissible 1 387 168 €, prix maximal 1 290 389 €, marge du bilan direct 14,07 %, identiques à la page ; affirmations sans preuve retirées (référence cadastrale saisie, stationnement exigé par le règlement) ; nouvelles affirmations prouvées en en-tête de `content/bilan-promoteur.ts` ; lint, build, `tsc --noEmit` OK ; `npm test` : 21 passés. Gabarit enrichi (sections optionnelles `guide`, `download`, `related`, `parent`).
- [ ] **E2 — Page `/charge-fonciere`** (≤ ½ j). Définition, calcul à rebours, charge foncière admissible, incidence foncière, exemple fictif. Fini quand : route statique ○, canonical exact, WebPage + BreadcrumbList + FAQPage. Réf. : TRD §2, APP_FLOW §1.
- [ ] **E3 — Page `/terrain-constructible`** (≤ ½ j). Savoir si un terrain est constructible : zone, règles, servitudes, réseaux, certificat d'urbanisme (art. L410-1). Fini quand : idem E2. Réf. : TRD §2, APP_FLOW §1.
- [ ] **E4 — Page `/division-parcellaire`** (≤ ½ j). Autorisations (DP, PA, R*421-19, R*421-23), R151-21, géomètre-expert ; ce que Fonciable fait (unité foncière, zones multiples) et ne fait pas (pas de découpage de lots). Fini quand : idem E2. Réf. : TRD §2, APP_FLOW §1.
- [ ] **E5 — `/zonage-plu` + `/zonage-plu/zone-u`, `zone-au`, `zone-a`, `zone-n`** (≤ ½ j). Définitions des art. R151-18 à R151-25 avec lien Légifrance ; UA, UB, AUa présentés comme des sous-secteurs propres à chaque PLU, sans règle chiffrée générale ; fil d'Ariane à 3 niveaux. Pas de page par commune. Fini quand : 5 routes statiques ○, BreadcrumbList 3 niveaux sur les pages de zone. Réf. : TRD §2, APP_FLOW §1 et §3.
- [ ] **E6 — Maillage et découverte** (≤ ½ j). Référentiel `config/solutions.ts` (guides et pages de zone), liens contextuels entre pages, sitemap, `public/llms.txt`, JSON-LD WebPage + BreadcrumbList + FAQPage sur chaque nouvelle page ; vers l'application uniquement via les CTA existants. Fini quand : sitemap = 16 URL, chaque nouvelle page reçoit au moins un lien interne, tests E2E verts. Réf. : APP_FLOW §3, TRD §7 (GEO).
- [ ] **E7 — IndexNow** (≤ 2 h). Clé publique `public/<clé>.txt` (32 hexadécimaux aléatoires) et `scripts/indexnow.mjs` qui soumet les URL du sitemap à `https://api.indexnow.org/indexnow` ; **non exécuté** (lancé par Nadir après mise en ligne) ; documenté dans TRD. Fini quand : `/<clé>.txt` servi en 200 avec la clé, `node --check scripts/indexnow.mjs` OK, mode `--dry-run` sans appel réseau. Réf. : TRD §5, §7.
