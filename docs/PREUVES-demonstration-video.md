# Preuves — démonstration Fonciable

## Périmètre et autorisation

Nadir a demandé de refaire la démo puis de l’améliorer dans l’application HyperFrames du Mac. La V4 (~42 s) a été présentée ; « bas vas y » le 21/10 autorise le rendu et le remplacement sur le site. L’autorisation ne lève pas la porte de production globale AGENTS.md §8.

## Fichier livré

`public/demonstration/video.mp4` : H.264/AAC, 1920×1080, 30 i/s, durée conteneur 41,766667 s (composition 41,7392 s, arrondi à l’image). MP4 remuxé en faststart sans réencodage. SHA-256 : `807490c3832c3e4ae6342bd56fd6d80a8ca0935eae30d81f95af8aa8622ed98c`.

Musique originale réutilisée ; aucune voix off. Export final HyperFrames 0.8.181, capture screenshot avec GPU matériel, qualité delivery. Première mesure −33,57 LUFS : niveau corrigé dans la composition, puis nouveau rendu. Mesure du fichier final : **-14.57 LUFS**, **-1.36 dBTP**, plage 0.6 LU ; PASS (cible −14 ±1 LUFS, crête ≤−1 dBTP).

Six images décodées regardées à 3/9/17/25/33/41,7 s, identiques aux scènes approuvées ; pas d’ancienne marque visible. Captures réelles du 18 octobre 2026, date affichée. Comparaison du simulateur : 02-apres.png avant recalcul, puis 04-apres-synthese.png après recalcul ; exemple hypothétique hors PLU, pas un bilan validé. Aucun nouvel enregistrement utilisateur du 21 revendiqué.

## Sécurité et collecte

Page HTML autonome sans JS, traceur, formulaire ou cookie propre. Polices et médias servis sur la même origine. Les liens vers l’app restent une navigation explicite. Aucun nouvel identifiant ou secret.

L’audit npm du 21/10 relève 0 critique et 5 hautes dans l’outillage de développement, comme le point B1 existant. Les arbitrages globaux Sentry, durées de conservation et garanties de transfert restent ouverts dans SECURITY.md. La PR n’est pas fusionnée en production tant que cette porte reste ouverte.
