# CLAUDE.md — Landing-page-PLU-IA

Landing marketing seule pour PLU IA. Next.js App Router, TypeScript, Tailwind v4.

## Split landing/outil

- Ce repo = landing seule, cible `plu-ia.agentimpact.fr`.
- Outil réel = `NadirL05/sas-plu-3d`, migré vers `app-plu-ia.agentimpact.fr` (Stripe webhooks + Clerk redirect URLs à mettre à jour là-bas, pas ici).
- **Source de vérité prix/quotas/Stripe** = `sas-plu-3d/src/config/plans.ts`. Ce repo n'a que des copies d'affichage (`config/plans.ts`, `config/brand.ts`) — toute modification de prix doit être répercutée dans les deux repos.
- Pas de Clerk ici : `HeaderAuthActions`/`MobileNav` sont statiques, tous les CTA pointent vers `APP_URL` (`app-plu-ia.agentimpact.fr`).

## Build : webpack, pas Turbopack

`npm run build` force `--webpack` (voir `package.json`). Turbopack (défaut Next 16) casse le chunk dynamique de `ParcelMassingScene`/`ParcelVolumeCanvas` (React Three Fiber) : `SyntaxError: Failed to execute 'appendChild' on 'Node': Invalid or unexpected token` à chaque chargement en prod, jamais en dev. Repro le 21/08 : identique sur build Turbopack, absent sur build webpack (`next build --webpack` + `next start` en local, 3 reloads consécutifs sans erreur). Cassait silencieusement gtag.js (`window.gtag` restait `undefined` malgré un `dataLayer` peuplé) — l'exception coupait l'exécution des scripts `afterInteractive` avant leur init. Ne pas repasser sur Turbopack pour ce repo sans revalider ce point précis.

## Ce qui n'est pas encore fait

- Confirmer via check headless (Playwright, pas WebFetch) que les routes authentifiées de `app-plu-ia.agentimpact.fr` (Clerk) sont bien en `noindex` et ne dupliquent pas les metadata de cette landing.

## Fait

- Domaine `plu-ia.agentimpact.fr` attaché à ce projet Vercel — confirmé (sitemap.xml live sert bien cette landing, plus l'outil).
- Audit SEO/GEO technique passé le 21/08/2026 : OG/Twitter image ajoutée (`app/opengraph-image.tsx`), `lastModified` posé sur le sitemap. Aucun blocage CRITICAL trouvé.
