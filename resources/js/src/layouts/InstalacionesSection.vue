<script setup>
import DivCustom from "../../src/components/DivCustom.vue";
import SubtituloCustom from "../../src/components/SubtituloCustom.vue";
import ListaUbicaciones from "../../src/components/ListaUbicaciones.vue";
import BtnPrimaryNormal from "../../src/components/BtnPrimaryNormal.vue";
import SocialMedias from "../../src/components/SocialMedias.vue";
import {instalaciones} from "../data/instalaciones.js";
import {ref} from "vue";
import FormWhatsapp from "../components/FormWhatsapp.vue";
import BtnPrimaryRouter from "../components/BtnPrimaryRouter.vue";

const props = defineProps({
    tipo: {
        type: String,
        default: "mad"
    }
});
const val = ref(props.tipo === 'mad');
const seleccionado = ref(instalaciones[0].fabricas[0]);
const show = ref(false);

function openModal() {
    show.value = !show.value;
    document.body.style.overflow = show.value ? 'hidden' : '';
}


</script>

<template>
    <div-custom class="py-7 px-3 lg:px-0">
        <div class="w-full flex flex-col lg:gap-5">
            <subtitulo-custom subtitulo="Atendemos proyectos en todo México"/>
            <div v-for="s in instalaciones" class="w-full lg:h-[500px] flex flex-col gap-5 lg:gap-0 lg:flex-row">
                <div class="flex-1/4  lg:grid lg:grid-cols-1 lg:grid-rows-7 gap-5">
                    <div class="row-span-4 pt-8 flex flex-col gap-2">
                        <lista-ubicaciones title="SHOWROOM" :items="s.oficinas" :tipo="props.tipo" v-model:selected="seleccionado"/>
                        <lista-ubicaciones title="NUESTRA FÁBRICA" :items="s.fabricas" :tipo="props.tipo" v-model:selected="seleccionado"/>
                    </div>
                    <div class="row-span-3 px-3 pt-3 hidden lg:flex">
                        <div class="flex flex-col justify-center items-center gap-2 w-full h-full shadow-md" :class="val ? 'bg-[#657d88]/10 rounded-xl' : 'bg-white'">
                            <h4 class="text-lg font-bold text-center text-[#657d88]">¿Eres parte de la industria?</h4>
                            <p class="text-center px-3">{{val ? 'Forma parte de nuestro programa de aliados' : 'Agenda una visita privada'}}</p>
                            <btn-primary-normal v-if="val" :tipo="props.tipo" titulo="Agenda una Reunion" class="w-44" @click="openModal"/>
                            <btn-primary-normal v-else :tipo="props.tipo" titulo="Ver Más" class="w-40"/>
                        </div>
                    </div>
                </div>
                <div class="flex-3/4 bg-gray-300 p-2 shadow-lg" :class="val ? 'rounded-xl' : 'bg-white'">
                    <div class="flex flex-col lg:grid lg:grid-cols-2 w-full h-full">
                        <div class="flex flex-col justify-center gap-3 p-2">
                            <div class="flex justify-center items-center w-full h-70 overflow-hidden rounded-xl">
                                <img :src="seleccionado.img[0]" :alt="seleccionado.direccion" :title="seleccionado.name_o" class="w-full h-full object-cover"/>
                            </div>
                            <div class="hidden lg:grid grid-cols-3 gap-2">
                                <div v-for="j in seleccionado.img.slice(1,seleccionado.img.length)" class="overflow-hidden rounded-xl w-full h-25">
                                    <img :src="j" class="w-full h-full object-cover"/>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-5 justify-center w-full h-full px-2">
                            <div>
                                <h3 class="text-2xl font-bold" :class="val ? 'text-[#657d88]':''">{{seleccionado.name_a}}</h3>
                                <div class="w-full h-1.5" :class="val ? 'bg-[#657d88]' : 'bg-black'"></div>
                            </div>
                            <p class="h-18">{{seleccionado.direccion}}</p>
                            <div class="flex items-center">
                                <a class="flex-1" :href="'Tel:+'+seleccionado.telefono" @click="window.gtag_report_conversion('Tel:+'+seleccionado.telefono, 'phone_click')" onclick="return gtag_report_conversion(undefined,'phone_click')" target="_blank"><p><b>Tel:</b>+ {{ seleccionado.telefono }}</p></a>
                                <social-medias gap="3" tam="sm"/>
                            </div>
                            <iframe :src="seleccionado.url_map" @click="window.gtag_report_conversion(undefined,'physical_address_click')" onclick="return gtag_report_conversion(undefined,'physical_address_click')"></iframe>
                            <div class="flex justify-center lg:justify-start">
                                <btn-primary-router v-if="val" titulo="Planea tu Visita" link="/planea-visita" class="w-40"/>
                                <btn-primary-normal v-else :tipo="props.tipo" titulo="Ver Más" class="w-40"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col justify-center items-center gap-4 py-7 w-full h-full shadow-md lg:hidden" :class="val ? 'bg-[#657d88]/10 rounded-xl' : 'bg-white'">
                    <h4 class="text-lg font-bold text-center text-[#657d88]">¿Eres parte de la industria?</h4>
                    <p class="text-center px-3">{{val ? 'Forma parte de nuestro programa de aliados' : 'Agenda una visita privada'}}</p>
                    <btn-primary-normal v-if="val" :tipo="props.tipo" titulo="Agenda una Reunion" class="w-44" @click="openModal"/>
                    <btn-primary-normal v-else :tipo="props.tipo" titulo="Ver Más" class="w-40"/>
                </div>
            </div>
        </div>

        <form-whatsapp @click="openModal" :show="show"/>

    </div-custom>

</template>
