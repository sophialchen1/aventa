<script setup lang="ts">

import { useI18n } from "vue-i18n";
import {ref} from "vue";
import SocialMedias from "../components/SocialMedias.vue";

const { t } = useI18n();

const links = [
    {
        title: t('nav_inicio'),
        href: "/"
    },
    {
        title: t('nav_puertas'),
        href: "/puertas"
    },
    {
        title: t('nav_ventanas'),
        href: "/ventanas"
    },
    {
        title: t('nav_cocomprar'),
        href: "/comprar"
    },
    {
        title: t('nav_contact'),
        href: "/contacto"
    }
]

const openForm = ref(false);

function openFormW(){
    openForm.value = !openForm.value;
    document.body.style.overflow = openForm.value ? 'hidden' : '';
}


</script>


<template>

    <div class="bg-[rgba(0,0,0,0.8)] flex justify-center pt-8 pb-2">
        <div class="w-full px-5 lg:px-0 lg:max-w-[1150px] flex flex-col gap-12">

            <div class="flex flex-col w-full lg:flex-row">
                <div class="flex-1/4 flex flex-col items-center justify-center gap-2">
                    <router-link to="">
                        <img class="w-[110px] h-auto " src="../assets/media/aventaLogoblanco.png">
                    </router-link>
                    <div class="flex w-full gap-2 lg:flex-col lg:justify-center lg:items-center">
                        <router-link
                            class=" flex-1/2 text-center border border-white/20 rounded-xl py-3 bg-white/10 text-[#ee7465]/60 hover:bg-white/20 hover:text-[#ee7465] hover:shadow-lg transition-all duration-300 lg:w-50"
                            to="/inspiracion">Inspiración de Diseño</router-link>
                        <button
                            class="flex-1/2 text-center border border-white/20 rounded-xl cursor-pointer py-3 bg-white/10 text-[#ee7465]/60 hover:bg-white/20 hover:text-[#ee7465] hover:shadow-lg transition-all duration-300 lg:w-50" @click="openFormW">Escríbenos</button>
                    </div>
                </div>
                <div class="my-3 h-[1px] bg-[rgba(255,255,255,0.3)] flex-none lg:w-[1px] lg:h-full lg:m-0"></div>
                <div class="flex-2/4 flex flex-col px-4 gap-4 lg:flex-row">
                    <div class="flex-1/3 flex flex-col gap-1 lg:gap-2">
                        <h2 class="text-white">SOBRE AVENTA</h2>
                        <ul class="text-[rgba(255,255,255,0.3)] underline grid grid-cols-2 gap-0.5 lg:gap-1.5 lg:flex lg:flex-col lg:no-underline">
                            <li class="hover:underline hover:text-white"><router-link to="">Nosotros</router-link></li>
                            <li class="hover:underline hover:text-white"><router-link
                                    to="/puertas">Puertas</router-link></li>
                            <li class="hover:underline hover:text-white"><router-link
                                    to="/ventanas">Ventanas</router-link></li>
                            <li class="hover:underline hover:text-white">
                                <router-link to="/recursos-profesionales">Recursos</router-link>
                            </li>
                            <li class="hover:underline hover:text-white"><router-link
                                    to="/contacto">Contacto</router-link></li>
                        </ul>
                    </div>
                    <div class="flex-1/3 flex flex-col gap-2">
                        <h2 class="text-white">CÓMO COMPRAR</h2>
                        <ul class="text-[rgba(255,255,255,0.3)] underline grid grid-cols-2 gap-0.5  lg:flex lg:flex-col lg:gap-1.5 lg:no-underline">
                            <li class="hover:underline hover:text-white"><router-link to="/catalogo">Ver
                                    Catálogo</router-link>
                            </li>
                            <li class="hover:underline hover:text-white"><router-link to="/inspiracion">Inspiración de
                                    Diseño</router-link></li>
                            <li class="hover:underline hover:text-white"><router-link to="/planea-visita">Planea tu
                                    Visita</router-link></li>
                        </ul>
                    </div>
                    <div class="flex-1/3 flex flex-col gap-2">
                        <h2 class="text-white">LEGALES</h2>
                        <ul class="text-[rgba(255,255,255,0.3)] underline grid grid-cols-2 gap-0.5 lg:flex lg:flex-col lg:gap-1.5 lg:no-underline">
                            <li class="hover:underline hover:text-white"><router-link to="/aviso-privacidad">Aviso de
                                    Privacidad</router-link></li>
                            <li class="hover:underline hover:text-white"><router-link to="/condiciones-venta">Condiciones de Venta</router-link></li>
                            <li class="hover:underline hover:text-white"><router-link to="/condiciones-compra">Condiciones de Compra</router-link></li>
                            <li class="hover:underline hover:text-white"><router-link to="/politica-de-garantia">Política de Garantía</router-link></li>

                        </ul>
                    </div>
                </div>
                <div class="my-3 h-[1px] bg-[rgba(255,255,255,0.3)] flex-none lg:w-[1px] lg:h-full lg:m-0"></div>
                <div class="flex-1/4 flex justify-center h-fit">
                    <social-medias tam="xl" gap="5" color="blanco"/>
                </div>
            </div>

            <div class="flex w-full justify-center">
                <p class="text-[rgba(255,255,255,0.3)] text-center">Copyright © 2025 Aventa Windows All Rights Reserved | Powered by
                    <a href="https://wondermedia.com.mx" class="underline hover:text-white">Wonder Media</a>
                </p>
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


</template>

<style scoped></style>
