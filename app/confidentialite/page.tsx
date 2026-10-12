import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";
import { APP_URL, BRAND_NAME, COMPANY_NAME, CONTACT_EMAIL } from "@/config/brand";

const description = `Politique de confidentialité du site ${BRAND_NAME} : données traitées, cookies, mesure d’audience et droits RGPD.`;

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description,
  alternates: { canonical: "/confidentialite" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: BRAND_NAME,
    url: "/confidentialite",
    title: `Politique de confidentialité | ${BRAND_NAME}`,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fonciable — Analyse foncière" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Politique de confidentialité | ${BRAND_NAME}`,
    description,
    images: ["/opengraph-image"],
  },
};

export default function ConfidentialitePage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      intro={`Cette politique décrit les traitements réalisés sur le site public ${BRAND_NAME}. L’application dispose de sa propre politique, accessible depuis app.fonciable.fr.`}
      updated="12 octobre 2026"
    >
      <LegalSection id="responsable" title="1. Responsable du traitement">
        <p>
          Le responsable du traitement est Nadir Lahyani EI, exploitant {COMPANY_NAME} et le service {BRAND_NAME}. Pour toute
          question relative aux données personnelles, écrivez à <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>

      <LegalSection id="donnees" title="2. Données traitées sur cette landing">
        <ul>
          <li><strong>Données techniques :</strong> adresse IP, navigateur, appareil, journaux de sécurité et de disponibilité.</li>
          <li><strong>Choix de consentement :</strong> preuve et état de vos préférences enregistrés par notre gestionnaire de consentement.</li>
          <li><strong>Mesure d’audience :</strong> pages vues, événements de navigation et paramètres de campagne, uniquement après consentement.</li>
          <li><strong>Publicité :</strong> événements associés aux CTA, uniquement après consentement marketing.</li>
        </ul>
        <p>
          Cette landing ne comporte ni compte utilisateur ni formulaire de collecte. Un clic vers l’application, Calendly ou
          un autre service externe vous fait quitter ce site et relève alors de la politique du service concerné.
        </p>
      </LegalSection>

      <LegalSection id="finalites" title="3. Finalités et bases légales">
        <ul>
          <li>Servir, sécuriser et diagnostiquer le site : intérêt légitime à assurer son fonctionnement.</li>
          <li>Mémoriser et prouver vos choix de confidentialité : obligation légale et intérêt légitime.</li>
          <li>Mesurer l’audience et l’efficacité des campagnes : votre consentement.</li>
          <li>Personnaliser ou mesurer la publicité : votre consentement marketing.</li>
        </ul>
      </LegalSection>

      <LegalSection id="prestataires" title="4. Prestataires et destinataires">
        <p>
          Les données strictement nécessaires peuvent être traitées par Vercel (hébergement), consentmanager (gestion du
          consentement), Google (mesure d’audience et campagnes) et Meta (mesure publicitaire). Google et Meta ne sont chargés
          qu’après le consentement correspondant. Ces prestataires peuvent traiter des données hors de l’Espace économique
          européen selon les garanties prévues par leurs contrats et la réglementation applicable.
        </p>
        <p>
          Les données liées à un compte, une analyse ou un abonnement dans l’application sont décrites dans la politique de
          confidentialité de l’application : <a href={`${APP_URL}/confidentialite`}>{APP_URL}/confidentialite</a>.
        </p>
      </LegalSection>

      <LegalSection id="duree" title="5. Durées de conservation">
        <p>
          Les journaux techniques sont conservés pendant la durée nécessaire à la sécurité et au diagnostic. Les données de
          consentement, d’audience et de publicité suivent les durées configurées dans le gestionnaire de consentement et chez
          les prestataires concernés. Elles sont supprimées ou anonymisées lorsqu’elles ne sont plus nécessaires, sous réserve
          des obligations légales de conservation.
        </p>
      </LegalSection>

      <LegalSection id="droits" title="6. Vos droits">
        <p>
          Vous pouvez demander l’accès, la rectification, l’effacement, la limitation ou la portabilité de vos données, et vous
          opposer à un traitement fondé sur l’intérêt légitime. Vous pouvez retirer votre consentement à tout moment depuis le
          module de gestion des cookies du site, sans remettre en cause les traitements antérieurs.
        </p>
        <p>
          Adressez votre demande à <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Vous pouvez également introduire une
          réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">CNIL</a>.
        </p>
      </LegalSection>

      <LegalSection id="cookies" title="7. Cookies et traceurs">
        <p>
          Les traceurs nécessaires au fonctionnement et à la mémorisation de vos choix peuvent être déposés sans consentement.
          Les traceurs d’audience et de publicité restent désactivés tant que vous ne les avez pas acceptés. Vous pouvez modifier
          vos choix à tout moment au moyen de l’icône de confidentialité affichée par le gestionnaire de consentement.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
