<script setup lang="ts">
import MainLayout from "@/src/layouts/MainLayout.vue";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

type Lang = "es" | "en";

type LegalRecord = {
    kind: "section" | "item" | "paragraph";
    text: string;
    number?: string;
};

type LegalContent = {
    badge: string;
    title: string;
    subtitle: string;
    code: string;
    revision: string;
    applicable: string;
    languageNote: string;
    records: LegalRecord[];
};

const { locale } = useI18n();

const savedLang = localStorage.getItem("lang");

const currentLang = ref<Lang>(
    savedLang === "en" || savedLang === "es"
        ? savedLang
        : locale.value === "en"
            ? "en"
            : "es"
);

function setLenguaje(lang: Lang) {
    localStorage.setItem("lang", lang);
    location.reload();
}

const legalContent = {
    "es": {
        "badge": "Aventa Windows",
        "title": "Condiciones Generales de Venta de AVENTA WINDOWS",
        "subtitle": "Consulta las condiciones aplicables a cotizaciones, pedidos, entregas, instalación, pagos, garantías, cancelaciones y demás términos comerciales de AVENTA WINDOWS.",
        "code": "AW-TC-GV-02",
        "revision": "Rev. 1",
        "applicable": "Aplicables a partir de mayo de 2026",
        "records": [
            {
                "kind": "section",
                "text": "I. Condiciones Generales"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "Para nuestras entregas y prestaciones en relaciones comerciales con empresarios/comerciantes (Art. 1792, 1793, 1796, 1797, 1832, 2606 y 2615 del CCF (Código Civil Federal México)) (en adelante, el “Cliente/Contratante”), serán aplicables exclusivamente las siguientes condiciones de venta (en adelante, las “Condiciones”) en su versión vigente al momento de la entrega o prestación del servicio. Cualesquiera condiciones comerciales divergentes, en particular condiciones de compra del cliente, solo tendrán validez si han sido expresamente aceptadas por escrito o en formato de texto. Esto también aplicará en caso de que realicemos la entrega sin reservas después de que el contratante haya objetado la aplicación de nuestras Condiciones."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "Al realizar un pedido, el contratante acepta que nuestras condiciones comerciales serán aplicables a toda la relación comercial con él, incluyendo futuras operaciones o transacciones."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "Todos los acuerdos y declaraciones con efectos legales realizados por las partes contratantes y sus representantes o auxiliares deberán constar por escrito para ser válidos, siempre que se refieran a la celebración del contrato, considerándose también cumplido este requisito mediante formato de texto. Esto no aplicará a acuerdos posteriores que modifiquen el contrato."
            },
            {
                "kind": "item",
                "number": "4",
                "text": "Las presentes disposiciones serán aplicables a partir de mayo de 2026 y sustituyen todas las condiciones generales de negocio y suministro emitidas anteriormente por AVENTA."
            },
            {
                "kind": "item",
                "number": "5",
                "text": "Las autorizaciones oficiales o cualquier otro tipo de permisos deberán ser obtenidos por el cliente bajo su propio costo. En la medida en que brindemos apoyo al cliente para dichos trámites, éste también deberá cubrir los costos correspondientes a nuestra asistencia."
            },
            {
                "kind": "section",
                "text": "II. Cotización, celebración del contrato, reserva de modificaciones e instalación"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "Todas nuestras cotizaciones son sin compromiso, salvo que se acuerde expresamente lo contrario por escrito. Tendrán una vigencia máxima de 30 días naturales."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "Nos reservamos el derecho de realizar modificaciones en cantidades o tolerancias de calidad habituales en el comercio, siempre que dichas modificaciones no alteren el precio y/o las características esenciales de la prestación o el plazo de entrega, y que tales cambios o desviaciones sean razonablemente aceptables para el contratante."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "Las ilustraciones, especificaciones de peso y dimensiones, datos técnicos y demás información relacionada con nuestros productos, independientemente del formato o medio en que se presenten, deberán considerarse únicamente como valores aproximados habituales en la industria, salvo que hayan sido expresamente declarados como vinculantes en nuestra confirmación de pedido. Cada parte contratante conservará todos los derechos sobre planos y documentación técnica entregados a la otra parte. La parte receptora reconoce dichos derechos y se obliga a no poner planos o documentos a disposición de terceros ni utilizarlos para fines distintos de aquellos para los cuales fueron entregados, sin el consentimiento previo y por escrito de la otra parte contratante."
            },
            {
                "kind": "item",
                "number": "4",
                "text": "Los folletos y catálogos publicitarios no serán vinculantes salvo pacto en contrario. La información contenida en documentación técnica solo será obligatoria en la medida en que haya sido expresamente garantizada."
            },
            {
                "kind": "item",
                "number": "5",
                "text": "En pedidos de productos cuyas características de diseño o composición hayan sido especificadas por el cliente, éste asumirá la responsabilidad de que dicho diseño o composición no infrinja derechos de propiedad intelectual o industrial de terceros. En caso de reclamación por parte de terceros, el cliente mantendrá indemne al proveedor frente a cualquier responsabilidad."
            },
            {
                "kind": "item",
                "number": "6",
                "text": "Para la aceptación del pedido, el alcance de la prestación y la fecha de entrega, será exclusivamente determinante la firma por parte del cliente del pedido de venta y sus dibujos técnicos emitidos por escrito o en formato de texto. La entrega queda sujeta a nuestro correcto y oportuno abastecimiento por parte de nuestros propios proveedores."
            },
            {
                "kind": "item",
                "number": "7",
                "text": "Las objeciones a los pedidos deberán ser recibidas por nosotros de inmediato y, a más tardar, dentro de los 5 días hábiles siguientes a la fecha de emisión, por escrito o en formato de texto mediante correo electrónico."
            },
            {
                "kind": "item",
                "number": "8",
                "text": "Salvo que se acuerde expresamente lo contrario por escrito, el montaje o instalación en el lugar de destino de la mercancía no estará incluido dentro del alcance del suministro."
            },
            {
                "kind": "item",
                "number": "9",
                "text": "Cuando haya un pedido de instalación el cliente deberá proporcionar un área designada para el trabajo y almacenamiento de las piezas. AVENTA no se hace responsable por daños a instalaciones ocultas cuando la instalación esté en proceso. Además, el área de instalación debe estar limpia y libre de obstáculos, y el cliente debe proporcionar el equipo necesario cuando las condiciones del lugar lo requieran."
            },
            {
                "kind": "item",
                "number": "10",
                "text": "Para garantizar el sellado adecuado de los productos, los vanos deben estar nivelados, a plomo, con esquinas a 90 grados, acabados pulidos y estructuralmente rígidos. AVENTA no garantiza una instalación adecuada en materiales porosos como cantera o yeso. El cliente debe de garantizar que los vanos a donde se anclarán los productos de AVENTA deben de contar con la rigidez y/o refuerzos necesarios para su correcta instalación, en caso de que el cliente no lo tenga dichas especificaciones los productos no podrán ser instalados, salvo a su aprobación por escrito y deslindando a AVENTA de cualquier responsabilidad del correcto funcionamiento y/o percance que se pudiera llegar a suscitar."
            },
            {
                "kind": "section",
                "text": "III. Precios; facturación; impuesto al valor agregado (IVA)"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "Nuestros precios de los productos son precios netos expresados en moneda nacional (MXN) y se entienden excluyendo instalación, transporte, seguro y aranceles, además del impuesto al valor agregado (IVA) legalmente aplicable vigente al día de la entrega o prestación del servicio."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "En caso de que las circunstancias que sirvan de base para la formación del precio, en particular las paridades cambiarias o los impuestos, contribuciones, tarifas, derechos aduaneros u otras cargas gubernamentales/oficiales, cambien entre la fecha de la cotización y la fecha de entrega acordada, AVENTA tendrá derecho a ajustar sus precios y condiciones conforme a las nuevas circunstancias."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "Por regla general, todas nuestras facturas serán enviadas en formato electrónico válido (CFDI) Comprobante Fiscal Digital por Internet y cumple con los requisitos establecidos por el Servicio de Administración Tributaria (SAT) en el artículo 29-A del Código Fiscal de la Federación y el estándar CFDI 4.0. El cliente está obligado a proporcionar la información necesaria para poder emitir las facturas correspondientes. A solicitud nuestra, el contratante deberá proporcionar una dirección de correo electrónico a la cual se enviarán las facturas electrónicas destinadas a él. Informamos al contratante que el archivo y conservación de una factura electrónica deberá realizarse en el mismo formato electrónico en que fue emitida y recibida."
            },
            {
                "kind": "item",
                "number": "4",
                "text": "Comprobante de exportación: Cuando un contratante con domicilio comercial fuera del país en el que se encuentra AVENTA (“cliente extranjero”) recoja por sí mismo o mediante empresas de transporte contratadas mercancía en nuestras instalaciones y la transporte o envíe al extranjero, dicho contratante deberá proporcionar el comprobante de exportación requerido para efectos fiscales. Si dicho comprobante no es entregado incluso dentro del plazo adicional otorgado por nosotros para tal efecto, tendremos derecho a reclamar posteriormente al contratante el impuesto al valor agregado (IVA) correspondiente a la entrega."
            },
            {
                "kind": "item",
                "number": "5",
                "text": "Las solicitudes especiales del cliente (por ejemplo, entrega en una dirección distinta a la del cliente, métodos de envío acelerados o embalajes especiales) serán atendidas en la medida de lo posible. Los costos adicionales que se generen por dichas solicitudes correrán por cuenta del cliente."
            },
            {
                "kind": "section",
                "text": "IV. Plazos de entrega"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "Los plazos de entrega comenzarán a partir de la firma del pedido de venta y los dibujos de los productos, pero no antes de que se hayan aclarado completamente todos los detalles del pedido y de que se hayan entregado los documentos, permisos y autorizaciones que deban ser proporcionados por el contratante, así como tampoco antes de la recepción del anticipo acordado o de la apertura de una carta de crédito. El tiempo máximo de instalación será de 12 semanas a partir de que se hayan cumplido las condiciones anteriores. AVENTA notificará por escrito al cliente el plazo de fabricación de las piezas una vez aprobados los planos, dimensiones, colores, aperturas, tipos de vidrio y demás especificaciones finales, así como recibido el anticipo correspondiente en su totalidad."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "Los plazos de entrega se prorrogarán, sin perjuicio de nuestros derechos derivados del incumplimiento del contratante, por el período durante el cual el contratante se encuentre en mora respecto de sus obligaciones derivadas de este u otros contratos celebrados con nosotros. Lo anterior aplicará igualmente a las fechas de entrega."
            },
            {
                "kind": "section",
                "text": "V. Entrega y prestación de servicios"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "Salvo pacto en contrario, las entregas se realizarán EXW (Incoterms® 2020) desde las instalaciones de nuestra planta en San Miguel de Allende, Guanajuato. El flete, maniobras y seguro de la mercancía correrán por cuenta del cliente. Nos reservamos el derecho de elegir el método de envío, salvo acuerdo distinto entre las partes. Los pedidos pequeños y las entregas de refacciones se enviarán únicamente contra pago anticipado o contra reembolso y sin otorgamiento de nuestros descuentos."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "En caso de acordarse una entrega “libre en obra” o “libre en almacén”, ello significará únicamente la entrega sin descarga, bajo el supuesto de que exista una vía de acceso transitable para vehículos pesados. Si el vehículo de entrega abandona la vía de acceso transitable por instrucciones del contratante, éste será responsable de cualquier daño que pudiera ocasionarse. La descarga deberá realizarse de manera inmediata por parte del contratante. Los tiempos de espera serán cobrados al contratante."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "Las fechas “aproximadas” indicadas por nosotros para entregas y prestaciones no serán legalmente vinculantes. Las fechas fijas deberán ser confirmadas expresamente por nosotros por escrito como tales. Un plazo de entrega se considerará cumplido si, antes de su vencimiento, el objeto de la entrega ha sido separado e identificado para el contratante en caso de entrega para recolección, y se le ha ofrecido verbalmente, por escrito o en formato de texto; o bien, en caso de envío, si el objeto de la entrega ha sido entregado a la empresa o persona encargada del transporte."
            },
            {
                "kind": "item",
                "number": "4",
                "text": "Las entregas y prestaciones parciales serán permitidas y podrán ser facturadas por separado por nosotros. Excepcionalmente, las entregas o prestaciones parciales no estarán permitidas cuando resulten irrazonablemente inaceptables para el contratante."
            },
            {
                "kind": "item",
                "number": "5",
                "text": "No prestamos servicios de asesoría en forma de planificación de instalaciones. Salvo acuerdo expreso en contrario, no estaremos obligados a realizar la instalación del bien vendido. El cliente deberá considerar que la instalación del bien adquirido deberá ser realizada por personal técnicamente calificado (por ejemplo, técnicos especializados o profesionales competentes en la materia)."
            },
            {
                "kind": "item",
                "number": "6",
                "text": "El cliente será responsable del cumplimiento de todas las disposiciones legales, normas y, en su caso, permisos o autorizaciones requeridas relacionados con la instalación de los productos adquiridos."
            },
            {
                "kind": "item",
                "number": "7",
                "text": "El cumplimiento de nuestras obligaciones de entrega o prestación de servicios estará condicionado al cumplimiento oportuno y adecuado de las obligaciones contractuales del contratante, en particular de sus obligaciones de colaboración, autorización y, en su caso, pago."
            },
            {
                "kind": "item",
                "number": "8",
                "text": "Si el contratante incurre en mora de aceptación conforme a las disposiciones legales aplicables, éste asumirá los costos adicionales que se generen por tal motivo. A partir del momento en que se notifique la disponibilidad de la mercancía para su recolección, el contratante asumirá el riesgo de pérdida accidental o deterioro accidental de la misma, siempre que se trate de una obligación de recolección. En caso de envío, el riesgo se transferirá al contratante en el momento en que la mercancía sea entregada a la empresa o persona encargada del transporte. El riesgo también se transferirá cuando se actualicen las condiciones de mora en la aceptación. La mercancía notificada como lista para recolección conforme al contrato deberá ser retirada de inmediato; de lo contrario, y previa concesión de un plazo adicional mediante requerimiento, estaremos facultados para, a nuestra elección, entregar la mercancía por cuenta y riesgo del cliente o almacenarla a nuestra discreción y facturarla de manera inmediata."
            },
            {
                "kind": "item",
                "number": "9",
                "text": "Cargo por almacenamiento: Si la mora en la aceptación por parte del contratante ocasiona un retraso en la entrega, el contratante deberá reembolsarnos, durante el período de retraso, los costos de almacenamiento efectivamente generados y comprobados o, de manera alternativa, una cantidad equivalente a las tarifas de almacenamiento habitualmente cobradas por una empresa de transporte o logística. Asimismo, tendremos derecho a almacenar efectivamente la mercancía con una empresa de transporte o almacenamiento de nuestra elección y cobrar al contratante los costos derivados de dicho almacenamiento. El contratante conservará el derecho de demostrar que el daño ocasionado fue menor o que no existió daño alguno."
            },
            {
                "kind": "item",
                "number": "10",
                "text": "El contratante deberá cumplir, durante el transporte de las mercancías recogidas en nuestras instalaciones, no solo con las disposiciones legales aplicables en materia de aseguramiento de carga, sino también con las reglas técnicas reconocidas y con los procedimientos e instrucciones de AVENTA relativos al aseguramiento de carga en el transporte terrestre. El contratante deberá imponer igualmente las obligaciones anteriores a cualquier empresa de transporte o logística que haya contratado."
            },
            {
                "kind": "item",
                "number": "11",
                "text": "La mercancía notificada como lista para envío deberá ser retirada o recogida de inmediato y, a más tardar, dentro de los 5 días hábiles siguientes. En caso contrario, y previa notificación de requerimiento, estaremos facultados para, a nuestra elección, enviar la mercancía por cuenta y riesgo del contratante o almacenarla a nuestra discreción y facturarla de manera inmediata."
            },
            {
                "kind": "item",
                "number": "12",
                "text": "Una vez completada la producción, la entrega e instalación deberán programarse dentro de los 5 días hábiles siguientes a la factura de término de fabricación; de lo contrario, podrán generarse costos de almacenamiento. Para poder programar la entrega e instalación deberá estar liquidado el 100% del pedido de las piezas."
            },
            {
                "kind": "item",
                "number": "13",
                "text": "El cliente deberá proporcionar permisos, licencias, áreas de trabajo, almacenamiento y condiciones adecuadas para la correcta instalación de los productos."
            },
            {
                "kind": "item",
                "number": "14",
                "text": "La instalación deberá realizarse preferentemente como proceso final del proyecto de construcción o remodelación del cliente. Si el cliente solicita una instalación anticipada, asumirá cualquier riesgo o daño posterior a la instalación. AVENTA no será responsable por daños a piezas suministradas o instaladas después de la recepción o entrega. Las reparaciones serán cotizadas por separado."
            },
            {
                "kind": "item",
                "number": "15",
                "text": "El retiro de productos existentes solo se realizará si fue expresamente cotizado. AVENTA no será responsable por daños, limpieza o reparaciones derivadas de la desinstalación. El cliente deberá dejar los vanos en las condiciones óptimas para la instalación de las piezas."
            },
            {
                "kind": "item",
                "number": "16",
                "text": "Salvo que se exprese lo contrario en el pedido de venta el costo de instalación no incluye maquinaria especializada. En caso de requerirse ésta se cotizará por separado una vez analizada la maniobra de instalación “in situ” por el personal técnico de AVENTA."
            },
            {
                "kind": "section",
                "text": "VI. Fuerza mayor"
            },
            {
                "kind": "paragraph",
                "text": "No seremos responsables por retrasos en entregas o prestaciones de servicios derivados de causas de fuerza mayor. Para efectos de esta disposición, se entenderá por fuerza mayor, entre otros, acontecimientos inevitables tales como desastres naturales de cualquier tipo, incluyendo terremotos, inundaciones, tormentas, erupciones volcánicas, pandemias, disturbios, bloqueos, boicots, incendios, guerras civiles, embargos, toma de rehenes, guerras, revoluciones, sabotajes, huelgas, terrorismo, accidentes de tránsito o interrupciones inevitables en la producción. En tales casos, estaremos obligados a informar de inmediato al contratante sobre la interrupción en la entrega o prestación y su duración estimada. Los plazos y fechas acordados se prorrogarán por el tiempo que dure dicha circunstancia, con un máximo de 3 meses. Estos acontecimientos imprevisibles también nos otorgarán el derecho de solicitar la rescisión total o parcial del contrato."
            },
            {
                "kind": "section",
                "text": "VII. Solicitud de cambios sobre Pedidos en fabricación"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "El cliente podrá solicitar cambios sobre pedidos en fabricación sin costo alguno cuando estos se soliciten en un lapso máximo de 5 días hábiles desde la firma del Pedido de Venta y dibujos técnicos."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "Si el contratante no realiza la solicitud dentro de un plazo adicional razonable otorgado por nosotros, tendremos derecho, a nuestra elección, a entregar la mercancía sin necesidad de requerimiento al precio vigente en la fecha de entrega, reclamar daños y perjuicios por incumplimiento o rescindir la parte del contrato que aún no haya sido cumplida."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "Las modificaciones posteriores a dibujos autorizados podrán generar re-cotización completa, diferencias de precio y ajustes en el tiempo de entrega."
            },
            {
                "kind": "section",
                "text": "VIII. Embalaje"
            },
            {
                "kind": "paragraph",
                "text": "El material de embalaje será cobrado al costo y no será devuelto ni recuperado. El contratante estará obligado a desechar el material de embalaje por su cuenta y costo, cumpliendo con las disposiciones legales aplicables."
            },
            {
                "kind": "section",
                "text": "IX. Condiciones de pago"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "Como regla general, la fecha de vencimiento aplicable será el plazo de pago indicado en nuestra factura. En este sentido, nos reservamos el derecho de determinar la prestación correspondiente. En caso de excederse dicho plazo de pago, el contratante incurrirá automáticamente en mora, sin necesidad de requerimiento adicional, siempre que el deudor sea responsable del incumplimiento de pago. En caso de mora, tendremos derecho a reclamar los intereses moratorios legales aplicables a operaciones comerciales. Lo anterior será sin perjuicio de cualquier otro derecho o reclamación derivada del retraso en el pago. AVENTA podrá otorgar al cliente un plazo adicional de 7 días naturales al vencimiento de la obligación de pago y, una vez transcurrido dicho plazo sin cumplimiento, podrá, dentro de los 5 días hábiles siguientes, declarar por escrito la rescisión del contrato y reclamar daños y perjuicios, o bien continuar exigiendo el pago del precio de compra. Al cliente se le cobrarán 500 MXN (pesos mexicanos) por gastos administrativos a partir del primer requerimiento de pago. Podrán generarse cargos adicionales"
            },
            {
                "kind": "item",
                "number": "2",
                "text": "No obstante, lo dispuesto en la cláusula 1, excepcionalmente los pagos deberán realizarse en la fecha de vencimiento específicamente acordada o, en su defecto, dentro de los 5 días hábiles bancarios siguientes a la fecha de la factura y a la recepción de la misma, sin deducción alguna, a la cuenta indicada y en la moneda vigente en el domicilio de la planta participante en el contrato, siempre que la factura no indique una fecha de vencimiento conforme a la cláusula 1. Para el inicio del cómputo del plazo será determinante el acontecimiento que ocurra en fecha posterior."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "Si después de la celebración del contrato llegaran a nuestro conocimiento circunstancias objetivas que pudieran disminuir la solvencia o capacidad crediticia del contratante, tendremos derecho a suspender la prestación correspondiente y a otorgar al contratante un plazo razonable dentro del cual deberá efectuar el pago simultáneamente con la entrega o proporcionar una garantía suficiente. En caso de negativa por parte del contratante o de transcurso infructuoso del plazo otorgado, podremos solicitar la rescisión del contrato y reclamar daños y perjuicios por incumplimiento."
            },
            {
                "kind": "item",
                "number": "4",
                "text": "El contratante no tendrá derecho a retener el pago del precio de compra con base en posibles contrademandas o reclamaciones que no deriven de la presente relación contractual. El derecho de compensación únicamente procederá respecto de créditos no controvertidos, exigibles o reconocidos mediante resolución firme. Asimismo, existirá derecho de compensación cuando el crédito utilizado para compensar derive de una causa que otorgue o hubiera otorgado al contratante el derecho a rechazar total o parcialmente la prestación correspondiente."
            },
            {
                "kind": "item",
                "number": "5",
                "text": "El pago se realizará en parcialidades de la forma siguiente: a) Fabricación de piezas: 60% a la firma del pedido de venta, 30% como avance semanal o quincenal por pieza y 10% al finalizar la producción, previo al envío de las piezas al lugar de la instalación. b) Instalaciones: 60% para la programación del envío e instalación, 30% de avance de la instalación de cada pieza y 10% tras visto bueno final del cliente por cada pieza instalada y entregada. Los medios de pago aceptados son: transferencia bancaria (SPEI), tarjeta de crédito o débito, efectivo y cheque. Los datos bancarios de AVENTA para que se realicen los pagos serán los siguientes: Razón Social: AVENTA WINDOWS S.A.P.I. DE C.V. Banco: INBURSA Cuenta: 50072703436 CLABE: 036240500727034366 Swift: INBUMXMM RFC: AWI220812K77"
            },
            {
                "kind": "item",
                "number": "6",
                "text": "Se requiere el pago completo del primer anticipo para iniciar actividades relacionadas con el proyecto, incluyendo fabricación, adquisición de materiales y elaboración de dibujos."
            },
            {
                "kind": "item",
                "number": "7",
                "text": "En caso de falta de pago de estimaciones de avance de obra dentro de los 5 días hábiles posteriores a la factura, AVENTA podrá suspender unilateralmente la fabricación y reprogramar la fecha de entrega sin responsabilidad por retrasos."
            },
            {
                "kind": "item",
                "number": "8",
                "text": "Los avances de obra se realizarán con corte quincenal con mes calendario, es decir los días 15 y último de cada mes, salvo que se indique lo contrario en el pedido de venta firmado por las partes."
            },
            {
                "kind": "section",
                "text": "X. Reserva de dominio"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "Toda mercancía entregada (mercancía sujeta a reserva de dominio) permanecerá de nuestra propiedad hasta el pago total de todos los créditos derivados de la relación comercial, incluyendo futuros créditos, independientemente de su fundamento jurídico, aun cuando se hayan realizado pagos correspondientes a créditos específicamente identificados. En caso de cuenta corriente comercial, la reserva de dominio servirá como garantía del saldo adeudado a nuestro favor. La reserva de dominio también aplicará en caso de reventa y/o transformación posterior de la mercancía sujeta a reserva. En este último caso, la transformación se considerará realizada para nosotros en calidad de fabricante."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "El contratante únicamente podrá revender la mercancía sujeta a reserva de dominio dentro del curso ordinario de sus operaciones comerciales, siempre que no se encuentre en mora y bajo la condición de que sus clientes no puedan compensar créditos derivados de la reventa con contrademandas propias. El contratante no estará facultado para realizar otras disposiciones sobre la mercancía sujeta a reserva de dominio, en particular transferencias en garantía o constitución de prendas."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "Los créditos derivados de la reventa de la mercancía sujeta a reserva de dominio quedan desde este momento cedidos a nuestro favor, en garantía, hasta el pago total de nuestros créditos (cláusula 1). Desde ahora aceptamos dicha cesión en garantía. Si el contratante ya hubiera realizado disposiciones anticipadas sobre futuros créditos derivados de la venta de sus mercancías que pudieran entrar en conflicto con la cesión en garantía a nuestro favor (por ejemplo, cesiones anticipadas en el marco de un contrato de factoraje), entonces, en lugar de los créditos derivados de la reventa de nuestra mercancía sujeta a reserva de dominio, se considerará cedido en garantía a nuestro favor el derecho del contratante a recibir la contraprestación del beneficiario de dicha disposición anticipada (por ejemplo, la entidad de factoraje). El contratante deberá informarnos de inmediato si ha realizado disposiciones anticipadas respecto de créditos futuros generados en el curso de su actividad comercial, o si existen o pudieran surgir obligaciones contractuales u otras circunstancias que pudieran afectar nuestros derechos de garantía."
            },
            {
                "kind": "item",
                "number": "4",
                "text": "El contratante estará facultado para cobrar los créditos derivados de la reventa hasta que revoquemos dicha autorización en cualquier momento permitido por la ley. Los ingresos obtenidos por la reventa de nuestra mercancía sujeta a reserva de dominio, o los bienes o derechos que los sustituyan (por ejemplo, en operaciones de factoraje), pasarán a ser de nuestra propiedad de manera inmediata hasta por el monto correspondiente a nuestra participación en la factura respectiva. Nuestra facultad de cobrar directamente los créditos cedidos a nuestro favor en caso de incumplimiento de nuestras condiciones de pago permanecerá intacta. A nuestra solicitud, el contratante estará obligado a notificar a sus deudores sobre la cesión realizada a nuestro favor y a proporcionarnos toda la información necesaria para hacer valer dichos créditos. En caso de medidas de ejecución forzosa por parte de terceros que afecten nuestros derechos de garantía, el contratante deberá señalar la existencia de nuestros derechos e informarnos de inmediato."
            },
            {
                "kind": "item",
                "number": "5",
                "text": "En caso de mora en el pago por parte del contratante, estaremos facultados, previa concesión de un plazo adicional razonable, para exigir la devolución de la mercancía sujeta a reserva de dominio por cuenta del contratante, aun sin rescindir el contrato."
            },
            {
                "kind": "item",
                "number": "6",
                "text": "El derecho del contratante a revender la mercancía y a cobrar los créditos derivados de dicha reventa terminará automáticamente, sin necesidad de otorgar un plazo adicional, cuando se actualicen las condiciones bajo las cuales el contratante pudiera solicitar la apertura de un procedimiento de insolvencia. Lo mismo aplicará en caso de vencimiento infructuoso del plazo otorgado por nosotros para que el contratante realizara pagos anticipados o proporcionara garantías debido al deterioro de su solvencia (véase cláusula V.4.). Una vez extinguido el derecho de reventa del contratante, podremos exigir la devolución de la mercancía sujeta a reserva de dominio por cuenta y costo del contratante. En todo caso, el contratante deberá reembolsarnos los costos adicionales de transporte, envío y demás gastos relacionados, así como cualquier disminución en el valor de la mercancía."
            },
            {
                "kind": "item",
                "number": "7",
                "text": "La transformación o procesamiento de la mercancía sujeta a reserva de dominio se realizará para nosotros en calidad de fabricante, sin que ello implique obligación alguna de nuestra parte. Si la mercancía sujeta a reserva de dominio se mezcla, une o procesa con otros bienes que no sean de nuestra propiedad, adquiriremos la copropiedad sobre el nuevo bien en proporción al valor facturado de nuestras mercancías respecto del valor facturado de los demás bienes utilizados. Las mercancías transformadas, así como nuestras participaciones de copropiedad sobre las mismas, se considerarán mercancía sujeta a reserva de dominio para efectos de las disposiciones anteriores."
            },
            {
                "kind": "item",
                "number": "8",
                "text": "Si el valor de las garantías existentes a nuestro favor excede nuestras reclamaciones en más de un 10% de manera no meramente temporal, liberaremos, a solicitud del contratante, garantías por el monto correspondiente, a nuestra elección. Lo anterior también aplicará cuando el valor estimado de las garantías exceda el 150% del crédito garantizado."
            },
            {
                "kind": "item",
                "number": "9",
                "text": "En operaciones comerciales transfronterizas, el contratante deberá adoptar todas las medidas obligatorias en su país de origen para proteger nuestra reserva de dominio. En caso de que en el país de origen del contratante no sea reconocida una regulación de reserva de dominio comparable a la permitida conforme a la legislación aplicable en el domicilio de nuestra planta proveedora participante en el contrato (especialmente cuando no exista la figura de reserva de dominio ampliada o extendida), podremos exigir en cualquier momento al contratante una fianza bancaria, garantía bancaria u otra garantía adecuada y suficiente por un monto equivalente al valor correspondiente de nuestras entregas de mercancía."
            },
            {
                "kind": "item",
                "number": "10",
                "text": "La mercancía e instalación adicional suministrada por nosotros, al ser unida a un inmueble o incorporada a un edificio, dicha unión o incorporación se considerará realizada únicamente con carácter temporal y con la intención de separarla nuevamente en caso de que hagamos valer nuestra reserva de dominio. Si el edificio no pertenece al contratante, éste deberá aclarar al propietario que la unión o incorporación de las mercancías suministradas por nosotros tiene únicamente un carácter temporal."
            },
            {
                "kind": "item",
                "number": "11",
                "text": "Nuestra mercancía sujeta a reserva de dominio, al ser incorporada a un inmueble o edificio, el contratante cede desde este momento a nuestro favor el derecho de cobro que le corresponda frente al tercero, hasta por el monto del valor facturado de nuestra mercancía, incluyendo el derecho a la constitución de una hipoteca en garantía."
            },
            {
                "kind": "section",
                "text": "XI. Responsabilidad del vendedor por incumplimientos contractuales (responsabilidad por defectos)"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "No seremos responsables por incumplimientos contractuales derivados de un uso inadecuado o incorrecto, montaje o puesta en marcha defectuosa realizada por el contratante o terceros, desgaste normal, manejo incorrecto o negligente, ni por las consecuencias de modificaciones o reparaciones efectuadas de manera inapropiada y sin nuestro consentimiento por el contratante o terceros."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "Antes de ejercer cualquier acción o recurso legal, el contratante deberá otorgarnos un plazo razonable para el cumplimiento de nuestras obligaciones contractuales y brindarnos la oportunidad de verificar adecuadamente las reclamaciones presentadas en nuestra contra. Lo anterior no aplicará en los casos en que el cumplimiento posterior resulte imposible, tengamos derecho legítimo a rechazar dicho cumplimiento o éste haya fracasado."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "El contratante tendrá la obligación de inspeccionar la mercancía de inmediato en el momento de la entrega físicamente en el lugar de la instalación en el lugar convenido por las partes y, deberá firmar el formato de entrega de AVENTA en el momento en que la pieza quede instalada. Si dentro de los 5 días hábiles siguientes el cliente no ha firmado el documento de entrega de AVENTA y no hay ninguna reclamación al respecto, AVENTA se reserva el derecho de facturar el monto restante de la instalación y exigir el pago correspondiente de acuerdo al vencimiento indicado en la factura emitida. Los defectos aparentes deberán ser notificados por escrito dentro de un plazo razonable y, en cualquier caso, a más tardar dentro de los 5 días hábiles siguientes a la recepción de la mercancía en el lugar de destino. Los defectos ocultos deberán notificarse por escrito dentro de un plazo razonable y, como máximo, dentro de los 5 días hábiles posteriores a su descubrimiento al área de Atención a Clientes de AVENTA por correo electrónico: andrea@aventawindows.com En dicha notificación deberá describirse con precisión la naturaleza del defecto. La etiqueta de identificación incluidos con el envío deberán adjuntarse a la reclamación. Cualquier otro defecto material deberá ser reclamado por el cliente por escrito inmediatamente después de su descubrimiento. Será determinante la fecha de recepción de la reclamación por nuestra parte. Si una reclamación por defectos resulta improcedente, tendremos derecho a exigir al cliente el reembolso de los gastos incurridos, salvo que el cliente demuestre que no tuvo culpa respecto de la reclamación injustificada. En caso de no presentarse la reclamación dentro de los plazos establecidos, quedarán excluidos los derechos derivados de defectos materiales."
            },
            {
                "kind": "item",
                "number": "4",
                "text": "En caso de una reclamación por defectos justificada y presentada oportunamente, procederemos, a nuestra elección, a reparar la mercancía reclamada o a suministrar un reemplazo libre de defectos, siempre que el cumplimiento posterior no sea imposible o implique costos desproporcionados."
            },
            {
                "kind": "item",
                "number": "5",
                "text": "Si el contratante adquiere un derecho a reclamar daños y perjuicios debido a defectos en el bien vendido, responderemos conforme a la “Política de Garantías” durante los 3 primeros años. Esta política de garantía se encuentra en la página web de AVENTA en el link: https://www.aventawindows.com/politica-de-garantia."
            },
            {
                "kind": "item",
                "number": "6",
                "text": "Para las piezas suministradas e instaladas en reemplazo, así como para las reparaciones realizadas, el plazo de garantía será de 1 años a partir de la entrega o instalación."
            },
            {
                "kind": "item",
                "number": "7",
                "text": "No obstante, los plazos de prescripción anteriormente señalados y cualquier limitación de los derechos por defectos prevista en la cláusula 6, las reclamaciones por defectos relativas a nuestras mercancías o partes de las mismas que, conforme a su uso habitual, hayan sido incorporadas a una construcción y hayan causado defectos en ésta, prescribirán en un plazo de 3 años. En dichos casos, serán aplicables sin limitación las disposiciones legales relativas a responsabilidad por defectos materiales. En todos los demás casos continuarán aplicando las disposiciones establecidas en la sección VII de las Condiciones Generales de Venta."
            },
            {
                "kind": "item",
                "number": "8",
                "text": "El inicio del plazo de prescripción se determinará conforme a las disposiciones legales aplicables y comenzará con la entrega realizada por nosotros."
            },
            {
                "kind": "item",
                "number": "9",
                "text": "Las variaciones naturales de tono y veta en la madera no se considerarán defectos. La madera puede presentar contracción o expansión derivada de condiciones ambientales sin afectar la funcionalidad de las piezas"
            },
            {
                "kind": "section",
                "text": "XII. Devolución de mercancías"
            },
            {
                "kind": "paragraph",
                "text": "La mercancía que haya sido correctamente pedida y entregada, o que haya sido fabricada o personalizada específicamente, no será aceptada en devolución como regla general."
            },
            {
                "kind": "section",
                "text": "XIII. Responsabilidad por productos"
            },
            {
                "kind": "paragraph",
                "text": "Responderemos por los daños derivados de defectos del producto conforme a las disposiciones legales aplicables en materia de responsabilidad por productos."
            },
            {
                "kind": "section",
                "text": "XIV. Limitación de responsabilidad"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "Salvo disposición distinta contenida en las presentes Condiciones, incluyendo las disposiciones siguientes, responderemos por el incumplimiento de obligaciones contractuales y extracontractuales conforme a las disposiciones legales aplicables."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "Seremos responsables por daños y perjuicios, cualquiera que sea su fundamento jurídico, dentro del marco de responsabilidad por culpa en casos de dolo y negligencia grave. Por daños derivados del incumplimiento de una obligación contractual esencial (“obligación cardinal”), es decir, una obligación cuyo cumplimiento hace posible la correcta ejecución del contrato y en cuya observancia el contratante confía y puede razonablemente confiar. En este caso, nuestra responsabilidad estará limitada a la indemnización de los daños previsibles y típicamente derivados del contrato."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "Las limitaciones de responsabilidad derivadas del apartado 2 también serán aplicables frente a terceros, así como en caso de incumplimientos cometidos por personas (incluyendo aquellas en cuyo beneficio actúen) cuya conducta nos sea imputable conforme a las disposiciones legales aplicables. Dichas limitaciones no aplicarán cuando un defecto haya sido ocultado dolosamente o cuando se haya otorgado una garantía sobre las características de la mercancía, ni respecto de las reclamaciones del cliente conforme a la legislación aplicable en materia de responsabilidad por productos."
            },
            {
                "kind": "item",
                "number": "4",
                "text": "Por incumplimientos de obligaciones que no consistan en defectos de la mercancía, el cliente únicamente podrá rescindir o terminar el contrato cuando dicho incumplimiento sea imputable a AVENTA. Queda excluido cualquier derecho de terminación unilateral o libre por parte del cliente. En todo lo demás, serán aplicables las disposiciones legales correspondientes, así como sus efectos jurídicos."
            },
            {
                "kind": "item",
                "number": "5",
                "text": "Las presentes exclusiones y limitaciones de responsabilidad también serán aplicables, en la misma medida, en beneficio de nuestros órganos, representantes legales, empleados, auxiliares y subcontratistas."
            },
            {
                "kind": "section",
                "text": "XV. Confidencialidad"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "El contratante se obliga a tratar como secreto comercial toda información comercial y técnica no pública que llegue a su conocimiento como consecuencia de la relación comercial con nosotros."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "Los planos, modelos, plantillas, muestras y objetos similares no podrán ser entregados ni puestos a disposición de terceros no autorizados. La reproducción de dichos objetos únicamente estará permitida dentro del marco de las necesidades operativas y conforme a las disposiciones aplicables en materia de derechos de autor."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "El contratante se obliga, en caso de no aceptar una cotización presentada por nosotros, a devolvernos de manera inmediata y completa toda la documentación de la cotización que le haya sido entregada."
            },
            {
                "kind": "section",
                "text": "XVI. Política de cancelación"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "En caso de incumplimiento del contrato de compraventa, tendremos derecho a reclamar los daños efectivamente ocasionados y comprobados o, alternativamente, a exigir, sin necesidad de comprobación adicional, una indemnización convencional equivalente al 25% del precio de compra acordado, salvo que el contratante demuestre que el daño ocasionado fue menor."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "Si el cliente cancela piezas con materiales adquiridos o producción iniciada, se aplicará una penalización del 80% del valor de la pieza. Si la pieza ya fue terminada, la penalización será del 100%."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "En caso de clausura o suspensión del proyecto por autoridades, el cliente deberá cubrir el pago total de las piezas fabricadas y/o de la instalación en curso."
            },
            {
                "kind": "section",
                "text": "XVII. Protección de datos"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "El contratante acepta que los datos personales recibidos por nosotros en el marco o en relación con nuestra relación comercial sean tratados de conformidad con el aviso de privacidad de AVENTA que se puede encontrar en la página web bajo el link: https://www.aventawindows.com/aviso-privacidad"
            },
            {
                "kind": "section",
                "text": "XVIII. Lugar de cumplimiento, legislación aplicable y jurisdicción competente"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "Salvo acuerdo expreso por escrito en contrario, el lugar de cumplimiento será en San Miguel de Allende, Guanajuato (Mexico)."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "La relación contractual se regirá exclusivamente por la legislación vigente en la jurisdicción competente correspondiente (lex fori), con exclusión de las disposiciones sobre conflicto de leyes. En operaciones comerciales transfronterizas será aplicable la Convención de las Naciones Unidas del 11 de abril de 1980 sobre los Contratos de Compraventa Internacional de Mercaderías (CISG). En la medida en que la CISG no contenga disposiciones aplicables, las relaciones jurídicas entre las partes contratantes se regirán por el ordenamiento jurídico vigente en la jurisdicción competente correspondiente, excluyendo las normas de conflicto de leyes."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "La jurisdicción competente para ambas partes contratantes será en los tribunales de Ciudad de México (México), salvo pacto expreso en contrario. No obstante lo anterior, también tendremos derecho a demandar al contratante ante la jurisdicción competente de su domicilio general."
            },
            {
                "kind": "section",
                "text": "XIX. Otras disposiciones"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "El idioma del contrato será el español, salvo pacto expreso en contrario."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "Las presentes Condiciones Generales de Venta están redactadas en español e inglés. En caso de dudas de interpretación, la versión en español será la legalmente vinculante y prevalecerá sobre la versión en inglés."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "Nos reservamos el derecho de modificar las presentes condiciones en cualquier momento."
            },
            {
                "kind": "item",
                "number": "4",
                "text": "Si alguna disposición contenida en las presentes condiciones comerciales o en cualquier otro acuerdo contractual celebrado entre las partes fuera o llegara a ser inválida o ineficaz, ello no afectará la validez de las demás disposiciones o acuerdos. En tal caso, las partes contratantes procurarán sustituir la disposición inválida por otra que produzca, en la medida de lo posible, un efecto económico equivalente."
            }
        ]
    },
    "en": {
        "badge": "Aventa Windows",
        "title": "General Terms and Conditions of Sale of AVENTA WINDOWS",
        "subtitle": "Review the terms applicable to quotations, orders, deliveries, installation, payments, warranties, cancellations, and other commercial terms of AVENTA WINDOWS.",
        "code": "AW-TC-GV-02",
        "revision": "Rev. 1",
        "applicable": "Applicable as of May 2026",
        "languageNote": "These General Conditions of Sale are drafted in both Spanish and English. In the event of any doubt regarding interpretation, the Spanish version shall be legally binding and shall prevail over the English version.",
        "records": [
            {
                "kind": "section",
                "text": "I. General Conditions"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "For our deliveries and services in commercial relationships with entrepreneurs/merchants (Articles 1792, 1793, 1796, 1797, 1832, 2606 and 2615 of the Federal Civil Code of Mexico (Código Civil Federal México)) (hereinafter, the “Client/Contracting Party”), the following terms and conditions of sale (hereinafter, the “Conditions”) shall apply exclusively in their version valid at the time of delivery or provision of the service. Any divergent commercial conditions, in particular the client’s purchasing conditions, shall only be valid if they have been expressly accepted by us in writing or in text form. This shall also apply in the event that we carry out the delivery without reservation after the contracting party has objected to the application of our Conditions."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "By placing an order, the contracting party accepts that our commercial terms and conditions shall apply to the entire business relationship with them, including future operations or transactions."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "All agreements and declarations with legal effect made by the contracting parties and their representatives or assistants must be made in writing in order to be valid, insofar as they relate to the conclusion of the contract, and this requirement shall also be deemed satisfied by text format. This shall not apply to subsequent agreements modifying the contract."
            },
            {
                "kind": "item",
                "number": "4",
                "text": "These provisions shall apply as of May 2026 and shall replace all previous general business and supply conditions previously issued by AVENTA."
            },
            {
                "kind": "item",
                "number": "5",
                "text": "Official authorizations or any other type of permits shall be obtained by the client at their own expense. To the extent that we provide support to the client for such procedures, the client shall also bear the corresponding costs of our assistance."
            },
            {
                "kind": "section",
                "text": "II. Quotation, Conclusion of the Contract, Reservation of Modifications, and Installation"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "All our quotations are non-binding unless expressly agreed otherwise in writing. They shall remain valid for a maximum period of 30 calendar days."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "We reserve the right to make modifications in quantities or quality tolerances customary in the trade, provided that such modifications do not alter the price and/or the essential characteristics of the performance or the delivery period, and that such changes or deviations are reasonably acceptable to the contracting party."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "Illustrations, weight and dimension specifications, technical data, and all other information related to our products, regardless of the format or medium in which they are presented, shall be considered only as approximate values customary in the industry, unless they have been expressly declared binding in our order confirmation. Each contracting party shall retain all rights to plans and technical documentation delivered to the other party. The receiving party acknowledges such rights and undertakes not to make plans or documents available to third parties or use them for purposes other than those for which they were delivered, without the prior written consent of the other contracting party."
            },
            {
                "kind": "item",
                "number": "4",
                "text": "Brochures and advertising catalogs shall not be binding unless otherwise agreed. The information contained in technical documentation shall only be binding to the extent that it has been expressly guaranteed."
            },
            {
                "kind": "item",
                "number": "5",
                "text": "In orders for products whose design or composition characteristics have been specified by the client, the client shall assume responsibility for ensuring that such design or composition does not infringe any third party intellectual or industrial property rights. In the event of any claim by third parties, the client shall hold the supplier harmless against any liability."
            },
            {
                "kind": "item",
                "number": "6",
                "text": "For the acceptance of the order, the scope of the performance, and the delivery date, the client’s signature on the sales order and its technical drawings issued in writing or in text form shall be exclusively decisive. Delivery is subject to our correct and timely supply by our own suppliers."
            },
            {
                "kind": "item",
                "number": "7",
                "text": "Objections to orders must be received by us immediately and, at the latest, within 5 business days following the issuance date, in writing or in text form by email."
            },
            {
                "kind": "item",
                "number": "8",
                "text": "Unless expressly agreed otherwise in writing, assembly or installation at the destination site of the goods shall not be included within the scope of supply."
            },
            {
                "kind": "item",
                "number": "9",
                "text": "When there is an installation order, the client must provide a designated area for work and storage of the parts. AVENTA shall not be responsible for damage to concealed installations while the installation is in progress. In addition, the installation area must be clean and free of obstacles, and the client must provide the necessary equipment when site conditions so require."
            },
            {
                "kind": "item",
                "number": "10",
                "text": "To ensure the proper sealing of the products, the openings must be level, plumb, with 90-degree corners, polished finishes, and structurally rigid. AVENTA does not guarantee proper installation on porous materials such as quarry stone or plaster. The client must ensure that the openings where AVENTA products will be anchored have the necessary rigidity and/or reinforcements for proper installation; if the client does not meet such specifications, the products may not be installed unless expressly approved by the client in writing and with AVENTA being released from any liability regarding proper operation and/or any incident that may arise."
            },
            {
                "kind": "section",
                "text": "III. Prices; Invoicing; Value Added Tax (VAT)"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "Our product prices are net prices expressed in national currency (MXN) and shall be understood as excluding installation, transportation, insurance, and customs duties, in addition to the legally applicable Value Added Tax (VAT) in force on the date of delivery or provision of the service."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "In the event that the circumstances serving as the basis for price formation, in particular exchange rates or taxes, contributions, tariffs, customs duties, or other governmental/official charges, change between the date of the quotation and the agreed delivery date, AVENTA shall have the right to adjust its prices and conditions in accordance with the new circumstances."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "As a general rule, all our invoices shall be sent in valid electronic format (CFDI – Digital Tax Receipt via Internet) and comply with the requirements established by the Mexican Tax Administration Service (SAT) under Article 29-A of the Federal Fiscal Code and the CFDI 4.0 standard. The client is obligated to provide the necessary information in order to issue the corresponding invoices. Upon our request, the contracting party must provide an email address to which the electronic invoices addressed to them shall be sent. We inform the contracting party that the filing and preservation of an electronic invoice must be carried out in the same electronic format in which it was issued and received."
            },
            {
                "kind": "item",
                "number": "4",
                "text": "Export Certificate: When a contracting party with a business address outside the country where AVENTA is located (“foreign client”) collects goods at our facilities either personally or through contracted transportation companies and transports or ships them abroad, such contracting party must provide the export certificate required for tax purposes. If such certificate is not delivered even within the additional period granted by us for such purpose, we shall be entitled to subsequently claim from the contracting party the Value Added Tax (VAT) corresponding to the delivery."
            },
            {
                "kind": "item",
                "number": "5",
                "text": "Special requests from the client (for example, delivery to an address other than the client’s address, expedited shipping methods, or special packaging) shall be accommodated to the extent possible. Any additional costs arising from such requests shall be borne by the client."
            },
            {
                "kind": "section",
                "text": "IV. Delivery Periods"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "Delivery periods shall commence upon execution of the sales order and product drawings, but not before all details of the order have been fully clarified and all documents, permits, and authorizations to be provided by the contracting party have been delivered, nor before receipt of the agreed advance payment or the opening of a letter of credit. The maximum installation period shall be 12 weeks from the date on which the foregoing conditions have been fulfilled. AVENTA shall notify the client in writing of the manufacturing period for the parts once the plans, dimensions, colors, openings, glass types, and all other final specifications have been approved, and once the corresponding advance payment has been received in full."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "Delivery periods shall be extended, without prejudice to our rights arising from the contracting party’s default, for the period during which the contracting party remains in default with respect to its obligations arising from this or any other contracts entered into with us. The foregoing shall likewise apply to delivery dates."
            },
            {
                "kind": "section",
                "text": "V. Delivery and Provision of Services"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "Unless otherwise agreed, deliveries shall be made EXW (Incoterms® 2020) from our plant facilities in San Miguel de Allende, Guanajuato. Freight, handling, and insurance of the goods shall be borne by the client. We reserve the right to choose the shipping method unless otherwise agreed between the parties. Small orders and spare parts deliveries shall be shipped only against advance payment or cash on delivery and without granting our discounts."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "If a delivery “free at site” or “free at warehouse” is agreed, this shall mean delivery only without unloading, provided that there is an access route suitable for heavy vehicles. If the delivery vehicle leaves the accessible roadway at the contracting party’s instructions, the contracting party shall be responsible for any damage that may occur. Unloading must be carried out immediately by the contracting party. Waiting times shall be charged to the contracting party."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "“Approximate” dates indicated by us for deliveries and services shall not be legally binding. Fixed dates must be expressly confirmed by us in writing as such. A delivery period shall be deemed fulfilled if, prior to its expiration, the delivery item has been separated and identified for the contracting party in the case of delivery for pickup, and has been offered verbally, in writing, or in text form; or, in the case of shipment, if the delivery item has been handed over to the company or person responsible for transportation."
            },
            {
                "kind": "item",
                "number": "4",
                "text": "Partial deliveries and services shall be permitted and may be invoiced separately by us. Exceptionally, partial deliveries or services shall not be permitted when they are unreasonably unacceptable to the contracting party."
            },
            {
                "kind": "item",
                "number": "5",
                "text": "We do not provide consulting services in the form of installation planning. Unless expressly agreed otherwise, we shall not be obligated to carry out the installation of the sold goods. The client must understand that the installation of the purchased goods must be performed by technically qualified personnel (for example, specialized technicians or competent professionals in the field)."
            },
            {
                "kind": "item",
                "number": "6",
                "text": "The client shall be responsible for compliance with all legal provisions, regulations, and, where applicable, permits or authorizations required in connection with the installation of the purchased products."
            },
            {
                "kind": "item",
                "number": "7",
                "text": "The fulfillment of our delivery or service obligations shall be subject to the timely and proper fulfillment of the contracting party’s contractual obligations, in particular its obligations of cooperation, authorization, and, where applicable, payment."
            },
            {
                "kind": "item",
                "number": "8",
                "text": "If the contracting party incurs delay in acceptance in accordance with the applicable legal provisions, it shall bear the additional costs generated as a result thereof. From the moment the availability of the goods for collection is notified, the contracting party shall assume the risk of accidental loss or accidental deterioration thereof, provided that it concerns an obligation of collection. In the event of shipment, the risk shall transfer to the contracting party at the moment the goods are delivered to the company or person responsible for transportation. The risk shall also transfer when the conditions for delay in acceptance occur. Goods notified as ready for collection pursuant to the contract must be collected immediately; otherwise, and after granting an additional period by notice, we shall be entitled, at our discretion, to deliver the goods at the client’s expense and risk or to store them at our discretion and invoice them immediately."
            },
            {
                "kind": "item",
                "number": "9",
                "text": "Storage Charges: If the contracting party’s delay in acceptance causes a delay in delivery, the contracting party shall reimburse us, during the period of delay, for the storage costs actually incurred and documented or, alternatively, an amount equivalent to the storage fees customarily charged by a transportation or logistics company. Likewise, we shall have the right to actually store the goods with a transportation or storage company of our choice and charge the contracting party for the costs arising from such storage. The contracting party shall retain the right to prove that the damage caused was less than claimed or that no damage occurred whatsoever."
            },
            {
                "kind": "item",
                "number": "10",
                "text": "During the transportation of goods collected from our facilities, the contracting party must comply not only with the applicable legal provisions regarding cargo securing, but also with recognized technical rules and with AVENTA’s procedures and instructions relating to cargo securing in ground transportation. The contracting party shall likewise impose the foregoing obligations on any transportation or logistics company it has engaged."
            },
            {
                "kind": "item",
                "number": "11",
                "text": "Goods notified as ready for shipment must be withdrawn or collected immediately and, at the latest, within the following 5 business days. Otherwise, and after notice of demand, we shall be entitled, at our discretion, to ship the goods at the contracting party’s expense and risk or to store them at our discretion and invoice them immediately."
            },
            {
                "kind": "item",
                "number": "12",
                "text": "Once production has been completed, delivery and installation must be scheduled within 5 business days following the final manufacturing invoice; otherwise, storage costs may be incurred. In order to schedule delivery and installation, 100% of the order for the parts must be fully paid."
            },
            {
                "kind": "item",
                "number": "13",
                "text": "The client shall provide the permits, licenses, work areas, storage, and appropriate conditions required for the proper installation of the products."
            },
            {
                "kind": "item",
                "number": "14",
                "text": "Installation should preferably be carried out as the final stage of the client’s construction or remodeling project. If the client requests early installation, the client shall assume any risk or damage occurring after installation. AVENTA shall not be responsible for damage to supplied or installed parts after receipt or delivery. Repairs shall be quoted separately."
            },
            {
                "kind": "item",
                "number": "15",
                "text": "Removal of existing products shall only be carried out if it was expressly quoted. AVENTA shall not be responsible for damages, cleaning, or repairs resulting from the removal process. The client must leave the openings in optimal condition for the installation of the parts."
            },
            {
                "kind": "item",
                "number": "16",
                "text": "Unless otherwise stated in the sales order, the installation cost does not include specialized machinery. If such machinery is required, it shall be quoted separately once the on-site installation maneuver has been analyzed by AVENTA’s technical personnel."
            },
            {
                "kind": "section",
                "text": "VI. Force Majeure"
            },
            {
                "kind": "paragraph",
                "text": "We shall not be liable for delays in deliveries or services resulting from force majeure events. For purposes of this provision, force majeure shall include, among others, unavoidable events such as natural disasters of any kind, including earthquakes, floods, storms, volcanic eruptions, pandemics, riots, blockades, boycotts, fires, civil wars, embargoes, hostage-taking, wars, revolutions, sabotage, strikes, terrorism, traffic accidents, or unavoidable interruptions in production. In such cases, we shall be obligated to immediately inform the contracting party of the interruption in delivery or performance and its estimated duration. The agreed deadlines and dates shall be extended for the duration of such circumstance, up to a maximum of 3 months. These unforeseeable events shall also entitle us to request total or partial termination of the contract."
            },
            {
                "kind": "section",
                "text": "VII. Request for Changes to Orders in Production"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "The client may request changes to orders in production at no cost, provided that such requests are made within a maximum period of 5 business days from the execution of the Sales Order and technical drawings."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "If the contracting party does not submit the request within an additional reasonable period granted by us, we shall have the right, at our discretion, to deliver the goods without further notice at the price in effect on the delivery date, claim damages for breach of contract, or terminate the portion of the contract that has not yet been performed."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "Modifications made after approval of the drawings may result in a complete re-quotation, price differences, and adjustments to the delivery time."
            },
            {
                "kind": "section",
                "text": "VIII. Packaging"
            },
            {
                "kind": "paragraph",
                "text": "Packaging material shall be charged at cost and shall not be returned or recovered. The contracting party shall be obligated to dispose of the packaging material at its own expense and in compliance with the applicable legal provisions."
            },
            {
                "kind": "section",
                "text": "IX. Payment Terms"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "As a general rule, the applicable due date shall be the payment term indicated on our invoice. In this regard, we reserve the right to determine the corresponding performance. In the event that such payment term is exceeded, the contracting party shall automatically be in default, without the need for further notice, provided that the debtor is responsible for the non-payment. In the event of default, we shall be entitled to claim the statutory default interest applicable to commercial transactions. The foregoing shall be without prejudice to any other rights or claims arising from delayed payment. AVENTA may grant the client an additional period of 7 calendar days following the due date of the payment obligation and, once such period has elapsed without compliance, may, within the following 5 business days, declare the termination of the contract in writing and claim damages, or continue demanding payment of the purchase price. The client shall be charged MXN 500 (Mexican pesos) for administrative expenses starting from the first payment demand. Additional charges may apply."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "Notwithstanding the provisions of Clause 1, exceptionally, payments must be made on the specifically agreed due date or, failing that, within 5 banking business days following the date of the invoice and receipt thereof, without any deductions, to the indicated account and in the currency in force at the domicile of the plant participating in the contract, provided that the invoice does not indicate a due date in accordance with Clause 1. For purposes of calculating the period, the event occurring on the later date shall be determinative."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "If, after the conclusion of the contract, objective circumstances become known to us that may reduce the contracting party’s solvency or creditworthiness, we shall have the right to suspend the corresponding performance and to grant the contracting party a reasonable period within which it must make payment simultaneously with delivery or provide sufficient security. In the event of refusal by the contracting party or unsuccessful expiration of the granted period, we may request termination of the contract and claim damages for breach of contract."
            },
            {
                "kind": "item",
                "number": "4",
                "text": "The contracting party shall not be entitled to withhold payment of the purchase price based on possible counterclaims or claims that do not arise from the present contractual relationship. The right of set-off shall only apply with respect to claims that are undisputed, due and payable, or recognized by a final and binding judgment. Likewise, a right of set-off shall exist when the claim used for set-off arises from a cause that grants or would have granted the contracting party the right to reject all or part of the corresponding performance."
            },
            {
                "kind": "item",
                "number": "5",
                "text": "Payment shall be made in installments as follows: a) Manufacturing of parts: 60% upon execution of the sales order, 30% as weekly or biweekly progress payments per part, and 10% upon completion of production, prior to shipment of the parts to the installation site. b) Installations: 60% for scheduling shipment and installation, 30% as installation progress for each part, and 10% upon the client’s final approval for each installed and delivered part. Accepted methods of payment are: bank transfer (SPEI), credit or debit card, cash, and check. AVENTA’s banking details for payment shall be as follows: Corporate Name: AVENTA WINDOWS S.A.P.I. DE C.V. Bank: INBURSA Account Number: 50072703436 CLABE: 036240500727034366 SWIFT: INBUMXMM Tax ID (RFC): AWI220812K77"
            },
            {
                "kind": "item",
                "number": "6",
                "text": "Full payment of the initial advance payment is required in order to commence activities related to the project, including manufacturing, procurement of materials, and preparation of drawings."
            },
            {
                "kind": "item",
                "number": "7",
                "text": "In the event of non-payment of work progress estimates within 5 business days following the invoice date, AVENTA may unilaterally suspend manufacturing and reschedule the delivery date without liability for delays."
            },
            {
                "kind": "item",
                "number": "8",
                "text": "Work progress estimates shall be carried out on a biweekly basis according to the calendar month, specifically on the 15th and the last day of each month, unless otherwise indicated in the sales order signed by the parties."
            },
            {
                "kind": "section",
                "text": "X. Retention of Title"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "All delivered goods (goods subject to retention of title) shall remain our property until full payment of all claims arising from the business relationship, including future claims, regardless of their legal basis, even if payments corresponding to specifically identified claims have been made. In the case of a commercial current account, the retention of title shall serve as security for the balance owed in our favor. The retention of title shall also apply in the event of resale and/or subsequent processing of the goods subject to retention of title. In the latter case, the processing shall be deemed carried out for us in the capacity of manufacturer."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "The contracting party may only resell the goods subject to retention of title in the ordinary course of its business operations, provided that it is not in default and under the condition that its customers may not set off claims arising from the resale against their own counterclaims. The contracting party shall not be authorized to make any other disposition of the goods subject to retention of title, in particular transfers by way of security or the creation of pledges."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "Claims arising from the resale of the goods subject to retention of title are hereby assigned to us, as security, until full payment of our claims (Clause 1). We hereby accept such assignment as security. If the contracting party has already made prior dispositions regarding future claims arising from the sale of its goods that could conflict with the assignment as security in our favor (for example, advance assignments under a factoring agreement), then, instead of the claims arising from the resale of our goods subject to retention of title, the contracting party’s right to receive consideration from the beneficiary of such prior disposition (for example, the factoring entity) shall be deemed assigned to us as security. The contracting party must immediately inform us if it has made prior dispositions regarding future claims generated in the course of its business activities, or if contractual obligations or other circumstances exist or may arise that could affect our security rights."
            },
            {
                "kind": "item",
                "number": "4",
                "text": "The contracting party shall be authorized to collect claims arising from the resale until we revoke such authorization at any time permitted by law. The proceeds obtained from the resale of our goods subject to retention of title, or the assets or rights replacing them (for example, in factoring transactions), shall immediately become our property up to the amount corresponding to our participation in the respective invoice. Our right to directly collect the claims assigned in our favor in the event of breach of our payment terms shall remain unaffected. At our request, the contracting party shall be obligated to notify its debtors of the assignment made in our favor and to provide us with all information necessary to enforce such claims. In the event of enforcement measures by third parties affecting our security rights, the contracting party must indicate the existence of our rights and inform us immediately."
            },
            {
                "kind": "item",
                "number": "5",
                "text": "In the event of default in payment by the contracting party, we shall be entitled, after granting an additional reasonable period, to demand the return of the goods subject to retention of title at the contracting party’s expense, even without terminating the contract."
            },
            {
                "kind": "item",
                "number": "6",
                "text": "The contracting party’s right to resell the goods and to collect claims arising from such resale shall automatically terminate, without the need to grant an additional period, upon the occurrence of the conditions under which the contracting party could request the commencement of insolvency proceedings. The same shall apply in the event of unsuccessful expiration of the period granted by us for the contracting party to make advance payments or provide security due to deterioration of its solvency (see Clause V.4.). Once the contracting party’s right of resale has terminated, we may demand the return of the goods subject to retention of title at the contracting party’s expense and cost. In all cases, the contracting party shall reimburse us for additional transportation, shipping, and related costs, as well as for any reduction in the value of the goods."
            },
            {
                "kind": "item",
                "number": "7",
                "text": "The transformation or processing of the goods subject to retention of title shall be carried out for us in the capacity of manufacturer, without this implying any obligation on our part. If the goods subject to retention of title are mixed, combined, or processed with other goods not owned by us, we shall acquire co-ownership of the new goods in proportion to the invoiced value of our goods relative to the invoiced value of the other goods used. The processed goods, as well as our co-ownership interests therein, shall be considered goods subject to retention of title for purposes of the foregoing provisions."
            },
            {
                "kind": "item",
                "number": "8",
                "text": "If the value of the existing securities in our favor exceeds our claims by more than 10% on a basis that is not merely temporary, we shall, upon request of the contracting party, release securities in the corresponding amount, at our discretion. The foregoing shall also apply when the estimated value of the securities exceeds 150% of the secured claim."
            },
            {
                "kind": "item",
                "number": "9",
                "text": "In cross-border commercial transactions, the contracting party shall adopt all mandatory measures in its country of origin to protect our retention of title. If, in the contracting party’s country of origin, a retention of title regulation comparable to that permitted under the legislation applicable at the domicile of our supplier plant participating in the contract is not recognized (especially where no extended or expanded retention of title exists), we may at any time require the contracting party to provide a bank bond, bank guarantee, or other adequate and sufficient security in an amount equivalent to the corresponding value of our deliveries of goods."
            },
            {
                "kind": "item",
                "number": "10",
                "text": "The goods and additional installation supplied by us, upon being attached to real property or incorporated into a building, shall be deemed attached or incorporated only on a temporary basis and with the intention of being separated again in the event that we enforce our retention of title. If the building does not belong to the contracting party, the contracting party must clarify to the owner that the attachment or incorporation of the goods supplied by us is of a temporary nature only."
            },
            {
                "kind": "item",
                "number": "11",
                "text": "Upon incorporation of our goods subject to retention of title into real property or a building, the contracting party hereby assigns to us the collection rights to which it may be entitled against the third party, up to the amount of the invoiced value of our goods, including the right to establish a mortgage as security."
            },
            {
                "kind": "section",
                "text": "XI. Seller’s Liability for Contractual Breaches (Liability for Defects)"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "We shall not be liable for contractual breaches arising from improper or incorrect use, defective assembly or commissioning carried out by the contracting party or third parties, normal wear and tear, improper or negligent handling, nor for the consequences of modifications or repairs improperly carried out without our consent by the contracting party or third parties."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "Before exercising any legal action or remedy, the contracting party must grant us a reasonable period for the fulfillment of our contractual obligations and provide us with the opportunity to properly verify the claims asserted against us. The foregoing shall not apply in cases where subsequent performance is impossible, where we have the legitimate right to refuse such performance, or where such performance has failed."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "The contracting party shall be obligated to inspect the goods immediately upon physical delivery at the installation site agreed upon by the parties and must sign AVENTA’s delivery form at the moment the part is installed. If, within the following 5 business days, the client has not signed AVENTA’s delivery document and no claim has been made in this regard, AVENTA reserves the right to invoice the remaining amount for the installation and demand the corresponding payment in accordance with the due date indicated on the issued invoice. Apparent defects must be notified in writing within a reasonable period and, in any case, no later than within 5 business days following receipt of the goods at the destination site. Hidden defects must be notified in writing within a reasonable period and, at the latest, within 5 business days after their discovery to AVENTA’s Customer Service Department by email at: andrea@aventawindows.com Such notice must precisely describe the nature of the defect. The identification label included with the shipment must be attached to the claim. Any other material defect must be claimed by the client in writing immediately upon discovery. The date on which we receive the claim shall be determinative. If a defect claim proves to be unjustified, we shall be entitled to demand reimbursement from the client for the expenses incurred, unless the client demonstrates that it was not at fault with respect to the unjustified claim. If the claim is not submitted within the established periods, rights arising from material defects shall be excluded."
            },
            {
                "kind": "item",
                "number": "4",
                "text": "In the event of a justified and timely defect claim, we shall, at our discretion, either repair the claimed goods or supply a defect-free replacement, provided that subsequent performance is not impossible or does not involve disproportionate costs."
            },
            {
                "kind": "item",
                "number": "5",
                "text": "If the contracting party acquires a right to claim damages due to defects in the sold goods, we shall be liable in accordance with the “Warranty Policy” during the first 3 years. This warranty policy is available on AVENTA’s website at the following link: https://www.aventawindows.com/politica-de-garantia"
            },
            {
                "kind": "item",
                "number": "6",
                "text": "For supplied and installed replacement parts, as well as for repairs performed, the warranty period shall be 1 year from the date of delivery or installation."
            },
            {
                "kind": "item",
                "number": "7",
                "text": "Notwithstanding the limitation periods set forth above and any limitation of defect rights provided in Clause 6, defect claims relating to our goods or parts thereof that, according to their customary use, have been incorporated into a construction and have caused defects therein, shall be subject to a limitation period of 3 years. In such cases, the legal provisions relating to liability for material defects shall apply without limitation. In all other cases, the provisions established in Section VII of the General Conditions of Sale shall continue to apply."
            },
            {
                "kind": "item",
                "number": "8",
                "text": "The commencement of the limitation period shall be determined in accordance with the applicable legal provisions and shall begin upon delivery made by us."
            },
            {
                "kind": "item",
                "number": "9",
                "text": "Natural variations in tone and grain of the wood shall not be considered defects. Wood may undergo contraction or expansion resulting from environmental conditions without affecting the functionality of the parts."
            },
            {
                "kind": "section",
                "text": "XII. Return of Goods"
            },
            {
                "kind": "paragraph",
                "text": "Goods that have been correctly ordered and delivered, or that have been specifically manufactured or customized, shall not be accepted for return as a general rule."
            },
            {
                "kind": "section",
                "text": "XIII. Product Liability"
            },
            {
                "kind": "paragraph",
                "text": "We shall be liable for damages arising from product defects in accordance with the applicable legal provisions governing product liability."
            },
            {
                "kind": "section",
                "text": "XIV. Limitation of Liability"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "Unless otherwise provided in these Conditions, including the following provisions, we shall be liable for breaches of contractual and non-contractual obligations in accordance with the applicable legal provisions"
            },
            {
                "kind": "item",
                "number": "2",
                "text": "We shall be liable for damages, regardless of their legal basis, within the framework of fault-based liability in cases of willful misconduct and gross negligence. We shall also be liable for damages arising from the breach of an essential contractual obligation (“cardinal obligation”), meaning an obligation whose fulfillment makes the proper execution of the contract possible and on whose observance the contracting party relies and may reasonably rely. In such case, our liability shall be limited to compensation for foreseeable damages typically arising from the contract."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "The limitations of liability set forth in Section 2 shall also apply vis-à-vis third parties, as well as in cases of breaches committed by persons (including those acting for their benefit) whose conduct is attributable to us in accordance with the applicable legal provisions. Such limitations shall not apply where a defect has been fraudulently concealed or where a guarantee regarding the characteristics of the goods has been granted, nor with respect to the client’s claims under the applicable product liability legislation."
            },
            {
                "kind": "item",
                "number": "4",
                "text": "For breaches of obligations that do not consist of defects in the goods, the client may only rescind or terminate the contract when such breach is attributable to AVENTA. Any right of unilateral or discretionary termination by the client is excluded. In all other respects, the corresponding legal provisions, as well as their legal effects, shall apply."
            },
            {
                "kind": "item",
                "number": "5",
                "text": "These exclusions and limitations of liability shall also apply, to the same extent, for the benefit of our corporate bodies, legal representatives, employees, agents, and subcontractors."
            },
            {
                "kind": "section",
                "text": "XV. Confidentiality"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "The contracting party undertakes to treat as a trade secret all non-public commercial and technical information that becomes known to it as a consequence of the business relationship with us."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "Plans, models, templates, samples, and similar objects may not be delivered or made available to unauthorized third parties. The reproduction of such objects shall only be permitted within the scope of operational needs and in accordance with the applicable copyright provisions."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "In the event that the contracting party does not accept a quotation submitted by us, it undertakes to immediately and completely return to us all quotation documentation that had been delivered to it."
            },
            {
                "kind": "section",
                "text": "XVI. Cancellation Policy"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "In the event of breach of the purchase agreement, we shall be entitled to claim the damages actually incurred and proven or, alternatively, to demand, without the need for additional proof, liquidated damages equivalent to 25% of the agreed purchase price, unless the contracting party proves that the damage caused was lower."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "If the client cancels parts for which materials have already been acquired or production has already begun, a penalty equal to 80% of the value of the part shall apply. If the part has already been completed, the penalty shall be 100%."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "In the event of closure or suspension of the project by authorities, the client shall pay the full amount for the manufactured parts and/or the installation in progress."
            },
            {
                "kind": "section",
                "text": "XVII. Data Protection"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "The contracting party accepts that the personal data received by us within the framework of or in connection with our business relationship shall be processed in accordance with AVENTA’s privacy notice, which may be found on the website at the following link: https://www.aventawindows.com/aviso-privacidad"
            },
            {
                "kind": "section",
                "text": "XVIII. Place of Performance, Applicable Law, and Competent Jurisdiction"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "Unless otherwise expressly agreed in writing, the place of performance shall be San Miguel de Allende, Guanajuato (Mexico)."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "The contractual relationship shall be governed exclusively by the laws in force in the corresponding competent jurisdiction (lex fori), excluding conflict of laws provisions. In cross-border commercial transactions, the United Nations Convention of April 11, 1980 on Contracts for the International Sale of Goods (CISG) shall apply. To the extent that the CISG does not contain applicable provisions, the legal relationships between the contracting parties shall be governed by the legal system in force in the corresponding competent jurisdiction, excluding conflict of laws rules."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "The competent jurisdiction for both contracting parties shall be the courts of Mexico City (Mexico), unless expressly agreed otherwise. Notwithstanding the foregoing, we shall also have the right to bring claims against the contracting party before the competent jurisdiction of its general domicile."
            },
            {
                "kind": "section",
                "text": "XIX. Miscellaneous Provisions"
            },
            {
                "kind": "item",
                "number": "1",
                "text": "The language of the contract shall be Spanish, unless expressly agreed otherwise."
            },
            {
                "kind": "item",
                "number": "2",
                "text": "These General Conditions of Sale are drafted in both Spanish and English. In the event of any doubt regarding interpretation, the Spanish version shall be legally binding and shall prevail over the English version."
            },
            {
                "kind": "item",
                "number": "3",
                "text": "We reserve the right to modify these conditions at any time."
            },
            {
                "kind": "item",
                "number": "4",
                "text": "If any provision contained in these commercial conditions or in any other contractual agreement entered into between the parties is or becomes invalid or unenforceable, this shall not affect the validity of the remaining provisions or agreements. In such event, the contracting parties shall endeavor to replace the invalid provision with another provision that produces, to the greatest extent possible, an equivalent economic effect."
            }
        ]
    }
} as Record<Lang, LegalContent>;

const content = computed(() => legalContent[currentLang.value]);
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
                        <span class="bg-white border border-neutral-200 rounded-full px-3 py-1">
                            {{ content.applicable }}
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
                    class="bg-white rounded-3xl shadow-[0_18px_40px_rgba(15,23,42,0.12)] border border-neutral-200 px-6 py-8 md:px-10 md:py-10 text-sm leading-relaxed text-neutral-800 space-y-6"
                >
                    <template
                        v-for="(record, index) in content.records"
                        :key="index"
                    >
                        <h2
                            v-if="record.kind === 'section'"
                            class="pt-8 first:pt-0 border-t first:border-t-0 border-neutral-200 font-semibold text-base md:text-lg text-neutral-950 font-serif"
                        >
                            {{ record.text }}
                        </h2>

                        <div
                            v-else-if="record.kind === 'item'"
                            class="grid gap-3 md:grid-cols-[42px_1fr]"
                        >
                            <div class="h-8 w-8 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-medium mt-0.5 shrink-0">
                                {{ record.number }}
                            </div>

                            <p class="text-justify">
                                {{ record.text }}
                            </p>
                        </div>

                        <p
                            v-else
                            class="text-justify"
                        >
                            {{ record.text }}
                        </p>
                    </template>
                </section>
            </div>
        </div>
    </main-layout>
</template>
