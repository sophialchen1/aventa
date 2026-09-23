<script setup>
import { computed } from "vue";
import { cat_en, cat_es } from "../data/catalogos.js";
import { useI18n } from "vue-i18n";
import TittleCustom from "@/src/components/TittleCustom.vue";
import MainLayout from "@/src/layouts/MainLayout.vue";
import SwiperSection from "@/src/layouts/SwiperSection.vue";
import { track } from "../lib/track.js";

const { locale } = useI18n();

const currenCatalogo = computed(() => {
    return locale.value === 'en' ? cat_en : cat_es;
});

const downloadCat = computed(() => {
    return locale.value === 'en' ? '/media/docs/Copy%20of%20ENG%20-%20Brochure%202026.pdf' : '/media/docs/Copy%20of%20ESP%20-%20Brochure%202026.pdf';
});
</script>

<template>
    <main-layout>
        <!--1-->
        <div class="flex justify-center relative h-[150px] lg:h-[300px]">
            <img class="absolute w-full h-full object-cover brightness-85 opacity-90"
                 :src="'/media/proyectos/grullos2.jpeg'" alt="">

            <div class="relative w-full flex flex-col justify-center text-white lg:max-w-[1150px]">
                <tittle-custom :titulo="$t('cat_h1')"/>
            </div>
        </div>

        <div class="flex justify-center">
            <div class="w-full lg:max-w-[1150px] flex flex-col px-5 py-5 gap-5 lg:px-0 lg:py-12 lg:flex-row">
                <h2 class="flex-2/5 text-[1.7rem] text-center h-full w-full leading-none italic tracking-wider lg:text-left lg:text-[2.5rem]">{{ $t('cat_kicker') }}</h2>
                <p class="flex-3/5 w-full text-[#757575] lg:text-xl text-justify ">
                    {{ $t('cat_body') }}
                </p>
            </div>
        </div>

        <swiper-section :array="currenCatalogo"/>

        <div class="flex justify-center">
            <div class="w-full lg:max-w-[1150px] py-5 lg:pb-20 lg:pt-8 flex flex-col px-5 lg:gap-5 lg:flex-row lg:px-0">
                <h3 class="flex-1/2 w-full italic font-semibold text-[#657d88] tracking-wider text-center text-xl lg:text-left lg:text-[1.8rem]">{{ $t('cat_cta_title') }}</h3>
                <div class="flex-1/2 flex flex-col gap-5">
                    <p class="text-[#757575] text-justify lg:text-left lg:text-lg">{{ $t('cat_cta_body') }}</p>
                    <div class="flex justify-center lg:justify-start">
                        <a class="bg-[#ee7465] w-fit px-5 py-2 text-white rounded-xl hover:shadow-xl" :href="downloadCat"
                           download
                           @click="track('catalog_download', { link_location: 'catalogo_cta', file_name: downloadCat })">{{ $t('cat_cta_button') }}</a>
                    </div>
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
</style>
