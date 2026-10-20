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

## 6. Preuves (étape A2)

> Vérifié le 2026-10-20 dans `NadirL05/sas-plu-3d`, branche `main`, commit `62959d2` (2026-10-20 17:16), lu en clone superficiel hors dépôt. La copie Drive `Projets-Web-Dev/sas-plu-3d` ne contient pas `src/` (fichiers non synchronisés) : elle n'a pas pu servir de source. Aucun `.env` lu.
> Les numéros de ligne valent pour ce commit.

| # | Verdict | Preuve (fichier : ligne) | Formulation autorisée |
|---|---|---|---|
| R1 | **Retirée, pas de preuve** | Aucune mesure de durée d'analyse dans le code ni la doc (recherche « minutes », « secondes », `maxDuration`) | Ne pas promettre de durée. H1 de repli recommandé. |
| R2 | Prouvée | `src/lib/plu-engine.ts:728` (`ADRESSE_API`, api-adresse.data.gouv.fr) ; `components/dashboard/parcel-picker-modal.tsx:149` | « Recherche par adresse (Base Adresse Nationale). » |
| R3 | Prouvée | `components/dashboard/parcel-picker-modal.tsx:149-150` (« sélectionnez le terrain sur la carte », « Choisissez un autre point ») | « ou par sélection du terrain sur la carte. » |
| R4 | **Retirée, pas de preuve** | Aucun champ de saisie de référence cadastrale trouvé dans `parcel-picker-modal.tsx` ni `feasibility-launcher.tsx` ; la référence est affichée après identification (`parcel-picker-modal.tsx:184`), pas saisie | Dire « la référence cadastrale est identifiée », pas « recherche par référence ». |
| R5 | Prouvée | `src/lib/plu-engine.ts:730` (`CADASTRE_API_URL` = apicarto.ign.fr/api/cadastre/parcelle) | « Contour et surface via l'API Carto Cadastre de l'IGN. » |
| R6 | Prouvée | `src/lib/plu-gpu-link.ts:1-14` (rattachement au document GPU courant : zonage, commune, document) et `:23` (`GPU_WFS_URL`) ; `src/lib/parcel-plu-proof.ts:41` (couche `wfs_du:zone_urba`) | « La zone est lue dans le Géoportail de l'Urbanisme et rattachée au document d'urbanisme en vigueur (PLU ou PLUi). » |
| R7 | Prouvée | `src/lib/plu-gpu-link.ts:379` (statuts `rnu` / `no_zoning`) ; `src/lib/plu-engine.ts:1450-1452` (« jamais une source de règle conclue ») | « Si la commune relève du RNU ou si aucun zonage n'est rattaché, aucune règle de zone n'en est déduite. » |
| R8 | Prouvée | `src/lib/rag-engine.ts:26-31` (schéma d'extraction : `ces`, `retrait`, `hauteur`, `espacesVerts`) | « Le règlement est analysé pour en extraire emprise au sol, hauteur maximale, retraits et espaces verts. » |
| R9 | **Retirée sous cette forme** | Le schéma d'extraction du règlement ne contient pas le stationnement (`rag-engine.ts:26-31`) ; la règle de stationnement vient de la base de zones (`plu-engine.ts:99`, `pk_ratio_housing`) ou d'un profil type (`feasibility-finance.ts:59`) | Ne pas dire que le stationnement est extrait du règlement PDF. |
| R10 | Prouvée | `src/lib/rag-engine.ts:58` (valeur acceptée uniquement si elle figure littéralement dans les extraits) ; `src/lib/feasibility-finance.ts:91-97` (`aiCitation` : URL, page, extrait) ; `components/dashboard/rule-source-evidence.tsx:18` (« Ouvrir le document source · page N ») | « Une règle lue dans le règlement n'est retenue que si sa valeur figure dans le texte ; la page et l'extrait sont cités. » |
| R11 | Prouvée | `src/lib/feasibility-finance.ts:41` (`ConstraintSourceKind`) et `:50-60` (une source par règle) ; `src/lib/committee-dossier.ts:77-80` (libellés affichés) | « Chaque règle indique sa provenance : base réglementaire, lecture du règlement à vérifier, profil type ou estimation. » |
| R12 | Prouvée | `src/config/plu-definitions.ts:84` (`NON_CONSTRUCTIBLE_ZONE_FAMILIES = ["A", "N"]`) ; `src/lib/finance/scenario.ts:146-147` (aucun bilan en zone A/N) ; `src/lib/gisement-sources.ts:2004-2006` (AU distincte de A) | « Les zones agricoles et naturelles sont identifiées comme inconstructibles ; les zones à urbaniser (AU) ne sont pas confondues avec elles. » |
| R13 | Prouvée | `src/lib/plu-engine.ts:745` (`APICARTO_GPU_BASE_URL`) et `:2480` (couches `assiette-sup-p/l/s`) | « Servitudes d'utilité publique disponibles via l'API Carto du GPU. » |
| R14 | Prouvée | `src/lib/plu-engine.ts:739` (`GEORISQUES_API_BASE_URL`) et `:944-945` (endpoint `/rga`, retrait-gonflement des argiles) | « Risques recensés (Géorisques) et aléa retrait-gonflement des argiles. » |
| R15 | Prouvée | `src/config/plans.ts:127` (capacité déclarée) ; `components/three/ParcelScene.tsx:590-591` (volume borné par la hauteur maximale) | « Enveloppe constructible théorique visualisée en 3D. » |
| R16 | Prouvée | `src/lib/finance/scenario.ts:161-175` (niveaux = hauteur max / hauteur d'étage ; emprise = surface × emprise au sol ; surface de plancher = emprise × niveaux ; nulle hors zone constructible) | « Surface de plancher potentielle : emprise au sol maximale multipliée par le nombre de niveaux que permet la hauteur maximale. Maximum théorique. » |
| R17 | Prouvée | `src/lib/finance/scenario.ts:139-145` (sans règles vérifiées pour la parcelle, pas de calcul sur sa surface) ; `src/lib/committee-dossier.ts:109-110` (« couverture de toute la parcelle non vérifiée ») ; `src/lib/prospecteur-report.ts:297` | « Quand l'application des règles à toute la parcelle n'est pas vérifiée, l'outil le signale et ne calcule pas de surface constructible sur la parcelle entière. » |
| R18 | Prouvée | `src/config/plans.ts:128` ; `app/api/report/route.ts:4` (génération jsPDF) | « Export PDF du rapport d'analyse. » |

**Bilan** : 15 affirmations prouvées, 3 retirées ou reformulées (R1 durée, R4 recherche par référence cadastrale, R9 stationnement extrait du règlement).

**Divergences relevées sur une page existante (non corrigées ici, à arbitrer par Nadir)** : `content/faisabilite-fonciere.ts` annonce une « recherche par référence cadastrale » (FF.01, étape 01) et liste la « règle de stationnement » parmi ce qui est extrait du règlement (FF.03). Ces deux points correspondent à R4 et R9, sans preuve dans le commit vérifié.
