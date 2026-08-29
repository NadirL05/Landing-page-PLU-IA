import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { PROSPECTION_FONCIERE as content } from "@/content/prospection-fonciere";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function ProspectionFoncierePage() {
  return <MetierPage content={content} />;
}
