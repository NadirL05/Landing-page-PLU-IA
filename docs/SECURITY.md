# SECURITY — Landing Fonciable

> Rédigé le 2026-10-20. Une case n'est cochée qu'avec une preuve (fichier ou commande) indiquée à côté. Les points non applicables sont marqués « N/A » avec la raison, jamais supprimés.
> Rappel porte de production (AGENTS.md §8) : aucun nouveau déploiement en production sans accord explicite de Nadir.

## Checklist

- [x] **Aucun secret dans le code, l'historique git ou le bundle front ; `.env*` dans `.gitignore`.**
  Preuves : `.gitignore` contient `.env*` et `.vercel` ; `git ls-files | grep -i .env` → vide ; `git log -p --all | grep -E "sk_(live|test)_|whsec_|AKIA|sntrys_|ghp_|BEGIN … PRIVATE KEY"` → aucune correspondance (2026-10-20). Le DSN Sentry codé en dur (`instrumentation-client.ts`, `sentry.*.config.ts`) est public par conception, ce n'est pas un secret.
  Réserve : `.mcp.json` est non suivi **et non ignoré** ; il ne contient qu'une référence `${API_KEY_21ST}` (pas de valeur) — à ignorer ou versionner volontairement (plan C4).

- [x] **Seules les clés publiques sont exposées côté client.**
  Preuve : `grep -rn "process\.env"` → seules `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_META_PIXEL_ID` (identifiants publics par nature) sont lues côté client ; aucune autre variable `NEXT_PUBLIC_*`.

- [ ] **N/A — Toutes les entrées validées côté serveur (Zod ou équivalent).**
  Raison : la landing ne reçoit aucune entrée utilisateur côté serveur (aucun formulaire, aucune route POST applicative, aucun paramètre d'URL rendu dans le HTML — `components/JsonLd.tsx`, `app/confidentialite/page.tsx`). Seule entrée lue : la query string côté client, filtrée par liste blanche dans `lib/analytics.ts` (`ALLOWED_QUERY_PARAMS`). Redevient applicable si un formulaire est ajouté.

- [ ] **N/A — Contrôle d'accès vérifié côté serveur sur chaque route ; RLS sur toutes les tables Supabase.**
  Raison : aucune route privée, aucune authentification, aucune base de données ni Supabase dans ce dépôt (`package.json`, absence de middleware). Le contrôle d'accès relève de `sas-plu-3d`.

- [x] **Messages d'erreur génériques côté utilisateur ; détails techniques uniquement dans les logs.**
  Preuve : `app/global-error.tsx` affiche « Une erreur est survenue » sans stack et envoie l'exception à Sentry ; `app/not-found.tsx` message générique ; `curl -sI https://fonciable.fr/inexistant` → 404.

- [ ] **N/A — Rate limiting sur connexion, inscription, réinitialisation, OTP et endpoints coûteux.**
  Raison : aucun de ces endpoints n'existe ici (pas d'auth, pas de LLM, voix, SMS ni e-mail). Point de vigilance : le tunnel Sentry `/monitoring` (`next.config.ts`) relaie des événements vers Sentry et peut consommer le quota Sentry ; `curl -X POST https://fonciable.fr/monitoring` renvoie 404 le 2026-10-20 → configuration effective du tunnel **[À CONFIRMER]**. La protection DDoS/WAF repose sur Vercel (non vérifiée).

- [ ] **N/A — Signature vérifiée sur chaque webhook entrant.**
  Raison : aucun webhook entrant dans ce dépôt (Stripe et ses webhooks sont dans `sas-plu-3d`, `CLAUDE.md`).

- [x] **En-têtes de sécurité (CSP, HSTS) ; cookies `HttpOnly`, `Secure`, `SameSite`.**
  Preuves : `next.config.ts` (`headers()` sur `/:path*`) ; `curl -sI https://fonciable.fr` le 2026-10-20 renvoie `content-security-policy` (default-src 'self', frame-src 'none', object-src 'none'…), `strict-transport-security: max-age=31536000; includeSubDomains; preload`, `x-frame-options: DENY`, `x-content-type-options: nosniff`, `referrer-policy`, `permissions-policy`. Cookies : la landing n'émet aucun `Set-Cookie` côté serveur (`curl -sI` sur `/` et `/bilan-promoteur`) → N/A pour les attributs serveur ; les cookies tiers (CMP, GA, Meta) ne sont pas contrôlables ici.
  Réserves connues et assumées : `script-src 'unsafe-inline'` (pas de nonce sans middleware, commentaire `next.config.ts`) ; `style-src 'unsafe-inline'`.

- [x] **`npm audit` (ou équivalent) sans vulnérabilité critique.**
  Preuve (2026-10-20, après B1) : `npm audit --audit-level=critical` → code de sortie 0 ; **0 critique, 5 hautes**.
  - Corrigé : `next` 16.3.1 → **16.4.2** (RCE `next/og`, RCE/SSRF Image Optimization, empoisonnement de cache) ; `eslint-config-next` → 16.4.2 ; `npm audit fix` sans `--force` pour `brace-expansion`, `fast-uri`, `js-yaml`, `sharp`, `source-map-js`.
  - Restant (5 hautes, outillage de lint en dev uniquement, absent du bundle) : `eslint-config-next`, `@next/eslint-plugin-next`, `braces`, `fast-glob`, `micromatch`. Seul correctif proposé : rétrograder `eslint-config-next` en 14.x (incompatible Next 16) → accepté en l'état, à revoir à la prochaine version d'`eslint-config-next`.
  - Vérification : `npm run lint`, `tsc --noEmit`, `npm run build` OK ; `next start` local : `/`, `/opengraph-image` (image/png), `/faisabilite-fonciere`, `/llms.txt`, `/sitemap.xml` en 200.

- [ ] **RGPD : données collectées listées, durée de conservation, mentions présentes.** — **PARTIEL**
  Présent : `app/mentions-legales/page.tsx` (éditeur, SIREN, hébergeur) ; `app/confidentialite/page.tsx` (responsable, données, finalités et bases légales, prestataires Vercel/consentmanager/Google/Meta, droits, CNIL, cookies) ; CMP consentmanager + `ConsentGate` fail closed (`components/analytics/consent-gate.tsx`) ; GA4/Meta montés seulement après consentement.
  Manquant :
  1. **Sentry** n'est ni listé dans la politique de confidentialité ni soumis au consentement, alors qu'il est configuré avec `sendDefaultPii: true` et Session Replay (10 % des sessions, 100 % des erreurs) dans `instrumentation-client.ts` → à arbitrer (plan C1) **[À CONFIRMER]**.
  2. Durées de conservation non chiffrées (« durée nécessaire », « durées configurées dans le CMP ») → plan C2 **[À CONFIRMER : durées]**.
  3. Transferts hors UE (Vercel Inc., Google, Meta) mentionnés de façon générique ; garanties précises **[À CONFIRMER]**.

## Synthèse

| Statut | Points |
|---|---|
| Cochés avec preuve (5) | secrets/.gitignore · clés publiques seules · erreurs génériques · en-têtes CSP/HSTS (+ cookies N/A côté serveur) · `npm audit` sans critique (B1) |
| Non cochés (1) | RGPD (partiel : Sentry, durées) |
| N/A justifiés (4) | validation serveur · contrôle d'accès/RLS · rate limiting · signature webhooks |

Vulnérabilité critique `next` corrigée par B1 (2026-10-20). Recommandé ensuite : C1 (Sentry/RGPD).

## Démonstration — contrôle du 21 octobre

La nouvelle page HTML et ses médias sont autonomes : pas de script, de traceur, de formulaire ou de ressource tierce. Preuves : `public/demonstration.html`, assets locaux, E2E de la démonstration ; QA média et hash dans `PREUVES-demonstration-video.md`. `npm audit --audit-level=critical` du 21/10 sort en 0 (0 critique, 5 hautes de développement inchangées). Aucun des trois arbitrages RGPD ci-dessus n’est marqué résolu par ce changement ; ils bloquent toujours la fusion/déploiement de production selon la règle du propriétaire.

## Exception explicite pour cette tâche — 21 octobre 2026

Après présentation du blocage, Nadir a écrit exactement « skip docs pour cette tâche » dans le chat. L’exception est limitée au remplacement de la démonstration vidéo (PR #34) ; son accord de déploiement était déjà enregistré. Les choix Sentry/RGPD existants ne sont pas déclarés résolus et aucune case de conformité n’est cochée par dérogation.
