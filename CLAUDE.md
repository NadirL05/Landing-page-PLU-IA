# CLAUDE.md — Landing-page-PLU-IA

Landing marketing seule pour PLU IA. Next.js App Router, TypeScript, Tailwind v4.

## Split landing/outil

- Ce repo = landing seule, cible `plu-ia.agentimpact.fr`.
- Outil réel = `NadirL05/sas-plu-3d`, migré vers `app-plu-ia.agentimpact.fr` (Stripe webhooks + Clerk redirect URLs à mettre à jour là-bas, pas ici).
- **Source de vérité prix/quotas/Stripe** = `sas-plu-3d/src/config/plans.ts`. Ce repo n'a que des copies d'affichage (`config/plans.ts`, `config/brand.ts`) — toute modification de prix doit être répercutée dans les deux repos.
- Pas de Clerk ici : `HeaderAuthActions`/`MobileNav` sont statiques, tous les CTA pointent vers `APP_URL` (`app-plu-ia.agentimpact.fr`).

## Piège résolu : env var Vercel avec retour à la ligne = SyntaxError silencieux

Le 21/08, `NEXT_PUBLIC_GA_MEASUREMENT_ID` avait été posé sur Vercel avec un `\n` de fin embarqué dans la valeur (probablement collé avec un Entrée en trop). Ce `\n` atterrissait tel quel dans le literal `gtag('config', '...')` du composant `GoogleTag` — un retour à la ligne brut dans une string JS entre quotes simples est un `SyntaxError`, qui cassait le `<Script>` à *chaque* chargement, en prod uniquement (jamais repro en local car la variable n'y était simplement pas définie). Aucune violation CSP, gtag.js se chargeait bien (200) — seul `window.gtag` restant `undefined` malgré un `dataLayer` peuplé trahissait le problème. Corrigé par un `.trim()` défensif dans `components/analytics/google-tag.tsx` et `meta-pixel.tsx`, plus la valeur re-posée proprement. (Une piste "Turbopack casse le chunk R3F" a été explorée et écartée — fausse piste, cf. historique de commits du 21/08.)

## RÉSOLU — CMP consentmanager.net bloquait Meta Pixel en permanence (21/08)

Root cause réelle, confirmée par inspection DOM live (pas par théorie) : le loader
"automatic blocking" (`/delivery/autoblocking/a9d3fcbcd2398.js`) intercepte tout `<script>`
inséré dans le DOM et le neutralise (classe `cmplazyload`, `data-cmp-src` au lieu de `src`)
tant qu'il n'a pas explicitement "libéré" ce script. Le snippet Meta Pixel crée son propre
`<script src=fbevents.js>` dynamiquement via `document.createElement` (pas dans le HTML
source) — leur intercepteur l'attrape mais ne le libère JAMAIS, même après consentement
pleinement accordé (`cmp_s1`/`cmp_purpose_c5x` tous "granted" dans le dataLayer). Confirmé :
4 tentatives de fix dashboard (finalité, mode de consentement Facebook, confirmation domaine
`connect.facebook.net`) sur plusieurs heures, dataLayer strictement identique à chaque fois —
ce n'était pas un délai de propagation CDN, c'était l'automatic blocking qui ne marche
structurellement pas avec un script inséré dynamiquement (leur doc l'exige d'être le
tout premier `<script>` du document, impossible sous Next.js App Router — confirmé
structurellement impossible dès le premier diagnostic).

**Fix appliqué (21/08 soir)** : remplacé le loader autoblocking par le loader
**semi-automatique** (`/delivery/js/semiautomatic.min.js`, `data-cmp-codesrc="0"` au lieu de
`"16"`), même `cmpId`/`cdid` (`a9d3fcbcd2398`). Ce mode affiche juste la bannière et expose
`__tcfapi` / pousse les signaux Consent Mode v2 dans le dataLayer — aucune interception DOM.
On n'en a pas besoin : `ConsentGate` fait déjà tout le gating nous-mêmes via le dataLayer.
Appliqué identiquement sur les 3 repos (même CMP `agentimpact.fr` partagé) : commits
`4b10ac7` (plu-ia), `9d26515` (hostia), `36611f3` (hector).

**Vérifié live post-déploiement** : `window.fbq.callMethod` = function (plus `undefined`),
`fbevents.js` charge avec un `src` normal (plus de `cmplazyload`), requêtes réseau
`connect.facebook.net/signals/config/...` et `facebook.com/tr/?ev=PageView` en 200.
Sujet clos, plus rien à retester.

## Ce qui n'est pas encore fait

- Confirmer via check headless (Playwright, pas WebFetch) que les routes authentifiées de `app-plu-ia.agentimpact.fr` (Clerk) sont bien en `noindex` et ne dupliquent pas les metadata de cette landing.

## Fait

- Domaine `plu-ia.agentimpact.fr` attaché à ce projet Vercel — confirmé (sitemap.xml live sert bien cette landing, plus l'outil).
- Audit SEO/GEO technique passé le 21/08/2026 : OG/Twitter image ajoutée (`app/opengraph-image.tsx`), `lastModified` posé sur le sitemap. Aucun blocage CRITICAL trouvé.
