# What the previous developer left behind

A plain record of the state aventawindows.com was in when Sophia took it over,
September 2026.

**Why this exists.** To show what was inherited, to decide whether to repair the
site or rebuild it, and to have a factual record if this is ever discussed with
the developer, the GM or the board.

**How it was checked.** Every item below was read in the code or measured on the
live site. Each one says where. Nothing here is a guess. Anything uncertain is
in `BACKLOG.md` marked *Suspected* and is deliberately left out of this
document.

**Conclusion: repair, do not rebuild.** The reasoning is at the end.

---

# What was done well

Listed first because it is true, and because it decides whether a rebuild is
worth paying for.

**Nothing jumps around while the page loads.** Google measures this on real
visitors. Aventa scores a perfect 0. It is genuinely hard and most professional
sites fail it.

**SEO 92 out of 100. Best practices 96 out of 100.** The basics are right.

**The translation system is built correctly.** The mechanism works, and the
Spanish and English files match each other exactly. The problem was how little
of the site was plugged into it, not how it was built.

**The code is organised sensibly.** 11 pages, 18 reusable components, clear
folders. A competent developer can work in it without a fight.

**Tracking is properly installed.** Google Tag Manager, Google Ads conversion
tracking and HubSpot forms are all correctly wired, including separate
conversion events for WhatsApp, phone and social clicks.

---

# 1. Updating the site silently did nothing

**The most serious finding.**

Laravel was never told where the website's public folder actually is. So it
looked for its list of files in one folder, while visitors' browsers downloaded
those files from a completely different one.

In plain terms: when the site is updated, the build tool renames every file with
a random code so browsers do not show a stale version. It writes a list matching
old names to new ones. Laravel read that list from `aventa/public/build`. The
browser downloaded the actual files from `public_html/build`.

Update only the folder that visitors reach, which is the obvious thing to do and
what every general Laravel guide describes, and Laravel keeps reading the old
list, keeps writing the old filenames into the page, and the browser finds those
old files still sitting there. **The site keeps serving the previous version. No
error. No warning. It just looks like the upload did not work.**

The proof that this kept happening: `aventa/public/build` is 240 MB and
`public_html/build` is 167 MB. One build is a small fraction of that. Both are
layers of every update ever made.

Fixed 14 September 2026. It was one line.

# 2. A 124 MB file downloaded on every page

One line in `resources/views/welcome.blade.php` told every browser to download
the 124 MB 3D model immediately, at high priority, ahead of the content the
visitor came for. The same instruction appears again in `MainLayout.vue`, so it
happens twice.

The model is only ever displayed inside a pop-up the visitor has to click.

So every visitor on every page downloads 124 MB for a feature most of them never
open. On a phone that is minutes of waiting, paid for out of the visitor's own
data.

What it does to real visitors, measured by Google over 28 days: 3.1 seconds
before anything appears at all, against a 1.8 second target. 3.9 seconds for the
main image, against 2.5. Overall Core Web Vitals result: **Failed**.

The model is also almost certainly an unoptimised export. Files like it normally
shrink by 90% or more with no visible difference.

# 3. The site was never really bilingual

There is a language switcher on every page. It worked on the homepage, the
navigation and the footer. Nowhere else.

An English-speaking visitor switched language, saw an English homepage, clicked
Windows, and landed on Spanish.

About 224 pieces of text were typed directly into the page files instead of
going through the translation system that was already built and working.

The homepage is the clearest illustration. It was not untranslated, it was
translated carelessly. The hero headline, both hero buttons, every section
heading and two of the five contact form fields were typed in by hand, while
everything around them used the translation system properly. In three cases the
English translation already existed and simply was not used: the key for "Our
Doors" is called on line 517, three lines below where "Nuestras Puertas" had
been typed in directly.

Nobody viewed the page in English after building it.

Separately, every page declares itself Spanish to Google regardless of what the
visitor selected.

# 4. The site's photos were kept outside the project

The `media` folder on the live server is 1,134 MB. The project's entire public
folder is 364 MB and contains no `media` folder at all. `proyectos` is 102 MB
live and empty in the project.

So roughly 1.24 GB of what the website shows was uploaded straight to the server
and never existed in the project. It was not in the code, not in the backup zips
on the server, and would not have been in any version control.

The practical result: a complete backup of the project was not a backup of the
site, and nothing in the handover made that distinction visible. If the hosting
account had been lost, the photography would have been gone.

# 5. The project could not be built by anyone else

The code imports an icon library that was never recorded as a requirement.
Download the project, install it, build it, and you get an error and no website.

It only ever worked on the developer's own laptop, where the library happened to
be installed. No colleague, contractor or successor could have made a single
change without first diagnosing this.

Handing over a project that does not build is more consequential than any
individual item in section 7, because it blocks everything else.

Fixed 14 September 2026.

# 6. Accessibility was treated as optional

Score: 77 out of 100.

In the code: 23 images with no description at all, and 6 with placeholders like
`alt="img_home"`, which describes the variable name rather than the picture.

Also flagged: text that does not contrast enough with its background, links with
no readable name, embedded frames with no titles, and buttons too small or too
close together to tap reliably on a phone.

That last one costs money directly. Over 70% of Aventa's leads come from paid
Meta and Google, mostly on phones. A button that is hard to tap loses a form
submission that was already paid for.

The missing image descriptions are also an SEO problem. Aventa competes on how
its products look, owns 1.1 GB of photography, and Google cannot read any of it.

# 7. Nothing was left tidy

Small on their own. Together they show nobody reviewed the work.

**A corrupted duplicate file was left in the project.** Two files exist:
`ConfigDiseños.vue` and `ConfigDiseдos.vue`. The second has a Cyrillic "д" where
the "ñ" should be, from a text-encoding accident. Only the correct one is used.
The broken copy was created, never used, and never deleted. Nobody looked at the
folder afterwards.

**Editor settings were left in the project.** PhpStorm and VS Code configuration
folders, neither of which belongs there.

**Line endings are inconsistent**, from editing on Windows against a Linux
server with nothing set up to manage it.

# 8. The handover itself

This is why the first days of the takeover went on recovery instead of work.

**No version history was handed over.** There is none on the server at all. The
developer worked locally and uploaded files. The entire history of the project
exists only in a personal repository that was never transferred.

**No copy of the code was provided.** At handover, the only copy of the source
code Aventa possessed was the one running on the production server.

**The only documentation was a Windows setup guide.** It explains how to install
PHP on Windows and start a development server. It says nothing about how to
publish a change, nothing about the two-folder problem in section 1, nothing
about where the photos live. All of it had to be worked out from scratch.

**The bundled software did not run on the client's computer.** The handover
package included PHP and Node as Windows programs. Sophia uses a Mac.

---

# Assessment

The site is soundly built and worth keeping. The failures cluster in three
places: **publishing** (sections 1 and 5), **performance** (section 2), and
**the handover itself** (section 8).

Those compound each other. A publishing process that silently discards your
changes is hard enough to diagnose. Handing it over with no documentation, no
history and no copy of the code meant there was no way to find out before
shipping a change that appeared to do nothing.

Sections 1, 2 and 3 are all fixable inside the existing code. None needs a
rebuild.

**In order:**

1. **The publishing path**, so updates stop silently failing. Done.
2. **The model preload**, so the site stops sending 124 MB to every visitor.
   One line, pending a decision on where the 3D house belongs.
3. **The remaining pages into the translation system**, so the language switcher
   tells the truth. Homepage done, ten pages to go.

The full working list, including unverified items, is in `BACKLOG.md`.
