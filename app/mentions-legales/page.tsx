import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";
import { APP_URL, BRAND_NAME, BRAND_URL, COMPANY_NAME, COMPANY_URL, CONTACT_EMAIL } from "@/config/brand";

const description = `Informations légales relatives à l’éditeur, à la publication et à l’hébergement du site ${BRAND_NAME}.`;

export const metadata: Metadata = {
  title: "Mentions légales",
  description,
  alternates: { canonical: "/mentions-legales" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: BRAND_NAME,
    url: "/mentions-legales",
    title: `Mentions légales | ${BRAND_NAME}`,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fonciable — Analyse foncière" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Mentions légales | ${BRAND_NAME}`,
    description,
    images: ["/opengraph-image"],
  },
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      title="Mentions légales"
      intro={`Informations relatives à l’exploitant, au directeur de la publication et à l’hébergement de ${BRAND_NAME}, un service ${COMPANY_NAME}.`}
      updated="12 octobre 2026"
    >
      <LegalSection id="editeur" title="1. Éditeur du site">
        <p>
          {BRAND_NAME} est un service de <strong>{COMPANY_NAME}</strong>, édité juridiquement par <strong>Nadir Lahyani EI</strong>,
          entrepreneur individuel immatriculé au Registre national des entreprises sous le numéro SIREN 942 311 333.
        </p>
        <ul>
          <li><strong>Nom commercial :</strong> {COMPANY_NAME}</li>
          <li><strong>Service :</strong> {BRAND_NAME}</li>
          <li><strong>Adresse :</strong> 61 rue de Lyon, 75012 Paris, France</li>
          <li><strong>SIREN :</strong> 942 311 333 — <strong>SIRET :</strong> 942 311 333 00010</li>
          <li><strong>TVA :</strong> non applicable, article 293 B du code général des impôts</li>
          <li><strong>Courriel :</strong> <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
          <li><strong>Site :</strong> <a href={BRAND_URL}>{BRAND_URL}</a></li>
        </ul>
        <p>
          Le site institutionnel de {COMPANY_NAME} est accessible sur <a href={COMPANY_URL}>{COMPANY_URL}</a>.
        </p>
      </LegalSection>

      <LegalSection id="publication" title="2. Direction de la publication">
        <p>
          Le directeur de la publication est Nadir Lahyani, en qualité d’entrepreneur individuel exploitant le service.
          Il peut être contacté à l’adresse <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>

      <LegalSection id="hebergement" title="3. Hébergement">
        <p>
          Le site est hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis —{" "}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>.
        </p>
      </LegalSection>

      <LegalSection id="propriete" title="4. Propriété intellectuelle">
        <p>
          Les textes, interfaces, éléments graphiques, marques et contenus propres à {BRAND_NAME} sont protégés par le droit
          de la propriété intellectuelle. Les données publiques réutilisées restent soumises à leurs licences respectives,
          précisées dans l’application sur <a href={`${APP_URL}/sources`}>{APP_URL}/sources</a>.
        </p>
      </LegalSection>

      <LegalSection id="responsabilite" title="5. Données publiques et responsabilité">
        <p>
          {BRAND_NAME} exploite notamment des données cadastrales, des documents d’urbanisme, des transactions immobilières
          et des données de risques. Les résultats sont des estimations d’aide à la décision : ils ne constituent ni un
          certificat d’urbanisme, ni une autorisation, ni un conseil juridique ou financier. Les vérifications auprès des
          services et professionnels compétents restent indispensables.
        </p>
        <p>
          Les conditions contractuelles de l’application sont disponibles sur{" "}
          <a href={`${APP_URL}/cgv`}>{APP_URL}/cgv</a>.
        </p>
      </LegalSection>

      <LegalSection id="droit" title="6. Droit applicable">
        <p>
          Le site et ses mentions légales sont soumis au droit français. Le service s’adresse aux professionnels ; tout
          litige relève des juridictions compétentes de Paris, sauf disposition légale impérative contraire.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
