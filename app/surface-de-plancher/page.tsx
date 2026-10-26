import type { Metadata } from "next";
import { MetierPage } from "@/components/metier/MetierPage";
import { SURFACE_DE_PLANCHER as content } from "@/content/surface-de-plancher";
import { buildMetierMetadata } from "@/lib/metier-metadata";

export const metadata: Metadata = buildMetierMetadata(content);

export default function SurfaceDePlancherPage() {
  return <MetierPage content={content} />;
}
