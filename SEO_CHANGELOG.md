# SEO_CHANGELOG — fonciable.fr

Journal des changements SEO de la landing. Une entrée par lot, la plus récente en haut.

## 2026-10-26 (bis) — branche `fix/qa2-seo` (QA SEO du 26/10, relais 20)

- `content/zonage-plu-zone-n.ts` : à l'étape 02, « ne devient bloquant qu'en zone rouge » devient « est traité comme bloquant en zone rouge ». À l'étape 03, le titre devient « Vérifier le motif de protection dans le règlement ». Les deux formulations sont alignées sur sas-plu-3d@85370de (`isServitudeBlocking` ; l'outil n'identifie pas le motif de classement).
- `app/sitemap.ts` : le lastmod de /faisabilite-fonciere, /zonage-plu/zone-a et /zonage-plu/zone-n reprend leur `dateModified` JSON-LD (2026-10-26), au lieu du 2026-10-21 commun.
- Vérification : `npm test` (lint, typecheck, build, 40 tests Playwright) et `npm run seo:check` OK.

## 2026-10-26 — branche `seo/fix-gsc-indexation` (audit SEO/GEO du 26/10, kit RosoAI V4, rôle 18)

Accord de Nadir le 26/10 (« go pour tout »). Non déployé : merge et mise en production par Nadir.

| Thème | Fichiers | Changement | Retour arrière |
|---|---|---|---|
| Maillage | `content/zonage-plu-zone-{u,au,a,n}.ts` | `/analyse-plu-parcelle` ajouté en tête de `related` des 4 pages de zone | revert du commit |
| Contenu | `content/zonage-plu-zone-a.ts`, `content/zonage-plu-zone-n.ts` | Bloc « Comment Fonciable traite une parcelle » et étapes « Lire une parcelle » propres à chaque zone (ils étaient identiques), à partir du code de sas-plu-3d (commit 85370de) ; `dateModified` 2026-10-26 | revert du commit |
| Contenu | `content/faisabilite-fonciere.ts` | Passage Géoportail (limites) et réponse FAQ « Comment connaître le zonage » reformulés ; /analyse-plu-parcelle inchangée | revert du commit |
| 404 | `app/not-found.tsx` | `robots: null`, `alternates: null` : une seule balise `noindex` (celle de Next), plus de canonical vers l'accueil | revert du commit |
| Sitemap | `app/sitemap.ts`, `tests/e2e/seo.spec.ts` | Accueil déclaré `https://fonciable.fr` (sans slash), comme sa canonical (Next émet toujours la racine sans slash) | revert du commit |
| Redirections | `next.config.ts` | `plu-ia.agentimpact.fr/tarif` et `/tarifs` → `https://fonciable.fr/#tarifs` en un saut (308) | revert du commit |
| CI | `scripts/seo-check.mjs`, `package.json` (`seo:check`), `.github/workflows/ci.yml` | Contrôle SEO du build local à chaque PR | revert du commit |

Mesures : lint, typecheck, build (webpack), 40 tests Playwright Chromium, `seo-check` OK en local ; `seo-check` sur la prod actuelle : 2 erreurs attendues (404). Lighthouse mobile prod avant : accueil perf 67 / SEO 92, /analyse-plu-parcelle perf 80 / SEO 92 (SEO 92 = robots.txt jugé invalide à cause des lignes `Content-Signal` et `License`, non modifiées). Mesure après : à refaire en prod après déploiement.
