<script setup>
import FormGrande from "../layouts/formGrande.vue";
import TittleCustom from "@/src/components/TittleCustom.vue";
import { inspiracion } from "../data/catalogos.js";
import MainLayout from "@/src/layouts/MainLayout.vue";
import SwiperSection from "@/src/layouts/SwiperSection.vue";
</script>

<template>
    <main-layout>
        <div class="flex justify-center relative h-[150px] lg:h-[300px]">
            <img class="absolute w-full h-full object-cover brightness-85 opacity-90"
                 :src="'/media/banner_home/banner_8.jpeg'" alt="">

            <div class="relative w-full flex flex-col justify-center text-white lg:max-w-[1150px]">
                <tittle-custom titulo="Ideas y Estilos para Inspirar Tu Proyecto con Aventa Windows"/>
            </div>
        </div>

        <div class="flex justify-center">
            <div class="w-full lg:max-w-[1150px] flex flex-col gap-5 p-5 lg:px-0 lg:py-12 lg:flex-row">
                <h2 class="flex-2/5 h-full w-full leading-none italic tracking-wider text-[1.7rem] text-center lg:text-left lg:text-[2.5rem]">Despierta tu Creatividad</h2>
                <p class="flex-3/5 w-full text-[#757575] lg:text-xl text-justify ">En esta sección encontrarás ideas,
                    combinaciones y recomendaciones para elegir
                    el diseño ideal de tu puerta o ventana. Te mostramos diferentes configuraciones y
                    aplicaciones reales que pueden ayudarte a visualizar lo que mejor se adapta a tu
                    espacio.</p>
            </div>
        </div>

        <swiper-section :array="inspiracion"/>

        <div class="flex justify-center">
            <div class="w-full lg:max-w-[1150px] p-5 lg:px-0 lg:py-12 flex flex-col gap-5 lg:flex-row">
                <h3 class="flex-1/2 w-full italic font-semibold text-xl text-center text-[#657d88] tracking-wider lg:text-left lg:text-[1.8rem]">
                    ¿Buscas ideas para tu proyecto?
                </h3>
                <div class="flex-1/2 flex flex-col gap-5">
                    <p class="text-[#757575] text-justify lg:text-lg">
                        Este documento te dará una visión integral de nuestras líneas de puertas y ventanas, con especificaciones, estilos y soluciones a tu medida.
                    </p>
                    <div class="flex justify-center lg:justify-start">
                        <a class="bg-[#ee7465] w-fit px-5 py-2 text-white rounded-xl hover:shadow-xl"
                           :href="'/media/docs/Copy%20of%20DESIGN%20INSPIRATION%20COMP.pdf'" download>Descargar Guía</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-center">
            <div class="w-full flex flex-col gap-5 p-5 lg:px-0 lg:max-w-[1150px]">
                <h2 class="w-full italic text-xl text-center lg:text-left lg:text-[2rem]">
                    ¿Estás buscando ayuda para cotizar tu proyecto?
                </h2>
            </div>
        </div>

        <div class="flex justify-center relative pb-20 pt-8">
            <div class="absolute inset-0 opacity-75"></div>

            <div class="flex flex-col w-full relative gap-2 px-5 lg:flex-row lg:max-w-[1150px]">
                <div class="flex-1/4 flex flex-col">
                    <p class="w-full text-[#657d88] italic font-semibold text-xl text-center lg:text-left">
                        Nuestro equipo de expertos está listo para apoyarte.
                    </p>
                </div>
                <div class="flex-3/4 lg:px-10">
                    <form-grande class="rounded-xl shadow-xl"></form-grande>
                </div>

            </div>


        </div>

    </main-layout>
</template>

<style scoped>
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
    color: #ee7465;
    z-index: 10;
}

:deep(.swiper-pagination-bullet-active) {
    background-color: #ee7465;
}

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
