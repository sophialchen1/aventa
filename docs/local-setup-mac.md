# Local setup on a Mac

The developer's handoff guide (`GUIA.txt`) was written for Windows and included
bundled copies of PHP and Node. On a Mac you install those with Homebrew
instead. **Ignore the bundled `php-8.x` and Node folders.** They are Windows
executables and will not run on macOS.

Do this once. After that, day to day is just steps 5 and 6.

---

## 1. Install Homebrew

Homebrew is the standard Mac package manager. Open Terminal
(Cmd+Space, type "Terminal") and paste:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

It will ask for your Mac password. Typing shows nothing on screen. That is
normal. Press Enter when done.

At the end it may print two `echo` commands to run to add Homebrew to your PATH.
Run them if it does. Then close and reopen Terminal.

Check:
```bash
brew --version
```

## 2. Install PHP, Composer, Node

```bash
brew install php composer node
```

Check all three:
```bash
php -v        # expect PHP 8.3 or newer
composer -V
node -v       # expect v20 or newer
npm -v
```

## 3. Get the project

```bash
cd ~/Documents
git clone https://github.com/sophialchen1/aventa.git
cd aventa
```

From now on, "the project folder" means `~/Documents/aventa`. It is the folder
containing the files `artisan` and `package.json`.

## 4. Install the project's dependencies

```bash
composer install
npm install
```

This creates `vendor/` and `node_modules/`. Both are large, both are ignored by
git, and both are rebuilt by these commands. If they ever get weird, delete them
and run the commands again.

## 5. Set up the environment file

`.env` holds configuration and secrets. It is deliberately **not** in git.

```bash
cp .env.example .env
php artisan key:generate
```

If that first command says `No such file or directory`, the project has no
`.env.example`. Check whether the handoff folder had a `.env` you can copy in
directly, and if not, ask before improvising one. Laravel will not boot without
it.

If the site needs a database and Laravel complains about a connection, the
simplest local option is SQLite:

```bash
touch database/database.sqlite
```

Then in `.env` set `DB_CONNECTION=sqlite` and delete or comment out the other
`DB_*` lines.

## 6. Run it

```bash
php artisan dev
```

That one command starts both Laravel and Vite. Leave the Terminal window open
while you work. Open the address it prints, usually http://127.0.0.1:8000.

Edits to Vue files appear in the browser instantly. No rebuild needed while
developing.

Press `Ctrl + C` to stop.

**If `php artisan dev` does not exist**, run the two parts in two separate
Terminal tabs (Cmd+T for a new tab):

```bash
# tab 1
php artisan serve

# tab 2
npm run dev
```

---

## When something does not work

| Symptom | Fix |
|---|---|
| `command not found: php` (or node, composer) | Close and reopen Terminal. If it persists, rerun `brew install`. |
| `Class not found` / autoload errors | `composer install` |
| `Cannot find module` | `npm install` |
| `No application encryption key` | `php artisan key:generate` |
| Site loads but is unstyled or blank | Vite is not running. Use `php artisan dev`, or `npm run dev` in a second tab. |
| Weird cached behavior | `php artisan optimize:clear` |
| "not a git repository" | You are in the wrong folder. `cd ~/Documents/aventa` |

Rule of thumb: you must be in the folder that contains `artisan`. Check with
`ls` and look for it in the output.
