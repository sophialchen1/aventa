# Inicio.vue: what translates and what does not

Audited 15 Sep 2026 against the real source. **No changes made.** This is the map
for deciding what to fix, in what order.

## Summary

| | Count |
|---|---|
| Already wired to translation | **88 keys** |
| Hardcoded, visitors see them | **28 strings** |
| Hardcoded, inside disabled blocks (nobody sees them) | 6 |
| Hardcoded `title` tooltips (only visible on hover, desktop only) | 20 |

So the page is roughly three quarters translated. The 28 below are why switching
to English still leaves a lot of Spanish on screen.

## The 28 that matter

| Line | Text | Where it appears |
|---|---|---|
| 471 | Puertas y Ventanas de Madera Laminada con Ingeniería Alemana | **Hero headline** |
| 475 | Precisión técnica, perfiles multicapa resistentes a la torsión... | **Hero subheading** |
| 485 | Nuestros Productos | Hero button |
| 491 | Diseña tu proyecto | Hero button |
| 564 | Nuestras Puertas | Product card, mobile label |
| 598 | Nuestras Ventanas | Product card, mobile label |
| 637 | Nuestras Maderas | Product card, mobile label |
| 668 | Descubre cuál es ideal para ti | Button under the woods card |
| 727 | Próximamente | Under the certifications row |
| 985 | Explora y conecta con nosotros: | "Encuentra Tu Pieza Ideal" eyebrow |
| 990 | Encuentra Tu Pieza Ideal | Section heading |
| 993 | Descubre una propuesta pensada para tu espacio... | Section body |
| 997 | Completa el recorrido y accede a recomendaciones... | Section body |
| 1005 | Iniciar | Button |
| 1029 | Elegidos por: | Client logos heading |
| 1117 | Sostenibilidad | Value icon label |
| 1128 | Premium | Value icon label |
| 1139 | Seguridad | Value icon label |
| 1150 | Tranquilidad | Value icon label |
| 1204 | Convierte tus sueños en realidad | Section heading |
| 1207 | ¡Prueba nuestra asesoria creativa de IA...! | Section body |
| 1227 | Configurar mi puerta/ventana | WhatsApp button |
| 1321 | Conoce a detalle nuestros productos | Section heading |
| 1324 | Desde el diseño hasta la instalación, en AVENTA... | Section body |
| 1332 | Explorar | Button to Recursos |
| 1375 | Nombre (s) | Contact form placeholder |
| 1381 | Apellidos | Contact form placeholder |
| 1406 | ¿Quiero que me contacten por llamada? | Contact form checkbox |

Note on 1375 and 1381: the other three fields in that same form **are**
translated, using `f_numero`, `f_correo` and `f_msg`. Only the two name fields
were missed.

## The 6 not worth touching

Inside `v-if="false"` blocks, so they never render:

- 1255 Simulando el Confort de Productos Aventa
- 1258 ¡Vive la experiencia virtual!
- 1261, 1266 the two paragraphs under it
- 1274 Explorar
- 1287 Nuestras Membresías:

These belong to the retired 3D feature and the memberships row. Translating them
would be wasted effort. Deleting the blocks is a separate cleanup.

## The 20 tooltips

`title="..."` attributes on images: `ritz`, `valise`, `rosewood`, `Warm`, `Esg`,
`Fsc`, `Bernardi`, `Taller-g`, `Cuatro444`, `Beck`, `banner_home`,
`Proximo Colaborador`, and the four value icons.

Most are brand names that should not be translated at all. They only appear on
hover, on desktop. Lowest priority.

Worth noting separately: these are `title` attributes, not `alt`. The `alt`
attributes are empty or placeholders, which is the accessibility and SEO problem
in item 11 of BACKLOG.md. Different fix.

## Correctly wired already, do not touch

`:title="itemSeleccionado.name"`, `:title="item.name_p"` (x2),
`:placeholder="$t('f_numero')"`, `:placeholder="$t('f_correo')"`,
`:placeholder="$t('f_msg')"`.

These use `:` binding and work correctly.

## Suggested order

1. **Hero, lines 471 and 475.** First thing a visitor reads, and the first thing
   Sophia wants changed.
2. **Buttons and section headings**: 485, 491, 668, 1005, 1332, 1227.
3. **Product card labels**: 564, 598, 637. Note the keys `ini_puertas`,
   `ini_ventanas` and `ini_maderas` already exist and are used elsewhere on this
   same page, so these three need no new translation at all.
4. **The two form placeholders**: 1375, 1381.
5. **Body copy**: 993, 997, 1207, 1324, 475.
6. Everything else.
