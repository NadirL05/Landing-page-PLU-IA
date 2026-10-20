import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { ZONE_U as content } from "@/content/zonage-plu-zone-u";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function ZoneUPage() {
  return <MetierPage content={content} />;
}
