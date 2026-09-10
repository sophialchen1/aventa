<script setup>
import { onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
    vs:   { type: Boolean, required: true }, // true = bajo, false = alto
    src:  { type: String,  default: '/media/audio/bg_street.mp3'}, // pon tu mp3 en /public/audio/bg.mp3
    low:  { type: Number,  default: 0.15 },
    high: { type: Number,  default: 1.0 }
})

let a // instancia de Audio (sin elemento <audio>)

onMounted(async () => {
    a = new Audio(props.src)
    a.loop = true
    a.volume = props.vs ? props.low : props.high
    a.muted = true          // permite autoplay
    try {
        await a.play()        // reproduce al montar
        a.muted = false       // desmutea de inmediato
    } catch (_) {
        // si el navegador bloquea autoplay con sonido, no sonará hasta una interacción
    }
})

watch(() => props.vs, v => {
    if (a) a.volume = v ? props.low : props.high
})

onBeforeUnmount(() => {
    if (!a) return
    a.pause()
    a.currentTime = 0
    a.src = ''             // corta completamente
    a = null
})
</script>

<template></template>


