import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { ZONE_UC as content } from "@/content/zonage-plu-zone-uc";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function ZoneUCPage() {
  return <MetierPage content={content} />;
}
