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

**Unknown and worth answering first:** which pages load it, and whether it loads
on page load or only on interaction. If any page fetches it on arrival, every
visitor to that page downloads 124 MB. On Mexican mobile data that is minutes of
waiting and a real cost to the visitor. The homepage LCP of 3.9 s suggests it is
not loading there, but that is an inference, not a measurement.

### 8. Touch targets are too small on mobile
**Confirmed.** Lighthouse accessibility audit: "Touch targets do not have
sufficient size or spacing." Most paid traffic is mobile. Buttons that are hard
to tap cost form submissions directly, and this is a conversion issue, not a
compliance one.

---

## P2 · Reach and quality

### 9. The site is not actually bilingual
**Confirmed.** The language toggle promises English; the site delivers it for
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
