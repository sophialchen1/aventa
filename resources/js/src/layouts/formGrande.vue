<script setup>
import {computed, reactive, ref, watch} from "vue";
import { paises, telefonia } from '../data/paises.js';

const select_pais = ref('México');
const select_estado = ref('');

const estadosDis = computed (() => {
    const encontrado = paises.find(p => p.pais === select_pais.value);
    return encontrado ? encontrado.estados : []
});

const t_proyecto = [
    'Nuevo', 'Remodelación'
]

const select_code = ref('+52')
const telefonoCompleto = ref('+52')

function cambiarLada() {
    // Detectar el código actual que está en el input
    const codigos = telefonia.map(p => p.codigo).sort((a, b) => b.length - a.length)

    const codigoActual = codigos.find(cod => telefonoCompleto.value.startsWith(cod)) || ''
    const numeroUsuario = telefonoCompleto.value.slice(codigoActual.length)

    telefonoCompleto.value = select_code.value + numeroUsuario
}

function asegurarPrefijo() {
    if (!telefonoCompleto.value.startsWith(select_code.value)) {
        // Eliminar cualquier otro prefijo si el usuario lo alteró
        const codigos = telefonia.map(p => p.codigo).sort((a, b) => b.length - a.length)
        const codigoDetectado = codigos.find(c => telefonoCompleto.value.startsWith(c)) || ''
        const soloNumero = telefonoCompleto.value.slice(codigoDetectado.length).replace(/\D/g, '')

        // Restaurar el prefijo correcto
        telefonoCompleto.value = select_code.value + soloNumero
    }
}

const inputTel = ref('+52') // inicia con lada

// Detecta cambio de lada y sustituye solo el prefijo
watch(select_code, (nuevoCodigo) => {
    const sinLada = inputTel.value.replace(/^\+\d+\s?/, '')
    inputTel.value = nuevoCodigo + sinLada
})




const productos = ref([]);

const nuevo = reactive({
    tipo: 'Ventana',
    apertura: 'Aún no lo decido',
    madera: 'Aún no lo decido',
    cantidad: 1,
    ancho: null,
    alto: null
});

const madera = [
    'Alder',
    'Cedro Rojo',
    'Encino',
    'Rosa Morada',
    'Teca',
    'Tornillo',
    'Tzalam',
    'Aún no lo decido'
]

const aper_puertas = [
    'Practicable',
    'Corrediza Elevable',
    'Plegable',
    'Aún no lo decido'
]
const aper_ventanas = [
    'Fija',
    'Abatible',
    'Oscilobatiente',
    'Corrediza',
    'Plegable',
    'Aún no lo decido'
]


function agregarProducto() {
    if (nuevo.cantidad && nuevo.ancho && nuevo.alto && nuevo.madera && nuevo.apertura) {
        productos.value.push({ ...nuevo });
        // Reiniciar formulario
        nuevo.cantidad = 1;
        nuevo.ancho = null;
        nuevo.alto = null;
        nuevo.apertura = 'Aún no lo decido';
        nuevo.madera = 'Aún no lo decido';
    } else {
        alert("Completa todos los campos antes de agregar.");
    }

    console.log(datosProyecto);
}

const datosProyecto = computed(() => {
    return productos.value.map(p =>
        `${p.tipo}/qty=${p.cantidad}/ancho=${p.ancho}/alto=${p.alto}/apertura=${p.apertura}/madera=${p.madera}`
    ).join(' /// ');

});


function eliminarProducto(index) {
    productos.value.splice(index, 1);
}

const archivo = ref(null);
const urlArchivo = ref('sin link');
const nombreArchivo = ref('sin archivo');
const archivoSubiendo = ref(false);
const namePerson = ref('');

const onFileSelected = async (event) => {
  const selected = event.target.files[0];
  if (!selected) return;

  archivo.value = selected;
  archivoSubiendo.value = true;

  try {
    const formData = new FormData();
    formData.append('archivo', archivo.value);
    formData.append('nombre', namePerson.value || 'anonimo');

    const respuesta = await fetch('/api/guardar-archivo', {
      method: 'POST',
      body: formData
    });

    const rawText = await respuesta.text();
    if (!respuesta.ok) throw new Error(`Error ${respuesta.status}: ${rawText}`);

    const data = JSON.parse(rawText);

    urlArchivo.value = data.url;
    nombreArchivo.value = data.nombre;
  } catch (err) {
    urlArchivo.value = 'sin link';
    nombreArchivo.value = 'sin archivo';
    alert('Error al subir archivo: ' + err.message);
  } finally {
    archivoSubiendo.value = false;
  }
};

const mostrarGracias = ref(false);

const textAreaRef = ref(null);


const enviarFormulario = (e) => {
    e.preventDefault();
    if (productos.value.length === 0) {
        alert('Debes agregar al menos un producto en "Datos del proyecto" antes de enviar');
        return;
    }

    const form = e.target.closest('form');

    // Si no hay archivo subido, agrega valores por defecto
    if (!urlArchivo.value) {
        urlArchivo.value = 'sin link';
        nombreArchivo.value = 'sin archivo';
    }

    if (!textAreaRef.value.value.trim()){
        textAreaRef.value.value = 'No se proporcionó informacion sobre el proyecto';
    }

    // Validación HTML estándar
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Aquí puedes simular un envío o simplemente mostrar el modal
    mostrarGracias.value = true;
};


const PHONE_DIGITS = 10;

// quita cualquier cosa que no sea dígito y limita a 10
function only10Digits(str) {
    return (str ?? '').replace(/\D/g, '').slice(0, PHONE_DIGITS);
}

</script>

<template>
    <form @submit.prevent="enviarFormulario" class="flex-1" name="sol_cot" action="">
        <div class="flex flex-col bg-white p-2 gap-5 lg:p-10 rounded-xl">
            <h3 class="font-bold text-[#918164] lg:text-[1.5rem]">Solicita tu cotización</h3>
            <div class="grid lg:grid-cols-2 lg:gap-3">
                <div>
                    <p>Nombre (s)*</p>
                    <input v-model="namePerson" name="firstname" class="border-1 border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl"
                           placeholder="Escribe tu nombre" required>
                </div>
                <div>
                    <p>Apellido*</p>
                    <input name="lastname" class="border-1 border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl"
                           placeholder="Escribe tus apellidos" required>
                </div>
                <div>
                    <p>Teléfono*</p>
                    <div class="flex gap-1">
                        <!-- Select para la lada -->
                        <select v-model="select_code" @change="cambiarLada" class="border p-2 rounded-xl bg-[#F9F9F9] border-[#cccccc]" required>
                            <option v-for="pais in telefonia" :key="pais.codigo + pais.sigla" :value="pais.codigo">
                                {{ pais.sigla }}
                            </option>
                        </select>

                        <input
                            v-model="telefonoCompleto"
                            name="phone"
                            type="tel"
                            class="border p-2 rounded-xl w-full border-[#cccccc] bg-[#F9F9F9] p-2"
                            :maxlength="select_code.length + 10"
                            :pattern="`^\\${select_code}\\d{10}$`"
                            :title="`Debe ser ${select_code} seguido de 10 dígitos`"
                            @input="asegurarPrefijo"
                            required
                        />

                    </div>
                </div>
                <div>
                    <p>Correo electrónico*</p>
                    <input class="border-1 border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl"
                           placeholder="correo@ejemplo.com"
                           pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                           type="email"
                           inputmode="email"
                           autocomplete="email"
                           title="Escribe un correo válido (debe incluir @ y un dominio, ej. nombre@dominio.com)"
                           required>
                </div>
            </div>
            <div>
                <label class="text-[#757575] flex gap-2 cursor-pointer">
                    <input name="whatssap_consent" type="checkbox" value="¿Podemos contactarte por WhatsApp?">
                    Contáctame por WhatsApp
                </label>
            </div>
            <div class="grid lg:grid-cols-3 lg:gap-3">
                <div>
                    <p>Pais*</p>
                    <select name="country" v-model="select_pais" class="w-full h-10.5 flex-none border border-[#cccccc] bg-[#F9F9F9] rounded-xl p-2 text-sm">
                        <option v-for="i in paises" :key="i" :value="i.pais"> {{ i.pais }} </option>
                    </select>
                </div>
                <div>
                    <p>Estado*</p>
                    <select name="state" v-model="select_estado" class="w-full h-10.5 flex-none border border-[#cccccc] bg-[#F9F9F9] rounded-xl p-2 text-sm">
                        <option disabled>Selecciona una Opcion</option>
                        <option v-for="i in estadosDis" :key="i" :value="i"> {{ i }} </option>
                    </select>
                </div>
                <div>
                    <p>Ciudad*</p>
                    <input name="city" class="border-1 border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl"
                           placeholder="Ciudad" required>
                </div>
            </div>
            <div class="grid grid-cols-1 gap-2">
                <div>
                    <p>Tipo de proyecto*</p>
                    <select class="border-1 border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl" required>
                        <option disabled value="">Selecciona una opción</option>
                        <option v-for="op in t_proyecto" :key="op" :value="op">{{ op }}</option>
                    </select>
                </div>

                <div class="flex flex-col gap-2">
                    <p class="font-bold">Datos del proyecto*</p>
                    <div class="grid grid-cols-4 gap-2">
                        <div>
                            <p>Producto</p>
                            <select v-model="nuevo.tipo" class="border border-[#cccccc]bg-[#F9F9F9] p-2 w-full rounded-xl" required>
                                <option>Ventana</option>
                                <option>Puerta</option>
                            </select>
                        </div>
                        <div>
                            <p>Cantidad</p>
                            <input v-model.number="nuevo.cantidad" type="number" name="cantidad" min="1" placeholder="Cantidad"
                                   class="border border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl" />
                        </div>
                        <div>
                            <p>Ancho</p>
                            <input v-model.number="nuevo.ancho" type="number" placeholder="cm"
                                   class="border border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl" />
                        </div>
                        <div>
                            <p>Alto</p>
                            <input v-model.number="nuevo.alto" type="number" placeholder="cm"
                                   class="border border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl" />
                        </div>
                    </div>
                    <div class="grid grid-cols-5 gap-2">
                        <div class="col-span-2">
                            <p>Apertura</p>
                            <select v-model="nuevo.apertura"
                                    class="border-1 border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl">
                                <option v-for="aper in nuevo.tipo === 'Ventana' ? aper_ventanas : aper_puertas">
                                    {{aper}}
                                </option>
                            </select>
                        </div>
                        <div class="col-span-2">
                            <p>Madera</p>
                            <select v-model="nuevo.madera"
                                    class="border-1 border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl">
                                <option v-for="mad in madera">
                                    {{mad}}
                                </option>
                            </select>
                        </div>
                        <div>
                            <p class="opacity-0">+</p>
                            <div @click="agregarProducto" class="bg-[#918164] cursor-pointer w-full h-10 flex items-center justify-center text-white px-4 rounded-xl  hover:bg-[#64563c]">
                                Agregar
                            </div>
                        </div>
                    </div>
                    <div v-if="productos.length > 0" class="relative flex flex-col w-full h-full overflow-x-auto shadow-md rounded-xl bg-clip-border">
                        <table class="w-full text-left table-auto min-w-max">
                            <thead class="bg-[#918164]/80 text-white">
                            <tr>
                                <th class="p-2">Tipo</th>
                                <th class="p-2">Apertura</th>
                                <th class="p-2">Madera</th>
                                <th class="p-2">Cantidad</th>
                                <th class="p-2">Ancho</th>
                                <th class="p-2">Alto</th>
                                <th class="p-2"></th>
                            </tr>
                            </thead>
                            <tbody class="text-[#858796]">
                            <tr v-for="(item, index) in productos" :key="index">
                                <td class="p-2" :class="{'border-b border-[#918164]': index !== productos.length - 1}">{{ item.tipo }}</td>
                                <td class="p-2" :class="{'border-b border-[#918164]': index !== productos.length - 1}">{{ item.apertura }}</td>
                                <td class="p-2" :class="{'border-b border-[#918164]': index !== productos.length - 1}">{{ item.madera }}</td>
                                <td class="p-2" :class="{'border-b border-[#918164]': index !== productos.length - 1}">{{ item.cantidad }}</td>
                                <td class="p-2" :class="{'border-b border-[#918164]': index !== productos.length - 1}">{{ item.ancho }} cm</td>
                                <td class="p-2" :class="{'border-b border-[#918164]': index !== productos.length - 1}">{{ item.alto }} cm</td>
                                <td class="p-2" :class="{'border-b border-[#918164]': index !== productos.length - 1}">
                                    <div @click="eliminarProducto(index)" class="text-black cursor-pointer font-bold hover:text-red-500" >
                                        Eliminar
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <p class="hidden">Datos*</p>
                        <input class="hidden" name="datos_proyecto" :value="datosProyecto">
                    </div>
                </div>
                <div>
                    <p>Detalles del proyecto*</p>
                    <textarea ref="textAreaRef"
                        class="border-1 border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl h-[100px]"
                        placeholder="Describe brevemente tu proyecto"></textarea>
                </div>
                <div>
                    <p>Subir archivo</p>
                    <input type="file" @change="onFileSelected" accept=".pdf,.doc,.docx,.jpg,.png">
                </div>
                <div>
                    <p class="hidden">Url Archivo*</p>
                    <input class="hidden" name="file_upload_url" :value="urlArchivo">
                </div>
                <p v-if="nombreArchivo" class="text-green-600 text-sm mt-1">
                    Archivo subido: {{ nombreArchivo }}
                    </p>
                <div>
                    <p class="hidden">
                        Nombre Archivo*
                    </p>
                <input class="hidden" name="name_archivo" :value="nombreArchivo">
                </div>

            </div>
            <button
                :disabled="archivo && archivoSubiendo"
                type="submit"
                class="bg-[#8A7753] rounded-full p-2 cursor-pointer text-white transition-all duration-300 ease-in-out lg:text-[1rem] lg:py-3 lg:mt-4 hover:translate-y-[-8px] hover:shadow-xl hover:bg-[#64563c] disabled:opacity-50 disabled:cursor-not-allowed">{{ archivo && archivoSubiendo ? 'Subiendo archivo...' : 'Enviar solicitud' }}</button>
        </div>

    </form>


    <div v-if="mostrarGracias" class="fixed inset-0 bg-black/10 z-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-xl text-center max-w-md mx-auto">
            <h2 class="text-xl font-bold text-[#918164] mb-4">¡Gracias por enviar tu formulario!</h2>
            <p class="mb-6">En breve nos pondremos en contacto contigo.</p>
            <router-link to="/" @click="mostrarGracias = false" class="bg-[#918164] text-white px-4 py-2 rounded-xl hover:bg-[#64563c]">
                Volver al inicio
            </router-link>
        </div>
    </div>

</template>

<style scoped>
input::file-selector-button {
    background-color: #918164;
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
