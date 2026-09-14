# What needs fixing

Everything found while taking over the site from the previous developer.

**Confirmed** means measured or read in the code. **Suspected** means it looks
that way but has not been checked. Do not act on a Suspected item without
checking it first.

Fixed items stay on the list with the date, so there is a record.

---

# P0 · We could lose things

## 1. The site's photos are not backed up anywhere

**Confirmed.**

The `media` folder on the live server is 1,134 MB. That same folder does not
exist in the project. It is not in GitHub, and it is not in the backup zips on
the server, because those only copied the project folder.

So your photography exists in exactly one place: this hosting account. If the
account were lost, so is all of it.

**Fix:** download `public_html/media` and put a copy in Google Drive. Do this
before anything else on this list.

## 2. Project gallery photos, same problem

**Confirmed.**

`public_html/proyectos` is 102 MB on the live site. The same folder in the
project is empty.

**Fix:** same as above.

## 3. The 3D model is not in GitHub

**Confirmed.**

`house_aventa.glb` is 124 MB. GitHub refuses any file over 100 MB, so it is
excluded. It currently survives only because it happens to sit on the server
and on Sophia's Mac.

**Fix:** back it up deliberately. Compressing it (item 7) would also bring it
under GitHub's limit and make this go away.

## 4. The old developer may still have access

**Suspected.**

He had cPanel and FTP access until recently. Nobody has checked whether it was
removed. Rotating credentials is standard whenever someone leaves a project.

**Fix:** in cPanel, review FTP Accounts and any sub-accounts. Change the main
password.

---

# P1 · This is costing money

Over 70% of leads come from paid Meta and Google. Everything here makes those
ads perform worse.

## 5. A 124 MB file downloads on every page, for a feature almost nobody uses

**Confirmed. This is the biggest single problem and the smallest fix.**

One line in `resources/views/welcome.blade.php` tells every visitor's browser to
download the 124 MB 3D model immediately, at high priority, before the things
they actually came to see. A second copy of the same instruction sits in
`MainLayout.vue`.

The model is only ever shown inside the "Aventa vs Otros" pop-up, which a
visitor has to click to open. Most never do.

So every visitor, on every page, downloads 124 MB for something they will
probably never see. On a phone in Mexico that is minutes of waiting, and it uses
up their own data allowance.

**Fix:** delete the preload line. Load the model only when someone opens the
pop-up. Then compress it (item 7).

**First:** confirm with the team where the 3D house is supposed to appear. It is
presumably a deliberate feature.

## 6. The site fails Google's speed test on mobile

**Confirmed.**

| What it measures | Yours | Google wants |
|---|---|---|
| Time until anything appears | 3.1 sec | under 1.8 sec |
| Time until the main image appears | 3.9 sec | under 2.5 sec |
| Time for the server to respond | 1.3 sec | under 0.8 sec |
| Whether things jump around | 0 | under 0.1 (yours is perfect) |

Overall result: **Failed.**

Visitors stare at a blank white screen for 3.1 seconds. The JavaScript itself is
small, about 56 KB compressed, so that is not the cause. Item 5 is.

Why it costs money twice: people leave during those 3.1 seconds, and you already
paid for their click. Google also scores landing page speed into Ads Quality
Score, which sets your cost per click, so slow pages make every future click
more expensive too.

**Fix:** item 5 first, then re-test and see what is left.

## 7. Photos are full-size camera originals

**Confirmed 14 Sep 2026, measured.** Worse than suspected.

Measured directly in the built site:

| File | Size now | Dimensions | Resized to 1920px, quality 80 | Saving |
|---|---|---|---|---|
| `puertas_car4.jpg` | 22.8 MB | 4672 x 7008 | 0.29 MB | 99% |
| `puertas_car1.JPG` | 15.9 MB | 5472 x 3648 | 0.39 MB | 98% |
| `maderas.jpg` | 8.3 MB | 4532 x 3399 | 0.37 MB | 96% |

`puertas_car4` is a 33 megapixel photograph. It is displayed on the site a few
hundred pixels wide. Every visitor to that page downloads all 22.8 MB of it.

Across the whole built site: **61 images totalling 79 MB.** Compressed the same
way, that becomes roughly 2 to 3 MB.

For context, a visitor landing on the Puertas page currently downloads about
50 MB of photographs, on top of the 124 MB 3D model from item 5.

None of this is visible to the eye. The screen cannot show 33 megapixels.

### How to compress the photos

**Work on a copy.** Never compress your only version of a file.

**Easiest, for a handful of images:** go to **squoosh.app**, drag a photo in,
pick WebP on the right, set quality around 75, download. Free, nothing to
install, and you see a before-and-after slider so you can check quality.

**For hundreds of images at once:** install **ImageOptim** (free Mac app). Drag
a whole folder onto it. It compresses everything in place.

**If you prefer Terminal,** macOS has a resizing tool built in. This makes
copies first, then resizes to 1920 pixels wide, which is plenty for any screen:

```bash
mkdir -p ~/Desktop/media-compressed
cp -R ~/Downloads/media/* ~/Desktop/media-compressed/
sips -Z 1920 ~/Desktop/media-compressed/*.JPG ~/Desktop/media-compressed/*.jpg
```

`-Z 1920` means "shrink so the longest side is 1920 pixels, keep the
proportions." It skips anything already smaller.

**What to expect:** 1,134 MB should come down to roughly 100 to 150 MB. Nobody
will see a difference.

**Then:** upload the compressed versions to `public_html/media`, replacing the
originals, keeping your untouched backup from item 1.

### Compressing the 3D model

Different tool. 3D models shrink by 90% or more with no visible change:

```bash
npm install -g @gltf-transform/cli
gltf-transform optimize house_aventa.glb house_aventa_small.glb --compress draco
```

Check the result at **gltf-viewer.donmccurdy.com** before using it. 124 MB
should become roughly 5 to 15 MB.

## 8. Buttons are too small to tap on a phone

**Confirmed.** Google's accessibility check flags "touch targets do not have
sufficient size or spacing."

Most of your paid traffic is mobile. A button that is fiddly to tap loses form
submissions you already paid for. This is a conversion problem, not a compliance
one.

**Fix:** increase padding and spacing on buttons and links. Straightforward CSS.

---

# P2 · Reach and quality

## 9. Translation does not work past the homepage

**Confirmed. Homepage, Ventanas and Puertas fixed 14 Sep 2026. Eight pages
still broken.**

The site shows a language switcher on every page. It only works on the homepage,
the navigation, and the footer. Switch to English, click Ventanas, and you get
Spanish.

About 224 pieces of text across the site were typed directly into the page files
instead of going through the translation system.

| Page | Status | Text to translate |
|---|---|---|
| Inicio (homepage) | **Done** | 18 strings fixed |
| Ventanas | **Done** | 28 strings fixed |
| Puertas | **Done** | 25 strings fixed |
| PlaneaVisita | To do | 30 |
| Merida | To do | 10 |
| Contacto | To do | 9 |
| Inspiracion | To do | 7 |
| Catalogo | To do | 5 |
| Aviso de Privacidad | **Excluded** | 32 |

The privacy policy is deliberately excluded. It is legal text and should be
translated by someone qualified, not by us.

**What the homepage fix found:** the page was not untranslated, it was
translated inconsistently. The hero headline, both hero buttons, every section
heading and two of the five contact form fields were typed in directly, while
everything around them used the translation system. In three cases the English
translation already existed and simply was not used. `ini_puertas` is called on
line 517 of the homepage, three lines below where "Nuestras Puertas" had been
typed in by hand.

## 10. Every page tells Google it is in Spanish

**Confirmed.**

Line 2 of `resources/views/welcome.blade.php` says `<html lang="es">`. It never
changes, even when a visitor switches to English.

That tag is how Google decides what language a page is in, and how screen
readers choose a pronunciation. An English page claiming to be Spanish will not
rank properly in English searches.

**Fix:** make the tag follow whichever language is selected.

## 11. Photos have no descriptions

**Confirmed.** 23 images have an empty description, and 6 have placeholders like
`alt="img_home"`, which describes the code rather than the picture.

That description is how Google understands an image. You have 1.1 GB of
photography competing on visual quality, and search engines cannot read any of
it. It is also what a blind visitor's screen reader announces.

**Fix:** write a short, real description for each image. This is copywriting
work, not developer work.

## 12. Accessibility score is 77 out of 100

**Confirmed.** Beyond the photo descriptions and small buttons above: text
colours do not contrast enough with their backgrounds, some links have no
readable name, and embedded frames have no titles.

## 13. There are errors in the browser console on the live site

**Confirmed that errors happen. Unknown what they are.**

Google's check reports "browser errors were logged to the console." Something is
going wrong on the live site. It may be harmless, it may not.

**Fix:** open the site in Chrome, press F12, click Console, read what is red.

## 14. The project would not build at all

**Confirmed. Fixed 14 Sep 2026.**

The code imported an icon library that was never listed as a requirement. Anyone
who downloaded the project and tried to build it got an error and no website.

It only worked on the previous developer's laptop, where the library happened to
be installed but was never written down.

You would have hit this the first time you tried to build on your Mac.

## 15. `npm ci` fails on Mac and Linux

**Confirmed. Known bug in npm itself, not our code.**

If a build fails with "Cannot find module '@rollup/rollup-...'" or "Failed to
load native binding", use `npm install` instead of `npm ci`. That is the whole
fix.

---

# P3 · Housekeeping and open questions

## 16. About 2.9 GB of junk on the hosting account

**Confirmed.** Out of 5,536 MB used in total:

| | |
|---|---|
| Three old backup zips | 1,157 MB |
| `respaldo_antigua` folder | 997 MB |
| `aventa-old` folder | 629 MB |
| Logs | 95 MB |
| Temp files | 32 MB |

**Do not delete any of this until items 1 and 2 are done and verified.** After
that it is a twenty minute cleanup.

## 17. Old builds pile up and are never removed

**Confirmed.** `public_html/build` is 167 MB. `aventa/public/build` is 240 MB. A
single build is a small fraction of that.

Every time the site is updated, the build tool gives the files new names. If you
upload without deleting the old ones, the old ones stay forever. Both folders
are layers of every update ever made.

**Fix:** always rename or delete the old `build` folder before uploading a new
one. This is already in DEPLOY.md.

## 18. The live site and the project folder do not match

**Confirmed.** They were described as copies of each other. They are not.

| Folder | In the project | On the live site |
|---|---|---|
| `media` | does not exist | 1,134 MB |
| `proyectos` | empty | 102 MB |
| `models` | 124 MB | 132 MB |
| `build` | 240 MB | 167 MB |

The live site serves files the project has never contained. Anyone setting up
automatic deployment later must know this, or it will delete live content.

## 19. Four subdomain folders nobody can explain

**Unknown.** `blog.`, `pay.`, `portal.` and `info.aventawindows.com` all exist
on the server, all tiny, all created the same day in April 2026. `info.` runs on
HubSpot, so that folder is probably left over.

`pay.` and `portal.` are worth understanding before anything is deleted.

There is also an `aventawindows.com` folder from January 2025 that predates the
current setup.

## 20. There is a Mérida page

**Unknown.** `Merida.vue` exists. Mérida is not one of the stated markets. Worth
knowing whether it is live, linked from anywhere, and still accurate.

## 21. cPanel gave an inconsistent answer about the document root

**Unresolved, almost certainly harmless.**

File Manager's "Document Root for aventawindows.com" setting opened the `aventa`
folder. Two other checks both confirm it is really `public_html`. Probably a
quirk in that dialog. If it comes up again, read the Document Root column under
cPanel → Domains instead.

## 22. No history from the previous developer

**Confirmed.** There is no version history anywhere on the server. He worked on
his own machine and uploaded files. All history lives in his personal GitHub
repository, which was never handed over.

Still worth asking for. No longer urgent now that the code is in GitHub.

## 23. Automate deployment (wanted, not now)

Sophia's preference: build this eventually.

A GitHub Action can build the site and upload it automatically every time a
change is pushed, turning the whole deploy into one command.

Needs first:
1. The public path fix. **Done 14 Sep 2026.**
2. A separate FTP account in cPanel, not the main account password.
3. Those credentials stored as GitHub secrets, never in the code.
4. A decision on whether it should also clear out the old build folder (item 17).

Worth doing once the manual process is familiar enough to tell when the
automatic one has gone wrong.

## 24. Decide who the English site is for

**Open. Waiting on the team.**

The Spanish copy is written for homeowners. Translated faithfully, it produces
English for US homeowners. That is what the current translation work is doing,
deliberately, to fix a switcher that lies.

If Aventa leans international, the English becomes a rewrite rather than a
translation: Passivhaus certification, U-values, acoustic ratings, project
references, written for someone checking whether Aventa meets a specification.

That is a positioning decision. Do not start it without one.
