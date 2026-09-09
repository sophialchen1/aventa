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
resources/js/                      Vue components, pages, router
resources/views/                   the single Blade view Laravel serves
routes/web.php                     Laravel routes (SPA catch-all)
public/build/                      Vite output. Generated. Never edit or commit.
```

## Rules

1. **Copy changes go in the locale JSON files, not in components.** If you find
   hardcoded Spanish or English strings in a `.vue` file, move them to the
   locale files and use the i18n key.

2. **Never change one language without the other.** `es.json` and `en.json` must
   have identical key structures. A missing key renders as a raw key string on
   the live site. Verify parity after any copy change.

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

## Repository history

Started fresh from the local handoff copy because the previous developer had not
transferred his GitHub repository. If that repo becomes available later, the two
histories will need reconciling. Keep commits clean and descriptive to make that
merge easier.
