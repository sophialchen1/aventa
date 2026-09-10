<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { vue3dLoader } from 'vue-3d-loader'
import DivCustom from '../components/DivCustom.vue'
import SubtituloCustom from '../components/SubtituloCustom.vue'
import BgAudio from '../components/BgAudio.vue'
import { useGlbPreload } from '../composables/useGlbPreload'

const props = defineProps({ show: { type: Boolean, default: false } })
const emit = defineEmits<{ (e: 'click'): void }>()

const { glbUrl, status, progress, preload } = useGlbPreload('/models/house_aventa.glb')
const ready = ref(false)

/* 🔹 tamaño responsivo basado en el ancho real del contenedor */
const container = ref<HTMLDivElement | null>(null)
const w = ref(1200)
const h = ref(625)
const RATIO = 625 / 1200
let ro: ResizeObserver | null = null

function updateSize() {
    const cw = container.value?.clientWidth ?? 1200
    w.value = Math.max(320, Math.round(cw))       // mínimo 320px
    h.value = Math.round(w.value * RATIO)         // mantiene proporción
}

onMounted(() => {
    updateSize()
    ro = new ResizeObserver(updateSize)
    if (container.value) ro.observe(container.value)
})
onBeforeUnmount(() => { ro?.disconnect() })

watch(() => props.show, async (v) => {
    if (v) {
        ready.value = false
        if (status.value !== 'loaded') await preload()
        await nextTick()
        // Recalcula por si el modal tiene paddings
        updateSize()
    }
})

function onLoad() { requestAnimationFrame(() => { ready.value = true }) }
const img_aventa = ref('/media/presentar2.jpg');
const vs = ref(false)
function backAudio(val: number) {
    vs.value = (val === 1)
    switch (val) {
        case 1:
            img_aventa.value = '/media/presentar1.jpg'
            break;
        case 2:
            img_aventa.value = '/media/presentar2.jpg'
            break;
            default:
                img_aventa.value = ''
            break;
    }
}
</script>



<template>
    <div-custom v-if="props.show" class="bg-black/10 fixed inset-0 z-50 px-2 lg:px-0" @click.self="emit('click')">
        <div class="w-full h-full flex justify-center items-center">
            <div class="bg-white w-full h-2/4 md:w-4/5 md:h-5/6 rounded-lg shadow-xl flex flex-col  p-3 gap-2 ">
                <div class="w-full flex justify-end">
                    <h2 class="flex-1 font-light italic tracking-wider text-2xl lg:text-[2.5rem] text-start">Representación AventaWindows</h2>

                    <button @click="emit('click')" class="h-fit w-fit border rounded-lg px-2 text-[#cccccc] cursor-pointer hover:text-[#918164] lg:text-lg">X</button>
                </div>

                <div class="flex-1 flex justify-start overflow-hidden rounded-lg relative bg-gray-400">
                    <img :src="img_aventa" class="w-full h-full object-cover" alt="Presentacion Aventa"/>

                    <div class="absolute inset-x-2 bottom-2 flex justify-end gap-2">
                        <button class="p-2 w-40 rounded-lg cursor-pointer" :class="!vs ? 'text-white bg-[#918164]' : 'bg-white text-black'" @click="backAudio(2)">Sin Aventa</button>
                        <button class="p-2 w-40 rounded-lg cursor-pointer" :class="vs ? 'text-white bg-[#918164]' : 'bg-white text-black'" @click="backAudio(1)">Con Aventa</button>
                        <bg-audio v-if="props.show" :vs="vs"/>
                    </div>
                </div>
            </div>
        </div>
    </div-custom>
</template>



