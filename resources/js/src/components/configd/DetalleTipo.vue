<script setup>
import { ref, computed, onMounted } from "vue";

import p_default from '../../assets/media/icons/puerta_cerrada_default.png'
import p_active from '../../assets/media/icons/puerta_cerrada_select.png'
import pa_default from '../../assets/media/icons/puerta_abierta_default.png'
import pa_active from '../../assets/media/icons/puerta_abierta_select.png'

import v_default from '../../assets/media/icons/ventana_cerrada_default.png'
import v_active from '../../assets/media/icons/ventana_cerrada_select.png'
import va_default from '../../assets/media/icons/ventana_abierta_default.png'
import va_active from '../../assets/media/icons/ventana_abierta_select.png'

import d_default from '../../assets/media/icons/3d_default.png'
import d_active from '../../assets/media/icons/3d_select.png'

const props = defineProps({
    item: Array,
    tipo: String,
});

const u_media = '/media/puertas_ventanas/';
const img_selected = ref(1); // 1 = cerrada, 2 = abierta, 3 = 3D
const c_selected = ref('madera'); // valores esperados: 'madera', 'negra', etc.

const name_base = ref('');

const icons_p = [
    { id: 1, default: p_default, active: p_active, img: "default" },
    { id: 2, default: pa_default, active: pa_active, img: "abierta" },
    { id: 3, default: d_default, active: d_active, img: "3d" }
];

const icons_v = [
    { id: 1, default: v_default, active: v_active, img: "default" },
    { id: 2, default: va_default, active: va_active, img: "abierta" },
    { id: 3, default: d_default, active: d_active, img: "3d" }
];

// Imagen final que se construye según la selección
const finalImgSrc = computed(() => {
    const folder =
        img_selected.value === 2
            ? props.tipo + 's_abiertas/'
            : props.tipo + 's/';
    const base = name_base.value;
    const color = c_selected.value;

    if (color === 'madera') {
        // Usa el nombre de imagen completo como viene
        return u_media + folder + base + '.png';
    } else {
        // Construye la imagen con color dinámico
        return u_media + folder + base + `_${color}.png`;
    }
});


function seleccionado(id) {
    img_selected.value = id;
}

function seleccionarColor(color) {
    c_selected.value = color;
}

onMounted(() => {
    if (props.item.length > 0) {
        name_base.value = props.item[0].name_img.replace('.png', '');
    }
});
</script>

<template>
    <div class="flex flex-col gap-3 p-10 bg-[#E0E2E4] rounded-xl shadow-md">
        <a @click="$emit('volver')" class="group flex items-center gap-2 pb-1 cursor-pointer">
            <div class="p-0.5 border rounded-full border-[#918164] group-hover:border-2">
                <img class="h-5 w-5" src="../../assets/media/icons/angulo-pequeno-izquierdo.png" alt="volver">
            </div>
            <p class="text-xl italic tracking-wide text-[#918164] group-hover:font-semibold">Volver</p>
        </a>

        <div class="flex gap-10">
            <div class="flex-1/2 relative bg-white rounded-xl lg:h-[550px]">
                <img class="w-full h-full object-contain" :src="finalImgSrc" alt="Imagen dinámica" />

                <div v-if="tipo === 'puerta'"
                    class="flex bg-white absolute bottom-2 right-2 rounded-xl gap-x-4 items-center p-2">
                    <img v-for="i in icons_p" :key="i.id" :src="img_selected === i.id ? i.active : i.default"
                        @click="seleccionado(i.id)"
                        :class="{ 'w-10 h-10': i.id === 1, 'w-8 h-8': i.id === 2 || i.id === 3 }"
                        class="cursor-pointer">
                </div>
                <div v-else class="flex bg-white absolute bottom-2 right-2 rounded-xl gap-x-4 items-center p-2">
                    <img v-for="i in icons_v" :key="i.id" :src="img_selected === i.id ? i.active : i.default"
                        @click="seleccionado(i.id)"
                        :class="{ 'w-8 h-8': i.id === 1 || i.id === 3, 'w-12 h-12': i.id === 2 }"
                        class="cursor-pointer">
                </div>
            </div>

            <div class="flex-1/2 flex flex-col gap-3">
                <h2 class="text-[#918164] italic font-semibold tracking-wider lg:text-[2rem]">Selecciona tu color</h2>
                <p class="text-[#757575] lg:text-[1.4rem]">Colores sólidos</p>
                <div class="flex gap-2">
                    <div @click="seleccionarColor('madera')" class="bg-[#988062] w-10 h-10 rounded-full cursor-pointer">
                    </div>
                    <div @click="seleccionarColor('negra')" class="bg-black w-10 h-10 rounded-full cursor-pointer">
                    </div>
                </div>

                <h2 class="text-[#918164] italic font-semibold tracking-wider lg:text-[2rem]">Resumen</h2>
                <div class="border-2 rounded-xl py-1 px-5 border-[#918164]">
                    <div class="border-b-2 py-1 border-[#918164] flex items-center">
                        <img class="rotate-180 w-10 h-10" src="../../assets/media/icons/angulo-pequeno-izquierdo.png">
                        <p class="text-[#757575]">{{ tipo.charAt(0).toUpperCase() + tipo.slice(1) }} {{
                            props.item[0].name }}</p>
                    </div>
                    <div class="flex items-center py-1">
                        <img class="rotate-180 w-10 h-10" src="../../assets/media/icons/angulo-pequeno-izquierdo.png">
                        <p class="text-[#757575]">Color {{ c_selected }}</p>
                    </div>
                </div>

                <div class="flex items-baseline justify-between">
                    <router-link to="">obtener cot</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
