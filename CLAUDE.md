# CLAUDE.md — Landing-page-PLU-IA

Landing marketing seule pour PLU IA. Next.js App Router, TypeScript, Tailwind v4.

## Split landing/outil

- Ce repo = landing seule, cible `plu-ia.agentimpact.fr`.
- Outil réel = `NadirL05/sas-plu-3d`, migré vers `app-plu-ia.agentimpact.fr` (Stripe webhooks + Clerk redirect URLs à mettre à jour là-bas, pas ici).
- **Source de vérité prix/quotas/Stripe** = `sas-plu-3d/src/config/plans.ts`. Ce repo n'a que des copies d'affichage (`config/plans.ts`, `config/brand.ts`) — toute modification de prix doit être répercutée dans les deux repos.
- Pas de Clerk ici : `HeaderAuthActions`/`MobileNav` sont statiques, tous les CTA pointent vers `APP_URL` (`app-plu-ia.agentimpact.fr`).

## Piège résolu : env var Vercel avec retour à la ligne = SyntaxError silencieux

Le 21/08, `NEXT_PUBLIC_GA_MEASUREMENT_ID` avait été posé sur Vercel avec un `\n` de fin embarqué dans la valeur (probablement collé avec un Entrée en trop). Ce `\n` atterrissait tel quel dans le literal `gtag('config', '...')` du composant `GoogleTag` — un retour à la ligne brut dans une string JS entre quotes simples est un `SyntaxError`, qui cassait le `<Script>` à *chaque* chargement, en prod uniquement (jamais repro en local car la variable n'y était simplement pas définie). Aucune violation CSP, gtag.js se chargeait bien (200) — seul `window.gtag` restant `undefined` malgré un `dataLayer` peuplé trahissait le problème. Corrigé par un `.trim()` défensif dans `components/analytics/google-tag.tsx` et `meta-pixel.tsx`, plus la valeur re-posée proprement. (Une piste "Turbopack casse le chunk R3F" a été explorée et écartée — fausse piste, cf. historique de commits du 21/08.)

## Ce qui n'est pas encore fait

- Confirmer via check headless (Playwright, pas WebFetch) que les routes authentifiées de `app-plu-ia.agentimpact.fr` (Clerk) sont bien en `noindex` et ne dupliquent pas les metadata de cette landing.

## Fait

- Domaine `plu-ia.agentimpact.fr` attaché à ce projet Vercel — confirmé (sitemap.xml live sert bien cette landing, plus l'outil).
- Audit SEO/GEO technique passé le 21/08/2026 : OG/Twitter image ajoutée (`app/opengraph-image.tsx`), `lastModified` posé sur le sitemap. Aucun blocage CRITICAL trouvé.
