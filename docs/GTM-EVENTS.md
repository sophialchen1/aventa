# GTM events

What the site pushes into the Google Tag Manager dataLayer, and what Ian has to
build on top of it.

Container: **GTM-NV4MJRZX**, loaded in `resources/views/welcome.blade.php`.
Code: `resources/js/src/lib/track.js`.

## What the site does and does not do

The site only announces that a click happened and where it sits. It does not
talk to Google Analytics or Google Ads.

**Traffic source is not in these events on purpose.** GA4 already attaches the
source, medium, campaign and the full set of UTMs to every event it receives,
including these. Putting it in the code as well would only give two numbers that
disagree. So the split Sophia asked for, "was this click Google Ads or direct",
is a GA4 report: the event is the row, the source is the column.

## Events

Every event also carries:

| Parameter | Value |
|---|---|
| `page_path` | the page the click happened on, e.g. `/catalogo` |
| `site_language` | `es` or `en` |

| Event | Extra parameters | Where it fires |
|---|---|---|
| `whatsapp_click` | `link_location` | every WhatsApp link on the site |
| `design_assistant_click` | `link_location` | product menu, "Explore our design assistant" |
| `quote_submit` | `link_location` | quote form, once it validates and the thank-you shows |
| `catalog_download` | `link_location`, `file_name` | catalogue page CTA |
| `doc_download` | `link_location`, `file_name` | How to Buy menu, purchase process PDF |

`link_location` values in use today:

- `menu_productos` — the Doors / Windows mega-menu, desktop and mobile
- `boton_flotante` — the green WhatsApp button that follows the page
- `inicio_asistente` — homepage, the assistant section CTA
- `catalogo_cta` — catalogue page download button
- `menu_como_comprar` — How to Buy menu
- `formulario_cotizacion` — the quote form

All WhatsApp links share one event name and differ by `link_location`, so the
total is one number and the breakdown by placement is one dimension.

## Two WhatsApp numbers, on purpose

The site has two WhatsApp numbers and they are not a mistake. 55 3463 4662 is
the ThreeKit bot, 415 124 6467 is a real line. They must stay separate, so the
social icons in the top bar and the footer are deliberately left on their own
Google Ads conversion (`whatsapp_sec`) and out of `whatsapp_click`. Do not merge
them to make the numbers tidier.

## What Ian builds in GTM

1. **Variables.** Data Layer Variable for each of `link_location`, `file_name`,
   `page_path`, `site_language`. Name them the same as the key.
2. **Triggers.** A Custom Event trigger per event name above. The event name is
   an exact match, no regex needed.
3. **Tags.** A GA4 Event tag per trigger, passing the variables through as event
   parameters. Keep the GA4 event name identical to the dataLayer event name.
4. **GA4 custom dimensions.** Register `link_location`, `file_name` and
   `site_language` as event-scoped custom dimensions in GA4, or they will not
   appear in reports. This is the step people forget.
5. **Google Ads.** For anything that should also count as a conversion,
   `quote_submit` and `whatsapp_click` above all, add a Google Ads Conversion
   tag on the same trigger. Do not remove the existing hardcoded conversions
   until the new ones are recording, then they can come out of the code.

## Reports worth building first

- `quote_submit` by session source / medium. Which channel actually produces
  leads, not clicks.
- `whatsapp_click` by `link_location`. Whether the floating button, the menu or
  the homepage CTA is carrying WhatsApp volume.
- `catalog_download` by `site_language`. How much English demand exists.
- Any event by landing page. Which page does the converting, not which page gets
  the traffic.

## Adding an event later

Import `track` and call it. Nothing else.

```js
import { track } from "../lib/track.js";

track("whatsapp_click", { link_location: "pie_de_pagina" });
```

A new `link_location` needs no GTM change: it shows up in the existing reports
as a new value. A new **event name** does need a trigger and a tag, so prefer
reusing an event name with a new location where that is honest.

Event names and parameter names are a contract with GTM. Renaming one breaks
Ian's tags without breaking the site. Add, do not rename.
