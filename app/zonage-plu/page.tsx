import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { ZONAGE_PLU as content } from "@/content/zonage-plu";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function ZonagePluPage() {
  return <MetierPage content={content} />;
}
