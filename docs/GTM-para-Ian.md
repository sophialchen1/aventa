# Eventos de clic del sitio: qué falta configurar en GTM

**Para quién es esto.** Para quien administre el contenedor de GTM y la
propiedad de GA4 de Aventa.

**Si ya lo hiciste, ignóralo.** Si en GTM ya tienes tags de GA4 disparándose con
los nombres de evento de la tabla de abajo, y en GA4 ya registraste
`link_location` y `file_name` como dimensiones personalizadas, esto ya está
hecho y no hay nada que cambiar. Se verifica en dos minutos: abre Vista previa
(Preview) en GTM, entra al sitio, haz clic en el botón flotante de WhatsApp y
mira si aparece un evento `whatsapp_click` con un tag de GA4 disparado. Si
aparece, listo.

---

## Qué cambió en el sitio

El sitio ahora empuja eventos de clic al dataLayer de GTM. Antes no empujaba
nada: el contenedor cargaba en todas las páginas pero no recibía nada, así que
cada clic que se quería medir tenía que ser un ID de conversión de Google Ads
escrito a mano dentro del código. Eso significaba que cualquier reporte nuevo
pedía un cambio de código y un deploy.

Ahora el código solo avisa "pasó esto, aquí". Lo que se hace con ese aviso se
define en GTM. Ningún reporte nuevo vuelve a requerir tocar el sitio.

Contenedor: **GTM-NV4MJRZX**.

## Los eventos

Todos los eventos llevan siempre estos dos parámetros:

| Parámetro | Valor |
|---|---|
| `page_path` | la página donde ocurrió el clic, por ejemplo `/catalogo` |
| `site_language` | `es` o `en` |

Y estos son los eventos:

| Evento | Parámetros extra | Dónde se dispara |
|---|---|---|
| `whatsapp_click` | `link_location` | los enlaces de WhatsApp del menú, el botón flotante y el CTA del asistente en home |
| `design_assistant_click` | `link_location` | menú de productos, "Explora nuestro asistente de diseño" |
| `quote_submit` | `link_location` | formulario de cotización, cuando ya validó y se muestra el agradecimiento |
| `catalog_download` | `link_location`, `file_name` | botón de descarga del catálogo |
| `doc_download` | `link_location`, `file_name` | menú Cómo Comprar, PDF del proceso de compra |

`link_location` dice en qué parte de la página vive el enlace. Valores actuales:

- `menu_productos` — el mega menú de Puertas y Ventanas, escritorio y móvil
- `boton_flotante` — el botón verde de WhatsApp que sigue a la página
- `inicio_asistente` — home, el CTA de la sección del asistente
- `catalogo_cta` — botón de descarga en la página de catálogo
- `menu_como_comprar` — menú Cómo Comprar
- `formulario_cotizacion` — el formulario de cotización

Entre `page_path` y `link_location` queda claro no solo qué se hizo clic sino
desde dónde: WhatsApp desde el menú y WhatsApp desde la sección del asistente en
home son dos filas distintas del mismo reporte.

## Qué hay que construir

Hoy los eventos llegan al dataLayer y ahí se quedan. Nada los reenvía a GA4 ni a
Google Ads, así que por ahora no son medibles.

**Paso 0.** Confirmar que GA4 carga. En el código del sitio no hay ningún ID de
GA4 (`G-…`), solo el de Google Ads. Si GA4 se carga desde un tag dentro de GTM,
perfecto. Si no existe una propiedad de GA4, ese es el primer paso y lo demás
depende de él.

**Paso 1. Variables.** Una Data Layer Variable por cada uno de `link_location`,
`file_name`, `page_path` y `site_language`. Nómbralas igual que la clave, para
que no haya que traducir mentalmente después.

**Paso 2. Activadores.** Un activador de tipo Evento personalizado (Custom
Event) por cada nombre de evento de la tabla. Coincidencia exacta, no hace falta
expresión regular.

**Paso 3. Tags.** Un tag de Evento de GA4 por activador, pasando las variables
del paso 1 como parámetros del evento. Conserva el mismo nombre de evento en
GA4 que en el dataLayer: si se renombra, después nadie entiende de dónde sale
cada número.

**Paso 4. Dimensiones personalizadas en GA4.** Registrar `link_location`,
`file_name` y `site_language` como dimensiones personalizadas con ámbito de
evento, en Administrar → Definiciones personalizadas. **Este es el paso que se
salta todo el mundo.** Sin él GA4 recibe los datos y no muestra nada: los
eventos aparecen, los parámetros no, y parece que la implementación falló
cuando en realidad solo falta declararlos.

**Paso 5. Google Ads.** Para lo que además deba contar como conversión, sobre
todo `quote_submit` y `whatsapp_click`, agregar un tag de conversión de Google
Ads sobre el mismo activador. **No borres las conversiones que ya están escritas
en el código hasta que las nuevas estén registrando.** Cuando lleven dos o tres
semanas dando datos consistentes, avísanos y las quitamos del código.

## Cómo verificar

Modo Vista previa en GTM, entrar al sitio y hacer estos cinco clics:

1. El botón flotante de WhatsApp → `whatsapp_click`, `link_location: boton_flotante`
2. Menú de Ventanas → "Explora nuestro asistente de diseño" → `design_assistant_click`
3. Página de catálogo → botón de descarga → `catalog_download` con `file_name`
4. Cambiar el sitio a inglés y repetir cualquiera → `site_language: en`
5. Enviar el formulario de cotización → `quote_submit`

En cada uno hay que ver el evento en la columna izquierda y el tag de GA4 en
"Tags Fired". Si el evento aparece pero el tag no, el problema está en el
activador. Si el tag dispara pero GA4 no reporta el parámetro, falta el paso 4.

## Dos cosas que conviene no "arreglar"

**La fuente de tráfico no está en estos eventos, a propósito.** GA4 ya le pone
source, medium, campaign y todos los UTM a cada evento que recibe, estos
incluidos. Duplicarlo en el código daría dos números que no coinciden. Así que
"este clic vino de Google Ads o fue directo" es un reporte de GA4: el evento es
la fila, la fuente es la columna.

**Hay dos números de WhatsApp y está bien así.** Uno es el bot de ThreeKit y el
otro es una línea real. Por eso los íconos sociales de la barra superior y del
pie siguen con su propia conversión aparte (`whatsapp_sec`) y no entran en
`whatsapp_click`. No los unifiques para dejar el número más limpio: se pierde
justo la distinción que interesa.

## Reportes que valen la pena primero

- `quote_submit` por fuente de la sesión. Qué canal produce prospectos, no clics.
- `whatsapp_click` por `link_location`. Si el volumen de WhatsApp lo carga el
  botón flotante, el menú o el CTA de home.
- `catalog_download` por `site_language`. Cuánta demanda real hay en inglés.
- Cualquier evento por página de entrada. Qué página convierte, no cuál recibe
  tráfico.

## Si hace falta un evento nuevo

Un `link_location` nuevo no requiere ningún cambio en GTM: aparece solo como un
valor más en los reportes que ya existen. Un **nombre de evento** nuevo sí
requiere activador y tag. Los nombres de evento y de parámetro son un contrato
con GTM: renombrar uno rompe los tags sin romper el sitio. Se agregan, no se
renombran.
