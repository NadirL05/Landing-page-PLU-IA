"use client";

import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="fr">
      <body style={{ margin: 0, background: "#f8f5ee", color: "#16233d", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ display: "grid", minHeight: "100vh", placeItems: "center", padding: 24 }}>
          <div style={{ maxWidth: 560, textAlign: "center" }}>
            <p style={{ marginBottom: 12, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase" }}>Fonciable · AgentImpact</p>
            <h1 style={{ margin: 0, fontSize: 38 }}>Une erreur est survenue</h1>
            <p style={{ margin: "18px 0 28px", color: "#5d6677", lineHeight: 1.6 }}>
              La page n’a pas pu être affichée. Rechargez-la ou revenez à l’accueil.
            </p>
            <Link href="/" style={{ display: "inline-block", background: "#1d3a6e", color: "white", padding: "13px 20px", textDecoration: "none" }}>
              Retour à l’accueil
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
