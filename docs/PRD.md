# PRD — Landing marketing Fonciable (fonciable.fr)

> Rédigé le 2026-10-20 **à partir du code existant** (règle AGENTS.md : docs absents + code existant).
> Légende : **[Lu]** = constaté dans un fichier du dépôt ou une commande · **[Déduit]** = interprétation de l'agent · **[À CONFIRMER]** = information non vérifiable, à trancher par Nadir.
> Statut : brouillon, **non validé** (pas de `docs/.cadrage-valide`).

## 0. Périmètre de ce document

Ce dépôt (`NadirL05/Landing-page-PLU-IA`, projet Vercel `landing-page-plu-ia`) contient **uniquement la landing publique** `fonciable.fr`. L'outil réel (comptes Clerk, analyses, Stripe, base de données) vit dans le dépôt séparé `sas-plu-3d` sur `app.fonciable.fr`. [Lu : `CLAUDE.md`, `README.md`]

Fonciable est le nouveau nom de PLU-IA depuis le 15/10/2026 ; service AgentImpact édité par Nadir Lahyani EI. [Lu : `config/brand.ts`, `public/llms.txt`, `app/mentions-legales/page.tsx`]

## 1. Problème (point de vue du client)

« Avant de faire une offre sur un terrain, je dois savoir vite s'il peut porter une opération. Pour cela je recoupe à la main le cadastre, le PLU de la commune (souvent un PDF de règlement), les risques, les ventes récentes du secteur et un premier bilan promoteur. C'est long, dispersé entre une dizaine de sources publiques, et je passe du temps sur des parcelles qui ne valaient pas l'étude. » [Déduit des sections « problème » de `content/*.ts` et de l'accueil `app/page.tsx`]

Problème propre à la landing : un prospect qui arrive sur fonciable.fr doit comprendre en moins d'une minute ce que fait l'outil, ce qu'il ne fait pas (pas de certificat d'urbanisme), combien il coûte, et passer à l'action (rendez-vous ou souscription). [Déduit]

## 2. Client cible

- Promoteurs immobiliers (locaux à actifs, plusieurs programmes en parallèle). [Lu : taglines `config/plans.ts`]
- Professionnels de l'immobilier et de la promotion en France. [Lu : `public/llms.txt`, server-card]
- Marchands de biens, développeurs fonciers, architectes : **[À CONFIRMER]** (hypothèse du diagnostic SEO/GEO du 20/10/2026, non confirmée).
- Zone : France métropolitaine et DOM, communes publiant leur document d'urbanisme sur le Géoportail de l'Urbanisme. [Lu : `public/llms.txt`]
- Taille / segment prioritaire : **[À CONFIRMER]**.

## 3. Proposition de valeur (une phrase)

« Le potentiel d'une parcelle, sources à l'appui : Fonciable croise cadastre, PLU, risques, DVF et bilan promoteur pour vous dire en quelques minutes si un terrain mérite une étude approfondie. » [Déduit du H1 de l'accueil et de `SITE_DESCRIPTION`, `app/layout.tsx`]

## 4. Fonctionnalités MVP de la landing

### Indispensable (5) — toutes déjà en production
1. **Accueil explicatif** : hero, sources publiques croisées, 6 volets d'analyse, périmètre et limites, FAQ. [Lu : `app/page.tsx`]
2. **Bloc tarifs** affichant Starter / Pro / Entreprise depuis `config/plans.ts` avec CTA « Souscrire » (vers `app.fonciable.fr/checkout/{plan}`) et « Nous contacter » (Calendly). [Lu : `app/page.tsx` l. 400-480]
3. **Prise de rendez-vous Calendly** (CTA `book_demo` dans hero, milieu de page, tarifs, pages métier, pied de page) et **lien d'ouverture de l'application** (`app.fonciable.fr/dashboard`). [Lu : `components/analytics/tracked-cta.tsx`, `SiteHeader.tsx`, `config/site-content.ts`]
4. **Pages métier SEO** : `/bilan-promoteur`, `/faisabilite-fonciere`, `/prospection-fonciere` via un gabarit unique. [Lu : `config/solutions.ts`, `components/metier/MetierPage.tsx`, `content/*.ts`]
5. **Conformité et consentement** : mentions légales, politique de confidentialité, CMP consentmanager, analytics chargés seulement après consentement. [Lu : `app/mentions-legales`, `app/confidentialite`, `components/analytics/consent-gate.tsx`]

### Utile — déjà en production
- Découverte SEO/GEO : `sitemap.xml`, `robots.txt` (Content-Signal), `llms.txt`, `rsl.xml`, JSON-LD (SoftwareApplication, Organization, WebSite, FAQPage, WebPage, BreadcrumbList), image OpenGraph. [Lu]
- Cartes de découverte agents : `/.well-known/mcp/server-card.json` (transport « none », documenté honnêtement) et `/.well-known/agent-skills/index.json`. [Lu]
- Scène 3D au scroll (React Three Fiber) avec repli `prefers-reduced-motion` et détection WebGL. [Lu : `components/PageScene.tsx`, `hooks/useSceneCapabilities.ts`]
- Attribution des campagnes : transmission filtrée de `gclid`, `utm_*`, `fbclid` vers l'app. [Lu : `lib/analytics.ts`] (Note : aucun CTA n'utilise aujourd'hui `preserveQuery` — [Lu : grep], donc la transmission n'est pas active.)
- Page de démonstration autonome `/demonstration.html` (noindex). [Lu : `public/demonstration.html`]
- Redirections : `plu-ia.agentimpact.fr` → `fonciable.fr` (308, chemin conservé), `/tarif(s)` → `/#tarifs`. [Lu : `next.config.ts`]

### Plus tard / à venir
- **Page métier « Analyse PLU d'une parcelle »** (priorité 1 de la suite) — ciblage des intentions « PLU », « constructibilité », « analyse PLU parcelle », « surface constructible ». Origine : diagnostic SEO/GEO du 20/10/2026 (relais 03 O2, 04, 08 D3) : aucune page ne couvre cette intention, Fonciable non observé sur 10/10 requêtes du proxy SERP, concurrents visibles Parcello, InfoPLU, Kel Foncier, IZIRED, Aprilyos. Contenu : méthode, sources, limites, exemple (fictif et étiqueté comme tel tant qu'aucun exemple réel autorisé n'existe), maillée depuis l'accueil et `/faisabilite-fonciere`. Voir `IMPLEMENTATION_PLAN.md` § A.
- Enrichir `/faisabilite-fonciere` avec le vocabulaire « constructibilité / surface constructible ». [Diagnostic relais 04]
- Mention visible du mot « IA » sur l'accueil (0 occurrence dans le texte visible selon le diagnostic, alors que JSON-LD/llms.txt disent « assistée par IA »). [Diagnostic E3 — à revérifier]
- Ajout de la page LinkedIn Fonciable dans `Organization.sameAs` — URL **[À CONFIRMER]**.
- Activer `preserveQuery` sur les CTA vers l'app si l'attribution cross-domaine est voulue — **[À CONFIRMER]**.
- Contenus comparatifs (« alternative à Kel Foncier ») — après données GSC, **[À CONFIRMER]**.

## 5. Hors périmètre

- Toute logique applicative : comptes, authentification (Clerk), calculs d'analyse, base de données, quotas, paiement Stripe, webhooks → dépôt `sas-plu-3d`. [Lu : `CLAUDE.md`, `README.md`]
- Source de vérité des prix et quotas (ici simple copie d'affichage). [Lu : `config/plans.ts`]
- Configuration DNS de `fonciable.fr`, redirection `www.agentimpact.fr/plu-ia`, contenu de `app.fonciable.fr/sources`. [Lu : `CLAUDE.md` ; diagnostic SEO]
- Formulaires de collecte, comptes utilisateurs, newsletter sur la landing. [Lu : `app/confidentialite/page.tsx` « ni compte ni formulaire »]
- Témoignages, avis clients, notes agrégées (aucun n'est publié ; en inventer est interdit). [Lu : `lib/page-schema.ts`]
- Serveur MCP réel. [Lu : `app/.well-known/mcp/server-card.json/route.ts`]
- Envoi de fiches annuaires / réutilisation data.gouv (préparation possible, envoi uniquement avec accord de Nadir).

## 6. Modèle de revenu et prix

Copie d'affichage de `config/plans.ts` (source de vérité : `sas-plu-3d/src/config/plans.ts`, non relue ici → concordance **[À CONFIRMER]**). Prix nets, TVA non applicable (art. 293 B du CGI).

| Plan | Prix affiché | Quota | Prospection | Veille | Support e-mail | Affiché sur la landing |
|---|---|---|---|---|---|---|
| Découverte (FREE) | Gratuit | 2 analyses / 30 j | 1 scan / mois | 1 territoire | non | **Non** (`PUBLIC_PLAN_LIST` l'exclut) |
| Starter | 199 € / mois | 15 analyses / 30 j | 2 scans / mois | 2 territoires | oui | Oui |
| Pro | 599 € / mois | 100 analyses / 30 j | 10 scans / mois | 5 territoires | oui | Oui |
| Entreprise | Sur mesure | sur mesure | sur demande | sur demande | oui | Oui (CTA Calendly) |

Modèle : abonnement mensuel SaaS vendu sur `app.fonciable.fr` (checkout Stripe côté app). Essai gratuit / offre Découverte encore active côté app : **[À CONFIRMER]** (diagnostic SEO E1 ; `llms.txt` a été réaligné le 20/10 sur les 3 offres affichées, commit `f0a1656`).

## 7. Indicateurs de succès (mesurables)

Aucune donnée GA4/GSC/Calendly n'est accessible depuis ce dépôt → toutes les valeurs cibles sont **[À CONFIRMER]**.

| Indicateur | Source de mesure | Cible | Échéance |
|---|---|---|---|
| Pages commerciales indexées dans Google | GSC « Pages indexées » | 4/4 aujourd'hui, 5/5 avec la page PLU | [À CONFIRMER] (diagnostic : « aucun délai garanti ») |
| Rendez-vous Calendly pris depuis la landing | événement GA4 `book_demo` + Calendly | [À CONFIRMER] / mois | [À CONFIRMER] |
| Clics « Souscrire » | événement GA4 `start_paid_checkout` | [À CONFIRMER] / mois | [À CONFIRMER] |
| Abonnements payants issus de la landing | Stripe côté `sas-plu-3d` | [À CONFIRMER] | [À CONFIRMER] |
| Mentions Fonciable dans le panel GEO v1 (15 questions) | captures ChatGPT/Perplexity | [À CONFIRMER] (non mesuré au 20/10) | retest J+6 à 8 semaines après la page PLU |

## 8. Hypothèses à valider

1. Les acheteurs cherchent avec le vocabulaire « analyse PLU », « constructibilité », « IA » (proxy SERP non localisé, sans volumes) → à confirmer par GSC sous 4-6 semaines.
2. La prise de rendez-vous convertit mieux que l'essai gratuit (le commit `a51b4fc` a remplacé les CTA d'essai par la prise de RDV) — **[À CONFIRMER]** par les chiffres.
3. Les personas marchand de biens / développeur foncier / architecte sont pertinents — **[À CONFIRMER]**.
4. Les prix de `config/plans.ts` sont identiques à la source de vérité `sas-plu-3d` — **[À CONFIRMER]**.
5. Une page métier dédiée améliore la visibilité sur « analyse PLU parcelle » (à mesurer par GSC + panel GEO).
