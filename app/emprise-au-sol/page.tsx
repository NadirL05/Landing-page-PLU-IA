import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { EMPRISE_AU_SOL as content } from "@/content/emprise-au-sol";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function EmpriseAuSolPage() {
  return <MetierPage content={content} />;
}
