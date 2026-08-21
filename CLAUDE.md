# CLAUDE.md — Landing-page-PLU-IA

Landing marketing seule pour PLU IA. Next.js App Router, TypeScript, Tailwind v4.

## Split landing/outil

- Ce repo = landing seule, cible `plu-ia.agentimpact.fr`.
- Outil réel = `NadirL05/sas-plu-3d`, migré vers `app-plu-ia.agentimpact.fr` (Stripe webhooks + Clerk redirect URLs à mettre à jour là-bas, pas ici).
- **Source de vérité prix/quotas/Stripe** = `sas-plu-3d/src/config/plans.ts`. Ce repo n'a que des copies d'affichage (`config/plans.ts`, `config/brand.ts`) — toute modification de prix doit être répercutée dans les deux repos.
- Pas de Clerk ici : `HeaderAuthActions`/`MobileNav` sont statiques, tous les CTA pointent vers `APP_URL` (`app-plu-ia.agentimpact.fr`).

## Piège résolu : env var Vercel avec retour à la ligne = SyntaxError silencieux

Le 21/08, `NEXT_PUBLIC_GA_MEASUREMENT_ID` avait été posé sur Vercel avec un `\n` de fin embarqué dans la valeur (probablement collé avec un Entrée en trop). Ce `\n` atterrissait tel quel dans le literal `gtag('config', '...')` du composant `GoogleTag` — un retour à la ligne brut dans une string JS entre quotes simples est un `SyntaxError`, qui cassait le `<Script>` à *chaque* chargement, en prod uniquement (jamais repro en local car la variable n'y était simplement pas définie). Aucune violation CSP, gtag.js se chargeait bien (200) — seul `window.gtag` restant `undefined` malgré un `dataLayer` peuplé trahissait le problème. Corrigé par un `.trim()` défensif dans `components/analytics/google-tag.tsx` et `meta-pixel.tsx`, plus la valeur re-posée proprement. (Une piste "Turbopack casse le chunk R3F" a été explorée et écartée — fausse piste, cf. historique de commits du 21/08.)

## BLOQUANT dashboard consentmanager.net (21/08) — root cause trouvée, propagation en cours

Chaîne complète des causes trouvées et corrigées ce jour, dans l'ordre :

1. **Finalité non assignée** : le fournisseur "Facebook (Meta)" (s7) et "Google Analytics" (s26, à créer)
   n'avaient pas de finalité (`Select value`) → assignés à Marketing / Mesure respectivement.
2. **"Mode de consentement Facebook" désactivé** : section Intégrations → Mode de consentement — un toggle
   séparé du mapping fournisseur→finalité, qui pilote réellement l'émission des signaux Consent Mode v2.
   Google était déjà activé, Facebook non → activé.
3. **Root cause réelle (trouvée après recherche web + doc officielle consentmanager.net)** : le domaine
   `connect.facebook.net`, auto-détecté sur le site, restait dans **Fournisseurs → Domaines → "Domaines non
   attribués"** — jamais formellement confirmé/rattaché au fournisseur "Facebook (Meta)" malgré ce dernier
   correctement configuré. Tant qu'un domaine reste dans cette file, le "automatic blocking" le bloque en
   dur, indépendamment de tout mapping de finalité. **Confirmé via leur doc officielle** (causes de blocage
   permanent : "the corresponding vendor hasn't been assigned to any purpose" / "domain marked as Ignore in
   vendor assignment") : https://www.consentmanager.net/en/books/cmp/page/automatic-blocking-of-codes-and-cookies
   — fixé en cliquant "Confirmer le fournisseur" sur ce domaine.
4. **Défense en profondeur côté code** : `data-cmp-ab="1"` ajouté sur les `<Script>` GoogleTag/MetaPixel
   (commit 8a6de04) pour les exclure explicitement du automatic blocking, en plus du fix dashboard — pattern
   documenté officiellement pour les tags Google Tag Manager, applicable ici aussi. Ne suffit pas seul (le
   script enfant `fbevents.js` créé dynamiquement par le snippet n'hérite pas de l'attribut du wrapper), mais
   reste une bonne pratique de robustesse.

**État au soir du 21/08** : les 3 causes ci-dessus sont corrigées côté dashboard + code, mais la propagation
CDN de consentmanager.net (script `cmp_final.min.js`) dépasse largement le "court délai" qu'ils annoncent —
toujours `fbq.callMethod === undefined` après plusieurs heures et relances manuelles. **Retester demain matin**
avec le même protocole (purger cookies `*cmp*`/`*consent*`, reload, cliquer "Tout accepter", vérifier
`window.fbq.callMethod` + requêtes réseau `facebook.net`/`facebook.com/tr`) avant de creuser plus loin — si
toujours bloqué demain, contacter le support consentmanager.net directement plutôt que retenter côté config.

Le code (`consent-gate.tsx`, `google-tag.tsx`, `meta-pixel.tsx`) est vérifié correct de bout en bout — la
gate s'ouvre/ferme comme prévu selon le dataLayer. Rien à modifier ici, le problème est 100% côté propagation
consentmanager.net à ce stade.

## Ce qui n'est pas encore fait

- Confirmer via check headless (Playwright, pas WebFetch) que les routes authentifiées de `app-plu-ia.agentimpact.fr` (Clerk) sont bien en `noindex` et ne dupliquent pas les metadata de cette landing.

## Fait

- Domaine `plu-ia.agentimpact.fr` attaché à ce projet Vercel — confirmé (sitemap.xml live sert bien cette landing, plus l'outil).
- Audit SEO/GEO technique passé le 21/08/2026 : OG/Twitter image ajoutée (`app/opengraph-image.tsx`), `lastModified` posé sur le sitemap. Aucun blocage CRITICAL trouvé.
