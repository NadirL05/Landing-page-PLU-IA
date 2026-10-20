import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { DIVISION_PARCELLAIRE as content } from "@/content/division-parcellaire";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function DivisionParcellairePage() {
  return <MetierPage content={content} />;
}
