import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { ZONE_AU as content } from "@/content/zonage-plu-zone-au";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function ZoneAuPage() {
  return <MetierPage content={content} />;
}
