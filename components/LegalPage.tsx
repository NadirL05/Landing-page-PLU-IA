import type { ReactNode } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

interface LegalPageProps {
  readonly title: string;
  readonly intro: string;
  readonly updated: string;
  readonly children: ReactNode;
}

export function LegalPage({ title, intro, updated, children }: LegalPageProps) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <nav aria-label="Fil d’Ariane" className="mx-auto max-w-[900px] px-6 pt-8">
          <ol className="breadcrumb">
            <li><Link href="/">Accueil</Link></li>
            <li aria-current="page">{title}</li>
          </ol>
        </nav>

        <header className="mx-auto max-w-[900px] px-6 pb-12 pt-10">
          <div className="kicker mb-4">Informations juridiques</div>
          <h1 className="font-display text-4xl font-normal leading-tight tracking-tight md:text-5xl" style={{ color: "var(--ink)" }}>
            {title}
          </h1>
          <p className="mt-5 max-w-[68ch] text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            {intro}
          </p>
          <p className="font-mono mt-4 text-[11px]" style={{ color: "var(--ink-soft)" }}>
            Dernière mise à jour : {updated}
          </p>
        </header>

        <div className="mx-auto max-w-[900px] px-6 pb-24">
          <article className="legal-content spec-card p-7 md:p-10">{children}</article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export function LegalSection({ id, title, children }: { readonly id: string; readonly title: string; readonly children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
