/**
 * Agent Skills Discovery — index minimal décrivant ce qu'un agent peut
 * apprendre en visitant ce site (aucun outil exécutable, seulement du
 * contexte de découverte : voir llms.txt pour le contenu complet).
 */
export const dynamic = "force-static";

export async function GET() {
  const index = {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        // Identifiant technique historique conservé pour ne pas casser les
        // consommateurs ayant déjà enregistré cette ressource de découverte.
        name: "plu-ia-context",
        type: "context",
        description:
          "Contexte Fonciable : analyse de parcelle française (zonage PLU, enveloppe constructible, comparables DVF, risques Géorisques, bilan promoteur) pour les professionnels de l'immobilier et de la promotion. Voir llms.txt pour le résumé complet du produit, des sources de données et des tarifs.",
        url: "https://fonciable.fr/llms.txt",
      },
    ],
  };

  return Response.json(index);
}
