<script setup>
import {computed, ref} from 'vue'
import '@vuepic/vue-datepicker/dist/main.css'
import TittleCustom from "../components/TittleCustom.vue";
import MainLayout from "../layouts/MainLayout.vue";
import {telefonia} from "../data/paises.js";

const detalles_v = [
    'Ver tocar diferentes tipos de madera y acabados',
    'Conocer nuestras opciones de diseño y aperturas',
    'Resolver todas tus dudas con un asesor especializado',
    'Recibir orientacion tecnica si eres arquitecto o desarrollador'
]

const motivo_v = [
    'CDMX',
    'SMA',
    'Mérida'
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

const textAreaRef = ref(null);
const mostrarGracias = ref(false);

const enviarFormulario = (e) => {
    const form = e.target.closest('form');

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

</script>

<template>
    <main-layout>
        <div class="flex justify-center relative h-[150px] lg:h-[300px]">
            <img class="absolute w-full h-full object-cover brightness-85 opacity-90" :src="'/media/banner_home/banner_2.jpg'" alt="">

            <div class="relative w-full flex flex-col justify-center text-white lg:max-w-[1150px]">
                <tittle-custom titulo="Planea Tu Visita a Nuestro Showroom o Fábrica"/>
            </div>
        </div>

        <div class="flex justify-center">
            <div class="w-full lg:max-w-[1150px] flex flex-col gap-5 p-5 lg:px-0 lg:flex-row lg:py-12">
                <h2 class="flex-2/5 h-full w-full text-[1.7rem] text-center leading-none italic tracking-wider lg:text-left lg:text-[2.5rem]">¿Prefieres una atención
                    más personalizada?</h2>
                <div class="flex-3/5 flex flex-col gap-5 text">
                    <p class="text-[#757575] lg:text-lg">
                        Agenda una cita para visitar nuestro showroom y conoce de cerca la calidad, diseño y
                        funcionalidad de nuestras puertas y ventanas.
                    </p>
                    <div class="flex flex-col gap-1">
                        <p class="text-[#757575] mb-2 lg:text-lg">Durante tu visita podrás:</p>
                        <div v-for="i in detalles_v" class="flex gap-2 items-center">
                            <div class="w-2 h-2 bg-[#918164] rounded-full"></div>
                            <p class="text-[#918164] lg:text-lg">{{i}}</p>
                        </div>
                    </div>
                    <p class="text-[#757575] lg:text-lg">
                        Cuéntanos un poco sobre ti, tu proyecto y cuándo te gustaría venir. Estamos aquí para ayudarte a tomar la mejor decisión para tu espacio.<br><br>
                        Atendemos únicamente con cita previa para ofrecerte una mejor experiencia.
                    </p>
                </div>
            </div>
        </div>

        <div class="flex justify-center relative pt-8 pb-20">
            <div class="absolute inset-0 opacity-75"></div>

            <div class="flex flex-col w-full relative gap-2 px-5 lg:px-0 lg:flex-row lg:max-w-[1150px]">
                <div class="flex-1/4 flex flex-col">
                    <p class="w-full text-[#918164] italic font-semibold text-xl">Nuestro equipo de expertos está listo para ayudarte a definir los detalles de tu proyecto.</p>
                </div>
                <div class="flex-3/4 lg:px-10">
                    <form name="planear_visita" class="flex-1" action="" @submit.prevent="enviarFormulario">
                        <div class="flex flex-col bg-white p-2 gap-5 lg:p-10 rounded-xl shadow-xl">
                            <h3 class="font-bold text-[#918164] lg:text-[1.5rem]">Planea tu visita</h3>
                            <div class="grid lg:grid-cols-2 lg:gap-3">
                                <div>
                                    <p>Nombre (s)*</p>
                                    <input class="border-1 border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl" placeholder="Escribe tu nombre" required>
                                </div>
                                <div>
                                    <p>Apellidos*</p>
                                    <input class="border-1 border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl" placeholder="Escribe tus apellidos" required>
                                </div>
                                <div>
                                    <p>Teléfono*</p>
                                    <div class="flex gap-1">
                                        <select v-model="select_code" @change="cambiarLada" class="border p-2 rounded-xl bg-[#F9F9F9] border-[#cccccc]">
                                            <option v-for="pais in telefonia" :key="pais.codigo + pais.sigla" :value="pais.codigo">
                                                {{ pais.sigla }}
                                            </option>
                                        </select>

                                        <input
                                            v-model="telefonoCompleto"
                                            name="phone"
                                            type="tel"
                                            class="border rounded-xl w-full border-[#cccccc] bg-[#F9F9F9] p-2"
                                            :maxlength="20"
                                            @input="asegurarPrefijo"
                                            required
                                        />
                                    </div>

                                </div>
                                <div>
                                    <p>Correo electrónico*</p>
                                    <input
                                        name="email"
                                        class="border-1 border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl"
                                        placeholder="correo@ejemplo.com"
                                        type="email"
                                        required
                                        inputmode="email"
                                        autocomplete="email"
                                        pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
                                        title="Escribe un correo válido (debe incluir @ y un dominio, ej. nombre@dominio.com)"
                                    >
                                </div>
                            </div>
                            <div class="grid lg:grid-cols-2 lg:gap-2">
                                <div>
                                    <p>Qué ubicación quieres visitar</p>
                                    <select class="border-1 border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl">
                                        <option disabled value="">Selecciona una opción</option>
                                        <option v-for="op in motivo_v" :key="op" :value="op" >{{op}}</option>
                                    </select>
                                </div>
                                <div>
                                    <p>¿Cuando te gustaría visitarnos?</p>
                                    <!--<date-picker v-model="fecha"></date-picker>-->
                                    <input class="border-1 border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl" type="datetime-local">
                                </div>
                            </div>
                            <div>
                                <p>Cuéntanos sobre ti, tu proyecto</p>
                                <textarea ref="textAreaRef" name="datos_cotizacion" class="border-1 border-[#cccccc] bg-[#F9F9F9] p-2 w-full rounded-xl h-[100px]" placeholder="Describe brevemente tu proyecto"></textarea>
                            </div>
                            <div>
                                <label class="text-[#757575] flex gap-2 cursor-pointer">
                                    <input name="whatsapp_consent" type="checkbox" value="¿Podemos contactarte por WhatsApp?">
                                    ¿Podemos contactarte por WhatsApp?
                                </label>
                            </div>

                            <button type="submit" class="bg-[#8A7753] rounded-full cursor-pointer p-2 text-white transition-all duration-300 ease-in-out lg:text-[1rem] lg:py-3 lg:mt-4 hover:translate-y-[-8px] hover:shadow-xl hover:bg-[#64563c]" >Enviar solicitud</button>
                        </div>

                    </form>
                </div>

            </div>

        </div>

        <div v-if="mostrarGracias" class="fixed inset-0 bg-black/10 z-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded-xl text-center max-w-md mx-auto">
                <h2 class="text-xl font-bold text-[#918164] mb-4">¡Gracias por enviar tu formulario!</h2>
                <p class="mb-6">En breve nos pondremos en contacto contigo.</p>
                <router-link to="/" @click="mostrarGracias = false" class="bg-[#918164] text-white px-4 py-2 rounded-xl hover:bg-[#64563c]">
                    Volver al inicio
                </router-link>
            </div>
        </div>
    </main-layout>
</template>

<style scoped>
form p {
    color: #757575;
}
</style>
