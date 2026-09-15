<script setup lang="ts">
import MainLayout from "../layouts/MainLayout.vue";
import {ins_merida} from "../data/instalaciones.js";
import {onMounted, ref} from "vue";
import ListaUbicaciones from "../components/ListaUbicaciones.vue";
import FormGrande from "../layouts/formGrande.vue";
import SocialMedias from "../components/SocialMedias.vue";

const seleccionado = ref<any>(null)
const val = ref('mad');
const openRe = ref(false);

// si usas el v-model:selected en <lista-ubicaciones>, este `seleccionado` se sincroniza
onMounted(() => {
    // toma el primer item de oficinas (Mérida)
    seleccionado.value = ins_merida[0]?.oficinas?.[0] || null
})

function openRequest(){
    openRe.value = !openRe.value;
    document.body.style.overflow = openRe.value ? 'hidden' : '';
}

</script>

<template>
    <main-layout>
        <div class="flex justify-center">
            <div class="w-full lg:max-w-[1150px] px-5 flex flex-col py-8 gap-5 lg:px-0">
                <div class="grid lg:grid-cols-2 gap-5">
                    <div class="border-b-3 pb-2 lg:p-0 lg:border-b-0 lg:border-r-3">
                        <p class="text-xl text-center lg:text-start lg:text-2xl font-light">La espera terminó:</p>
                        <h1 class="text-3xl text-center lg:text-start lg:text-6xl font-light text-[#918164]">¡AVE•NTA LLEGA A MERIDA!</h1>
                    </div>
                    <div class="flex items-center justify-end">
                        <h2 class="text-2xl lg:text-3xl lg:w-96 text-justify font-light">Un espacio para experimentar lo extraordinario, ahora mas cerca de ti.</h2>
                    </div>
                </div>

                <p class="text-2xl text-justify font-light mt-8">
                    AVE•NTA WINDOWS llega a Mérida con un showroom que redefine la manera de elegir puertas y ventanas.
                </p>
                <p class="text-2xl text-justify font-light">
                    Un espacio pensado para quienes saben que el verdadero lujo está en los detalles: la nobleza de la
                    madera, la innovación en su desempeño y la belleza que convierte cualquier proyecto en una
                    declaración de estilo.
                </p>


                <div class="flex  justify-center">
                    <div class="w-full lg:max-w-[1150px] flex flex-col py-8 lg:px-0">
                        <div class="flex flex-col md:flex-row lg:flex-row gap-[2vw] lg:gap-2 h-[800px] md:h-[300px] lg:h-[480px]">
                            <div class="flex-1/4 overflow-hidden duration-300 ease-in-out hover:brightness-90">
                                <img class="object-cover w-full h-full" :src="'/media/proyectos/valise.jpeg'"
                                     alt="nosotros_ventana">
                            </div>
                            <div class="flex-1/4 overflow-hidden duration-300 ease-in-out hover:brightness-90">
                                <img class="object-cover w-full h-full" :src="'/media/proyectos/agujas.jpeg'"
                                     alt="nosotros_interior">
                            </div>
                            <div class="flex-1/4 overflow-hidden duration-300 ease-in-out hover:brightness-90">
                                <img class="object-cover w-full h-full" :src="'/media/proyectos/ceballos.jpg'"
                                     alt="nosotros_exterior">
                            </div>
                            <div class="flex-1/4 overflow-hidden duration-300 ease-in-out hover:brightness-90">
                                <img class="object-cover w-full h-full" :src="'/media/proyectos/grullos.jpeg'"
                                     alt="nosotros_puerta">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid lg:grid-cols-2 gap-10">
                    <div class="text-2xl flex flex-col gap-5 font-light text-justify">
                        <p>
                            En nuestro showroom descubrirás piezas que
                            combinan belleza natural y tecnología
                            termoacústica.
                        </p>
                        <p>
                            Cada puerta y ventana integra estética y
                            funcionalidad, logrando interiores más
                            tranquilos y elegantes. Aquí podrás apreciar
                            texturas, acabados y aperturas en persona,
                            acompañado por un equipo de expertos que
                            entiende la importancia de elevar cada
                            proyecto a un nivel superior.
                        </p>
                        <p>
                            En Mérida abrimos más que un showroom:
                            abrimos toda una experiencia.
                            Cada creación AVE•NTA es la unión de
                            tradición artesanal y tecnología de vanguardia.
                            No son solo puertas y ventanas, son el inicio de
                            un nuevo estándar residencial y arquitectónico.
                            Hoy, ese estándar ya tiene dirección en tu
                            ciudad.
                        </p>
                    </div>
                    <div class="w-full h-full flex justify-center items-center">
                        <video
                            class="lg:w-[530px] lg:h-[530px] object-cover"
                            :src="'/media/Valise_merida.mp4'"
                            playsinline
                            muted
                            preload="auto"
                            controls
                        ></video>
                    </div>
                </div>

                <div class="grid lg:grid-cols-2 gap-5 lg:mt-12">
                    <div class="w-full h-full flex justify-center">
                        <video
                            class="lg:h-[530px] lg:w-[530px] object-cover"
                            :src="'/media/Aventa_Merida.mp4'"
                            playsinline
                            muted
                            preload="auto"
                            controls
                        ></video>
                    </div>
                    <div class="w-full h-full flex justify-center">
                        <video
                            class="lg:h-[530px] lg:w-[530px] object-cover"
                            :src="'/media/Merida_Est.mp4'"
                            playsinline
                            muted
                            preload="auto"
                            controls
                        ></video>
                    </div>
                </div>

                <div v-for="s in ins_merida" :key="'solo-merida'" class="w-full mt-4 lg:mt-8 lg:h-[500px] flex flex-col gap-5 lg:gap-0 lg:flex-row">
                    <div class="flex-1/4 lg:grid lg:grid-cols-1 lg:grid-rows-7 gap-5">
                        <div class="row-span-4 pt-8 flex flex-col gap-2">
                            <!-- Muestra fábrica solo si existe -->
                            <lista-ubicaciones
                                v-if="s.fabricas?.length"
                                :title="$t('ini_p16')"
                                :items="s.fabricas"
                                :tipo="val"
                                v-model:selected="seleccionado"
                            />
                            <lista-ubicaciones
                                :title="$t('loc_showroom')"
                                :items="s.oficinas"
                                :tipo="val"
                                v-model:selected="seleccionado"
                            />
                        </div>
                    </div>

                    <div class="flex-3/4 p-2 shadow-lg" :class="val === 'mad'  ? 'rounded-xl bg-gray-300' : 'bg-white'">
                        <div v-if="seleccionado" class="flex flex-col lg:grid lg:grid-cols-2 w-full h-full">
                            <div class="flex flex-col justify-center gap-3 p-2">
                                <div class="flex justify-center items-center w-full h-70 overflow-hidden rounded-xl">
                                    <img :src="seleccionado.img[0]" :alt="seleccionado.direccion" :title="seleccionado.name_o" class="w-full h-full object-cover" />
                                </div>
                                <div class="hidden lg:grid grid-cols-3 gap-2">
                                    <div v-for="(j,idx) in seleccionado.img.slice(1)" :key="idx" class="overflow-hidden rounded-xl w-full h-25">
                                        <img :src="j" class="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-col gap-5 justify-center w-full h-full px-2">
                                <div>
                                    <h3 class="text-2xl font-bold" :class="val ? 'text-[#918164]' : ''">{{ seleccionado.name_a }}</h3>
                                    <div class="w-full h-1.5" :class="val ? 'bg-[#918164]' : 'bg-black'"></div>
                                </div>

                                <p class="h-18">{{ seleccionado.direccion }}</p>

                                <div class="flex items-center">
                                    <!-- Mejor usa tel: en minúscula -->
                                    <a class="flex-1" :href="'tel:+' + seleccionado.telefono"
                                       @click="window.gtag_report_conversion('tel:+' + seleccionado.telefono, 'phone_click')"
                                       onclick="return gtag_report_conversion(undefined,'phone_click')"
                                       target="_blank">
                                        <p><b>Tel:</b> +{{ seleccionado.telefono }}</p>
                                    </a>
                                    <social-medias gap="3" tam="sm" />
                                </div>

                                <iframe
                                    :src="seleccionado.url_map"
                                    class="w-full h-64 rounded-lg border-0"
                                    loading="lazy"
                                    referrerpolicy="no-referrer-when-downgrade"
                                    @click="window.gtag_report_conversion(undefined,'physical_address_click')"
                                    onclick="return gtag_report_conversion(undefined,'physical_address_click')"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full mt-4 lg:mt-8 border mb-5 p-5 rounded-xl bg-white border-[#918164] flex flex-col gap-5 lg:gap-10 lg:flex-row lg:m-0">
                    <div class="flex-3/4">
                        <p class="text-[#918164] lg:text-4xl">¿Estás listo para empezar tu proyecto?</p>
                        <p class="italic lg:text-2xl">Contáctanos y hagamos que tu visión tome forma</p>
                    </div>
                    <div class="flex-1/4 flex justify-center items-center lg:pr-15">
                        <button
                            class="font-bold w-full text-center p-2 bg-[#918164] text-white rounded-lg transition-normal duration-300 hover:translate-y-[-8px] lg:py-4 lg:px-5 cursor-pointer" @click="openRequest"> Solicitar Cotización </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="openRe"
             class="fixed z-50 inset-0 bg-[rgba(0,0,0,0.2)] overflow-y-auto flex justify-center px-2 py-8 lg:px-0" @click.self="openRequest">
            <div class="w-full h-max lg:max-w-[1000px] lg:p-8 bg-white rounded-xl flex flex-col gap-3 lg:gap-5 shadow-xl">
                <div class="w-full flex justify-end p-4 lg:p-0">
                    <button @click="openRequest"
                            class="border rounded-lg py-1 px-2 text-[#cccccc] leading-none cursor-pointer transition-colors duration-300 hover:text-[#918164] lg:text-[1.5rem]">X</button>
                </div>

                <div class="w-full px-5 lg:px-10 flex flex-col gap-8 lg:gap-15">
                    <form-grande></form-grande>
                </div>
            </div>
        </div>
    </main-layout>
</template>

<style scoped>

</style>
