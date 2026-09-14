# Handover assessment

An evidence-based review of the state aventawindows.com was left in, September
2026, after the third-party developer's departure.

**Purpose.** To give Sophia an accurate picture of what was inherited, to inform
whether the site should be repaired or rebuilt, and to serve as a factual record
if the engagement is ever discussed with the developer, the GM or the board.

**Method.** Every item below was read directly from the code or measured from
the live site or hosting account. Each cites its evidence. Nothing here is
inferred. Items that remain uncertain live in `BACKLOG.md` marked *Suspected*
and are deliberately excluded from this document.

**A note on fairness.** Much of this work was competent. The findings below are
concentrated in a few areas rather than spread across the whole build, and the
assessment opens with what holds up, because that bears directly on the
repair-or-rebuild decision.

---

## What holds up

These are not consolation prizes. They are load-bearing.

**Cumulative Layout Shift is 0.** Measured by Google on real user traffic over 28
days. Nothing on the page jumps or reflows while loading. This is genuinely
difficult and a large share of professional sites fail it.

**Lighthouse SEO 92, Best Practices 96.** The structural fundamentals are sound.

**Bilingual infrastructure is correctly built.** `vue-i18n` is properly wired,
and `es.json` and `en.json` are in exact parity: 120 keys each, zero mismatches.
The mechanism works. The problem is how little of the site was connected to it.

**The component architecture is reasonable.** 11 pages, 18 shared components,
layouts and composables separated sensibly. A competent developer can work in
this codebase.

**Analytics and conversion tracking are properly instrumented.** Google Tag
Manager, Google Ads conversion IDs and HubSpot forms are all correctly embedded
in `welcome.blade.php`, including per-event conversion mapping for WhatsApp,
phone and social clicks.

The conclusion this supports: **this site should be repaired, not rebuilt.**

---

## 1. A deployment design that silently discards your changes

**Severity: critical. This is the most consequential finding.**

`bootstrap/app.php` never calls `usePublicPath()`, so Laravel's `public_path()`
resolves to `/home/aveniqck/aventa/public`. But the document root, confirmed
through `public_html/index.php`, is `/home/aveniqck/public_html`.

The consequence is that `@vite()` in `welcome.blade.php` reads its manifest from

```
/home/aveniqck/aventa/public/build/manifest.json
```

while the browser downloads the hashed asset files from

```
/home/aveniqck/public_html/build/
```

Two different directories, both required, neither obviously related to the
other. Deploying to only the document root, which is the intuitive thing to do
and what every generic Laravel guide describes, leaves Laravel reading a stale
manifest and emitting the previous build's filenames. Those files still exist,
because nothing is ever deleted. **The site continues serving the old version
with no error, no warning, and no indication that anything went wrong.**

The evidence that this actually happened repeatedly: `aventa/public/build` is
240 MB and `public_html/build` is 167 MB. A single build of this project is a
fraction of that. Both directories are strata of every deploy ever made.

This is fixable in one line, and should be fixed before anything else is
deployed.

## 2. A 124 MB file preloaded on every page

**Severity: critical.**

`resources/views/welcome.blade.php`, line 8:

```html
<link rel="preload" href="/models/house_aventa.glb" as="fetch" crossorigin>
```

`rel="preload"` instructs the browser to fetch a resource immediately at high
priority. The file is 124 MB. This tag is in the `<head>` of every page.

It is then requested a second time by `MainLayout.vue`, which wraps every page:

```js
onMounted(() => { if (status.value !== 'loaded') preload(); })
```

And a third time by `VsModal.vue`, which is the only place the model is ever
displayed, and which is a modal the visitor has to deliberately open.

So the model is fetched eagerly, twice, on every page view, to support a feature
most visitors never trigger. On a mobile connection this consumes the bandwidth
that would otherwise be rendering the page, and it consumes the visitor's own
mobile data allowance.

Measured effect on real users over 28 days: First Contentful Paint 3.1 s against
a 1.8 s threshold, Largest Contentful Paint 3.9 s against 2.5 s, Core Web Vitals
assessment **Failed**.

The model itself is also almost certainly an unoptimised export. GLB files of
this kind routinely compress by 90% or more with no visible quality loss.

## 3. Bilingual in the navigation only

**Severity: high.**

The site presents a language switcher on every page. Measured i18n usage:

| Page | i18n calls |
|---|---|
| `Inicio.vue` (homepage) | 94 |
| `Ventanas.vue` (windows) | 1 |
| `Puertas.vue` (doors) | 1 |
| `Merida.vue` | 1 |
| `Contacto.vue` | 0 |
| `Catalogo.vue` | 0 |

Locale key prefixes corroborate: 99 `ini_`, 11 `nav_`, 5 `f_`, 3 `found_`,
2 `con_`. Nothing else exists.

Approximately 224 user-facing strings across the site are hardcoded Spanish in
the templates and in JavaScript arrays, for example in `Ventanas.vue`:

```js
const beneficios = [
    'Silencio y confort: Aislamiento acústico y térmico que...',
```

An English-speaking visitor switches language, sees an English homepage, clicks
Ventanas, and lands on Spanish. The switcher advertises a capability that exists
for one page out of eleven.

Compounding it, `welcome.blade.php` line 2 hardcodes `<html lang="es">`, which
never changes with the locale. Every English page declares itself Spanish to
search engines and screen readers.

## 4. Site media kept outside the project entirely

**Severity: high.**

`public_html/media/` is 1,134 MB. The project's entire `public/` directory is
364 MB and contains no `media` folder at all. `public_html/proyectos/` is 102 MB
while the project's `public/proyectos/` is empty.

So roughly 1.24 GB of what the website serves was uploaded straight to the
document root and never existed in the project. It is absent from the codebase,
absent from the three backup zips on the server, which snapshot `aventa/`
rather than `public_html/`, and would have been absent from any version control.

The practical effect is that a complete backup of the project is not a backup of
the site, and nothing in the handover made that distinction visible. Had the
hosting account been lost at any point, the photography would have been gone.

## 5. Accessibility treated as optional

**Severity: medium, with commercial consequences.**

Measured Lighthouse accessibility score: **77**.

In the code: 23 instances of `alt=""` and 6 placeholder values such as
`alt="img_home"` and `alt="icono_ir"`, which describe the variable rather than
the image.

Also flagged: insufficient colour contrast, links with no discernible name,
iframes without titles, no main landmark, and touch targets too small or too
closely spaced.

The last of these is a direct conversion issue rather than a compliance one.
Over 70% of Aventa's leads come from paid Meta and Google, predominantly mobile.
Buttons that are difficult to tap on a phone lose form submissions that were
paid for at the moment of the click.

The missing alt text is simultaneously an SEO defect: Aventa competes on visual
quality, holds a 1.1 GB photography library, and none of it is legible to a
search engine.

## 6. The project could not be built from a clean checkout

**Severity: high. Discovered by attempting it.**

`resources/js/app.js` line 10:

```js
import '@flaticon/flaticon-uicons/css/regular/rounded.css'
```

That package appeared in neither `package.json` nor `package-lock.json`. A clean
checkout followed by `npm install && npm run build` failed outright.

The site built on the developer's machine because the package was installed
there locally and never recorded. Nobody else could reproduce a build, which
means no colleague, contractor or successor could have shipped a change without
first diagnosing this.

Handing over a project that does not build is a more consequential omission than
any single item in section 7, because it blocks every other kind of work.

## 7. Code hygiene

**Severity: low individually. Collectively it indicates the absence of review.**

**A corrupted duplicate component is sitting in the repository.** Two files
exist:

```
resources/js/src/components/ConfigDiseños.vue    (ñ  = UTF-8 C3 B1)
resources/js/src/components/ConfigDiseдos.vue    (д  = Cyrillic, UTF-8 D0 B4)
```

The second is a character-encoding accident that replaced `ñ` with a Cyrillic
`д`. Only the correct file is imported, in `routes.js`. The broken duplicate was
created, never used, and never removed. Nobody read the directory listing
afterwards.

**Editor configuration was committed.** `.idea/` (PhpStorm, 0.43 MB) and
`.vscode/` were both left in the project.

**Line endings are inconsistent.** `public_html/index.php` carries CRLF
terminators, consistent with Windows editing against a Linux server, with no
`.gitattributes` normalisation in place to manage it.

## 8. Handover practice

**Severity: high, and the reason the first days of this engagement were spent on
recovery rather than work.**

**No version control was transferred.** There is no `.git` directory anywhere on
the server. The developer worked locally and uploaded files. The entire history
of the project exists only in a personal repository that was not handed over.

**No local copy was provided.** At handover, the only copy of the site's source
code in Aventa's possession was the one on the production server.

**The only documentation was a Windows setup guide.** `GUIA.txt` covers adding
PHP to the Windows PATH and running `php artisan dev`. It contains nothing about
the deployment process, the split between `aventa/` and `public_html/`, the
manifest behaviour described in section 1, where the media lives, or how to
release a change safely. Every one of those had to be reverse-engineered.

**Bundled Windows binaries.** The handover package included PHP 8.3, 8.4 and 8.5
plus Node as Windows executables, which do not run on the client's Mac.

---

## Assessment

The build is structurally sound and worth keeping. The failures cluster in three
places: **release engineering** (section 1), **performance discipline**
(section 2), and **handover practice** (section 7).

Sections 1 and 7 compound each other. A deployment process that silently
discards changes is difficult to diagnose at the best of times. Handing it over
with no documentation, no version history and no local copy meant the client had
no way to discover it before shipping a change that appeared to do nothing.

Sections 1, 2 and 3 are all fixable within the existing codebase. None requires
a rebuild.

**Three fixes, in order:**

1. The public path, so deployments stop silently failing. One line.
2. The model preload, so the site stops shipping 124 MB to every visitor. One
   line, plus scoping the load to the modal that uses it.
3. The remaining pages into the locale files, so the language switcher tells the
   truth. Roughly 224 strings, page by page.

The full working list, including unverified items, is in `BACKLOG.md`.
