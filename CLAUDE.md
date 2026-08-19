# CLAUDE.md — Landing-page-PLU-IA

Landing marketing seule pour PLU IA. Next.js App Router, TypeScript, Tailwind v4.

## Split landing/outil

- Ce repo = landing seule, cible `plu-ia.agentimpact.fr`.
- Outil réel = `NadirL05/sas-plu-3d`, migré vers `app-plu-ia.agentimpact.fr` (Stripe webhooks + Clerk redirect URLs à mettre à jour là-bas, pas ici).
- **Source de vérité prix/quotas/Stripe** = `sas-plu-3d/src/config/plans.ts`. Ce repo n'a que des copies d'affichage (`config/plans.ts`, `config/brand.ts`) — toute modification de prix doit être répercutée dans les deux repos.
- Pas de Clerk ici : `HeaderAuthActions`/`MobileNav` sont statiques, tous les CTA pointent vers `APP_URL` (`app-plu-ia.agentimpact.fr`).

## Ce qui n'est pas encore fait

- Attache du domaine `plu-ia.agentimpact.fr` sur ce projet Vercel (actuellement encore sur le projet outil).
- Retrait du domaine `plu-ia.agentimpact.fr` du projet `sas-plu-3d` une fois `app-plu-ia.agentimpact.fr` confirmé fonctionnel (Stripe/Clerk mis à jour).
- Passage SEO/GEO groupé (`claude-seo:*`).
