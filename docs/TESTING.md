# TESTING — Landing Fonciable

> Rédigé le 2026-10-20. Dépend de `IMPLEMENTATION_PLAN.md`.

## 1. État réel aujourd'hui

- **Aucun test automatisé** : pas de dossier de tests, pas de Playwright/Vitest/Jest dans `package.json`, pas de script `test`, pas de CI GitHub (`.github/` absent). [Lu]
- Contrôles existants : `npm run lint` (ESLint 9, **passe** le 2026-10-20) et `npm run build` (typecheck TypeScript + pré-rendu ; exécuté aussi par Vercel à chaque déploiement). [Lu]
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

Pré-requis : `npm run build && npm run start` (port 3000), variables analytics **non définies** (aucun appel réel à Google/Meta), réseau sortant vers Calendly/app **intercepté** (`page.route`) — aucun vrai rendez-vous, aucune vraie souscription.

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

## 5. Données et comptes de test

- Aucun compte nécessaire (landing sans authentification).
- Aucune vraie donnée client ; les exemples de parcelle sur les pages métier sont étiquetés fictifs.
- IDs analytics laissés vides en test ; Calendly et `app.fonciable.fr` interceptés par Playwright.

## 6. Commande unique

Aujourd'hui (seul contrôle existant) :

```bash
npm run lint && npm run build
```

Cible après B3 (script à créer) :

```bash
npm test   # = eslint && tsc --noEmit && vitest run && next build && playwright test
```
