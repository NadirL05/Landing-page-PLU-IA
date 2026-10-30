import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { ZONE_UA as content } from "@/content/zonage-plu-zone-ua";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function ZoneUAPage() {
  return <MetierPage content={content} />;
}
