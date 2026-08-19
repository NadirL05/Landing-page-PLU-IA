/**
 * MCP Server Card — carte de découverte pour agents IA.
 *
 * PLU IA (cette landing) n'expose pas de serveur MCP en direct : c'est un
 * site marketing statique. L'outil réel (analyse de parcelle, zonage,
 * bilan promoteur) vit sur app-plu-ia.agentimpact.fr, sans endpoint MCP
 * live à ce jour. On documente donc honnêtement l'absence de transport
 * plutôt que d'inventer un endpoint qui n'existe pas — un agent qui lit
 * cette carte doit comprendre qu'il n'y a aujourd'hui aucune interaction
 * programmatique possible via MCP, seulement une découverte de contexte.
 */
export const dynamic = "force-static";

export async function GET() {
  const card = {
    serverInfo: {
      name: "PLU IA",
      version: "0.1.0",
      description:
        "PLU IA analyse une parcelle cadastrale française (zonage PLU, enveloppe constructible, comparables DVF, risques Géorisques, bilan promoteur) pour les professionnels de l'immobilier et de la promotion. Cette landing est un site marketing — l'outil s'utilise sur app-plu-ia.agentimpact.fr.",
    },
    transport: {
      type: "none",
      note: "Aucun serveur MCP en production à ce jour. Aucun endpoint live n'est exposé — ne pas tenter de s'y connecter.",
    },
    capabilities: {
      tools: false,
      resources: false,
      prompts: false,
    },
    links: {
      website: "https://plu-ia.agentimpact.fr",
      app: "https://app-plu-ia.agentimpact.fr",
      llmsTxt: "https://plu-ia.agentimpact.fr/llms.txt",
    },
  };

  return Response.json(card);
}
