<script setup lang="ts">

import Navbar from "../components/navbar.vue";
import ContactBar from "../components/contactBar.vue";
import Bottombar from "../components/bottombar.vue";
import {onMounted, ref} from "vue";
import FormWhatsapp from "../components/FormWhatsapp.vue";
import VsModal from "../layouts/VsModal.vue";
import { useGlbPreload } from '../composables/useGlbPreload.js';
import IconCustom from "../components/IconCustom.vue";
import {useRoute} from "vue-router";

const {preload , status} = useGlbPreload('/models/house_aventa.glb');

const openForm = ref(false);
const opend = ref(false);
const router = useRoute();

function openModalD(){
    opend.value = !opend.value;
    document.body.style.overflow = opend.value ? 'hidden' : '';
}

function openFormW(){
    openForm.value = !openForm.value;
    document.body.style.overflow = openForm.value ? 'hidden' : '';
}

onMounted(() => {
    if (status.value !== 'loaded') preload();
})
</script>

<template>
    <contact-bar/>
    <navbar/>
    <div class="w-full h-full">
        <slot/>
    </div>
    <bottombar/>

    <div class="flex flex-col gap-2 justify-end items-end w-fit h-fit fixed z-10 lg:z-50 bottom-2 right-2 lg:bottom-5 lg:right-5">

        <!--<div class="flex gap-5 items-center">
            <div class="relative flex items-center group">
                <div
                    class="absolute right-full mr-3 px-4 py-2 rounded-xl bg-gray-800 text-white font-semibold text-sm shadow-lg
                   opacity-0 scale-95 translate-y-1
                   group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
                   transition-all duration-200"
                >
                    <p>Diseña tu experiencia</p>
                </div>

                <router-link
                    v-if="router.path != '/design-experience'"
                    to="/design-experience"
                    class="bg-gray-900 rounded-full flex p-2.5 text-white opacity-60 transition-opacity duration-300 ease-in-out hover:opacity-100"
                >
                    <icon-custom icon="galaxy-star" size="2xl"/>
                </router-link>
            </div>
        </div>-->


        <div class="bg-[#918164] rounded-full w-fit h-fit p-2 cursor-pointer opacity-60 transition-opacity duration-300 ease-in-out hover:opacity-100"
             :class="{'opacity-100' : opend}"
             @click="openModalD">
            <img class="w-8 h-8" src="../../src/assets/media/icons/3d.png" alt="">
        </div>

        <div class="flex cursor-pointer rounded-full p-2.5 bg-[#25D366] opacity-40 transition-opacity duration-300 ease-in-out hover:opacity-100" :class="{'opacity-100' : openForm}" @click="[openFormW(), window.gtag_report_conversion(undefined,'whatsapp')]" onclick="return gtag_report_conversion(undefined,'whatsapp')">
            <img class="w-7 h-7 lg:w-10 lg:h-10" src="../../src/assets/media/icons/whatsapp.png" alt="">
        </div>

    </div>

    <form-whatsapp @click="openFormW" :show="openForm"/>
    <vs-modal @click="openModalD" :show="opend"/>



</template>

<style scoped>

</style>
