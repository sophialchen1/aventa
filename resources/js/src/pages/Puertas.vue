<script setup>

import {ref} from "vue";
import TittleCustom from "@/src/components/TittleCustom.vue";
import MainLayout from "@/src/layouts/MainLayout.vue";

const img_home = "/media/puertas_home.JPG";

const openForm = ref(false);

function openFormW(){
    openForm.value = !openForm.value;
    document.body.style.overflow = openForm.value ? 'hidden' : '';
}


</script>

<template>
    <main-layout>
        <!--1-->
        <div class="relative flex h-[250px] lg:h-[480px] justify-center">
            <img class="object-cover absolute w-full h-full transition-opacity duration-2000" :src="img_home"
                 alt="img_home">
            <div class="absolute inset-0 bg-gradient-to-tr from-[black] to-transparent opacity-90"></div>

            <div class="relative flex flex-col px-5 gap-8 justify-center w-full lg:max-w-[1150px]">
                <div class="flex flex-col gap-0">
                    <tittle-custom :titulo="$t('pue_hero_h1')"/>
                    <h2 class="text-center text-white leading-none italic tracking-wider text-base lg:leading-7 lg:text-left lg:text-[1.8rem] lg:max-w-[900px]">{{ $t('pue_hero_sub') }}
                    </h2>
                </div>
                <div class="flex justify-center gap-2 lg:gap-5 lg:justify-start">
                    <router-link
                        class="font-bold items-center w-fit py-2 px-1 bg-[#ee7465] text-white rounded-lg transition-normal duration-300 hover:translate-y-[-8px] lg:flex-none lg:py-4 lg:px-5"
                        to="/design-experience">
                        <div class="flex gap-3 items-center text-sm lg:text-base">
                            <p>{{ $t('pue_hero_cta1') }}</p>
                            <img class="w-[24px] h-[24px]" src="../assets/media/icons/angulo-pequeno-derecho.png"
                                 alt="icono_ir">
                        </div>
                    </router-link>
                    <button
                        class="font-bold items-center w-fit py-2 cursor-pointer px-1 bg-[#ee7465] text-white rounded-lg transition-normal duration-300 hover:translate-y-[-8px] lg:py-4 lg:px-5" @click="openFormW">
                        <div class="flex gap-1 items-center text-sm lg:text-base">
                            <p>{{ $t('pue_hero_cta2') }}</p>
                            <img class="w-[24px] h-[24px]" src="../assets/media/icons/angulo-pequeno-derecho.png"
                                 alt="icono_ir">
                        </div>
                    </button>
                </div>

            </div>

        </div>
        <!--2-->
        <div class="flex justify-center">
            <div class="w-full lg:max-w-[1150px] px-5 flex flex-col py-8 gap-5 lg:px-0">
                <h2
                    class="text-[1.55rem] text-center text-[#657d88] italic lg:text-left lg:text-[2.25rem]"
                >
                    {{ $t('pue_tagline') }}
                </h2>

                <div class="flex flex-col w-full h-max gap-6 lg:gap-10 lg:flex-row">
                    <!-- Imagen -->
                    <div
                        class="h-[230px] md:h-[380px] lg:h-[520px] overflow-hidden rounded-xl lg:basis-[35%] lg:flex-none"
                    >
                        <img
                            class="h-full w-full object-cover"
                            src="../assets/media/puertas.png"
                            alt="Puerta de madera abierta hacia exterior"
                            title="Puertas de madera"
                        />
                    </div>

                    <!-- Textos -->
                    <div class="lg:basis-[65%] flex flex-col justify-center gap-8">
                        <!-- Beneficios -->
                        <div class="grid grid-cols-1 gap-y-2">
                            <h3
                                class="text-xl text-[#657d88] italic font-bold tracking-wider mb-2 lg:text-[2rem]"
                            >
                                {{ $t('pue_benefits_title') }}
                            </h3>

                            <div class="flex gap-3">
                                <div class="w-[7px] h-[7px] bg-[#657d88] rounded-full mt-2 flex-none"></div>
                                <p class="text-[#757575] flex-1 text-sm lg:text-base m-0 leading-5" v-html="$t('pue_benefit1')"></p>
                            </div>

                            <div class="flex gap-3">
                                <div class="w-[7px] h-[7px] bg-[#657d88] rounded-full mt-2 flex-none"></div>
                                <p class="text-[#757575] flex-1 text-sm lg:text-base m-0 leading-5" v-html="$t('pue_benefit2')"></p>
                            </div>

                    <div class="flex gap-3">
                        <div class="w-[7px] h-[7px] bg-[#657d88] rounded-full mt-2 flex-none"></div>
                        <p class="text-[#757575] flex-1 text-sm lg:text-base m-0 leading-5" v-html="$t('pue_benefit3')"></p>
                    </div>

                    <div class="flex gap-3">
                        <div class="w-[7px] h-[7px] bg-[#657d88] rounded-full mt-2 flex-none"></div>
                        <p class="text-[#757575] flex-1 text-sm lg:text-base m-0 leading-5" v-html="$t('pue_benefit4')"></p>
                    </div>
                </div>

                <!-- Características -->
                <div class="grid grid-cols-1 gap-y-2">
                    <h3
                        class="text-xl text-[#657d88] italic font-bold tracking-wider mb-2 lg:text-[2rem]"
                    >
                        {{ $t('pue_details_title') }}
                    </h3>

                    <div class="flex gap-3">
                        <div class="w-[7px] h-[7px] bg-[#657d88] rounded-full mt-2 flex-none"></div>
                        <p class="text-[#757575] flex-1 text-sm lg:text-base m-0 leading-5" v-html="$t('pue_detail1')"></p>
                    </div>

                    <div class="flex gap-3">
                        <div class="w-[7px] h-[7px] bg-[#657d88] rounded-full mt-2 flex-none"></div>
                        <p class="text-[#757575] flex-1 text-sm lg:text-base m-0 leading-5" v-html="$t('pue_detail2')"></p>
                    </div>

                    <div class="flex gap-3">
                        <div class="w-[7px] h-[7px] bg-[#657d88] rounded-full mt-2 flex-none"></div>
                        <p class="text-[#757575] flex-1 text-sm lg:text-base m-0 leading-5" v-html="$t('pue_detail3')"></p>
                    </div>

                    <div class="flex gap-3">
                        <div class="w-[7px] h-[7px] bg-[#657d88] rounded-full mt-2 flex-none"></div>
                        <p class="text-[#757575] flex-1 text-sm lg:text-base m-0 leading-5" v-html="$t('pue_detail4')"></p>
                    </div>

                    <div class="flex gap-3">
                        <div class="w-[7px] h-[7px] bg-[#657d88] rounded-full mt-2 flex-none"></div>
                        <p class="text-[#757575] flex-1 text-sm lg:text-base m-0 leading-5" v-html="$t('pue_detail5')"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        <!--3-->
        <div class="flex justify-center">
    <div class="w-full px-5 lg:px-0 lg:max-w-[1150px] flex flex-col py-8">
        <h2 class="text-center text-xl lg:text-2xl text-black mb-3">
            Desempeño o estructura
        </h2>

        <div class="w-full overflow-x-auto">
            <table class="w-full min-w-[800px] border-collapse text-xs lg:text-sm text-black">
                <thead>
                    <tr>
                        <th class="w-[28%] px-4 py-2 text-center font-normal border-0"></th>
                        <th class="w-[38%] px-4 py-2 text-center font-normal border-0">
                            Aventa Wood
                        </th>
                        <th class="w-[34%] px-4 py-2 text-center font-normal border-0">
                            Carpintería tradicional
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td class="border-[3px] border-black px-4 py-5 text-center font-bold">
                            Estabilidad
                        </td>
                        <td class="border-[3px] border-black px-4 py-5 text-center font-bold">
                            Madera laminada: No se deforma ni se tuerce
                        </td>
                        <td class="border-[3px] border-black px-4 py-5 text-center font-bold">
                            Se hincha o agrieta
                        </td>
                    </tr>

                    <tr>
                        <td class="border-[3px] border-black px-4 py-5 text-center font-bold">
                            Aislamiento
                        </td>
                        <td class="border-[3px] border-black px-4 py-5 text-center">
                            <b>Triple sello:</b> Bloquea ruido, frío y calor.<br />
                            Doble acristalamiento con cámara de aire:
                            &#40;a elegir depende a las características del proyecto,
                            aplicable si la pieza lo requiere&#41;.
                        </td>
                        <td class="border-[3px] border-black px-4 py-5 text-center">
                            Filtraciones de aire, ruido y temperatura.<br />
                            Vidrio monolítico sencillo.
                        </td>
                    </tr>

                    <tr>
                        <td class="border-[3px] border-black px-4 py-5 text-center font-bold">
                            Protección
                        </td>
                        <td class="border-[3px] border-black px-4 py-5 text-center">
                            Antiparásitos y tintas UV, acabado de poro abierto:
                            no forma una capa plastificada.
                        </td>
                        <td class="border-[3px] border-black px-4 py-5 text-center">
                            Vulnerable al daño: Propensa a plagas y pudrición.
                            Acabado plastificado.
                        </td>
                    </tr>

                    <tr>
                        <td class="border-[3px] border-black px-4 py-5 text-center font-bold">
                            Seguridad
                        </td>
                        <td class="border-[3px] border-black px-4 py-5 text-center">
                            Herraje europeo con múltiples puntos de cierre en la periferia
                            resistente a climas extremos.
                        </td>
                        <td class="border-[3px] border-black px-4 py-5 text-center">
                            Herrajes tradicionales propensos a intrusiones y oxidación.
                        </td>
                    </tr>

                    <tr>
                        <td class="border-[3px] border-black px-4 py-5 text-center font-bold">
                            Mantenimiento
                        </td>
                        <td class="border-[3px] border-black px-4 py-5 text-center">
                            No necesita químicos o productos adicionales.
                        </td>
                        <td class="border-[3px] border-black px-4 py-5 text-center">
                            Requiere de barnices que encapsulan más la madera.
                        </td>
                    </tr>

                    <tr>
                        <td class="border-[3px] border-black px-4 py-5 text-center font-bold">
                            Materiales sustentables
                        </td>
                        <td class="border-[3px] border-black px-4 py-5 text-center">
                            Certificación FSC y fabricación sustentable.
                        </td>
                        <td class="border-[3px] border-black px-4 py-5 text-center">
                            Origen y procedencia desconocido propiciando la tala prohibida de árboles.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

        <div class="flex  justify-center">
            <div class="w-full lg:max-w-[1150px] px-5 flex flex-col py-8 lg:px-0">
                <div class="flex flex-col md:flex-row lg:flex-row gap-[2vw] h-[800px] md:h-[300px] lg:h-[350px]">
                    <div class="flex-1/4 rounded-xl overflow-hidden duration-300 ease-in-out hover:brightness-90">
                        <img class="object-cover w-full h-full" src="../assets/media/puertas_car1.png"
                             alt="nosotros_ventana">
                    </div>
                    <div class="flex-1/4 rounded-xl overflow-hidden duration-300 ease-in-out hover:brightness-90">
                        <img class="object-cover w-full h-full" src="../assets/media/puertas_car2.png"
                             alt="nosotros_interior">
                    </div>
                    <div class="flex-1/4 rounded-xl overflow-hidden duration-300 ease-in-out hover:brightness-90">
                        <img class="object-cover w-full h-full" src="../assets/media/puertas_car3.png"
                             alt="nosotros_exterior">
                    </div>
                    <div class="flex-1/4 rounded-xl overflow-hidden duration-300 ease-in-out hover:brightness-90">
                        <img class="object-cover w-full h-full" src="../assets/media/puertas_car4.png"
                             alt="nosotros_puerta">
                    </div>
                </div>
            </div>
        </div>
        <!--4-->
        <div class="flex justify-center">
            <div class="w-full lg:max-w-[1150px] p-5 lg:py-8">
                <div class="bg-white rounded-xl p-3 lg:p-10 border-1 border-[#657d88] shadow-lg flex flex-col gap-5 lg:flex-row">
                    <div class="flex flex-col flex-1">
                        <h2 class="text-lg text-center text-[#657d88] tracking-wider italic font-bold lg:text-left lg:text-[1.8rem]">{{ $t('pue_cta_title') }}</h2>
                        <p class="text-[#757575] md:text-center lg:text-xl">{{ $t('pue_cta_body') }}</p>
                    </div>
                    <div class="flex-none flex flex-col gap-2 lg:gap-4 items-center lg:p-4 lg:flex-row">
                        <button class="bg-[#ee7465] text-white text-base cursor-pointer lg:text-lg px-4 py-2 rounded-full transition-normal duration-300 ease-in-out hover:shadow-xl" @click="openFormW">{{ $t('pue_cta_button') }}</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="openForm" class="fixed inset-0 z-20 bg-black/20 p-5 lg:p-15 flex items-center justify-center" @click.self="openFormW">
            <div class="bg-white w-120 h-full rounded-xl flex flex-col gap-5 p-3 shadow-xl">
                <div class="w-full flex justify-end items-center">
                    <h2 class="flex-1 text-[#757575] text-xl">{{ $t('f_write_modal') }}</h2>
                    <button @click="openFormW"
                            class="border rounded-lg py-1 px-2 text-[#cccccc] leading-none cursor-pointer transition-colors duration-300 hover:text-[#657d88] lg:text-[1.5rem]">X</button>
                </div>
                <div class="overflow-auto">
                    <div class="hs-form-frame" data-region="na1" data-form-id="e6b36d11-6197-4aa2-815f-9b13fd86cd41" data-portal-id="24148893"></div>
                </div>
            </div>
        </div>
    </main-layout>
</template>

<style scoped></style>
