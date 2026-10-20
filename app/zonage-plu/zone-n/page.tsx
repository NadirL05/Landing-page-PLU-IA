import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { ZONE_N as content } from "@/content/zonage-plu-zone-n";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function ZoneNPage() {
  return <MetierPage content={content} />;
}
