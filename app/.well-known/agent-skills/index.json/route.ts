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
        // Identifiant renommé le 21/10/2026 (ancien nom de marque retiré,
        // décision de Nadir ; historique dans docs/IMPLEMENTATION_PLAN.md F8).
        // Aucune URL ne contenait l'ancien identifiant : pas de redirection.
        name: "fonciable-context",
        type: "context",
        description:
          "Contexte Fonciable : analyse de parcelle française (zonage PLU, enveloppe constructible, comparables DVF, risques Géorisques, bilan promoteur) pour les professionnels de l'immobilier et de la promotion. Voir llms.txt pour le résumé complet du produit, des sources de données et des tarifs.",
        url: "https://fonciable.fr/llms.txt",
      },
    ],
  };

  return Response.json(index);
}
