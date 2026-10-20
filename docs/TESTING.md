# TESTING — Landing Fonciable

> Rédigé le 2026-10-20. Dépend de `IMPLEMENTATION_PLAN.md`.

## 1. État réel (mis à jour le 2026-10-20, étapes B2/B3)

- **E2E Playwright en place** : `@playwright/test` (devDependency), Chromium seul (headless shell, contrainte disque), `playwright.config.ts`, specs dans `tests/e2e/`. 20 tests, tous verts. [Lu]
- **Commande unique** : `npm test` (lint + `tsc --noEmit` + build + e2e), voir §6. [Lu]
- **Pas de tests unitaires** : Vitest non installé, le choix d'outil reste **[À CONFIRMER]** (item 13 de `.cadrage-valide`). Les fonctions de `lib/` ne sont couvertes qu'indirectement par l'E2E (JSON-LD, sitemap, métadonnées).
- Pas de CI GitHub (`.github/` absent) : la commande tourne en local ; Vercel n'exécute que `next build`. [Lu]
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
3. Le JSON-LD de la page se parse (`JSON.parse` de chaque `script[type="application/ld+json"]`) et contient `SoftwareApplication` avec offers Starter (199) et Pro (599).
4. Sans consentement : aucun `script[src*="googletagmanager"]` ni `connect.facebook.net` dans le DOM.
5. Clic sur l'ancre « Tarifs » → la section `#tarifs` est dans la fenêtre ; 3 cartes (Starter, Pro, Entreprise) ; aucune carte « Découverte ».
6. Clic sur le CTA hero « Prendre rendez-vous » → une nouvelle page s'ouvre sur `https://calendly.com/nadir-lahyani-agentimpact/30min` (requête interceptée).
7. Retour, clic « Souscrire » (Pro) → navigation vers `https://app.fonciable.fr/checkout/pro` (interceptée).
8. Clic « Ouvrir l'application » (en-tête) → `https://app.fonciable.fr/dashboard` (intercepté).
9. Variante mobile (viewport 390×844) : ouverture du menu mobile, présence des liens Solutions et de l'app.
10. Variante `prefers-reduced-motion: reduce` : pas d'erreur console, contenu visible.

Scénarios complémentaires : `GET /page-inexistante` → 404 + meta `noindex` ; chaque page métier → 200, canonical auto-référent, fil d'Ariane ; `/sitemap.xml` contient toutes les URLs de `SOLUTION_PAGES` ; `/tarifs` → 308 vers `/#tarifs`.

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
| E6 Maillage | E2E : sitemap = accueil + toutes les pages du référentiel + 2 pages légales ; chaque guide relié depuis l'accueil ; `llms.txt` liste chaque nouvelle URL ; aucun texte visible ne contient « PLU-IA » ou « PLU IA » |
| E7 IndexNow | E2E : `/<clé>.txt` en 200 et contenu = clé ; `node --check scripts/indexnow.mjs` ; `node scripts/indexnow.mjs --dry-run` liste les URL sans appel réseau |

## 5. Données et comptes de test

- Aucun compte nécessaire (landing sans authentification).
- Aucune vraie donnée client ; les exemples de parcelle sur les pages métier sont étiquetés fictifs.
- IDs analytics laissés vides en test ; Calendly et `app.fonciable.fr` interceptés par Playwright.

## 6. Commande unique

```bash
npm test   # = npm run lint && npm run typecheck && npm run build && PW_SKIP_BUILD=1 playwright test
```

- Première installation du navigateur (≈ 200 Mo, Chromium headless shell seul) : `npx playwright install --only-shell chromium`.
- E2E seuls (reconstruit le site avant de lancer le serveur) : `npm run test:e2e`.
- Résultat au 2026-10-20 : **20 passés, 0 échec, ≈ 12 s** (dont build) ; stable sur `npx playwright test --repeat-each=3` (60/60).
- Rapports : `playwright-report/` et `test-results/` (traces en cas d'échec), non versionnés.
- Vitest (`vitest run`) s'ajoutera à la chaîne quand le choix d'outil sera confirmé.

## 7. Ce qui est couvert (au 2026-10-20)

| Fichier | Test | Couvre |
|---|---|---|
| `tests/e2e/parcours-principal.spec.ts` | §3.1 à §3.10 | accueil 200 + H1 + titre ; en-têtes CSP/HSTS/XFO/nosniff ; JSON-LD `SoftwareApplication` Starter 199 / Pro 599 ; aucun traceur sans consentement ; ancre Tarifs (3 offres, pas de Découverte, href des CTA) ; CTA hero → Calendly nouvel onglet ; Souscrire Pro → `/checkout/pro` ; Ouvrir l'application → `/dashboard` ; menu mobile 390×844 ; `prefers-reduced-motion` sans erreur JS ni console |
| `tests/e2e/seo.spec.ts` | Sitemap | 7 URLs (accueil, chaque `SOLUTION_PAGES`, 2 pages légales), sans doublon |
| | Chaque URL du sitemap | 200, H1 unique non vide, un seul `<main>`, canonical auto-référent, pas de `noindex`, chaque JSON-LD se parse (`@context` schema.org) |
| | Chaque page métier | `WebPage` (url exacte), `BreadcrumbList` (accueil → page, positions continues), `FAQPage` non vide ; liens vers les autres pages métier et l'accueil |
| | `/analyse-plu-parcelle` | H1 validé exact, « 44109000BZ0070 » visible, canonical, `index, follow` (A4) |
| | Maillage | `/` relie chaque page métier ; `/faisabilite-fonciere` relie `/analyse-plu-parcelle` (A5) |
| | 404 / redirections | URL inconnue → 404, page `not-found`, `noindex` ; `/tarifs`, `/tarif` → 308 `/#tarifs` |

Non couvert : tests unitaires de `lib/` [À CONFIRMER Vitest] ; cohérence prix `config/plans.ts` == `public/llms.txt` ; `/demonstration.html` ; consentement accordé (le CMP réel est bloqué) ; redirections par hôte (`plu-ia.agentimpact.fr`, `www`).

Défauts trouvés par ces tests :
- **Corrigé** (20/10) : l'accueil n'avait pas de repère `<main>` (les pages métier, légales et 404 l'ont) ; ajouté dans `app/page.tsx`, pied de page laissé hors de `<main>`. Test de non-régression : « un seul `<main>` » sur chaque URL du sitemap.
- **Signalé, non corrigé** : la page 404 hérite du canonical racine du layout (`<link rel="canonical" href="https://fonciable.fr">`) et porte deux `meta robots` (`noindex` ajouté par Next.js et `noindex, follow` de `app/not-found.tsx`). Signaux contradictoires (noindex + canonical vers l'accueil) à trancher par Nadir ; non testé pour ne pas bloquer `npm test`.
