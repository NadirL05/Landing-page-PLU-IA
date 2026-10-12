# Fonciable — landing marketing

Landing publique de [Fonciable](https://fonciable.fr), service AgentImpact d'analyse foncière et d'urbanisme. L'application est séparée et accessible sur [app.fonciable.fr](https://app.fonciable.fr).

## Développement local

```bash
npm ci
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000). Les vérifications principales sont :

- `npm run lint`
- `npm run build`

## Architecture

- Next.js App Router, TypeScript et Tailwind CSS v4.
- `config/brand.ts` centralise la marque et les domaines.
- `config/plans.ts` est une copie d'affichage ; la source de vérité des prix et quotas reste dans l'application.
- Les pages métier réutilisent `components/metier/MetierPage.tsx`.
- Les métadonnées, données structurées, sitemap, robots et fichiers de découverte IA sont versionnés dans ce dépôt.

## Périmètre

Ce dépôt ne contient ni l'application authentifiée, ni sa base de données, ni sa configuration Stripe/Clerk, ni le DNS de production.
