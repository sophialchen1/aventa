<script setup lang="ts">

import {ref} from "vue";
import TittleCustom from "@/src/components/TittleCustom.vue";
import MainLayout from "@/src/layouts/MainLayout.vue";

const img_home = "/media/ventanas_home.jpeg";

const openForm = ref(false);

function openFormW(){
    openForm.value = !openForm.value;
    document.body.style.overflow = openForm.value ? 'hidden' : '';
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
                    <tittle-custom titulo="Ventanas de madera laminada diseñadas a la medida: aislantes de ruido y temperatura."/>
                    <p class="text-white text-center leading-none lg:leading-7 italic tracking-wider lg:text-left lg:text-[1.8rem] lg:max-w-[900px]">
                        Redefinimos el confort de tus espacios mediante ingeniería alemana y fabricación sostenible, logrando el equilibrio perfecto entre diseño atemporal y eficiencia termoacústica avanzada.
                    </p>
                </div>
                <div class="flex justify-center gap-2 lg:gap-5 lg:justify-start">
                    <router-link
                        class="font-bold w-fit text-sm py-2 px-1 bg-[#ee7465] text-white rounded-lg transition-normal duration-300 hover:translate-y-[-8px] lg:py-4 lg:px-5" to="/design-experience">
                        <div class="flex gap-3 items-center">
                            <p>Descubrir Diseños</p>
                            <img class="w-[24px] h-[24px]" src="../assets/media/icons/angulo-pequeno-derecho.png"
                                 alt="icono_ir">
                        </div>
                    </router-link>
                    <button
                        class="font-bold w-fit bg-[#ee7465] cursor-pointer text-sm py-2 px-1 text-white rounded-lg transition-normal duration-300 hover:translate-y-[-8px] lg:py-4 lg:px-5" @click="openFormW">
                        <div class="flex gap-3 items-center">
                            <p>Cotizar Proyecto</p>
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
                <h2
                    class="text-[1.55rem] text-center text-[#657d88] italic lg:text-left lg:text-[2.25rem]"
                >
                    El equilibrio perfecto entre estética y eficiencia.
                </h2>

                <div class="flex flex-col w-full gap-6 lg:gap-10 lg:flex-row">
                    <!-- Imagen -->
                    <div
                        class="w-full h-[230px] md:h-[380px] lg:h-[520px] overflow-hidden rounded-xl lg:basis-[35%] lg:flex-none"
                    >
                        <img
                            class="object-cover h-full w-full"
                            src="../assets/media/ventanas-landing.png"
                            alt="Ventanas de madera"
                            title="Ventanas de madera"
                        />
                    </div>

                    <!-- Textos -->
                    <div class="lg:basis-[65%] flex flex-col justify-center gap-8">
                        <!-- Beneficios -->
                        <div class="grid grid-cols-1 gap-y-2">
                            <h3
                                class="text-xl text-[#657d88] italic font-bold tracking-wider mb-2 lg:text-[2rem]"
                            >
                                Beneficios clave
                            </h3>

                            <div class="flex gap-3">
                                <div class="w-[7px] h-[7px] bg-[#657d88] rounded-full mt-2 flex-none"></div>
                                <p class="text-[#757575] flex-1 text-sm lg:text-base m-0 leading-5">
                                    <b>Silencio y confort.</b> Aislamiento acústico y térmico que transforma cada espacio en un refugio tranquilo y eficiente.
                                </p>
                            </div>

                            <div class="flex gap-3">
                                <div class="w-[7px] h-[7px] bg-[#657d88] rounded-full mt-2 flex-none"></div>
                                <p class="text-[#757575] flex-1 text-sm lg:text-base m-0 leading-5">
                                    <b>Diseño a tu estilo.</b> Estilo, acabado y apertura personalizados para que tus ventanas reflejen tu visión arquitectónica.
                                </p>
                            </div>

                            <div class="flex gap-3">
                                <div class="w-[7px] h-[7px] bg-[#657d88] rounded-full mt-2 flex-none"></div>
                                <p class="text-[#757575] flex-1 text-sm lg:text-base m-0 leading-5">
                                    <b>Eficiencia energética.</b> Control de temperatura que reduce el uso de aire acondicionado y calefacción.
                                </p>
                            </div>

                            <div class="flex gap-3">
                                <div class="w-[7px] h-[7px] bg-[#657d88] rounded-full mt-2 flex-none"></div>
                                <p class="text-[#757575] flex-1 text-sm lg:text-base m-0 leading-5">
                                    <b>Calidad inigualable.</b> Madera sólida, herrajes europeos y cristales dobles o triples que elevan el estándar en funcionalidad y durabilidad.
                                </p>
                            </div>
                        </div>

                        <!-- Características -->
                        <div class="grid grid-cols-1 gap-y-2">
                            <h3
                                class="text-xl text-[#657d88] italic font-bold tracking-wider mb-2 lg:text-[2rem]"
                            >
                                Características destacadas
                            </h3>

                            <div class="flex gap-3">
                                <div class="w-[7px] h-[7px] bg-[#657d88] rounded-full mt-2 flex-none"></div>
                                <p class="text-[#757575] flex-1 text-sm lg:text-base m-0 leading-5">
                                    <b>Aperturas disponibles:</b> corredizas, abatibles, proyectables y de guillotina.
                                </p>
                            </div>

                            <div class="flex gap-3">
                                <div class="w-[7px] h-[7px] bg-[#657d88] rounded-full mt-2 flex-none"></div>
                                <p class="text-[#757575] flex-1 text-sm lg:text-base m-0 leading-5">
                                    Elaboradas con <b>madera sustentable de alta gama.</b>
                                </p>
                            </div>

                            <div class="flex gap-3">
                                <div class="w-[7px] h-[7px] bg-[#657d88] rounded-full mt-2 flex-none"></div>
                                <p class="text-[#757575] flex-1 text-sm lg:text-base m-0 leading-5">
                                    Sistema de <b>cierre hermético</b> que optimiza el aislamiento.
                                </p>
                            </div>

                            <div class="flex gap-3">
                                <div class="w-[7px] h-[7px] bg-[#657d88] rounded-full mt-2 flex-none"></div>
                                <p class="text-[#757575] flex-1 text-sm lg:text-base m-0 leading-5">
                                    <b>Opciones de cristal:</b> doble o triple acristalamiento, templado, con control solar o película anti asalto.
                                </p>
                            </div>

                            <div class="flex gap-3">
                                <div class="w-[7px] h-[7px] bg-[#657d88] rounded-full mt-2 flex-none"></div>
                                <p class="text-[#757575] flex-1 text-sm lg:text-base m-0 leading-5">
                                    Fabricación artesanal con <b>precisión industrial</b> para un ajuste impecable.
                                </p>
                            </div>

                            <div class="flex gap-3">
                                <div class="w-[7px] h-[7px] bg-[#657d88] rounded-full mt-2 flex-none"></div>
                                <p class="text-[#757575] flex-1 text-sm lg:text-base m-0 leading-5">
                                    Compatibles con shutters, postigos y mosquiteros sin afectar el diseño original.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--3-->
        <div class="flex justify-center">
            <div class="w-full px-5 lg:px-0 lg:max-w-[1150px] flex flex-col py-8 md:py-0">
                <div class="w-full overflow-x-auto">
                    <table class="w-full min-w-[850px] border-collapse text-xs lg:text-sm text-black">
                        <thead>
                            <tr>
                                <th class="w-[29%] px-4 py-2 text-center font-normal border-0"></th>
                                <th class="w-[40%] px-4 py-2 text-center font-normal border-0">{{ $t('comp_col_aventa') }}</th>
                                <th class="w-[31%] px-4 py-2 text-center font-normal border-0">{{ $t('comp_col_trad') }}</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td class="border-[3px] border-black px-4 py-5 text-center font-bold">{{ $t('comp_r1_label') }}</td>
                                <td class="border-[3px] border-black px-4 py-5 text-center font-bold">{{ $t('comp_r1_aventa') }}</td>
                                <td class="border-[3px] border-black px-4 py-5 text-center font-bold">{{ $t('comp_r1_trad') }}</td>
                            </tr>

                            <tr>
                                <td class="border-[3px] border-black px-4 py-5 text-center font-bold">{{ $t('comp_r2_label') }}</td>
                                <td class="border-[3px] border-black px-4 py-5 text-center" v-html="$t('comp_r2_aventa')"></td>
                                <td class="border-[3px] border-black px-4 py-5 text-center" v-html="$t('comp_r2_trad')"></td>
                            </tr>

                            <tr>
                                <td class="border-[3px] border-black px-4 py-5 text-center font-bold">{{ $t('comp_r3_label') }}</td>
                                <td class="border-[3px] border-black px-4 py-5 text-center">{{ $t('comp_r3_aventa') }}</td>
                                <td class="border-[3px] border-black px-4 py-5 text-center">{{ $t('comp_r3_trad') }}</td>
                            </tr>

                            <tr>
                                <td class="border-[3px] border-black px-4 py-5 text-center font-bold">{{ $t('comp_r4_label') }}</td>
                                <td class="border-[3px] border-black px-4 py-5 text-center">{{ $t('comp_r4_aventa') }}</td>
                                <td class="border-[3px] border-black px-4 py-5 text-center">{{ $t('comp_r4_trad') }}</td>
                            </tr>

                            <tr>
                                <td class="border-[3px] border-black px-4 py-5 text-center font-bold">{{ $t('comp_r5_label') }}</td>
                                <td class="border-[3px] border-black px-4 py-5 text-center">{{ $t('comp_r5_aventa') }}</td>
                                <td class="border-[3px] border-black px-4 py-5 text-center">{{ $t('comp_r5_trad') }}</td>
                            </tr>

                            <tr>
                                <td class="border-[3px] border-black px-4 py-5 text-center font-bold">{{ $t('comp_r6_label') }}</td>
                                <td class="border-[3px] border-black px-4 py-5 text-center">{{ $t('comp_r6_aventa') }}</td>
                                <td class="border-[3px] border-black px-4 py-5 text-center">{{ $t('comp_r6_trad') }}</td>
                            </tr>
                        </tbody>
                    </table>
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
                <div class="bg-white rounded-xl p-5 lg:p-10 border-1 border-[#657d88] shadow-lg flex flex-col gap-5 lg:flex-row">
                    <div class="flex flex-col flex-1">
                        <h2 class="text-xl text-center text-[#657d88] tracking-wider italic font-bold lg:text-left lg:text-[1.8rem]">Cada proyecto comienza con una gran entrada</h2>
                        <p class="text-justify text-[#757575] md:text-center lg:text-left lg:text-xl">Optimiza tu espacio con diseño, confort y tecnología.</p>
                    </div>
                    <div class="flex-none flex flex-col  gap-4 items-center lg:flex-row lg:p-4">
                        <button class="bg-[#ee7465] text-white lg:text-lg px-4 py-2 rounded-full cursor-pointer transition-normal duration-300 ease-in-out hover:shadow-xl" @click="openFormW">Solicitar Asesoría</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="openForm" class="fixed inset-0 z-20 bg-black/20 p-5 lg:p-15 flex items-center justify-center" @click.self="openFormW">
            <div class="bg-white w-120 h-full rounded-xl flex flex-col gap-5 p-3 shadow-xl">
                <div class="w-full flex justify-end items-center">
                    <h2 class="flex-1 text-[#757575] text-xl">Escribe y nos pondremos en contacto</h2>
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

<style scoped>

</style>
