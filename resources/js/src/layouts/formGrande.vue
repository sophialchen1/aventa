<script setup>
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { paises, telefonia } from "../data/paises.js";
import { track } from "../lib/track.js";

const { locale } = useI18n();

// Bound to the first-name input. subirUnArchivo() reads it to name the
// uploaded file, so without this declaration every upload threw.
const namePerson = ref("");

const select_pais = ref("México");
const select_estado = ref("");

// The submitted value is always p.pais; only the label follows the language.
function nombrePais(p) {
    return locale.value === "en" ? p.pais_en : p.pais;
}

// Sorted by the name the visitor actually reads, so United States sits under U
// in English and Estados Unidos under E in Spanish. Otro stays last.
const paisesOrdenados = computed(() => {
    const collator = new Intl.Collator(locale.value === "en" ? "en" : "es");
    return [...paises]
        .filter((p) => p.pais !== "Otro")
        .sort((a, b) => collator.compare(nombrePais(a), nombrePais(b)))
        .concat(paises.filter((p) => p.pais === "Otro"));
});

const estadosDis = computed(() => {
    const encontrado = paises.find((p) => p.pais === select_pais.value);
    return encontrado ? encontrado.estados : [];
});

// Otro has no state list, so the visitor types it instead
const estadoLibre = computed(() => estadosDis.value.length === 0);

// Without this, switching country keeps the state picked for the previous one
// and submits it, e.g. Jalisco with Canada.
watch(select_pais, () => {
    select_estado.value = "";
});

const t_proyecto = ["Nuevo", "Remodelación"];

const select_code = ref("+52");
const telefonoCompleto = ref("+52");

function cambiarLada() {
    // Detectar el código actual que está en el input
    const codigos = telefonia
        .map((p) => p.codigo)
        .sort((a, b) => b.length - a.length);

    const codigoActual =
        codigos.find((cod) => telefonoCompleto.value.startsWith(cod)) || "";
    const numeroUsuario = telefonoCompleto.value.slice(codigoActual.length);

    telefonoCompleto.value = select_code.value + numeroUsuario;
}

function asegurarPrefijo() {
    if (!telefonoCompleto.value.startsWith(select_code.value)) {
        // Eliminar cualquier otro prefijo si el usuario lo alteró
        const codigos = telefonia
            .map((p) => p.codigo)
            .sort((a, b) => b.length - a.length);
        const codigoDetectado =
            codigos.find((c) => telefonoCompleto.value.startsWith(c)) || "";
        const soloNumero = telefonoCompleto.value
            .slice(codigoDetectado.length)
            .replace(/\D/g, "");

        // Restaurar el prefijo correcto
        telefonoCompleto.value = select_code.value + soloNumero;
    }
}

const inputTel = ref("+52"); // inicia con lada

// Detecta cambio de lada y sustituye solo el prefijo
watch(select_code, (nuevoCodigo) => {
    const sinLada = inputTel.value.replace(/^\+\d+\s?/, "");
    inputTel.value = nuevoCodigo + sinLada;
});

const archivos = ref([]); // File[]
const urlsArchivos = ref([]); // string[]
const nombresArchivos = ref([]); // string[]
const archivoSubiendo = ref(false);

const urlArchivosHubspot = computed(() => {
    // HubSpot suele llevarse mejor con texto plano
    // Puedes cambiar el separador a "\n" si lo prefieres
    return urlsArchivos.value.length
        ? urlsArchivos.value.join(" | ")
        : "sin link";
});

const nombresArchivosHubspot = computed(() => {
    return nombresArchivos.value.length
        ? nombresArchivos.value.join(" | ")
        : "sin archivo";
});

async function subirUnArchivo(file) {
    const formData = new FormData();
    formData.append("archivo", file);
    formData.append("nombre", namePerson.value || "anonimo");

    const respuesta = await fetch("/api/guardar-archivo", {
        method: "POST",
        body: formData,
    });

    const rawText = await respuesta.text();
    if (!respuesta.ok) throw new Error(`Error ${respuesta.status}: ${rawText}`);

    const data = JSON.parse(rawText);
    // espero { url, nombre } como ya usabas
    return { url: data.url, nombre: data.nombre };
}

const onFilesSelected = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    // reset y carga nueva selección
    archivos.value = files;
    urlsArchivos.value = [];
    nombresArchivos.value = [];

    archivoSubiendo.value = true;

    try {
        // subimos secuencial para no saturar servidor (y evitar límites)
        for (const file of files) {
            const { url, nombre } = await subirUnArchivo(file);
            urlsArchivos.value.push(url);
            nombresArchivos.value.push(nombre);
        }
    } catch (err) {
        urlsArchivos.value = [];
        nombresArchivos.value = [];
        alert("Error al subir archivos: " + (err?.message || err));
    } finally {
        archivoSubiendo.value = false;
    }
};

const mostrarGracias = ref(false);
const textAreaRef = ref(null);

const enviarFormulario = (e) => {
    e.preventDefault();

    // ⛔ no permitir enviar si aún está subiendo archivos
    if (archivoSubiendo.value) {
        alert("Espera a que terminen de subirse los archivos.");
        return;
    }

    const form = e.target.closest("form");

    // ✅ defaults: si no subieron archivos, HubSpot recibirá "sin link" / "sin archivo"
    // (con los computed urlArchivosHubspot y nombresArchivosHubspot ya queda,
    // pero por si quieres forzar el array vacío también)
    if (!Array.isArray(urlsArchivos.value) || urlsArchivos.value.length === 0) {
        urlsArchivos.value = [];
        nombresArchivos.value = [];
    }

    if (!textAreaRef.value?.value?.trim()) {
        textAreaRef.value.value =
            "No se proporcionó informacion sobre el proyecto";
    }

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Fired here, not on click: at this point validation has passed and the
    // visitor is about to see the thank-you state, so it counts one real lead.
    track("quote_submit", { link_location: "formulario_cotizacion" });

    mostrarGracias.value = true;
};
</script>

<template>
    <form
        @submit.prevent="enviarFormulario"
        class="flex-1"
        name="sol_cot"
        action=""
    >
        <div class="flex flex-col bg-white p-2 gap-5 lg:p-10 rounded-xl">
            <h3 class="font-bold text-[#657d88] lg:text-[1.5rem]">
                {{ $t('form_title') }}
            </h3>
            <div class="grid lg:grid-cols-2 lg:gap-3">
                <div>
                    <p>{{ $t('form_firstname') }}</p>
                    <input
                        v-model="namePerson"
                        name="firstname"
                        class="border-1 border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl"
                        :placeholder="$t('ph_firstname')"
                        required
                    />
                </div>
                <div>
                    <p>{{ $t('form_lastname') }}</p>
                    <input
                        name="lastname"
                        class="border-1 border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl"
                        :placeholder="$t('ph_lastname')"
                        required
                    />
                </div>
                <div>
                    <p>{{ $t('form_phone') }}</p>
                    <div class="flex gap-1">
                        <!-- Select para la lada -->
                        <select
                            v-model="select_code"
                            @change="cambiarLada"
                            class="border p-2 rounded-xl bg-[#F9F9F9] border-[#cccccc]"
                            required
                        >
                            <option
                                v-for="pais in telefonia"
                                :key="pais.codigo + pais.sigla"
                                :value="pais.codigo"
                            >
                                {{ pais.sigla }}
                            </option>
                        </select>

                        <input
                            v-model="telefonoCompleto"
                            name="phone"
                            type="tel"
                            class="border rounded-xl w-full border-[#cccccc] bg-[#F9F9F9] p-2"
                            :maxlength="select_code.length + 10"
                            :pattern="`^\\${select_code}\\d{10}$`"
                            :title="`Debe ser ${select_code} seguido de 10 dígitos`"
                            @input="asegurarPrefijo"
                            required
                        />
                    </div>
                </div>
                <div>
                    <p>{{ $t('form_email') }}</p>
                    <input
                        class="border-1 border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl"
                        :placeholder="$t('ph_email')"
                        pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                        type="email"
                        inputmode="email"
                        autocomplete="email"
                        title="Escribe un correo válido (debe incluir @ y un dominio, ej. nombre@dominio.com)"
                        required
                    />
                </div>
            </div>
            <div>
                <label class="text-[#757575] flex gap-2 cursor-pointer">
                    <input
                        name="whatsapp_consent"
                        type="checkbox"
                        value="true"
                    />
                    {{ $t('form_whatsapp') }}
                </label>
            </div>
            <div class="grid lg:grid-cols-3 lg:gap-3">
                <div>
                    <p>{{ $t('form_country') }}</p>
                    <select
                        name="country"
                        v-model="select_pais"
                        class="w-full h-10.5 flex-none border border-[#cccccc] bg-[#F9F9F9] rounded-xl p-2 text-sm"
                        required
                    >
                        <option v-for="i in paisesOrdenados" :key="i.pais" :value="i.pais">
                            {{ nombrePais(i) }}
                        </option>
                    </select>
                </div>
                <div>
                    <p>{{ $t('form_state') }}</p>
                    <input
                        v-if="estadoLibre"
                        name="state"
                        v-model="select_estado"
                        class="w-full h-10.5 flex-none border border-[#cccccc] bg-[#F9F9F9] rounded-xl p-2 text-sm"
                        :placeholder="$t('ph_state')"
                        required
                    />
                    <select
                        v-else
                        name="state"
                        v-model="select_estado"
                        class="w-full h-10.5 flex-none border border-[#cccccc] bg-[#F9F9F9] rounded-xl p-2 text-sm"
                        required
                    >
                        <option disabled value="">{{ $t('form_select_placeholder') }}</option>
                        <option v-for="i in estadosDis" :key="i" :value="i">
                            {{ i }}
                        </option>
                    </select>
                </div>
                <div>
                    <p>{{ $t('form_city') }}</p>
                    <input
                        name="city"
                        class="border-1 border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl"
                        :placeholder="$t('ph_city')"
                        required
                    />
                </div>
            </div>
            <div class="grid grid-cols-1 gap-2">
                <div>
                    <p>{{ $t('form_projecttype') }}</p>
                    <select
                        name="tipo_de_proyecto"
                        class="border-1 border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl"
                        required
                    >
                        <option disabled value="">{{ $t('form_select_placeholder') }}</option>
                        <option v-for="op in t_proyecto" :key="op" :value="op">
                            {{ op }}
                        </option>
                    </select>
                </div>

                <div>
                    <p>{{ $t('form_details') }}</p>
                    <textarea
                        ref="textAreaRef"
                        class="border-1 border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl h-[100px]"
                        :placeholder="$t('ph_details')"
                    ></textarea>
                </div>
                <div>
                    <p>{{ $t('form_upload') }}</p>
                    <input
                        type="file"
                        multiple
                        @change="onFilesSelected"
                        accept=".pdf,.doc,.docx,.jpg,.png"
                    />
                </div>
                <div>
                    <p class="hidden">Url Archivo*</p>
                    <input
                        class="hidden"
                        name="file_upload_urls"
                        :value="urlArchivosHubspot"
                    />
                </div>
                <div
                    v-if="nombresArchivos.length"
                    class="text-green-600 text-sm mt-2 flex flex-col gap-1"
                >
                    <p class="font-semibold">Archivos subidos:</p>
                    <p v-for="(n, i) in nombresArchivos" :key="n + i">
                        • {{ n }}
                    </p>
                </div>

                <div>
                    <p class="hidden">Nombre Archivo*</p>
                    <input
                        class="hidden"
                        name="name_archivos"
                        :value="nombresArchivosHubspot"
                    />
                </div>
            </div>
            <button
                :disabled="archivos.length > 0 && archivoSubiendo"
                type="submit"
                class="bg-[#657d88] rounded-full p-2 cursor-pointer text-white transition-all duration-300 ease-in-out lg:text-[1rem] lg:py-3 lg:mt-4 hover:translate-y-[-8px] hover:shadow-xl hover:bg-[#4a5a62] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {{
                    archivos.length > 0 && archivoSubiendo
                        ? $t("form_uploading")
                        : $t("form_submit")
                }}
            </button>
        </div>
    </form>

    <div
        v-if="mostrarGracias"
        class="fixed inset-0 bg-black/10 z-50 flex items-center justify-center"
    >
        <div class="bg-white p-6 rounded-xl text-center max-w-md mx-auto">
            <h2 class="text-xl font-bold text-[#657d88] mb-4">
                {{ $t('form_thanks_title') }}
            </h2>
            <p class="mb-6">{{ $t('form_thanks_body') }}</p>
            <router-link
                to="/"
                @click="mostrarGracias = false"
                class="bg-[#657d88] text-white px-4 py-2 rounded-xl hover:bg-[#64563c]"
            >
                {{ $t('form_thanks_cta') }}
            </router-link>
        </div>
    </div>
</template>

<style scoped>
input::file-selector-button {
    background-color: #657d88;
    padding: 10px;
    border-radius: 10px;
    color: white;
    margin-right: 5px;
}

input::file-selector-button:hover {
    background-color: #64563c;
    cursor: pointer;
}

form p {
    color: #757575;
}
</style>
