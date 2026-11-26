# Vitrine Fonciable sur Cloudflare Workers

Cette cible publie la vitrine publique. Les pages et les médias sont exportés depuis Next.js. Le Worker sert les URL publiques, les en-têtes de Next, les redirections tarifaires et le tunnel navigateur Sentry limité au projet déjà configuré. Les vidéos acceptent les requêtes HTTP Range.

## Construire et tester

Depuis la racine avec Node 22.12+ (ou Node 24) et npm :

```sh
npm ci
npm run build:worker
npm run preview:worker
```

Dans un second terminal, lancer `npm run test:worker`. Le test contrôle chaque page exportée, ses en-têtes, les ressources, les métadonnées, les redirections, la vidéo et la 404. Pour utiliser un autre port, passer l’origine au test : `npm run test:worker -- http://127.0.0.1:33737`. Sur un hôte à interfaces réseau restreintes, préciser les deux ports : `npm run preview:worker -- --ip 127.0.0.1 --port 33737 --inspector-port 0`.

## Publier pour recette

Après le build, `npm run deploy:worker` publie le Worker **fonciable-vitrine** sur le sous-domaine workers.dev du compte connecté. La configuration ne contient aucun domaine personnalisé. Les réponses workers.dev portent X-Robots-Tag: noindex. Les URL canoniques restent sur https://fonciable.fr.

Pour Cloudflare Workers Builds, sélectionner la racine du dépôt, la commande de build `npm run build:worker` et la commande de déploiement `npm run deploy:worker`. Les réglages publics d’analytics, s’ils sont utilisés, doivent être identiques à la version de référence au moment du build.

Avant toute bascule, contrôler les liens vers l’application, les coûts affichés, le rendu mobile, la vidéo et les trois noms publics. Au 26 novembre 2026, l’apex, www et plu-ia.agentimpact.fr servaient l’accueil en HTTP 200. Les redirections /tarif et /tarifs conservent le domaine de la requête et la query avant #tarifs. Conserver les origines AWS disponibles pour le retour arrière.
