<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, A11y, Zoom } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import DivCustom from "../components/DivCustom.vue";

const props = defineProps({
    array: {
        type: Array,
        required: true,
    }
});

</script>

<template>
    <div-custom>
        <swiper class="h-[550px] relative rounded shadow-xl bg-[#cccccc]"
                :modules="[Navigation, Pagination, Scrollbar, A11y, Zoom]" :pagination="{ clickable: true }"
                :scrollbar="{ draggable: true }" :slides-per-view="1" :zoom="true" navigation>
            <swiper-slide v-for="(i, index) in props.array" :key="index"
                          class="flex items-center justify-center h-full">
                <div class="swiper-zoom-container">
                    <img :src="i" :alt="`Slide ${index}`"
                         class="max-h-full max-w-full object-contain cursor-zoom-in" />
                </div>
            </swiper-slide>
        </swiper>
    </div-custom>
</template>
