import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { FAISABILITE_FONCIERE as content } from "@/content/faisabilite-fonciere";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function FaisabiliteFoncierePage() {
  return <MetierPage content={content} />;
}
