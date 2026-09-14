<script setup lang="ts">
import MainLayout from "@/src/layouts/MainLayout.vue";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

type Lang = "es" | "en";

type PolicyItem = {
    number: string;
    title?: string;
    paragraphs: string[];
};

const { locale } = useI18n();

const savedLang = localStorage.getItem("lang") as Lang | null;

const currentLang = ref<Lang>(
    savedLang === "en" || savedLang === "es"
        ? savedLang
        : locale.value === "en"
            ? "en"
            : "es"
);

function setLenguaje(lang: Lang) {
    localStorage.setItem("lang", lang);
    locale.value = lang;
    location.reload();
}

const policyContent: Record<Lang, {
    badge: string;
    title: string;
    subtitle: string;
    code: string;
    revision: string;
    items: PolicyItem[];
}> = {
    es: {
        badge: "Aventa Windows",
        title: "Política de Garantía Aventa",
        subtitle: "Consulta las condiciones, cobertura, reclamaciones, exclusiones, mantenimiento y alcance aplicable a la garantía de productos Aventa.",
        code: "AW-PL-PG-01",
        revision: "Rev. 01",
        items: [
            {
                number: "1",
                title: "Fecha de inicio",
                paragraphs: [
                    "La garantía comenzará a partir de la fecha de finalización de la instalación y será válida únicamente cuando se haya realizado el pago total de las piezas, de acuerdo con la factura correspondiente emitida por Aventa.",
                    "La cobertura tendrá una vigencia de tres años, ampliable a 5 años si se adquiere el paquete de mantenimiento preventivo Aventa en el primer año.",
                    "En caso de no liquidar el monto total del precio de las piezas instaladas, así como los costos asociados a fletes, maniobras, instalaciones especiales u otros conceptos relacionados, la garantía quedará sin efecto."
                ]
            },
            {
                number: "2",
                title: "Transferencia de cobertura de garantía",
                paragraphs: [
                    "Esta garantía aplica tanto al comprador original como a todos los propietarios posteriores. La cobertura permanecerá vigente durante el resto del período original de la garantía aplicable, sin importar la transferencia de propiedad."
                ]
            },
            {
                number: "3",
                title: "Proceso de reclamaciones",
                paragraphs: [
                    "Si considera que los productos Aventa, o alguna de sus partes, presentan defectos, deberá presentar una reclamación por escrito a Aventa, a un distribuidor autorizado, a una tienda de mejoras para el hogar o al negocio donde adquirió los productos Aventa.",
                    "Esta reclamación debe realizarse dentro de los primeros treinta días hábiles posteriores a la detección del defecto o cualquier otra causa que motive la reclamación, o dentro del tiempo en que razonablemente debería haberse detectado.",
                    "Las reclamaciones realizadas fuera de este plazo no estarán cubiertas por la garantía, ni se cubrirán daños ocasionados como consecuencia de no reportar el problema oportunamente."
                ]
            },
            {
                number: "4",
                title: "Proceso de presentación de reclamaciones por escrito",
                paragraphs: [
                    "Las reclamaciones deben enviarse al correo electrónico info@aventawindows.com con el asunto “Solicitud garantía” e incluir la dirección completa del domicilio.",
                    "El aviso por escrito debe contener una descripción de los productos Aventa, el número de pedido, la fecha y lugar de compra, así como el comprobante de pago y las facturas emitidas por Aventa.",
                    "Asimismo, es necesario incluir una descripción detallada del problema, la fecha de instalación de los productos Aventa y evidencia razonable que demuestre que la garantía aplica al caso presentado."
                ]
            },
            {
                number: "5",
                title: "Proceso de revisión de la reclamación",
                paragraphs: [
                    "Una vez que Aventa reciba la reclamación, el tiempo estimado para brindar una primera respuesta será de 15 a 20 días hábiles.",
                    "Aventa revisará la reclamación para determinar si está cubierta por la garantía. Durante este proceso, Aventa podrá solicitar fotografías, muestras representativas con transporte prepagado, o acceso razonable al producto para realizar una inspección."
                ]
            },
            {
                number: "6",
                title: "Proceso de resolución de reclamaciones cubiertas",
                paragraphs: [
                    "Las reclamaciones cubiertas por esta garantía estarán limitadas a las siguientes acciones, a discreción exclusiva de Aventa.",
                    "(a) El período de garantía no se extenderá por el reemplazo de ningún producto, aunque cualquier pieza reemplazada seguirá estando cubierta durante el resto del período de garantía original aplicable.",
                    "(b) Reembolsar el costo original de los productos Aventa."
                ]
            },
            {
                number: "7",
                title: "Limitación de costos cubiertos",
                paragraphs: [
                    "Los costos cubiertos por esta garantía no incluyen gastos de mano de obra, remoción, instalación ni materiales relacionados con la adecuación o reparación del espacio circundante o adyacente al producto reparado o reemplazado, incluyendo molduras u otros trabajos de carpintería."
                ]
            },
            {
                number: "8",
                title: "Reserva de derechos de Aventa",
                paragraphs: [
                    "Aventa se reserva el derecho, a su exclusiva discreción, de modificar, alterar o descontinuar cualquiera de sus productos.",
                    "En caso de que alguna pieza, componente o unidad completa no esté disponible, Aventa podrá sustituirlo por otro de calidad o valor sustancialmente equivalente."
                ]
            },
            {
                number: "9",
                title: "Definición de defectos",
                paragraphs: [
                    "Los defectos cubiertos incluyen grietas, desprendimientos, ampollas, descamaciones, deslaminaciones, degradaciones excesivas y, en el caso de pintura, desvanecimiento o cambio de color, siempre que ocurran bajo condiciones ambientales normales."
                ]
            },
            {
                number: "10",
                title: "Exclusiones de la garantía",
                paragraphs: [
                    "La presente sección detalla de forma exhaustiva los supuestos que no están cubiertos por esta garantía."
                ]
            },
            {
                number: "10.1",
                paragraphs: [
                    "Aventa no garantiza que los productos Aventa cumplan con estatutos, códigos, ordenanzas o regulaciones como finalmente se utilicen o instalen. El cumplimiento con los códigos de construcción locales, códigos de seguridad y códigos contra incendios es responsabilidad del comprador original."
                ]
            },
            {
                number: "10.2",
                paragraphs: [
                    "Daños, defectos o problemas resultantes de causas fuera del control de Aventa están excluidos de la cobertura. Tales causas como instalación, mantenimiento y fenómenos naturales, como:"
                ]
            },
            {
                number: "10.2.1",
                paragraphs: ["Instalación no conforme con las instrucciones de instalación de Aventa, las mejores prácticas de la industria y los códigos de construcción aplicables."]
            },
            {
                number: "10.2.2",
                paragraphs: ["Reparaciones o modificaciones realizadas por cualquier persona que no sea Aventa (o uno de sus subcontratistas autorizados). Productos alterados o reinstalados."]
            },
            {
                number: "10.2.3",
                paragraphs: ["Acabado de campo incorrecto o no estándar (solicitudes de eliminar las tintas usadas con aplicación exclusivamente del recubrimiento)."]
            },
            {
                number: "10.2.4",
                paragraphs: ["Instalación no estándar, como vidrio no vertical o inclinado, al revés o fuera de cuadro."]
            },
            {
                number: "10.2.5",
                paragraphs: ["Daños causados por el uso de los productos en aplicaciones que excedan los estándares de diseño establecidos por Aventa."]
            },
            {
                number: "10.2.6",
                paragraphs: ["Instalación o uso cerca de piscinas, saunas, jacuzzis, regaderas u otros ambientes de alta humedad o fuentes de cloro."]
            },
            {
                number: "10.2.7",
                paragraphs: ["Daño causado por la alta humedad en el hogar (condensación, escarcha y moho)."]
            },
            {
                number: "10.2.8",
                paragraphs: ["Integración o compatibilidad con cualquier sistema o dispositivo proporcionado por terceros."]
            },
            {
                number: "10.2.9",
                paragraphs: ["No seguir las instrucciones de cuidado y mantenimiento de Aventa."]
            },
            {
                number: "10.2.10",
                paragraphs: ["No tratar, sellar y mantener adecuadamente la madera expuesta."]
            },
            {
                number: "10.2.11",
                paragraphs: ["Uso de limpiadores, químicos inapropiados o abrasión mecánica."]
            },
            {
                number: "10.2.12",
                paragraphs: ["Uso indebido, abuso, modificación, alteración, accidente, negligencia, aplicación o uso de productos de terceros."]
            },
            {
                number: "10.2.13",
                paragraphs: ["Desplazamiento o asentamiento de la estructura en la que se instala el producto."]
            },
            {
                number: "10.2.14",
                paragraphs: ["Los daños causados por eventos climáticos extremos (lluvia ácida u otros elementos corrosivos), condiciones atmosféricas inusuales o exposición a ambientes corrosivos."]
            },
            {
                number: "10.2.15",
                paragraphs: ["Infiltración de agua que no sea como resultado de un defecto de fabricación."]
            },
            {
                number: "10.2.16",
                paragraphs: ["Desgaste normal, la decoloración o el desgaste de los acabados, así como las variaciones naturales en el color, la textura y la veta de la madera. Rasgaduras, desgarros u otros daños no atribuibles a Aventa en puertas y ventanas asociadas con el desgaste a través del uso del producto."]
            },
            {
                number: "10.2.17",
                paragraphs: ["Variación en el color, textura y grano de la madera."]
            },
            {
                number: "10.2.18",
                paragraphs: ["Guerra, insurrección, disturbios civiles, terrorismo o fenómenos naturales."]
            },
            {
                number: "10.3",
                title: "Deformaciones",
                paragraphs: [
                    "La curvatura, torsión y deformación no se considerarán defectos a menos que excedan ¼ de pulgada en el plano de la puerta o ventana.",
                    "La acción sobre reclamaciones por curvatura, torsión o deformación puede ser diferida a opción de Aventa por un período que no exceda los doce meses después de la instalación para permitir que la puerta se aclimate a las condiciones de temperatura y humedad."
                ]
            },
            {
                number: "11",
                title: "Exclusiones de la garantía: Humedad, eficiencia térmica y corrosión",
                paragraphs: []
            },
            {
                number: "11.1",
                paragraphs: ["Los productos instalados en sistemas de pared que no permiten una adecuada gestión de la humedad, como los sistemas de aislamiento y acabado exterior (EIFS) o \"estuco sintético\" sin sistemas de drenaje efectivos, no están cubiertos."]
            },
            {
                number: "11.2",
                title: "Asignación de riesgos del rendimiento",
                paragraphs: [
                    "Dado que toda construcción debe anticipar cierta infiltración de agua, es importante que el sistema de pared esté diseñado y construido para manejar adecuadamente la humedad.",
                    "Aventa no es responsable de reclamos o daños causados por infiltración de agua anticipada o no anticipada; deficiencias en el diseño, construcción y mantenimiento del edificio; o el uso de productos Aventa en sistemas de pared de barrera, que no permiten un adecuado manejo de la humedad dentro del sistema de pared.",
                    "La determinación de la idoneidad de todos los componentes del edificio, incluido el uso de piezas Aventa, así como el diseño e instalación de sistemas de sellado y sellado, es responsabilidad del comprador o usuario, el arquitecto, contratista, instalador u otro profesional de la construcción y no es responsabilidad de Aventa.",
                    "Todos los riesgos relacionados con el diseño y construcción del edificio, o el mantenimiento, instalación y uso de las piezas de Aventa deben ser asumidos por el comprador y/o usuario."
                ]
            },
            {
                number: "11.3",
                paragraphs: [
                    "Aventa no garantiza la cantidad o el porcentaje de argón u otro gas inerte presente en el vidrio aislante. Se sabe que el gas inerte dentro del vidrio aislante se disipa con el tiempo.",
                    "Aventa no ofrece garantía con respecto a la tasa de disipación del Gas inerte o la cantidad de Gas inerte que queda en la pieza en cualquier momento después de la fabricación. La eficiencia térmica varía con la aplicación del producto, y Aventa no garantiza un nivel específico de eficiencia térmica."
                ]
            },
            {
                number: "11.4",
                paragraphs: ["La condensación no es un defecto del producto, sino el resultado de la humedad excesiva. No está cubierta la condensación, el hielo, el moho, el mildiu y/o los hongos."]
            },
            {
                number: "11.5",
                paragraphs: ["La falla del acabado o la corrosión de acabados especiales, herrajes u otros componentes debido a condiciones ambientales no están cubiertos."]
            },
            {
                number: "12",
                title: "Mosquiteros",
                paragraphs: ["No están diseñados como dispositivos de seguridad ni prevención de caídas."]
            },
            {
                number: "13",
                title: "Mantenimiento y limpieza",
                paragraphs: [
                    "Los compradores originales son responsables del mantenimiento adecuado del sistema de herrajes (cuando corresponda), utilizando lubricantes específicos para garantizar su correcto funcionamiento. Bajo ninguna circunstancia debe emplearse agua, ya que esto podría causar oxidación.",
                    "Asimismo, los productos suministrados por Aventa deben limpiarse de manera rutinaria con paños de algodón humedecidos, limitando la limpieza a un máximo de 5 veces al año. No se deben usar productos jabonosos, aceites ni químicos para su limpieza."
                ]
            },
            {
                number: "14",
                title: "Costos adicionales",
                paragraphs: ["El cliente será responsable de cubrir todos los costos relacionados con la eliminación, reinstalación, transporte, maniobras, permisos, licencias y otros gastos asociados a cualquier parte, pieza o componente."]
            },
            {
                number: "15",
                title: "Exclusión de responsabilidad por daños indirectos y consecuenciales",
                paragraphs: [
                    "Aventa no será responsable, bajo ninguna circunstancia, por daños indirectos, especiales o consecuenciales, incluyendo pérdida de ingresos, lucro cesante, daño moral u otros conceptos similares, derivados del incumplimiento de esta garantía, incumplimiento de contrato, negligencia, responsabilidad objetiva o cualquier otra figura prevista en la legislación mexicana aplicable.",
                    "Esta exclusión de responsabilidad se encuentra en conformidad con los principios establecidos en el Código Civil Federal y otras leyes aplicables en México."
                ]
            },
            {
                number: "16",
                title: "Vida útil",
                paragraphs: ["Esta garantía no constituye una declaración sobre la vida útil de los productos Aventa. Se limita exclusivamente a las disposiciones para reparar, reemplazar o reembolsar según lo descrito en esta garantía."]
            },
            {
                number: "17",
                title: "Sin renuncia",
                paragraphs: [
                    "Aventa puede, a su discreción, otorgar beneficios adicionales más allá de lo cubierto por esta garantía. Cualquier extensión deberá constar por escrito y aplicará únicamente a la instancia específica en que se otorgue.",
                    "Esto no se considerará como una renuncia al derecho de Aventa de hacer cumplir estrictamente los términos de esta garantía en otras circunstancias."
                ]
            },
            {
                number: "18",
                title: "Sin modificaciones",
                paragraphs: [
                    "Al adquirir, instalar o utilizar el producto cubierto por esta garantía, usted acepta que no se está basando en ninguna declaración, ya sea escrita u oral, realizada por cualquier persona que contradiga o agregue términos a esta garantía.",
                    "Cualquier modificación a los términos de esta garantía únicamente será válida mediante un acuerdo por escrito firmado por el cliente y un representante debidamente autorizado de Aventa."
                ]
            },
            {
                number: "19",
                title: "Herrajes",
                paragraphs: ["Garantía limitada a funcionalidad por 3 años, sujeta a mantenimiento comprobable; costos de envío e instalación excluidos."]
            },
            {
                number: "20",
                title: "Vidrios",
                paragraphs: [
                    "Los cristales templados, laminados e insulados (Duo-Vent) instalados por personal de Aventa cumplen con los estándares de garantía establecidos en la Norma Oficial Mexicana NOM-146-SCFI-2016, publicada el 3 de febrero de 2017 en el Diario Oficial de la Federación.",
                    "Los cristales insulados cuentan con una garantía de 3 años a partir de su instalación en la hoja o marco correspondiente, siempre que no hayan sido expuestos a factores externos o situaciones violentas que ocasionen el daño."
                ]
            },
            {
                number: "21",
                title: "Reclamaciones de vidrio",
                paragraphs: [
                    "Se consideran aceptables las piezas de vidrio con un 5% o menos de desperfectos, los cuales no se califican como imperfecciones. Estos defectos son ajenos al proceso de fabricación de Aventa y corresponden a proveedores externos.",
                    "Aventa gestionará las reclamaciones ante el proveedor únicamente por los defectos o detalles reportados que cumplan con los criterios establecidos, excluyendo:"
                ]
            },
            {
                number: "21.1",
                paragraphs: ["Imperfecciones menores en el vidrio que no afectan la integridad estructural del producto o no obstruyen significativamente la visión."]
            },
            {
                number: "21.2",
                paragraphs: ["Variaciones menores en el color de vidrio."]
            },
            {
                number: "21.3",
                paragraphs: ["Aplicación de películas para vidrios posteriores a la venta."]
            },
            {
                number: "21.4",
                paragraphs: ["Fenómenos naturales, vandalismo y/o entrada forzada."]
            },
            {
                number: "22",
                title: "Uso inconsistente y alcance territorial",
                paragraphs: [
                    "Aventa no se hace responsable de ninguna pérdida o daño que resulte del uso de sus productos de madera de manera inconsistente con las instrucciones o información establecidas en esta garantía.",
                    "Al adquirir, instalar o utilizar productos de Aventa, el cliente reconoce que esta garantía forma parte de los términos de venta.",
                    "Esta garantía aplica únicamente a los productos de Aventa comprados a partir del 1 de enero de 2026 e instalados dentro de los Estados Unidos Mexicanos."
                ]
            }
        ]
    },
    en: {
        badge: "Aventa Windows",
        title: "Aventa Warranty Policy",
        subtitle: "Review the conditions, coverage, claims, exclusions, maintenance, and scope applicable to the Aventa product warranty.",
        code: "AW-PL-PG-01",
        revision: "Rev. 01",
        items: [
            {
                number: "1",
                title: "Start Date",
                paragraphs: [
                    "The warranty shall begin on the date installation is completed and shall be valid only when full payment for the parts has been made, in accordance with the corresponding invoice issued by Aventa.",
                    "Coverage shall be valid for three years. Extendable to five (5) years if the Aventa Preventive Maintenance Package is purchased within the first year.",
                    "Failure to fully pay the price of the installed parts, as well as costs associated with freight, handling, special installations, or other related charges, shall render this warranty null and void."
                ]
            },
            {
                number: "2",
                title: "Transferability of Warranty Coverage",
                paragraphs: [
                    "This warranty applies to the original purchaser as well as all subsequent owners. Coverage shall remain valid for the remainder of the original applicable warranty period, regardless of any transfer of ownership."
                ]
            },
            {
                number: "3",
                title: "Claims Process",
                paragraphs: [
                    "If you believe that Aventa products, or any of their components, present defects, you must submit a written claim to Aventa, an authorized distributor, a home improvement store, or the business where the Aventa products were purchased.",
                    "Such claim must be made within the first thirty (30) business days after detecting the defect or any other cause giving rise to the claim, or within the time such defect should reasonably have been detected.",
                    "Claims made outside this period shall not be covered by this warranty, nor shall damages resulting from failure to timely report the issue be covered."
                ]
            },
            {
                number: "4",
                title: "Written Claim Submission Process",
                paragraphs: [
                    "Claims must be sent to info@aventawindows.com with the subject line “Warranty Request” and include the full address of the property.",
                    "The written notice must contain a description of the Aventa products, order number, date and place of purchase, proof of payment, and invoices issued by Aventa.",
                    "It must also include a detailed description of the issue, the installation date of the Aventa products, and reasonable evidence demonstrating that the warranty applies to the claim."
                ]
            },
            {
                number: "5",
                title: "Claim Review Process",
                paragraphs: [
                    "Once Aventa receives the claim, the estimated time to provide an initial response shall be 15 to 20 business days.",
                    "Aventa will review the claim to determine whether it is covered under this warranty. During this process, Aventa may request photographs, representative samples with prepaid transportation, or reasonable access to the product for inspection purposes."
                ]
            },
            {
                number: "6",
                title: "Resolution of Covered Claims",
                paragraphs: [
                    "Claims covered under this warranty shall be limited to the following actions, at Aventa’s sole discretion.",
                    "(a) The warranty period shall not be extended due to the replacement of any product; however, any replaced part shall remain covered for the remainder of the original applicable warranty period.",
                    "(b) Refund of the original purchase cost of the Aventa products."
                ]
            },
            {
                number: "7",
                title: "Limitation of Covered Costs",
                paragraphs: [
                    "Costs covered by this warranty do not include labor, removal, installation, or materials related to modification or repair of surrounding or adjacent areas to the repaired or replaced product, including trim or carpentry work."
                ]
            },
            {
                number: "8",
                title: "Reservation of Rights",
                paragraphs: [
                    "Aventa reserves the right, at its sole discretion, to modify, alter, or discontinue any of its products.",
                    "If any part, component, or complete unit is unavailable, Aventa may substitute it with another of substantially equivalent quality or value."
                ]
            },
            {
                number: "9",
                title: "Definition of Defects",
                paragraphs: [
                    "Covered defects include cracks, peeling, blistering, flaking, delamination, excessive degradation, and in the case of paint, fading or color change, provided they occur under normal environmental conditions."
                ]
            },
            {
                number: "10",
                title: "Warranty Exclusions",
                paragraphs: ["This section exhaustively details the circumstances that are not covered by this warranty."]
            },
            {
                number: "10.1",
                paragraphs: [
                    "Aventa does not warrant that Aventa products will comply with any statutes, codes, ordinances, or regulations as ultimately used or installed. Compliance with all applicable local building codes, safety codes, and fire codes is the sole responsibility of the original purchaser."
                ]
            },
            {
                number: "10.2",
                paragraphs: [
                    "Damages, defects, or issues resulting from causes beyond Aventa’s control are excluded from warranty coverage. Such causes include, without limitation, installation, maintenance, and natural events, including but not limited to the following:"
                ]
            },
            {
                number: "10.2.1",
                paragraphs: ["Installation not performed in accordance with Aventa’s installation instructions, applicable industry best practices, and all applicable building codes."]
            },
            {
                number: "10.2.2",
                paragraphs: ["Repairs or modifications performed by any person or entity other than Aventa (or one of its authorized subcontractors). Altered or reinstalled products."]
            },
            {
                number: "10.2.3",
                paragraphs: ["Improper or non-standard field finishing, including requests to remove applied stains and apply coating only."]
            },
            {
                number: "10.2.4",
                paragraphs: ["Non-standard installation, including glass installed in a non-vertical or angled position, installed upside down, or out of square."]
            },
            {
                number: "10.2.5",
                paragraphs: ["Damage caused by the use of the Products in applications that exceed the design standards established by Aventa."]
            },
            {
                number: "10.2.6",
                paragraphs: ["Installation or use near swimming pools, saunas, hot tubs, showers, or other high-humidity environments or sources of chlorine."]
            },
            {
                number: "10.2.7",
                paragraphs: ["Damage caused by high levels of humidity within the home, including condensation, frost, and mold."]
            },
            {
                number: "10.2.8",
                paragraphs: ["Integration or compatibility with any system or device provided by third parties."]
            },
            {
                number: "10.2.9",
                paragraphs: ["Failure to follow Aventa’s care and maintenance instructions."]
            },
            {
                number: "10.2.10",
                paragraphs: ["Failure to properly treat, seal, and maintain exposed wood."]
            },
            {
                number: "10.2.11",
                paragraphs: ["Use of improper cleaners, chemicals, or mechanical abrasion."]
            },
            {
                number: "10.2.12",
                paragraphs: ["Misuse, abuse, modification, alteration, accident, negligence, or the application or use of third-party products."]
            },
            {
                number: "10.2.13",
                paragraphs: ["Movement or settling of the structure in which the Product is installed."]
            },
            {
                number: "10.2.14",
                paragraphs: ["Damage caused by extreme weather events (including acid rain or other corrosive elements), unusual atmospheric conditions, or exposure to corrosive environments."]
            },
            {
                number: "10.2.15",
                paragraphs: ["Water infiltration not resulting from a manufacturing defect."]
            },
            {
                number: "10.2.16",
                paragraphs: ["Normal wear and tear, fading or deterioration of finishes, as well as natural variations in the color, texture, and grain of wood. Scratches, tears, or other damage to doors and windows not attributable to Aventa and associated with wear resulting from normal use of the Product."]
            },
            {
                number: "10.2.17",
                paragraphs: ["Variations in the color, texture, and grain of wood."]
            },
            {
                number: "10.2.18",
                paragraphs: ["War, insurrection, civil disturbances, terrorism, or acts of nature."]
            },
            {
                number: "10.3",
                title: "Warping and Deformation",
                paragraphs: [
                    "Bowing, twisting, and warping shall not be considered defects unless they exceed one-quarter (¼) inch within the plane of the door or window.",
                    "Action on claims related to bowing, twisting, or warping may, at Aventa’s option, be deferred for a period not to exceed twelve (12) months following installation to allow the door to acclimate to prevailing temperature and humidity conditions."
                ]
            },
            {
                number: "11",
                title: "Warranty Exclusions: Moisture, Thermal Performance, and Corrosion",
                paragraphs: []
            },
            {
                number: "11.1",
                paragraphs: ["Products installed in wall systems that do not allow for proper moisture management, including Exterior Insulation and Finish Systems (EIFS) or “synthetic stucco” without effective drainage systems, are not covered."]
            },
            {
                number: "11.2",
                title: "Allocation of Performance Risk",
                paragraphs: [
                    "Because all construction must anticipate a certain degree of water infiltration, it is essential that the wall system be designed and constructed to properly manage moisture.",
                    "Aventa shall not be responsible for claims or damages arising from anticipated or unanticipated water infiltration; deficiencies in the design, construction, or maintenance of the building; or the use of Aventa products in barrier wall systems that do not allow for proper moisture management within the wall system.",
                    "The determination of the suitability of all building components, including the use of Aventa products, as well as the design and installation of flashing, sealing, and waterproofing systems, shall be the responsibility of the purchaser or user, architect, contractor, installer, or other construction professional, and shall not be the responsibility of Aventa.",
                    "All risks related to the design and construction of the building, or the maintenance, installation, and use of Aventa products, shall be assumed by the purchaser and/or user."
                ]
            },
            {
                number: "11.3",
                paragraphs: [
                    "Aventa does not warrant the quantity or percentage of argon or any other inert gas contained within insulated glass units. It is acknowledged that inert gas within insulated glass dissipates over time.",
                    "Aventa makes no warranty with respect to the rate of inert gas dissipation or the amount of inert gas remaining in the unit at any time after manufacture. Thermal performance varies depending on product application, and Aventa does not warrant any specific level of thermal efficiency."
                ]
            },
            {
                number: "11.4",
                paragraphs: ["Condensation is not a product defect but rather the result of excessive moisture. Condensation, ice, mold, mildew, and/or fungi are not covered under this warranty."]
            },
            {
                number: "11.5",
                paragraphs: ["Failure of finishes or corrosion of special finishes, hardware, or other components due to environmental conditions is not covered."]
            },
            {
                number: "12",
                title: "Screens",
                paragraphs: ["Screens are not designed or intended as safety devices or for fall prevention."]
            },
            {
                number: "13",
                title: "Maintenance and Cleaning",
                paragraphs: [
                    "Original purchasers are responsible for the proper maintenance of the hardware system (where applicable), using specific lubricants to ensure proper operation. Under no circumstances shall water be used, as it may cause oxidation.",
                    "Products supplied by Aventa must be cleaned routinely using damp cotton cloths, with cleaning limited to a maximum of five (5) times per year. Soaps, oils, or chemical cleaning agents shall not be used for cleaning purposes."
                ]
            },
            {
                number: "14",
                title: "Additional Costs",
                paragraphs: ["The customer shall be solely responsible for all costs related to removal, reinstallation, transportation, handling, permits, licenses, and any other expenses associated with any part, component, or unit."]
            },
            {
                number: "15",
                title: "Exclusion of Liability for Indirect and Consequential Damages",
                paragraphs: [
                    "Under no circumstances shall Aventa be liable for any indirect, special, incidental, or consequential damages, including, without limitation, loss of income, loss of profits, loss of business opportunities, moral damages, or similar losses, arising out of or related to the breach of this warranty, breach of contract, negligence, strict liability, or any other legal theory under applicable Mexican law.",
                    "This exclusion of liability is made in accordance with the principles set forth in the Federal Civil Code of Mexico and other applicable laws of Mexico."
                ]
            },
            {
                number: "16",
                title: "Useful Life",
                paragraphs: ["This warranty does not constitute a representation or guarantee regarding the useful life of Aventa products. It is strictly limited to the provisions for repair, replacement, or refund as expressly set forth in this warranty."]
            },
            {
                number: "17",
                title: "No Waiver",
                paragraphs: [
                    "Aventa may, at its sole discretion, provide additional benefits beyond those covered by this warranty. Any such extension must be made in writing and shall apply solely to the specific instance in which it is granted.",
                    "Such action shall not be deemed a waiver of Aventa’s right to strictly enforce the terms and conditions of this warranty in any other circumstance."
                ]
            },
            {
                number: "18",
                title: "No Modifications",
                paragraphs: [
                    "By purchasing, installing, or using any product covered by this warranty, you acknowledge and agree that you are not relying on any statement, whether written or oral, made by any person that contradicts or adds to the terms of this warranty.",
                    "Any modification to the terms of this warranty shall be valid only if set forth in a written agreement executed by the customer and a duly authorized representative of Aventa."
                ]
            },
            {
                number: "19",
                title: "Hardware",
                paragraphs: ["The hardware is warranted for functional performance for a period of three (3) years, subject to verifiable proper maintenance. Shipping and installation costs are expressly excluded from coverage."]
            },
            {
                number: "20",
                title: "Glass",
                paragraphs: [
                    "Tempered, laminated, and insulated glass units (Duo-Vent) installed by Aventa personnel comply with the warranty standards established under Mexican Official Standard NOM-146-SCFI-2016, published on February 3, 2017, in the Official Gazette of the Federation.",
                    "Insulated glass units are warranted for a period of three (3) years from the date of installation in the applicable sash or frame, provided that they have not been exposed to external factors or violent events that result in damage."
                ]
            },
            {
                number: "21",
                title: "Glass Claims",
                paragraphs: [
                    "Glass units containing five percent (5%) or fewer defects shall be deemed acceptable and shall not be considered imperfections. Such defects are unrelated to Aventa’s manufacturing process and originate from third-party suppliers.",
                    "Aventa shall process claims with the supplier solely for those defects or details reported that meet the established criteria, excluding the following:"
                ]
            },
            {
                number: "21.1",
                paragraphs: ["Minor imperfections in the glass that do not affect the structural integrity of the Product or do not materially obstruct visibility."]
            },
            {
                number: "21.2",
                paragraphs: ["Minor variations in glass color."]
            },
            {
                number: "21.3",
                paragraphs: ["Application of window films after the sale."]
            },
            {
                number: "21.4",
                paragraphs: ["Acts of nature, vandalism, and/or forced entry."]
            },
            {
                number: "22",
                title: "Inconsistent Use and Territorial Scope",
                paragraphs: [
                    "Aventa shall not be responsible for any loss or damage resulting from the use of its wood products in a manner inconsistent with the instructions or information set forth in this warranty.",
                    "By purchasing, installing, or using Aventa products, the customer acknowledges that this warranty forms part of the terms of sale.",
                    "This warranty applies solely to Aventa products purchased on or after January 1, 2026, and installed within the United Mexican States."
                ]
            }
        ]
    }
};

const content = computed(() => policyContent[currentLang.value]);
</script>

<template>
    <main-layout>
        <div class="bg-[#f5f2ec] min-h-screen py-16">
            <div class="max-w-5xl mx-auto px-4">
                <header class="mb-10 text-center">
                    <p class="uppercase tracking-[0.16em] text-[11px] text-neutral-500 mb-2">
                        {{ content.badge }}
                    </p>

                    <h1 class="text-3xl md:text-4xl font-semibold text-neutral-900 mb-3 font-serif">
                        {{ content.title }}
                    </h1>

                    <p class="text-sm text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                        {{ content.subtitle }}
                    </p>

                    <div class="mt-4 flex flex-wrap justify-center gap-2 text-[11px] text-neutral-500">
                        <span class="bg-white border border-neutral-200 rounded-full px-3 py-1">
                            {{ content.code }}
                        </span>
                        <span class="bg-white border border-neutral-200 rounded-full px-3 py-1">
                            {{ content.revision }}
                        </span>
                    </div>

                    <div class="mt-6 inline-flex bg-white border border-neutral-200 rounded-full p-1 shadow-sm">
                        <button
                            type="button"
                            class="px-4 py-2 text-xs rounded-full transition"
                            :class="currentLang === 'es'
                                ? 'bg-neutral-900 text-white'
                                : 'text-neutral-600 hover:bg-neutral-100'"
                            @click="setLenguaje('es')"
                        >
                            Español
                        </button>

                        <button
                            type="button"
                            class="px-4 py-2 text-xs rounded-full transition"
                            :class="currentLang === 'en'
                                ? 'bg-neutral-900 text-white'
                                : 'text-neutral-600 hover:bg-neutral-100'"
                            @click="setLenguaje('en')"
                        >
                            English
                        </button>
                    </div>
                </header>

                <section
                    class="bg-white rounded-3xl shadow-[0_18px_40px_rgba(15,23,42,0.12)] border border-neutral-200 px-6 py-8 md:px-10 md:py-10 text-sm leading-relaxed text-neutral-800 space-y-5"
                >
                    <article
                        v-for="item in content.items"
                        :key="item.number"
                        class="grid gap-3 md:grid-cols-[64px_1fr] border-b border-neutral-200 last:border-b-0 pb-5 last:pb-0"
                    >
                        <div class="flex md:block">
                            <span class="inline-flex min-w-10 h-8 px-3 rounded-full bg-neutral-900 text-white text-xs items-center justify-center font-medium">
                                {{ item.number }}
                            </span>
                        </div>

                        <div>
                            <h2
                                v-if="item.title"
                                class="font-semibold text-base text-neutral-950 mb-2 font-serif"
                            >
                                {{ item.title }}
                            </h2>

                            <div class="space-y-2">
                                <p
                                    v-for="(paragraph, index) in item.paragraphs"
                                    :key="index"
                                    class="text-justify"
                                >
                                    {{ paragraph }}
                                </p>
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        </div>
    </main-layout>
</template>
