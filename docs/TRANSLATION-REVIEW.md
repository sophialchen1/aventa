# Still to review

Open items from the English translation work. Updated 21 September 2026.

Two kinds of item are mixed here on purpose: things Ian's guide
(`docs/reference/translation-guide-EN.md`) asks for, and things we found in the
code along the way that the guide never mentions. Each one says which.

---

## Blocking

### The quote form is untranslated and cannot be fixed in code alone
**On the guide, section 10.**

`formGrande.vue` is the quote form on Contacto and Inspiración. It is fully
hardcoded Spanish.

Translating the labels is not enough. The CRM properties, the dropdown values,
the validation messages, the thank-you message and the internal notification
emails all live inside HubSpot. Ian's note says an English site needs a parallel
English form mapped to the same CRM properties, otherwise lead reporting and
attribution break.

This is a HubSpot job first, a code job second. The guide says to coordinate with
Ian before touching it. Nothing has been changed.

### The Planea tu Visita form sends nothing
**Not on the guide. Found in the code.**

`PlaneaVisita.vue` validates the fields, shows "¡Gracias por enviar tu
formulario!" and stops. There is no POST, no HubSpot call, and the first and last
name inputs have no `name` attribute at all.

The visitor thinks they booked a visit. Check HubSpot for whether any of these
submissions have ever arrived. If they have not, every visit request from this
page since launch has been lost.

### The Inspiración guide PDF only exists in Spanish
**On the guide, section 8.**

The Download Guide button points at one file with no language switch, so an
English visitor gets a Spanish PDF. Needs an English file, then a one-line code
change.

The catalogue does not have this problem. `Catalogo.vue` already switches between
an ES and an EN brochure. The guide's blocker note on the catalogue is out of
date.

---

## Copy decisions for Sophia or Ian

### FAQ 5 may need rewriting for a foreign reader
**On the guide, section 12.**

"¿En qué partes del país trabajan?" now reads "We work in various regions across
Mexico" in English, so a foreign reader knows which country. If the English site
is meant for buyers outside Mexico, the question and answer need rewriting to say
whether Aventa serves them. Sales question, not a translation one.

### The sales paragraph on Recursos ends oddly in Spanish
**On the guide, section 12.**

"Obtén tu solución con base en los datos técnicos y los plazos de entrega" reads
as disconnected from the sentence before it. The English version folds it in. The
guide suggests fixing the Spanish the same way. Left as written.

### "Shutters y postigos" is redundant in Spanish
**On the guide, section 5.**

`ven_feature6` reads "Compatibles con shutters, postigos y mosquiteros". The two
words mean nearly the same thing. Translated faithfully, Spanish left alone.

### The Maintenance card has no description
**On the guide, section 12.**

The other four document cards have a title and a sentence. Maintenance has a
title and "Perfiles de Madera y PVC", which is a subtitle. Possibly missing copy.

### The comparison table has no heading on either page
**Decided, noted for the record.**

The guide asked to unify it. Puertas had "Desempeño o estructura", Ventanas had
nothing. Sophia chose the Ventanas format, so neither page has one now and the
`comp_header` key was removed.

### The footer "Nosotros" link goes nowhere
**On the guide, section 2.**

`to=""` in `bottombar.vue`. The guide says to confirm the destination. Needs a
page or a different target.

---

## Not translated yet

Each of these is real, scoped work, not a cleanup.

| What | File | Size |
|---|---|---|
| Quote form | `layouts/formGrande.vue` | large, blocked, see above |
| Aviso de Privacidad | `pages/AvisoPrivacidad.vue` | large, legal |
| Condiciones de Venta | `pages/CondicionesVenta.vue` | large, legal |
| Términos de Compra | `pages/TerminosCompra.vue` | large, legal |
| Política de Garantía | `pages/PoliticaGarantia.vue` | large, legal |
| Design Experience | `pages/DesignExperience.vue` | medium |
| Mérida launch page | `pages/Merida.vue` | medium, see below |

The four legal pages are already written in English inside the Spanish page, in
places. They need checking rather than translating.

---

## Mérida

The showroom is closed. It is off the locations map on the homepage and Contacto.

Three references remain, all left deliberately:

- `/merida`, the launch page, is still live and reachable
- The Planea tu Visita form still offers Mérida as a place to book a visit
- `data/paises.js` lists Mérida among Mexican cities, which is a geography list,
  not an Aventa location, and should stay

Decide whether to retire the page and the booking option.

---

## Smaller things found in the code

**Two locale keys are empty.** `ini_alba_dp1` and `ini_alba_dp2` are blank
strings in both languages and render as nothing. Unfinished copy for the Albatros
project.

**Nine keys are defined but unused.** `con_p1`, `con_t1`, `ini_alba_dp2`,
`ini_btn4`, `ini_cocomprar`, `ini_p14`, `ini_p15`, `ini_soluciones`, `ini_sub`.
Harmless, but they are old copy nobody is reading.

**No FAQ structured data.** The guide suggests adding schema.org `FAQPage` markup
to the Recursos FAQ in both languages. Good for search results. Not done.

---

## Done

For orientation. All of this is on GitHub and verified building.

| Section | Page |
|---|---|
| 1 | Header, complete, desktop and mobile |
| 2 | Footer, complete |
| 3 | Homepage and the shared locations block, complete |
| 4 | Puertas, complete |
| 5 | Ventanas, complete |
| 6 | Comparison table, complete, one shared key set for both pages |
| 7 | Catálogo, complete |
| 8 | Inspiración, complete except the PDF above |
| 9 | Contacto, complete except the HubSpot form |
| 10 | Quote form: labels and placeholders done, submitted values blocked on HubSpot |
| 11 | Planea tu Visita, complete |
| 12 | Recursos para Profesionales, complete |
| 13 | Configurador, complete. Note: nothing on the site links to `/config-diseno` |
| 14 | SEO metadata, complete, both languages |

416 keys in each language file, perfect parity.

`npm run build` runs `scripts/check-locales.mjs` first. It compiles every
message, refuses bare `@` or `|` characters, and fails on any key that exists in
one language but not the other.
