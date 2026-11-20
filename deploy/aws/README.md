# Fonciable — vitrine AWS, source production vérifiée

Préparation NADIR-63, relais NADIR-54. Source Vercel production READY : `e9202146f011762e946e1b0a5d7d87b7a2dc9d0f`, déploiement `dpl_7HJpwJK4uzG2mCSkQpaea571NJR7` revérifié par root. Nouvelle branche `codex/aws-nadir-54-vitrine-production-fix`, workspace Superset `15deeac2-39c1-492d-b197-f179a0ae6627`.

## Provenance et périmètre

La création du workspace avec `baseBranch=e920…` a malgré tout donné HEAD `422656ab425f2c6f5ddc56df1998148fc1cf80b5`. Ce paramètre ne garantit donc pas une base SHA : vérifier immédiatement HEAD et l'ascendance. La branche fraîche, propre et non publiée a été explicitement repositionnée sur e920 avant Docker ; aucune ancienne branche n'a été réécrite.

Le précédent commit d'infrastructure `1e3464a72d0ed553d5c167a70a92dff1434affea` avait pour parent 422656ab, sans e920 parmi ses ancêtres. Seuls ses Dockerfile, .dockerignore et document de préparation ont été repris. La différence produit entre les deux bases est dans `config/plans.ts` : trois mentions de fonctionnalités attendues en production. Le fichier reste **exactement celui d'e920**, sans modification personnalisée de prix, quotas ou contenu. `package.json`, `package-lock.json`, `config/plans.ts` et `next.config.ts` ont leurs blobs Git vérifiés identiques à e920.

L'application `app.fonciable.fr` (autre dépôt), HostIA, Hector et l'ancienne PR50 ne sont pas modifiés.

## Image et construction réellement obtenues

Image construite et testée : `nadir63/fonciable-vitrine:e920214`.

Identifiant immuable : `sha256:c5b52a62e7ecfccd62ee47f3b40e669eab54db3fd4c2365386b56d07597e55bb`.
Taille : `357161709` octets ; runtime sous `node`.

Base Linux/amd64 épinglée dans Dockerfile : `node:24-bookworm-slim@sha256:0e2646ab57e77b7a384a0cb59b6815b182c77e1f9c3ba36bd8435bd9c4e6680e`.

Empreinte SHA-256 du Dockerfile testé : `ee6d81169fef28772887cfc5407215cddfdee3eede9e99dbcc9188412940d643`.

Installation verrouillée `npm ci --ignore-scripts --no-audit --no-fund` réussie (504 packages), Next 16.4.2. Build Docker et build Next complets réussis : compilation, TypeScript, génération des pages et traçage. Limites de cgroup lues et assertées avant Next : **3221225472 octets, quota CPU 200000 / période 100000** ; heap Node 1536 Mio.

Commande de reconstruction :

```bash
sudo docker build --resource memory=3g --resource cpu-quota=200000 --resource cpu-period=100000 --progress=plain -t nadir63/fonciable-vitrine:e920214 .
```

Le serveur complet `next start`, les redirects et les headers de production sont conservés ; aucun export statique ni changement de configuration Next. Les fichiers privés sont exclus du contexte et ne sont pas copiés dans le runtime.

Aucune configuration privée ni fichier .env lu ou injecté. Les seuls paramètres publics d'analytics éventuellement réutilisables à la construction sont `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_META_PIXEL_ID` ; ils sont restés absents ici, comme dans la précédente préparation. Aucun identifiant ou service nouveau activé.

## Recette HTTP réalisée

Origine actuelle lue avant intervention : `http://127.0.0.1:43102`, en-tête **Host: fonciable.fr**. Nouvelle image vérifiée sur sa boucle locale, dans un conteneur temporaire sans réseau externe ni port publié, lecture seule, 512 Mio / 0,5 CPU, uid 1000. Ce conteneur a été supprimé après les contrôles.

**22 requêtes validées avant et après**, dont six ressources CSS/JS : accueil, pages analyse/division, mentions légales, confidentialité, robots, sitemap, llms.txt et deux métadonnées .well-known. CTA `https://app.fonciable.fr` conservé. Les trois mentions de fonctionnalités d'e920 sont présentes dans le HTML de la nouvelle image.

Les redirections `/tarif` et `/tarifs` vers `/#tarifs`, les redirections 308 du Host historique `plu-ia.agentimpact.fr` vers `https://fonciable.fr` et la réponse 404 d'un chemin inexistant sont validées. Un Location racine peut être normalisé sans slash final ; son origine HTTPS reste identique.

CSP, X-Frame-Options DENY, nosniff, politique de référent, Permissions-Policy et HSTS sont strictement identiques entre les deux origines. Aucune réduction de protection. Absence des fichiers .env*, .git, .npmrc, AGENTS.md et CLAUDE.md à la racine de cette image vérifiée par noms, sans lecture de contenu privé.

Preuves complètes : `production-source-correction-2026-11-20.json`. Journaux opérateur : `/srv/agentimpact-dev/jobs/nadir54-vitrine-fonciable-productionfix-*`.

## Relais root pour la bascule

**Aucun déploiement public, changement DNS/tunnel ou modification du conteneur de production effectué par cette préparation.** Root possède le remplacement et le retour arrière.

Remplacer uniquement l'image de la vitrine `nadir54-fonciable`, en conservant le binding `127.0.0.1:43102:3000`, les options de runtime existantes et l'image précédente pour retour arrière. L'alias public reste `plu-ia.agentimpact.fr`. Garder impérativement **originRequest Host = fonciable.fr** dans la route existante : transmettre le Host historique au serveur déclencherait sa redirection canonique prévue par le produit. Aucun DNS ni tunnel à modifier pour ce remplacement.

Après remplacement, root refait les sondes sur 43102 avec Host fonciable.fr et sur l'alias HTTPS public. Ne pas reprendre l'ancienne branche/PR50. Les guides Next installés de déploiement et self-hosting ont été lus avant préparation.
