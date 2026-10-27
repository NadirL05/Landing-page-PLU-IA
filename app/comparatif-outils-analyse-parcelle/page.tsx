import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { COMPARATIF_OUTILS_ANALYSE_PARCELLE as content } from "@/content/comparatif-outils-analyse-parcelle";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function ComparatifOutilsAnalyseParcellePage() {
  return <MetierPage content={content} />;
}
