import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { CERTIFICAT_URBANISME as content } from "@/content/certificat-urbanisme";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function CertificatUrbanismePage() {
  return <MetierPage content={content} />;
}
