# Brief éditorial : page « Analyse PLU d'une parcelle »

> Étape A1 de `docs/IMPLEMENTATION_PLAN.md`. Rédigé le 2026-10-20.
> Statut : **proposition, à valider par Nadir** (slug, H1, metaTitle et liste d'affirmations). Tant que ce n'est pas fait, A1 reste non coché et A3 à A7 restent bloqués.
> Réf. : PRD §4, TRD §2 (pages métier), TRD §7 (vérité du contenu).

## 1. Identité de la page

| Champ | Proposition | Statut |
|---|---|---|
| Slug | `/analyse-plu-parcelle` | [À CONFIRMER] |
| H1 | « Analyse PLU d'une parcelle : constructibilité et règles en quelques minutes » | [À CONFIRMER], voir réserve ci-dessous |
| H1 de repli (sans promesse de durée) | « Analyse PLU d'une parcelle : constructibilité et règles applicables » | proposition de l'agent |
| metaTitle (≤ 60 car.) | « Analyse PLU d'une parcelle : zonage, règles, constructibilité » | [À CONFIRMER] |
| metaDescription (~155 car.) | « Lire le PLU d'une parcelle : zone, emprise au sol, hauteur, retraits, servitudes et surface constructible théorique, avec la source de chaque règle. » | [À CONFIRMER] |
| navLabel | « Analyse PLU » | [À CONFIRMER] |
| eyebrow | « Zonage · règlement · constructibilité » | proposition |

Réserve sur le H1 : la promesse « en quelques minutes » n'a **aucune preuve** dans `sas-plu-3d` (aucune mesure de durée d'analyse, voir section Preuves, affirmation R1). Elle ne peut être gardée que si Nadir fournit une mesure réelle ; sinon, utiliser le H1 de repli.

Règle de nommage : le produit est nommé « Fonciable » uniquement. Aucune mention de l'ancien nom (homonyme d'un concurrent).

## 2. Intention de recherche

- **Intention principale** : informationnelle à transactionnelle. Un promoteur, marchand de biens ou architecte veut savoir ce que le PLU autorise sur une parcelle précise (est-elle constructible, quelle zone, quelles règles, quelle surface constructible), avant d'y consacrer une étude.
- **Différence avec `/faisabilite-fonciere`** : la page faisabilité couvre tout le dossier d'entrée (cadastre, marché DVF, bilan). Cette page se concentre sur la **lecture du document d'urbanisme** appliquée à une parcelle : zonage, règlement, provenance de chaque règle, servitudes, limites. Lien croisé prévu en A5.
- **Cible** : professionnels de la promotion et du foncier (segment prioritaire [À CONFIRMER], PRD).

## 3. Requêtes cibles

| Requête | Rôle |
|---|---|
| analyse PLU parcelle | principale (H1, metaTitle) |
| règles PLU d'une parcelle | secondaire (H2 « capabilities ») |
| constructibilité terrain / parcelle constructible | secondaire (H2 « problem », FAQ) |
| surface constructible | secondaire (FAQ, section proof) |
| zonage PLU parcelle / connaître la zone PLU d'un terrain | longue traîne (FAQ) |
| emprise au sol, hauteur maximale PLU | longue traîne (capabilities) |

Volumes de recherche : non mesurés, aucun chiffre avancé [À CONFIRMER si un outil SEO est utilisé].

## 4. Plan des 10 sections (`MetierPageContent`)

1. **Méta** : slug, navLabel, metaTitle, metaDescription, dateModified.
2. **Hero** : eyebrow, H1, lede (« Avant toute étude, savoir ce que le document d'urbanisme permet sur une parcelle »), CTA « Prendre rendez-vous » + ctaNote.
3. **Problème** (H2 proposé : « Lire un PLU pour une seule parcelle prend plus de temps qu'il n'y paraît ») : trouver le bon document courant, la bonne zone, les articles utiles dispersés dans le règlement, les servitudes publiées à part. 3 points.
4. **Ce que fait l'outil** (H2 proposé : « Ce que Fonciable lit dans le PLU pour une parcelle ») : 5 à 6 items, uniquement parmi les affirmations prouvées (section Preuves).
5. **Parcours** (H2 proposé : « De l'adresse aux règles applicables ») : 4 étapes : localiser la parcelle, rattacher le document courant et la zone, lire les règles et leur provenance, estimer l'enveloppe et la surface constructibles théoriques.
6. **Sources** : Base Adresse Nationale, API Carto Cadastre (IGN), Géoportail de l'Urbanisme (WFS et API Carto GPU), Géorisques.
7. **Proof** : exemple **explicitement étiqueté fictif** (zone, emprise, hauteur, retraits, provenance de chaque règle). Exemple réel [À CONFIRMER] (autorisation client nécessaire).
8. **Limites** : document non publié au GPU ou RNU, révision en cours, absence de servitude non garantie, maximum théorique, pas de certificat d'urbanisme.
9. **FAQ** (5 questions) : comment connaître la zone PLU d'une parcelle ; comment savoir si un terrain est constructible ; comment est estimée la surface constructible ; d'où viennent les règles affichées ; Fonciable remplace-t-il un certificat d'urbanisme.
10. **CTA final** : rendez-vous pour une parcelle.

## 5. Affirmations produit à vérifier (entrée de l'étape A2)

| # | Affirmation candidate |
|---|---|
| R1 | L'analyse d'une parcelle prend « quelques minutes » (H1 proposé). |
| R2 | Recherche de la parcelle par adresse (Base Adresse Nationale). |
| R3 | Recherche par clic sur la carte. |
| R4 | Recherche par référence cadastrale saisie. |
| R5 | Contour et surface de la parcelle via l'API Carto Cadastre de l'IGN. |
| R6 | Zonage lu dans le Géoportail de l'Urbanisme, rattaché au document d'urbanisme courant (PLU, PLUi). |
| R7 | Commune au RNU ou sans zonage rattaché : signalée, aucune règle de zone conclue à partir du GPU. |
| R8 | Analyse du règlement PDF pour extraire emprise au sol, hauteur maximale, retraits, espaces verts. |
| R9 | Extraction du stationnement depuis le règlement PDF. |
| R10 | Une valeur extraite du règlement n'est retenue que si elle figure littéralement dans le texte, avec page citée et lien vers le document source. |
| R11 | Chaque règle affiche sa provenance (base de zones, lecture du règlement, profil type, estimation). |
| R12 | Zones agricoles (A) et naturelles (N) identifiées comme inconstructibles ; aucun bilan produit. |
| R13 | Servitudes d'utilité publique via l'API Carto du GPU. |
| R14 | Risques recensés (Géorisques) et aléa retrait-gonflement des argiles. |
| R15 | Enveloppe constructible visualisée en 3D. |
| R16 | Surface de plancher potentielle = emprise maximale × niveaux permis par la hauteur, seulement en zone constructible. |
| R17 | Sans vérification des règles sur toute la parcelle, l'outil le signale et ne calcule pas la surface sur la parcelle entière. |
| R18 | Export PDF du rapport d'analyse. |
