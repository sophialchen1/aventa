<script setup lang="ts">
import TittleCustom from "@/src/components/TittleCustom.vue";
import MainLayout from "@/src/layouts/MainLayout.vue";
import {ref} from "vue";
import IconCustom from "@/src/components/IconCustom.vue";

type ArchivedType = {
    id: number;
    icon: string;
    tituloKey: string;
    descriptionKey: string;
    archivo: string;
}

const arrays: ArchivedType[] = [
    {
        id: 1,
        icon: "pencil-ruler",
        tituloKey: "res_card1_title",
        descriptionKey: "res_card1_body",
        archivo: "Ficha-Tecnica-de-Producto-AVE·NTA-Windows_-Maxima-Eficiencia-y-Calidad.pdf"
    },
    {
        id: 2,
        icon: "bulb",
        tituloKey: "res_card2_title",
        descriptionKey: "res_card2_body",
        archivo: "Politica-De-Garantia-Aventa-es-en.docx.pdf"
    },
    {
        id: 3,
        icon: "book-open-cover",
        tituloKey: "res_card3_title",
        descriptionKey: "res_card3_body",
        archivo: "Mantenimiento-1.pdf"
    },
    {
        id: 4,
        icon: "building",
        tituloKey: "res_card4_title",
        descriptionKey: "res_card4_body",
        archivo: "Why AVENTA_.pdf"
    },
    {
        id: 5,
        icon: "dollar",
        tituloKey: "res_card5_title",
        descriptionKey: "res_card5_body",
        archivo: "Procesos-de-Compra.pdf"
    },
];

type FaqType = {
    id: number;
    preguntaKey: string;
    respuestaKey: string;
}

const faqs: FaqType[] = [
    {
        id: 1,
        preguntaKey: "faq1_q",
        respuestaKey: "faq1_a"
    },
    {
        id: 2,
        preguntaKey: "faq2_q",
        respuestaKey: "faq2_a"
    },
    {
        id: 3,
        preguntaKey: "faq3_q",
        respuestaKey: "faq3_a"
    },
    {
        id: 4,
        preguntaKey: "faq4_q",
        respuestaKey: "faq4_a"
    },
    {
        id: 5,
        preguntaKey: "faq5_q",
        respuestaKey: "faq5_a"
    },
    {
        id: 6,
        preguntaKey: "faq6_q",
        respuestaKey: "faq6_a"
    },
    {
        id: 7,
        preguntaKey: "faq7_q",
        respuestaKey: "faq7_a"
    },
    {
        id: 8,
        preguntaKey: "faq8_q",
        respuestaKey: "faq8_a"
    },
    {
        id: 9,
        preguntaKey: "faq9_q",
        respuestaKey: "faq9_a"
    },
    {
        id: 10,
        preguntaKey: "faq10_q",
        respuestaKey: "faq10_a"
    }
];

const activeFaq = ref<number | null>(null);

function toggleFaq(id: number) {
    activeFaq.value = activeFaq.value === id ? null : id;
}

</script>

<template>
    <main-layout>
        <div class="flex justify-center relative h-[150px] lg:h-[300px]">
            <img
                class="absolute w-full h-full object-cover brightness-85 opacity-90"
                :src="'/media/encuentra-pieza-ideal.png'"
                alt=""
            />

            <div class="relative w-full flex flex-col justify-center text-white lg:max-w-[1150px]">
                <tittle-custom :titulo="$t('res_h1')" />
                <p class="text-center text-sm px-5 lg:text-xl lg:text-left lg:p-0">{{ $t('res_intro') }}</p>
            </div>
        </div>

        <div class="flex flex-col items-center bg-gray-50">
            <div class="w-full grid lg:grid-cols-5 gap-5 px-5 py-5 lg:py-12 lg:px-0 lg:max-w-[1150px]">
                <div v-for="i in arrays" :key="i.id" class="p-2 lg:min-h-72 gap-5 flex flex-col items-center border-b-1 border-b-[#657d88] lg:border-none">
                    <icon-custom :icon="i.icon" size="4xl" class="text-gray-400"/>
                    <div class="min-h-14 flex items-start">
                        <p class="font-bold text-lg text-center">{{ $t(i.tituloKey) }}</p>
                    </div>
                    <div class="w-full lg:min-h-26 flex flex-col items-center justify-start">
                        <p class="w-full text-center">{{ $t(i.descriptionKey) }}</p>
                    </div>

                    <a class="mb-3 ring-1 w-[60%] min-w-28 px-2 py-1 lg:w-fit rounded-full flex justify-center ring-[#657d88] text-[#657d88]/80 transition duration-300 hover:bg-[#657d88] hover:text-white"
                       :href="'/media/docs/' + i.archivo" target="_blank">
                    {{ $t('res_card_cta') }}</a>
                </div>
            </div>

            <div class="w-full flex flex-col gap-5 min-h-96 px-5  py-5 lg:flex-row lg:px-0 lg:py-12 lg:max-w-[1150px]">
                <div class="lg:w-2/5 flex flex-col gap-3 lg:gap-5">
                    <p class="text-center lg:text-left text-2xl font-extralight italic tracking-wider">{{ $t('res_explore_kicker') }}</p>
                    <h2 class="text-7xl text-center lg:text-8xl lg:text-left font-extralight italic tracking-wider text-[#657d88]">AVENTA</h2>
                    <p class="text-center text-gray-700 lg:text-left lg:max-w-80">{{ $t('res_explore_body') }}</p>

                </div>
                <div class="lg:w-3/5 flex flex-col lg:flex-row gap-3">
                    <div class="lg:w-1/3 max-h-96 lg:min-h-96 rounded-md overflow-hidden relative group">
                        <p class="bottom-2 left-4 z-2 absolute text-white font-bold duration-600 transition-all group-hover:scale-110">{{ $t('f_visit') }}</p>
                        <img class="relative w-full h-full object-cover transition-all duration-600 ease-in-out brightness-75 group-hover:scale-125 group-hover:brightness-85" :src="'/media/planea_visita_mujer.jpg'" alt="">
                    </div>
                    <div class="lg:w-1/3 max-h-96 lg:min-h-96 rounded-md overflow-hidden relative group">
                        <p class="bottom-2 left-4 z-2 absolute text-white font-bold duration-600 transition-all group-hover:scale-110">{{ $t('res_explore_cta2') }}</p>
                        <img class="relative w-full h-full object-cover transition-all duration-600 ease-in-out brightness-75 group-hover:scale-125 group-hover:brightness-85" :src="'/media/ia_aventa.jpg'" alt="">
                    </div>
                    <div class="lg:w-1/3 max-h-96 lg:min-h-96 rounded-md overflow-hidden relative group">
                        <p class="bottom-2 left-4 z-2 absolute text-white font-bold duration-600 transition-all group-hover:scale-110">{{ $t('res_explore_cta3') }}</p>
                        <img class="relative w-full h-full object-cover transition-all duration-600 ease-in-out brightness-75 group-hover:scale-125 group-hover:brightness-85" :src="'/media/behind_craft.jpg'" alt="">
                    </div>
                </div>
            </div>

            <div class="w-full py-5 lg:py-16 lg:max-w-[1150px] px-5">
                <div class="flex flex-col gap-6">
                    <div class="text-center">
                        <p class="text-2xl font-extralight italic tracking-wider">{{ $t('faq_kicker') }}</p>
                        <h2 class="text-5xl lg:text-6xl font-extralight italic tracking-wider text-[#657d88]">
                            {{ $t('faq_title') }}
                        </h2>
                    </div>

                    <div class="flex flex-col divide-y divide-gray-300">
                        <div
                            v-for="item in faqs"
                            :key="item.id"
                            class="py-4"
                        >
                            <button
                                type="button"
                                class="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
                                @click="toggleFaq(item.id)"
                            >
                    <span class="text-lg lg:text-xl font-medium text-gray-800">
                        {{ $t(item.preguntaKey) }}
                    </span>

                                <span
                                    class="text-2xl text-[#657d88] transition-transform duration-300"
                                    :class="{ 'rotate-45': activeFaq === item.id }"
                                >
                        +
                    </span>
                            </button>

                            <transition
                                enter-active-class="transition-all duration-300 ease-out"
                                enter-from-class="opacity-0 max-h-0"
                                enter-to-class="opacity-100 max-h-40"
                                leave-active-class="transition-all duration-200 ease-in"
                                leave-from-class="opacity-100 max-h-40"
                                leave-to-class="opacity-0 max-h-0"
                            >
                                <div
                                    v-if="activeFaq === item.id"
                                    class="overflow-hidden"
                                >
                                    <p class="pt-3 text-gray-600 lg:max-w-[90%]">
                                        {{ $t(item.respuestaKey) }}
                                    </p>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>

                <div class="flex mt-5 lg:mt-4 justify-center">
                    <a href="/media/docs/FAQs.pdf" target="_blank" class="text-lg hover:underline">{{ $t('res_doc_cta') }}</a>
                </div>
            </div>

            <div class="w-full mt-5 mb-5 lg:m-0 flex justify-center relative h-[150px] lg:h-[300px]">
                <img
                    class="absolute w-full h-full object-cover brightness-75 opacity-25"
                    :src="'/media/encuentra-pieza-ideal.png'"
                    alt=""
                />

                <div class="relative w-full flex flex-col justify-center items-center gap-2 text-white lg:max-w-[1150px]">
                    <h2 class="text-3xl text-[#657d88]">{{ $t('res_quicklink_label') }}</h2>
                    <router-link :to="{path: '/', hash: '#contactanos'}" class="bg-white ring-1 ring-[#657d88] text-[#657d88] text-center text-xl w-fit rounded-lg min-w-[43%] px-4 p-3 tracking-wider font-extralight cursor-pointer transition duration-300 hover:bg-[#657d88] hover:text-white">{{ $t('res_quicklink_cta') }}</router-link>
                </div>
            </div>



            <div class="w-full py-5 lg:py-16 lg:max-w-[1150px] px-4 flex flex-col items-center gap-5">
                <div>
                    <h3 class="text-center text-4xl lg:text-5xl lg:text-left text-[#657d88] font-extralight">{{ $t('res_specs_title') }}</h3>
                    <p class=" lg:text-2xl text-center text-[#657d88] font-extralight">{{ $t('res_specs_sub') }}</p>
                </div>

                <div class="w-full grid lg:grid-cols-2 gap-10 lg:mt-5">
                    <div class="flex flex-col gap-2 bg-[#f7f7f7] border-b-8 border-b-[#657d88] shadow-lg group">
                        <div class="w-full h-52 overflow-hidden">
                            <img class="w-full h-full object-cover transition-all duration-1000 group-hover:brightness-60 group-hover:scale-125" :src="'/media/diseno-de-interiores-para-llamadas-de-zoom.jpg'" alt="Diseño de interiores">
                        </div>

                        <div class="p-5 flex flex-col gap-5 lg:gap-8">
                            <p class="text-lg text-gray-600 font-bold">{{ $t('res_specs1_title') }}</p>
                            <p class="text-gray-800 text-sm">{{ $t('res_specs1_body') }}</p>
                        </div>
                    </div>

                    <div class="flex flex-col gap-2 bg-[#f7f7f7] border-b-8 border-b-[#657d88] shadow-lg group">
                        <div class="w-full h-52 overflow-hidden">
                            <img class="w-full h-full object-cover transition-all duration-1000 group-hover:brightness-60 group-hover:scale-125" :src="'/media/casa-de-diseno-villa-moderna.jpg'" alt="Casa de diseño villa">
                        </div>

                        <div class="p-5 flex flex-col gap-5 lg:gap-8">
                            <p class="text-lg text-gray-600 font-bold">{{ $t('res_specs2_title') }}</p>
                            <p class="text-gray-800 text-sm">{{ $t('res_specs2_body') }}</p>
                        </div>
                    </div>

                </div>
            </div>

            <div class="w-full bg-[#E2E0DC] flex justify-center">
                <div class="w-full py-5 lg:py-16 lg:max-w-[1150px] px-4 flex flex-col items-center gap-4 lg:gap-5">
                    <h3 class="text-center font-extralight text-[#657d88] text-3xl ">{{ $t('res_sales_title') }}</h3>
                    <p class="text-sm text-center lg:text-base">
                        {{ $t('res_sales_body') }}
                    </p>

                    <router-link to="/contacto" class="bg-[#657d88] text-center text-white min-w-44 p-3 rounded-xl mt-4 lg:m-0">{{ $t('res_sales_cta') }}</router-link>

                </div>
            </div>

        </div>

    </main-layout>
</template>

<style scoped>

</style>
