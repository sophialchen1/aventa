# Server layout (Namecheap / cPanel)

Recorded September 2026 from cPanel File Manager, account `aveniqck` on
`business110.web-hosting.com`. Written down because this existed only in the
previous developer's head.

Everything below lives under `/home/aveniqck/`.

## What matters

| Path | What it is |
|---|---|
| `aventa/` | The Laravel 12 + Vue project. The source code. **Not** served to visitors. |
| `public_html/` | The document root actually serving aventawindows.com. A manual copy of `aventa/public/`. |
| `www` | Symlink to `public_html`. Standard cPanel, ignore it. |

The split is the single most important thing to understand about this setup.
Changing files in `aventa/` does nothing to the live site on its own. The site
only changes when `public_html/` changes.

## Inside `aventa/`

Confirmed September 2026. Standard Laravel 12 layout:

```
app/  bootstrap/  config/  database/  public/  resources/  routes/
storage/  tests/  vendor/  node_modules/
.editorconfig  .env  .env.example  .gitattributes  .gitignore
artisan  composer.json  composer.lock  package.json  package-lock.json
phpunit.xml  README.md  vite.config.js
.idea/  .vscode/
```

Two findings worth recording:

**There is no `.git` folder.** The previous developer's version history does not
exist on the server. He worked locally and uploaded files. This confirms the
repository had to be started fresh, and that his own repo is the only place any
history exists.

**`.idea/` and `.vscode/` are present**, meaning he edited directly in this
folder at least sometimes. Both are IDE settings folders and are gitignored.

Most files date to April through August 2025. `public/` was last modified
October 2025.

## Subdomains

| Path | Notes |
|---|---|
| `info.aventawindows.com/` | Bilingual resource hub. Runs on HubSpot Content Hub Starter, so this folder is likely a leftover or a redirect shell rather than the live content. Verify before touching. |
| `blog.aventawindows.com/` | Purpose unconfirmed. |
| `pay.aventawindows.com/` | Purpose unconfirmed. |
| `portal.aventawindows.com/` | Purpose unconfirmed. |
| `aventawindows.com/` | A folder with the domain's name, last modified January 2025. Almost certainly legacy, predating the current `public_html` setup. Do not delete without checking. |

The four subdomain folders were last modified on the same date (April 2026),
which suggests they were created together, possibly as empty placeholders when
the subdomains were registered in cPanel.

## Backups and dead weight

| Path | Size | Date |
|---|---|---|
| `aventa.zip` | 534 MB | Aug 2025 |
| `aventa-old.zip` | 448 MB | Jul 2025 |
| `CF AventaW 270525.zip` | 174 MB | May 2025 |
| `aventa-old/` | folder | Jul 2025 |
| `respaldo_antigua/` | folder | Jul 2025 |

Roughly 1.2 GB of zips plus two full backup folders. Shared hosting has a disk
quota, so this is worth cleaning up eventually. **Do not delete any of it until
the current code is safely in GitHub and confirmed working.** Once that is true,
git is the backup and these become redundant.

`respaldo antigua` is Spanish for "old backup", which supports that reading.

## Open question worth resolving

`public_html/` was last modified June 2026. `aventa/` was last modified
August 2025, ten months earlier.

Directory timestamps are not proof of anything on their own, but this is worth
checking, because if the previous developer was building elsewhere and only
uploading the compiled output, then `aventa/` may be **behind what is actually
live**. That would mean the source we import does not match the running site.

How to check, once the code is local:

1. Compare the file names inside `aventa/public/build/` on the server with those
   in `public_html/build/`. Vite gives built files content-based hashes, so if
   the file names differ, the two are different builds.
2. Run `npm run build` locally and compare the output file names to
   `public_html/build/`.

If they match, the source is current and everything is fine. If they do not,
flag it before making any changes, and the previous developer's own repository
becomes important to obtain.

## Access

- cPanel: `business110.web-hosting.com:2083`
- Deploy method: manual upload via File Manager or FTP. See [../DEPLOY.md](../DEPLOY.md).
- No SSH key set up as of this writing. cPanel may offer a Terminal under
  Advanced, which is worth checking, it makes several tasks much easier.
