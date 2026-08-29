/**
 * Bloc JSON-LD unique du site.
 *
 * Piège connu (documenté dans app/page.tsx) : React échappe le texte enfant
 * au rendu SSR (« & » → « &amp; »), alors qu'un <script> parse son contenu en
 * « raw text », où les entités HTML ne sont PAS décodées par le navigateur.
 * Un « & » dans un libellé (« Cadastre & GASPAR ») serait donc exécuté
 * littéralement en « &amp; », corrompant la valeur JSON.
 *
 * Plutôt que d'injecter du HTML brut, on neutralise le problème à la source :
 * les trois caractères concernés (« & » que React échapperait, « < » et « > »
 * qui pourraient sinon fermer la balise) sont réécrits en séquences \uXXXX.
 * Une chaîne JSON accepte ces séquences : la valeur analysée est strictement
 * identique, mais le texte rendu ne contient plus rien à échapper.
 *
 * `schema` provient exclusivement de constantes et de fichiers JSON statiques
 * versionnés dans ce dépôt : cette landing n'a ni formulaire, ni base de
 * données, ni paramètre d'URL rendu dans le HTML.
 */
const CHARS_TO_ESCAPE = /[<>&]/g;

function escapeForScriptTag(value: unknown): string {
  return JSON.stringify(value).replace(
    CHARS_TO_ESCAPE,
    (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`
  );
}

export function JsonLd({ schema }: { schema: unknown }) {
  return <script type="application/ld+json">{escapeForScriptTag(schema)}</script>;
}
