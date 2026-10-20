import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { ZONE_A as content } from "@/content/zonage-plu-zone-a";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function ZoneAPage() {
  return <MetierPage content={content} />;
}
