import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { DENT_CREUSE as content } from "@/content/dent-creuse";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function DentCreusePage() {
  return <MetierPage content={content} />;
}
