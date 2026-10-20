import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { TERRAIN_CONSTRUCTIBLE as content } from "@/content/terrain-constructible";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function TerrainConstructiblePage() {
  return <MetierPage content={content} />;
}
