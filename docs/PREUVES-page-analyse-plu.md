# Preuves — page `/analyse-plu-parcelle`

Relevé du 2026-10-20 (étape A2 de `IMPLEMENTATION_PLAN.md`). Chaque affirmation de `content/analyse-plu-parcelle.ts` renvoie ici. Règle : une valeur non vérifiée n'est pas affichée.

## 1. Exemple réel (section « Exemple »)

Choix de Nadir (A1, 20/10/2026) : un refus publié à Nantes, déjà montré dans la vidéo du 15/10 (capture du 12/10/2026).

| Valeur affichée | Statut | Source interrogée le 2026-10-20 | Valeur renvoyée |
|---|---|---|---|
| Parcelle `44109000BZ0070` | Vérifié | `https://apicarto.ign.fr/api/cadastre/parcelle?code_insee=44109&section=BZ&numero=0070` | `idu: 44109000BZ0070`, `nom_com: Nantes` |
| Surface cadastrale 538 m² | Vérifié | même requête | `contenance: 538` |
| Zone « UMap (zone urbaine U) » | Vérifié, **précisé** : la capture du 12/10 affichait « U » (type de zone) ; le secteur exact est UMap | `https://apicarto.ign.fr/api/gpu/zone-urba` avec `geom` = géométrie de la parcelle ci-dessus | 1 entité : `libelle: UMap`, `typezone: U`, `idurba: 244400404_PLUI_20260518`, `partition: DU_244400404` |
| Libellé « Secteur de développement des centralités actuelles ou en devenir » | Vérifié | même requête | `libelong` |
| « PLUm de Nantes Métropole » | Vérifié | même requête | `partition: DU_244400404` (SIREN Nantes Métropole), `nomfic: 244400404_reglement_20260518.pdf` |
| Dossier `PC0441092600175`, permis de construire | Vérifié | `https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_demandes-autorisations-decisions-urbanisme-nantes-metropole/records?where=search("PC0441092600175")` | `total_count: 1`, `type_dossier: Permis de construire` |
| Décision : refus du 8 octobre 2026 | Vérifié | même requête | `type_instruction: Refus`, `date_decision: 2026-10-08` |
| Adresse du terrain « 5 Avenue de l'Aumônerie, Nantes » | Vérifié | même requête | `adresse_du_terrain: 5 Avenue de l'Aumônerie`, `commune: Nantes` |
| Rattachement adresse → parcelle BZ0070 | Vérifié (le jeu de données Nantes ne contient pas la parcelle) | 1) `https://api-adresse.data.gouv.fr/search/?q=5 Avenue de l'Aumônerie Nantes&citycode=44109` → `[-1.544691, 47.231111]`, score 0,976, type `housenumber` ; 2) `https://apicarto.ign.fr/api/cadastre/parcelle?geom={"type":"Point","coordinates":[-1.544691,47.231111]}` | `44109000BZ0070`, 538 |
| Jeu de données « Demandes d'autorisation et décisions d'urbanisme de Nantes Métropole », Licence Ouverte | Vérifié | `https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_demandes-autorisations-decisions-urbanisme-nantes-metropole` | titre exact, `license: Licence Ouverte-LO`, modifié le 2026-10-20 |

**Volontairement non affiché** : nom du demandeur et de l'architecte (personnes physiques, présents dans le jeu de données), détail du projet (décrit les propriétaires), date de dépôt, surface de plancher demandée, motif du refus (absent du jeu de données). Le chiffre « 54 refus publiés » de la capture du 12/10 n'est pas repris (non revérifié, et il varie dans le temps).

## 2. Fonctionnalités décrites (section « Ce que fait Fonciable »)

Dépôt `NadirL05/sas-plu-3d`, clone `--depth 1` en lecture, commit `62959d2641ebe6504c5d88b860490e8c26926b5a` (2026-10-20).

| Réf. page | Affirmation | Fichier(s) de preuve |
|---|---|---|
| AP.01 | Parcelle et surface via API Carto Cadastre IGN | `src/lib/gisement-sources.ts:121` et `src/lib/plu-engine.ts:730` (`CADASTRE_API_URL`) ; adresse BAN : `src/lib/plu-engine.ts` |
| AP.02 | Zone lue dans le GPU (`zone_urba`) et rattachée au document en vigueur | `src/lib/plu-gpu-link.ts` (en-tête : zonage, commune, document ATOM courant) |
| AP.02 | Tous les secteurs qui touchent la parcelle sont relevés ; couche indisponible = statut inconnu, jamais une absence | `src/lib/parcel-plu-proof.ts` (en-tête, points 3 et paragraphe final) |
| AP.02 | Zones A et N identifiées comme inconstructibles | `src/config/plu-definitions.ts:84` (`NON_CONSTRUCTIBLE_ZONE_FAMILIES`), `src/lib/plu-engine.ts:2794` |
| AP.03 | Règlement téléchargé depuis le GPU puis lu | `src/lib/plu-pdf-extract.ts` (en-tête), URL GPU : `src/lib/plu-engine.ts:1352` |
| AP.03 | Emprise, retrait, hauteur, espaces verts ; page et extrait cités quand disponibles | `src/lib/plu-engine.ts` (`PluRagSnippet` : `ces`, `retrait`, `hauteur`, `espacesVerts`, `citations`) |
| AP.03 | Provenance : base de zones / lecture du règlement / profil de repli / estimation | `src/lib/feasibility-finance.ts:41` (`ConstraintSourceKind = "zone_db" \| "profile" \| "ai_pdf" \| "estimate"`) |
| AP.04 | Fourchette de surface de plancher seulement si emprise et hauteur sont des valeurs simples, sinon rien | `src/lib/parcel-preview-awareness.ts` (`previewEnvelopeFromRules` renvoie `null`) |
| AP.04 | Visualisation 3D | `components/three/ParcelScene.tsx`, `ParcelSceneV2.tsx` (`@react-three/fiber`) |
| AP.05 | Servitudes d'utilité publique via API Carto GPU | `src/lib/plu-engine.ts:2393-2480` (`fetchAssietteSupLayer`, couches `assiette-sup-p/l/s`) |
| AP.06 | Refus publiés Paris, Nantes Métropole et Anglet ; PC et DP ; lien vers la source ; sans données de demandeur | `src/lib/permit-refusal/open-data.ts` (`DATASETS`, `parseRecord`, `sourceUrl`), `components/gisement/published-refusals-panel.tsx:117,138,160` (texte « Décisions publiées par Paris, Nantes Métropole et Anglet »), `app/api/gisement/refused-permits/route.ts` (« sans nom du demandeur ») |
| AP.06 | Situé dans l'espace de prospection | `components/gisement/gisement-workspace.tsx:742` |

Écart avec la consigne initiale : la consigne citait « Paris + Nantes Métropole » ; le code expose aussi **Anglet** (`components/gisement/published-refusals-panel.tsx:138`). La page cite les trois, puisque c'est ce que fait l'outil. À trancher par Nadir s'il préfère ne pas citer Anglet.

## 3. Affirmations générales (méthode, limites, FAQ)

Pas de chiffre ni de fonctionnalité nouvelle : méthode générale du PLU (zones, secteurs, articles du règlement), limites reprises de `/faisabilite-fonciere` et de `DISCLAIMER_SHORT`. Le certificat d'urbanisme comme seul acte qui fige les règles : code de l'urbanisme, art. L410-1.
