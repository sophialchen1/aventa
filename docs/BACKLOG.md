# Aventa website: what needs fixing

Everything found during the September 2026 handoff from the previous developer.
This is the working list. Update it as items are resolved; do not delete
resolved items, strike them and note the date.

Each item is marked **Confirmed** (measured or read directly) or **Suspected**
(inferred, needs checking). Do not act on a Suspected item without verifying.

---

## P0 · Data loss risk

The site currently has one copy of itself. Everything here is about that.

### 1. 1,134 MB of site media exists in exactly one place
**Confirmed.** `public_html/media/` is 1,134 MB. The project folder
(`aventa/public/`) is 364 MB total and contains no `media` directory at all.
That media is not in the project, not in GitHub, and not in any of the three
zip backups on the server, which snapshot `aventa/` rather than `public_html/`.

If the hosting account were lost or corrupted, the photography is gone.

**Fix:** download `public_html/media/` and store it somewhere independent
(Google Drive is already connected and is fine). Then decide on a permanent
home. Not GitHub: git stores every version of every file forever and handles
large binaries badly.

### 2. `public_html/proyectos/` is also server-only
**Confirmed.** 102 MB live, and the project's own `public/proyectos/` is empty
(0.00 MB). Same exposure as above, same fix.

### 3. The 124 MB 3D model needs a home
**Confirmed.** `public/models/house_aventa.glb` is 124 MB, over GitHub's 100 MB
per-file hard limit, so it is gitignored. It currently exists on the server
twice and on Sophia's Mac. Not urgent, but it is outside version control and
should be deliberately backed up rather than incidentally surviving.

### 4. Previous developer's access has not been reviewed
**Suspected.** He had cPanel and FTP access until recently and his GitHub
repository was never handed over. Standard practice on any handover is to
rotate credentials. Worth checking the cPanel FTP account list and any
sub-accounts.

Related: `.trash` in the home directory showed a modification at 1:04 AM on a
day Sophia was not working in it. Probably routine, worth one look.

---

## P1 · Costing money now

Over 70% of leads come from paid Meta and Google. Everything here degrades the
return on that spend.

### 4b. The 124 MB 3D model is preloaded on every single page
**Confirmed.** This is the single highest-value fix on this list and it is one
line of code.

`resources/views/welcome.blade.php` line 8:

```html
<link rel="preload" href="/models/house_aventa.glb" as="fetch" crossorigin>
```

That sits in the `<head>` of every page on the site. `rel="preload"` instructs
the browser to fetch the file **immediately, at high priority**, before it gets
to the things the visitor actually needs. It is also requested again from
`MainLayout.vue`, which wraps every page.

So every visitor to every page begins downloading 124 MB the moment they arrive,
competing for bandwidth with the CSS, the JavaScript and the images that would
otherwise render the page. This answers the open question from item 7: the model
is not lazy-loaded on interaction. It loads everywhere, always.

This very likely accounts for most of the 3.1 s blank screen in item 5, and for
the image that "takes forever to load".

**Fix:** remove the preload, and load the model only on the page and interaction
that actually needs it (the comparison modal in `VsModal.vue`). Then compress
the model per item 7. Verify with a fresh PageSpeed run before and after.

**Caution:** the 3D house is presumably a deliberate product feature. The fix is
to stop loading it for people who never open it, not to remove the feature.
Check with Sophia on where it is meant to appear.

### 5. Mobile visitors see a blank screen for 3.1 seconds
**Confirmed.** Google Core Web Vitals assessment: **Failed**.

| Metric | Measured | Google's "good" threshold |
|---|---|---|
| First Contentful Paint | 3.1 s | under 1.8 s |
| Largest Contentful Paint | 3.9 s | under 2.5 s |
| Time to First Byte | 1.3 s | under 0.8 s |
| Cumulative Layout Shift | 0 | under 0.1 (this one is excellent) |

FCP and LCP being only 0.8 s apart is the important detail. The delay is not the
hero image, it is that nothing renders at all until the JavaScript bundle
downloads and boots. Roughly: 1.3 s waiting on the server, 1.8 s more before the
first pixel, 0.8 s more for the main image.

Google factors landing page experience into Ads Quality Score, which sets cost
per click. So this raises the price of every future click as well as losing
visitors on the current ones.

**Fix:** needs the Performance section of the PageSpeed report to scope
properly. Likely candidates: reduce the initial JavaScript bundle, add a real
loading state instead of a blank page, and address server response time.

### 6. Images are unoptimized originals
**Suspected, strongly.** `puertas_home.JPG` carries an uppercase extension,
which is what cameras and phones produce and what web tooling never produces.
The media library is 1,134 MB. Taken together this points at full-resolution
originals being served directly.

**Fix:** resize to the dimensions actually displayed, compress, serve WebP or
AVIF, and add responsive sizes so phones do not download desktop images. Verify
the premise first by checking the file size of two or three images.

### 7. The 3D model is almost certainly uncompressed
**Suspected.** 124 MB is extreme for a single GLB. Models like this routinely
compress by 90%+ with Draco or Meshopt with no visible quality loss.

**Answered, and worse than assumed.** See item 4b: the model is preloaded in the
`<head>` of every page, so every visitor on every page downloads 124 MB at high
priority. The earlier guess that the homepage LCP of 3.9 s meant the model was
not loading there was wrong. Remove the preload first (4b), then compress.

### 8. Touch targets are too small on mobile
**Confirmed.** Lighthouse accessibility audit: "Touch targets do not have
sufficient size or spacing." Most paid traffic is mobile. Buttons that are hard
to tap cost form submissions directly, and this is a conversion issue, not a
compliance one.

---

## P2 · Reach and quality

### 9. The site is not actually bilingual
**Confirmed. Homepage fixed 2026-09-14, ten pages remain.**

> **Progress:** the homepage is done. 18 hardcoded strings were wired to i18n,
> 11 new keys added, parity now 131/131. Remaining: Ventanas (28 strings),
> Puertas (25), PlaneaVisita (30), Merida (10), Contacto (9), Inspiracion (7),
> Catalogo (5), plus leftovers in navbar and bottombar. AvisoPrivacidad (32) is
> deliberately excluded, see below.

**Original finding.** The language toggle promises English; the site delivers it for
the homepage, navigation and footer only.

| Page | i18n calls |
|---|---|
| `Inicio.vue` (homepage) | 94 |
| `Ventanas.vue` (windows) | 1 |
| `Puertas.vue` (doors) | 1 |
| `Merida.vue` | 1 |
| `Contacto.vue` | 0 |
| `Catalogo.vue` | 0 |

Locale key prefixes confirm the same shape: 99 `ini_`, 11 `nav_`, 5 `f_`,
3 `found_`, 2 `con_`, and nothing else. Every other page has Spanish hardcoded
in its template, for example `>Cotizar Proyecto<` and `>El equilibrio perfecto
entre estética y eficiencia.<` in `Ventanas.vue`.

A visitor switching to English and clicking Ventanas lands on Spanish. This
matters for the US market and for any international architect evaluating Aventa.

**Fix:** extract each page's strings into `es.json`, translate into `en.json`,
replace with i18n keys. Scoped work, page by page. `es.json` and `en.json` are
currently in perfect parity at 120 keys each, so the foundation is sound.

### 9b. The page always declares itself Spanish
**Confirmed.** `resources/views/welcome.blade.php` line 2 is hardcoded:

```html
<html lang="es">
```

It never changes when a visitor switches to English. That attribute is how
search engines decide which language a page is in and how screen readers choose
a pronunciation. An English page announcing itself as Spanish undercuts the
English version in search and reads incorrectly to assistive technology.

**Fix:** set `lang` from the active locale.

### 10. Images have no alt attributes
**Confirmed.** Flagged in both the SEO and Accessibility audits. Alt text is how
Google understands an image. Aventa has a 1.1 GB photography library that search
engines currently cannot read, while competing on visual quality.

### 11. Accessibility score is 77
**Confirmed.** Specific failures: insufficient colour contrast, links without a
discernible name, iframes without titles, no main landmark, plus the alt text
and touch target items above.

### 12. Browser errors are being logged on the live site
**Confirmed** that errors occur; **unknown** what they are. Lighthouse flags
"Browser errors were logged to the console." Needs the console output read.

---

### 12b. The project could not be built from a clean checkout
**Confirmed. Fixed 2026-09-14.**

`resources/js/app.js` line 10 imports `@flaticon/flaticon-uicons`, which
appeared in neither `package.json` nor `package-lock.json`. Anyone cloning the
repository and running `npm install && npm run build` got a module resolution
failure and no site.

It worked only on the previous developer's machine, where the package was
installed locally but never recorded as a dependency. Added to `package.json`
and verified with a clean build.

Worth noting for the future: this is exactly the class of defect that having the
code in version control surfaces immediately and having it only on one laptop
hides indefinitely.

### 12c. `npm ci` fails on platform-specific binaries
**Confirmed. Workaround known, no fix needed yet.**

`npm ci` does not reliably install the platform-native binaries for `rollup`,
`lightningcss` and `@tailwindcss/oxide`, even though the lockfile lists them.
This is a known npm bug rather than anything wrong with this project.

If `npm run build` fails with "Cannot find module '@rollup/rollup-...'" or
"Failed to load native binding", the fix is to use `npm install` rather than
`npm ci`, or to install the binaries for your platform explicitly. On a Mac the
names end in `-darwin-arm64` (Apple Silicon) or `-darwin-x64` (Intel).

## P3 · Housekeeping and unknowns

### 13. Roughly 2.9 GB of redundant files on the hosting account
**Confirmed.** Of 5,536 MB total usage:

| | |
|---|---|
| `aventa.zip`, `aventa-old.zip`, `CF AventaW 270525.zip` | 1,157 MB |
| `respaldo_antigua/` | 997 MB |
| `aventa-old/` | 629 MB |
| `logs/` | 95 MB |
| `tmp/` | 32 MB |

Do not delete any of it until P0 items 1 and 2 are done and verified. After
that, this is a twenty minute cleanup.

### 14. `public_html/build/` has accumulated 167 MB of dead files
**Confirmed.** Vite gives every built file a content-based hash in its name, so
uploading a new build without removing the old one leaves every previous version
in place permanently. This is why DEPLOY.md says to rename the old `build`
folder rather than merge into it.

### 15. `public_html` and `aventa/public` have diverged
**Confirmed.** They were described as a mirror. They are not.

| | Project | Live |
|---|---|---|
| `media` | absent | 1,134 MB |
| `proyectos` | 0 MB | 102 MB |
| `models` | 124 MB | 132 MB |
| `build` | 240 MB | 167 MB |

Meaning the live site serves files the project has never contained. Any future
automated deploy has to account for this or it will delete live content.

### 16. Four subdomain folders of unknown purpose
**Unknown.** `blog.aventawindows.com`, `pay.aventawindows.com`,
`portal.aventawindows.com`, `info.aventawindows.com`. All tiny (0.02 MB), all
created the same day in April 2026. `info.` is known to run on HubSpot Content
Hub, so that folder is likely vestigial. The other three are unexplained.
`pay.` and `portal.` are worth understanding before anything is deleted.

Also `aventawindows.com/` (0.00 MB, January 2025), a folder named after the
domain, predating the current setup.

### 17. `Merida.vue` page exists
**Unknown.** There is a page for Mérida, which is not among the stated markets
(CDMX, Bajío, Monterrey). Worth knowing whether it is live, linked, and current.

### 18. cPanel document root reading was inconsistent
**Unresolved.** File Manager's "Document Root for: aventawindows.com"
preference navigated to `aventa/` rather than `public_html/`. This contradicts
two independent confirmations that `public_html` is the document root: the live
image URL resolving from `public_html/media`, and `public_html/index.php`
requiring `../aventa/vendor/autoload.php`. Almost certainly a UI quirk. If it
recurs, read the Document Root column in cPanel -> Domains directly.

### 19. No version history from the previous developer
**Confirmed.** There is no `.git` folder anywhere on the server. He worked
locally and uploaded files, so all history lives in his own GitHub repository,
which has not been handed over. Worth continuing to ask for. No longer urgent
now that the code is in version control.

### 19b. Automate deployment with a GitHub Action
**Wanted, not urgent.** Sophia's stated preference: build this eventually, not
now.

A GitHub Action can run `npm run build` on every push to `main` and upload the
result over FTP, reducing the whole deploy to `git push`. It removes the
manual upload, the risk of forgetting a folder, and the 11pm mistakes.

Prerequisites, in order:
1. Item 1 in P0, the public path fix, so there is only one upload target.
2. A dedicated FTP account in cPanel scoped to the document root, rather than
   reusing the main account credentials.
3. Those credentials stored as GitHub repository secrets, never in the repo.
4. A deliberate decision about whether the Action should also clear the old
   `build` directory, given item 14.

Worth doing once the manual process is familiar enough that Sophia can tell
when the automated one has gone wrong.

### 19c. Decide the English register: US buyers or international specifiers
**Open decision, pending team confirmation.**

The current Spanish copy is B2C and benefit-led. Translated faithfully it
produces US-consumer English, which is what the September 2026 translation work
is doing, deliberately, to fix a language switcher that currently lies.

Sophia's current thinking is that Aventa will eventually lean international,
confirming with the team first. If that is the direction, the English copy
becomes a rewrite rather than a translation: Passivhaus certification,
U-values in W/m²K, acoustic ratings in dB, project references and drawings,
in a restrained register aimed at someone checking whether Aventa meets a spec.

Treat that as a content and positioning project, separate from the translation
work, and do not start it without an explicit decision.

### 20. Deploys are fully manual with no automation
**Confirmed.** Build locally, upload to cPanel by hand. No CI/CD, no rollback
beyond renaming folders, and the hosting plan has no SSH or Terminal access,
which rules out the simplest automation options. Workable, but every deploy is
a chance to make a mistake at 11pm.

---

## Not broken, worth saying

Two things the previous developer got right, which is worth knowing before
deciding how much to rebuild:

- **Cumulative Layout Shift is 0.** Nothing jumps around while the page loads.
  That is genuinely hard to achieve and most sites fail it.
- **SEO 92, Best Practices 96.** The fundamentals are sound. The weak areas are
  concentrated in performance and accessibility, not in the whole build.
