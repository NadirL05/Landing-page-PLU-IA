# TESTING — Landing Fonciable

> Rédigé le 2026-10-20. Dépend de `IMPLEMENTATION_PLAN.md`.

## 1. État réel (mis à jour le 2026-10-20, étapes B2/B3)

- **E2E Playwright en place** : `@playwright/test` (devDependency), Chromium seul (headless shell, contrainte disque), `playwright.config.ts`, specs dans `tests/e2e/`. 34 tests au 20/10/2026 après la section E (20 avant), tous verts. [Lu]
- **Commande unique** : `npm test` (lint + types de routes Next + `tsc --noEmit` + build Webpack + e2e), voir §6. [Lu]
- **Pas de tests unitaires** : Vitest non installé, le choix d'outil reste **[À CONFIRMER]** (item 13 de `.cadrage-valide`). Les fonctions de `lib/` ne sont couvertes qu'indirectement par l'E2E (JSON-LD, sitemap, métadonnées).
- **CI GitHub** (ajoutée le 2026-10-21, validée par Nadir) : `.github/workflows/ci.yml` rejoue la chaîne de `npm test` sur chaque pull request et chaque push sur `main` : `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build -- --webpack`, `npx playwright install --with-deps chromium`, puis `PW_SKIP_BUILD=1 npx playwright test` (Chromium seul). Node 24, cache npm, aucun secret ni variable d'environnement requis. Rapport Playwright publié en artefact en cas d'échec. Vercel continue de n'exécuter que `next build`.
- Garde-fous au build : `structuredPrice` (`app/page.tsx`) lève une erreur si un prix Starter/Pro n'a pas de nombre ; le typage `MetierPageContent` bloque un contenu incomplet. [Lu]
- Vérifications manuelles passées documentées dans `CLAUDE.md` (inspection DOM du CMP, audit SEO du 21/08).

## 2. Stratégie cible

| Niveau | Outil | Ce qu'on teste |
|---|---|---|
| Statique | ESLint + `tsc --noEmit` | code et contrats de contenu |
| Unitaire | Vitest **[À CONFIRMER : choix d'outil]** | fonctions pures : `withCurrentQuery`, `escapeForScriptTag` (JsonLd), `buildBreadcrumbSchema`, `buildWebPageSchema`, `structuredPrice`, `readConsentState`, `sitemap()` |
| Cohérence de contenu | Vitest | prix de `config/plans.ts` == `public/llms.txt` == JSON-LD offers ; chaque `SOLUTION_PAGES.slug` a un `content/*.ts` et un `app/<slug>/page.tsx` |
| Build | `next build` | toutes les routes pré-rendues en statique |
| E2E | Playwright (Chromium) sur `next start` | parcours principal, 404, en-têtes, consentement |

Couverture visée : 100 % des fonctions de `lib/` et de `components/JsonLd.tsx` ; 1 scénario E2E par parcours d'APP_FLOW §2-3. Pas de seuil global de couverture (site majoritairement statique). **[À CONFIRMER]**

## 3. Scénario E2E du parcours principal (Playwright)

Pré-requis (automatisés par `playwright.config.ts`) : `npm run build` puis `next start` sur **127.0.0.1:3107** (port dédié, jamais un serveur déjà lancé), variables analytics **vidées** (aucun appel réel à Google/Meta). Isolation réseau dans `tests/e2e/fixtures.ts` : Calendly et `app.fonciable.fr` reçoivent une réponse simulée (on vérifie l'URL atteinte, aucun vrai rendez-vous ni checkout) ; tout autre hôte externe (GA, Meta, CMP consentmanager, Sentry) et le tunnel `/monitoring` sont bloqués.

1. `GET /` → statut 200 ; `<h1>` visible ; `<title>` contient « Fonciable ».
2. Les en-têtes de réponse contiennent `content-security-policy`, `strict-transport-security`, `x-frame-options: DENY`.
3. Le JSON-LD de la page se parse (`JSON.parse` de chaque `script[type="application/ld+json"]`) et contient `SoftwareApplication` avec exactement 3 offers (Starter 79, Pro 199, Entreprise) et aucune offre à 0.
4. Sans consentement : aucun `script[src*="googletagmanager"]` ni `connect.facebook.net` dans le DOM.
5. Clic sur l'ancre « Tarifs » → la section `#tarifs` est dans la fenêtre ; 3 cartes (Starter, Pro, Entreprise) ; aucune carte « Découverte » ni mention « gratuit » (offre gratuite retirée le 21/10/2026) ; mention « Prix nets — TVA non applicable, article 293 B du code général des impôts. » visible, aucune mention « hors taxes » / « TVA 20 % » sur la page (franchise en base confirmée le 24/10/2026).
6. Clic sur le CTA hero « Prendre rendez-vous » → une nouvelle page s'ouvre sur `https://calendly.com/nadir-lahyani-agentimpact/30min` (requête interceptée).
7. Retour, clic « Souscrire » (Pro) → navigation vers `https://app.fonciable.fr/checkout/pro` (interceptée).
8. Clic « Ouvrir l'application » (en-tête) → `https://app.fonciable.fr/dashboard` (intercepté).
9. Variante mobile (viewport 390×844) : ouverture du menu mobile, présence des liens Solutions et de l'app.
10. Variante `prefers-reduced-motion: reduce` : pas d'erreur console, contenu visible.

Scénarios complémentaires : `GET /page-inexistante` → 404 + meta `noindex` ; chaque page métier → 200, canonical auto-référent, fil d'Ariane ; `/sitemap.xml` contient toutes les URLs de `SOLUTION_PAGES` ; `/tarifs` → 308 vers `/#tarifs` ; `/demonstration.html` et `/demonstration/*` → 308 vers `/`.

## 4. Tests par étape du plan

| Étape | Test(s) |
|---|---|
| Existant (socle, contenus, parcours) | Scénario E2E §3 + tests unitaires §2 (à écrire en B2) |
| A1 Brief | Revue humaine : validation explicite de Nadir (pas de test automatisé) |
| A2 Affirmations | Revue : chaque affirmation de `content/analyse-plu-parcelle.ts` a un fichier de preuve en commentaire |
| A3 Contenu | `npx tsc --noEmit` ; test unitaire « aucun champ vide » sur le contenu |
| A4 Route | `npm run build` (route ○ statique) ; E2E : `GET /analyse-plu-parcelle` 200, `<h1>` attendu, canonical exact, `meta robots` indexable |
| A5 Maillage | Unitaire : `sitemap()` contient l'URL ; E2E : lien présent sur `/` (bloc Solutions) et `/faisabilite-fonciere` |
| A6 GEO | Unitaire : `public/llms.txt` contient l'URL ; E2E : JSON-LD de la page parse et contient `WebPage`, `BreadcrumbList`, `FAQPage` |
| A7 Recette | Commande unique §6 verte + Rich Results Test (manuel, capture jointe) |
| B1 Next | `npm audit --audit-level=critical` code retour 0 + commande unique |
| B2 / B3 | La commande unique tourne en local |
| C1 / C2 | Revue : texte de `/confidentialite` concorde avec la config Sentry/CMP |
| C3 / C4 | `git diff` relu |
| D1-D4 | E2E ciblé (vocabulaire présent, `utm_*` transmis pour D4) |
| E0 Cadrage SEO cœur | Revue : PRD §4/§7 et plan § E cohérents (pas de test automatisé) |
| E1 `/bilan-promoteur` | E2E (`tests/e2e/seo-coeur.spec.ts`) : H1 et title attendus, lien vers `/modeles/bilan-promoteur-exemple-fictif.xlsx` servi en 200 (type XLSX) ; build + contrôle du HTML pré-rendu ; ouverture du XLSX par un lecteur indépendant (formules présentes, aucune erreur de calcul) |
| E2 `/charge-fonciere` | E2E : 200, H1, canonical, WebPage + BreadcrumbList + FAQPage, lien vers `/bilan-promoteur` |
| E3 `/terrain-constructible` | E2E : idem, lien Légifrance L410-1, lien vers `/zonage-plu` |
| E4 `/division-parcellaire` | E2E : idem, liens Légifrance R151-21 et service-public |
| E5 `/zonage-plu` et 4 pages de zone | E2E : 5 pages en 200, lien Légifrance de l'article R151-xx attendu sur chaque page de zone, BreadcrumbList à 3 niveaux (accueil → zonage PLU → zone), liens entre pages de zone |
| E6 Maillage | E2E : sitemap = accueil + toutes les pages du référentiel + 2 pages légales ; chaque guide relié depuis l'accueil ; `llms.txt` liste chaque nouvelle URL ; aucun texte de `<main>` ne contient « PLU-IA » ou « PLU IA » ; depuis le 21/10, le pied de page non plus (« Édité par AgentImpact ») |
| E7 IndexNow | E2E : `/<clé>.txt` en 200 et contenu = clé ; `node --check scripts/indexnow.mjs` ; `node scripts/indexnow.mjs --dry-run` liste les URL sans appel réseau |
| J1 `/surface-de-plancher` | E2E (`seo-coeur.spec.ts`, `checkArticle`) : 200, H1, canonical, WebPage + BreadcrumbList + FAQPage + Article (headline = H1, dates ISO), liens Légifrance L111-14 et R111-22, service-public F2868, `/analyse-plu-parcelle`, `/charge-fonciere`, mention « Exemple fictif » ; lien entrant depuis `/bilan-promoteur`, `/charge-fonciere`, `/faisabilite-fonciere` ; contrôles génériques sitemap (title ≤ 60, meta ≤ 155, pas de tiret cadratin, pas d'ancien nom) |
| J2 `/emprise-au-sol` | E2E : idem J1 ; liens Légifrance R*420-1 et R151-39, service-public F2868, `/surface-de-plancher` ; liens entrants depuis `/surface-de-plancher`, `/zonage-plu/zone-u`, `/terrain-constructible` ; mention « Exemple fictif » |
| I1/I2 Badge La Fabrique du Net | E2E (`tests/e2e/badge-lafabriquedunet.spec.ts`, script tiers simulé dans `fixtures.ts`, consentement simulé par une entrée Consent Mode v2 dans `dataLayer`) : origine dans `script-src` et dans aucune autre directive ; sans consentement, aucun script ni requête lafabriquedunet.fr et lien texte ≥ 24 px ; avec consentement, un seul lien vers la fiche dans le pied de page, cible ≥ 24 px, conteneur de 54 px ; toujours un seul badge et un seul script après navigation client et retour. Mesure ponctuelle hors `npm test` : vrai `badge.js` servi localement + axe-core (`target-size`, `link-name`) |

## 5. Données et comptes de test

- Aucun compte nécessaire (landing sans authentification).
- Aucune vraie donnée client ; les exemples de parcelle sur les pages métier sont étiquetés fictifs.
- IDs analytics laissés vides en test ; Calendly et `app.fonciable.fr` interceptés par Playwright.

## 6. Commande unique

```bash
npm test   # = lint + next typegen/tsc + next build --webpack + Playwright
```

- Première installation du navigateur (≈ 200 Mo, Chromium headless shell seul) : `npx playwright install --only-shell chromium`.
- E2E seuls (reconstruit le site avant de lancer le serveur) : `npm run test:e2e`.
- Résultat au 2026-10-20 : **20 passés, 0 échec, ≈ 12 s** (dont build) ; stable sur `npx playwright test --repeat-each=3` (60/60).
- Résultat après la section E (branche `feat/seo-pages-coeur`, 2026-10-20) : **34 passés, 0 échec** (`npm test`).
- Résultat après le retrait de l'offre gratuite (branche `fix/retirer-offre-decouverte`, 2026-10-21, avec la mention TVA) : **40 passés, 0 échec** (`npm test`).
- Hors `npm test` (section E) : `node --check scripts/indexnow.mjs` et `node scripts/indexnow.mjs --dry-run --sitemap=.next/server/app/sitemap.xml.body` (aucun appel réseau) ; recalcul du modèle XLSX par un lecteur indépendant (bibliothèque Python `formulas`, environnement jetable).
- Rapports : `playwright-report/` et `test-results/` (traces en cas d'échec), non versionnés.
- Vitest (`vitest run`) s'ajoutera à la chaîne quand le choix d'outil sera confirmé.

## 7. Ce qui est couvert (au 2026-10-20)

| Fichier | Test | Couvre |
|---|---|---|
| `tests/e2e/parcours-principal.spec.ts` | §3.1 à §3.10 | accueil 200 + H1 + titre ; en-têtes CSP/HSTS/XFO/nosniff ; JSON-LD `SoftwareApplication` Starter 79 / Pro 199 ; aucun traceur sans consentement ; ancre Tarifs (3 offres, pas de Découverte, href des CTA) ; CTA hero → Calendly nouvel onglet ; Souscrire Pro → `/checkout/pro` ; Ouvrir l'application → `/dashboard` ; menu mobile 390×844 ; `prefers-reduced-motion` sans erreur JS ni console |
| `tests/e2e/seo.spec.ts` | Sitemap | 7 URLs (accueil, chaque `SOLUTION_PAGES`, 2 pages légales), sans doublon |
| | Chaque URL du sitemap | 200, H1 unique non vide, un seul `<main>`, canonical auto-référent, pas de `noindex`, chaque JSON-LD se parse (`@context` schema.org), title ≤ 60 caractères (suffixe « | Fonciable » compris), meta description non vide et ≤ 155 (depuis le 21/10/2026) |
| | Chaque page métier | `WebPage` (url exacte), `BreadcrumbList` (accueil → page, positions continues), `FAQPage` non vide ; liens vers les autres pages métier et l'accueil |
| | `/analyse-plu-parcelle` | H1 validé exact, « 44109000BZ0070 » visible, canonical, `index, follow` (A4) |
| | Maillage | `/` relie chaque page métier ; `/faisabilite-fonciere` relie `/analyse-plu-parcelle` (A5) |
| | 404 / redirections | URL inconnue → 404, page `not-found`, `noindex` ; `/tarifs`, `/tarif` → 308 `/#tarifs` ; `/demonstration.html`, `/demonstration/video.mp4` → 308 `/` |

| `tests/e2e/seo-coeur.spec.ts` | E1 | `/bilan-promoteur` : H1, title, canonical, lien et fichier XLSX (200, type spreadsheetml, signature ZIP), mention « Exemple fictif » |
| | E2-E4 | `/charge-fonciere`, `/terrain-constructible`, `/division-parcellaire` : H1, canonical, WebPage + BreadcrumbList + FAQPage, disclaimer « certificat d'urbanisme », liens Légifrance / service-public attendus, liens internes |
| | E5 | `/zonage-plu` et 4 pages de zone : H1, article Légifrance de chaque zone, fil d'Ariane accueil → Zonage PLU → zone, liens entre zones |
| | E6 | accueil et pied de page → chaque guide ; `/zonage-plu` → chaque zone ; chaque page éditoriale reçoit au moins un lien interne ; `llms.txt` liste chaque page et le XLSX ; aucun « PLU-IA » dans `<main>` ; aucun tiret cadratin sur les pages § E |
| | E7 | `/<clé IndexNow>.txt` en 200, contenu = clé |
| `tests/e2e/badge-lafabriquedunet.spec.ts` | I1/I2 | CSP (`script-src` seul) ; sans consentement : aucun script ni requête lafabriquedunet.fr, lien texte seul ; avec consentement : badge unique dans le pied de page, cible ≥ 24 px, conteneur de 54 px, pas de doublon après navigation client (21/10/2026 : `npm test` = **40 passés, 0 échec**). Contrôle ponctuel avec le vrai `badge.js` : 0 requête sans consentement, 1 avec, aucune erreur console ni d'hydratation |
| `tests/e2e/seo.spec.ts` (mis à jour) | Sitemap | accueil + `ALL_EDITORIAL_PAGES` (13) + 2 légales = 15 URL ; chaque URL : 200, H1 unique, canonical, indexable, JSON-LD valide |

Non couvert : tests unitaires de `lib/` [À CONFIRMER Vitest] ; cohérence prix `config/plans.ts` == `public/llms.txt` ; consentement accordé (le CMP réel est bloqué) ; redirections par hôte (`plu-ia.agentimpact.fr`, `www`).

Défauts trouvés par ces tests :
- **Corrigé** (20/10) : l'accueil n'avait pas de repère `<main>` (les pages métier, légales et 404 l'ont) ; ajouté dans `app/page.tsx`, pied de page laissé hors de `<main>`. Test de non-régression : « un seul `<main>` » sur chaque URL du sitemap.
- **Signalé, non corrigé** : la page 404 hérite du canonical racine du layout (`<link rel="canonical" href="https://fonciable.fr">`) et porte deux `meta robots` (`noindex` ajouté par Next.js et `noindex, follow` de `app/not-found.tsx`). Signaux contradictoires (noindex + canonical vers l'accueil) à trancher par Nadir ; non testé pour ne pas bloquer `npm test`.

## Démonstration Fonciable — H1/H2

La commande unique reste `npm test`. Le test E2E de retrait F7 est remplacé par : page en 200, H1 Fonciable, absence de l’ancien nom, lecteur avec métadonnées chargées et durée 41–43 s, Range MP4 en 206/type `video/mp4`/signature `ftyp`, VTT valide et médias/fonts en 200. Données : captures de test du 18 octobre, simulations hypothétiques ; aucun accès à un compte ni envoi externe. QA séparée : FFprobe, mesure FFmpeg loudnorm, six images décodées à 3/9/17/25/33/41,7 s. Les cases H1/H2 ne sont cochées qu’après succès.

### Exécution sur une copie neuve

`typecheck` génère les types de routes avec `next typegen` avant TypeScript, car `LayoutProps` n’existe pas encore dans une copie sans `.next`. La commande unique `npm test` construit avec Webpack : Turbopack tente de créer un processus qui ouvre un port et échoue avec EPERM sur ce Mac. `npm run build` reste inchangé pour le déploiement Vercel ; aucun fallback de production ajouté.

Résultat H1/H2 le 21/10 : **`npm test` complet réussi, 36 tests Playwright passés (0 échec)**. Audit : 0 critique. QA média : −14,57 LUFS, −1,36 dBTP. Le moteur Webpack concerne la recette, pas le script `build` de Vercel.
