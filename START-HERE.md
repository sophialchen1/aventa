# Start here: getting your local site into GitHub

Read this once end to end before typing anything. It takes about 20 minutes.

**What we are doing and why:** right now this GitHub repository contains only
setup files. Your actual website code exists only on your Mac. Until it is
pushed here, nothing (including Claude Code sessions on the web) can see or
change your site. This guide moves your code up safely.

The order below is deliberate. It puts a `.gitignore` in place *before* your
files, so that huge folders and your password file cannot be committed by
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

## Step 3: Copy your website files in

Find the handoff folder on your Mac. It is the folder containing `artisan` and
`package.json`.

Get its exact path without typing it: in Terminal type `ls -la ` (with a
trailing space), then **drag the folder from Finder onto the Terminal window**.
The path appears. Press Enter and confirm you see `artisan` and `package.json`
in the output.

Now copy everything across, skipping the folders that should not travel:

```bash
rsync -av \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude 'vendor' \
  --exclude 'public/build' \
  "PASTE_THE_PATH_HERE/" \
  ~/Documents/aventa/
```

Two things that matter:
- Replace `PASTE_THE_PATH_HERE` by dragging the folder in again.
- **Keep the trailing slash** after the path. With it, the folder's *contents*
  are copied. Without it, the folder itself is nested inside, which is wrong.

`node_modules` and `vendor` are excluded on purpose. They contain Windows
binaries from the previous developer's machine and will not work on your Mac.
You will regenerate them in step 6.

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
