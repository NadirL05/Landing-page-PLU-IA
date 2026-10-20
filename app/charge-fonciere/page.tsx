import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { CHARGE_FONCIERE as content } from "@/content/charge-fonciere";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function ChargeFoncierePage() {
  return <MetierPage content={content} />;
}
