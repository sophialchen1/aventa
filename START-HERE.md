# Start here: getting the site into GitHub

Read this once end to end before typing anything. It takes about 20 minutes.

**What we are doing and why:** right now this GitHub repository contains only
setup files. The only copy of the actual website code is on the Namecheap server
at `/home/aveniqck/aventa`. That is a single point of failure, and it also means
nothing (including Claude Code sessions on the web) can see or change the site.
This guide pulls the code down, gets it onto your Mac, and pushes it here.

The order below is deliberate. It puts a `.gitignore` in place *before* the site
files arrive, so that huge folders and your password file cannot be committed by
accident. Do not reorder the steps.

---

## Before you start

You need Terminal, git, and Homebrew-installed tools. If you have not done that
yet, do [docs/local-setup-mac.md](docs/local-setup-mac.md) steps 1 and 2 first,
then come back.

Check git works:
```bash
git --version
```

Tell git who you are (once per machine):
```bash
git config --global user.name "Sophia Chen"
git config --global user.email "sophia@aventawindows.com"
```

---

## Step 1: Clone this repo into a fresh folder

```bash
cd ~/Documents
git clone https://github.com/sophialchen1/aventa.git
cd aventa
```

GitHub will ask you to authenticate. If it asks for a password, that will fail:
GitHub stopped accepting passwords. Use one of these instead.

**Easiest option, GitHub CLI:**
```bash
brew install gh
gh auth login
```
Choose: GitHub.com -> HTTPS -> Yes (authenticate git) -> Login with a web
browser. Then retry the clone.

You should now have `~/Documents/aventa` containing README.md, CLAUDE.md,
DEPLOY.md, .gitignore and this file.

## Step 2: Make a normal `main` branch

```bash
git checkout -b main
```

## Step 3: Get the website code off the server

There is no copy of the site on your Mac. The only copy lives on the Namecheap
server at `/home/aveniqck/aventa`. You need it locally, because builds happen on
your machine, not on the server.

Do **not** download the existing `aventa.zip` in the home folder. It is 534 MB,
it dates from August 2025, and it includes the two huge dependency folders you
do not want. Make a fresh, small one instead.

### 3a. Turn on hidden files in File Manager

Top right of File Manager -> **Settings** -> tick **Show Hidden Files
(dotfiles)** -> Save.

This matters. Files starting with a dot (`.env`, `.gitignore`, `.editorconfig`)
are invisible otherwise, and `.env` is the one the site cannot run without.

### 3b. Zip the project, minus the giant folders

**If your cPanel has Terminal** (look for it in the cPanel menu under Advanced),
this is one command and much more reliable:

```bash
cd ~ && zip -r aventa-source.zip aventa \
  -x "aventa/node_modules/*" "aventa/vendor/*" "aventa/storage/logs/*"
```

**If there is no Terminal**, use File Manager:

1. Double-click into the `aventa` folder
2. Click **Select All**
3. Hold Cmd and click `node_modules` and `vendor` to *deselect* them
4. Click **Compress**, choose Zip Archive, name it `aventa-source.zip`, save it
   into the parent folder

Either way you should end up with something in the tens of megabytes, not
hundreds. `node_modules` and `vendor` are excluded because they are rebuilt from
scratch by `npm install` and `composer install`, and the server's copies are
Linux builds that will not all work on your Mac anyway.

### 3c. Download it

Select `aventa-source.zip` in File Manager and click **Download**. It lands in
your Mac's Downloads folder.

### 3d. Unpack it into your repo folder

```bash
cd ~/Downloads
unzip -q aventa-source.zip -d aventa-extracted
ls aventa-extracted
```

If `ls` shows a single `aventa` folder, the real files are one level down. That
is the expected case, and it is what the commands below assume. If instead you
see `artisan` and `package.json` directly, remove `aventa/` from the paths in
the two commands that follow.

Now copy the files across:

```bash
rsync -av \
  --exclude '.git' \
  --exclude '.gitignore' \
  --exclude '.gitattributes' \
  --exclude 'README.md' \
  ~/Downloads/aventa-extracted/aventa/ \
  ~/Documents/aventa/
```

Keep the trailing slashes. They mean "the contents of", which is what you want.

**Why the three extra excludes.** The project already contains its own
`.gitignore`, `.gitattributes` and `README.md` from the previous developer.
Without those exclude lines, rsync would overwrite the versions in this repo:

- `.gitignore` would drop back to a smaller version, weakening the protection
  that stops `.env` and `node_modules` from being committed
- `README.md` would be replaced by Laravel's stock framework readme, which says
  nothing about Aventa

His `.gitignore` is probably just Laravel's default and losing it costs nothing.
But check before assuming. Print it and send the output to Claude:

```bash
cat ~/Downloads/aventa-extracted/aventa/.gitignore
```

If it contains anything project-specific, those lines get merged into the
repo's version.

### 3e. Confirm you got the real thing

```bash
cd ~/Documents/aventa
ls artisan package.json composer.json vite.config.js
ls resources/js/src/locales/
```

Expected: `artisan`, `package.json`, `composer.json`, `vite.config.js`, and the
locale files (`es.json`, `en.json`).

Then confirm the repo's own files survived:

```bash
wc -c .gitignore README.md
```

`.gitignore` should be roughly 2000 bytes, not 286. If it says 286, the excludes
did not apply. Stop and ask before committing.

## Step 4: Look at what git sees, before committing anything

```bash
git status --short
```

You will see a long list of files with `??` next to them. That is expected,
git has not seen them before.

Now the safety check. Run this exactly:

```bash
git status --short | grep -E "node_modules|vendor/|\.env$|public/build"
```

**This should print nothing at all.** Empty output means `.gitignore` is doing
its job.

If it prints anything, stop and ask Claude before continuing. Do not commit.

## Step 5: Commit and push

```bash
git add .
git commit -m "Import Aventa website from developer handoff"
git push -u origin main
```

If the push is rejected for size, stop and ask. It means something large slipped
through and we should fix it rather than force it.

## Step 6: Make `main` the default branch on GitHub

1. Go to https://github.com/sophialchen1/aventa/settings
2. Under "Default branch", click the switch icon
3. Choose `main`, confirm

Then delete the setup branch, it has served its purpose:
```bash
git push origin --delete claude/aventa-github-setup-fjfaat
```

## Step 7: Confirm it worked

```bash
git log --oneline
```

And open https://github.com/sophialchen1/aventa in a browser. You should see
your project files. Click into `resources/js/src/locales/es.json` and confirm
you can read the site's Spanish copy. That is proof the real code is up.

## Step 8: Get it running locally

Follow [docs/local-setup-mac.md](docs/local-setup-mac.md) from step 4 onward
(`composer install`, `npm install`, `.env`, `php artisan dev`).

You are done. From here, [DEPLOY.md](DEPLOY.md) is the file you will use most.

---

## The daily loop, once set up

```bash
cd ~/Documents/aventa
git pull origin main          # get any changes made from Claude Code on the web
# ... make edits ...
npm run build                 # check it compiles
git add .
git commit -m "what you changed"
git push origin main
```

Then deploy per DEPLOY.md when you want it live.

---

## Two things to be careful about, permanently

**1. `.env` must never be committed.** It contains your database password and
app key. It is gitignored, so this should not happen. But if you ever see `.env`
in `git status`, do not commit. Ask first.

**2. Pushing to GitHub does not put anything on the live site.** They are
separate. GitHub is your backup and history. The live site only changes when you
upload a build to cPanel. See DEPLOY.md.
