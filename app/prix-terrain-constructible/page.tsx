import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { PRIX_TERRAIN_CONSTRUCTIBLE as content } from "@/content/prix-terrain-constructible";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function PrixTerrainConstructiblePage() {
  return <MetierPage content={content} />;
}
