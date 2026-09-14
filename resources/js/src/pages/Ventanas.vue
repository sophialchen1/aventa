<script setup lang="ts">

import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import TittleCustom from "@/src/components/TittleCustom.vue";
import MainLayout from "@/src/layouts/MainLayout.vue";

const {t} = useI18n();

const img_home = "/media/ventanas_home.jpeg";

const beneficios = computed(() => [
    t('ven_ben1'),
    t('ven_ben2'),
    t('ven_ben3'),
    t('ven_ben4')
]);


const caracteristicas = computed(() => [
    t('ven_car1'),
    t('ven_car2'),
    t('ven_car3'),
    t('ven_car4'),
    t('ven_car5'),
    t('ven_car6')
]);

const vs = computed(() => [
    {op1: t('ven_vs1a'), op2: t('ven_vs1b')},
    {op1: t('ven_vs2a'), op2: t('ven_vs2b')},
    {op1: t('ven_vs3a'), op2: t('ven_vs3b')},
    {op1: t('ven_vs4a'), op2: t('ven_vs4b')}
]);

const openForm = ref(false);

function openFormW(){
    openForm.value = !openForm.value;
    document.body.style.overflow = openForm.value ? 'hidden' : '';
}

function dividirBeneficio(texto) {
    const [titulo, descripcion] = texto.split(':');
    return { titulo, descripcion };
}

</script>

<template>
    <main-layout>
        <div class="relative flex h-[250px] lg:h-[480px] justify-center">
            <img class="object-cover absolute w-full h-full transition-opacity duration-2000" :src="img_home"
                 alt="img_home">
            <div class="absolute inset-0 bg-gradient-to-tr from-[black] to-transparent opacity-90"></div>

            <div class="relative flex flex-col gap-8 justify-center w-full px-5 lg:px-0 md:max-w-[800px] lg:max-w-[1150px]">
                <div class="flex flex-col gap-0">
                    <tittle-custom :titulo="$t('ven_hero_titulo')"/>
                    <p class="text-white text-center leading-none lg:leading-7 italic tracking-wider lg:text-left lg:text-[1.8rem] lg:max-w-[900px]">
                        {{ $t('ven_hero_sub') }}
                    </p>
                </div>
                <div class="flex justify-center gap-2 lg:gap-5 lg:justify-start">
                    <router-link
                        class="font-bold w-fit text-sm py-2 px-1 bg-[#275A50] text-white rounded-lg transition-normal duration-300 hover:translate-y-[-8px] lg:py-4 lg:px-5" to="/inspiracion">
                        <div class="flex gap-3 items-center">
                            <p>{{ $t('cta_descubrir_disenos') }}</p>
                            <img class="w-[24px] h-[24px]" src="../assets/media/icons/angulo-pequeno-derecho.png"
                                 alt="icono_ir">
                        </div>
                    </router-link>
                    <button
                        class="font-bold w-fit bg-[#275A50] cursor-pointer text-sm py-2 px-1 text-white rounded-lg transition-normal duration-300 hover:translate-y-[-8px] lg:py-4 lg:px-5" @click="openFormW">
                        <div class="flex gap-3 items-center">
                            <p>{{ $t('cta_cotizar') }}</p>
                            <img class="w-[24px] h-[24px]" src="../assets/media/icons/angulo-pequeno-derecho.png"
                                 alt="icono_ir">
                        </div>
                    </button>
                </div>

            </div>

        </div>
        <!--2-->
        <div class="flex justify-center">
            <div class="w-full lg:max-w-[1150px] flex flex-col px-5 py-8 gap-5 lg:px-0">
                <h2 class="text-[1.7rem] text-center text-[#918164] italic lg:text-left lg:text-[2.5rem]">{{ $t('ven_equilibrio') }}</h2>
                <div class="flex flex-col w-full gap-5 lg:h-fit lg:gap-10 lg:flex-row">
                    <div class="flex-2/6 relative w-full h-full overflow-hidden rounded-xl">
                        <img class="object-cover h-[150px] md:h-100 lg:h-full w-full"
                             src="../assets/media/ventanas-landing.png" alt="">
                    </div>
                    <div class="flex-4/6 flex flex-col gap-8">
                        <div class="flex-none grid grid-cols-1 gap-y-2">
                            <h3 class="text-xl text-[#918164] italic font-bold tracking-wider mb-2 lg:text-[2rem]">{{ $t('ui_beneficios') }}</h3>
                            <div v-for="i in beneficios" class="flex gap-5 ">
                                <div class="w-[10px] h-[10px] bg-[#918164] rounded-full mt-1"></div>
                                <p class="text-[#757575] flex-1 lg:text-xl m-0 leading-5">
                                    <b>{{ dividirBeneficio(i).titulo }}:</b>{{ dividirBeneficio(i).descripcion }}
                                </p>
                            </div>
                        </div>
                        <div class="flex-none grid grid-cols-1 gap-y-2">
                            <h3 class="text-xl text-[#918164] italic font-bold tracking-wider mb-2 lg:text-[2rem]">{{ $t('ui_caracteristicas') }}</h3>
                            <div v-for="i in caracteristicas" class="flex gap-5 ">
                                <div class="w-[10px] h-[10px] bg-[#918164] rounded-full mt-1"></div>
                                <p class="text-[#757575] flex-1 lg:text-xl m-0 leading-5">{{ i }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <!--3-->
        <div class="flex justify-center">
            <div class="w-full px-5 lg:px-0 lg:max-w-[1150px] flex flex-col py-8 md:py-0">

                <div class="relative bg-white rounded-xl w-full h-max shadow-lg">
                    <div class="absolute hidden w-[800px] rounded-xl bg-[#E6E9EE] top-0 bottom-0 right-0 lg:flex"></div>

                    <div class="relative grid lg:px-10 lg:py-2">
                        <div class="grid grid-cols-3 text-sm pt-2 lg:pt-0 lg:text-base">
                            <div class="border-b-4 border-[#918164] px-2 lg:px-4 lg:py-2">
                                <p class="text-[#918164] font-bold lg:text-lg">{{ $t('ui_vs_titulo') }}</p>
                            </div>
                            <div class="border-b-4 border-[#918164] flex justify-center lg:py-2">
                                <p class="text-[#918164] font-bold lg:text-lg">Aventa</p>
                            </div>
                            <div class="border-b-4 border-[#918164] flex justify-center lg:py-2">
                                <p class="text-[#918164] font-bold lg:text-lg">{{ $t('ui_vs_otros') }}</p>
                            </div>
                        </div>

                        <div v-for="(i, index) in vs" :key="index" class="text-sm lg:text-base"
                             :class="['grid grid-cols-3', index !== vs.length - 1 ? 'border-b-2' : '']">
                            <div class=" px-2 lg:px-4  flex items-center">
                                <p class="text-[#757575]">{{ i.op1 }}</p>
                            </div>
                            <div class="lg:px-4 flex items-center justify-center">
                                <img class="w-7 h-7 lg:w-[40px] lg:h-[40px]" src="../assets/media/icons/comprobado.png" alt="comprobado">
                            </div>
                            <div class="lg:px-4 py-3 flex justify-center">
                                <div class="flex items-center justify-center gap-x-1 lg:gap-x-2">
                                    <img class="w-5 h-5 lg:w-[32px] lg:h-[32px]" src="../assets/media/icons/eliminar.png" alt="eliminar">
                                    <p class="hidden text-sm lg:w-[100px] text-[#757575] lg:flex lg:text-base">{{ i.op2 }}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        <div class="flex  justify-center">
            <div class="w-full lg:max-w-[1150px] px-5 flex flex-col py-8 lg:px-0">
                <div class="flex flex-col lg:flex-row gap-[2vw] h-[800px] lg:h-[350px] md:flex-row md:h-[300px]">
                    <div class="flex-1/4 rounded-xl overflow-hidden duration-300 ease-in-out hover:brightness-90">
                        <img class="object-cover w-full h-full" src="../assets/media/ventanas_car1.jpeg"
                             alt="nosotros_ventana">
                    </div>
                    <div class="flex-1/4 rounded-xl overflow-hidden duration-300 ease-in-out hover:brightness-90">
                        <img class="object-cover w-full h-full" src="../assets/media/ventanas_car2.jpeg"
                             alt="nosotros_interior">
                    </div>
                    <div class="flex-1/4 rounded-xl overflow-hidden duration-300 ease-in-out hover:brightness-90">
                        <img class="object-cover w-full h-full" src="../assets/media/ventanas_car3.jpeg"
                             alt="nosotros_exterior">
                    </div>
                    <div class="flex-1/4 rounded-xl overflow-hidden duration-300 ease-in-out hover:brightness-90">
                        <img class="object-cover w-full h-full" src="../assets/media/ventanas_car4.jpeg"
                             alt="nosotros_puerta">
                    </div>
                </div>
            </div>
        </div>

        <!--4-->
        <div class="flex justify-center">
            <div class="w-full lg:max-w-[1150px] py-8 px-5 lg:px-0">
                <div class="bg-white rounded-xl p-5 lg:p-10 border-1 border-[#918164] shadow-lg flex flex-col gap-5 lg:flex-row">
                    <div class="flex flex-col flex-1">
                        <h2 class="text-xl text-center text-[#918164] tracking-wider italic font-bold lg:text-left lg:text-[1.8rem]">{{ $t('ui_gran_entrada') }}</h2>
                        <p class="text-justify text-[#757575] md:text-center lg:text-left lg:text-xl">{{ $t('ven_cta_sub') }}</p>
                    </div>
                    <div class="flex-none flex flex-col  gap-4 items-center lg:flex-row lg:p-4">
                        <button class="bg-[#2B5A51] text-white lg:text-lg px-4 py-2 rounded-full cursor-pointer transition-normal duration-300 ease-in-out hover:shadow-xl" @click="openFormW">{{ $t('cta_asesoria') }}</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="openForm" class="fixed inset-0 z-20 bg-black/20 p-5 lg:p-15 flex items-center justify-center" @click.self="openFormW">
            <div class="bg-white w-120 h-full rounded-xl flex flex-col gap-5 p-3 shadow-xl">
                <div class="w-full flex justify-end items-center">
                    <h2 class="flex-1 text-[#757575] text-xl">{{ $t('form_escribe') }}</h2>
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

</style>
