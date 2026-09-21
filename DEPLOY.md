# Deploying to aventawindows.com

Deploys are manual: build locally, upload the build output to the server.
There is no CI/CD, no `git pull` on the server, and nothing to restart.

**Total time: about 5 minutes.**

---

## Understand this first

The server has two separate folders:

- `/home/aveniqck/aventa` -> the full Laravel project. **Not** what visitors see.
- `/home/aveniqck/public_html` -> the real document root. **This** is the live site.

A normal content or design change needs the rebuilt `build` folder uploaded to
**both** places:

> rebuild `public/build` locally, then replace **`aventa/public/build`** *and*
> **`public_html/build`** on the server.

### Why both, and what goes wrong if you skip one

`bootstrap/app.php` does not override Laravel's public path, so `public_path()`
resolves to `/home/aveniqck/aventa/public`. The `@vite()` directive in
`resources/views/welcome.blade.php` reads its manifest from there:

```
/home/aveniqck/aventa/public/build/manifest.json
```

Vite gives every built file a content hash in its name, and the manifest is the
lookup table from "app.js" to "app-D4f2a1.js". So:

- **`aventa/public/build/`** is where Laravel *reads* which filenames to put in
  the HTML.
- **`public_html/build/`** is where the browser *downloads* those files from.

Upload to only `public_html` and Laravel still reads the old manifest, writes
the old filenames into the page, and the browser happily fetches those old files,
which are still sitting there because nothing is ever deleted. **The site
silently keeps serving the previous version.** Your change appears to have done
nothing, with no error anywhere.

That failure mode is almost certainly why both build folders have grown so
large: `aventa/public/build` is 240 MB and `public_html/build` is 167 MB, when a
single build should be a fraction of that.

---

## The deploy

### 1. Make sure you are on the latest code

```bash
cd ~/path/to/aventa
git pull origin main
```

### 2. Build

```bash
npm run build
```

This regenerates `public/build/`. It should end with a list of generated files
and no red error text. If it errors, **stop**. Do not upload a failed build.

### 3. Check it locally before it goes live

```bash
php artisan serve
```

Open the address it prints (usually http://127.0.0.1:8000) and confirm your
change looks right, in **both** Spanish and English. Ctrl+C to stop.

### 4. Back up what is currently live

In cPanel File Manager, go to `public_html/`, right-click the `build` folder,
Rename it to:

```
build-backup-YYYY-MM-DD
```

This is your undo button. Takes 10 seconds and has saved many people.

### 5. Upload the new build, to both locations

Upload the **contents** of your local `public/build/` into **both**:

1. `/home/aveniqck/aventa/public/build/`
2. `/home/aveniqck/public_html/build/`

Both, every time. See the explanation above for why skipping the first makes
your change silently fail to appear.

Two ways:
- **cPanel File Manager**: compress `public/build` to a .zip locally, upload the
  zip to `public_html/`, then Extract it there.
- **FTP** (FileZilla, Cyberduck): drag `public/build` into `public_html/`.

The zip route is much faster and far less likely to half-fail. A build folder
can be hundreds of small files, and FTP drops them one at a time.

### 6. Verify live

Open https://aventawindows.com in a **private/incognito window** (a normal
window will show you a cached version and fool you).

Check:
- [ ] The page loads at all (no blank white screen)
- [ ] Your change is visible
- [ ] Language switch works, ES and EN
- [ ] One other page still works (you did not break the router)
- [ ] Open on your phone

### 7. Commit and push

```bash
git add .
git commit -m "Describe the change in plain language"
git push origin main
```

Note: `public/build/` is intentionally not tracked by git. The source in
`resources/` is what matters. Never commit build output.

---

## If the site breaks

Do not debug on production. Restore first, debug after.

1. cPanel File Manager -> `public_html/`
2. Delete or rename the broken `build` folder
3. Rename `build-backup-YYYY-MM-DD` back to `build`
4. Hard refresh in incognito

The site is now back to how it was. Then figure out what went wrong locally.

---

## When you changed more than frontend code

If you edited PHP (`routes/`, `app/`, `config/`) or the Blade view in
`resources/views/`, the build output is **not** enough. Those files also have to
reach the server:

- PHP app files go to `/home/aveniqck/aventa/`
- Anything from `public/` (including `index.php`, images, favicon) goes to
  `/home/aveniqck/public_html/`

If you changed `.env` or config on the server, clear Laravel's caches from
cPanel Terminal (if available):

```bash
cd ~/aventa && php artisan optimize:clear
```

For 90% of changes (text, styling, components) you will never need this section.

---

## Possible improvement

This upload step can be automated with a GitHub Action that builds on push and
uploads over FTP. It requires storing FTP credentials as GitHub repository
secrets. Worth doing once the manual process is familiar and the repo is stable.

---

## Previewing locally

To see a change in a browser before it goes anywhere:

```bash
npm run preview
```

Then open **http://localhost:5173**. Edit a `.vue` or locale file, save, and the
browser updates on its own. Ctrl+C in the terminal stops it.

This is a preview only. It does not touch the live site and it does not build
anything. When you are happy, run `npm run build` and deploy as described above.

### Why there is a separate preview command

`npm run dev` is the normal Laravel way, but it needs PHP running to serve the
page shell. macOS no longer ships PHP. `npm run preview` skips Laravel and lets
Vite serve the app from `index.html` at the project root, so it only needs Node.

The files involved are `vite.preview.config.js` and `index.html`. Neither is
used by `npm run build`, and `index.html` is never emitted into `public/build`.
Verified: building with them present produces a byte-identical manifest.

### What the preview does not cover

- Google Tag Manager, Google Ads and the HubSpot scripts. Those live in
  `resources/views/welcome.blade.php`, which only Laravel serves. Forms and
  tracking will not fire in preview.
- `<html lang>` and the per-page SEO tags, same reason.

For copy, layout and language switching, which is what we are working on, the
preview is accurate.

---

## Files that live at the web root

The build zip only contains `build/`. These sit next to it, at the top of
`public_html/`, and have to be uploaded on their own when they change:

```
favicon.ico              browser tab
favicon.svg              modern browsers, sharp at any size
apple-touch-icon.png     iPhone and iPad home screen
icon-192.png             Android
icon-512.png             Android
icon-512-maskable.png    Android, cropped to the phone's icon shape
site.webmanifest         tells Android which icons to use
```

`resources/views/welcome.blade.php` is the other one. Laravel reads it on every
page load, so a change there needs uploading to `aventa/resources/views/`. It is
not part of the build.

Favicons are cached hard. After uploading, test in a private window. If the old
one still shows, try `aventawindows.com/favicon.ico` directly to confirm the new
file is really there.
