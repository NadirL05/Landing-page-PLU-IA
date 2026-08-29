import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { BILAN_PROMOTEUR as content } from "@/content/bilan-promoteur";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function BilanPromoteurPage() {
  return <MetierPage content={content} />;
}
