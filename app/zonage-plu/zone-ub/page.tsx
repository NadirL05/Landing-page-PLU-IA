import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { ZONE_UB as content } from "@/content/zonage-plu-zone-ub";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function ZoneUBPage() {
  return <MetierPage content={content} />;
}
