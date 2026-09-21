# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

The public marketing website for **Aventa** (aventawindows.com), a premium
laminated wood windows and doors manufacturer based in San Miguel de Allende,
Mexico. Primary markets: CDMX and Bajío. Audiences: homeowners (B2C) and
architects, developers and construction firms (B2B).

Maintained by Sophia Chen, an independent consultant, after handoff from a
third-party developer. **There is no CMS and no admin panel.** All content
changes are code changes.

## Stack

- **Laravel 12** (PHP) as a thin backend shell. One Blade view, minimal routes.
- **Vue 3 + Vite** as the actual site, running as an SPA.
- **Tailwind CSS 4** for styling.
- **vue-i18n** for bilingual ES/EN.

## Key paths

```
resources/js/src/locales/es.json   Spanish copy (primary market language)
resources/js/src/locales/en.json   English copy
resources/js/src/pages/            11 page components (see below)
resources/js/src/components/       18 shared components
resources/js/src/data/             structured content: catalogos, instalaciones,
                                   medias, trabajos, paises, modelo
resources/js/src/router/i18n.js    vue-i18n setup
resources/views/                   the single Blade view Laravel serves
routes/web.php                     Laravel routes (SPA catch-all)
public/build/                      Vite output. Generated. Never edit or commit.
public/models/house_aventa.glb     124 MB, gitignored, exceeds GitHub's limit
```

Pages: `Inicio`, `Ventanas`, `Puertas`, `Catalogo`, `Contacto`, `Inspiracion`,
`DesignExperience`, `PlaneaVisita`, `Merida`, `AvisoPrivacidad`, `Loader`.

## Rules

1. **Copy changes go in the locale JSON files, not in components.** If you find
   hardcoded Spanish or English strings in a `.vue` file, move them to the
   locale files and use the i18n key.

2. **Never change one language without the other.** `es.json` and `en.json` must
   have identical key structures. A missing key renders as a raw key string on
   the live site. Verify parity after any copy change. As of the September 2026
   import they are in perfect parity: 120 keys each, zero mismatches. Keep it
   that way.

   **But most of the site is not translated at all.** Measured coverage:

   | Locale key prefix | Keys | Covers |
   |---|---|---|
   | `ini_` | 99 | Inicio (homepage) |
   | `nav_` | 11 | Navigation |
   | `f_` | 5 | Footer |
   | `found_` | 3 | misc |
   | `con_` | 2 | Contacto (partial) |

   `Inicio.vue` makes 94 i18n calls. `Ventanas.vue`, `Puertas.vue` and
   `Merida.vue` make one each. `Contacto.vue` and `Catalogo.vue` make none.
   Their copy is hardcoded Spanish in the templates, for example
   `>Cotizar Proyecto<` and `>El equilibrio perfecto entre estética y
   eficiencia.<` in `Ventanas.vue`.

   So the English site is the homepage, the nav and the footer. A visitor who
   switches to English and clicks Ventanas or Puertas gets Spanish. Treat
   extracting those pages into the locale files as real, scoped work, not an
   incidental cleanup, and confirm with Sophia before starting it.

3. **Spanish is the primary language.** Spanish is what most visitors see. When
   copy quality has to be prioritized, prioritize Spanish. Use Mexican business
   Spanish, not neutral or Iberian Spanish.

4. **Never commit `.env`.** It holds database and mail credentials. Same for any
   API keys, FTP passwords, or cPanel credentials. If you ever see a secret in a
   diff, stop and flag it.

5. **Never commit `public/build/`.** It is generated output and is gitignored.

6. **Claude cannot deploy.** Deployment is a manual upload to Namecheap/cPanel
   that only Sophia can perform. See DEPLOY.md. When work is pushed, say plainly
   that it is on GitHub but **not yet live**, and point to the deploy steps.

7. **Verify before claiming done.** Run `npm run build` to confirm the change
   compiles. A change that breaks the build would take the live site down.

8. **Never put a bare `@` or `|` in a locale string.** vue-i18n reads `@` as a
   linked message and `|` as a plural separator. A message it cannot parse
   throws at render time and blanks the whole page. Write `{'@'}` and `{'|'}`
   instead. `npm run build` now runs `scripts/check-locales.mjs` first, which
   compiles every message and refuses to build if one is broken.

## Working with Sophia

Sophia is technical in mindset (RevOps and tech background) but is not a
day-to-day developer. She is comfortable with syntax and logic, less so with
git, deploys, and infrastructure.

- Explain *why* a step exists, not just the command, when it touches git,
  hosting, or anything irreversible.
- Keep answers short by default. She will ask for depth.
- No em dashes.
- Give options or a framework first, then go deep on the one she picks.
- She reviews all copy before it ships. Propose copy, do not publish it.
- Match the language of the task. Team-facing content leans Spanish, strategy
  and investor communication leans English.

## How we work

**Claude commits directly to `main`.** No feature branches unless a change is
risky enough to want looked at separately, in which case say so and branch.

Sophia's side is `git pull` before editing and `git pull` to collect new work.

This is safe because **nothing in this repository deploys itself**. The live
site changes only when Sophia builds and uploads to cPanel. A bad commit costs
a `git revert`, never an outage. See DEPLOY.md.

Two habits that keep it working:
- Sophia pulls before she starts editing.
- When Sophia says she is editing a file, stay off that file.

## Repository history

Started fresh from the local handoff copy because the previous developer had not
transferred his GitHub repository. If that repo becomes available later, the two
histories will need reconciling. Keep commits clean and descriptive to make that
merge easier.
