<script setup>

import {computed, onMounted, reactive, ref, watch} from "vue";
import axios from "axios";
import FormGrande from "../layouts/formGrande.vue";
import TittleCustom from "@/src/components/TittleCustom.vue";
import InstalacionesSection from "@/src/layouts/InstalacionesSection.vue";
import MainLayout from "@/src/layouts/MainLayout.vue";

const banner4 = "/media/banner_home/banner_4.jpg"

const fabricas = [
    {
        id: 1,
        name_o: "San Miguel de Allende",
        name_a: "SMA",
        direccion: "Rancho La Troje, Km. 3.0 Carretera a Dr. Mora, 37740 San Miguel de Allende, Gto.",
        telefono: "52 415 124 6467",
        url_map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29810.4936239773!2d-100.706664!3d20.939994!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842b5203d118f643%3A0xd0e2aa9f078c7471!2sLa%20Troje%20Proyectos%20en%20Carpinter%C3%ADa!5e0!3m2!1ses-419!2smx!4v1746809998482!5m2!1ses-419!2smx",
        img: [
            "/media/fab-sma.jpg",
            "/media/oficina_aventa.jpg",
            "/media/juntas_aventa.jpg",
            "/media/fabrica_aventa.jpg"
        ]
    }
]
const oficinas = [
    {
        id: 2,
        name_o: "Ciudad de México",
        name_a: "CDMX",
        direccion: "C. Guillermo Gonzalez Camarena 900, Santa Fe, Zedec Sta Fé, Álvaro Obregón, 01210 Ciudad de México, CDMX",
        telefono: "52 415 124 6467",
        url_map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30112.6437684656!2d-99.263563!3d19.365668!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d200c4f2756951%3A0xaf6f8628a1223a94!2sC.%20Guillermo%20Gonzalez%20Camarena%20900%2C%20Santa%20Fe%2C%20Zedec%20Sta%20F%C3%A9%2C%20%C3%81lvaro%20Obreg%C3%B3n%2C%2001210%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1746747802540!5m2!1ses-419!2smx",
        img: [
            "/media/ofi-cdmx.jpeg",
            "/media/oficdmx-1.jpeg",
            "/media/oficdmx-2.jpeg",
            "/media/oficdmx-3.jpeg"
        ]
    }
]


const itemSelectU = ref(fabricas[0]);
const indexU = ref(fabricas[0].id);

const openForm = ref(false);

function openFormW(){
    openForm.value = !openForm.value;
    document.body.style.overflow = openForm.value ? 'hidden' : '';
}
</script>

<template>

    <main-layout>
        <div class="flex justify-center relative h-[150px] lg:h-[300px]">
            <img class="absolute w-full h-full object-cover brightness-75 opacity-90" :src="banner4" alt="">

            <div class="relative w-full flex flex-col justify-center text-white lg:max-w-[1150px]">
                <tittle-custom titulo="Contáctanos para Recibir Asesoría Personalizada"/>
                <h2 class="italic text-white leading-none text-center text-xl lg:text-left lg:text-[1.8rem] lg:max-w-[500px]">¿Tienes algo en mente? Escríbenos.</h2>
            </div>
        </div>

        <instalaciones-section class="bg-[whitesmoke]"/>


        <div class="flex justify-center relative pb-20 pt-8">
            <div class="absolute inset-0 opacity-75"></div>

            <div class="flex flex-col w-full relative gap-2 px-5 lg:flex-row lg:max-w-[1150px]">
                <div class="flex-1/4 flex flex-col">
                    <p class="w-full text-[#657d88] italic font-semibold text-xl text-center lg:text-left">
                        Nuestro equipo de expertos está listo para apoyarte.
                    </p>
                </div>
                <div class="flex-3/4 lg:px-10">
                    <form-grande class="shadow-xl"></form-grande>
                </div>

            </div>


        </div>

        <div v-if="openForm" class="fixed inset-0 z-20 bg-black/20 p-5 lg:p-15 flex items-center justify-center" @click.self="openFormW">
            <div class="bg-white w-120 h-full rounded-xl flex flex-col gap-5 p-3 shadow-xl">
                <div class="w-full flex justify-end items-center">
                    <h2 class="flex-1 text-[#757575] text-xl">Escribe y nos pondremos en contacto</h2>
                    <button @click="openFormW"
                            class="border rounded-lg py-1 px-2 text-[#cccccc] leading-none cursor-pointer transition-colors duration-300 hover:text-[#918164] lg:text-[1.5rem]">X</button>
                </div>
                <div class="overflow-auto">
                    <div class="hs-form-frame" data-region="na1" data-form-id="e6b36d11-6197-4aa2-815f-9b13fd86cd41" data-portal-id="24148893"></div>
                </div>
            </div>
        </div>

    </main-layout>

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

</style>
