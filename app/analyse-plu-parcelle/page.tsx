import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { ANALYSE_PLU_PARCELLE as content } from "@/content/analyse-plu-parcelle";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function AnalysePluParcellePage() {
  return <MetierPage content={content} />;
}
