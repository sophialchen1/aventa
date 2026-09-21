// Compiles every message in both locale files and fails on any error.
//
// vue-i18n treats some characters as syntax, not text:
//   @  starts a linked message   -> write {'@'}
//   |  separates plural forms    -> write {'|'}
//   {} wrap an interpolation     -> write {'{'} and {'}'}
// A message the compiler cannot parse throws at render time and blanks the
// whole page, so this runs before every build.
import { createI18n } from 'vue-i18n'
import en from '../resources/js/src/locales/en.json' with { type: 'json' }
import es from '../resources/js/src/locales/es.json' with { type: 'json' }

const problems = []
let current = null
const realError = console.error
console.error = (...args) => {
    const text = args.join(' ')
    if (text.includes('Message compilation error')) problems.push(`${current}\n    ${text.split('\n')[0]}`)
    else realError(...args)
}

const i18n = createI18n({ legacy: false, locale: 'es', fallbackLocale: 'en', messages: { en, es }, warnHtmlMessage: false })
const g = i18n.global
for (const [loc, msgs] of [['es', es], ['en', en]]) {
    g.locale.value = loc
    for (const k of Object.keys(msgs)) {
        current = `${loc}  ${k}`
        try { g.t(k) } catch (e) { problems.push(`${current}\n    threw: ${e.message}`) }
    }
}
console.error = realError

// A message can compile cleanly and still be wrong. A bare | is valid syntax:
// vue-i18n reads it as a plural form and silently renders only the first half,
// which is how "Title | Aventa Windows" became "Title". Catch those too.
for (const [loc, msgs] of [['es', es], ['en', en]]) {
    for (const [k, v] of Object.entries(msgs)) {
        if (typeof v !== 'string') continue
        const bare = v.replace(/\{'[@|{}]'\}/g, '')
        if (bare.includes('|')) problems.push(`${loc}  ${k}\n    bare | (plural separator). Write {'|'} for a literal pipe.`)
        if (bare.includes('@')) problems.push(`${loc}  ${k}\n    bare @ (linked message). Write {'@'} for a literal at sign.`)
    }
}

const enKeys = Object.keys(en), esKeys = Object.keys(es)
const onlyEn = enKeys.filter(k => !(k in es))
const onlyEs = esKeys.filter(k => !(k in en))
if (onlyEn.length) problems.push(`keys only in en.json: ${onlyEn.join(', ')}`)
if (onlyEs.length) problems.push(`keys only in es.json: ${onlyEs.join(', ')}`)

if (problems.length) {
    console.log('LOCALE CHECK FAILED\n')
    for (const p of [...new Set(problems)]) console.log('  ' + p)
    process.exit(1)
}
console.log(`locale check passed: ${enKeys.length} keys, both languages, all compile`)
